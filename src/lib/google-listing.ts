import { COMPANY, MAPS_LINK } from "@/lib/company";

/**
 * Copy-Paste-Daten für das Google Unternehmensprofil (Business Profile).
 *
 * Ein öffentlicher Pin in Google Maps entsteht nicht über die Website, sondern
 * erst nach einem bestätigten Profil. Die Felder hier entsprechen den
 * Stammdaten; die Straße „Südallee“ ist zusätzlich nötig, weil Google die
 * Büroadresse „Frachtzentrum, Modul H, Pavillon“ oft nicht geocodiert.
 * Der Pin selbst wird manuell auf COMPANY.coordinates gesetzt.
 */
export type ListingField = {
  label: string;
  value: string;
  hint?: string;
};

export const GOOGLE_LISTING = {
  name: COMPANY.legalName,
  street: "Südallee",
  addressLine2: COMPANY.office.line1,
  city: "München-Flughafen",
  postalCode: "85356",
  region: "Bayern",
  country: "Deutschland",
  /** Eine Zeile zum Einfügen, falls Google nur ein Adressfeld anbietet. */
  addressOneLine: `Südallee, ${COMPANY.office.line1}, 85356 München-Flughafen`,
  phone: COMPANY.phone,
  phoneE164: COMPANY.phoneTel,
  email: COMPANY.email,
  /** Immer die öffentliche Domain — nie http:// und nie die Vercel-Vorschau. */
  website: "https://www.muc-cargo.de",
  websitePublic: "https://www.muc-cargo.de",
  appointmentUrl: "https://www.muc-cargo.de/kontakt",
  categoryPrimary: "Frachtspeditionsdienst",
  categoryAdditional: ["Spedition", "Logistikdienst"] as const,
  coordinates: `${COMPANY.coordinates.lat}, ${COMPANY.coordinates.lng}`,
  pinUrl: MAPS_LINK,
  createUrl: "https://business.google.com/create",
  searchExistingUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${COMPANY.legalName} München-Flughafen`,
  )}`,
  placeIdFinderUrl:
    "https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder",
  founded: "Mai 2003",
  foundedYear: "2003",
  hoursBlock: [
    "Montag: 08:00–17:00",
    "Dienstag: 08:00–17:00",
    "Mittwoch: 08:00–17:00",
    "Donnerstag: 08:00–17:00",
    "Freitag: 08:00–17:00",
    "Samstag: Geschlossen",
    "Sonntag: Geschlossen",
  ].join("\n"),
  hoursNote: COMPANY.hours.note,
  description:
    "Luftfracht-Handling am Flughafen München seit 2003: Import und Export, Airline Handling sowie Röntgen- und Sicherheitskontrollen. MUC Cargohandling GmbH ist reglementierter Beauftragter (DE/RA/01278-01). Büro im Frachtzentrum, Modul H, Pavillon; Warenannahme Modul E, E48, Rampe 51. Bürozeiten Montag bis Freitag 08:00–17:00 Uhr. Für zeitkritische Sendungen 24/7 erreichbar. Persönliche Ansprechpartner, kurze Wege zum Cargo-Drehkreuz.",
} as const;

export const GOOGLE_SERVICES: readonly { name: string; description: string }[] = [
  {
    name: "Luftfracht Import",
    description:
      "Annahme, Erfassung, Sicherheitsfreigabe und termingerechte Übergabe eingehender Sendungen am Cargo-Drehkreuz München.",
  },
  {
    name: "Luftfracht Export",
    description:
      "Check-in, Sicherung, Dokumentation und Übergabe ausgehender Fracht an Airline und Ramp.",
  },
  {
    name: "Airline Handling",
    description:
      "Operative Schnittstelle zwischen Airline, Spedition und Warehouse – Import, Export und ULD-Prozesse.",
  },
  {
    name: "Röntgenkontrolle",
    description:
      "Bildgebende Prüfung nach Luftsicherheitsvorgaben als reglementierter Beauftragter.",
  },
  {
    name: "Sichtkontrolle",
    description:
      "Äußere Prüfung auf Unversehrtheit, Kennzeichnung und Auffälligkeiten durch geschulte Fachkräfte.",
  },
  {
    name: "Handdurchsuchung",
    description:
      "Manuelle Vertiefung, wenn Technik allein nicht ausreicht – dokumentiert und nachvollziehbar.",
  },
  {
    name: "Sprengstoff-Spurendetektion",
    description: "ETD als ergänzendes Verfahren im Sicherheitsprozess.",
  },
  {
    name: "Dokumentation",
    description:
      "Vollständige Unterlagen für Airline, Spedition und Behörden – AWB, Zoll und Freigabeprotokolle.",
  },
  {
    name: "ULD-Handling",
    description: "Sicherheits- und Unit-Load-Device-Handling am Standort München.",
  },
  {
    name: "Einlagerung",
    description:
      "Kontrollierte Zwischenlagerung vor der Übergabe an Airline, Spedition oder Empfänger.",
  },
];

export const GOOGLE_PHOTOS: readonly ListingField[] = [
  {
    label: "Logo",
    value: "public/images/shared/logo-red.png",
    hint: "Unter Fotos → Logo. Quadratisch, ohne weißen Rand wenn möglich.",
  },
  {
    label: "Titelbild / Cover",
    value: "public/images/home/hero.jpg",
    hint: "Unter Fotos → Titelbild. Querformat, Betrieb am Flughafen – kein Schriftzug, kein zweites Logo.",
  },
  {
    label: "Team / Innen",
    value: "public/images/home/team-band.jpg",
  },
  {
    label: "Lager",
    value: "public/images/airline-handling/warehouse-check.jpg",
  },
  {
    label: "Vorfeld / Handling",
    value: "public/images/airline-handling/cargo-tarmac.jpg",
  },
  {
    label: "Beladung",
    value: "public/images/airline-handling/aircraft-loading.jpg",
  },
  {
    label: "Sicherheit",
    value: "public/images/luftfracht/security-checkpoint.jpg",
  },
  {
    label: "Dokumentation",
    value: "public/images/luftfracht/documentation-desk.jpg",
  },
];

export const GOOGLE_POST: ListingField = {
  label: "Erster Beitrag",
  value:
    "Luftfracht am Flughafen München – Import, Export, Airline Handling und Sicherheitskontrollen aus einer Hand. Als reglementierter Beauftragter (DE/RA/01278-01) verbinden wir Abwicklung und Luftsicherheit am Cargo-Drehkreuz. Büro: Frachtzentrum, Modul H, Pavillon. Schreiben Sie uns: muc-cargo.de/kontakt",
  hint: "Unter Beiträge → Beitrag erstellen. Button „Mehr erfahren“ auf https://www.muc-cargo.de/kontakt.",
};

export const GOOGLE_QA: readonly { question: string; answer: string }[] = [
  {
    question: "Wo ist euer Standort am Flughafen München?",
    answer:
      "Büro: Frachtzentrum, Modul H, Pavillon, 85356 München-Flughafen. Warenannahme: Modul E, E48, Rampe 51. Nicht identisch mit CHI in Modul F.",
  },
  {
    question: "Seid ihr reglementierter Beauftragter?",
    answer:
      "Ja. MUC Cargohandling GmbH ist reglementierter Beauftragter unter DE/RA/01278-01.",
  },
  {
    question: "Welche Öffnungszeiten habt ihr?",
    answer:
      "Bürozeiten Montag bis Freitag 08:00–17:00 Uhr. Für zeitkritische Sendungen sind wir 24/7 erreichbar.",
  },
  {
    question: "Macht ihr Import und Export?",
    answer:
      "Ja. Wir übernehmen Annahme, Dokumentation, Sicherheitskontrolle und Übergabe – Import wie Export, plus Airline Handling und Röntgen.",
  },
];

/**
 * Nachbarn am Frachtzentrum. Google hängt die Suche „muc cargo handling"
 * und den Pin 48.3504/11.7671 oft an deren bestehende Einträge.
 * Nicht klaimen, nicht deren Adresse übernehmen.
 */
export const CARGO_NEIGHBORS = [
  {
    name: "CHI MUC Cargo Handling GmbH",
    address: "Modul F, Zimmer 325-333, Südallee 1, 85356 Hallbergmoos",
    phone: "089 97596170",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      "CHI MUC Cargo Handling GmbH Hallbergmoos",
    )}`,
  },
  {
    name: "transmaritim international",
    address: "Südallee 1, Modul G, Raum 333 + 335, 85399 Hallbergmoos",
    phone: "089 238878980",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      "transmaritim international Hallbergmoos",
    )}`,
  },
] as const;

/** @deprecated Alias — CHI bleibt der Such-Treffer rechts. */
export const CHI_NEIGHBOR = CARGO_NEIGHBORS[0];

export const GOOGLE_LISTING_FIELDS: readonly ListingField[] = [
  {
    label: "Unternehmensname",
    value: GOOGLE_LISTING.name,
    hint: "Genau so, ein Wort: Cargohandling. Im Screenshot fehlt „GmbH“ — unter Profil bearbeiten ergänzen. Nicht „MUC Cargo Handling“ (CHI).",
  },
  {
    label: "Kategorie",
    value: GOOGLE_LISTING.categoryPrimary,
    hint: "Steht schon. Falls Google nachfasst: ganzen Namen tippen, nicht nur „Fracht“.",
  },
  {
    label: "Weitere Kategorien",
    value: GOOGLE_LISTING.categoryAdditional.join(", "),
    hint: "Unter Profil bearbeiten hinzufügen. Hauptkategorie bleibt Frachtspeditionsdienst.",
  },
  {
    label: "Straße",
    value: GOOGLE_LISTING.street,
    hint: "Google findet „Frachtzentrum“ allein oft nicht — Südallee ist die Straße im Cargo-Bereich.",
  },
  {
    label: "Adresszusatz",
    value: GOOGLE_LISTING.addressLine2,
    hint: "Entspricht der Büroadresse auf der Website.",
  },
  { label: "PLZ / Ort", value: `${GOOGLE_LISTING.postalCode} ${GOOGLE_LISTING.city}` },
  {
    label: "Adresse in einer Zeile",
    value: GOOGLE_LISTING.addressOneLine,
    hint: "Falls Google nur ein Feld anbietet.",
  },
  { label: "Telefon", value: GOOGLE_LISTING.phone },
  {
    label: "Telefon (international)",
    value: GOOGLE_LISTING.phoneE164,
    hint: "Falls Google die Nummer im internationalen Format verlangt.",
  },
  { label: "E-Mail", value: GOOGLE_LISTING.email },
  {
    label: "Website",
    value: GOOGLE_LISTING.websitePublic,
    hint: "https mit www. Im Screenshot steht http://muc-cargo.de/ — das jetzt ändern. Nicht die Vercel-Vorschau.",
  },
  {
    label: "Anfrage-Link",
    value: GOOGLE_LISTING.appointmentUrl,
    hint: "Falls Google „Termin / Kontakt-URL“ anbietet. Keine Online-Buchung aktivieren.",
  },
  {
    label: "Gründungsjahr",
    value: GOOGLE_LISTING.foundedYear,
    hint: "Feld „Unternehmen eröffnet“. Gegründet Mai 2003 als ALD, seit 2015 MUC Cargohandling GmbH.",
  },
  {
    label: "Pin-Koordinaten",
    value: GOOGLE_LISTING.coordinates,
    hint: "Standort auf der Karte anpassen. Nicht transmaritim (Modul G) und nicht CHI (Modul F).",
  },
  {
    label: "Beschreibung",
    value: GOOGLE_LISTING.description,
    hint: "Unter Profil bearbeiten, max. 750 Zeichen.",
  },
];

export const GOOGLE_HOURS_FIELDS: readonly ListingField[] = [
  {
    label: "Öffnungszeiten",
    value: GOOGLE_LISTING.hoursBlock,
    hint: "Button „Öffnungszeiten hinzufügen“. Bürozeiten, nicht 24 Stunden – sonst zeigt Google nachts „Geöffnet“ am Pavillon.",
  },
  {
    label: "Hinweis zu den Zeiten",
    value: GOOGLE_LISTING.hoursNote,
    hint: "In die Beschreibung oder ins Feld „Weitere Informationen“. Mobil: +49 176 2004 7750.",
  },
];

export const GOOGLE_SERVICE_FIELDS: readonly ListingField[] = GOOGLE_SERVICES.map((item) => ({
  label: item.name,
  value: item.description,
  hint: "Unter Dienstleistungen → hinzufügen. Name = Label oben, Text = Beschreibung.",
}));

export const GOOGLE_QA_FIELDS: readonly ListingField[] = GOOGLE_QA.map((item) => ({
  label: item.question,
  value: item.answer,
  hint: "Unter Fragen und Antworten als Inhaber selbst stellen und beantworten.",
}));
