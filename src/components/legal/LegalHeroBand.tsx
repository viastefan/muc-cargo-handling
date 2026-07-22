import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/media";

type Props = {
  title: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
};

export function LegalHeroBand({
  title,
  ctaLabel = "Kontaktieren Sie uns bei etwaigen Anliegen",
  ctaHref = "/kontakt",
  image = media.legalBanner,
}: Props) {
  return (
    <section className="legal-hero-band" aria-labelledby="legal-hero-title">
      <div className="legal-hero-band__media">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="legal-hero-band__panel">
        <h1 id="legal-hero-title" className="legal-hero-band__title heading-display">
          {title}
        </h1>
        <Link href={ctaHref} className="legal-hero-band__cta">
          <span>{ctaLabel}</span>
          <span className="legal-hero-band__cta-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
