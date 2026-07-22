type Props = {
  dark: string;
  light: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionTitle({
  dark,
  light,
  className = "",
  as: Tag = "h2",
}: Props) {
  return (
    <Tag
      className={`max-w-4xl text-[clamp(1.5rem,4vw,2.375rem)] font-normal leading-[1.25] tracking-[-0.02em] text-[var(--foreground)] ${className}`}
    >
      <span>{dark}</span>{" "}
      <span className="text-[var(--muted-accent)]">{light}</span>
    </Tag>
  );
}

export function StatCard({
  value,
  label,
  footer,
  icon,
}: {
  value?: string;
  label: string;
  footer: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <article className="flex min-h-[220px] flex-col bg-[var(--surface)] p-6 md:min-h-[240px] md:p-8">
      <div className="flex-1">
        {icon ? (
          <div className="text-[var(--foreground)]">{icon}</div>
        ) : (
          <p className="text-[clamp(1.75rem,4vw,3rem)] font-normal leading-none tracking-[-0.03em] text-[var(--foreground)]">
            {value}
          </p>
        )}
        {!icon && (
          <p className="mt-2 text-[15px] font-normal text-[var(--foreground)]">{label}</p>
        )}
        {icon && (
          <p className="mt-3 text-[15px] font-normal text-[var(--foreground)]">{label}</p>
        )}
      </div>
      <div className="mt-6 text-[13px] leading-relaxed text-[var(--muted)]">{footer}</div>
    </article>
  );
}
