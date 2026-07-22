import { NextResponse } from "next/server";

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
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage" }, { status: 400 });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!body.topic || !firstName || !lastName || !email || !message || !body.privacy) {
    return NextResponse.json({ ok: false, error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Ungültige E-Mail" }, { status: 400 });
  }

  if (message.length < 20) {
    return NextResponse.json({ ok: false, error: "Nachricht zu kurz" }, { status: 400 });
  }

  const reference = `MUC-${Date.now().toString(36).toUpperCase()}`;

  // Ready for Resend, SendGrid, or CRM webhook — payload validated server-side.
  console.info("[contact]", {
    reference,
    topic: body.topic,
    name: `${firstName} ${lastName}`,
    company: body.company?.trim() || null,
    email,
    phone: body.phone?.trim() || null,
    messageLength: message.length,
  });

  return NextResponse.json({ ok: true, reference });
}
