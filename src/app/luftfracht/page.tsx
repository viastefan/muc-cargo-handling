import type { Metadata } from "next";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IntroSplitBand } from "@/components/IntroSplitBand";
import { PageSection } from "@/components/PageSection";
import { ProcessDotCards } from "@/components/ProcessDotCards";
import { LUFTFRACHT_IMPORT_EXPORT_STEPS } from "@/lib/content";

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
        image="/images/luftfracht/band.jpg"
        imageAlt="Luftfracht-Handling am Flughafen München"
      />

      <PageSection className="!pt-12 md:!pt-16 lg:!pt-20">
        <ProcessDotCards
          titleMuted="Effiziente Prozesse"
          titleDark="für Import und Export."
          description="Eine zuverlässige Luftfrachtabwicklung erfordert präzise Abläufe, kurze Reaktionszeiten und eine enge Abstimmung zwischen allen Beteiligten. Wir koordinieren sämtliche operativen Prozesse – von der Ankunft der Sendung bis zur Weiterleitung – und gewährleisten eine sichere, transparente und termingerechte Bearbeitung Ihrer Luftfracht."
          items={LUFTFRACHT_IMPORT_EXPORT_STEPS}
        />
      </PageSection>

      <FooterCta />
    </>
  );
}
