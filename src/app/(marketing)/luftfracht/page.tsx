import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { FlowTracks, FlowTracksIntro } from "@/components/FlowTracks";
import { FooterCta } from "@/components/Footer";
import { PageLead } from "@/components/PageLead";
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
  alternates: { canonical: "/luftfracht" },
  title: "Luftfracht Import Export",
  description:
    "Import- und Export-Handling am Flughafen München – Annahme, Dokumentation, Sicherheit und Übergabe mit klaren Prozessen.",
};

export default function LuftfrachtPage() {
  return (
    <>
      <PageLead
        brand="MUC Cargo Handling"
        title={
          <>
            Luftfracht
            <br />
            Import und Export
          </>
        }
        subtitle="Annahme, Dokumentation, Sicherung und Übergabe unter einem Dach – abgestimmt auf Ihr Zeitfenster am Flughafen München."
        metrics={LUFTFRACHT_METRICS}
      />

      <PageSection borderTop>
        <FlowTracksIntro
          titleMuted="Effiziente Prozesse"
          titleDark="für Import und Export."
          description="So strukturieren wir Import und Export – transparent und nachvollziehbar."
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

      <PageSection muted borderTop>
        <ScrollReveal duration={1100}>
          <div className="luftfracht-editorial">
            <div className="luftfracht-editorial__copy">
              <SectionHeader
                eyebrow="Am Standort"
                dark="Direkt am"
                light="Cargo-Drehkreuz MUC"
                description="Kurze Wege zwischen Annahme, Dokumentation und Freigabe – ohne Umwege über externe Lager."
              />
              <div className="luftfracht-editorial__actions">
                <Button href="/kontakt" variant="primary" size="md">
                  Anfrage stellen
                </Button>
                <Button href="/unternehmen" variant="white" size="md">
                  Über uns
                </Button>
              </div>
            </div>
            <div className="luftfracht-editorial__media">
              <Image
                src="/images/luftfracht/service-1.jpg"
                alt="Lagerung und Erfassung von Luftfracht am Standort München"
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 48vw"
              />
            </div>
          </div>
        </ScrollReveal>
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
            <FeatureCard key={item.title} title={item.title} icon={item.icon}>
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
