export function Timeline({
  items,
}: {
  items: readonly { year: string; text: string }[];
}) {
  return (
    <ol className="timeline">
      {items.map((item, index) => (
        <li key={`${item.year}-${item.text}`} className="timeline-item">
          <div className="timeline-marker" aria-hidden="true">
            <span className="timeline-dot" />
            {index < items.length - 1 && <span className="timeline-line" />}
          </div>
          <div className="timeline-body">
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--muted-light)]">
              {item.year}
            </p>
            <p className="mt-1.5 text-[15px] leading-snug text-[var(--foreground)]">
              {item.text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
