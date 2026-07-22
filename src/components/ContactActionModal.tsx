"use client";

import { useCallback, useEffect } from "react";
import { COMPANY } from "@/lib/company";

export type ContactAction = "email" | "phone" | null;

type Props = {
  action: ContactAction;
  onClose: () => void;
};

export function ContactActionModal({ action, onClose }: Props) {
  const isOpen = action !== null;

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen || !action) return null;

  const isEmail = action === "email";
  const title = isEmail ? "Per E-Mail anfragen" : "Anrufen";
  const eyebrow = isEmail ? "E-Mail" : "Telefon";
  const primaryHref = isEmail
    ? `mailto:${COMPANY.email}`
    : `tel:${COMPANY.phoneTel.replace(/\s/g, "")}`;
  const primaryLabel = isEmail ? "E-Mail öffnen" : "Jetzt anrufen";
  const primaryValue = isEmail ? COMPANY.email : COMPANY.phone;
  const secondaryHref = isEmail
    ? null
    : `tel:${COMPANY.mobileTel.replace(/\s/g, "")}`;
  const secondaryLabel = isEmail ? null : "Mobil anrufen";
  const secondaryValue = isEmail ? null : COMPANY.mobile;

  return (
    <div className="contact-action" data-open="true">
      <button
        type="button"
        className="contact-action__backdrop"
        aria-label="Schließen"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-action-title"
        className="contact-action__panel"
      >
        <div className="contact-action__handle-wrap" aria-hidden="true">
          <span className="contact-action__handle" />
        </div>

        <div className="contact-action__header">
          <div>
            <p className="contact-action__eyebrow">{eyebrow}</p>
            <h2 id="contact-action-title" className="contact-action__title">
              {title}
            </h2>
            <p className="contact-action__lead">
              {isEmail
                ? "Schreiben Sie uns direkt – wir melden uns zeitnah zurück."
                : "Erreichen Sie unser Team am Flughafen München während der Betriebszeiten."}
            </p>
          </div>
          <button
            type="button"
            className="contact-action__close"
            aria-label="Schließen"
            onClick={close}
          >
            ×
          </button>
        </div>

        <div className="contact-action__body">
          <a href={primaryHref} className="contact-action__row">
            <span className="contact-action__row-label">
              {isEmail ? "E-Mail-Adresse" : "Telefon"}
            </span>
            <span className="contact-action__row-value">{primaryValue}</span>
          </a>
          {secondaryHref && secondaryValue ? (
            <a href={secondaryHref} className="contact-action__row">
              <span className="contact-action__row-label">Mobil</span>
              <span className="contact-action__row-value">{secondaryValue}</span>
            </a>
          ) : null}
          {!isEmail ? (
            <p className="contact-action__note">Fax: {COMPANY.fax}</p>
          ) : null}
        </div>

        <div className="contact-action__actions">
          <a href={primaryHref} className="contact-action__primary">
            {primaryLabel}
          </a>
          {secondaryHref && secondaryLabel ? (
            <a href={secondaryHref} className="contact-action__secondary">
              {secondaryLabel}
            </a>
          ) : null}
          <button type="button" className="contact-action__dismiss" onClick={close}>
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
