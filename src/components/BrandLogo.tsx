"use client";

import Image from "next/image";
import { useState } from "react";
import { media } from "@/lib/media";

type Props = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  /** White logo treatment for dark backgrounds (e.g. footer) */
  inverted?: boolean;
};

export function BrandLogo({
  className = "h-9 w-auto sm:h-10",
  width = 200,
  height = 56,
  priority = false,
  inverted = false,
}: Props) {
  const [src, setSrc] = useState<string>(media.logo);

  return (
    <Image
      src={src}
      alt="MUC Cargo Handling"
      width={width}
      height={height}
      priority={priority}
      className={`${className} ${inverted ? "brand-logo-inverted" : ""}`.trim()}
      onError={() => {
        if (src !== media.logoFallback) setSrc(media.logoFallback);
      }}
    />
  );
}
