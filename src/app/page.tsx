import type { Metadata } from "next";
import Link from "next/link";
import { DownloadGrid } from "@/components/DownloadGrid";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ImageCtaBand } from "@/components/ImageCtaBand";
import { LocationMap } from "@/components/LocationMap";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollRevealStagger } from "@/components/ScrollRevealStagger";
import { SecurityOverview } from "@/components/SecurityOverview";
import { ServiceCapabilityGrid } from "@/components/ServiceCapabilityGrid";
import { ServiceNav } from "@/components/ServiceNav";
import { PinIcon } from "@/components/ArrowIcon";
import { SectionTitle, StatCard } from "@/components/SectionTitle";
import { SERVICES } from "@/lib/content";
import {
  HOME_CAPABILITY_AREAS,
  HOME_DOWNLOADS,
  HOME_IMAGE_CTA,
  HOME_STORY,
  HOME_TEAM_INTRO,
  MAP_EMBED,
  SECURITY_METHODS,
} from "@/lib/home";

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
          <SectionTitle dark={HOME_STORY.titleDark} light={HOME_STORY.titleLight} />
          <p className="prose-lead mt-5 max-w-3xl">{HOME_STORY.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal delay={100} duration={1100}>
          <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
            {HOME_STORY.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="prose-muted text-[15px] leading-[1.75]">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollRevealStagger
          className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-14"
          stagger={100}
          duration={1000}
        >
          <StatCard
            value="20+"
            label="Jahre Erfahrung"
            footer="Seit 2003 am Flughafen München."
          />
          <StatCard
            value="Reglementierter Beauftragter"
            label="DE/RA/01278-01"
            valueSize="md"
            footer="Zugelassene Sicherheitsprozesse für die Luftfrachtabwicklung."
          />
          <StatCard
            icon={<PinIcon className="h-6 w-6" />}
            label="Standort"
            footer={
              <>
                Direkt am Cargo-Drehkreuz München.{" "}
                <Link href="/kontakt" className="link-underline">
                  Südallee, 85356 Deutschland.
                </Link>
              </>
            }
          />
        </ScrollRevealStagger>
      </PageSection>

      <ScrollReveal variant="fade" duration={1100}>
        <ImageCtaBand
          title={HOME_IMAGE_CTA.title}
          ctaLabel={HOME_IMAGE_CTA.ctaLabel}
          ctaHref={HOME_IMAGE_CTA.ctaHref}
          image={HOME_IMAGE_CTA.image}
        />
      </ScrollReveal>

      <PageSection muted borderTop id="leistungen">
        <ScrollReveal variant="fade" duration={1000}>
          <SectionHeader
            eyebrow={HOME_TEAM_INTRO.eyebrow}
            dark={HOME_TEAM_INTRO.titleDark}
            light={HOME_TEAM_INTRO.titleLight}
            description={HOME_TEAM_INTRO.description}
          />
        </ScrollReveal>
        <ScrollReveal delay={120} duration={1100}>
          <div className="section-header-gap">
            <ServiceNav items={SERVICES} />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150} duration={1000}>
          <div className="capability-grid-wrap">
            <p className="capability-grid__intro prose-muted">
              Darüber hinaus unterstützen wir Sie in weiteren Bereichen entlang der Cargo-Kette:
            </p>
            <ServiceCapabilityGrid items={HOME_CAPABILITY_AREAS} />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={180} duration={1100}>
          <div className="section-header-gap">
            <SecurityOverview items={SECURITY_METHODS} />
          </div>
        </ScrollReveal>
      </PageSection>

      <PageSection borderTop id="downloads">
        <ScrollReveal duration={1000}>
          <SectionHeader
            eyebrow="Download"
            dark="Formulare und"
            light="Unterlagen"
            description="Wichtige Dokumente für Arbeitsaufträge, Zulassung und Versicherung – jederzeit abrufbar."
          />
        </ScrollReveal>
        <ScrollReveal delay={120} duration={1000}>
          <div className="section-header-gap">
            <DownloadGrid items={HOME_DOWNLOADS} />
          </div>
        </ScrollReveal>
      </PageSection>

      <PageSection muted borderTop id="standort">
        <ScrollReveal duration={1000}>
          <SectionHeader
            eyebrow="Standort"
            dark="Direkt am"
            light="Flughafen München"
            description="Kurze Wege zum Cargo-Drehkreuz – für effiziente Abläufe und schnelle Abstimmung vor Ort."
          />
        </ScrollReveal>
        <ScrollReveal delay={140} duration={1100}>
          <div className="section-header-gap">
            <LocationMap embedSrc={MAP_EMBED} />
          </div>
        </ScrollReveal>
      </PageSection>

      <FooterCta />
    </>
  );
}
