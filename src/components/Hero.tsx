import Image from "next/image";
import { Button } from "./Button";
import { PhoneBox } from "./PhoneBox";

type Props = {
  image: string;
  imageAlt?: string;
  title: React.ReactNode;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  eyebrow?: string;
};

export function Hero({
  image,
  imageAlt = "Luftfracht und Cargo Handling am Flughafen München",
  title,
  subtitle,
  ctaLabel = "Schreiben Sie uns",
  ctaHref = "/kontakt",
  eyebrow = "Flughafen München",
}: Props) {
  return (
    <section className="hero-wrap">
      <div className="hero-frame">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="hero-image object-cover object-[center_32%] lg:object-center"
          sizes="100vw"
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-copy">
            {eyebrow ? <p className="hero-eyebrow">{eyebrow}</p> : null}
            <h1 className="hero-title heading-display text-white">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
            <div className="hero-actions">
              <Button href={ctaHref} variant="primary" size="hero" className="hero-cta-btn">
                {ctaLabel}
              </Button>
              <PhoneBox variant="hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
