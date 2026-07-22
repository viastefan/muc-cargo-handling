import Link from "next/link";
import { Button } from "./Button";

export function FooterCta({
  title = "Effizientes Cargo Handling für internationale Luftfrachtprozesse.",
}: {
  title?: string;
}) {
  return (
    <section className="bg-[var(--brand)]">
      <div className="page-container flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <h2 className="heading-display max-w-3xl text-[clamp(1.5rem,4vw,2.375rem)] text-white">
          {title}
        </h2>
        <Button href="/kontakt" variant="white" className="shrink-0 self-start">
          Anfrage stellen
        </Button>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="page-container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-[15px] font-normal tracking-[-0.01em]">MUC Cargo Handling</p>
          <p className="prose-muted mt-3 max-w-xs text-[13px]">
            Professionelle Luftfrachtabwicklung am Flughafen München – seit 2003.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted-light)]">
            Navigation
          </p>
          <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--muted)]">
            <li><Link href="/unternehmen" className="hover:text-[var(--foreground)]">Unternehmen</Link></li>
            <li><Link href="/luftfracht" className="hover:text-[var(--foreground)]">Luftfracht Import Export</Link></li>
            <li><Link href="/airline-handling" className="hover:text-[var(--foreground)]">Airline Handling</Link></li>
            <li><Link href="/roentgen" className="hover:text-[var(--foreground)]">Röntgen</Link></li>
            <li><Link href="/kontakt" className="hover:text-[var(--foreground)]">Kontakt</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted-light)]">
            Kontakt
          </p>
          <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--muted)]">
            <li>Südallee 18/20</li>
            <li>85356 München / Flughafen</li>
            <li>
              <a href="tel:08997594877" className="hover:text-[var(--foreground)]">
                Tel: 089 – 975 948 77
              </a>
            </li>
            <li>
              <a href="mailto:info@muc-cargohandling.com" className="hover:text-[var(--foreground)]">
                info@muc-cargohandling.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="page-container flex flex-col gap-2 py-5 text-[12px] text-[var(--muted-light)] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} MUC Cargo Handling GmbH</p>
          <p>Reglementierter Beauftragter · DE/RA/01278-01</p>
        </div>
      </div>
    </footer>
  );
}
