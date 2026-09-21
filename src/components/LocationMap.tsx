"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { PinIcon } from "@/components/ArrowIcon";
import { ExternalLink } from "@/components/ExternalLink";
import { COMPANY, MAPS_PLACE_URL } from "@/lib/company";
import {
  CONSENT_EVENT,
  hasMarketingConsent,
  readConsent,
} from "@/lib/consent-cookies";
import { getOpenStatus } from "@/lib/hours";

function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

/**
 * Google-Maps-Einbindung mit Zwei-Klick-Lösung (DSGVO): die Karte wird erst
 * geladen, nachdem die Nutzer:in aktiv zustimmt — oder wenn zuvor bereits eine
 * Marketing-Einwilligung erteilt wurde. Vorher fließen keine Daten an Google.
 */
export function LocationMap({ embedSrc }: { embedSrc: string }) {
  const consentValue = useSyncExternalStore(
    subscribeConsent,
    () => (hasMarketingConsent(readConsent()) ? "yes" : "no"),
    () => "no",
  );
  const [manualLoad, setManualLoad] = useState(false);
  const showMap = manualLoad || consentValue === "yes";

  const [status, setStatus] = useState<ReturnType<typeof getOpenStatus> | null>(null);
  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    const first = setTimeout(update, 0);
    const id = setInterval(update, 60_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="location-map">
      <div className="location-map__frame">
        {showMap ? (
          <iframe
            title={`Standort ${COMPANY.legalName} – ${COMPANY.office.line1}, ${COMPANY.office.line2}`}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="location-map__consent">
            <div className="location-map__consent-grid" aria-hidden="true" />
            <span className="location-map__consent-pin" aria-hidden="true">
              <PinIcon className="h-9 w-9" />
            </span>
            <p className="location-map__consent-title">Kartenansicht (Google Maps)</p>
            <p className="location-map__consent-text">
              Beim Laden werden Daten an Google übertragen. Details in der{" "}
              <a href="/datenschutz" className="location-map__consent-link">
                Datenschutzerklärung
              </a>
              .
            </p>
            <button
              type="button"
              className="location-map__consent-btn"
              onClick={() => setManualLoad(true)}
            >
              Karte laden
            </button>
          </div>
        )}
      </div>
      <div className="location-map__info">
        <span className="location-map__icon" aria-hidden="true">
          <PinIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="location-map__name">{COMPANY.legalName}</p>
          <p className="location-map__address">
            {COMPANY.office.line1}
            <br />
            {COMPANY.office.line2}
          </p>
          {status ? (
            <p className={`location-map__status${status.open ? " is-open" : ""}`}>
              <span className="location-map__status-dot" aria-hidden="true" />
              <span>
                <strong>{status.label}</strong> · {status.detail}
                <br />
                <span className="location-map__status-note">{COMPANY.hours.note}</span>
              </span>
            </p>
          ) : null}
          <ExternalLink href={MAPS_PLACE_URL} className="location-map__directions">
            Anfahrt in Google Maps
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}
