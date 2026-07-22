import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InternationalGlobeSection } from "@/components/InternationalGlobeSection";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollRevealStagger } from "@/components/ScrollRevealStagger";
import { SectionTitle, StatCard } from "@/components/SectionTitle";
import { Timeline } from "@/components/Timeline";
import { ValuePillars } from "@/components/ValuePillars";
import { MailIcon, PhoneIcon } from "@/components/ArrowIcon";
import { COMPANY_VALUES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Unternehmen",
  description:
    "Über MUC Cargo Handling – Erfahrung, Team und Prozesse für professionelle Luftfracht am Flughafen München seit 2003.",
};

const TIMELINE = [
  { year: "2003", text: "Gründung ALD – Airport Lagerdienste e.K." },
  { year: "2013", text: "Umwandlung zur ALD – Airport Lagerdienste GmbH" },
  { year: "2015", text: "MUC Cargohandling GmbH" },
  { year: "Heute", text: "Erfahrener Partner für Airport Cargo Services" },
];

const TEAM = [
  {
    name: "Johnbosco Onyeke",
    role: "Geschäftsführer",
    phone: "089 – 975 94 870",
    phoneTel: "+498997594870",
    email: "johnbosco.onyeke@muc-cargo.de",
  },
  {
    name: "Lynn Onyeke",
    role: "Stellv. Geschäftsführerin",
    phone: "089 – 975 94 870",
    phoneTel: "+498997594870",
    email: "lynn.onyeke@muc-cargo.de",
  },
  {
    name: "Evelyn Zimmert-Onyeke",
    role: "Buchhaltung",
    phone: "08765 – 93 98 25",
    phoneTel: "+498765939825",
    email: "evelyn.onyeke@muc-cargo.de",
  },
  {
    name: "Robert Cinca",
    role: "Lagerleitung",
    phone: "089 – 975 94 870",
    phoneTel: "+498997594870",
    email: "robert.cinca@muc-cargo.de",
  },
];

export default function UnternehmenPage() {
  return (
    <>
      <Hero
        image="/images/unternehmen/hero.jpg"
        title="Über MUC Cargo Handling"
        subtitle="Mit Erfahrung, strukturierten Abläufen und höchsten Qualitätsstandards sorgen wir für eine sichere, effiziente und transparente Abwicklung Ihrer Sendungen am Flughafen München."
      />

      <PageSection>
        <SectionTitle
          dark="Präzise Prozesse."
          light="Verlässliche Abläufe. Sichere Luftfracht"
        />

        <div className="section-header-gap grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="space-y-6 prose-muted">
            <p>
              Seit 2003 steht MUC Cargo Handling für zuverlässige Prozesse,
              persönliche Betreuung und professionelle Dienstleistungen rund um
              die Luftfracht am Flughafen München. Was als ALD – Airport
              Lagerdienste e.K. begann, entwickelte sich über die Jahre zu einem
              erfahrenen Partner für internationale Luftfrachtprozesse.
            </p>
            <p>
              Durch kontinuierliches Wachstum und die Erweiterung unseres
              Leistungsspektrums erfolgte 2013 die Umwandlung zur ALD – Airport
              Lagerdienste GmbH. Im Jahr 2015 wurde daraus die heutige MUC
              Cargohandling GmbH.
            </p>
          </div>

          <Timeline items={TIMELINE} />
        </div>
      </PageSection>

      <PageSection muted borderTop>
        <ScrollReveal duration={1000}>
          <SectionHeader
            eyebrow="Unsere Haltung"
            dark="Werte, die"
            light="unseren Alltag prägen"
            description="Verlässlichkeit, Sicherheit und partnerschaftliche Zusammenarbeit sind die Grundlage für jeden Prozessschritt am Flughafen München."
          />
        </ScrollReveal>
        <ScrollReveal delay={120} duration={1000}>
          <div className="section-header-gap">
            <ValuePillars items={COMPANY_VALUES} />
          </div>
        </ScrollReveal>
      </PageSection>

      <PageSection borderTop id="team">
        <ScrollReveal duration={1000}>
          <h2 className="section-header__title heading-display text-[clamp(1.5rem,4vw,2.375rem)] text-[var(--foreground)]">
            Unser Team
          </h2>
        </ScrollReveal>

        <ScrollRevealStagger className="team-grid" stagger={95} duration={950}>
          {TEAM.map((person) => (
            <article key={person.email} className="team-card">
              <h3 className="team-card__name">{person.name}</h3>
              <p className="team-card__role">{person.role}</p>
              <ul className="team-card__contact">
                <li>
                  <a href={`tel:${person.phoneTel}`} className="team-card__link">
                    <PhoneIcon className="text-[var(--muted-light)]" />
                    <span>Tel: {person.phone}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${person.email}`} className="team-card__link">
                    <MailIcon className="text-[var(--muted-light)]" />
                    <span>{person.email}</span>
                  </a>
                </li>
              </ul>
            </article>
          ))}
        </ScrollRevealStagger>
      </PageSection>

      <PageSection>
        <SectionTitle
          dark="Erfahrung, Kompetenz und"
          light="zuverlässige Cargo-Prozesse"
        />

        <div className="section-header-gap relative aspect-[16/7] w-full overflow-hidden bg-[var(--surface)]">
          <Image
            src="/images/unternehmen/stats.jpg"
            alt="Team bei der Arbeit am Flughafen München"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            value="20+"
            label="Jahre Erfahrung"
            footer="Seit 2003 am Flughafen München"
          />
          <StatCard
            value="24/7"
            label="Verfügbarkeit"
            footer="Für zeitkritische Frachtsendungen und Sonderabwicklungen"
          />
          <StatCard
            value="MUC"
            label="Standort"
            footer={
              <>
                Direkt am Flughafen München.{" "}
                <Link href="/kontakt" className="link-underline text-[var(--muted-accent)]">
                  Südallee Modul F, 85356 München-Flughafen
                </Link>
              </>
            }
          />
        </div>

        <InternationalGlobeSection />
      </PageSection>

      <FooterCta title="Gemeinsam für sichere und effiziente Luftfrachtprozesse." />
    </>
  );
}
