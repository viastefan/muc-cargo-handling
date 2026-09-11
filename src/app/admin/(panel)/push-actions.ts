"use server";

import { requireAdmin } from "@/lib/admin-session";
import {
  broadcastPush,
  removeSubscription,
  saveSubscription,
  pushReady,
} from "@/lib/push";

export type PushActionResult = { ok: boolean; message: string };

export async function subscribePushAction(subscription: {
  endpoint: string;
  p256dh: string;
  auth: string;
  label?: string;
}): Promise<PushActionResult> {
  await requireAdmin();
  if (!pushReady) {
    return { ok: false, message: "Push ist auf dem Server nicht konfiguriert." };
  }

  const endpoint = subscription.endpoint.trim();
  if (!/^https:\/\//.test(endpoint) || endpoint.length > 1000) {
    return { ok: false, message: "Ungültiger Endpoint." };
  }

  const saved = await saveSubscription({
    endpoint,
    p256dh: subscription.p256dh.trim().slice(0, 200),
    auth: subscription.auth.trim().slice(0, 100),
    label: subscription.label?.slice(0, 120) ?? null,
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
