import type { Metadata } from "next";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
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

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
        <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
          <span className="text-[var(--muted-light)]">Ihr Partner für </span>
          professionelle Luftfrachtabwicklung
        </h2>
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[var(--muted)]">
          Ob Import oder Export – wir koordinieren Handling, Dokumentation und
          Sicherheitsanforderungen entlang der gesamten Kette. So bleiben Ihre
          Sendungen planbar, nachvollziehbar und bereit für den nächsten Schritt.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
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
      </section>

      <FooterCta />
    </>
  );
}
