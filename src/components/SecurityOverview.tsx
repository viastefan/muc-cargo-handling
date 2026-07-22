import Link from "next/link";
import { FeatureIcon, type IconName } from "./FeatureIcon";

type Item = { title: string; text: string; icon?: IconName };

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
        </div>

        <ul className="security-band__grid">
          {items.map((item) => (
            <li key={item.title}>
              <Link href="/roentgen" className="security-band__item">
                {item.icon ? (
                  <span className="security-band__item-icon" aria-hidden="true">
                    <FeatureIcon name={item.icon} className="security-band__item-icon-svg" />
                  </span>
                ) : null}
                <span className="security-band__item-copy">
                  <span className="security-band__item-title">{item.title}</span>
                  <span className="security-band__item-text">{item.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
