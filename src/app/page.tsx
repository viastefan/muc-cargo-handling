import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollRevealStagger } from "@/components/ScrollRevealStagger";
import { ServiceNav } from "@/components/ServiceNav";
import { ServiceCard } from "@/components/ServiceCard";
import { PinIcon } from "@/components/ArrowIcon";
import { SectionTitle, StatCard } from "@/components/SectionTitle";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "MUC Cargo Handling | Luftfracht am Flughafen München",
  description:
    "Professionelle Luftfrachtabwicklung am Flughafen München – Import, Export, Airline Handling und Sicherheitskontrollen seit 2003.",
};

export default function HomePage() {
  return (
    <>
      <Hero
        image="/images/home/hero.jpg"
        title="Präzise Abwicklung und Sicherheit für Ihre Luftfracht am Flughafen München"
        subtitle="Mit strukturierten Abläufen, erfahrenem Personal und hohen Qualitätsstandards begleiten wir Ihre Sendungen – von der Annahme bis zur Sicherheitskontrolle."
      />

      <PageSection>
        <ScrollReveal duration={1100}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="heading-display max-w-xl text-[clamp(1.5rem,4vw,2.375rem)] text-[var(--foreground)]">
              Ihr Partner für professionelle Luftfrachtabwicklung
            </h2>
            <Button href="/unternehmen" variant="gray" className="shrink-0 self-start">
              Mehr dazu
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} duration={1100}>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-14">
            <p className="prose-muted">
              Seit 2003 unterstützen wir Airlines, Speditionen und Unternehmen bei der
              sicheren und effizienten Abwicklung von Luftfrachtsendungen.
            </p>
            <p className="prose-muted">
              Mit Erfahrung, modernen Prozessen und direkter Nähe zum Flughafen München
              schaffen wir zuverlässige Lösungen entlang der gesamten Cargo-Kette.
            </p>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger
          className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14"
          stagger={110}
          duration={1000}
        >
          <StatCard
            value="20+"
            label="Jahre Erfahrung"
            footer="Seit 2003 steht MUC Cargo Handling."
          />
          <StatCard
            value="Reglementierter Beauftragter"
            label="DE/RA/01278-01"
            valueSize="md"
            footer="Zugelassene Sicherheitsprozesse für die professionelle Luftfrachtabwicklung."
          />
          <StatCard
            icon={<PinIcon className="h-6 w-6" />}
            label="Standort"
            footer={
              <>
                Direkte Nähe zum Cargo-Drehkreuz für schnelle und effiziente Abläufe.{" "}
                <Link href="/kontakt" className="link-underline">
                  Südallee, 85356, Deutschland.
                </Link>
              </>
            }
          />
        </ScrollRevealStagger>
      </PageSection>

      <PageSection muted borderTop id="leistungen">
        <ScrollReveal variant="fade" duration={1000}>
          <SectionHeader
            eyebrow="Leistungen"
            dark="Drei Kernbereiche"
            light="für Ihre Luftfracht am MUC"
            description="Von der operativen Abwicklung bis zur Luftsicherheit – alle Services aus einer Hand am Flughafen München."
          />
        </ScrollReveal>
        <ScrollReveal delay={140} duration={1100}>
          <div className="section-header-gap">
            <ServiceNav items={SERVICES} />
          </div>
        </ScrollReveal>
      </PageSection>

      <PageSection>
        <ScrollReveal duration={1100}>
          <SectionTitle
            dark="Sicherheit und Kontrolle"
            light="für Ihre Luftfracht"
          />
          <p className="prose-lead mt-5 max-w-2xl">
            Als reglementierter Beauftragter setzen wir moderne Prüfverfahren ein – schnell,
            dokumentiert und nach geltenden Luftsicherheitsvorgaben.
          </p>
        </ScrollReveal>
        <ScrollRevealStagger
          className="section-header-gap grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8"
          stagger={90}
          duration={950}
          itemClassName="h-full"
        >
          <ServiceCard
            image="/images/home/service-roentgen.jpg"
            title="Röntgenkontrolle"
            description="Moderne Röntgentechnik für eine schnelle und regelkonforme Prüfung Ihrer Sendungen."
            href="/roentgen"
          />
          <ServiceCard
            image="/images/home/service-sichtkontrolle.jpg"
            title="Sichtkontrolle"
            description="Geschulte Fachkräfte prüfen äußerlich erkennbare Auffälligkeiten und Unversehrtheit."
            href="/roentgen"
          />
          <ServiceCard
            image="/images/home/service-handdurchsuchung.jpg"
            title="Handdurchsuchung"
            description="Manuelle Kontrolle dort, wo technisch oder inhaltlich eine vertiefte Prüfung nötig ist."
            href="/roentgen"
          />
          <ServiceCard
            image="/images/home/service-etd.jpg"
            title="Sprengstoff-Spurendetektion"
            description="ETD-Verfahren zur Spurensuche – ergänzend zu Röntgen und physischen Kontrollen."
            href="/roentgen"
          />
        </ScrollRevealStagger>
      </PageSection>

      <FooterCta />
    </>
  );
}
