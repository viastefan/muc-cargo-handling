/**
 * Einrichtungsprüfung für das Panel. Beantwortet die Frage „was fehlt noch,
 * damit alles live funktioniert" konkret statt mit Fehlersuche im Blindflug.
 * Nur serverseitig verwenden.
 */

import { inquiriesStorageReady } from "@/lib/inquiries";
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
  const [inquiries, adminUsers, events, pushTable, deviceCount] = await Promise.all([
    tableReachable("inquiries"),
    tableReachable("admin_users"),
    tableReachable("inquiry_events"),
    tableReachable("push_subscriptions"),
    countRows("push_subscriptions"),
  ]);

  const vapidPublic = Boolean(process.env.VAPID_PUBLIC_KEY?.trim());
  const vapidPrivate = Boolean(process.env.VAPID_PRIVATE_KEY?.trim());
  const siteUrlIsLocal = /localhost|127\.0\.0\.1/.test(SITE_URL);

  const checks: Check[] = [
    {
      label: "Datenbank verbunden",
      state: inquiriesStorageReady ? "ok" : "missing",
      detail: inquiriesStorageReady
        ? "Supabase erreichbar."
        : "Keine Zugangsdaten hinterlegt.",
      fix: "SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY in Vercel setzen, danach Redeploy.",
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
      label: "Adresse der Website",
      state: siteUrlIsLocal ? "missing" : "ok",
      detail: SITE_URL,
      fix: "SITE_URL in Vercel auf die öffentliche Adresse setzen — sie steckt in Links aus E-Mails und Benachrichtigungen.",
    },
  ];

  return checks;
}
