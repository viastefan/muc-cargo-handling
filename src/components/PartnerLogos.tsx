import Image from "next/image";
import { BrandLogo } from "@/components/BrandLogo";
import { media } from "@/lib/media";

export function PartnerLogos({
  title = "Unsere Partner",
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <aside className="partner-logos" aria-label={title}>
      <p className="partner-logos__eyebrow">{title}</p>
      {description ? <p className="partner-logos__description">{description}</p> : null}
      <div className="partner-logos__row">
        <BrandLogo className="partner-logos__brand h-9 w-auto sm:h-10" width={180} height={50} />
        <span className="partner-logos__divider" aria-hidden="true" />
        <Image
          src={media.partnerVkFreight}
          alt="VK Freight Management"
          width={820}
          height={428}
          className="partner-logos__vk-logo"
        />
      </div>
    </aside>
  );
}
