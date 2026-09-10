"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ButtonArrowIcon } from "./ButtonArrowIcon";
import { MailIcon, PhoneIcon } from "./ArrowIcon";
import { COMPANY } from "@/lib/company";
import { openInquiry } from "@/lib/inquiry-store";

type Props = {
  label?: string;
};

/**
 * Header-CTA "Anfrage stellen" mit Auswahl-Popover.
 *
 * Ein Klick öffnet ein kleines Panel mit den Kontaktwegen — es lässt sich
 * jederzeit ohne Auswahl wieder schließen (Klick daneben, Esc, erneuter Klick).
 *   • Anfrage stellen  → geführter Anfrage-Flow (Popup)
 *   • Kontaktformular  → vollständige Seite /kontakt
 *   • Anrufen / E-Mail → direkter Draht
 */
export function HeaderContactMenu({ label = "Anfrage stellen" }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        rootRef.current?.querySelector<HTMLButtonElement>(".header-contact-menu__button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => firstItemRef.current?.focus(), 20);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, close]);

  return (
    <div className="header-contact-menu" ref={rootRef}>
      <button
        type="button"
        className="header-contact-menu__button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="header-contact-menu__label">{label}</span>
        <span
          className={`header-contact-menu__corner${open ? " is-open" : ""}`}
          aria-hidden="true"
        >
          <ButtonArrowIcon light className="header-contact-menu__arrow" />
        </span>
      </button>

      <div
        id={menuId}
        role="menu"
        className="header-contact-menu__panel"
        data-open={open}
        aria-hidden={!open}
      >
        <button
          ref={firstItemRef}
          type="button"
          role="menuitem"
          className="header-contact-menu__item header-contact-menu__item--primary"
          tabIndex={open ? 0 : -1}
          onClick={() => {
            close();
            openInquiry();
          }}
        >
          <span className="header-contact-menu__item-body">
            <span className="header-contact-menu__item-title">Anfrage stellen</span>
            <span className="header-contact-menu__item-sub">
              Geführt in wenigen Schritten
            </span>
          </span>
          <ButtonArrowIcon className="header-contact-menu__item-arrow" />
        </button>

        <Link
          href="/kontakt"
          role="menuitem"
          className="header-contact-menu__item"
          tabIndex={open ? 0 : -1}
          onClick={close}
        >
          <span className="header-contact-menu__item-body">
            <span className="header-contact-menu__item-title">Zum Kontaktformular</span>
            <span className="header-contact-menu__item-sub">
              Ausführlich, mit allen Angaben
            </span>
          </span>
          <ButtonArrowIcon className="header-contact-menu__item-arrow" />
        </Link>

        <div className="header-contact-menu__divider" role="separator" />

        <a
          href={`tel:${COMPANY.phoneTel}`}
          role="menuitem"
          className="header-contact-menu__item header-contact-menu__item--compact"
          tabIndex={open ? 0 : -1}
          onClick={close}
        >
          <PhoneIcon className="header-contact-menu__item-icon" />
          <span className="header-contact-menu__item-title">{COMPANY.phoneDisplay}</span>
        </a>
        <a
          href={`mailto:${COMPANY.email}`}
          role="menuitem"
          className="header-contact-menu__item header-contact-menu__item--compact"
          tabIndex={open ? 0 : -1}
          onClick={close}
        >
          <MailIcon className="header-contact-menu__item-icon" />
          <span className="header-contact-menu__item-title">{COMPANY.email}</span>
        </a>
      </div>
    </div>
  );
}
