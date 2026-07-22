import Link from "next/link";
import { ArrowIcon, ChevronRight } from "./ArrowIcon";

type Variant = "primary" | "white" | "ghost" | "gray";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  arrow?: "corner" | "chevron" | "none";
};

const base =
  "btn-motion group inline-flex items-stretch overflow-hidden text-[11px] font-normal tracking-[0.06em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] sm:text-[12px]";

function classes(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)]";
    case "white":
      return "bg-white text-[var(--foreground)] hover:bg-[#fafafa]";
    case "ghost":
      return "border border-white/70 bg-transparent text-white hover:bg-white/10";
    case "gray":
      return "bg-[var(--surface-2)] text-[var(--foreground)] hover:bg-[#e4e4e4]";
  }
}

function ArrowSlot({
  variant,
  arrow,
}: {
  variant: Variant;
  arrow: "corner" | "chevron" | "none";
}) {
  if (arrow === "none") return null;

  const isPrimary = variant === "primary";
  const isWhite = variant === "white";

  const slotBg = isPrimary
    ? "bg-[var(--brand-arrow)]"
    : isWhite
      ? "bg-[#f0f0f0]"
      : variant === "gray"
        ? "bg-[#ddd]"
        : "bg-white/15";

  const iconColor = isPrimary || variant === "ghost" ? "text-white" : "text-[var(--foreground)]";

  return (
    <span
      className={`btn-arrow flex w-10 shrink-0 items-center justify-center border-l border-black/10 sm:w-11 ${slotBg} ${iconColor}`}
    >
      {arrow === "chevron" ? <ChevronRight /> : <ArrowIcon />}
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  arrow = "corner",
}: Props) {
  const content = (
    <>
      <span className="flex items-center px-4 py-2.5 sm:px-5 sm:py-3">{children}</span>
      <ArrowSlot variant={variant} arrow={arrow} />
    </>
  );

  const cls = `${base} ${classes(variant)} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
