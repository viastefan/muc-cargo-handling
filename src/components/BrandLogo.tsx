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

/** Echte Maße von public/images/shared/logo.png (1400×940, freigestellt) */
const LOGO_WIDTH = 1400;
const LOGO_HEIGHT = 940;

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
      alt="MUC Cargohandling"
      width={width}
      height={height}
      priority={priority}
      className={`brand-logo ${className} ${inverted ? "brand-logo-inverted" : ""}`.trim()}
    />
  );
}
