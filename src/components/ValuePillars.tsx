export function ValuePillars({
  items,
}: {
  items: readonly { title: string; text: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="value-pillar">
          <span className="value-pillar-accent" aria-hidden="true" />
          <h3 className="text-[15px] font-normal tracking-[-0.01em] text-[var(--foreground)]">
            {item.title}
          </h3>
          <p className="prose-muted mt-2.5 text-[14px]">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
