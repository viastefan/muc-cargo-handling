import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import { inquiriesStorageReady } from "@/lib/inquiries";
import { logoutAction } from "./actions";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="admin-shell">
      <header className="admin-bar">
        <Link href="/admin" className="admin-bar__brand">
          MUC Cargohandling <span>Anfragen</span>
        </Link>
        <div className="admin-bar__actions">
          <a
            href="/api/admin/export"
            className="admin-btn admin-btn--sm"
            download
          >
            CSV-Export
          </a>
          <form action={logoutAction}>
            <button type="submit" className="admin-btn admin-btn--sm">
              Abmelden
            </button>
          </form>
        </div>
      </header>

      <main className="admin-main">
        {!inquiriesStorageReady ? (
          <p className="admin-error" style={{ marginBottom: "1.5rem" }}>
            Kein Datenspeicher verbunden — <code>SUPABASE_URL</code> /{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> setzen und die Migration
            ausführen. Bis dahin bleibt die Liste leer.
          </p>
        ) : null}
        {children}
      </main>
    </div>
  );
}
