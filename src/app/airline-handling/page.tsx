import type { Metadata } from "next";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MetricRow } from "@/components/MetricRow";
import { FeatureCard, PageSection, SectionHeader } from "@/components/PageSection";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Airline Handling",
  description:
    "Airline Handling am Flughafen München – Import, Export, Dokumentation, Zoll und ULD-Prozesse als operative Schnittstelle.",
};

export default function AirlineHandlingPage() {
  return (
    <>
      <Hero
        image="/images/airline-handling/hero.jpg"
        title={
          <>
            Die Schnittstelle zwischen Airline,
            <br className="max-lg:hidden" /> Fracht und effizienten Prozessen.
          </>
        }
        subtitle="Wir koordinieren Airline-Handling am Flughafen München – von Import und Export über Dokumentation bis zu Security- und ULD-Prozessen."
      />

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeader
            eyebrow="Airline Handling"
            dark="Professionelles Handling"
            light="für einen reibungslosen Airline-Betrieb"
            description="Als operative Schnittstelle verbinden wir Airlines, Speditionen und Logistikpartner – mit klaren Abläufen, die auch bei hohem Sendungsaufkommen tragen."
          />
          <MetricRow
            items={[
              { value: "Import", label: "Annahme und Übergabe eingehender Fracht" },
              { value: "Export", label: "Vorbereitung und Freigabe ausgehender Sendungen" },
              { value: "ULD", label: "Sicherheits- und Unit-Load-Device-Handling" },
            ]}
          />
        </div>
      </PageSection>

      <PageSection muted borderTop>
        <SectionHeader dark="Leistungen" light="im Überblick" />
        <div className="section-header-gap grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8">
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
            href="/roentgen"
          />
        </div>
      </PageSection>

      <PageSection borderTop>
        <SectionHeader
          dark="Operative Airline-Prozesse"
          description="Wir steuern die Übergänge zwischen Airline, Frachtführer und Warehouse – für stabile Durchlaufzeiten und weniger Rückfragen."
        />
        <div className="section-header-gap grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard title="Schnittstelle" icon="link">Airline ↔ Spedition ↔ Warehouse</FeatureCard>
          <FeatureCard title="Dokumentation" icon="docs">Vollständige Übergabeprotokolle</FeatureCard>
          <FeatureCard title="Compliance" icon="compliance">Regelkonforme Abläufe</FeatureCard>
          <FeatureCard title="Peak-fähig" icon="peak">Belastbar bei hohem Sendungsaufkommen</FeatureCard>
        </div>
      </PageSection>

      <PageSection muted borderTop>
        <SectionHeader
          dark="Am Standort"
          light="Flughafen München"
          description="Kurze Wege, direkte Abstimmung mit Partnern und ein Team, das den lokalen Cargo-Betrieb kennt – für verlässliche Airline-Prozesse vor Ort."
        />
      </PageSection>

      <FooterCta />
    </>
  );
}
