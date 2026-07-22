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
      <div
        className="relative min-h-[var(--hero-min)]"
        style={{ minHeight: "var(--hero-min)" }}
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover object-[center_30%] sm:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65 sm:bg-gradient-to-r sm:from-black/78 sm:via-black/52 sm:to-black/28" />

        <div
          className="page-container relative flex flex-col justify-end"
          style={{ minHeight: "var(--hero-min)" }}
        >
          <div className="flex min-h-[var(--hero-min)] flex-col justify-end pb-5 pt-[4.75rem] sm:pb-8 sm:pt-28 md:pb-10 lg:pt-32">
            <div className="max-w-2xl">
              <h1 className="heading-display text-[clamp(1.5rem,5.2vw,2.625rem)] text-white">
                {title}
              </h1>
              <p className="mt-3 max-w-xl text-[14px] font-normal leading-[1.65] text-white/88 sm:mt-4 sm:text-[15px] sm:leading-[1.7] md:mt-5 md:text-[16px]">
                {subtitle}
              </p>
            </div>

            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4 md:mt-10">
              <Button
                href={ctaHref}
                variant="white"
                className="w-full sm:w-fit sm:shrink-0"
              >
                {ctaLabel}
              </Button>
              <PhoneBox className="w-full sm:ml-auto sm:w-auto sm:shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
