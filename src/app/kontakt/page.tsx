import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MetricRow } from "@/components/MetricRow";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ArrowIcon";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt zu MUC Cargo Handling – Anfrage stellen, Adresse und Telefon am Flughafen München.",
};

const CONTACT = [
  {
    icon: PinIcon,
    label: "Adresse",
    content: (
      <>
        {COMPANY.office.line1.replace("Büroadresse: ", "")}
        <br />
        {COMPANY.office.line2}
      </>
    ),
  },
  {
    icon: PhoneIcon,
    label: "Telefon",
    content: (
      <a href={`tel:${COMPANY.phoneTel}`} className="hover:text-[var(--foreground)]">
        {COMPANY.phone}
      </a>
    ),
  },
  {
    icon: MailIcon,
    label: "E-Mail",
    content: (
      <a href={`mailto:${COMPANY.email}`} className="hover:text-[var(--foreground)]">
        {COMPANY.email}
      </a>
    ),
  },
  {
    icon: ClockIcon,
    label: "Erreichbarkeit",
    content: (
      <>
        Mo–Fr, Bürozeiten
        <br />
        Mobil:{" "}
        <a href={`tel:${COMPANY.mobileTel}`} className="hover:text-[var(--foreground)]">
          {COMPANY.mobile}
        </a>
      </>
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
              eyebrow="Kontakt"
              dark="Anfrage stellen"
              description="Strukturiert, schnell und ohne Umwege. Teilen Sie uns Ihr Anliegen mit – wir melden uns persönlich bei Ihnen."
            />
            <ContactForm />
          </div>

          <aside className="lg:pt-2" id="standort">
            <div className="sticky top-24 space-y-4">
              <div className="border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted-light)]">
                  Direktkontakt
                </p>
                <ul className="mt-6 space-y-6">
                  {CONTACT.map((item) => (
                    <li key={item.label} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--muted)]">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--muted-light)]">
                          {item.label}
                        </p>
                        <p className="mt-1 text-[14px] leading-relaxed text-[var(--muted)]">{item.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="prose-muted mt-6 border-t border-[var(--border)] pt-6 text-[13px]">
                  Lager: {COMPANY.lager.line1.replace("Lager: ", "")}
                </p>
              </div>

              <div className="border border-[var(--border)] bg-white p-6 md:p-8">
                <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--muted-light)]">
                  Zertifizierung
                </p>
                <p className="mt-3 text-[15px] text-[var(--foreground)]">
                  Reglementierter Beauftragter
                </p>
                <p className="mt-1 text-[13px] text-[var(--muted)]">Reg.B. {COMPANY.regAgent}</p>
                <p className="prose-muted mt-4 text-[13px]">
                  Reaktionszeit auf Anfragen in der Regel innerhalb von 24 Stunden (Werktage).
                </p>
              </div>

              <MetricRow
                items={[
                  { value: "< 24h", label: "Rückmeldung auf Anfragen" },
                  { value: "MUC", label: "Direkt am Flughafen" },
                  { value: "DE/RA", label: "Zugelassene Sicherheit" },
                ]}
              />
            </div>
          </aside>
        </div>
      </PageSection>

      <FooterCta title="Wir freuen uns auf Ihre Anfrage." />
    </>
  );
}
