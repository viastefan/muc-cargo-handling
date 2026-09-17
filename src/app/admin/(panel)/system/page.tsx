import { requireAdminRole } from "@/lib/admin-session";
import { runSystemChecks, type Check } from "@/lib/system-check";

export const dynamic = "force-dynamic";

function Icon({ state }: { state: Check["state"] }) {
  if (state === "ok") {
    return (
      <span className="admin-check__icon is-ok" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path
            d="m3.5 8.5 3 3 6-6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (state === "info") {
    return (
      <span className="admin-check__icon is-info" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </span>
    );
  }
  return (
    <span className="admin-check__icon is-missing" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path
          d="M8 4.5v4.2M8 11.4v.1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default async function SystemPage() {
  await requireAdminRole();
  const checks = await runSystemChecks();

  const open = checks.filter((c) => c.state === "missing");

  return (
    <>
      <h1 className="admin-page-title">Einrichtung</h1>

      <p className="admin-hint" style={{ marginTop: 0, marginBottom: "1.25rem" }}>
        {open.length === 0
          ? "Alles eingerichtet. Anfragen werden gespeichert und Benachrichtigungen können zugestellt werden."
          : `${open.length} ${open.length === 1 ? "Punkt" : "Punkte"} offen — darunter steht jeweils, was zu tun ist.`}
      </p>

      <div className="admin-card">
        <p className="admin-card__title">Status</p>
        <ul className="admin-checklist">
          {checks.map((check) => (
            <li key={check.label} className="admin-check">
              <Icon state={check.state} />
              <div className="admin-check__body">
                <p className="admin-check__label">{check.label}</p>
                <p className="admin-check__detail">{check.detail}</p>
                {check.state === "missing" && check.fix ? (
                  <p className="admin-check__fix">{check.fix}</p>
                ) : null}
                {check.state === "info" && check.fix ? (
                  <p className="admin-check__fix">{check.fix}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
