import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { BrandLogo } from "./BrandLogo";
import { ScrollReveal } from "./ScrollReveal";
import { COMPANY, FOOTER_NAV } from "@/lib/company";
import { media } from "@/lib/media";

const FOOTER_CTA_DEFAULT_DESCRIPTION =
  "Von Import bis Export übernehmen wir die zuverlässige Abwicklung Ihrer Luftfrachtsendungen – mit klaren Prozessen, erfahrenem Handling und direkter Koordination am Flughafen München.";

function FooterHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`footer-heading ${className}`.trim()}>{children}</p>
  );
}

export function FooterCta({
  title = "Effizientes Cargo Handling für internationale Luftfrachtprozesse.",
  description = FOOTER_CTA_DEFAULT_DESCRIPTION,
  ctaLabel = "Schreiben Sie uns",
  ctaHref = "/kontakt",
}: {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="footer-cta" aria-labelledby="footer-cta-heading">
      <div className="footer-cta__layout">
        <ScrollReveal className="footer-cta__copy" duration={1150}>
          <h2
            id="footer-cta-heading"
            className="footer-cta__title heading-display text-white"
          >
            {title}
          </h2>
          <p className="footer-cta__description">{description}</p>
          <div className="footer-cta__action">
            <Button href={ctaHref} variant="white" size="hero">
              {ctaLabel}
            </Button>
          </div>
        </ScrollReveal>

        <div className="footer-cta__visual" aria-hidden="true">
          <Image
            src={media.weltkugel}
            alt=""
            fill
            className="footer-cta__globe"
            sizes="(max-width: 768px) 90vw, 50vw"
            quality={90}
            unoptimized
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className = "footer-link";
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="page-container site-footer-main">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-logo-link">
            <BrandLogo
              inverted
              priority={false}
              width={220}
              height={64}
              className="site-footer-logo"
            />
          </Link>
          <p className="site-footer-tagline">
            Luftfrachtabwicklung am Flughafen München — seit 2003.
          </p>
        </div>

        <div className="site-footer-col">
          <FooterHeading>Seiten</FooterHeading>
          <ul className="site-footer-links">
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer-col">
          <FooterHeading>Kontakt</FooterHeading>
          <ul className="site-footer-contact">
            <li>
              <a href={`mailto:${COMPANY.email}`} className="footer-link">
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a href={`tel:${COMPANY.phoneTel}`} className="footer-link">
                Tel: {COMPANY.phone}
              </a>
            </li>
          </ul>

          <FooterHeading className="mt-8">Standort</FooterHeading>
          <address className="site-footer-address">
            <p>{COMPANY.legalName}</p>
            <p>{COMPANY.office.line1.replace("Büroadresse: ", "")}</p>
            <p>{COMPANY.office.line2}</p>
            <p className="site-footer-meta">Reg.B. {COMPANY.regAgent}</p>
          </address>
        </div>
      </div>

      <div className="site-footer-bar">
        <div className="page-container site-footer-bar-inner">
          <p className="site-footer-copy">
            © {year} {COMPANY.legalName}
          </p>
          <nav className="site-footer-legal" aria-label="Rechtliches">
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/impressum">Impressum</FooterLink>
            <FooterLink href="/datenschutz">Datenschutz</FooterLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
