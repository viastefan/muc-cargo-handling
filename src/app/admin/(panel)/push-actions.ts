"use server";

import { requireAdmin } from "@/lib/admin-session";
import {
  broadcastPush,
  removeSubscription,
  saveSubscription,
  pushReady,
} from "@/lib/push";

export type PushActionResult = { ok: boolean; message: string };

/**
 * Der Server schickt spaeter selbst Anfragen an jede gespeicherte Endpoint-URL.
 * Ohne Einschraenkung liesse sich der Server damit als Absender gegen beliebige
 * Adressen richten (SSRF) — deshalb nur die echten Push-Dienste der Browser.
 */
const PUSH_HOSTS = [
  /\.push\.services\.mozilla\.com$/, // Firefox
  /^fcm\.googleapis\.com$/, // Chrome, Edge, Android
  /^updates\.push\.services\.mozilla\.com$/,
  /\.notify\.windows\.com$/, // Windows
  /\.push\.apple\.com$/, // Safari, iOS
];

function isKnownPushService(endpoint: string): boolean {
  if (endpoint.length > 1000) return false;
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return false;
  }
  if (url.protocol !== "https:") return false;
  return PUSH_HOSTS.some((pattern) => pattern.test(url.hostname));
}

export async function subscribePushAction(subscription: {
  endpoint: string;
  p256dh: string;
  auth: string;
  label?: string;
}): Promise<PushActionResult> {
  const principal = await requireAdmin();
  if (!pushReady) {
    return { ok: false, message: "Push ist auf dem Server nicht konfiguriert." };
  }

  const endpoint = subscription.endpoint.trim();
  if (!isKnownPushService(endpoint)) {
    return { ok: false, message: "Ungültiger Endpoint." };
  }

  const saved = await saveSubscription({
    endpoint,
    p256dh: subscription.p256dh.trim().slice(0, 200),
    auth: subscription.auth.trim().slice(0, 100),
    label: subscription.label?.slice(0, 120) ?? null,
    // Root hat keine Zeile in admin_users — dessen Geraete bleiben ohne
    // Besitzer und bekommen dadurch nur Broadcasts, keine gezielten
    // Zuweisungs-Benachrichtigungen.
    userId: principal.isRoot ? null : principal.uid,
  });

  return saved
    ? { ok: true, message: "Benachrichtigungen aktiv." }
    : { ok: false, message: "Konnte nicht gespeichert werden." };
}

export async function unsubscribePushAction(endpoint: string): Promise<PushActionResult> {
  await requireAdmin();
  await removeSubscription(endpoint.trim());
  return { ok: true, message: "Benachrichtigungen deaktiviert." };
}

/** Sendet eine Testnachricht an alle registrierten Geräte. */
export async function testPushAction(): Promise<PushActionResult> {
  const principal = await requireAdmin();
  if (!pushReady) {
    return { ok: false, message: "Push ist auf dem Server nicht konfiguriert." };
  }

  const result = await broadcastPush({
    title: "Testbenachrichtigung",
    body: `Push funktioniert — ausgelöst von ${principal.name}.`,
    url: "/admin",
    tag: "test",
  });

  if (result.sent === 0) {
    return {
      ok: false,
      message: "Kein Gerät erreicht. Ist auf diesem Gerät schon aktiviert?",
    };
  }
  return {
    ok: true,
    message: `Gesendet an ${result.sent} Gerät${result.sent === 1 ? "" : "e"}.`,
  };
}
