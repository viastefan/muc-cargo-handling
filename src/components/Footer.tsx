import Link from "next/link";
import { Button } from "./Button";
import { BrandLogo } from "./BrandLogo";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./SocialIcons";
import {
  COMPANY,
  FOOTER_MENU,
  FOOTER_QUICK,
  FOOTER_SERVICES,
} from "@/lib/company";

function FooterHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-[11px] font-medium uppercase tracking-[0.12em] text-white/45 ${className}`}>
      {children}
    </p>
  );
}

export function FooterCta({
  title = "Effizientes Cargo Handling für internationale Luftfrachtprozesse.",
}: {
  title?: string;
}) {
  return (
    <section className="bg-[var(--brand)]">
      <div className="page-container flex flex-col gap-8 py-16 md:py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <h2 className="heading-display max-w-3xl text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.2] text-white">
          {title}
        </h2>
        <Button href="/kontakt" variant="white" className="shrink-0 self-start">
          Anfrage stellen
        </Button>
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
  const social = [
    { href: COMPANY.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: COMPANY.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: COMPANY.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  ];

  return (
    <footer className="site-footer">
      <div className="page-container site-footer-main">
        <div className="site-footer-brand">
          <Link href="/" className="inline-block transition-opacity hover:opacity-80">
            <BrandLogo className="h-10 w-auto brightness-0 invert sm:h-11" />
          </Link>
          <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-white/55">
            Professionelle Luftfrachtabwicklung am Flughafen München – seit 2003.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {social.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer-social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-white/45">
            In partnership with{" "}
            <a
              href={COMPANY.partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-inline"
            >
              {COMPANY.partner.label}
            </a>
          </p>
        </div>

        <div>
          <FooterHeading>Impressum</FooterHeading>
          <address className="mt-4 space-y-1 text-[13px] not-italic leading-relaxed text-white/65">
            <p className="text-white/85">{COMPANY.legalName}</p>
            <p>{COMPANY.lager.line1}</p>
            <p>{COMPANY.lager.line2}</p>
            <p>{COMPANY.lager.line3}</p>
            <p className="pt-2">{COMPANY.office.line1}</p>
            <p>{COMPANY.office.line2}</p>
            <p className="pt-2 text-white/50">Reg.B. {COMPANY.regAgent}</p>
          </address>
        </div>

        <div>
          <FooterHeading>Kontakt</FooterHeading>
          <ul className="mt-4 space-y-2.5 text-[13px] text-white/65">
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
            <li>
              <span>Fax: {COMPANY.fax}</span>
            </li>
            <li>
              <a href={`tel:${COMPANY.mobileTel}`} className="footer-link">
                Mobil: {COMPANY.mobile}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <FooterHeading>Menü</FooterHeading>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_MENU.map((item) => (
              <li key={item.label}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
          <FooterHeading className="mt-8">Leistungen</FooterHeading>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_SERVICES.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:text-right">
          <FooterHeading>Mehr entdecken</FooterHeading>
          <ul className="mt-4 space-y-2.5 lg:items-end lg:text-right">
            {FOOTER_QUICK.map((item) => (
              <li key={item.label}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer-bar">
        <div className="page-container site-footer-bar-inner">
          <p className="text-[12px] text-white/40">
            © {year} {COMPANY.legalName}
          </p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Footer">
            <FooterLink href="/kontakt">Kontakt</FooterLink>
            <FooterLink href="/kontakt">Standort</FooterLink>
            <FooterLink href="/">Start</FooterLink>
            <FooterLink href="/datenschutz">Datenschutz</FooterLink>
            <FooterLink href="/impressum">Impressum</FooterLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
