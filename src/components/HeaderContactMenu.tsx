"use client";

import Link from "next/link";
import { ButtonArrowIcon } from "./ButtonArrowIcon";
import { openInquiry } from "@/lib/inquiry-store";

type Props = {
  label?: string;
  href?: string;
};

/**
 * Header-CTA "Anfrage stellen". Frueher ein zweigeteilter Button: die
 * Beschriftung oeffnete direkt den Anfrage-Flow, die Ecke daneben ein
 * eigenes Dropdown (E-Mail/Anrufen/Kontaktformular) mit einem separaten
 * Modal. Jetzt ein einziger Klickbereich — die ganze Flaeche oeffnet
 * denselben Anfrage-Flow wie der schwebende Chat-Button, das Dropdown
 * war ein zweiter, inkonsistenter Weg zum selben Ziel.
 */
export function HeaderContactMenu({
  label = "Anfrage stellen",
  href = "/kontakt",
}: Props) {
  return (
    <Link
      href={href}
      className="header-contact-menu__button"
      onClick={(event) => {
        // href bleibt erhalten, damit Cmd/Ctrl-Klick, Mittelklick und
        // Crawler weiter auf der vollstaendigen Kontaktseite landen.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openInquiry();
      }}
    >
      <span className="header-contact-menu__label">{label}</span>
      <span className="header-contact-menu__corner" aria-hidden="true">
        <ButtonArrowIcon light className="header-contact-menu__arrow" />
      </span>
    </Link>
  );
}
