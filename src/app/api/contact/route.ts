import { NextResponse } from "next/server";

const TOPICS = new Set(["luftfracht", "airline", "roentgen", "allgemein"]);
const MAX_MESSAGE = 2000;
const MAX_FIELD = 120;

type Body = {
  topic?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  privacy?: boolean;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function clip(value: string | undefined, max: number) {
  return (value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage" }, { status: 400 });
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
  const payload = {
    reference,
    topic,
    name: `${firstName} ${lastName}`,
    company: company || null,
    email,
    phone: phone || null,
    message,
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        console.error("[contact] webhook failed", response.status);
        return NextResponse.json(
          { ok: false, error: "Versand fehlgeschlagen. Bitte später erneut versuchen." },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error("[contact] webhook error", error);
      return NextResponse.json(
        { ok: false, error: "Versand fehlgeschlagen. Bitte später erneut versuchen." },
        { status: 502 },
      );
    }
  } else {
    // Development / pre-integration: validated payload logged until webhook is configured.
    console.info("[contact]", payload);
  }

  return NextResponse.json({ ok: true, reference });
}
