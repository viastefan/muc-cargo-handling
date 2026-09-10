"use client";

import { useActionState } from "react";
import { changePasswordAction, type KontoState } from "./actions";

const initial: KontoState = {};

export function KontoForm() {
  const [state, action, pending] = useActionState(changePasswordAction, initial);

  return (
    <form action={action} className="admin-card__body" style={{ maxWidth: "22rem" }}>
      {state.error ? (
        <p className="admin-error" role="alert">
          {state.error}
        </p>
      ) : null}

      <label className="admin-label" htmlFor="k-next">Neues Passwort</label>
      <input
        id="k-next"
        name="next"
        type="password"
        className="admin-input"
        autoComplete="new-password"
        required
        minLength={10}
        style={{ marginBottom: "0.9rem" }}
      />

      <label className="admin-label" htmlFor="k-confirm">Wiederholen</label>
      <input
        id="k-confirm"
        name="confirm"
        type="password"
        className="admin-input"
        autoComplete="new-password"
        required
      />

      <button
        type="submit"
        className="admin-btn admin-btn--primary"
        style={{ marginTop: "1.1rem" }}
        disabled={pending}
      >
        {pending ? "Speichern…" : "Passwort ändern"}
      </button>
    </form>
  );
}
