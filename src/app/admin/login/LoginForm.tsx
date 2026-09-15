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
    <form action={action} className="admin-login__form">
      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="admin-login__fields">
        <label className="admin-login__field" htmlFor="admin-email">
          <span>E-Mail</span>
          <input
            id="admin-email"
            name="email"
            type="email"
            className="admin-login__input"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            autoFocus
            required
            placeholder="name@muc-cargo.de"
          />
        </label>
        <label className="admin-login__field" htmlFor="admin-password">
          <span>Passwort</span>
          <input
            id="admin-password"
            name="password"
            type="password"
            className="admin-login__input"
            autoComplete="current-password"
            required
            placeholder="••••••••"
          />
        </label>
      </div>

      <button
        type="submit"
        className="admin-btn admin-btn--primary"
        disabled={pending}
      >
        {pending ? "Anmelden…" : "Anmelden"}
      </button>
    </form>
  );
}
