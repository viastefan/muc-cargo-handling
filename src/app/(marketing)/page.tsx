import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { FooterCta } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { ImageCtaBand } from "@/components/ImageCtaBand";
import { LocationMap } from "@/components/LocationMap";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollRevealStagger } from "@/components/ScrollRevealStagger";
import { SecurityOverview } from "@/components/SecurityOverview";
import { ServiceNav } from "@/components/ServiceNav";
import { SectionTitle, StatCard } from "@/components/SectionTitle";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { MAPS_EMBED } from "@/lib/company";
import { SERVICES } from "@/lib/content";
import { FAQ_HOME } from "@/lib/faq";
import {
  HOME_IMAGE_CTA,
  HOME_STORY,
  HOME_TEAM_INTRO,
  SECURITY_METHODS,
} from "@/lib/home";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/",
  bareTitle: true,
  title: "MUC Cargohandling | Luftfracht am Flughafen München",
  description:
    "Professionelle Luftfrachtabwicklung am Flughafen München – Import, Export, Airline Handling und Sicherheitskontrollen seit 2003.",
});

export default function HomePage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[{ name: "Startseite", path: "/" }]}
      />
      <Hero
        image="/images/home/hero.jpg"
        images={[
          "/images/home/hero.jpg",
          "/images/airline-handling/cargo-tarmac.jpg",
          "/images/home/team-band.jpg",
          "/images/airline-handling/aircraft-loading.jpg",
        ]}
        title={
          <>
            Präzise Abwicklung und Sicherheit für Ihre
            <br className="max-lg:hidden" /> Luftfracht am Flughafen München
          </>
        }
        subtitle="Strukturierte Abläufe und erfahrenes Personal – von der Annahme bis zur Sicherheitskontrolle."
      />

      <PageSection>
        <ScrollReveal duration={1100}>
          <SectionTitle dark={HOME_STORY.titleDark} light={HOME_STORY.titleLight} />
        </ScrollReveal>

        <ScrollReveal delay={100} duration={1100}>
          <p className="prose-muted mt-6 max-w-3xl text-[15px] leading-[1.7]">
            {HOME_STORY.paragraphs[0]}
          </p>
        </ScrollReveal>

        <ScrollRevealStagger
          className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10 lg:mt-14"
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
            value="MUC"
            label="Standort"
            footer="Direkt am Cargo-Drehkreuz München."
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

      <PageSection id="leistungen">
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
      </PageSection>

      <ScrollReveal variant="fade" duration={1100}>
        <SecurityOverview items={SECURITY_METHODS} />
      </ScrollReveal>

      <PageSection id="standort" compact>
        <ScrollReveal duration={1000}>
          <SectionHeader
            eyebrow="Standort"
            dark="Direkt am"
            light="Flughafen München"
            breakTitle={false}
            description="Kurze Wege zum Cargo-Drehkreuz – für effiziente Abläufe und schnelle Abstimmung vor Ort."
            descriptionClassName="max-w-xl"
          />
        </ScrollReveal>
        <ScrollReveal delay={140} duration={1100}>
          <div className="section-header-gap">
            <LocationMap embedSrc={MAPS_EMBED} />
          </div>
        </ScrollReveal>
      </PageSection>

      <PageSection muted compact id="faq">
        <div className="faq-home">
          <ScrollReveal duration={1000}>
            <SectionHeader
              align="center"
              eyebrow="FAQ"
              dark="Häufige Fragen"
              description="Kurze Antworten zu Leistungen und Abläufen – für einen schnellen Überblick."
              className="faq-home__header"
            />
          </ScrollReveal>
          <ScrollReveal delay={100} duration={1000}>
            <div className="faq-home__panel section-header-gap">
              <FaqList items={FAQ_HOME} />
              <div className="faq-home__cta">
                <Button href="/faq" variant="gray" size="md">
                  Alle Fragen ansehen
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </PageSection>

      <FooterCta />
    </>
  );
}
