"use client";

import { useSyncExternalStore } from "react";
import { COMPANY } from "@/lib/company";

const STORAGE_KEY = "muc-top-bar-dismissed";
const listeners = new Set<() => void>();

function subscribeTopBar(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function emitTopBarChange() {
  listeners.forEach((listener) => listener());
}

function getTopBarSnapshot() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1" ? "closed" : "open";
  } catch {
    return "open";
  }
}

function getServerSnapshot() {
  return "open";
}

export function TopBar() {
  const open = useSyncExternalStore(subscribeTopBar, getTopBarSnapshot, getServerSnapshot) === "open";
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    emitTopBarChange();
  };

  return (
    <div
      className={`top-bar${open ? "" : " is-closed"}${ready ? " is-ready" : ""}`}
      role="region"
      aria-label="Schnellkontakt"
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      <div className="top-bar__collapse">
        <div className="page-container top-bar__inner">
          <div className="top-bar__items">
            <div className="top-bar__item">
              <p className="top-bar__label">Reglementierter Beauftragter</p>
              <p className="top-bar__value">Reg.B. {COMPANY.regAgent}</p>
            </div>

            <div className="top-bar__contact-row">
              <div className="top-bar__item">
                <p className="top-bar__label">Telefon</p>
                <a href={`tel:${COMPANY.phoneTel}`} className="top-bar__value top-bar__link">
                  T. {COMPANY.phone}
                </a>
              </div>

              <div className="top-bar__item">
                <p className="top-bar__label">E-Mail</p>
                <a href={`mailto:${COMPANY.email}`} className="top-bar__value top-bar__link">
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="top-bar__close"
        aria-label="Kontaktleiste schließen"
        onClick={dismiss}
        tabIndex={open ? 0 : -1}
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
