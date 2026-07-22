"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "muc-cookie-consent-v1";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

type PanelMode = "banner" | "settings" | "hidden";

function writeConsent(state: ConsentState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("muc:cookie-consent", { detail: state }));
}

function subscribeConsent(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("muc:cookie-consent", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("muc:cookie-consent", handler);
  };
}

function getConsentSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

function FingerprintIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 11.5c0 3.2-.7 5.8-1.8 7.8M12 11.5c0-2.2-1.3-4-3.2-4.7M12 11.5c0 4.1.8 7.4 2.2 9.5M8.8 6.8A5.5 5.5 0 0 1 17.5 11.5c0 1.4-.1 2.7-.4 3.9M6.2 9.2A7.8 7.8 0 0 1 19.8 11.5c0 2.2-.3 4.2-.8 6M4.5 12.2c.4 4.2 1.7 7.5 3.4 9.3M17.8 18.8c1-1.5 1.8-3.6 2.2-6.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CookieConsent() {
  const stored = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerSnapshot);
  const existing = stored ? (JSON.parse(stored) as ConsentState) : null;

  const [mode, setMode] = useState<PanelMode | null>(null);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const titleId = useId();

  const resolvedMode: PanelMode =
    mode ?? (existing ? "hidden" : "banner");

  useEffect(() => {
    if (resolvedMode !== "settings") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [resolvedMode]);

  const save = useCallback((nextAnalytics: boolean, nextMarketing: boolean) => {
    const state: ConsentState = {
      necessary: true,
      analytics: nextAnalytics,
      marketing: nextMarketing,
      decidedAt: new Date().toISOString(),
    };
    writeConsent(state);
    setAnalytics(nextAnalytics);
    setMarketing(nextMarketing);
    setMode("hidden");
  }, []);

  const acceptAll = () => save(true, true);
  const rejectOptional = () => save(false, false);
  const saveSettings = () => save(analytics, marketing);

  return (
    <>
      {resolvedMode === "banner" ? (
        <div className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby={titleId}>
          <div className="cookie-banner__inner">
            <div className="cookie-banner__copy">
              <p className="cookie-banner__eyebrow">Datenschutz · Cookie-Einwilligung</p>
              <h2 id={titleId} className="cookie-banner__title">
                Wir respektieren Ihre Privatsphäre
              </h2>
              <p className="cookie-banner__text">
                Wir verwenden technisch notwendige Cookies sowie – nur mit Ihrer Einwilligung –
                optionale Cookies für Statistik und Marketing. Details finden Sie in unserer{" "}
                <Link href="/datenschutz" className="cookie-banner__link">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
            <div className="cookie-banner__actions">
              <button type="button" className="cookie-banner__btn cookie-banner__btn--ghost" onClick={rejectOptional}>
                Nur notwendige
              </button>
              <button
                type="button"
                className="cookie-banner__btn cookie-banner__btn--secondary"
                onClick={() => setMode("settings")}
              >
                Einstellungen
              </button>
              <button type="button" className="cookie-banner__btn cookie-banner__btn--primary" onClick={acceptAll}>
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {resolvedMode === "settings" ? (
        <div className="cookie-settings">
          <button
            type="button"
            className="cookie-settings__backdrop"
            aria-label="Einstellungen schließen"
            onClick={() => setMode(existing ? "hidden" : "banner")}
          />
          <div
            className="cookie-settings__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${titleId}-settings`}
          >
            <div className="cookie-settings__header">
              <div>
                <p className="cookie-banner__eyebrow">Cookie-Einstellungen</p>
                <h2 id={`${titleId}-settings`} className="cookie-settings__title">
                  Einwilligung verwalten
                </h2>
              </div>
              <button
                type="button"
                className="cookie-settings__close"
                aria-label="Schließen"
                onClick={() => setMode(existing ? "hidden" : "banner")}
              >
                ×
              </button>
            </div>

            <div className="cookie-settings__list">
              <div className="cookie-settings__item">
                <div>
                  <p className="cookie-settings__name">Notwendig</p>
                  <p className="cookie-settings__desc">
                    Erforderlich für Grundfunktionen der Website. Immer aktiv.
                  </p>
                </div>
                <span className="cookie-settings__badge">Aktiv</span>
              </div>

              <label className="cookie-settings__item cookie-settings__item--toggle">
                <div>
                  <p className="cookie-settings__name">Statistik</p>
                  <p className="cookie-settings__desc">
                    Anonyme Nutzungsanalysen zur Verbesserung unserer Angebote.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="cookie-settings__checkbox"
                />
              </label>

              <label className="cookie-settings__item cookie-settings__item--toggle">
                <div>
                  <p className="cookie-settings__name">Marketing</p>
                  <p className="cookie-settings__desc">
                    Cookies für relevante Inhalte und optionale Marketing-Funktionen.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                  className="cookie-settings__checkbox"
                />
              </label>
            </div>

            <div className="cookie-settings__actions">
              <button type="button" className="cookie-banner__btn cookie-banner__btn--ghost" onClick={rejectOptional}>
                Ablehnen
              </button>
              <button type="button" className="cookie-banner__btn cookie-banner__btn--primary" onClick={saveSettings}>
                Auswahl speichern
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {resolvedMode === "hidden" ? (
        <button
          type="button"
          className="cookie-fab"
          aria-label="Cookie-Einstellungen öffnen"
          title="Cookie-Einstellungen"
          onClick={() => {
            if (existing) {
              setAnalytics(existing.analytics);
              setMarketing(existing.marketing);
            }
            setMode("settings");
          }}
        >
          <FingerprintIcon className="cookie-fab__icon" />
        </button>
      ) : null}
    </>
  );
}
