"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveReplyAction, sendReplyEmailAction } from "./actions";

type Props = {
  reference: string;
  to: string;
  defaultBody: string;
  canSendEmail: boolean;
  firstName: string;
};

const SNIPPETS = [
  {
    id: "thanks",
    label: "Danke + nächste Schritte",
    text: (name: string) =>
      `Sehr geehrte(r) ${name},\n\nvielen Dank für Ihre Anfrage. Wir melden uns in Kürze mit den nächsten Schritten.\n\nMit freundlichen Grüßen`,
  },
  {
    id: "docs",
    label: "Unterlagen nachfordern",
    text: (name: string) =>
      `Sehr geehrte(r) ${name},\n\nvielen Dank für Ihre Anfrage. Für die weitere Bearbeitung benötigen wir bitte noch folgende Unterlagen:\n\n– \n– \n\nSobald uns diese vorliegen, setzen wir die Abwicklung fort.\n\nMit freundlichen Grüßen`,
  },
  {
    id: "done",
    label: "Erledigt",
    text: (name: string) =>
      `Sehr geehrte(r) ${name},\n\nvielen Dank für Ihre Anfrage. Wir haben den Vorgang abgeschlossen. Bei Rückfragen sind wir gerne für Sie da.\n\nMit freundlichen Grüßen`,
  },
] as const;

/**
 * Antwort an den Anfragenden: bevorzugt direkt per Resend aus dem Panel,
 * alternativ vorausgefüllt im eigenen Mailprogramm (mailto).
 * Textbausteine und optionales „Erledigt“ beschleunigen den Alltag.
 */
export function ReplyForm({
  reference,
  to,
  defaultBody,
  canSendEmail,
  firstName,
}: Props) {
  const router = useRouter();
  const [body, setBody] = useState(defaultBody);
  const [markDone, setMarkDone] = useState(false);
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
      const result = await sendReplyEmailAction(reference, text, markDone);
      if (result.ok) {
        setFeedback({
          tone: "ok",
          text: markDone
            ? `Gesendet an ${to} · als erledigt markiert.`
            : `Gesendet an ${to}.`,
        });
        router.refresh();
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
    <form
      onSubmit={
        canSendEmail
          ? handleSend
          : (e) => {
              e.preventDefault();
              handleMailto();
            }
      }
    >
      <div className="admin-reply__snippets" role="group" aria-label="Textbausteine">
        {SNIPPETS.map((snippet) => (
          <button
            key={snippet.id}
            type="button"
            className="admin-chip"
            disabled={pending}
            onClick={() => {
              setBody(`${snippet.text(firstName)}\n`);
              if (snippet.id === "done") setMarkDone(true);
              setFeedback(null);
            }}
          >
            {snippet.label}
          </button>
        ))}
      </div>
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
      {canSendEmail ? (
        <label className="admin-checkrow">
          <input
            type="checkbox"
            checked={markDone}
            onChange={(e) => setMarkDone(e.target.checked)}
            disabled={pending}
          />
          <span>Nach dem Versand als erledigt markieren</span>
        </label>
      ) : null}
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
