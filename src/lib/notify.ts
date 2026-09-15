import { COMPANY } from "@/lib/company";
import { SITE_URL } from "@/lib/site";
import {
  customerConfirmationEmail,
  teamNotificationEmail,
  type InquiryEmailData,
} from "@/lib/email-templates";
import { TOPIC_LABEL } from "@/lib/inquiries";
import { broadcastPush, pushReady, type PushMessage } from "@/lib/push";
import { NonRetryableError, withRetry } from "@/lib/retry";

/** 4xx (ausser 429 Rate-Limit) sind durch Wiederholen nicht loesbar. */
function throwForFailedResponse(service: string, status: number, body: string): never {
  if (status >= 400 && status < 500 && status !== 429) {
    throw new NonRetryableError(`${service} ${status}: ${body.slice(0, 200)}`);
  }
  throw new Error(`${service} ${status}: ${body.slice(0, 200)}`);
}

/**
 * Zustellkanäle für neue Anfragen. Alles ist optional und wird über
 * Env-Variablen scharf geschaltet — ohne Konfiguration passiert nichts außer
 * einem Log-Eintrag, die Website funktioniert normal weiter.
 *
 *   RESEND_API_KEY          – E-Mail-Versand (Resend REST-API, keine Lib)
 *   MAIL_FROM               – Absender, Default: "MUC Cargohandling <onboarding@resend.dev>"
 *   MAIL_REPLY_TO           – optionale Antwortadresse für Team-Mails
 *   INQUIRY_NOTIFY_TO       – Empfänger Team-Benachrichtigung (Komma-getrennt)
 *   INQUIRY_SMS_TO          – Empfänger SMS (Komma-getrennt, E.164)
 *   TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM – SMS via Twilio
 *   CONTACT_WEBHOOK_URL     – zusätzlicher generischer JSON-Webhook
 */

const TIMEOUT_MS = 10_000;

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const MAIL_FROM =
  process.env.MAIL_FROM?.trim() ||
  `${COMPANY.brandName} <onboarding@resend.dev>`;
const MAIL_REPLY_TO = process.env.MAIL_REPLY_TO?.trim();

// Kein hart codierter Zusatz-Empfaenger mehr: eine vergessene/verlorene
// INQUIRY_NOTIFY_TO-Variable in einer Deployment-Umgebung darf Kunden-PII
// nicht still an eine feste persoenliche Adresse zustellen. Wer eine Kopie
// will, traegt sie explizit in INQUIRY_NOTIFY_TO ein (siehe .env.example).
const NOTIFY_TO = splitList(process.env.INQUIRY_NOTIFY_TO ?? COMPANY.email);
const SMS_TO = splitList(process.env.INQUIRY_SMS_TO ?? "");

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID?.trim();
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN?.trim();
const TWILIO_FROM = process.env.TWILIO_FROM?.trim();

const WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL?.trim();

export const emailReady = Boolean(RESEND_API_KEY);
export const smsReady = Boolean(
  TWILIO_SID && TWILIO_TOKEN && TWILIO_FROM && SMS_TO.length,
);

function splitList(value: string): string[] {
  return value
    .split(/[,;\s]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

type ChannelResult = "sent" | "skipped" | "failed";

export type NotifyResult = {
  teamEmail: ChannelResult;
  customerEmail: ChannelResult;
  sms: ChannelResult;
  webhook: ChannelResult;
  push: ChannelResult;
};

async function sendPushNotification(message: PushMessage): Promise<ChannelResult> {
  if (!pushReady) return "skipped";
  try {
    const { sent } = await broadcastPush(message);
    return sent > 0 ? "sent" : "failed";
  } catch (error) {
    console.error("[notify] push failed", error);
    return "failed";
  }
}

async function sendEmail(params: {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<ChannelResult> {
  if (!RESEND_API_KEY || params.to.length === 0) return "skipped";
  try {
    await withRetry(async () => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: MAIL_FROM,
          to: params.to,
          subject: params.subject,
          html: params.html,
          text: params.text,
          ...(params.replyTo ? { reply_to: params.replyTo } : {}),
        }),
      });
      if (!res.ok) throwForFailedResponse("resend", res.status, await res.text().catch(() => ""));
    });
    return "sent";
  } catch (error) {
    console.error("[notify] resend error", error);
    return "failed";
  }
}

async function sendSms(body: string): Promise<ChannelResult> {
  if (!smsReady) return "skipped";
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
  const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64");
  let anySent = false;
  let anyFailed = false;
  for (const to of SMS_TO) {
    try {
      await withRetry(async () => {
        const res = await fetch(endpoint, {
          method: "POST",
          signal: AbortSignal.timeout(TIMEOUT_MS),
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: to,
            From: TWILIO_FROM as string,
            Body: body.slice(0, 480),
          }),
        });
        if (!res.ok) throwForFailedResponse("twilio", res.status, await res.text().catch(() => ""));
      });
      anySent = true;
    } catch (error) {
      anyFailed = true;
      console.error("[notify] twilio error", error);
    }
  }
  return anySent ? "sent" : anyFailed ? "failed" : "skipped";
}

async function postWebhook(payload: unknown): Promise<ChannelResult> {
  if (!WEBHOOK_URL) return "skipped";
  try {
    await withRetry(async () => {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throwForFailedResponse("webhook", res.status, await res.text().catch(() => ""));
    });
    return "sent";
  } catch (error) {
    console.error("[notify] webhook error", error);
    return "failed";
  }
}

export async function notifyNewInquiry(
  data: InquiryEmailData & { source: string },
): Promise<NotifyResult> {
  const adminUrl = `${SITE_URL}/admin/${encodeURIComponent(data.reference)}`;

  const team = teamNotificationEmail({ ...data, adminUrl });
  const customer = customerConfirmationEmail(data);

  const smsBody =
    `Neue Anfrage (${TOPIC_LABEL[data.topic]}) von ${data.name}` +
    `${data.company ? ` / ${data.company}` : ""}. ` +
    `${data.email}${data.phone ? ` · ${data.phone}` : ""}. Ref ${data.reference}`;

  const [teamEmail, customerEmail, sms, webhook, push] = await Promise.all([
    sendEmail({
      to: NOTIFY_TO,
      subject: team.subject,
      html: team.html,
      text: team.text,
      replyTo: MAIL_REPLY_TO || data.email,
    }),
    sendEmail({
      to: [data.email],
      subject: customer.subject,
      html: customer.html,
      text: customer.text,
      replyTo: COMPANY.email,
    }),
    sendSms(smsBody),
    postWebhook({
      reference: data.reference,
      topic: data.topic,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      message: data.message,
      source: data.source,
      receivedAt: data.createdAt.toISOString(),
    }),
    sendPushNotification({
      title: `Neue Anfrage — ${TOPIC_LABEL[data.topic]}`,
      body:
        `${data.name}${data.company ? ` · ${data.company}` : ""}\n` +
        data.message.slice(0, 140),
      url: `/admin/${encodeURIComponent(data.reference)}`,
      tag: data.reference,
    }),
  ]);

  return { teamEmail, customerEmail, sms, webhook, push };
}
