import Link from "next/link";

type File = { label: string; href: string };
type Group = { title: string; meta: string; files: readonly File[] };

export function DownloadGrid({ items }: { items: readonly Group[] }) {
  return (
    <div className="download-grid">
      {items.map((item) => (
        <article key={item.title} className="download-card">
          <h3 className="download-card__title">{item.title}</h3>
          <p className="download-card__meta">{item.meta}</p>
          <ul className="download-card__links">
            {item.files.map((file) => (
              <li key={file.href}>
                <Link href={file.href} className="download-card__link">
                  {file.label}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
