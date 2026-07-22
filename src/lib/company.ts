export const COMPANY = {
  legalName: "MUC Cargohandling GmbH",
  brandName: "MUC Cargo Handling",
  regAgent: "DE/RA/01278-01",
  email: "info@muc-cargo.de",
  phone: "+49 (0)89 – 975 94 870",
  phoneTel: "+498997594870",
  phoneDisplay: "089 – 975 94 870",
  fax: "+49 (0)89 – 975 94 871",
  mobile: "+49 (0)176 – 200 477 50",
  mobileTel: "+4917620047750",
  lager: {
    line1: "Lager: Südallee Modul E, OG 3, E 328 – E 336",
    line2: "Postfach 23 15 11",
    line3: "D-85356 München-Flughafen",
  },
  office: {
    line1: "Büroadresse: Südallee Modul F, Box E 48",
    line2: "D-85356 München-Flughafen",
  },
  partner: {
    label: "airportverpackungsservice.com",
    href: "https://airportverpackungsservice.com",
  },
  /** Nur echte Profile eintragen – leere Liste blendet Icons aus */
  social: [] as readonly { href: string; label: "Facebook" | "Instagram" | "LinkedIn" }[],
  managingDirector: "Johnbosco Onyeke",
} as const;

export const FOOTER_NAV = [
  { label: "Unternehmen", href: "/unternehmen" },
  { label: "Luftfracht", href: "/luftfracht" },
  { label: "Airline Handling", href: "/airline-handling" },
  { label: "Röntgen", href: "/roentgen" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
] as const;
