import Image from "next/image";
import { media } from "@/lib/media";

type Props = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

/** Echte Maße von public/images/shared/logo-red.png (1000×511, freigestellt) */
const LOGO_WIDTH = 1000;
const LOGO_HEIGHT = 511;

export function BrandLogo({
  className = "h-10 w-auto sm:h-11",
  width = LOGO_WIDTH,
  height = LOGO_HEIGHT,
  priority = false,
}: Props) {
  return (
    <Image
      src={media.logo}
      alt="MUC Cargohandling"
      width={width}
      height={height}
      priority={priority}
      className={`brand-logo ${className}`.trim()}
    />
  );
}
