"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/shared/logo.svg"
            alt="MUC Cargo Handling"
            width={168}
            height={48}
            priority
          />
        </Link>

        <nav className="hidden items-center lg:flex">
          {NAV.map((item, i) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <div key={item.href} className="flex items-center">
                {i > 0 && <span className="mx-1 h-4 w-px bg-[var(--border)]" aria-hidden />}
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] transition-colors ${
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
          className="inline-flex h-10 w-10 items-center justify-center border border-[var(--border)] lg:hidden"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menü</span>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-[var(--foreground)] transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-[var(--foreground)] transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-[var(--foreground)] transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-white lg:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--border)] py-3 text-sm font-semibold uppercase tracking-[0.06em]"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button href="/kontakt" className="w-full justify-between">
                Anfrage stellen
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
