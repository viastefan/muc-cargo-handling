import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import { KontoForm } from "./KontoForm";

export default async function KontoPage({
  searchParams,
}: {
  searchParams: Promise<{ first?: string }>;
}) {
  const principal = await requireAdmin();
  const { first } = await searchParams;

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
        <div className="admin-card" style={{ marginTop: "1rem" }}>
          <p className="admin-card__title">Passwort ändern</p>
          <KontoForm />
        </div>
      )}
    </>
  );
}
