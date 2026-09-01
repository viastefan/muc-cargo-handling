import type { Metadata } from "next";
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
import { COMPANY } from "@/lib/company";
import { COMPANY_VALUES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Unternehmen",
  description:
    "Über MUC Cargohandling – Erfahrung, Team und Prozesse für professionelle Luftfracht am Flughafen München seit 2003.",
};

const TIMELINE = [
  { year: "2003", text: "Gründung ALD – Airport Lagerdienste e.K." },
  { year: "2013", text: "Umwandlung zur ALD – Airport Lagerdienste GmbH" },
  { year: "2015", text: "Umfirmierung zur MUC Cargohandling GmbH" },
  { year: "Heute", text: "Erfahrener Partner für Airport Cargo Services" },
];

type TeamMember = {
  name: string;
  role?: string;
  phone?: string;
  phoneTel?: string;
  mobile?: string;
  mobileTel?: string;
  email?: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Johnbosco Onyeke",
    role: "Geschäftsführer",
    phone: "089 – 975 94 877",
    phoneTel: "+498997594877",
    mobile: "0176 – 2004 7750",
    mobileTel: "+4917620047750",
    email: "johnbosco.onyeke@muc-cargo.de",
  },
  {
    name: "Lynn Onyeke",
    role: "Geschäftsführung",
    phone: "089 – 975 94 592",
    phoneTel: "+498997594592",
    mobile: "0151 – 2950 8973",
    mobileTel: "+4915129508973",
    email: "lynn.onyeke@muc-cargo.de",
  },
  {
    // Auf Wunsch als Abteilung ohne Namen und ohne Telefonnummer geführt.
    name: "Buchhaltung",
    email: "buchhaltung@muc-cargo.de",
  },
  {
    name: "Robert Cinca",
    role: "Teamleader Warehouse",
    phone: "089 – 975 94 870",
    phoneTel: "+498997594870",
    mobile: "0179 – 452 64 37",
    mobileTel: "+491794526437",
    email: "robert.cinca@muc-cargo.de",
  },
  {
    name: "Siegfried Kübler",
    role: "Import/Zoll",
    phone: "089 – 975 94 870",
    phoneTel: "+498997594870",
    email: "lager@muc-cargo.de",
  },
];

export default function UnternehmenPage() {
  return (
    <>
      <Hero
        image="/images/unternehmen/hero.jpg"
        title="Über MUC Cargohandling"
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
              Seit 2003 steht MUC Cargohandling für zuverlässige Prozesse,
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
            <article key={person.name} className="team-card">
              <h3 className="team-card__name">{person.name}</h3>
              {person.role ? <p className="team-card__role">{person.role}</p> : null}
              <ul className="team-card__contact">
                {person.phone && person.phoneTel ? (
                  <li>
                    <a href={`tel:${person.phoneTel}`} className="team-card__link">
                      <PhoneIcon className="text-[var(--muted-light)]" />
                      <span>Tel: {person.phone}</span>
                    </a>
                  </li>
                ) : null}
                {person.mobile && person.mobileTel ? (
                  <li>
                    <a href={`tel:${person.mobileTel}`} className="team-card__link">
                      <PhoneIcon className="text-[var(--muted-light)]" />
                      <span>Mobil: {person.mobile}</span>
                    </a>
                  </li>
                ) : null}
                {person.email ? (
                  <li>
                    <a href={`mailto:${person.email}`} className="team-card__link">
                      <MailIcon className="text-[var(--muted-light)]" />
                      <span>{person.email}</span>
                    </a>
                  </li>
                ) : null}
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

        <div className="section-header-gap grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
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
                <Link href="/kontakt" className="link-underline">
                  {COMPANY.office.line1}, {COMPANY.office.line2}
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
