"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
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
  const rootRef = useRef<HTMLDivElement>(null);

  // Schreibt die tatsaechliche Leistenhoehe als CSS-Variable auf <html>,
  // damit die Kopfzeile direkt darunter andocken kann (sticky top: var(...)),
  // statt beim Scrollen zu verschwinden. Reagiert auch auf die Auf/Zu-
  // Animation und auf Umbrueche bei schmalen Bildschirmen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const set = () => {
      document.documentElement.style.setProperty("--topbar-h", `${el.offsetHeight}px`);
    };
    set();
    const observer = new ResizeObserver(set);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      ref={rootRef}
      className={`top-bar${open ? "" : " is-closed"}${ready ? " is-ready" : ""}`}
      role="region"
      aria-label="Schnellkontakt"
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      <div className="top-bar__collapse">
        <div className="page-container top-bar__inner">
          <div className="top-bar__items">
            {/* Ab 1380px steht die Zulassung fest in der Kopfzeile; dann wird
                sie hier ausgeblendet, damit sie nicht doppelt erscheint.
                Darunter ist im Header kein Platz – dort bleibt sie hier. */}
            <div className="top-bar__item top-bar__item--cert">
              <p className="top-bar__label">Reglementierter Beauftragter</p>
              <p className="top-bar__value">{COMPANY.regAgent}</p>
            </div>

            <div className="top-bar__contact-row">
              <div className="top-bar__item">
                <p className="top-bar__label">Telefon</p>
                <a href={`tel:${COMPANY.phoneTel}`} className="top-bar__value top-bar__link">
                  {COMPANY.phone}
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

          {/* War zuvor absolut ueber der animierten Hoehe positioniert und
              driftete dabei sichtbar aus der Leiste heraus. Jetzt normales
              Flex-Kind – bleibt dadurch immer exakt im Zeilenraster. */}
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
      </div>
    </div>
  );
}
