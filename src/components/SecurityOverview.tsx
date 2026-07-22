import Link from "next/link";
import { Button } from "./Button";

type Item = { title: string; text: string };

export function SecurityOverview({ items }: { items: readonly Item[] }) {
  return (
    <section className="security-band" aria-labelledby="security-band-title">
      <div className="security-band__inner page-container">
        <div className="security-band__header">
          <div className="security-band__intro">
            <p className="security-band__eyebrow">Luftsicherheit</p>
            <h2 id="security-band-title" className="security-band__title heading-display">
              Sicherheit und Kontrolle für Ihre Luftfracht
            </h2>
            <p className="security-band__lead">
              Als Reglementierter Beauftragter setzen wir moderne Prüfverfahren ein – schnell,
              dokumentiert und nach geltenden Vorschriften.
            </p>
          </div>
          <Button href="/roentgen" variant="white" size="md" className="security-band__cta">
            Alle Verfahren
          </Button>
        </div>

        <ul className="security-band__grid">
          {items.map((item) => (
            <li key={item.title}>
              <Link href="/roentgen" className="security-band__item">
                <span className="security-band__item-title">{item.title}</span>
                <span className="security-band__item-text">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
