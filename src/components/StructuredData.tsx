import { COMPANY } from "@/lib/company";
import { SITE_URL } from "@/lib/site";

/**
 * schema.org-Auszeichnung für Google. Liefert die Grundlage für Wissenspanel
 * und lokale Treffer („Luftfracht Flughafen München").
 *
 * Bewusst ohne `openingHours`: die Zeiten sind nicht bestätigt (siehe
 * COMPANY.hours.confirmed). Eine falsche Angabe hier landet direkt in den
 * Google-Ergebnissen und wäre schlimmer als gar keine.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organisation`,
    name: COMPANY.brandName,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/opengraph-image`,
    description:
      "Luftfrachtabwicklung am Flughafen München: Import und Export, Airline Handling sowie Röntgen- und Sicherheitskontrollen als reglementierter Beauftragter.",
    telephone: COMPANY.phone,
    email: COMPANY.email,
    vatID: COMPANY.vatId,
    foundingDate: "2003",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.office.line1,
      postalCode: "85356",
      addressLocality: "München-Flughafen",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.coordinates.lat,
      longitude: COMPANY.coordinates.lng,
    },
    areaServed: { "@type": "Place", name: "Flughafen München (MUC)" },
    knowsAbout: [
      "Luftfracht Import",
      "Luftfracht Export",
      "Airline Handling",
      "Röntgenkontrolle",
      "Reglementierter Beauftragter",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Inhalt stammt vollständig aus eigenen Stammdaten, keine Fremdeingabe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
