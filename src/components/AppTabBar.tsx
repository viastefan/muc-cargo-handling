"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Start", match: (path: string) => path === "/" },
  {
    href: "/luftfracht",
    label: "Fracht",
    match: (path: string) =>
      path.startsWith("/luftfracht") || path.startsWith("/airline-handling"),
  },
  {
    href: "/roentgen",
    label: "Sicherheit",
    match: (path: string) => path.startsWith("/roentgen"),
  },
  {
    href: "/unternehmen",
    label: "Firma",
    match: (path: string) => path.startsWith("/unternehmen"),
  },
  {
    href: "/kontakt",
    label: "Kontakt",
    match: (path: string) => path.startsWith("/kontakt"),
  },
] as const;

function TabIcon({ name, active }: { name: string; active: boolean }) {
  const stroke = active ? "var(--brand)" : "currentColor";
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
    className: "app-tabbar__icon",
  };

  switch (name) {
    case "Start":
      return (
        <svg {...common}>
          <path
            d="M4.5 10.5 12 4l7.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.2h-3.6V20.5H6A1.5 1.5 0 0 1 4.5 19v-8.5Z"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Fracht":
      return (
        <svg {...common}>
          <path
            d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M12 20V11.2M4 8.5l8 2.7 8-2.7" stroke={stroke} strokeWidth="1.7" />
        </svg>
      );
    case "Sicherheit":
      return (
        <svg {...common}>
          <path
            d="M12 3.5 19 6.2v5.1c0 4.3-2.9 7.3-7 8.7-4.1-1.4-7-4.4-7-8.7V6.2L12 3.5Z"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Firma":
      return (
        <svg {...common}>
          <path
            d="M4.5 20.5V8.2L12 4l7.5 4.2v12.3"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M9 20.5v-5h6v5M4.5 20.5h15" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="5" y="6" width="14" height="10.5" rx="2" stroke={stroke} strokeWidth="1.7" />
          <path d="m5 8.2 7 5 7-5" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
  }
}

export function AppTabBar() {
  const pathname = usePathname();

  return (
    <nav className="app-tabbar" aria-label="App-Navigation">
      <ul className="app-tabbar__list">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          return (
            <li key={tab.href} className="app-tabbar__item">
              <Link
                href={tab.href}
                className={`app-tabbar__link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <TabIcon name={tab.label} active={active} />
                <span className="app-tabbar__label">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
