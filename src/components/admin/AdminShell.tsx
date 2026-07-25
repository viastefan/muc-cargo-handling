"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/cms/actions";
import { AdminIcon, type AdminIconName } from "@/components/admin/AdminIcon";

const NAV: { href: string; label: string; icon: AdminIconName }[] = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/profile", label: "Business-Profil", icon: "building" },
  { href: "/admin/news", label: "News", icon: "news" },
  { href: "/admin/services", label: "Services", icon: "services" },
  { href: "/admin/ops", label: "Ops-Status", icon: "ops" },
  { href: "/admin/banner", label: "Top-Banner", icon: "banner" },
  { href: "/admin/inquiries", label: "Anfragen", icon: "inbox" },
  { href: "/admin/jobs", label: "Jobs", icon: "jobs" },
  { href: "/admin/faq", label: "FAQ", icon: "faq" },
  { href: "/admin/documents", label: "Dokumente", icon: "docs" },
  { href: "/admin/content", label: "Seiten-Texte", icon: "content" },
  { href: "/admin/team", label: "Team", icon: "team" },
  { href: "/admin/settings", label: "Einstellungen", icon: "settings" },
];

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
            <span className="admin-sidebar__mark" aria-hidden="true">
              <AdminIcon name="spark" size={16} />
            </span>
            <div>
              <strong>MUC Cargo Atelier</strong>
              <span>Admin-Backend</span>
            </div>
          </div>
          <nav className="admin-sidebar__nav">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link${navActive(pathname, item.href) ? " is-active" : ""}`}
              >
                <span className="admin-nav-link__icon">
                  <AdminIcon name={item.icon} size={16} />
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="admin-sidebar__footer">
            <Link href="/" className="admin-nav-link">
              <span className="admin-nav-link__icon">
                <AdminIcon name="external" size={16} />
              </span>
              <span>Zur Website</span>
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="admin-nav-link admin-nav-link--button">
                <span className="admin-nav-link__icon">
                  <AdminIcon name="logout" size={16} />
                </span>
                <span>Abmelden</span>
              </button>
            </form>
          </div>
        </aside>

        <div className="admin-main">
          <header className="admin-topbar">
            <h1 className="admin-topbar__title">{title}</h1>
            <div className="admin-topbar__actions">
              {persistLabel ? (
                <span className="admin-badge admin-badge--persist">
                  <AdminIcon name="persist" size={13} />
                  {persistLabel}
                </span>
              ) : null}
              <Link href="/" className="admin-btn admin-btn--ghost">
                <AdminIcon name="external" size={15} />
                Zur Website
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="admin-btn admin-btn--soft">
                  <AdminIcon name="logout" size={15} />
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
                <AdminIcon name={item.icon} size={14} />
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
