import type { Metadata } from "next";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der MUC Cargohandling GmbH am Flughafen München.",
};

export default function ImpressumPage() {
  return (
    <>
      <PageSection className="!pt-16 md:!pt-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="Rechtliches"
            dark="Impressum"
            description="Angaben gemäß § 5 DDG"
          />

          <div className="section-header-gap space-y-10 text-[15px] leading-relaxed text-[var(--muted)]">
          <section>
            <h2 className="text-[15px] font-normal text-[var(--foreground)]">
              Anbieter
            </h2>
            <p className="mt-3">
              {COMPANY.legalName}
              <br />
              {COMPANY.office.line1}
              <br />
              {COMPANY.postfach}
              <br />
              {COMPANY.office.line2}
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-normal text-[var(--foreground)]">
              Warenannahme
            </h2>
            <p className="mt-3">
              {COMPANY.warehouse.line1}
              <br />
              {COMPANY.warehouse.line2}
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-normal text-[var(--foreground)]">
              Kontakt
            </h2>
            <ul className="mt-3 space-y-1">
              <li>
                Tel:{" "}
                <a href={`tel:${COMPANY.phoneTel}`} className="link-underline text-[var(--foreground)]">
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                Mobil:{" "}
                <a href={`tel:${COMPANY.mobileTel}`} className="link-underline text-[var(--foreground)]">
                  {COMPANY.mobile}
                </a>
              </li>
              <li>
                E-Mail:{" "}
                <a href={`mailto:${COMPANY.email}`} className="link-underline text-[var(--foreground)]">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-normal text-[var(--foreground)]">
              Geschäftsführung
            </h2>
            <p className="mt-3">{COMPANY.managingDirector}</p>
          </section>

          <section>
            <h2 className="text-[15px] font-normal text-[var(--foreground)]">
              Reglementierter Beauftragter
            </h2>
            <p className="mt-3">{COMPANY.regAgent}</p>
          </section>

          <section>
            <h2 className="text-[15px] font-normal text-[var(--foreground)]">
              Haftung für Inhalte
            </h2>
            <p className="mt-3">
              Die Inhalte unserer Website wurden mit größtmöglicher Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten
              Inhalte übernehmen wir jedoch keine Gewähr.
            </p>
            <p className="mt-3">
              Die Haftung für Schäden, die durch die Nutzung der auf dieser Website
              bereitgestellten Informationen entstehen, richtet sich nach den
              gesetzlichen Bestimmungen. Gesetzliche Haftungsansprüche bleiben
              unberührt.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-normal text-[var(--foreground)]">
              Haftung für externe Links
            </h2>
            <p className="mt-3">
              Unsere Website kann Links zu externen Websites Dritter enthalten, auf
              deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
            </p>
            <p className="mt-3">
              Sollten uns Rechtsverletzungen auf verlinkten Websites bekannt werden,
              werden wir entsprechende Links im Rahmen der gesetzlichen Verpflichtungen
              entfernen.
            </p>
          </section>
        </div>
        </div>
      </PageSection>
    </>
  );
}
