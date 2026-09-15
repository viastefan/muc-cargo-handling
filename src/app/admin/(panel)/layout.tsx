import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import { probeConnection } from "@/lib/system-check";
import { logoutAction } from "./actions";
import { AccountMenu } from "./AccountMenu";
import { AdminTabBar } from "./AdminTabBar";
import { ConnectionBanner } from "./ConnectionBanner";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const principal = await requireAdmin();
  const isAdmin = principal.role === "admin";
  const probe = await probeConnection();

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
          <span
            className="admin-bar__conn"
            title={probe.detail}
            aria-label={
              probe.state === "ok"
                ? `Datenbank verbunden${probe.latencyMs != null ? `, ${probe.latencyMs} Millisekunden` : ""}`
                : "Verbindung gestört"
            }
          >
            <span
              className={`admin-bar__pulse${probe.state === "ok" ? " is-ok" : " is-bad"}`}
              aria-hidden="true"
            />
            <span className="admin-bar__conn-label" aria-hidden="true">
              {probe.state === "ok"
                ? probe.latencyMs != null
                  ? `${probe.latencyMs} ms`
                  : "Online"
                : "Offline"}
            </span>
          </span>
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
        {probe.state === "missing" ? (
          <ConnectionBanner probe={probe} showSetupLink={isAdmin} />
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
