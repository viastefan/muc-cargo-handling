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

        <p className="section-header-gap prose-muted text-[14px] leading-relaxed md:text-[15px]">
          {intro}
        </p>
        <p className="mt-3 text-[12px] text-[var(--muted-light)]">Stand: {LEGAL_UPDATED}</p>

        <div className="mt-10 divide-y divide-[var(--border)] border-y border-[var(--border)] md:mt-12">
          {sections.map((section) => (
            <section key={section.title} className="py-7 md:py-8">
              <h2 className="text-[15px] font-normal text-[var(--foreground)]">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.title}-${index}`}
                    className="prose-muted text-[14px] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
