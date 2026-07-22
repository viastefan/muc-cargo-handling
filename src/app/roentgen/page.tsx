import type { Metadata } from "next";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PartnerLogos } from "@/components/PartnerLogos";
import { SpecGrid } from "@/components/SpecGrid";
import {
  FeatureCard,
  PageSection,
  SectionEyebrow,
  SectionHeader,
} from "@/components/PageSection";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Röntgen",
  description:
    "Röntgen- und Sicherheitskontrollen am Flughafen München – LBA-konform, modern und als reglementierter Beauftragter.",
};

const HIGHLIGHTS = [
  { title: "LBA-konforme Prozesse", text: "Verfahren nach geltenden Luftsicherheitsvorgaben." },
  { title: "Modernste Prüftechnik", text: "Röntgenanlagen für gängige Frachtmaße und Gewichte." },
  { title: "STI Kooperation", text: "Zusammenarbeit am Standort Flughafen München." },
  { title: "Flughafen München", text: "Kurze Wege – direkt am Cargo-Standort MUC." },
];

const FAQ = [
  {
    q: "Welche Sendungen können geröntgt werden?",
    a: "Standardfracht bis ca. 179 cm Breite, 170 cm Höhe und 2.000 kg Gewicht. Für Sondermaße beraten wir zu Alternativverfahren.",
  },
  {
    q: "Wie läuft die Freigabe ab?",
    a: "Nach erfolgreicher Prüfung dokumentieren wir das Ergebnis und stimmen die Freigabe mit den beteiligten Partnern ab.",
  },
  {
    q: "Welche Verfahren kommen zum Einsatz?",
    a: "Je nach Sendung Röntgen, Sichtkontrolle, Handdurchsuchung oder Sprengstoff-Spurendetektion – immer regelkonform und nachvollziehbar.",
  },
];

export default function RoentgenPage() {
  return (
    <>
      <Hero
        image="/images/roentgen/hero.jpg"
        title="Sichere Luftfracht nach höchsten Sicherheitsstandards."
        subtitle="Röntgen- und Sicherheitskontrollen nach aktuellen Vorgaben – für eine zuverlässige Freigabe Ihrer Sendungen am Flughafen München."
      />

      <PageSection>
        <SectionHeader
          eyebrow="Luftsicherheit"
          dark="Sicherheit"
          light="in jedem Prozessschritt"
        />
        <div className="section-header-gap grid gap-8 md:grid-cols-2">
          <p className="prose-muted">
            Unsere Kontrollverfahren kombinieren Technik und Fachpersonal.
            Je nach Sendung setzen wir Röntgenkontrolle, Sichtprüfung,
            Handdurchsuchung oder Sprengstoff-Spurendetektion ein – immer mit
            dem Ziel einer klaren, dokumentierten Entscheidung.
          </p>
          <p className="prose-muted">
            Als reglementierter Beauftragter arbeiten wir nach den Anforderungen
            der Luftsicherheit und stimmen uns eng mit Partnern am Flughafen
            München ab.
          </p>
        </div>

        <div className="section-header-gap">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted-light)]">
            Technische Eckdaten Röntgen
          </p>
          <SpecGrid
            items={[
              { label: "Durchlassbreite", value: "179", unit: "cm" },
              { label: "Höhe", value: "170", unit: "cm" },
              { label: "Max. Gewicht", value: "2.000", unit: "kg" },
            ]}
          />
          <p className="prose-muted mt-4 text-[14px]">
            Für abweichende Abmessungen beraten wir Sie gerne zu Alternativverfahren.
          </p>
        </div>
      </PageSection>

      <PageSection muted borderTop>
        <SectionEyebrow>Röntgen</SectionEyebrow>
        <SectionHeader dark="Unsere" light="Kontrollverfahren" />
        <div className="section-header-gap grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8">
          <ServiceCard
            image="/images/roentgen/kontrolle-roentgen.jpg"
            title="Röntgenkontrolle"
            description="Schnelle, bildgebende Prüfung großer Sendungsvolumina durch geschulte Operatoren."
          />
          <ServiceCard
            image="/images/roentgen/kontrolle-sicht.jpg"
            title="Sichtkontrolle"
            description="Äußere Prüfung auf Unversehrtheit, Kennzeichnung und Auffälligkeiten."
          />
          <ServiceCard
            image="/images/roentgen/kontrolle-hand.jpg"
            title="Handdurchsuchung"
            description="Manuelle Vertiefung, wenn Technik allein nicht ausreicht oder die Sendung es erfordert."
          />
          <ServiceCard
            image="/images/roentgen/kontrolle-etd.jpg"
            title="Sprengstoff-Spurendetektion"
            description="ETD als ergänzendes Verfahren zur Spurensuche im Sicherheitsprozess."
          />
        </div>
      </PageSection>

      <PageSection borderTop>
        <div className="partner-standort partner-standort--spaced">
          <SectionHeader
            dark="Unsere Zusammenarbeit"
            light="mit Partnern am Standort"
            description="Am Flughafen München arbeiten wir mit erfahrenen Partnern wie VK Freight Management zusammen – für effiziente Sicherheits- und Handling-Prozesse mit kurzen Wegen und klaren Verantwortlichkeiten."
          />
          <PartnerLogos />
        </div>

        <div className="section-header-gap grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <FeatureCard key={h.title} title={h.title}>
              {h.text}
            </FeatureCard>
          ))}
        </div>
      </PageSection>

      <PageSection muted>
        <SectionHeader
          eyebrow="FAQ"
          dark="Häufige Fragen"
          description="Kurze Antworten zu typischen Anforderungen im Sicherheitsprozess – für eine schnelle Orientierung vor Ihrer Anfrage."
        />
        <dl className="section-header-gap divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {FAQ.map((item) => (
            <div key={item.q} className="py-6 md:py-7">
              <dt className="text-[15px] font-normal tracking-[-0.01em] text-[var(--foreground)]">
                {item.q}
              </dt>
              <dd className="prose-muted mt-2.5 text-[14px]">{item.a}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <FooterCta title="Sicherheit, die Ihre Luftfrachtprozesse beschleunigt." />
    </>
  );
}
