"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ScrollRevealStagger } from "./ScrollRevealStagger";

type Step = { step: string; title: string; text: string };

type Props = {
  titleDark: string;
  titleLight?: string;
  description?: string;
  eyebrow?: string;
  items: readonly Step[];
};

export function ProcessTimeline({ titleDark, titleLight, description, eyebrow, items }: Props) {
  return (
    <div className="process-timeline-wrap">
      <ScrollReveal duration={1100}>
        <div className="process-timeline__header">
          {eyebrow && <p className="process-timeline__eyebrow">{eyebrow}</p>}
          <h2 className="process-timeline__title heading-display">
            {titleLight ? (
              <>
                <span className="text-[var(--foreground)]">{titleDark}</span>{" "}
                <span className="text-[var(--muted-accent)]">{titleLight}</span>
              </>
            ) : (
              titleDark
            )}
          </h2>
          {description && <p className="process-timeline__description prose-muted">{description}</p>}
        </div>
      </ScrollReveal>

      <ScrollRevealStagger
        className="process-timeline"
        stagger={90}
        duration={950}
        itemClassName="h-full"
      >
        {items.map((item, index) => (
          <article key={item.step} className="process-timeline__step">
            <div className="process-timeline__step-head">
              <span className="process-timeline__step-number">{item.step}</span>
              {index < items.length - 1 && (
                <span className="process-timeline__connector" aria-hidden="true" />
              )}
            </div>
            <h3 className="process-timeline__step-title">{item.title}</h3>
            <p className="process-timeline__step-text">{item.text}</p>
          </article>
        ))}
      </ScrollRevealStagger>
    </div>
  );
}
