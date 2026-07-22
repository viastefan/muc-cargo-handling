import { PhoneIcon } from "./ArrowIcon";
import { COMPANY } from "@/lib/company";

export function PhoneBox({
  phone = COMPANY.phoneDisplay,
  phoneTel = COMPANY.phoneDisplayTel,
  className = "",
  variant = "default",
}: {
  phone?: string;
  phoneTel?: string;
  className?: string;
  variant?: "default" | "hero";
}) {
  const isHero = variant === "hero";

  return (
    <a
      href={`tel:${phoneTel}`}
      className={`btn-motion inline-flex w-fit max-w-full items-center gap-3 bg-white text-[var(--foreground)] transition-shadow hover:bg-[#fafafa] ${
        isHero ? "phone-box-hero" : "px-4 py-3 shadow-sm hover:shadow-md"
      } ${className}`}
    >
      <span
        className={`phone-box-icon flex shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] ${
          isHero ? "" : "h-10 w-10"
        }`}
      >
        <PhoneIcon className={isHero ? "h-5 w-5" : "h-5 w-5"} />
      </span>
      <span className="min-w-0 leading-tight">
        <span
          className={`phone-box-label block uppercase text-[var(--foreground)] ${
            isHero ? "" : "text-[11px] font-normal tracking-[0.08em] text-[var(--muted-light)]"
          }`}
        >
          Haben Sie Fragen?
        </span>
        <span className={`phone-box-number block font-normal text-[var(--foreground)] ${isHero ? "" : "text-[13px]"}`}>
          Tel: {phone}
        </span>
      </span>
    </a>
  );
}
