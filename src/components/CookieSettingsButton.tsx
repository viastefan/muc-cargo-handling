"use client";

import { openConsentSettings } from "@/lib/consent-cookies";

export function CookieSettingsButton({
  className = "footer-link",
}: {
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={openConsentSettings}>
      Cookie-Einstellungen
    </button>
  );
}
