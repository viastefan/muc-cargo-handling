import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import { inquiriesStorageReady } from "@/lib/inquiries";
import { logoutAction } from "./actions";
import { AccountMenu } from "./AccountMenu";
import { AdminTabBar } from "./AdminTabBar";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const principal = await requireAdmin();
  const isAdmin = principal.role === "admin";

  return (
    <div className="admin-shell">
      <header className="admin-bar">
        <div className="admin-bar__left">
          <Link href="/admin" className="admin-bar__brand">
            <span className="admin-bar__brand-full">MUC Cargohandling</span>
            <span className="admin-bar__brand-short" aria-hidden="true">
              Anfragen
            </span>
            <span className="admin-bar__brand-tag">Anfragen</span>
          </Link>
          <nav className="admin-nav">
            <Link href="/admin">Anfragen</Link>
            {isAdmin ? (
              <>
                <Link href="/admin/team">Team</Link>
                <Link href="/admin/system">Einrichtung</Link>
              </>
            ) : null}
          </nav>
        </div>
        <div className="admin-bar__actions">
          <a
            href="/api/admin/export"
            className="admin-btn admin-btn--sm admin-bar__export"
            download
          >
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

      <AdminTabBar isAdmin={isAdmin} />
    </div>
  );
}
