import type { Metadata } from "next";
import { FaqDirectory } from "@/components/FaqDirectory";
import { FooterCta } from "@/components/Footer";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { FAQ_CATEGORIES } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Häufige Fragen zu Luftfracht, Airline Handling und Sicherheitskontrollen am Flughafen München – Antworten von MUC Cargo Handling.",
};

export default function FaqPage() {
  return (
    <>
      <PageSection className="!pt-16 md:!pt-20">
        <div className="faq-page">
          <SectionHeader
            eyebrow="FAQ"
            dark="Häufige Fragen"
            description="Antworten zu Leistungen, Abläufen und Sicherheitsprozessen am Flughafen München – für eine schnelle Orientierung vor Ihrer Anfrage."
            className="faq-page__intro"
          />

          <div className="section-header-gap">
            <FaqDirectory categories={FAQ_CATEGORIES} />
          </div>
        </div>
      </PageSection>

      <FooterCta title="Noch Fragen? Wir beraten Sie persönlich." />
    </>
  );
}
