/**
 * Web-Push-Abos und Versand. Nur serverseitig verwenden.
 *
 * Speicher ist die Supabase-Tabelle `push_subscriptions`, angesprochen wie der
 * Rest des Projekts über PostgREST mit dem Service-Role-Key — ohne zusätzliche
 * Laufzeit-Abhängigkeit. Ohne konfigurierte VAPID-Schlüssel sind alle
 * Funktionen No-Ops, die Website bleibt voll funktionsfähig.
 */

import { sendPush, type PushSubscriptionKeys } from "@/lib/push-crypto";

const RAW_URL = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "") ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
const REST = `${RAW_URL}/rest/v1`;
const TIMEOUT_MS = 10_000;

const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY?.trim() ?? "";
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY?.trim() ?? "";
const VAPID_SUBJECT = process.env.VAPID_SUBJECT?.trim() || "mailto:info@muc-cargo.de";

export const pushReady = Boolean(RAW_URL && SERVICE_KEY && VAPID_PUBLIC && VAPID_PRIVATE);

export type PushSubscriptionRecord = PushSubscriptionKeys & {
  id: string;
  label: string | null;
  createdAt: string;
};

async function rest(path: string, init: RequestInit & { prefer?: string } = {}) {
  const { prefer, headers, ...options } = init;
  const res = await fetch(`${REST}${path}`, {
    ...options,
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
      ...headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`supabase ${res.status}: ${body.slice(0, 300)}`);
  }
  return res;
}

/** Abo anlegen oder auffrischen (Endpoint ist eindeutig). */
export async function saveSubscription(
  subscription: PushSubscriptionKeys & { label?: string | null },
): Promise<boolean> {
  if (!pushReady) return false;
  try {
    await rest("/push_subscriptions", {
      method: "POST",
      prefer: "resolution=merge-duplicates,return=minimal",
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        p256dh: subscription.p256dh,
        auth: subscription.auth,
        label: subscription.label?.slice(0, 120) ?? null,
        fail_count: 0,
      }),
    });
    return true;
  } catch (error) {
    console.error("[push] save subscription failed", error);
    return false;
  }
}

export async function removeSubscription(endpoint: string): Promise<void> {
  if (!pushReady) return;
  try {
    const params = new URLSearchParams({ endpoint: `eq.${endpoint}` });
    await rest(`/push_subscriptions?${params.toString()}`, { method: "DELETE" });
  } catch (error) {
    console.error("[push] remove subscription failed", error);
  }
}

export async function listSubscriptions(): Promise<PushSubscriptionRecord[]> {
  if (!pushReady) return [];
  try {
    const params = new URLSearchParams({
      select: "id,endpoint,p256dh,auth,label,created_at",
      order: "created_at.desc",
      limit: "100",
    });
    const res = await rest(`/push_subscriptions?${params.toString()}`);
    const rows = (await res.json()) as {
      id: string;
      endpoint: string;
      p256dh: string;
      auth: string;
      label: string | null;
      created_at: string;
    }[];
    return rows.map((r) => ({
      id: r.id,
      endpoint: r.endpoint,
      p256dh: r.p256dh,
      auth: r.auth,
      label: r.label,
      createdAt: r.created_at,
    }));
  } catch {
    return [];
  }
}

export type PushMessage = {
  title: string;
  body: string;
  url: string;
  tag?: string;
};

/**
 * Stellt eine Nachricht an alle registrierten Geräte zu. Abgelaufene Abos
 * (404/410 vom Push-Dienst) werden dabei aufgeräumt.
 */
export async function broadcastPush(message: PushMessage): Promise<{ sent: number; failed: number }> {
  if (!pushReady) return { sent: 0, failed: 0 };

  const subscriptions = await listSubscriptions();
  if (subscriptions.length === 0) return { sent: 0, failed: 0 };

  const payload = JSON.stringify(message);
  const vapid = {
    publicKey: VAPID_PUBLIC,
    privateKey: VAPID_PRIVATE,
    subject: VAPID_SUBJECT,
  };

  const results = await Promise.allSettled(
    subscriptions.map(async (subscription) => {
      const result = await sendPush(subscription, payload, vapid);
      if (result.gone) await removeSubscription(subscription.endpoint);
      return result;
    }),
  );

  let sent = 0;
  let failed = 0;
  for (const result of results) {
    if (result.status === "fulfilled" && result.value.ok) sent += 1;
    else failed += 1;
  }
  if (failed) console.error(`[push] ${failed} von ${subscriptions.length} Zustellungen fehlgeschlagen`);
  return { sent, failed };
}
