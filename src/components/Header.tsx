"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { HeaderContactMenu } from "./HeaderContactMenu";
import { Button } from "./Button";
import { ButtonArrowIcon } from "./ButtonArrowIcon";
import { MailIcon, PhoneIcon } from "./ArrowIcon";
import { COMPANY } from "@/lib/company";
import { openInquiry } from "@/lib/inquiry-store";

const NAV = [
  { href: "/unternehmen", label: "Unternehmen" },
  { href: "/luftfracht", label: "Luftfracht Import Export" },
  { href: "/airline-handling", label: "Airline Handling" },
  { href: "/roentgen", label: "Röntgen" },
];

/* Im mobilen Menue zusaetzlich die Kontaktseite — dort gibt es keinen
   Header-CTA mit Auswahl-Popover. */
const MOBILE_NAV = [...NAV, { href: "/kontakt", label: "Kontakt" }];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return () => document.body.classList.remove("menu-open");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
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

        {NAV.map((item) => (
          <div
            key={item.href}
            className={`site-header-cell site-header-cell--nav ${isActive(item.href) ? "is-active" : ""}`}
          >
            <Link href={item.href} className="site-header-link">
              {item.label}
            </Link>
          </div>
        ))}

        <div className="site-header-cell site-header-cta p-0">
          <HeaderContactMenu />
        </div>
      </div>

      {/* Mobile Kopfzeile: Logo links, rechts nur zwei ruhige Icon-Ziele
          (Anrufen, Menue) ohne Kacheln oder Rahmen. */}
      <div className="mobile-bar lg:hidden">
        <Link href="/" className="mobile-bar__logo" onClick={() => setOpen(false)}>
          <BrandLogo priority className="mobile-bar__logo-img" />
        </Link>

        <div className="mobile-bar__actions">
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="mobile-bar__icon"
            aria-label={`Anrufen: ${COMPANY.phone}`}
          >
            <PhoneIcon className="mobile-bar__icon-svg" />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-toggle__box" aria-hidden="true">
              <span className="menu-toggle-line" />
              <span className="menu-toggle-line" />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-panel"
        className="mobile-nav-panel lg:hidden"
        data-open={open}
        inert={!open ? true : undefined}
      >
        <nav className="mobile-nav" aria-label="Hauptnavigation">
          <ul className="mobile-nav__list">
            {MOBILE_NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="mobile-nav-item">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`mobile-nav__link${active ? " is-active" : ""}`}
                  >
                    <span>{item.label}</span>
                    <ButtonArrowIcon className="mobile-nav__arrow" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mobile-nav__footer mobile-nav-item">
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
            <div className="mobile-nav__contact">
              <a href={`tel:${COMPANY.phoneTel}`} className="mobile-nav__contact-link">
                <PhoneIcon />
                Anrufen
              </a>
              <a href={`mailto:${COMPANY.email}`} className="mobile-nav__contact-link">
                <MailIcon />
                E-Mail
              </a>
            </div>
            <p className="mobile-nav__cert">
              Reglementierter Beauftragter · {COMPANY.regAgent}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
