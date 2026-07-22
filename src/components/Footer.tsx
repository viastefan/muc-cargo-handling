import Link from "next/link";
import { Button } from "./Button";

export function FooterCta({
  title = "Effizientes Cargo Handling für internationale Luftfrachtprozesse.",
}: {
  title?: string;
}) {
  return (
    <section className="bg-[var(--brand)]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
        <h2 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[42px]">
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
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-bold tracking-wide">MUC Cargo Handling</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
            Professionelle Luftfrachtabwicklung am Flughafen München – seit 2003.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted-light)]">
            Navigation
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/unternehmen" className="hover:text-[var(--brand)]">Unternehmen</Link></li>
            <li><Link href="/luftfracht" className="hover:text-[var(--brand)]">Luftfracht Import Export</Link></li>
            <li><Link href="/airline-handling" className="hover:text-[var(--brand)]">Airline Handling</Link></li>
            <li><Link href="/roentgen" className="hover:text-[var(--brand)]">Röntgen</Link></li>
            <li><Link href="/kontakt" className="hover:text-[var(--brand)]">Kontakt</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted-light)]">
            Kontakt
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <li>Südallee 18/20</li>
            <li>85356 München / Flughafen</li>
            <li>
              <a href="tel:08997594877" className="hover:text-[var(--brand)]">
                Tel: 089 – 975 948 77
              </a>
            </li>
            <li>
              <a href="mailto:info@muc-cargohandling.com" className="hover:text-[var(--brand)]">
                info@muc-cargohandling.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-5 text-xs text-[var(--muted-light)] sm:flex-row sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} MUC Cargo Handling GmbH</p>
          <p>Reglementierter Beauftragter · DE/RA/01278-01</p>
        </div>
      </div>
    </footer>
  );
}
