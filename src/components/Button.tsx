import Link from "next/link";
import { ButtonArrowIcon } from "./ButtonArrowIcon";

type Variant = "primary" | "white" | "ghost" | "gray";
type Size = "md" | "sm" | "hero";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  arrow?: boolean;
  fullWidth?: boolean;
};

const base =
  "btn-motion group inline-flex w-fit max-w-full items-stretch overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]";

function textClasses(size: Size) {
  if (size === "hero") {
    return "btn-hero text-[12px] font-medium tracking-[0.01em] normal-case";
  }
  return "text-[12px] font-normal uppercase tracking-[0.05em]";
}

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
  if (size === "hero") return "btn-label flex items-center";
  return size === "sm"
    ? "flex min-h-[44px] items-center px-4 py-2.5"
    : "flex min-h-[44px] items-center px-5 py-3.5";
}

function arrowSlotClass(size: Size) {
  const width = size === "sm" ? "w-10" : size === "md" ? "w-11" : "";
  return `btn-arrow relative ${width} shrink-0 self-stretch border-l border-black/10`.trim();
}

function ArrowSlot({
  variant,
  size,
}: {
  variant: Variant;
  size: Size;
}) {
  const isPrimary = variant === "primary";
  const isWhite = variant === "white";

  const slotBg = isPrimary
    ? "bg-[var(--brand-arrow)]"
    : isWhite
      ? "bg-[#ececec]"
      : variant === "gray"
        ? "bg-[#ddd]"
        : "bg-white/15";

  const iconLight = isPrimary || variant === "ghost";

  return (
    <span className={`${arrowSlotClass(size)} ${slotBg}`}>
      <ButtonArrowIcon light={iconLight} />
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
  arrow = true,
  fullWidth = false,
}: Props) {
  const content = (
    <>
      <span className={`${labelPad(size)}`}>{children}</span>
      {arrow && <ArrowSlot variant={variant} size={size} />}
    </>
  );

  const cls = `${base} ${textClasses(size)} ${classes(variant)} ${fullWidth ? "w-full" : ""} ${className}`;

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
