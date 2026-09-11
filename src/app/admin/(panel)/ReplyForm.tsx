"use client";

import { useState, useTransition } from "react";
import { saveReplyAction } from "./actions";

type Props = {
  reference: string;
  to: string;
  defaultBody: string;
};

/**
 * Öffnet eine vorausgefüllte Mail im eigenen Mailprogramm des Bearbeiters
 * (kein zentraler Versand-Account nötig) und protokolliert den Text davor
 * im Anfragen-Verlauf.
 */
export function ReplyForm({ reference, to, defaultBody }: Props) {
  const [body, setBody] = useState(defaultBody);
  const [pending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = body.trim();
    if (!text) return;

    startTransition(async () => {
      await saveReplyAction(reference, text);
      setSavedAt(Date.now());
      const subject = encodeURIComponent(`Ihre Anfrage ${reference}`);
      const mailBody = encodeURIComponent(text);
      window.location.href = `mailto:${to}?subject=${subject}&body=${mailBody}`;
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="reply"
        className="admin-textarea"
        rows={8}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Ihre Antwort an den Anfragenden …"
      />
      <div className="admin-reply__actions">
        <button
          type="submit"
          className="admin-btn admin-btn--primary admin-btn--sm"
          disabled={pending || !body.trim()}
        >
          {pending ? "Wird vorbereitet …" : "Im Mailprogramm öffnen"}
        </button>
        {savedAt ? (
          <span className="admin-hint">
            Im Verlauf gespeichert — Mail-Fenster sollte sich geöffnet haben.
          </span>
        ) : (
          <span className="admin-hint">Sendet über Ihr eigenes Mailprogramm, an {to}.</span>
        )}
      </div>
    </form>
  );
}
