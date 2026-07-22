import Link from "next/link";
import { ArrowIcon, ChevronRight } from "./ArrowIcon";

type Variant = "primary" | "white" | "ghost" | "gray";
type Size = "md" | "sm";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  arrow?: "corner" | "chevron" | "none";
  fullWidth?: boolean;
};

const base =
  "btn-motion group inline-flex w-fit max-w-full items-stretch overflow-hidden text-[12px] font-normal tracking-[0.05em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]";

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

function labelPad(size: Size) {
  return size === "sm" ? "px-4 py-2.5" : "px-5 py-3.5";
}

function arrowWidth(size: Size) {
  return size === "sm" ? "w-10" : "w-11";
}

function ArrowSlot({
  variant,
  arrow,
  size,
}: {
  variant: Variant;
  arrow: "corner" | "chevron" | "none";
  size: Size;
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
      className={`btn-arrow flex ${arrowWidth(size)} shrink-0 items-center justify-center self-stretch border-l border-black/10 ${slotBg} ${iconColor}`}
    >
      {arrow === "chevron" ? <ChevronRight /> : <ArrowIcon />}
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  onClick,
  arrow = "corner",
  fullWidth = false,
}: Props) {
  const content = (
    <>
      <span className={`flex min-h-[44px] items-center ${labelPad(size)}`}>{children}</span>
      <ArrowSlot variant={variant} arrow={arrow} size={size} />
    </>
  );

  const cls = `${base} ${classes(variant)} ${fullWidth ? "w-full" : ""} ${className}`;

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
