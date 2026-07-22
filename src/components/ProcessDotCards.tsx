"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ScrollRevealStagger } from "./ScrollRevealStagger";

type Item = {
  title: string;
  text: string;
};

type Props = {
  titleMuted: string;
  titleDark: string;
  description: string;
  items: readonly Item[];
};

function StepDots({ activeIndex, total }: { activeIndex: number; total: number }) {
  return (
    <div className="process-dot-card__dots" aria-hidden="true">
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`process-dot-card__dot${index === activeIndex ? " process-dot-card__dot--active" : ""}`}
        />
      ))}
    </div>
  );
}

export function ProcessDotCards({ titleMuted, titleDark, description, items }: Props) {
  return (
    <div className="process-dot-cards-wrap">
      <ScrollReveal duration={1100}>
        <div className="process-dot-cards__intro">
          <h2 className="process-dot-cards__title heading-display">
            <span className="text-[var(--muted-accent)]">{titleMuted}</span>{" "}
            <span className="text-[var(--foreground)]">{titleDark}</span>
          </h2>
          <p className="process-dot-cards__description prose-muted">{description}</p>
        </div>
      </ScrollReveal>

      <ScrollRevealStagger
        className="process-dot-cards"
        stagger={85}
        duration={950}
        itemClassName="h-full"
      >
        {items.map((item, index) => (
          <article key={item.title} className="process-dot-card">
            <StepDots activeIndex={index} total={items.length} />
            <h3 className="process-dot-card__title">{item.title}</h3>
            <p className="process-dot-card__text">{item.text}</p>
          </article>
        ))}
      </ScrollRevealStagger>
    </div>
  );
}
