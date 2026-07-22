import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { FlowTracks, FlowTracksIntro } from "@/components/FlowTracks";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IntroSplitBand } from "@/components/IntroSplitBand";
import { MetricRow } from "@/components/MetricRow";
import {
  FeatureCard,
  PageSection,
  SectionHeader,
} from "@/components/PageSection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollRevealStagger } from "@/components/ScrollRevealStagger";
import { ServiceCard } from "@/components/ServiceCard";
import {
  LUFTFRACHT_END_TO_END,
  LUFTFRACHT_EXPORT_FLOW,
  LUFTFRACHT_FAQ,
  LUFTFRACHT_HIGHLIGHTS,
  LUFTFRACHT_IMPORT_FLOW,
  LUFTFRACHT_METRICS,
  LUFTFRACHT_SERVICES,
} from "@/lib/luftfracht";

export const metadata: Metadata = {
  title: "Luftfracht Import Export",
  description:
    "Import- und Export-Handling am Flughafen München – Annahme, Dokumentation, Sicherheit und Übergabe mit klaren Prozessen.",
};

export default function LuftfrachtPage() {
  return (
    <>
      <Hero
        image="/images/luftfracht/hero.jpg"
        title="Luftfracht Import und Export"
        subtitle="Mit Erfahrung, strukturierten Abläufen und höchsten Qualitätsstandards sorgen wir für eine sichere, effiziente und transparente Abwicklung Ihrer Sendungen am Flughafen München."
      />

      <IntroSplitBand
        titleDark="Zwei Prozesse."
        titleLight="Ein hoher Qualitätsanspruch."
        description="Ob eingehende oder ausgehende Luftfrachtsendungen – wir begleiten jeden Auftrag mit klar definierten Prozessen und einer zuverlässigen operativen Abwicklung. Durch die enge Zusammenarbeit mit Airlines, Behörden und Logistikpartnern gewährleisten wir einen reibungslosen Warenfluss am Flughafen München."
        image="/images/luftfracht/intro-band.jpg"
        imageAlt="Luftfracht-Handling am Flughafen München"
      />

      <PageSection>
        <ScrollReveal duration={1100}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <SectionHeader
              eyebrow="Luftfracht"
              dark="Professionelle Abwicklung"
              light="für Import und Export"
              description="Von der ersten Annahme bis zur termingerechten Übergabe koordinieren wir sämtliche Schritte am Cargo-Drehkreuz München – mit klaren Verantwortlichkeiten und kurzen Kommunikationswegen."
            />
            <MetricRow items={LUFTFRACHT_METRICS} />
          </div>
        </ScrollReveal>
      </PageSection>

      <PageSection muted borderTop>
        <FlowTracksIntro
          titleMuted="Effiziente Prozesse"
          titleDark="für Import und Export."
          description="Eine zuverlässige Luftfrachtabwicklung erfordert präzise Abläufe, kurze Reaktionszeiten und eine enge Abstimmung zwischen allen Beteiligten. So strukturieren wir Import und Export – transparent und nachvollziehbar."
        />
        <div className="section-header-gap">
          <FlowTracks
            importTrack={{
              eyebrow: "Eingehend",
              label: "Import",
              steps: LUFTFRACHT_IMPORT_FLOW,
            }}
            exportTrack={{
              eyebrow: "Ausgehend",
              label: "Export",
              steps: LUFTFRACHT_EXPORT_FLOW,
            }}
          />
        </div>
      </PageSection>

      <PageSection borderTop>
        <ProcessTimeline
          eyebrow="End-to-End"
          titleDark="Vom Eingang"
          titleLight="bis zur Freigabe."
          description="Unabhängig von Richtung und Sendungsart folgen alle Aufträge einem klaren Qualitätsrahmen – mit dokumentierten Übergaben in jedem Schritt."
          items={LUFTFRACHT_END_TO_END}
        />
      </PageSection>

      <PageSection muted borderTop>
        <ScrollReveal duration={1000}>
          <SectionHeader
            eyebrow="Leistungen"
            dark="Was wir"
            light="für Sie übernehmen"
            description="Operative Luftfrachtabwicklung aus einer Hand – von der Erfassung über die Sicherheit bis zur Übergabe an Airline oder Empfänger."
          />
        </ScrollReveal>
        <ScrollRevealStagger
          className="section-header-gap grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8"
          stagger={90}
          duration={950}
          itemClassName="h-full"
        >
          {LUFTFRACHT_SERVICES.map((service) => (
            <ServiceCard
              key={service.title}
              image={service.image}
              title={service.title}
              bullets={[...service.bullets]}
              href={"href" in service ? service.href : undefined}
            />
          ))}
        </ScrollRevealStagger>
      </PageSection>

      <PageSection borderTop>
        <ScrollReveal duration={1000}>
          <div className="luftfracht-cta-band">
            <div className="luftfracht-cta-band__copy">
              <SectionHeader
                dark="Sicherheit integriert"
                light="in jedem Prozessschritt"
                description="Als reglementierter Beauftragter verbinden wir operative Abwicklung und Luftsicherheit – ohne Medienbrüche und mit klaren Freigabeprotokollen."
              />
            </div>
            <div className="luftfracht-cta-band__actions">
              <Button href="/roentgen" variant="gray" size="md">
                Röntgen & Security
              </Button>
              <Button href="/airline-handling" variant="white" size="md">
                Airline Handling
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger
          className="section-header-gap feature-card-grid"
          stagger={80}
          duration={900}
          itemClassName="h-full"
        >
          {LUFTFRACHT_HIGHLIGHTS.map((item) => (
            <FeatureCard key={item.title} title={item.title}>
              {item.text}
            </FeatureCard>
          ))}
        </ScrollRevealStagger>
      </PageSection>

      <PageSection muted>
        <ScrollReveal duration={1000}>
          <SectionHeader
            eyebrow="FAQ"
            dark="Häufige Fragen"
            description="Kurze Antworten zu typischen Anforderungen in Import und Export – für eine schnelle Orientierung vor Ihrer Anfrage."
          />
        </ScrollReveal>
        <ScrollReveal delay={100} duration={1000}>
          <dl className="section-header-gap divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {LUFTFRACHT_FAQ.map((item) => (
              <div key={item.q} className="py-6 md:py-7">
                <dt className="text-[15px] font-normal tracking-[-0.01em] text-[var(--foreground)]">
                  {item.q}
                </dt>
                <dd className="prose-muted mt-2.5 text-[14px]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </PageSection>

      <FooterCta title="Luftfracht, die zuverlässig ankommt – Import wie Export." />
    </>
  );
}
