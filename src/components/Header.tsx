"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { HeaderContactMenu } from "./HeaderContactMenu";
import { Button } from "./Button";

const NAV = [
  { href: "/unternehmen", label: "Unternehmen" },
  { href: "/luftfracht", label: "Luftfracht Import Export" },
  { href: "/airline-handling", label: "Airline Handling" },
  { href: "/roentgen", label: "Röntgen" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header-wrap sticky top-0 z-50 bg-white">
      <div className="site-header hidden lg:grid">
        <div className="site-header-cell site-header-logo">
          <Link href="/" className="transition-opacity duration-300 hover:opacity-80">
            <BrandLogo priority />
          </Link>
        </div>

        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <div
              key={item.href}
              className={`site-header-cell site-header-cell--nav ${active ? "is-active" : ""}`}
            >
              <Link href={item.href} className="site-header-link">
                {item.label}
              </Link>
            </div>
          );
        })}

        <div className="site-header-cell site-header-cta p-0">
          <HeaderContactMenu />
        </div>
      </div>

      <div className="flex h-[68px] items-center justify-between gap-3 px-[var(--page-x)] sm:h-[72px] lg:hidden">
        <Link href="/" className="shrink-0 transition-opacity duration-300 hover:opacity-80" onClick={() => setOpen(false)}>
          <BrandLogo priority />
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/kontakt"
            className="header-mobile-cta"
            onClick={() => setOpen(false)}
          >
            Anfrage stellen
          </Link>
          <button
            type="button"
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-sm transition-opacity duration-300 hover:opacity-60"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menü</span>
            <div className="flex w-5 flex-col items-center justify-center gap-[5px]">
              <span className={`menu-toggle-line ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`menu-toggle-line ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`menu-toggle-line ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <div className="mobile-nav-panel border-t border-[var(--border)] bg-white lg:hidden" data-open={open}>
        <div className="mobile-nav-inner">
          <nav className="page-container flex flex-col py-3">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-item border-b border-[var(--border)] py-3.5 text-[13px] font-normal uppercase tracking-[0.07em] transition-colors last:border-b-0 ${
                    active ? "text-[var(--brand)]" : "text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mobile-nav-item pt-4">
              <Button href="/kontakt" fullWidth onClick={() => setOpen(false)}>
                Anfrage stellen
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
