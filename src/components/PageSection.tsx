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
  align = "left",
  className = "",
}: {
  dark: string;
  light?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {light ? (
        <SectionTitle dark={dark} light={light} />
      ) : (
        <h2 className="text-[28px] font-medium tracking-[-0.02em] text-[var(--foreground)] md:text-[34px] lg:text-[38px]">
          {dark}
        </h2>
      )}
      {description && (
        <p className="prose-muted mt-5 max-w-2xl">{description}</p>
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
    <article className="bg-[var(--surface)] p-6 md:p-7">
      <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--foreground)]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{children}</p>
    </article>
  );
}
