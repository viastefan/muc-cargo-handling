import { COMPANY, MAPS_LINK, MAPS_PLACE_URL } from "@/lib/company";
import { SERVICES } from "@/lib/content";
import { absoluteUrl, type Crumb } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Inhalt stammt vollständig aus eigenen Stammdaten / Seitenkontext.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * schema.org-Auszeichnung für Google. Liefert die Grundlage für Wissenspanel
 * und lokale Treffer („Luftfracht Flughafen München").
 *
 * Bewusst ohne `openingHours`: die Zeiten sind nicht bestätigt (siehe
 * COMPANY.hours.confirmed). Eine falsche Angabe hier landet direkt in den
 * Google-Ergebnissen und wäre schlimmer als gar keine.
 *
 * Standort-Verknüpfung: `geo` + `hasMap` (Koordinaten) und optional Place ID
 * über `GOOGLE_PLACE_ID` → `sameAs` / PropertyValue — verbindet die Website
 * mit dem Google-Business-Profil, sobald der Eintrag korrekt klaimt ist.
 */
export function StructuredData() {
  const orgId = `${SITE_URL}/#organisation`;
  const websiteId = `${SITE_URL}/#website`;

  const sameAs = [
    MAPS_PLACE_URL,
    ...COMPANY.partners.map((p) => p.href),
    ...COMPANY.social.map((s) => s.href),
  ].filter(Boolean);

  const localBusiness: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "@id": orgId,
    name: COMPANY.legalName,
    legalName: COMPANY.legalName,
    alternateName: COMPANY.brandName,
    disambiguatingDescription:
      "Luftfracht-Handling im Frachtzentrum München, Modul H, Pavillon. Nicht identisch mit CHI MUC Cargo Handling GmbH (Modul F, Hallbergmoos).",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
    },
    image: [`${SITE_URL}/opengraph-image`, `${SITE_URL}/images/home/hero.jpg`],
    description:
      "Luftfrachtabwicklung am Flughafen München: Import und Export, Airline Handling sowie Röntgen- und Sicherheitskontrollen als reglementierter Beauftragter.",
    telephone: COMPANY.phoneTel,
    email: COMPANY.email,
    vatID: COMPANY.vatId,
    foundingDate: "2003",
    slogan: "Präzise Abwicklung und Sicherheit für Ihre Luftfracht",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.office.line1,
      postalCode: "85356",
      addressLocality: "München-Flughafen",
      addressRegion: "BY",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.coordinates.lat,
      longitude: COMPANY.coordinates.lng,
    },
    hasMap: MAPS_PLACE_URL,
    areaServed: [
      { "@type": "Place", name: "Flughafen München (MUC)" },
      { "@type": "AdministrativeArea", name: "Bayern" },
      { "@type": "Country", name: "Deutschland" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: COMPANY.phoneTel,
        email: COMPANY.email,
        availableLanguage: ["German", "English"],
        areaServed: "DE",
      },
    ],
    knowsAbout: [
      "Luftfracht Import",
      "Luftfracht Export",
      "Airline Handling",
      "Röntgenkontrolle",
      "Reglementierter Beauftragter",
      "Luftsicherheit",
    ],
    identifier: [
      {
        "@type": "PropertyValue",
        name: "Reglementierter Beauftragter",
        value: COMPANY.regAgent,
      },
      ...(COMPANY.googlePlaceId
        ? [
            {
              "@type": "PropertyValue",
              name: "Google Place ID",
              value: COMPANY.googlePlaceId,
            },
          ]
        : []),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cargo-Services am Flughafen München",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "OfferCatalog",
        name: service.title,
        description: service.description,
        url: absoluteUrl(service.href),
        position: index + 1,
      })),
    },
    sameAs,
  };

  // Koordinaten-Karte immer zusätzlich, falls Place-URL abweicht
  if (MAPS_PLACE_URL !== MAPS_LINK) {
    localBusiness.additionalProperty = {
      "@type": "PropertyValue",
      name: "Exact office coordinates map",
      value: MAPS_LINK,
    };
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE_URL,
    name: COMPANY.brandName,
    description:
      "Luftfracht, Airline Handling und Sicherheitskontrollen am Flughafen München.",
    publisher: { "@id": orgId },
    inLanguage: "de-DE",
  };

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd data={website} />
    </>
  );
}

/**
 * Breadcrumb-Pfad für Google (Sitename › Seite). Auf jeder Unterseite einbinden.
 */
export function BreadcrumbStructuredData({ items }: { items: readonly Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return <JsonLd data={data} />;
}

/**
 * Service-Auszeichnung für Leistungsseiten (Luftfracht, Airline, Röntgen).
 */
export function ServiceStructuredData({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType,
    provider: { "@id": `${SITE_URL}/#organisation` },
    areaServed: { "@type": "Place", name: "Flughafen München (MUC)" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/kontakt"),
      servicePhone: COMPANY.phone,
    },
  };

  return <JsonLd data={data} />;
}

/**
 * Kontaktseite als ContactPage — stärkt die lokale Verknüpfung mit Adresse/Telefon.
 */
export function ContactPageStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Kontakt — ${COMPANY.brandName}`,
    url: absoluteUrl("/kontakt"),
    mainEntity: { "@id": `${SITE_URL}/#organisation` },
  };

  return <JsonLd data={data} />;
}

/**
 * Fragen und Antworten maschinenlesbar. Google erkennt dadurch, dass die Seite
 * konkrete Fragen beantwortet, und kann sie den passenden Suchanfragen
 * zuordnen.
 */
export function FaqStructuredData({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return <JsonLd data={data} />;
}
