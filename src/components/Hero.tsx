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
      <div className="relative min-h-[560px] md:min-h-[620px] lg:min-h-[640px]">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/52 to-black/28" />

        <div className="page-container relative flex min-h-[560px] flex-col justify-end pb-8 pt-28 md:min-h-[620px] md:pb-10 lg:min-h-[640px]">
          <div className="max-w-2xl">
            <h1 className="text-[30px] font-medium leading-[1.14] tracking-[-0.025em] text-white md:text-[38px] lg:text-[42px]">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] font-light leading-[1.7] text-white/90 md:mt-5 md:text-[16px]">
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
