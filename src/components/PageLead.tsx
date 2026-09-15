import { Button } from "./Button";
import { PhoneBox } from "./PhoneBox";

type Props = {
  brand?: string;
  title: React.ReactNode;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  metrics?: readonly { value: string; label: string }[];
};

/**
 * Text-first page opener without a full-bleed photo hero.
 * Used when a hero image would fight the content or has been retired.
 */
export function PageLead({
  brand = "MUC Cargo Handling",
  title,
  subtitle,
  ctaLabel = "Schreiben Sie uns",
  ctaHref = "/kontakt",
  metrics,
}: Props) {
  return (
    <section className="page-lead">
      <div className="page-lead__frame">
        <div className="page-lead__glow" aria-hidden="true" />
        <div className="page-lead__content">
          <p className="page-lead__brand">{brand}</p>
          <h1 className="page-lead__title">{title}</h1>
          <p className="page-lead__subtitle">{subtitle}</p>
          <div className="page-lead__actions">
            <Button href={ctaHref} variant="primary" size="hero" className="hero-cta-btn">
              {ctaLabel}
            </Button>
            <PhoneBox variant="hero" />
          </div>
          {metrics && metrics.length > 0 ? (
            <ul className="page-lead__metrics">
              {metrics.map((item) => (
                <li key={item.value} className="page-lead__metric">
                  <span className="page-lead__metric-value">{item.value}</span>
                  <span className="page-lead__metric-label">{item.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
