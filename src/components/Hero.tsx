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
          <div className="max-w-2xl">
            <h1 className="heading-display text-[clamp(1.625rem,5vw,2.625rem)] text-white">
              {title}
            </h1>
            <p className="mt-3 max-w-xl text-[14px] font-normal leading-[1.65] text-white/90 md:mt-4 md:text-[15px] md:leading-[1.7] lg:text-[16px]">
              {subtitle}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:items-end md:justify-between md:gap-4 lg:mt-10">
            <Button href={ctaHref} variant="white" size="md">
              {ctaLabel}
            </Button>
            <PhoneBox className="md:ml-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
