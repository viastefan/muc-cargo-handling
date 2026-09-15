import { COMPANY } from "@/lib/company";
import { SITE_URL } from "@/lib/site";
import { STATUS_LABEL, TOPIC_LABEL, type InquiryTopic } from "@/lib/inquiries";

/**
 * E-Mail-Vorlagen (HTML + Text) für die Anfrage-Zustellung.
 *
 * Tabellen-Layout und Inline-Styles sind für E-Mail-Clients (Outlook, Apple
 * Mail, Gmail) bewusst so gewählt — kein Flexbox/Grid, keine externen Styles.
 */

const BRAND = "#d90d3a";
const INK = "#1c1c1e";
const MUTED = "#6b6b70";
const BORDER = "#e6e6e8";
const BG = "#f4f4f4";
const LOGO_URL = `${SITE_URL}/images/shared/logo-red.png`;

export type InquiryEmailData = {
  reference: string;
  topic: InquiryTopic;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
  createdAt: Date;
};

/**
 * Fuer Werte, die in eine Betreffzeile eingesetzt werden (hier: der vom
 * Formular stammende Name) — ein eingebettetes CR/LF waere sonst ein Kanal
 * fuer Header-Injection, selbst wenn der Versandweg (Resend-API statt
 * rohem SMTP) das aktuell nicht ausnutzbar macht.
 */
/** Exportiert fürs Testen (email-templates.test.ts). */
export function subjectSafe(value: string): string {
  return value.replace(/[\r\n\t\x00-\x1f\x7f]+/g, " ").trim();
}

/** Exportiert fürs Testen der HTML-Escaping (email-templates.test.ts). */
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(date);
}

function shell(title: string, inner: string): string {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BG};">
<span style="display:none!important;opacity:0;color:transparent;visibility:hidden;height:0;width:0;overflow:hidden;">${esc(title)} · ${esc(COMPANY.brandName)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${BORDER};border-radius:14px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<tr><td style="padding:26px 32px 22px;border-bottom:1px solid ${BORDER};">
<img src="${LOGO_URL}" alt="${esc(COMPANY.brandName)}" width="132" style="display:block;border:0;height:auto;">
</td></tr>
${inner}
<tr><td style="padding:22px 32px 28px;border-top:1px solid ${BORDER};background:#fafafa;">
<p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED};">
${esc(COMPANY.legalName)} · ${esc(COMPANY.office.line1)}, ${esc(COMPANY.office.line2)}<br>
Tel. ${esc(COMPANY.phoneDisplay)} · <a href="mailto:${COMPANY.email}" style="color:${MUTED};">${esc(COMPANY.email)}</a> · Reglementierter Beauftragter ${esc(COMPANY.regAgent)}
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
<td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:${MUTED};white-space:nowrap;vertical-align:top;width:38%;">${esc(label)}</td>
<td style="padding:10px 0 10px 16px;border-bottom:1px solid ${BORDER};font-size:14px;color:${INK};vertical-align:top;">${value}</td>
</tr>`;
}

/* ---------------------------------------------------------------- Kunde --- */

export function customerConfirmationEmail(data: InquiryEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Ihre Anfrage bei ${COMPANY.brandName} — ${data.reference}`;
  const inner = `
<tr><td style="padding:30px 32px 8px;">
<h1 style="margin:0 0 12px;font-size:20px;font-weight:600;color:${INK};letter-spacing:-.01em;">Vielen Dank für Ihre Anfrage</h1>
<p style="margin:0 0 6px;font-size:14px;line-height:1.65;color:${MUTED};">
Wir haben Ihre Nachricht erhalten und melden uns in der Regel innerhalb eines Werktags mit den nächsten Schritten.
</p>
<p style="margin:14px 0 0;font-size:13px;color:${MUTED};">Ihre Referenz</p>
<p style="margin:2px 0 0;font-size:17px;font-weight:600;color:${BRAND};letter-spacing:.02em;">${esc(data.reference)}</p>
</td></tr>
<tr><td style="padding:20px 32px 6px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Thema", esc(TOPIC_LABEL[data.topic]))}
${row("Eingegangen", esc(formatDate(data.createdAt)))}
${row("Ihre Nachricht", `<span style="white-space:pre-wrap;">${esc(data.message)}</span>`)}
</table>
</td></tr>
<tr><td style="padding:22px 32px 30px;">
<p style="margin:0;font-size:13px;line-height:1.65;color:${MUTED};">
Bei dringenden, zeitkritischen Sendungen erreichen Sie uns direkt unter
<a href="tel:${COMPANY.phoneTel}" style="color:${INK};font-weight:500;">${esc(COMPANY.phoneDisplay)}</a>.
Diese E-Mail wurde automatisch erzeugt — Sie können direkt darauf antworten.
</p>
</td></tr>`;
  const text = [
    `Vielen Dank für Ihre Anfrage bei ${COMPANY.brandName}.`,
    ``,
    `Wir melden uns in der Regel innerhalb eines Werktags.`,
    ``,
    `Referenz: ${data.reference}`,
    `Thema: ${TOPIC_LABEL[data.topic]}`,
    `Eingegangen: ${formatDate(data.createdAt)}`,
    ``,
    `Ihre Nachricht:`,
    data.message,
    ``,
    `Dringend? Telefon: ${COMPANY.phoneDisplay}`,
    ``,
    `${COMPANY.legalName} · ${COMPANY.office.line1}, ${COMPANY.office.line2}`,
    `Reglementierter Beauftragter ${COMPANY.regAgent}`,
  ].join("\n");
  return { subject, html: shell(subject, inner), text };
}

/* ----------------------------------------------------------------- Team --- */

export function teamNotificationEmail(
  data: InquiryEmailData & { source: string; adminUrl?: string },
): { subject: string; html: string; text: string } {
  const subject = `Neue Anfrage · ${TOPIC_LABEL[data.topic]} · ${subjectSafe(data.name)}`;
  const adminButton = data.adminUrl
    ? `<tr><td style="padding:4px 32px 30px;">
<a href="${esc(data.adminUrl)}" style="display:inline-block;background:${BRAND};color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;padding:11px 20px;border-radius:9px;">Im Panel öffnen</a>
</td></tr>`
    : "";
  const inner = `
<tr><td style="padding:30px 32px 8px;">
<h1 style="margin:0 0 4px;font-size:19px;font-weight:600;color:${INK};letter-spacing:-.01em;">Neue Website-Anfrage</h1>
<p style="margin:0;font-size:13px;color:${MUTED};">Referenz ${esc(data.reference)} · Status ${esc(STATUS_LABEL.new)}</p>
</td></tr>
<tr><td style="padding:18px 32px 6px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Thema", esc(TOPIC_LABEL[data.topic]))}
${row("Name", esc(data.name))}
${row("Firma", data.company ? esc(data.company) : "&mdash;")}
${row("E-Mail", `<a href="mailto:${esc(data.email)}" style="color:${BRAND};">${esc(data.email)}</a>`)}
${row("Telefon", data.phone ? `<a href="tel:${esc(data.phone.replace(/[^+\d]/g, ""))}" style="color:${INK};">${esc(data.phone)}</a>` : "&mdash;")}
${row("Quelle", esc(data.source))}
${row("Eingegangen", esc(formatDate(data.createdAt)))}
${row("Nachricht", `<span style="white-space:pre-wrap;">${esc(data.message)}</span>`)}
</table>
</td></tr>
${adminButton}`;
  const text = [
    `Neue Website-Anfrage — ${data.reference}`,
    ``,
    `Thema:   ${TOPIC_LABEL[data.topic]}`,
    `Name:    ${data.name}`,
    `Firma:   ${data.company ?? "—"}`,
    `E-Mail:  ${data.email}`,
    `Telefon: ${data.phone ?? "—"}`,
    `Quelle:  ${data.source}`,
    `Zeit:    ${formatDate(data.createdAt)}`,
    ``,
    `Nachricht:`,
    data.message,
    data.adminUrl ? `\nIm Panel öffnen: ${data.adminUrl}` : "",
  ].join("\n");
  return { subject, html: shell(subject, inner), text };
}
