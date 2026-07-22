import Image from "next/image";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";
import { SectionTitle } from "./SectionTitle";

type Props = {
  titleDark: string;
  titleLight: string;
  description: string;
  image: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function IntroSplitBand({
  titleDark,
  titleLight,
  description,
  image,
  imageAlt = "",
  ctaLabel,
  ctaHref,
}: Props) {
  return (
    <section className="intro-split-band">
      <div className="page-container intro-split-band__header">
        <ScrollReveal className="intro-split-band__grid" duration={1100}>
          <div>
            <SectionTitle dark={titleDark} light={titleLight} className="intro-split-band__title" />
            {ctaLabel && ctaHref && (
              <Button href={ctaHref} variant="gray" size="md" className="intro-split-band__cta">
                {ctaLabel}
              </Button>
            )}
          </div>
          <p className="intro-split-band__description prose-muted">{description}</p>
        </ScrollReveal>
      </div>

      <ScrollReveal variant="scale" duration={1200} className="intro-split-band__media media-dim">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </ScrollReveal>

      <div className="intro-split-band__accent" aria-hidden="true" />
    </section>
  );
}
