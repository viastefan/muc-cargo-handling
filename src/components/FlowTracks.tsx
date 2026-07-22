"use client";

import { ScrollReveal } from "./ScrollReveal";

type Step = { step: string; title: string; text: string };

type Track = {
  label: string;
  eyebrow: string;
  steps: readonly Step[];
};

type Props = {
  importTrack: Track;
  exportTrack: Track;
};

function FlowStep({ step, title, text, isLast }: Step & { isLast: boolean }) {
  return (
    <li className={`flow-step${isLast ? " flow-step--last" : ""}`}>
      <div className="flow-step__rail" aria-hidden="true">
        <span className="flow-step__number">{step}</span>
        {!isLast && <span className="flow-step__line" />}
      </div>
      <div className="flow-step__content">
        <h3 className="flow-step__title">{title}</h3>
        <p className="flow-step__text">{text}</p>
      </div>
    </li>
  );
}

function FlowTrack({ label, eyebrow, steps }: Track) {
  return (
    <div className="flow-track">
      <div className="flow-track__header">
        <p className="flow-track__eyebrow">{eyebrow}</p>
        <h3 className="flow-track__label heading-display">{label}</h3>
      </div>
      <ol className="flow-track__list">
        {steps.map((item, index) => (
          <FlowStep key={item.step} {...item} isLast={index === steps.length - 1} />
        ))}
      </ol>
    </div>
  );
}

export function FlowTracks({ importTrack, exportTrack }: Props) {
  return (
    <div className="flow-tracks">
      <ScrollReveal duration={1000}>
        <FlowTrack {...importTrack} />
      </ScrollReveal>
      <ScrollReveal delay={120} duration={1000}>
        <FlowTrack {...exportTrack} />
      </ScrollReveal>
    </div>
  );
}

export function FlowTracksIntro({
  titleMuted,
  titleDark,
  description,
}: {
  titleMuted: string;
  titleDark: string;
  description: string;
}) {
  return (
    <ScrollReveal duration={1100}>
      <div className="flow-tracks-intro">
        <h2 className="flow-tracks-intro__title heading-display">
          <span className="text-[var(--muted-accent)]">{titleMuted}</span>{" "}
          <span className="text-[var(--foreground)]">{titleDark}</span>
        </h2>
        <p className="flow-tracks-intro__description prose-muted">{description}</p>
      </div>
    </ScrollReveal>
  );
}
