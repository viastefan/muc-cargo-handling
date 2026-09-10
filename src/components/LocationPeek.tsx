"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { COMPANY, MAPS_LINK } from "@/lib/company";
import { CONSENT_COOKIE, CONSENT_EVENT, readCookie } from "@/lib/consent-cookies";

const DISMISS_KEY = "muc-location-peek-dismissed";
const DELAY_MS = 2600;

// Hydration-Gate nach demselben Muster wie LeadCaptureWidget/CookieConsent —
// vermeidet setState-in-Effect.
const noopSubscribe = () => () => {};
const getMounted = () => true;
const getMountedServer = () => false;

/**
 * Kleiner Standort-Hinweis unten links. Erscheint einmal pro Session kurz
 * nach dem Laden (sofern die Cookie-Entscheidung gefallen ist) und zeigt
 * kompakt, wo MUC Cargohandling sitzt — mit direktem Weg zur Route.
 * Gegenstück zum Anfrage-Widget unten rechts, kollidiert nicht damit.
 */
export function LocationPeek() {
  const pathname = usePathname();
  const mounted = useSyncExternalStore(noopSubscribe, getMounted, getMountedServer);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const consentDecided = () => {
    try {
      return readCookie(CONSENT_COOKIE) !== null;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!mounted) return;
    // Auf der Kontaktseite gibt es die volle Karte bereits.
    if (pathname === "/kontakt" || pathname.startsWith("/admin")) return;

    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) return;

    let timer: number | undefined;
    const arm = () => {
      if (!consentDecided()) return;
      timer = window.setTimeout(() => setVisible(true), DELAY_MS);
    };

    arm();
    const onConsent = () => {
      if (!timer && !visible) arm();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      if (timer) window.clearTimeout(timer);
    };
  }, [mounted, pathname, visible]);

  const dismiss = useCallback(() => {
    setLeaving(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    window.setTimeout(() => setVisible(false), 220);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <aside className={`location-peek${leaving ? " is-leaving" : ""}`} aria-label="Standort">
      <button
        type="button"
        className="location-peek__close"
        aria-label="Hinweis schließen"
        onClick={dismiss}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      <div className="location-peek__map" aria-hidden="true">
        <svg viewBox="0 0 120 96" preserveAspectRatio="xMidYMid slice">
          <rect width="120" height="96" fill="var(--surface-2)" />
          <path
            d="M-4 66 L44 44 L82 60 L128 40 M20 -4 L36 40 L26 100 M76 -4 L70 52 L96 100"
            stroke="var(--border)"
            strokeWidth="6"
            fill="none"
          />
          <path d="M52 8 L120 44" stroke="var(--border)" strokeWidth="3" fill="none" strokeDasharray="5 5" />
          <g transform="translate(60 48)">
            <circle r="13" fill="color-mix(in srgb, var(--brand) 22%, transparent)">
              <animate attributeName="r" values="10;18;10" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <circle r="5.5" fill="var(--brand)" stroke="#fff" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <div className="location-peek__body">
        <p className="location-peek__eyebrow">Standort</p>
        <p className="location-peek__title">Am Flughafen München</p>
        <p className="location-peek__addr">
          {COMPANY.office.line1}
          <br />
          {COMPANY.office.line2}
        </p>
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="location-peek__cta"
        >
          Route öffnen
          <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
            <path
              d="M5.5 2.5 11 8l-5.5 5.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </aside>
  );
}
