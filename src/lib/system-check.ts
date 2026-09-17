/**
 * Einrichtungsprüfung für das Panel. Beantwortet die Frage „was fehlt noch,
 * damit alles live funktioniert" konkret statt mit Fehlersuche im Blindflug.
 * Nur serverseitig verwenden.
 */

import { inquiriesStorageReady, getLatestInquiryAt } from "@/lib/inquiries";
import {
  emailReady,
  mailFromIsOnboarding,
  smsReady,
  webhookReady,
} from "@/lib/notify";
import { COMPANY } from "@/lib/company";
import { SITE_URL } from "@/lib/site";

const RAW_URL = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "") ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";

export type CheckState = "ok" | "missing" | "info";

export type Check = {
  label: string;
  state: CheckState;
  detail: string;
  /** Konkreter nächster Schritt, wenn etwas fehlt. */
  fix?: string;
};

export type ConnectionProbe = {
  state: "ok" | "missing";
  detail: string;
  fix?: string;
  latencyMs: number | null;
  host: string | null;
};

function hostFromUrl(url: string): string | null {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

/**
 * Live-Ping gegen PostgREST — misst Latenz und erkennt fehlende Secrets
 * bzw. unerreichbare Projekte, ohne Tabellen vorauszusetzen.
 */
export async function probeConnection(): Promise<ConnectionProbe> {
  const host = hostFromUrl(RAW_URL);

  if (!inquiriesStorageReady) {
    return {
      state: "missing",
      detail: "Kein Datenspeicher verbunden",
      fix: "SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY setzen, danach Redeploy.",
      latencyMs: null,
      host,
    };
  }

  const started = performance.now();
  try {
    const res = await fetch(`${RAW_URL}/rest/v1/`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
    });
    const latencyMs = Math.round(performance.now() - started);
    if (!res.ok) {
      return {
        state: "missing",
        detail: `Supabase antwortet mit ${res.status}`,
        fix: "Service-Role-Key und Projekt-URL prüfen.",
        latencyMs,
        host,
      };
    }
    return {
      state: "ok",
      detail: "Supabase erreichbar",
      latencyMs,
      host,
    };
  } catch {
    return {
      state: "missing",
      detail: "Supabase nicht erreichbar",
      fix: "Netzwerk, Projektstatus und SUPABASE_URL prüfen.",
      latencyMs: null,
      host,
    };
  }
}

/** Prüft, ob eine Tabelle über PostgREST erreichbar ist. */
async function tableReachable(table: string): Promise<boolean> {
  if (!inquiriesStorageReady) return false;
  try {
    const res = await fetch(`${RAW_URL}/rest/v1/${table}?select=count&limit=1`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        Prefer: "count=exact",
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function countRows(table: string): Promise<number | null> {
  if (!inquiriesStorageReady) return null;
  try {
    const res = await fetch(`${RAW_URL}/rest/v1/${table}?select=id&limit=1`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        Prefer: "count=exact",
        Range: "0-0",
      },
    });
    if (!res.ok) return null;
    const range = res.headers.get("content-range");
    const total = range?.split("/")[1];
    return total && total !== "*" ? Number(total) : 0;
  } catch {
    return null;
  }
}

export async function runSystemChecks(): Promise<Check[]> {
  const [probe, inquiries, adminUsers, events, pushTable, deviceCount, latestAt] =
    await Promise.all([
      probeConnection(),
      tableReachable("inquiries"),
      tableReachable("admin_users"),
      tableReachable("inquiry_events"),
      tableReachable("push_subscriptions"),
      countRows("push_subscriptions"),
      getLatestInquiryAt(),
    ]);

  const vapidPublic = Boolean(process.env.VAPID_PUBLIC_KEY?.trim());
  const vapidPrivate = Boolean(process.env.VAPID_PRIVATE_KEY?.trim());
  const siteUrlIsLocal = /localhost|127\.0\.0\.1/.test(SITE_URL);
  const googleVerification = Boolean(process.env.GOOGLE_SITE_VERIFICATION?.trim());
  const googlePlaceId = Boolean(COMPANY.googlePlaceId);

  const checks: Check[] = [
    {
      label: "Datenbank verbunden",
      state: probe.state,
      detail:
        probe.state === "ok"
          ? `${probe.detail}${probe.latencyMs != null ? ` · ${probe.latencyMs} ms` : ""}${probe.host ? ` · ${probe.host}` : ""}`
          : probe.detail,
      fix: probe.fix,
    },
    {
      label: "Anfragen-Tabelle",
      state: inquiries ? "ok" : "missing",
      detail: inquiries ? "Vorhanden." : "Tabelle inquiries fehlt.",
      fix: "Migration 0001_inquiries.sql im Supabase-SQL-Editor ausführen.",
    },
    {
      label: "Team-Benutzer",
      state: adminUsers && events ? "ok" : "missing",
      detail:
        adminUsers && events
          ? "Vorhanden."
          : "Tabellen admin_users / inquiry_events fehlen.",
      fix: "Migration 0002_admin_users.sql im Supabase-SQL-Editor ausführen.",
    },
    {
      label: "Push-Tabelle",
      state: pushTable ? "ok" : "missing",
      detail: pushTable ? "Vorhanden." : "Tabelle push_subscriptions fehlt.",
      fix: "Migration 0003_push_subscriptions.sql im Supabase-SQL-Editor ausführen.",
    },
    {
      label: "Push-Schlüssel",
      state: vapidPublic && vapidPrivate ? "ok" : "missing",
      detail:
        vapidPublic && vapidPrivate
          ? "VAPID-Schlüssel hinterlegt."
          : "VAPID-Schlüssel fehlen.",
      fix: "VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY und VAPID_SUBJECT in Vercel setzen, danach Redeploy.",
    },
    {
      label: "Angemeldete Geräte",
      state: deviceCount && deviceCount > 0 ? "ok" : "info",
      detail:
        deviceCount === null
          ? "Nicht ermittelbar (Tabelle fehlt)."
          : deviceCount === 0
            ? "Noch kein Gerät angemeldet."
            : `${deviceCount} Gerät${deviceCount === 1 ? "" : "e"} angemeldet.`,
      fix: "Auf der Übersicht „Auf diesem Gerät aktivieren\" antippen. Auf dem iPhone zuvor die Seite zum Home-Bildschirm hinzufügen.",
    },
    {
      label: "E-Mail-Versand (Resend)",
      state: emailReady ? (mailFromIsOnboarding ? "info" : "ok") : "missing",
      detail: emailReady
        ? mailFromIsOnboarding
          ? "API-Key gesetzt, Absender noch Resend-Testadresse (onboarding@resend.dev)."
          : "Resend bereit — Panel kann Antworten direkt senden."
        : "RESEND_API_KEY fehlt.",
      fix: emailReady
        ? "MAIL_FROM auf eine verifizierte Domain setzen, z. B. MUC Cargohandling <anfrage@muc-cargo.de>."
        : "RESEND_API_KEY und MAIL_FROM in Vercel setzen, Domain in Resend verifizieren, danach Redeploy.",
    },
    {
      label: "Letzte Website-Anfrage",
      state: latestAt ? "ok" : "info",
      detail: latestAt
        ? `Eingegangen ${new Intl.DateTimeFormat("de-DE", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Europe/Berlin",
          }).format(new Date(latestAt))}`
        : inquiries
          ? "Noch keine Anfrage gespeichert."
          : "Nicht ermittelbar (Tabelle fehlt).",
      fix: "Kontaktformular auf der Website testen — danach erscheint der Eintrag hier und im Panel.",
    },
    {
      label: "SMS-Benachrichtigung",
      state: smsReady ? "ok" : "info",
      detail: smsReady
        ? "Twilio konfiguriert."
        : "Optional — Twilio nicht eingerichtet.",
      fix: "TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM und INQUIRY_SMS_TO setzen.",
    },
    {
      label: "Webhook",
      state: webhookReady ? "ok" : "info",
      detail: webhookReady
        ? "Zusätzlicher Webhook aktiv."
        : "Optional — kein CONTACT_WEBHOOK_URL.",
      fix: "CONTACT_WEBHOOK_URL setzen, wenn Anfragen zusätzlich an ein externes System sollen.",
    },
    {
      label: "Adresse der Website",
      state: siteUrlIsLocal ? "missing" : "ok",
      detail: SITE_URL,
      fix: "SITE_URL in Vercel auf die öffentliche Adresse setzen — sie steckt in Links aus E-Mails und Benachrichtigungen.",
    },
    {
      label: "Google Search Console",
      state: googleVerification ? "ok" : "info",
      detail: googleVerification
        ? "Bestätigungscode hinterlegt (meta verification)."
        : "Noch kein GOOGLE_SITE_VERIFICATION.",
      fix: "In der Search Console eine Property anlegen, HTML-Tag-Code kopieren und als GOOGLE_SITE_VERIFICATION in Vercel setzen.",
    },
    {
      label: "Google Standort (Place ID)",
      state: googlePlaceId ? "ok" : "info",
      detail: googlePlaceId
        ? `Place ID verknüpft · ${COMPANY.googlePlaceId}`
        : "Keine Place ID — Schema nutzt Koordinaten + hasMap.",
      fix: "Google Business Profile klaimen, korrekten Pin setzen, Place ID kopieren und als GOOGLE_PLACE_ID in Vercel setzen.",
    },
  ];

  return checks;
}
