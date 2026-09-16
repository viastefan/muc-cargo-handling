/**
 * Zentrale Stammdaten.
 * Stand: Korrekturliste des Auftraggebers vom 18.08.2026 (MUC Cargohandling GmbH –
 * „Webseite Korrektur“) sowie Rückmeldung Lynn Onyeke zur Lageradresse.
 */
export const COMPANY = {
  legalName: "MUC Cargohandling GmbH",
  brandName: "MUC Cargohandling",
  regAgent: "DE/RA/01278-01",
  /** Pflichtangabe im Impressum (§ 5 DDG), Quelle: Impressum muc-cargo.de. */
  vatId: "DE290703412",
  email: "info@muc-cargo.de",
  phone: "+49 (0)89 – 975 94 877",
  phoneTel: "+498997594877",
  phoneDisplay: "089 – 975 94 877",
  mobile: "+49 (0)176 – 2004 7750",
  mobileTel: "+4917620047750",
  /** Warenannahme – bewusst getrennt von der Büroadresse ausgewiesen. */
  warehouse: {
    line1: "Frachtzentrum, Modul E, E48, Rampe 51",
    line2: "85356 München-Flughafen",
  },
  postfach: "Postfach 23 15 11",
  office: {
    line1: "Frachtzentrum, Modul H, Pavillon",
    line2: "85356 München-Flughafen",
  },
  /** Exakte Bürokoordinaten – der Google-Places-Eintrag sitzt derzeit falsch. */
  coordinates: { lat: 48.350443, lng: 11.767121 },
  /**
   * Google Place ID des Unternehmensprofils (Google Business Profile).
   * Über `GOOGLE_PLACE_ID` / `NEXT_PUBLIC_GOOGLE_PLACE_ID` setzen, sobald der
   * korrekte Places-Eintrag klaimt und die Koordinaten stimmen. Ohne Wert
   * verlinken wir nur über Koordinaten (hasMap) — besser als ein falscher Pin.
   */
  googlePlaceId:
    process.env.GOOGLE_PLACE_ID?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim() ||
    "",
  /**
   * Bürozeiten für die Live-Statusanzeige („Jetzt geöffnet" / „Geschlossen").
   * Werktags mo–fr; Wochenende geschlossen. Zeitzone Europe/Berlin.
   *
   * `confirmed` steuert, ob die Anzeige überhaupt erscheint: Solange die Zeiten
   * nicht vom Auftraggeber bestätigt sind, bleibt sie aus — eine falsche
   * Öffnungszeit auf der Live-Seite wäre schlimmer als gar keine. Nach der
   * Bestätigung hier die echten Werte eintragen und `confirmed: true` setzen.
   */
  hours: {
    confirmed: false,
    weekdays: { open: "08:00", close: "17:00" },
    note: "Für zeitkritische Sendungen 24/7 erreichbar",
  },
  /** Schwesterunternehmen am selben Standort, volle Firmierung laut Auftraggeber. */
  partners: [
    {
      name: "Airport-Verpackungs-Service GmbH",
      href: "https://www.airport-verpackungen.de",
    },
    {
      name: "APS Airport Packing Service GmbH",
      href: "https://www.airport-verpackungen.de",
    },
  ],
  /** Nur echte Profile eintragen – leere Liste blendet Icons aus */
  social: [] as readonly { href: string; label: "Facebook" | "Instagram" | "LinkedIn" }[],
  managingDirector: "Johnbosco Onyeke",
} as const;

const { lat, lng } = COMPANY.coordinates;

/** Pin exakt auf den Bürokoordinaten statt auf dem falschen Google-Places-Eintrag. */
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;

export const MAPS_EMBED = `https://maps.google.com/maps?q=${lat},${lng}&z=17&hl=de&ie=UTF8&iwloc=&output=embed`;

/**
 * Google-Maps-URL mit Place ID — für schema.org `hasMap` / `sameAs`.
 * Ohne Place ID fällt auf die Koordinaten-URL zurück.
 */
export const MAPS_PLACE_URL = COMPANY.googlePlaceId
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.legalName)}&query_place_id=${encodeURIComponent(COMPANY.googlePlaceId)}`
  : MAPS_LINK;

export const FOOTER_NAV = [
  { label: "Unternehmen", href: "/unternehmen" },
  { label: "Luftfracht", href: "/luftfracht" },
  { label: "Airline Handling", href: "/airline-handling" },
  { label: "Röntgen", href: "/roentgen" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
] as const;
