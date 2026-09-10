"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { HeaderContactMenu } from "./HeaderContactMenu";
import { Button } from "./Button";
import { COMPANY } from "@/lib/company";
import { openInquiry } from "@/lib/inquiry-store";

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
    <>
      <header className="site-header-wrap bg-[var(--background)]">
      <div className="site-header hidden lg:grid">
        <div className="site-header-cell site-header-logo">
          <Link
            href="/"
            className="site-header-logo-link transition-opacity duration-300 hover:opacity-80"
          >
            <BrandLogo priority className="site-header-logo-img" />
            <span className="site-header-cert">
              <span className="site-header-cert__label">Reglementierter Beauftragter</span>
              <span className="site-header-cert__value">{COMPANY.regAgent}</span>
            </span>
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

      <div className="flex h-[60px] items-center justify-between gap-3 px-3.5 sm:h-[64px] lg:hidden">
        <Link href="/" className="shrink-0 transition-opacity duration-300 hover:opacity-80" onClick={() => setOpen(false)}>
          <BrandLogo priority />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menü</span>
          <span className="menu-toggle__box" aria-hidden="true">
            <span className="menu-toggle-line" />
            <span className="menu-toggle-line" />
          </span>
        </button>
      </div>

      <div id="mobile-nav-panel" className="mobile-nav-panel bg-[var(--background)] lg:hidden" data-open={open}>
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
                    active ? "text-[var(--brand-text)]" : "text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mobile-nav-item flex flex-col gap-2.5 pt-4">
              <Button
                href="/kontakt"
                fullWidth
                onClick={(event) => {
                  setOpen(false);
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  openInquiry();
                }}
              >
                Anfrage stellen
              </Button>
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                className="text-center text-[13px] text-[var(--muted)] underline underline-offset-4 transition-colors hover:text-[var(--foreground)]"
              >
                Zum Kontaktformular
              </Link>
            </div>
          </nav>
        </div>
      </div>
      </header>

      <button
        type="button"
        className="mobile-nav-backdrop lg:hidden"
        data-open={open}
        aria-label="Menü schließen"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
