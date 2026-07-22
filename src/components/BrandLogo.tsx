"use client";

import Image from "next/image";
import { useState } from "react";
import { media } from "@/lib/media";

type Props = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function BrandLogo({
  className = "h-9 w-auto sm:h-10",
  width = 200,
  height = 56,
  priority = false,
}: Props) {
  const [src, setSrc] = useState<string>(media.logo);

  return (
    <Image
      src={src}
      alt="MUC Cargo Handling"
      width={width}
      height={height}
      priority={priority}
      className={className}
      onError={() => {
        if (src !== media.logoFallback) setSrc(media.logoFallback);
      }}
    />
  );
}
