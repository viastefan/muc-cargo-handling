import { SectionTitle } from "./SectionTitle";

type Props = {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  borderTop?: boolean;
  id?: string;
};

export function PageSection({
  children,
  className = "",
  muted = false,
  borderTop = false,
  id,
}: Props) {
  return (
    <section
      id={id}
      className={`section-y ${muted ? "bg-[var(--surface)]" : ""} ${borderTop ? "border-t border-[var(--border)]" : ""} ${className}`}
    >
      <div className="page-container">{children}</div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="section-eyebrow">{children}</p>;
}

export function SectionHeader({
  dark,
  light,
  description,
  eyebrow,
  align = "left",
  className = "",
  breakTitle = true,
  descriptionClassName = "",
}: {
  dark: string;
  light?: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
  /** When false, dark + light title stay on one line. */
  breakTitle?: boolean;
  descriptionClassName?: string;
}) {
  return (
    <div
      className={`section-header ${align === "center" ? "section-header--center" : ""} ${className}`.trim()}
    >
      {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
      {light ? (
        <SectionTitle
          dark={dark}
          light={light}
          breakLines={breakTitle}
          className={`section-header__title ${align === "center" ? "mx-auto" : ""}`.trim()}
        />
      ) : (
        <h2 className="section-header__title heading-display text-[clamp(1.5rem,4vw,2.375rem)] text-[var(--foreground)]">
          {dark}
        </h2>
      )}
      {description ? (
        <p
          className={`prose-lead mt-5 ${align === "center" ? "mx-auto" : ""} ${descriptionClassName}`.trim()}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function FeatureCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="feature-card">
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__text">{children}</p>
    </article>
  );
}
