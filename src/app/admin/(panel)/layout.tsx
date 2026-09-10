import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import { inquiriesStorageReady } from "@/lib/inquiries";
import { logoutAction } from "./actions";
import { AccountMenu } from "./AccountMenu";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const principal = await requireAdmin();

  return (
    <div className="admin-shell">
      <header className="admin-bar">
        <div className="admin-bar__left">
          <Link href="/admin" className="admin-bar__brand">
            MUC Cargohandling <span>Anfragen</span>
          </Link>
          <nav className="admin-nav">
            <Link href="/admin">Anfragen</Link>
            {principal.role === "admin" ? <Link href="/admin/team">Team</Link> : null}
          </nav>
        </div>
        <div className="admin-bar__actions">
          <a href="/api/admin/export" className="admin-btn admin-btn--sm" download>
            CSV
          </a>
          <AccountMenu
            name={principal.name}
            email={principal.email}
            isRoot={principal.isRoot}
            logoutAction={logoutAction}
          />
        </div>
      </header>

      <main className="admin-main">
        {!inquiriesStorageReady ? (
          <p className="admin-error" style={{ marginBottom: "1.5rem" }}>
            Kein Datenspeicher verbunden — <code>SUPABASE_URL</code> /{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> setzen und die Migrationen
            ausführen. Bis dahin bleibt die Liste leer.
          </p>
        ) : null}

        {principal.mustChangePw ? (
          <p className="admin-error" style={{ marginBottom: "1.5rem" }}>
            Bitte ein eigenes Passwort vergeben:{" "}
            <Link href="/admin/konto" style={{ fontWeight: 600 }}>
              Zum Konto →
            </Link>
          </p>
        ) : null}

        {children}
      </main>
    </div>
  );
}
