"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = {};

export function LoginForm({ configError }: { configError: boolean }) {
  const [state, action, pending] = useActionState(loginAction, initial);
  const error = configError
    ? "Admin-Zugang ist nicht konfiguriert. In den Environment-Variablen ADMIN_PASSWORD setzen."
    : state.error;

  return (
    <form action={action}>
      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}
      <label className="admin-label" htmlFor="admin-password">
        Passwort
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        className="admin-input"
        autoComplete="current-password"
        autoFocus
        required
      />
      <button
        type="submit"
        className="admin-btn admin-btn--primary"
        style={{ marginTop: "1rem" }}
        disabled={pending}
      >
        {pending ? "Anmelden…" : "Anmelden"}
      </button>
    </form>
  );
}
