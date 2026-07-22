import type { Metadata } from "next";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MetricRow } from "@/components/MetricRow";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceCard } from "@/components/ServiceCard";
import { LUFTFRACHT_PROCESS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Luftfracht Import Export",
  description:
    "Import- und Export-Handling am Flughafen München – Annahme, Dokumentation, Sicherheit und Übergabe mit klaren Prozessen.",
};

export default function LuftfrachtPage() {
  return (
    <>
      <Hero
        image="/images/luftfracht/hero.jpg"
        title="Luftfracht Import & Export am Flughafen München"
        subtitle="Von der Annahme bis zur Auslieferung: wir steuern Ihre Import- und Exportprozesse mit klaren Schnittstellen, dokumentierter Qualität und kurzen Durchlaufzeiten."
      />

      <PageSection>
        <SectionHeader
          eyebrow="Luftfracht"
          dark="Ihr Partner für"
          light="professionelle Luftfrachtabwicklung"
          description="Ob Import oder Export – wir koordinieren Handling, Dokumentation und Sicherheitsanforderungen entlang der gesamten Kette. So bleiben Ihre Sendungen planbar, nachvollziehbar und bereit für den nächsten Schritt."
        />

        <div className="section-header-gap grid gap-8 md:grid-cols-2 lg:gap-10">
          <ServiceCard
            image="/images/luftfracht/service-1.jpg"
            title="Import Handling"
            description="Annahme, Kontrolle und Weitergabe importierter Sendungen – inklusive Abstimmung mit Airlines und Empfängern."
          />
          <ServiceCard
            image="/images/luftfracht/service-2.jpg"
            title="Export Handling"
            description="Strukturierte Vorbereitung Ihrer Exporte: Annahme, Dokumentation und Übergabe in den Flugbetrieb."
          />
          <ServiceCard
            image="/images/luftfracht/service-3.jpg"
            title="Dokumentation & Tracking"
            description="Saubere Unterlagen und nachvollziehbare Statusinformationen für Spedition, Airline und Empfänger."
          />
          <ServiceCard
            image="/images/luftfracht/service-4.jpg"
            title="Security Ready"
            description="Anbindung an unsere Sicherheitsverfahren – Röntgen, Sichtkontrolle, Handdurchsuchung und ETD."
            href="/roentgen"
          />
        </div>
      </PageSection>

      <PageSection muted borderTop>
        <SectionHeader
          eyebrow="Prozess"
          dark="Vom Eingang"
          light="bis zur Freigabe"
          description="Ein klar strukturierter Ablauf reduziert Rückfragen, verkürzt Durchlaufzeiten und schafft Transparenz für alle Beteiligten."
        />
        <div className="section-header-gap">
          <ProcessSteps items={LUFTFRACHT_PROCESS} />
        </div>
      </PageSection>

      <PageSection borderTop>
        <SectionHeader
          dark="Operative Stärken"
          description="Kurze Wege am Cargo-Drehkreuz, erfahrene Teams und dokumentierte Qualität – die Basis für verlässliche Luftfrachtprozesse."
        />
        <div className="section-header-gap">
          <MetricRow
            items={[
              { value: "MUC", label: "Direkt am Cargo-Drehkreuz Flughafen München" },
              { value: "DE/RA", label: "Reglementierter Beauftragter DE/RA/01278-01" },
              { value: "24/7", label: "Für zeitkritische Sendungen und Sonderfälle" },
            ]}
          />
        </div>
      </PageSection>

      <FooterCta />
    </>
  );
}
