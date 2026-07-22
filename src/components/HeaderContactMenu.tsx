"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonArrowIcon } from "./ButtonArrowIcon";
import {
  ContactActionModal,
  type ContactAction,
} from "./ContactActionModal";

type Props = {
  label?: string;
  href?: string;
};

export function HeaderContactMenu({
  label = "Anfrage stellen",
  href = "/kontakt",
}: Props) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<ContactAction>(null);
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
      if (event.key === "Escape" && !action) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, action]);

  const openAction = (next: Exclude<ContactAction, null>) => {
    setOpen(false);
    setAction(next);
  };

  return (
    <>
      <div ref={rootRef} className={`header-contact-menu${open ? " is-open" : ""}`}>
        <div className="header-contact-menu__button">
          <button
            type="button"
            className="header-contact-menu__label"
            onClick={() => setOpen((value) => !value)}
          >
            {label}
          </button>
          <button
            type="button"
            className="header-contact-menu__toggle"
            aria-expanded={open}
            aria-controls={menuId}
            aria-haspopup="menu"
            aria-label="Kontaktoptionen anzeigen"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setOpen((value) => !value);
            }}
          >
            <ButtonArrowIcon light className={open ? "header-contact-menu__arrow--open" : ""} />
          </button>
        </div>

        {open ? (
          <div id={menuId} role="menu" className="header-contact-menu__menu">
            <p className="header-contact-menu__menu-title" role="presentation">
              Kontaktanfragen
            </p>
            <button
              type="button"
              role="menuitem"
              className="header-contact-menu__menu-item"
              onClick={() => openAction("email")}
            >
              Per E-Mail anfragen
            </button>
            <button
              type="button"
              role="menuitem"
              className="header-contact-menu__menu-item"
              onClick={() => openAction("phone")}
            >
              Anrufen
            </button>
            <Link
              href={href}
              role="menuitem"
              className="header-contact-menu__menu-item"
              onClick={() => setOpen(false)}
            >
              Kontaktformular
            </Link>
          </div>
        ) : null}
      </div>

      <ContactActionModal action={action} onClose={() => setAction(null)} />
    </>
  );
}
