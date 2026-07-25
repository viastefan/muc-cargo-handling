import type { CmsData } from "./types";

/** Default password: muccargo1! (PBKDF2-SHA256, 120k iterations) */
const DEFAULT_AUTH = {
  passwordSalt: "0f587a9424737c2fc7265ffcdf445ca9",
  passwordHash: "0453f7b5794a388d213a0985fa2c72de2f2a8c187e40985a3107791938f30fd4",
  iterations: 120000,
  notificationEmail: "info@muc-cargo.de",
  updatedAt: new Date(0).toISOString(),
};

export function createDefaultCmsData(): CmsData {
  const now = new Date().toISOString();

  return {
    version: 1,
    businessProfile: {
      legalName: "MUC Cargohandling GmbH",
      brandName: "MUC Cargo Handling",
      shortName: "MUC Cargo",
      tagline: "Luftfrachtabwicklung am Flughafen München — seit 2003.",
      addressLine1: "Südallee Modul F, Box E 48",
      addressLine2: "",
      postalCode: "85356",
      city: "München-Flughafen",
      phone: "+49 (0)89 – 975 94 870",
      phoneTel: "+498997594870",
      emergencyPhone: "+49 (0)176 – 200 477 50",
      emergencyPhoneTel: "+4917620047750",
      email: "info@muc-cargo.de",
      instagram: "",
      linkedin: "",
      hoursWeekday: "Mo–Fr 06:00–22:00",
      hoursWeekend: "Sa–So nach Vereinbarung",
      mapsUrl: "https://maps.google.com/?q=Südallee+München+Flughafen",
      logoUrl: "/images/shared/logo.png",
      regAgent: "DE/RA/01278-01",
    },
    siteContent: {
      homeHeroEyebrow: "",
      homeHeroTitle: "Präzise Abwicklung und Sicherheit für Ihre Luftfracht am Flughafen München",
      homeHeroLede:
        "Mit strukturierten Abläufen, erfahrenem Personal und hohen Qualitätsstandards begleiten wir Ihre Sendungen – von der Annahme bis zur Sicherheitskontrolle.",
      homeHeroCtaLabel: "Schreiben Sie uns",
      homeHeroCtaHref: "/kontakt",
      closingTitle: "Wir freuen uns auf Ihre Anfrage.",
      closingLede:
        "Von Import bis Export übernehmen wir die zuverlässige Abwicklung Ihrer Luftfrachtsendungen am Flughafen München.",
      aboutIntro: "Seit 2003 am Flughafen München.",
      aboutBody:
        "Als Reglementierter Beauftragter verbinden wir Handling, Dokumentation und Sicherheitsprozesse unter einem Dach.",
    },
    newsPosts: [],
    services: [
      {
        id: "svc-luftfracht",
        title: "Luftfracht Import & Export",
        summary: "Annahme, Dokumentation und Übergabe am Standort München.",
        href: "/luftfracht",
        visible: true,
        sortOrder: 0,
        updatedAt: now,
      },
      {
        id: "svc-airline",
        title: "Airline Handling",
        summary: "Station handling mit klaren Schnittstellen zur Ramp.",
        href: "/airline-handling",
        visible: true,
        sortOrder: 1,
        updatedAt: now,
      },
      {
        id: "svc-roentgen",
        title: "Röntgen & Sicherheit",
        summary: "Sicherheitskontrollen nach Luftsicherheitsvorgaben.",
        href: "/roentgen",
        visible: true,
        sortOrder: 2,
        updatedAt: now,
      },
    ],
    opsStatus: {
      level: "normal",
      title: "Betrieb normal",
      message: "Keine aktuellen Einschränkungen am Standort.",
      publicVisible: false,
      validUntil: null,
      updatedAt: now,
    },
    topBanner: {
      text: "",
      href: "",
      active: false,
      style: "brand",
      updatedAt: now,
    },
    inquiries: [],
    jobs: [],
    faqs: [],
    documents: [],
    team: [],
    auth: DEFAULT_AUTH,
    meta: {
      lastWriteAt: null,
      lastWriteSource: null,
      backend: "filesystem",
      ok: true,
      detail: "Seed defaults",
    },
  };
}
