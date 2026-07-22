export const COMPANY = {
  legalName: "MUC Cargohandling GmbH",
  brandName: "MUC Cargo Handling",
  regAgent: "DE/RA/01278-01",
  email: "info@muc-cargo.de",
  phone: "+49 (0)89 – 975 94 870",
  phoneTel: "+498997594870",
  phoneDisplay: "089 – 975 948 77",
  phoneDisplayTel: "08997594877",
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
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  managingDirector: "Johnbosco Onyeke",
} as const;

export const FOOTER_MENU = [
  { label: "Team", href: "/unternehmen#team" },
  { label: "Ansprechpartner", href: "/unternehmen#team" },
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Luftfrachthandling", href: "/luftfracht" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const FOOTER_QUICK = [
  { label: "Was wir machen", href: "/unternehmen" },
  { label: "Alle Leistungen", href: "/#leistungen" },
  { label: "Unser Team", href: "/unternehmen#team" },
  { label: "Unser Standort", href: "/kontakt" },
] as const;

export const FOOTER_SERVICES = [
  { label: "Luftfracht Import Export", href: "/luftfracht" },
  { label: "Airline Handling", href: "/airline-handling" },
  { label: "Röntgen & Security", href: "/roentgen" },
] as const;
