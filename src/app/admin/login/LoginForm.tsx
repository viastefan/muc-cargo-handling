"use client";

import { useState, useTransition } from "react";
import { loginAction } from "@/lib/cms/actions";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setError(null);
        startTransition(async () => {
          const result = await loginAction(formData);
          if (result && !result.ok) {
            setError(result.error || "Login fehlgeschlagen.");
          }
        });
      }}
    >
      <div className="admin-field">
        <label htmlFor="admin-password">Passwort</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={4}
        />
      </div>
      {error ? (
        <div className="admin-alert admin-alert--error" role="alert">
          {error}
        </div>
      ) : null}
      <button type="submit" className="admin-btn admin-btn--brand" disabled={pending} style={{ width: "100%" }}>
        {pending ? "Prüft…" : "Anmelden"}
      </button>
    </form>
  );
}
