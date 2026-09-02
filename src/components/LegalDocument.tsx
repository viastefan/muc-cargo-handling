import { PageSection, SectionHeader } from "@/components/PageSection";
import type { LegalSection } from "@/lib/legal";
import { LEGAL_UPDATED } from "@/lib/legal";

type Props = {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalDocument({ title, description, intro, sections }: Props) {
  return (
    <PageSection className="!pt-16 md:!pt-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="Rechtliches"
          dark={title}
          description={description}
        />

        <div className="section-header-gap legal-intro">
          <p className="prose-muted text-[14px] leading-relaxed md:text-[15px]">{intro}</p>
          <span className="legal-intro__stamp">Stand: {LEGAL_UPDATED}</span>
        </div>

        <div className="mt-10 space-y-3 md:mt-12">
          {sections.map((section, index) => (
            <section key={section.title} className="legal-section">
              <span className="legal-section__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="legal-section__body">
                <h2 className="legal-section__title">{section.title}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={`${section.title}-${pIndex}`}
                      className="prose-muted text-[14px] leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
