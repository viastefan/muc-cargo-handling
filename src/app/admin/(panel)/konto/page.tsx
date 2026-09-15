import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import { AdminSubmitButton } from "../AdminSubmitButton";
import { KontoForm } from "./KontoForm";
import { logoutEverywhereAction } from "./actions";

export default async function KontoPage({
  searchParams,
}: {
  searchParams: Promise<{ first?: string; loggedOutElsewhere?: string }>;
}) {
  const principal = await requireAdmin();
  const { first, loggedOutElsewhere } = await searchParams;

  return (
    <>
      <h1 className="admin-page-title">Konto</h1>

      {first === "1" ? (
        <p className="admin-hint" style={{ marginTop: 0, marginBottom: "1.25rem" }}>
          Willkommen, {principal.name}. Bitte zuerst ein eigenes Passwort setzen.
        </p>
      ) : null}

      <div className="admin-card">
        <p className="admin-card__title">Angemeldet</p>
        <div className="admin-card__body">
          <dl className="admin-dl">
            <div>
              <dt>Name</dt>
              <dd>{principal.name}</dd>
            </div>
            <div>
              <dt>E-Mail</dt>
              <dd>{principal.email ?? "— (Master-Zugang)"}</dd>
            </div>
            <div>
              <dt>Rolle</dt>
              <dd>{principal.role === "admin" ? "Admin" : "Mitglied"}</dd>
            </div>
          </dl>
        </div>
      </div>

      {principal.isRoot ? (
        <p className="admin-hint" style={{ marginTop: "1rem" }}>
          Der Master-Zugang nutzt <code>ADMIN_PASSWORD</code> aus den
          Environment-Variablen und hat kein eigenes Konto-Passwort.{" "}
          <Link href="/admin/team">Team-Benutzer anlegen →</Link>
        </p>
      ) : (
        <>
          <div className="admin-card" style={{ marginTop: "1rem" }}>
            <p className="admin-card__title">Passwort ändern</p>
            <KontoForm />
          </div>

          <div className="admin-card" style={{ marginTop: "1rem" }}>
            <p className="admin-card__title">Sicherheit</p>
            <div className="admin-card__body">
              {loggedOutElsewhere === "1" ? (
                <p className="admin-hint" style={{ marginTop: 0 }}>
                  Alle anderen Anmeldungen wurden beendet.
                </p>
              ) : loggedOutElsewhere === "0" ? (
                <p className="admin-error" style={{ marginTop: 0 }}>
                  Fehlgeschlagen — bitte erneut versuchen.
                </p>
              ) : null}
              <p className="admin-hint" style={{ marginTop: 0, marginBottom: "0.75rem" }}>
                Meldet dieses Gerät nicht ab, beendet aber jede andere aktive
                Anmeldung — etwa nach einem verlorenen Handy oder einem
                verkauften Laptop.
              </p>
              <form action={logoutEverywhereAction}>
                <AdminSubmitButton pendingLabel="Wird beendet …">
                  Auf allen anderen Geräten abmelden
                </AdminSubmitButton>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
