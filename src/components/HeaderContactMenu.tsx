"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonArrowIcon } from "./ButtonArrowIcon";
import { COMPANY } from "@/lib/company";

type Props = {
  label?: string;
  href?: string;
};

export function HeaderContactMenu({
  label = "Anfrage stellen",
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
    <div ref={rootRef} className={`header-contact-menu${open ? " is-open" : ""}`}>
      <div className="header-contact-menu__button">
        <Link href={href} className="header-contact-menu__label">
          {label}
        </Link>
        <button
          type="button"
          className="header-contact-menu__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="menu"
          aria-label="Kontaktoptionen anzeigen"
          onClick={() => setOpen((value) => !value)}
        >
          <ButtonArrowIcon light className={open ? "header-contact-menu__arrow--open" : ""} />
        </button>
      </div>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="header-contact-menu__menu"
        >
        <p className="header-contact-menu__menu-title" role="presentation">
          Kontaktanfragen
        </p>
        <Link
          href={href}
          role="menuitem"
          className="header-contact-menu__menu-item"
          onClick={() => setOpen(false)}
        >
          Per E-Mail anfragen
        </Link>
        <a
          href={`tel:${COMPANY.phoneTel.replace(/\s/g, "")}`}
          role="menuitem"
          className="header-contact-menu__menu-item"
          onClick={() => setOpen(false)}
        >
          Anrufen
        </a>
        </div>
      ) : null}
    </div>
  );
}
