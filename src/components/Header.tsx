"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
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
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
      <div className="page-container flex h-[68px] items-center justify-between gap-3 sm:h-[72px] lg:h-[76px]">
        <Link href="/" className="shrink-0 transition-opacity duration-300 hover:opacity-80" onClick={() => setOpen(false)}>
          <BrandLogo priority />
        </Link>

        <nav className="hidden items-center lg:flex">
          {NAV.map((item, i) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <div key={item.href} className="flex items-center">
                {i > 0 && <span className="mx-1 h-3.5 w-px bg-[var(--border)]" aria-hidden />}
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-[11px] font-normal uppercase tracking-[0.09em] transition-colors duration-300 ${
                    active ? "text-[var(--brand)]" : "text-[var(--foreground)] hover:text-[var(--brand)]"
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/kontakt">Anfrage stellen</Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-[var(--border)] transition-colors duration-300 hover:border-[var(--muted-light)] lg:hidden"
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
              <Button href="/kontakt" className="w-full" onClick={() => setOpen(false)}>
                Anfrage stellen
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
