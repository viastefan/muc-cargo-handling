"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { COMPANY, MAPS_EMBED, MAPS_LINK } from "@/lib/company";
import {
  CONSENT_COOKIE,
  CONSENT_EVENT,
  hasMarketingConsent,
  readConsent,
  readCookie,
} from "@/lib/consent-cookies";
import { getOpenStatus } from "@/lib/hours";
import { ExternalLink } from "@/components/ExternalLink";

const DISMISS_KEY = "muc-location-peek-dismissed";
const DELAY_MS = 2600;

const noopSubscribe = () => () => {};
const getMounted = () => true;
const getMountedServer = () => false;

function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

/**
 * Standort-Karte unten links. Erscheint einmal pro Session kurz nach dem
 * Laden. Zeigt eine echte Google-Karte (nur mit Marketing-Einwilligung — sonst
 * eine stilisierte Vorschau), die Adresse, den Live-Öffnungsstatus und einen
 * direkten Routen-Link.
 */
export function LocationPeek() {
  const pathname = usePathname();
  const mounted = useSyncExternalStore(noopSubscribe, getMounted, getMountedServer);
  const consent = useSyncExternalStore(
    subscribeConsent,
    () => (hasMarketingConsent(readConsent()) ? "yes" : "no"),
    () => "no",
  );
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [status, setStatus] = useState<ReturnType<typeof getOpenStatus> | null>(null);

  useEffect(() => {
    if (!visible) return;
    const update = () => setStatus(getOpenStatus());
    const first = setTimeout(update, 0);
    const id = setInterval(update, 60_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [visible]);

  useEffect(() => {
    if (!mounted) return;
    if (pathname === "/kontakt" || pathname.startsWith("/admin")) return;

    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) return;

    let timer: number | undefined;
    const decided = () => {
      try {
        return readCookie(CONSENT_COOKIE) !== null;
      } catch {
        return false;
      }
    };
    const arm = () => {
      if (decided()) timer = window.setTimeout(() => setVisible(true), DELAY_MS);
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
    <aside
      className={`location-peek${leaving ? " is-leaving" : ""}`}
      aria-label="Standort MUC Cargohandling"
    >
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

      <div className="location-peek__map">
        {consent === "yes" ? (
          <iframe
            title={`Standort ${COMPANY.legalName}`}
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : (
          <svg viewBox="0 0 120 84" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="120" height="84" fill="var(--surface-2)" />
            <path
              d="M-4 58 L44 38 L82 52 L128 34 M20 -4 L34 36 L24 90 M74 -4 L68 46 L92 90"
              stroke="var(--border)"
              strokeWidth="6"
              fill="none"
            />
            <path d="M50 6 L120 40" stroke="var(--border)" strokeWidth="3" fill="none" strokeDasharray="5 5" />
            <g transform="translate(60 42)">
              <circle r="12" fill="color-mix(in srgb, var(--brand) 22%, transparent)">
                <animate attributeName="r" values="9;16;9" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="var(--brand)" stroke="#fff" strokeWidth="2" />
            </g>
          </svg>
        )}
      </div>

      <div className="location-peek__body">
        <p className="location-peek__eyebrow">Standort</p>
        <p className="location-peek__title">Am Flughafen München</p>
        <p className="location-peek__addr">
          {COMPANY.office.line1}
          <br />
          {COMPANY.office.line2}
        </p>

        {status ? (
          <p className={`location-peek__status${status.open ? " is-open" : ""}`}>
            <span className="location-peek__dot" aria-hidden="true" />
            <span>
              <strong>{status.label}</strong>
              <span className="location-peek__status-detail"> · {status.detail}</span>
            </span>
          </p>
        ) : null}

        <ExternalLink href={MAPS_LINK} className="location-peek__cta">
          Route öffnen
        </ExternalLink>
      </div>
    </aside>
  );
}
