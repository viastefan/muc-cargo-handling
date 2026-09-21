import { COMPANY, MAPS_LINK } from "@/lib/company";
import { SITE_URL } from "@/lib/site";

/**
 * Copy-Paste-Daten für das Google Unternehmensprofil (Business Profile).
 *
 * Ein öffentlicher Pin in Google Maps entsteht nicht über die Website, sondern
 * erst nach einem bestätigten Profil. Die Felder hier entsprechen den
 * Stammdaten; die Straße „Südallee“ ist zusätzlich nötig, weil Google die
 * Büroadresse „Frachtzentrum, Modul H, Pavillon“ oft nicht geocodiert.
 * Der Pin selbst wird manuell auf COMPANY.coordinates gesetzt.
 */
const isPreviewHost = (() => {
  try {
    const host = new URL(SITE_URL).hostname;
    return (
      /(^|\.)vercel\.app$/i.test(host) ||
      host === "localhost" ||
      host === "127.0.0.1"
    );
  } catch {
    return false;
  }
})();

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
  website: isPreviewHost ? "https://www.muc-cargo.de" : SITE_URL,
  categoryPrimary: "Spedition",
  categoryAdditional: ["Logistikdienst", "Luftfrachtunternehmen"] as const,
  coordinates: `${COMPANY.coordinates.lat}, ${COMPANY.coordinates.lng}`,
  pinUrl: MAPS_LINK,
  createUrl: "https://business.google.com/create",
  searchExistingUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${COMPANY.legalName} München-Flughafen`,
  )}`,
  placeIdFinderUrl:
    "https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder",
  description:
    "Luftfracht-Handling am Flughafen München: Import und Export, Airline Handling sowie Röntgen- und Sicherheitskontrollen. MUC Cargohandling GmbH ist reglementierter Beauftragter (DE/RA/01278-01). Büro im Frachtzentrum, Modul H, Pavillon; Warenannahme Modul E, E48, Rampe 51. Persönliche Ansprechpartner, kurze Wege zum Cargo-Drehkreuz.",
} as const;

export type ListingField = {
  label: string;
  value: string;
  hint?: string;
};

export const GOOGLE_LISTING_FIELDS: readonly ListingField[] = [
  { label: "Unternehmensname", value: GOOGLE_LISTING.name },
  {
    label: "Kategorie",
    value: GOOGLE_LISTING.categoryPrimary,
    hint: `Zusätzlich: ${GOOGLE_LISTING.categoryAdditional.join(", ")}`,
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
    value: GOOGLE_LISTING.website,
    hint: isPreviewHost
      ? "Vercel-Vorschau nicht eintragen — die ist für Google gesperrt. Bis die neue Domain live ist: muc-cargo.de."
      : undefined,
  },
  {
    label: "Pin-Koordinaten",
    value: GOOGLE_LISTING.coordinates,
    hint: "Nach der Adresseingabe „Standort auf der Karte anpassen“ und genau hierhin ziehen. Nicht den automatischen Pin übernehmen, falls er versetzt sitzt.",
  },
  {
    label: "Beschreibung",
    value: GOOGLE_LISTING.description,
    hint: "Öffnungszeiten erst eintragen, wenn sie vom Auftraggeber bestätigt sind.",
  },
];
