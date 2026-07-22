import Image from "next/image";
import { media } from "@/lib/media";

type Props = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  /** White logo treatment for dark backgrounds (e.g. footer) */
  inverted?: boolean;
};

/** Intrinsic ratio of public/images/shared/logo.png (~1.48) */
const LOGO_WIDTH = 178;
const LOGO_HEIGHT = 120;

export function BrandLogo({
  className = "h-10 w-auto sm:h-11",
  width = LOGO_WIDTH,
  height = LOGO_HEIGHT,
  priority = false,
  inverted = false,
}: Props) {
  return (
    <Image
      src={media.logo}
      alt="MUC Cargo Handling"
      width={width}
      height={height}
      priority={priority}
      className={`${className} ${inverted ? "brand-logo-inverted" : ""}`.trim()}
    />
  );
}
