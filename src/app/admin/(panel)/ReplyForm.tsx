"use client";

import { useState, useTransition } from "react";
import { saveReplyAction, sendReplyEmailAction } from "./actions";

type Props = {
  reference: string;
  to: string;
  defaultBody: string;
  canSendEmail: boolean;
};

/**
 * Antwort an den Anfragenden: bevorzugt direkt per Resend aus dem Panel,
 * alternativ vorausgefüllt im eigenen Mailprogramm (mailto).
 * Der Text wird in beiden Fällen im Verlauf protokolliert.
 */
export function ReplyForm({ reference, to, defaultBody, canSendEmail }: Props) {
  const [body, setBody] = useState(defaultBody);
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    tone: "ok" | "err";
    text: string;
  } | null>(null);

  const openMailto = (text: string) => {
    const subject = encodeURIComponent(`Ihre Anfrage ${reference}`);
    const mailBody = encodeURIComponent(text);
    window.location.href = `mailto:${to}?subject=${subject}&body=${mailBody}`;
  };

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const text = body.trim();
    if (!text) return;
    setFeedback(null);

    startTransition(async () => {
      const result = await sendReplyEmailAction(reference, text);
      if (result.ok) {
        setFeedback({
          tone: "ok",
          text: `Gesendet an ${to}.`,
        });
        return;
      }
      setFeedback({ tone: "err", text: result.error });
    });
  };

  const handleMailto = () => {
    const text = body.trim();
    if (!text) return;
    setFeedback(null);

    startTransition(async () => {
      await saveReplyAction(reference, text);
      setFeedback({
        tone: "ok",
        text: "Im Verlauf gespeichert — Mailprogramm öffnet sich.",
      });
      openMailto(text);
    });
  };

  return (
    <form onSubmit={canSendEmail ? handleSend : (e) => { e.preventDefault(); handleMailto(); }}>
      <textarea
        name="reply"
        className="admin-textarea"
        rows={8}
        value={body}
        onChange={(event) => {
          setBody(event.target.value);
          if (feedback) setFeedback(null);
        }}
        placeholder="Ihre Antwort an den Anfragenden …"
      />
      <div className="admin-reply__actions">
        {canSendEmail ? (
          <button
            type="submit"
            className="admin-btn admin-btn--primary admin-btn--sm"
            disabled={pending || !body.trim()}
          >
            {pending ? "Wird gesendet …" : "Per E-Mail senden"}
          </button>
        ) : null}
        <button
          type="button"
          className={`admin-btn admin-btn--sm${canSendEmail ? "" : " admin-btn--primary"}`}
          disabled={pending || !body.trim()}
          onClick={handleMailto}
        >
          {pending && !canSendEmail
            ? "Wird vorbereitet …"
            : "Im Mailprogramm öffnen"}
        </button>
        {feedback ? (
          <span
            className={`admin-hint${feedback.tone === "err" ? " admin-hint--err" : ""}`}
            role="status"
          >
            {feedback.text}
          </span>
        ) : (
          <span className="admin-hint">
            {canSendEmail
              ? `Direkter Versand an ${to} über Resend.`
              : `Sendet über Ihr eigenes Mailprogramm, an ${to}.`}
          </span>
        )}
      </div>
    </form>
  );
}
