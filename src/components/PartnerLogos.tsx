"use client";

import Image from "next/image";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { media } from "@/lib/media";

export function PartnerLogos({
  title = "Unsere Partner",
  description,
}: {
  title?: string;
  description?: string;
}) {
  const [vkError, setVkError] = useState(false);

  return (
    <aside className="partner-logos" aria-label={title}>
      <p className="partner-logos__eyebrow">{title}</p>
      {description ? <p className="partner-logos__description">{description}</p> : null}
      <div className="partner-logos__row">
        <BrandLogo className="partner-logos__brand h-9 w-auto sm:h-10" width={180} height={50} />
        <span className="partner-logos__divider" aria-hidden="true" />
        {vkError ? (
          <p className="partner-logos__vk-fallback">VK Freight Management</p>
        ) : (
          <div className="partner-logos__vk">
            <Image
              src={media.partnerVk}
              alt="VK Freight Management"
              fill
              className="object-contain object-left"
              sizes="(max-width: 640px) 45vw, 200px"
              onError={() => setVkError(true)}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
