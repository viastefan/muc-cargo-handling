export function SpecGrid({
  items,
}: {
  items: readonly { label: string; value: string; unit?: string }[];
}) {
  return (
    <dl className="spec-grid">
      {items.map((item) => (
        <div key={item.label} className="spec-grid-item">
          <dt className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted-light)]">
            {item.label}
          </dt>
          <dd className="mt-2 text-[clamp(1.25rem,2.5vw,1.75rem)] font-normal leading-none tracking-[-0.02em] text-[var(--foreground)]">
            {item.value}
            {item.unit && (
              <span className="ml-1 text-[14px] text-[var(--muted)]">{item.unit}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
