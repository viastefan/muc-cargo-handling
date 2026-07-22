import Link from "next/link";
import { ButtonArrowIcon } from "./ButtonArrowIcon";

type Item = { title: string; text: string };

export function SecurityOverview({ items }: { items: readonly Item[] }) {
  return (
    <div className="security-overview">
      <div className="security-overview__header">
        <div>
          <p className="security-overview__eyebrow">Luftsicherheit</p>
          <h3 className="security-overview__title heading-display">
            Sicherheit und Kontrolle für Ihre Luftfracht
          </h3>
          <p className="security-overview__lead prose-muted">
            Als Reglementierter Beauftragter setzen wir moderne Prüfverfahren ein – schnell,
            dokumentiert und nach geltenden Vorschriften.
          </p>
        </div>
        <Link href="/roentgen" className="security-overview__more">
          Alle Verfahren
          <ButtonArrowIcon />
        </Link>
      </div>
      <ul className="security-overview__grid">
        {items.map((item) => (
          <li key={item.title}>
            <Link href="/roentgen" className="security-overview__item">
              <span className="security-overview__item-title">{item.title}</span>
              <span className="security-overview__item-text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
