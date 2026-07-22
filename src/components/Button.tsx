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
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick} download={download}>
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
