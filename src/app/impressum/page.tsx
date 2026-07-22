import type { Metadata } from "next";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { FooterCta } from "@/components/Footer";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der MUC Cargohandling GmbH am Flughafen München.",
};

export default function ImpressumPage() {
  return (
    <>
      <PageSection className="!pt-16 md:!pt-20">
        <SectionHeader
          eyebrow="Rechtliches"
          dark="Impressum"
          description="Angaben gemäß § 5 TMG"
        />

        <div className="section-header-gap max-w-3xl space-y-10 text-[15px] leading-relaxed text-[var(--muted)]">
          <section>
            <h2 className="text-[15px] font-normal text-[var(--foreground)]">
              Anbieter
            </h2>
            <p className="mt-3">
              {COMPANY.legalName}
              <br />
              {COMPANY.office.line1.replace("Büroadresse: ", "")}
              <br />
              {COMPANY.office.line2}
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-normal text-[var(--foreground)]">
              Lager & Postanschrift
            </h2>
            <p className="mt-3">
              {COMPANY.lager.line1}
              <br />
              {COMPANY.lager.line2}
              <br />
              {COMPANY.lager.line3}
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
              <li>Fax: {COMPANY.fax}</li>
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
            <p className="mt-3">Reg.B. {COMPANY.regAgent}</p>
          </section>

          <section>
            <h2 className="text-[15px] font-normal text-[var(--foreground)]">
              Haftung für Inhalte
            </h2>
            <p className="mt-3">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
              diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
              TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
              forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>
        </div>
      </PageSection>

      <FooterCta title="Fragen? Wir sind für Sie erreichbar." />
    </>
  );
}
