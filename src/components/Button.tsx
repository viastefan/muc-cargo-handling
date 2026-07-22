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
  "inline-flex items-stretch overflow-hidden text-[13px] font-semibold tracking-[0.04em] uppercase transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]";

function classes(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-[var(--brand)] text-white";
    case "white":
      return "bg-white text-[var(--foreground)]";
    case "ghost":
      return "bg-transparent text-white border border-white/70";
    case "gray":
      return "bg-[var(--surface-2)] text-[var(--foreground)]";
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
      className={`flex w-11 shrink-0 items-center justify-center border-l ${
        isPrimary ? "border-black/10" : "border-black/10"
      } ${slotBg} ${iconColor}`}
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
      <span className="flex items-center px-5 py-3.5">{children}</span>
      <ArrowSlot variant={variant} arrow={arrow} />
    </>
  );

  const cls = `${base} ${classes(variant)} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
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
