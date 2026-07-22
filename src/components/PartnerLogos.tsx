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
    <div className="bg-[var(--surface)] p-6 md:p-10">
      <p className="text-[11px] font-normal uppercase tracking-[0.1em] text-[var(--muted-light)]">
        {title}
      </p>
      {description && (
        <p className="prose-muted mt-3 max-w-md text-[14px]">{description}</p>
      )}
      <div className="mt-8 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-10">
        <BrandLogo className="h-10 w-auto" width={180} height={50} />
        <span className="hidden h-10 w-px bg-[var(--border)] sm:block" aria-hidden />
        <div className="relative h-12 w-[200px] shrink-0">
          <Image
            src={media.partnerVk}
            alt="VK Freight Management"
            fill
            className="object-contain object-center"
            sizes="200px"
          />
        </div>
      </div>
    </div>
  );
}
