import type { Metadata } from "next";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Luftfracht Import Export",
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
          dark="Ihr Partner für"
          light="professionelle Luftfrachtabwicklung"
          description="Ob Import oder Export – wir koordinieren Handling, Dokumentation und Sicherheitsanforderungen entlang der gesamten Kette. So bleiben Ihre Sendungen planbar, nachvollziehbar und bereit für den nächsten Schritt."
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-14 lg:gap-10">
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
          />
        </div>
      </PageSection>

      <FooterCta />
    </>
  );
}
