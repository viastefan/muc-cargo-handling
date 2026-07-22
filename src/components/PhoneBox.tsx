import { PhoneIcon } from "./ArrowIcon";

export function PhoneBox({
  phone = "089 – 975 948 77",
  className = "",
}: {
  phone?: string;
  className?: string;
}) {
  return (
    <a
      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
      className={`btn-motion inline-flex items-center gap-3 bg-white px-3.5 py-2.5 shadow-sm transition-shadow hover:shadow-md sm:px-4 sm:py-3 ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--brand)] sm:h-10 sm:w-10">
        <PhoneIcon />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[10px] font-normal uppercase tracking-[0.08em] text-[var(--muted-light)] sm:text-[11px]">
          Haben Sie Fragen?
        </span>
        <span className="block truncate text-[13px] font-normal text-[var(--foreground)] sm:text-sm">
          Tel: {phone}
        </span>
      </span>
    </a>
  );
}
