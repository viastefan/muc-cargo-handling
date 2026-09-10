"use client";

import { useState, useSyncExternalStore } from "react";
import { PinIcon } from "@/components/ArrowIcon";
import { COMPANY, MAPS_LINK } from "@/lib/company";
import {
  CONSENT_EVENT,
  hasMarketingConsent,
  readConsent,
} from "@/lib/consent-cookies";

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
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="location-map__directions"
          >
            Anfahrt in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
