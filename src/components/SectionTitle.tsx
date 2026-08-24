type Props = {
  dark: string;
  light: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** When false, dark + light stay on one line. Default true. */
  breakLines?: boolean;
};

export function SectionTitle({
  dark,
  light,
  className = "",
  as: Tag = "h2",
  breakLines = true,
}: Props) {
  return (
    <Tag
      className={`section-header__title heading-display max-w-4xl text-[clamp(1.5rem,4vw,2.375rem)] text-[var(--foreground)] ${className}`}
    >
      <span>{dark}</span>
      {breakLines ? <br /> : " "}
      <span className="text-[var(--muted-accent)]">{light}</span>
    </Tag>
  );
}

export function StatCard({
  value,
  label,
  footer,
  icon,
  valueSize = "lg",
}: {
  value?: string;
  label: string;
  footer: React.ReactNode;
  icon?: React.ReactNode;
  valueSize?: "lg" | "md";
}) {
  const valueClass =
    valueSize === "md"
      ? "stat-block__value stat-block__value--md"
      : "stat-block__value";

  return (
    <article className="stat-block">
      <div className="stat-block__head">
        {icon ? (
          <div className="stat-block__icon">{icon}</div>
        ) : (
          <p className={valueClass}>{value}</p>
        )}
        <p className="stat-block__label">{label}</p>
      </div>
      <div className="stat-block__footer">{footer}</div>
    </article>
  );
}
