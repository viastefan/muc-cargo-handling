import Link from "next/link";
import { ButtonArrowIcon } from "./ButtonArrowIcon";

type Item = {
  href: string;
  title: string;
  subtitle: string;
  description: string;
};

export function ServiceNav({ items }: { items: readonly Item[] }) {
  return (
    <div className="service-nav">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="service-nav-card group">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted-light)]">
                {item.subtitle}
              </p>
              <h3 className="mt-2 text-[17px] font-normal tracking-[-0.01em] text-[var(--foreground)]">
                {item.title}
              </h3>
            </div>
            <span className="service-nav-arrow" aria-hidden="true">
              <ButtonArrowIcon />
            </span>
          </div>
          <p className="prose-muted mt-4 text-[14px]">{item.description}</p>
        </Link>
      ))}
    </div>
  );
}
