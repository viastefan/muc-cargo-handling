import Image from "next/image";
import { Button } from "./Button";
import { PhoneBox } from "./PhoneBox";

type Props = {
  image: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Hero({
  image,
  title,
  subtitle,
  ctaLabel = "Schreiben Sie uns",
  ctaHref = "/kontakt",
}: Props) {
  return (
    <section className="hero-wrap">
      <div className="hero-frame">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover object-[center_32%] lg:object-center"
          sizes="100vw"
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1 className="hero-title heading-display text-white">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
          <div className="hero-spacer" aria-hidden="true" />
          <div className="hero-cta-slot">
            <Button href={ctaHref} variant="primary" size="hero" className="hero-cta-btn">
              {ctaLabel}
            </Button>
          </div>
          <div className="hero-phone-slot">
            <PhoneBox variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
