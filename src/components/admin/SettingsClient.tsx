"use client";

import { useState, useTransition } from "react";
import { changePasswordAction, saveNotificationEmailAction } from "@/lib/cms/actions";
import type { PersistMeta } from "@/lib/cms/types";

export function SettingsClient({
  notificationEmail,
  meta,
}: {
  notificationEmail: string;
  meta: PersistMeta;
}) {
  const [email, setEmail] = useState(notificationEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="admin-grid cols-2">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Passwort ändern</h2>
        </div>
        <div className="admin-panel__body">
          <div className="admin-field">
            <label htmlFor="current">Aktuelles Passwort</label>
            <input
              id="current"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="admin-field">
            <label htmlFor="next">Neues Passwort</label>
            <input
              id="next"
              type="password"
              value={nextPassword}
              onChange={(e) => setNextPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
          {message ? <div className="admin-alert admin-alert--ok">{message}</div> : null}
          <button
            type="button"
            className="admin-btn admin-btn--brand"
            disabled={pending}
            onClick={() => {
              setError(null);
              setMessage(null);
              startTransition(async () => {
                const result = await changePasswordAction(currentPassword, nextPassword);
                if (!result.ok) {
                  setError(result.error || "Fehler");
                  return;
                }
                setMessage("Passwort aktualisiert.");
                setCurrentPassword("");
                setNextPassword("");
              });
            }}
          >
            Passwort speichern
          </button>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Benachrichtigungen</h2>
        </div>
        <div className="admin-panel__body">
          <div className="admin-field">
            <label htmlFor="notify">Notification E-Mail</label>
            <input id="notify" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <span className="hint">Für spätere Versand-Hooks / interne Info</span>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn--soft"
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                const result = await saveNotificationEmailAction(email);
                setMessage(result.ok ? "E-Mail gespeichert." : result.error || "Fehler");
              });
            }}
          >
            E-Mail speichern
          </button>
        </div>
      </section>

      <section className="admin-panel" style={{ gridColumn: "1 / -1" }}>
        <div className="admin-panel__head">
          <h2>Diagnose</h2>
        </div>
        <div className="admin-panel__body">
          <p>
            Persistenz: <strong>{meta.ok ? "OK" : "Hinweis"}</strong> · Backend{" "}
            <span className="admin-mono">{meta.backend}</span>
          </p>
          <p className="admin-muted">{meta.detail}</p>
          <p className="admin-muted">
            Letzter Write:{" "}
            {meta.lastWriteAt ? new Date(meta.lastWriteAt).toLocaleString("de-DE") : "—"}
            {meta.lastWriteSource ? ` · ${meta.lastWriteSource}` : ""}
          </p>
          <p className="admin-muted" style={{ marginTop: "0.75rem" }}>
            Tipp für Vercel Production: `ADMIN_SESSION_SECRET` setzen. Ohne beschreibbares FS läuft der
            Store instanzbezogen (Memory-Fallback) — für durable Multi-Instance später Blob/DB anbinden.
          </p>
        </div>
      </section>
    </div>
  );
}
