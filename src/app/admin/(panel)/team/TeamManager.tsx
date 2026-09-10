"use client";

import { useActionState, useState } from "react";
import { teamAction, toggleUserAction, type TeamState } from "./actions";
import type { AdminUser } from "@/lib/admin-users";

const initial: TeamState = {};

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function TeamManager({ users }: { users: AdminUser[] }) {
  const [state, action, pending] = useActionState(teamAction, initial);
  const [showAdd, setShowAdd] = useState(users.length === 0);

  return (
    <>
      {state.credentials ? (
        <div className="admin-flash">
          <p className="admin-flash__title">{state.credentials.label}</p>
          <p className="admin-flash__hint">
            Einmal-Passwort — jetzt an die Person weitergeben. Es wird nicht erneut
            angezeigt.
          </p>
          <div className="admin-flash__creds">
            <span>E-Mail</span>
            <code>{state.credentials.email}</code>
            <span>Passwort</span>
            <code>{state.credentials.password}</code>
          </div>
        </div>
      ) : null}

      {state.error ? (
        <p className="admin-error" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="admin-card">
        <div
          className="admin-card__title"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <span>Benutzer</span>
          <button
            type="button"
            className="admin-btn admin-btn--sm"
            onClick={() => setShowAdd((v) => !v)}
          >
            {showAdd ? "Schließen" : "＋ Benutzer"}
          </button>
        </div>

        {showAdd ? (
          <form action={action} className="admin-card__body admin-adduser">
            <input type="hidden" name="intent" value="create" />
            <div className="admin-adduser__row">
              <div>
                <label className="admin-label" htmlFor="u-name">Name</label>
                <input id="u-name" name="name" className="admin-input" required autoComplete="off" />
              </div>
              <div>
                <label className="admin-label" htmlFor="u-email">E-Mail</label>
                <input id="u-email" name="email" type="email" className="admin-input" required autoComplete="off" />
              </div>
              <div>
                <label className="admin-label" htmlFor="u-role">Rolle</label>
                <select id="u-role" name="role" className="admin-select" defaultValue="member">
                  <option value="member">Mitglied</option>
                  <option value="admin">Admin (Team-Verwaltung)</option>
                </select>
              </div>
            </div>
            <button type="submit" className="admin-btn admin-btn--sm" disabled={pending}>
              {pending ? "Anlegen…" : "Anlegen"}
            </button>
          </form>
        ) : null}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Rolle</th>
                <th>Zuletzt aktiv</th>
                <th>Status</th>
                <th aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ color: "var(--muted)", textAlign: "center", padding: "2rem" }}>
                    Noch keine Benutzer. Bis dahin gilt der Master-Zugang.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} style={{ cursor: "default" }}>
                    <td style={{ fontWeight: 550 }}>{u.name}</td>
                    <td style={{ color: "var(--muted)" }}>{u.email}</td>
                    <td>{u.role === "admin" ? "Admin" : "Mitglied"}</td>
                    <td style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>
                      {fmtDate(u.lastLoginAt)}
                    </td>
                    <td>
                      <span className={`admin-badge admin-badge--${u.active ? "done" : "archived"}`}>
                        {u.active ? "Aktiv" : "Deaktiviert"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                        <form action={action}>
                          <input type="hidden" name="intent" value="reset" />
                          <input type="hidden" name="id" value={u.id} />
                          <button type="submit" className="admin-btn admin-btn--sm admin-btn--plain">
                            Passwort
                          </button>
                        </form>
                        <form action={toggleUserAction}>
                          <input type="hidden" name="id" value={u.id} />
                          <button
                            type="submit"
                            className={`admin-btn admin-btn--sm${u.active ? " admin-btn--plain" : ""}`}
                          >
                            {u.active ? "Deaktivieren" : "Aktivieren"}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
