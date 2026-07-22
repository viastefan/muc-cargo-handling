import { PhoneIcon } from "./ArrowIcon";
import { COMPANY } from "@/lib/company";

export function PhoneBox({
  phone = COMPANY.phone,
  phoneTel = COMPANY.phoneTel,
  className = "",
}: {
  phone?: string;
  phoneTel?: string;
  className?: string;
}) {
  return (
    <a
      href={`tel:${phoneTel}`}
      className={`btn-motion inline-flex w-fit max-w-full items-center gap-3 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--brand)]">
        <PhoneIcon />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[11px] font-normal uppercase tracking-[0.08em] text-[var(--muted-light)]">
          Haben Sie Fragen?
        </span>
        <span className="block text-[13px] font-normal text-[var(--foreground)]">
          Tel: {phone}
        </span>
      </span>
    </a>
  );
}
