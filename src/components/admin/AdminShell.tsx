"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/cms/actions";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Business-Profil" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/ops", label: "Ops-Status" },
  { href: "/admin/banner", label: "Top-Banner" },
  { href: "/admin/inquiries", label: "Anfragen" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/documents", label: "Dokumente" },
  { href: "/admin/content", label: "Seiten-Texte" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/settings", label: "Einstellungen" },
] as const;

function navActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({
  title,
  children,
  persistLabel,
}: {
  title: string;
  children: React.ReactNode;
  persistLabel?: string;
}) {
  const pathname = usePathname() || "/admin";

  return (
    <div className="admin-root">
      <div className="admin-shell">
        <aside className="admin-sidebar" aria-label="Admin-Navigation">
          <div className="admin-sidebar__brand">
            <strong>MUC Cargo Atelier</strong>
            <span>Admin-Backend</span>
          </div>
          <nav>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link${navActive(pathname, item.href) ? " is-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="admin-sidebar__footer">
            <Link href="/" className="admin-nav-link">
              Zur Website
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="admin-nav-link" style={{ width: "100%", textAlign: "left", background: "transparent", border: 0, cursor: "pointer" }}>
                Abmelden
              </button>
            </form>
          </div>
        </aside>

        <div className="admin-main">
          <header className="admin-topbar">
            <h1 className="admin-topbar__title">{title}</h1>
            <div className="admin-topbar__actions">
              {persistLabel ? <span className="admin-badge">{persistLabel}</span> : null}
              <Link href="/" className="admin-btn admin-btn--ghost">
                Zur Website
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="admin-btn admin-btn--soft">
                  Abmelden
                </button>
              </form>
            </div>
          </header>

          <nav className="admin-mobile-nav" aria-label="Admin-Bereiche">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navActive(pathname, item.href) ? "is-active" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="admin-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
