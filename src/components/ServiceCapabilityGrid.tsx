import Link from "next/link";

type Item = { title: string; href: string };

export function ServiceCapabilityGrid({ items }: { items: readonly Item[] }) {
  return (
    <ul className="capability-grid">
      {items.map((item) => (
        <li key={item.title}>
          <Link href={item.href} className="capability-grid__link">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
