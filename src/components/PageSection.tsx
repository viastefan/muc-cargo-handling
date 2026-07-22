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
  return (
    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted-light)]">
      {children}
    </p>
  );
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
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      {light ? (
        <SectionTitle
          dark={dark}
          light={light}
          breakLines={breakTitle}
          className={align === "center" ? "mx-auto" : ""}
        />
      ) : (
        <h2 className="heading-display text-[clamp(1.5rem,4vw,2.375rem)] text-[var(--foreground)]">
          {dark}
        </h2>
      )}
      {description && (
        <p
          className={`prose-lead mt-5 ${align === "center" ? "mx-auto" : ""} ${descriptionClassName}`.trim()}
        >
          {description}
        </p>
      )}
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
      <span className="feature-card-accent" aria-hidden="true" />
      <h3 className="text-[15px] font-normal tracking-[-0.01em] text-[var(--foreground)]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{children}</p>
    </article>
  );
}
