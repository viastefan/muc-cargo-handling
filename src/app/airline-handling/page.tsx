import type { Metadata } from "next";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { FeatureCard, PageSection, SectionHeader } from "@/components/PageSection";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Airline Handling",
};

export default function AirlineHandlingPage() {
  return (
    <>
      <Hero
        image="/images/airline-handling/hero.jpg"
        title="Die Schnittstelle zwischen Airline, Fracht und effizienten Prozessen."
        subtitle="Wir koordinieren Airline-Handling am Flughafen München – von Import und Export über Dokumentation bis zu Security- und ULD-Prozessen."
      />

      <PageSection>
        <SectionHeader
          dark="Professionelles Handling"
          light="für einen reibungslosen Airline-Betrieb"
          description="Als operative Schnittstelle verbinden wir Airlines, Speditionen und Logistikpartner. Klare Abläufe, belastbare Kommunikation und standardisierte Qualität sichern den Tagesbetrieb."
          align="center"
          className="mx-auto"
        />
      </PageSection>

      <PageSection muted>
        <SectionHeader dark="Leistungen" light="im Überblick" />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-12 lg:gap-10">
          <ServiceCard
            image="/images/airline-handling/import-export.jpg"
            title="Import & Export Handling"
            bullets={[
              "Annahme und Übergabe von Sendungen",
              "Abstimmung mit Airlines und Ground Handling",
              "Zeitfenster- und Prioritätensteuerung",
            ]}
          />
          <ServiceCard
            image="/images/airline-handling/dokumente.jpg"
            title="Dokumentenmanagement"
            bullets={[
              "Vollständige Frachtdokumentation",
              "Status- und Übergabeprotokolle",
              "Schnittstellen zu Partner-Systemen",
            ]}
          />
          <ServiceCard
            image="/images/airline-handling/zoll.jpg"
            title="Zoll & Compliance"
            bullets={[
              "Unterstützung bei zollrelevanten Prozessen",
              "Regelkonforme Nachweise",
              "Abstimmung mit Behörden und Partnern",
            ]}
          />
          <ServiceCard
            image="/images/airline-handling/uld.jpg"
            title="Sicherheits- und ULD-Handling"
            bullets={[
              "ULD-Handling und Vorbereitung",
              "Security-konforme Abläufe",
              "Sorgfältige Behandlung empfindlicher Fracht",
            ]}
          />
        </div>
      </PageSection>

      <PageSection borderTop>
        <SectionHeader
          dark="Operative Airline-Prozesse"
          description="Wir orchestrieren die Übergänge zwischen Airline, Frachtführer und Warehouse. Dadurch entstehen stabile Durchlaufzeiten, weniger Rückfragen und eine Abwicklung, die auch bei Peak-Zeiten belastbar bleibt."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard title="Schnittstelle">Airline ↔ Spedition ↔ Warehouse</FeatureCard>
          <FeatureCard title="Dokumentation">Vollständige Übergabeprotokolle</FeatureCard>
          <FeatureCard title="Compliance">Regelkonforme Abläufe</FeatureCard>
          <FeatureCard title="Peak-fähig">Belastbar bei hohem Sendungsaufkommen</FeatureCard>
        </div>
      </PageSection>

      <FooterCta />
    </>
  );
}
