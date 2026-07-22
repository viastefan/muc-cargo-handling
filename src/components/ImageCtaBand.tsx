import Image from "next/image";
import { Button } from "./Button";

type Props = {
  title: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

export function ImageCtaBand({ title, ctaLabel, ctaHref, image }: Props) {
  return (
    <section className="image-cta-band" aria-labelledby="image-cta-band-title">
      <div className="image-cta-band__inner">
        <div className="image-cta-band__panel">
          <h2 id="image-cta-band-title" className="image-cta-band__title heading-display">
            {title}
          </h2>
          <Button href={ctaHref} variant="white" size="md" className="image-cta-band__btn">
            {ctaLabel}
          </Button>
        </div>
        <div className="image-cta-band__media">
          <Image
            src={image}
            alt=""
            fill
            className="image-cta-band__image"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>
      </div>
    </section>
  );
}
