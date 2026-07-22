import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ArrowIcon";

export const metadata: Metadata = {
  title: "Kontakt",
};

const CONTACT = [
  {
    icon: PinIcon,
    label: "Adresse",
    content: (
      <>
        Südallee 18/20
        <br />
        85356 München / Flughafen
      </>
    ),
  },
  {
    icon: PhoneIcon,
    label: "Telefon",
    content: (
      <a href="tel:08997594877" className="hover:text-[var(--foreground)]">
        089 – 975 948 77
      </a>
    ),
  },
  {
    icon: MailIcon,
    label: "E-Mail",
    content: (
      <a href="mailto:info@muc-cargohandling.com" className="hover:text-[var(--foreground)]">
        info@muc-cargohandling.com
      </a>
    ),
  },
];

export default function KontaktPage() {
  return (
    <>
      <Hero
        image="/images/kontakt/hero.jpg"
        title="Schreiben Sie uns"
        subtitle="Schildern Sie kurz Ihr Anliegen – wir melden uns zeitnah mit den nächsten Schritten für Ihre Luftfracht am Flughafen München."
        ctaHref="#anfrage"
      />

      <PageSection id="anfrage">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">
          <div>
            <SectionHeader
              dark="Anfrage stellen"
              description="Strukturiert, schnell und ohne Umwege. Teilen Sie uns Ihr Anliegen mit – wir melden uns persönlich bei Ihnen."
            />
            <ContactForm />
          </div>

          <aside className="lg:pt-2">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[var(--surface)] p-6 md:p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted-light)]">
                  Direktkontakt
                </p>
                <ul className="mt-6 space-y-6">
                  {CONTACT.map((item) => (
                    <li key={item.label} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--muted)]">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--muted-light)]">
                          {item.label}
                        </p>
                        <p className="mt-1 text-[14px] text-[var(--muted)]">{item.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-[var(--border)] bg-white p-6 md:p-8">
                <p className="text-[12px] font-medium text-[var(--foreground)]">
                  Reglementierter Beauftragter
                </p>
                <p className="mt-1 text-[13px] text-[var(--muted)]">DE/RA/01278-01</p>
                <p className="prose-muted mt-4 text-[13px]">
                  Mo–Fr, Reaktionszeit in der Regel innerhalb von 24 Stunden.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </PageSection>

      <PageSection muted id="datenschutz" borderTop>
        <SectionHeader
          dark="Datenschutz"
          description="Ihre Angaben werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben. Nach Abschluss der Kommunikation werden die Daten gemäß den gesetzlichen Aufbewahrungsfristen gelöscht."
        />
      </PageSection>

      <FooterCta title="Wir freuen uns auf Ihre Anfrage." />
    </>
  );
}
