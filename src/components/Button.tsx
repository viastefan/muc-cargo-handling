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
  download?: boolean | string;
  disabled?: boolean;
  "aria-busy"?: boolean;
};

function iconLight(variant: Variant) {
  return variant === "primary" || variant === "ghost";
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
  download,
  disabled = false,
  "aria-busy": ariaBusy,
}: Props) {
  const content = (
    <>
      {arrow && (
        <span className="btn-corner-icon" aria-hidden="true">
          <ButtonArrowIcon light={iconLight(variant)} />
        </span>
      )}
      <span className="btn-corner-label">{children}</span>
    </>
  );

  const cls = [
    "btn-motion",
    "btn-corner",
    `btn-corner--${variant}`,
    `btn-corner--${size}`,
    fullWidth ? "btn-corner--full" : "",
    disabled ? "is-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick} download={download} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled} aria-busy={ariaBusy}>
      {content}
    </button>
  );
}
