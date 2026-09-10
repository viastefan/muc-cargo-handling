import { hasAdminSession } from "@/lib/admin-session";
import {
  customerConfirmationEmail,
  teamNotificationEmail,
} from "@/lib/email-templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Vorschau der Anfrage-E-Mails (nur mit Admin-Session). */
export async function GET(request: Request) {
  if (!(await hasAdminSession())) {
    return new Response("Nicht autorisiert", { status: 401 });
  }
  const type = new URL(request.url).searchParams.get("type") ?? "customer";
  const sample = {
    reference: "MUC-BEISPIEL-XYZ",
    topic: "luftfracht" as const,
    name: "Maria Beispiel",
    company: "Beispiel Spedition GmbH",
    email: "maria.beispiel@example.com",
    phone: "+49 89 1234 5678",
    message:
      "Wir haben regelmäßig Export-Sendungen (Paletten, 2–4 pro Woche) nach JFK und möchten die Abwicklung inkl. Sicherheitskontrolle über Sie abwickeln. Bitte um Rückruf zur Abstimmung der Zeitfenster.",
    createdAt: new Date(),
  };

  const mail =
    type === "team"
      ? teamNotificationEmail({
          ...sample,
          source: "inquiry-flow",
          adminUrl: "https://www.muc-cargo.de/admin/MUC-BEISPIEL-XYZ",
        })
      : customerConfirmationEmail(sample);

  return new Response(mail.html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
