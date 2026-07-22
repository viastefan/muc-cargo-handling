import Image from "next/image";
import { Button } from "./Button";
import { PhoneBox } from "./PhoneBox";

type Props = {
  image: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  showPhone?: boolean;
  overlay?: "dark" | "medium";
  align?: "left" | "center";
  compact?: boolean;
};

export function Hero({
  image,
  title,
  subtitle,
  ctaLabel = "Schreiben Sie uns",
  ctaHref = "/kontakt",
  showPhone = true,
  overlay = "dark",
  align = "left",
  compact = false,
}: Props) {
  return (
    <section className={`relative w-full overflow-hidden ${compact ? "min-h-[420px]" : "min-h-[560px] md:min-h-[640px]"}`}>
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className={`absolute inset-0 ${
          overlay === "dark"
            ? "bg-gradient-to-r from-black/70 via-black/45 to-black/25"
            : "bg-gradient-to-r from-black/55 via-black/35 to-black/20"
        }`}
      />
      <div className="relative mx-auto flex h-full min-h-[inherit] max-w-[1280px] flex-col justify-end px-5 pb-10 pt-28 lg:px-8 lg:pb-14">
        <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
          <h1 className="text-3xl font-bold leading-[1.15] text-white md:text-4xl lg:text-[44px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/90 md:text-base">
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={`mt-8 flex flex-col gap-4 sm:flex-row sm:items-end ${
            showPhone ? "sm:justify-between" : ""
          } ${align === "center" ? "sm:justify-center" : ""}`}
        >
          <Button href={ctaHref} variant="white">
            {ctaLabel}
          </Button>
          {showPhone && <PhoneBox />}
        </div>
      </div>
    </section>
  );
}
