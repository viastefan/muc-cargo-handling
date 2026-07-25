"use client";

import { useState, useTransition } from "react";

export function SaveBar({
  onSave,
  label = "Speichern",
}: {
  onSave: () => Promise<{ ok: boolean; error?: string; savedAt?: string } | void>;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  return (
    <div className="admin-sticky-save">
      {message ? (
        <div className={`admin-alert admin-alert--${message.type === "ok" ? "ok" : "error"}`} role="status">
          {message.text}
        </div>
      ) : null}
      <button
        type="button"
        className="admin-btn admin-btn--brand"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            try {
              const result = await onSave();
              if (!result) {
                setMessage({ type: "ok", text: "Gespeichert." });
                return;
              }
              if (!result.ok) {
                setMessage({ type: "error", text: result.error || "Speichern fehlgeschlagen." });
                return;
              }
              setMessage({
                type: "ok",
                text: result.error
                  ? `Gespeichert (Hinweis: ${result.error})`
                  : `Gespeichert${result.savedAt ? ` · ${new Date(result.savedAt).toLocaleString("de-DE")}` : ""}`,
              });
            } catch {
              setMessage({ type: "error", text: "Unerwarteter Fehler beim Speichern." });
            }
          });
        }}
      >
        {pending ? "Speichert…" : label}
      </button>
    </div>
  );
}

export function ConfirmDeleteButton({
  onConfirm,
  label = "Löschen",
}: {
  onConfirm: () => Promise<void> | void;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="admin-btn admin-btn--danger"
      disabled={pending}
      onClick={() => {
        if (!window.confirm("Wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.")) {
          return;
        }
        startTransition(async () => {
          await onConfirm();
        });
      }}
    >
      {pending ? "Löscht…" : label}
    </button>
  );
}
