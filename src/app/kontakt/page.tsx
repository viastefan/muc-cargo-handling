import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default function KontaktPage() {
  return (
    <>
      <Hero
        image="/images/unternehmen/hero.jpg"
        title="Schreiben Sie uns"
        subtitle="Schildern Sie kurz Ihr Anliegen – wir melden uns zeitnah mit den nächsten Schritten für Ihre Luftfracht am Flughafen München."
        showPhone
        ctaLabel="Zur Anfrage"
        ctaHref="#anfrage"
        compact
      />

      <section id="anfrage" className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Anfrage stellen</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--muted)]">
              Nutzen Sie das Formular für Import-/Export-Handling, Airline-
              Services oder Sicherheitskontrollen. Pflichtfelder sind markiert.
            </p>
            <ContactForm />
          </div>

          <aside className="h-fit bg-[var(--surface)] p-8">
            <h3 className="text-xl font-bold">Direktkontakt</h3>
            <ul className="mt-5 space-y-3 text-sm text-[var(--muted)]">
              <li>
                <strong className="text-[var(--foreground)]">Adresse</strong>
                <br />
                Südallee 18/20
                <br />
                85356 München / Flughafen
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Telefon</strong>
                <br />
                <a href="tel:08997594877" className="hover:text-[var(--brand)]">
                  089 – 975 948 77
                </a>
              </li>
              <li>
                <strong className="text-[var(--foreground)]">E-Mail</strong>
                <br />
                <a href="mailto:info@muc-cargohandling.com" className="hover:text-[var(--brand)]">
                  info@muc-cargohandling.com
                </a>
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Zulassung</strong>
                <br />
                Reglementierter Beauftragter DE/RA/01278-01
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <FooterCta title="Wir freuen uns auf Ihre Anfrage." />
    </>
  );
}
