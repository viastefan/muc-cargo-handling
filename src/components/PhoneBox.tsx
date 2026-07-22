import { PhoneIcon } from "./ArrowIcon";
import { COMPANY } from "@/lib/company";

export function PhoneBox({
  phone = COMPANY.phoneDisplay,
  phoneTel = COMPANY.phoneTel,
  className = "",
  variant = "default",
}: {
  phone?: string;
  phoneTel?: string;
  className?: string;
  variant?: "default" | "hero";
}) {
  const isHero = variant === "hero";

  return (
    <a
      href={`tel:${phoneTel.replace(/\s/g, "")}`}
      className={`phone-box btn-motion ${isHero ? "phone-box-hero" : "phone-box-default"} ${className}`}
    >
      <span className="phone-box-icon" aria-hidden="true">
        <PhoneIcon />
      </span>
      <span className="phone-box-copy">
        <span className="phone-box-label">Haben Sie Fragen?</span>
        <span className="phone-box-number">Tel: {phone}</span>
      </span>
    </a>
  );
}
