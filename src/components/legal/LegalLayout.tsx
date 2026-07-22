type BlockProps = {
  title: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export function LegalArticle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`legal-article ${className}`.trim()}>
      <div className="legal-article__inner">{children}</div>
    </article>
  );
}

export function LegalIntro({
  children,
  updated,
}: {
  children: React.ReactNode;
  updated?: string;
}) {
  return (
    <header className="legal-intro">
      {updated && <p className="legal-intro__meta">Stand: {updated}</p>}
      <p className="legal-intro__lead">{children}</p>
    </header>
  );
}

export function LegalBlock({ title, children, id, className = "" }: BlockProps) {
  return (
    <section id={id} className={`legal-block ${className}`.trim()}>
      <h2 className="legal-block__title">{title}</h2>
      <div className="legal-block__body">{children}</div>
    </section>
  );
}

export function LegalRedBand({
  title,
  children,
  href,
  linkLabel,
}: {
  title: string;
  children?: React.ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <aside className="legal-red-band">
      <div className="legal-red-band__inner">
        <h2 className="legal-red-band__title">{title}</h2>
        {children && <p className="legal-red-band__text">{children}</p>}
        {href && linkLabel && (
          <a href={href} className="legal-red-band__link">
            {linkLabel}
            <span aria-hidden="true"> →</span>
          </a>
        )}
      </div>
    </aside>
  );
}

export function LegalList({ items }: { items: readonly string[] }) {
  return (
    <ul className="legal-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
