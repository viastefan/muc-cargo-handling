import type { Metadata } from "next";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PartnerLogos } from "@/components/PartnerLogos";
import {
  FeatureCard,
  PageSection,
  SectionEyebrow,
  SectionHeader,
} from "@/components/PageSection";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Röntgen",
};

const HIGHLIGHTS = [
  { title: "LBA-konforme Prozesse", text: "Verfahren nach geltenden Luftsicherheitsvorgaben." },
  { title: "Modernste Prüftechnik", text: "Röntgenanlagen für gängige Frachtmaße und Gewichte." },
  { title: "STI Kooperation", text: "Zusammenarbeit am Standort Flughafen München." },
  { title: "Flughafen München", text: "Kurze Wege – direkt am Cargo-Standort MUC." },
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
          dark="Sicherheit"
          light="in jedem Prozessschritt"
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-12">
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

        <div className="mt-10 bg-[var(--surface)] p-6 md:p-8 lg:mt-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted-light)]">
            Technische Eckdaten Röntgen
          </p>
          <p className="prose-muted mt-3 text-[14px]">
            Durchlassbreite ca. <strong className="font-medium text-[var(--foreground)]">179 cm</strong>,
            Höhe ca. <strong className="font-medium text-[var(--foreground)]">170 cm</strong>,
            max. Gewicht ca. <strong className="font-medium text-[var(--foreground)]">2.000 kg</strong>.
            Für abweichende Abmessungen beraten wir Sie gerne zu Alternativverfahren.
          </p>
        </div>
      </PageSection>

      <PageSection muted>
        <SectionEyebrow>Röntgen</SectionEyebrow>
        <SectionHeader dark="Unsere" light="Kontrollverfahren" />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-12 lg:gap-10">
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
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <SectionHeader
            dark="Unsere Zusammenarbeit"
            light="mit Partnern am Standort"
            description="Am Flughafen München arbeiten wir mit erfahrenen Partnern wie VK Freight Management zusammen – für effiziente Sicherheits- und Handling-Prozesse mit kurzen Wegen und klaren Verantwortlichkeiten."
          />
          <PartnerLogos />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <FeatureCard key={h.title} title={h.title}>
              {h.text}
            </FeatureCard>
          ))}
        </div>
      </PageSection>

      <FooterCta title="Sicherheit, die Ihre Luftfrachtprozesse beschleunigt." />
    </>
  );
}
