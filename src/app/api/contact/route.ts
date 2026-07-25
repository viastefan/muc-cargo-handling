import { NextResponse } from "next/server";
import { appendInquiry } from "@/lib/cms/store.server";

const TOPICS = new Set(["luftfracht", "airline", "roentgen", "allgemein"]);
const MAX_MESSAGE = 2000;
const MAX_FIELD = 120;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

type Body = {
  topic?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  privacy?: boolean;
  /** Honeypot — must stay empty */
  website?: string;
};

type RateEntry = { count: number; resetAt: number };

const rateMap = new Map<string, RateEntry>();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function clip(value: string | undefined, max: number) {
  return (value ?? "").trim().slice(0, max);
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function allowRequest(key: string) {
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry || now >= entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  if (!allowRequest(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Zu viele Anfragen. Bitte kurz warten und erneut versuchen." },
      { status: 429 },
    );
  }

  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage" }, { status: 400 });
  }

  if (clip(body.website, 200)) {
    return NextResponse.json({ ok: true, reference: `MUC-${Date.now().toString(36).toUpperCase()}` });
  }

  const topic = clip(body.topic, 40);
  const firstName = clip(body.firstName, MAX_FIELD);
  const lastName = clip(body.lastName, MAX_FIELD);
  const company = clip(body.company, MAX_FIELD);
  const email = clip(body.email, 180);
  const phone = clip(body.phone, 60);
  const message = clip(body.message, MAX_MESSAGE);

  if (!topic || !TOPICS.has(topic) || !firstName || !lastName || !email || !message || body.privacy !== true) {
    return NextResponse.json({ ok: false, error: "Pflichtfelder fehlen oder ungültig" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Ungültige E-Mail" }, { status: 400 });
  }

  if (message.length < 20) {
    return NextResponse.json({ ok: false, error: "Nachricht zu kurz" }, { status: 400 });
  }

  const reference = `MUC-${Date.now().toString(36).toUpperCase()}`;
  const now = new Date().toISOString();
  const payload = {
    reference,
    topic,
    name: `${firstName} ${lastName}`,
    company: company || null,
    email,
    phone: phone || null,
    message,
  };

  const inbox = await appendInquiry({
    ...payload,
    createdAt: now,
  });

  if (!inbox.ok) {
    console.error("[contact] inbox persist failed", inbox.error);
    return NextResponse.json(
      { ok: false, error: "Anfrage konnte nicht gespeichert werden. Bitte später erneut versuchen." },
      { status: 503 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  let delivered = false;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      delivered = response.ok;
      if (!response.ok) {
        console.error("[contact] webhook failed", response.status);
      }
    } catch (error) {
      console.error("[contact] webhook error", error);
    }
  } else {
    console.info("[contact] stored in admin inbox", payload.reference);
  }

  return NextResponse.json({ ok: true, reference, delivered });
}
