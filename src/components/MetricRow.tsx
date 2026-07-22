export function MetricRow({
  items,
}: {
  items: readonly { value: string; label: string }[];
}) {
  return (
    <div className="metric-row">
      {items.map((item) => (
        <div key={item.label} className="metric-row-item">
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-normal leading-none tracking-[-0.03em] text-[var(--foreground)]">
            {item.value}
          </p>
          <p className="mt-2 text-[13px] leading-snug text-[var(--muted)]">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
