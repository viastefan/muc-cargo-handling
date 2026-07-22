import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
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
        <SectionHeader
          eyebrow="FAQ"
          dark="Häufige Fragen"
          description="Antworten zu Leistungen, Abläufen und Sicherheitsprozessen am Flughafen München – für eine schnelle Orientierung vor Ihrer Anfrage."
        />

        <div className="section-header-gap space-y-14 md:space-y-16">
          {FAQ_CATEGORIES.map((category) => (
            <section key={category.title} aria-labelledby={`faq-${category.title}`}>
              <h2
                id={`faq-${category.title}`}
                className="mb-6 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted-light)]"
              >
                {category.title}
              </h2>
              <FaqList items={category.items} />
            </section>
          ))}
        </div>
      </PageSection>

      <FooterCta title="Noch Fragen? Wir beraten Sie persönlich." />
    </>
  );
}
