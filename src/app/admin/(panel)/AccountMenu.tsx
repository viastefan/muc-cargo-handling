"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function AccountMenu({
  name,
  email,
  isRoot,
  logoutAction,
}: {
  name: string;
  email: string | null;
  isRoot: boolean;
  logoutAction: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="admin-account" ref={ref}>
      <button
        type="button"
        className="admin-account__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Konto"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="admin-account__avatar">{initials(name)}</span>
      </button>

      <div className="admin-account__menu" data-open={open} role="menu">
        <div className="admin-account__head">
          <p className="admin-account__name">{name}</p>
          <p className="admin-account__email">
            {isRoot ? "Master-Zugang" : email}
          </p>
        </div>
        {!isRoot ? (
          <Link
            href="/admin/konto"
            className="admin-account__item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Passwort ändern
          </Link>
        ) : null}
        <a
          href="/api/admin/export"
          className="admin-account__item admin-account__export"
          role="menuitem"
          download
          onClick={() => setOpen(false)}
        >
          CSV exportieren
        </a>
        <form action={logoutAction}>
          <button
            type="submit"
            className="admin-account__item admin-account__item--danger"
            role="menuitem"
          >
            Abmelden
          </button>
        </form>
      </div>
    </div>
  );
}
