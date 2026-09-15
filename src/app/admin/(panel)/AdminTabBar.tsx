"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  href: string;
  label: string;
  icon: "inbox" | "team" | "gear" | "person";
  match: (path: string) => boolean;
  adminOnly?: boolean;
};

const TABS: Tab[] = [
  {
    href: "/admin",
    label: "Anfragen",
    icon: "inbox",
    match: (path) =>
      path === "/admin" ||
      (path.startsWith("/admin/") &&
        !path.startsWith("/admin/team") &&
        !path.startsWith("/admin/system") &&
        !path.startsWith("/admin/konto")),
  },
  {
    href: "/admin/team",
    label: "Team",
    icon: "team",
    adminOnly: true,
    match: (path) => path.startsWith("/admin/team"),
  },
  {
    href: "/admin/system",
    label: "System",
    icon: "gear",
    adminOnly: true,
    match: (path) => path.startsWith("/admin/system"),
  },
  {
    href: "/admin/konto",
    label: "Konto",
    icon: "person",
    match: (path) => path.startsWith("/admin/konto"),
  },
];

function TabIcon({ name, active }: { name: Tab["icon"]; active: boolean }) {
  const stroke = active ? "var(--a-tint)" : "currentColor";
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
    className: "admin-tabbar__icon",
  };

  switch (name) {
    case "inbox":
      return (
        <svg {...common}>
          <path
            d="M4.5 7.5h15v10.2a1.8 1.8 0 0 1-1.8 1.8H6.3a1.8 1.8 0 0 1-1.8-1.8V7.5Z"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 7.5 7.2 4.5h9.6l2.7 3M9 12.5h6"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="8.2" r="2.4" stroke={stroke} strokeWidth="1.7" />
          <circle cx="15.4" cy="9" r="2" stroke={stroke} strokeWidth="1.7" />
          <path
            d="M4.6 18.2c.4-2.6 2.5-4 4.4-4s4 1.4 4.4 4M14 14.5c1.5.1 3.1 1.1 3.5 3.4"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.35" stroke={stroke} strokeWidth="1.7" />
          <path
            d="M12 4.4v1.5M12 18.1v1.5M4.4 12h1.5M18.1 12h1.5M6.6 6.6l1.1 1.1M16.3 16.3l1.1 1.1M6.6 17.4l1.1-1.1M16.3 7.7l1.1-1.1"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="8.2" r="2.6" stroke={stroke} strokeWidth="1.7" />
          <path
            d="M6.2 19c.5-3.1 2.7-4.8 5.8-4.8s5.3 1.7 5.8 4.8"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function AdminTabBar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const tabs = TABS.filter((tab) => isAdmin || !tab.adminOnly);

  return (
    <nav className="admin-tabbar" aria-label="Admin-Navigation">
      <ul className="admin-tabbar__list">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          return (
            <li key={tab.href} className="admin-tabbar__item">
              <Link
                href={tab.href}
                className={`admin-tabbar__link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <TabIcon name={tab.icon} active={active} />
                <span className="admin-tabbar__label">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
