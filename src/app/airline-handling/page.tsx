import type { Metadata } from "next";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
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

      <section className="mx-auto max-w-[1280px] px-5 py-16 text-center lg:px-8 lg:py-20">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
          Professionelles Handling{" "}
          <span className="font-semibold text-[var(--muted)]">
            für einen reibungslosen Airline-Betrieb
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
          Als operative Schnittstelle verbinden wir Airlines, Speditionen und
          Logistikpartner. Klare Abläufe, belastbare Kommunikation und
          standardisierte Qualität sichern den Tagesbetrieb.
        </p>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
          <h2 className="text-3xl font-bold md:text-4xl">Leistungen im Überblick</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
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
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold md:text-4xl">Operative Airline-Prozesse</h2>
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[var(--muted)]">
          Wir orchestrieren die Übergänge zwischen Airline, Frachtführer und
          Warehouse. Dadurch entstehen stabile Durchlaufzeiten, weniger
          Rückfragen und eine Abwicklung, die auch bei Peak-Zeiten belastbar
          bleibt.
        </p>
      </section>

      <FooterCta />
    </>
  );
}
