import { Button } from "./Button";
import { HeroMedia, type HeroSlide } from "./HeroMedia";
import { PhoneBox } from "./PhoneBox";

type Props = {
  /** Primary hero image (also first slide when `images` is omitted). */
  image: string;
  imageAlt?: string;
  /** Extra or full slide list — enables the movable hero carousel. */
  images?: readonly (string | HeroSlide)[];
  title: React.ReactNode;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  eyebrow?: string;
};

function toSlides(
  image: string,
  imageAlt: string,
  images?: readonly (string | HeroSlide)[],
): HeroSlide[] {
  if (images && images.length > 0) {
    return images.map((item, i) =>
      typeof item === "string"
        ? { src: item, alt: i === 0 ? imageAlt : "" }
        : { src: item.src, alt: item.alt ?? (i === 0 ? imageAlt : "") },
    );
  }
  return [{ src: image, alt: imageAlt }];
}

export function Hero({
  image,
  imageAlt = "Luftfracht und Cargo Handling am Flughafen München",
  images,
  title,
  subtitle,
  ctaLabel = "Schreiben Sie uns",
  ctaHref = "/kontakt",
  eyebrow,
}: Props) {
  const slides = toSlides(image, imageAlt, images);

  return (
    <section className="hero-wrap">
      <div className="hero-frame">
        <HeroMedia slides={slides} />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-copy">
            {eyebrow ? <p className="hero-eyebrow">{eyebrow}</p> : null}
            <h1 className="hero-title text-white">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
            <div className="hero-cta-slot">
              <Button href={ctaHref} variant="primary" size="hero" className="hero-cta-btn">
                {ctaLabel}
              </Button>
            </div>
          </div>
          <div className="hero-phone-slot">
            <PhoneBox variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
