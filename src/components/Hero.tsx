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
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[580px] md:min-h-[640px]">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />

        <div className="relative mx-auto flex min-h-[580px] max-w-[1280px] flex-col justify-end px-5 pb-8 pt-28 md:min-h-[640px] lg:px-8 lg:pb-10">
          <div className="max-w-2xl">
            <h1 className="text-[32px] font-bold leading-[1.12] text-white md:text-[40px] lg:text-[44px]">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/92 md:mt-5 md:text-base">
              {subtitle}
            </p>
          </div>

          <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
            <Button href={ctaHref} variant="white" className="w-fit shrink-0">
              {ctaLabel}
            </Button>
            <PhoneBox className="w-fit shrink-0 sm:ml-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
