"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonArrowIcon } from "./ButtonArrowIcon";
import { COMPANY } from "@/lib/company";

type Props = {
  label?: string;
  href?: string;
};

export function HeroContactCta({
  label = "Schreiben Sie uns",
  href = "/kontakt",
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`hero-contact-cta${open ? " is-open" : ""}`}>
      <div className="hero-contact-cta__button">
        <Link href={href} className="hero-contact-cta__label">
          {label}
        </Link>
        <button
          type="button"
          className="hero-contact-cta__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="menu"
          aria-label="Kontaktoptionen anzeigen"
          onClick={() => setOpen((value) => !value)}
        >
          <ButtonArrowIcon light className={open ? "hero-contact-cta__arrow--open" : ""} />
        </button>
      </div>

      <div
        id={menuId}
        role="menu"
        className="hero-contact-cta__menu"
        aria-hidden={!open}
      >
        <p className="hero-contact-cta__menu-title" role="presentation">
          Kontaktanfragen
        </p>
        <Link
          href={href}
          role="menuitem"
          className="hero-contact-cta__menu-item"
          onClick={() => setOpen(false)}
        >
          Per E-Mail anfragen
        </Link>
        <a
          href={`tel:${COMPANY.phoneDisplayTel}`}
          role="menuitem"
          className="hero-contact-cta__menu-item"
          onClick={() => setOpen(false)}
        >
          Anrufen
        </a>
      </div>
    </div>
  );
}
