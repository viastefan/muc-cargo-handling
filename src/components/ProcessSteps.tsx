export function ProcessSteps({
  items,
  className = "",
}: {
  items: readonly { step: string; title: string; text: string }[];
  className?: string;
}) {
  return (
    <ol className={`process-steps ${className}`}>
      {items.map((item, index) => (
        <li key={item.step} className="process-step">
          <div className="process-step-marker" aria-hidden="true">
            <span className="process-step-number">{item.step}</span>
            {index < items.length - 1 && <span className="process-step-line" />}
          </div>
          <div className="process-step-body">
            <h3 className="text-[15px] font-normal tracking-[-0.01em] text-[var(--foreground)]">
              {item.title}
            </h3>
            <p className="prose-muted mt-2 text-[14px]">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
