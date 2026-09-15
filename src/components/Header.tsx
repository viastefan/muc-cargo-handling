"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { HeaderContactMenu } from "./HeaderContactMenu";

const NAV = [
  { href: "/unternehmen", label: "Unternehmen" },
  { href: "/luftfracht", label: "Luftfracht" },
  { href: "/airline-handling", label: "Handling" },
  { href: "/roentgen", label: "Röntgen" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header-wrap">
      <div className="apple-nav">
        <Link href="/" className="apple-nav__brand">
          <BrandLogo priority className="apple-nav__logo" />
        </Link>

        <nav className="apple-nav__links" aria-label="Hauptnavigation">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`apple-nav__link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="apple-nav__cta">
          <HeaderContactMenu label="Anfrage" />
        </div>
      </div>
    </header>
  );
}
