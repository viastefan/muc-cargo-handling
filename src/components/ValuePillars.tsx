export function ValuePillars({
  items,
}: {
  items: readonly { title: string; text: string }[];
}) {
  return (
    <div className="value-pillars">
      {items.map((item, index) => (
        <article key={item.title} className="value-pillar">
          <p className="value-pillar__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="value-pillar__title">{item.title}</h3>
          <p className="value-pillar__text">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
