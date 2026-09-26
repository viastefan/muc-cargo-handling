import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LocationMap } from "@/components/LocationMap";
import { MetricRow } from "@/components/MetricRow";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ArrowIcon";
import {
  BreadcrumbStructuredData,
  ContactPageStructuredData,
} from "@/components/StructuredData";
import { COMPANY, MAPS_EMBED } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

const DESCRIPTION =
  "Kontakt zu MUC Cargohandling – Anfrage stellen, Adresse und Telefon am Flughafen München.";

export const metadata: Metadata = pageMeta({
  path: "/kontakt",
  title: "Kontakt",
  description: DESCRIPTION,
});

const CONTACT = [
  {
    icon: PinIcon,
    label: "Adresse",
    content: (
      <>
        {COMPANY.office.line1}
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
        {COMPANY.hours.display}
        <br />
        {COMPANY.hours.note}
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
      <BreadcrumbStructuredData
        items={[
          { name: "Startseite", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ]}
      />
      <ContactPageStructuredData />
      <Hero
        image="/images/kontakt/hero.jpg"
        images={[
          "/images/kontakt/hero.jpg",
          "/images/unternehmen/hero.jpg",
          "/images/home/team-band.jpg",
        ]}
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
              <div className="surface-card p-6 md:p-8">
                <p className="text-[17px] font-normal tracking-[-0.01em] text-[var(--foreground)]">
                  Direktkontakt
                </p>
                <ul className="mt-6 space-y-6">
                  {CONTACT.map((item) => (
                    <li key={item.label} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted)]">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[13px] font-normal text-[var(--muted)]">
                          {item.label}
                        </p>
                        <p className="mt-1 text-[14px] leading-relaxed text-[var(--muted)]">{item.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="prose-muted mt-6 border-t border-[var(--border)] pt-6 text-[13px]">
                  <strong className="font-medium text-[var(--foreground)]">
                    Warehouse (Warenannahme)
                  </strong>
                  <br />
                  {COMPANY.warehouse.line1}
                  <br />
                  {COMPANY.warehouse.line2}
                </p>
              </div>

              <div className="surface-card surface-card--raised p-6 md:p-8">
                <p className="text-[17px] font-normal tracking-[-0.01em] text-[var(--foreground)]">
                  Zertifizierung
                </p>
                <p className="mt-3 text-[15px] text-[var(--foreground)]">
                  Reglementierter Beauftragter
                </p>
                <p className="mt-1 text-[13px] text-[var(--muted)]">{COMPANY.regAgent}</p>
                <p className="prose-muted mt-4 text-[13px]">
                  Reaktionszeit auf Anfragen in der Regel innerhalb von 24 Stunden (Werktage).
                </p>
              </div>

              <MetricRow
                items={[
                  { value: "< 24h", label: "Rückmeldung auf Anfragen" },
                  { value: "MUC", label: "Direkt am Flughafen" },
                  { value: "DE/RA", label: "Zugelassener reglementierter Beauftragter" },
                ]}
              />
            </div>
          </aside>
        </div>
      </PageSection>

      <PageSection muted borderTop compact id="standort-karte">
        <SectionHeader
          eyebrow="Standort"
          dark="So finden Sie uns"
          light="am Flughafen München"
          breakTitle={false}
          description="Kurze Wege zum Cargo-Drehkreuz – Büro und Warenannahme im Frachtzentrum."
          descriptionClassName="max-w-xl"
        />
        <div className="section-header-gap">
          <LocationMap embedSrc={MAPS_EMBED} />
        </div>
      </PageSection>

      <FooterCta title="Wir freuen uns auf Ihre Anfrage." />
    </>
  );
}
