import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PageSection } from "@/components/PageSection";
import { SectionTitle, StatCard } from "@/components/SectionTitle";
import { GlobeIcon, MailIcon, PhoneIcon } from "@/components/ArrowIcon";

export const metadata: Metadata = {
  title: "Unternehmen",
};

const TIMELINE = [
  { year: "2003", text: "Gründung ALD – Airport Lagerdienste e.K." },
  { year: "2015", text: "MUC Cargo Handling GmbH" },
  { year: "2013", text: "Umwandlung zur GmbH" },
  { year: "Heute", text: "Erfahrener Partner für Airport Cargo Services" },
];

const TEAM = [
  {
    name: "Johnbosco Onyeke",
    role: "Geschäftsführer",
    phone: "089 – 975 948 77",
    email: "johnbosco.onyeke@muc-cargo.de",
  },
  {
    name: "Lynn Onyeke",
    role: "Stellv. Geschäftsführerin",
    phone: "089 – 975 948 70",
    email: "lynn.onyeke@muc-cargo.de",
  },
  {
    name: "Evelyn Zimmert-Onyeke",
    role: "BuHa",
    phone: "08765-93 98 25",
    email: "evelyn.onyeke@muc-cargo.de",
  },
  {
    name: "Robert Cinca",
    role: "Lagerleitung",
    phone: "089 – 975 948 70",
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

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
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
              Cargo Handling GmbH.
            </p>
          </div>

          <ul className="space-y-8 lg:pt-1">
            {TIMELINE.map((item) => (
              <li key={`${item.year}-${item.text}`}>
                <p className="text-[13px] font-medium text-[var(--muted-light)]">
                  {item.year}
                </p>
                <p className="mt-1 text-[15px] font-medium text-[var(--foreground)]">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection borderTop>
        <h2 className="text-[28px] font-medium tracking-[-0.02em] md:text-[34px] lg:text-[38px]">
          Unser Team
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:gap-5">
          {TEAM.map((person) => (
            <article
              key={person.email}
              className="bg-[var(--surface)] p-7 md:p-8"
            >
              <h3 className="text-[17px] font-semibold tracking-[-0.01em]">
                {person.name}
              </h3>
              <p className="mt-1 text-[14px] text-[var(--muted)]">{person.role}</p>
              <div className="mt-6 space-y-2.5 text-[14px] text-[var(--muted)]">
                <p className="flex items-center gap-2.5">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-[var(--muted-light)]" />
                  <a href={`tel:${person.phone.replace(/[^\d+]/g, "")}`} className="hover:text-[var(--foreground)]">
                    {person.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <MailIcon className="shrink-0 text-[var(--muted-light)]" />
                  <a href={`mailto:${person.email}`} className="hover:text-[var(--foreground)]">
                    {person.email}
                  </a>
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <SectionTitle
          dark="Erfahrung, Kompetenz und"
          light="zuverlässige Cargo-Prozesse"
        />

        <div className="relative mt-10 aspect-[16/7] w-full overflow-hidden bg-[var(--surface)] lg:mt-12">
          <Image
            src="/images/unternehmen/stats.jpg"
            alt="Team bei der Arbeit"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  Südallee, 85356, Deutschland
                </Link>
              </>
            }
          />
          <StatCard
            label="International"
            icon={<GlobeIcon className="h-7 w-7 stroke-[1.4]" />}
            footer="Professionelle Abwicklung von Import- & Exportsendungen"
          />
        </div>
      </PageSection>

      <FooterCta title="Gemeinsam für sichere und effiziente Luftfrachtprozesse." />
    </>
  );
}
