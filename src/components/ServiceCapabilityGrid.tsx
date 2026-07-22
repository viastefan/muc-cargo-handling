import Link from "next/link";
import { ButtonArrowIcon } from "./ButtonArrowIcon";

type Item = { title: string; href: string };

export function ServiceCapabilityGrid({ items }: { items: readonly Item[] }) {
  return (
    <ul className="capability-grid">
      {items.map((item) => (
        <li key={item.title}>
          <Link href={item.href} className="capability-grid__link group">
            <span>{item.title}</span>
            <span className="capability-grid__icon" aria-hidden="true">
              <ButtonArrowIcon />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
