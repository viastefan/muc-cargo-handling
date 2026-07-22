import type { Metadata } from "next";
import { PageSection, SectionHeader } from "@/components/PageSection";
import { FooterCta } from "@/components/Footer";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der MUC Cargohandling GmbH.",
};

const SECTIONS = [
  {
    title: "1. Verantwortlicher",
    body: (
      <>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist die{" "}
        {COMPANY.legalName}, {COMPANY.office.line1.replace("Büroadresse: ", "")},{" "}
        {COMPANY.office.line2}. Kontakt:{" "}
        <a href={`mailto:${COMPANY.email}`} className="link-underline">
          {COMPANY.email}
        </a>
        , Tel.{" "}
        <a href={`tel:${COMPANY.phoneTel}`} className="link-underline">
          {COMPANY.phone}
        </a>
        .
      </>
    ),
  },
  {
    title: "2. Erhebung und Speicherung personenbezogener Daten",
    body: "Beim Besuch unserer Website werden technisch notwendige Daten (z. B. IP-Adresse, Browsertyp, Zeitpunkt des Zugriffs) in Server-Logfiles verarbeitet, um die Stabilität und Sicherheit des Angebots zu gewährleisten.",
  },
  {
    title: "3. Kontaktformular",
    body: "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
  },
  {
    title: "4. Zweck und Rechtsgrundlage",
    body: "Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage und zur Kommunikation mit Ihnen auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).",
  },
  {
    title: "5. Speicherdauer",
    body: "Ihre Daten werden gelöscht, sobald sie für die Erreichung des Zwecks der Erhebung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
  },
  {
    title: "6. Ihre Rechte",
    body: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Zudem steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu.",
  },
  {
    title: "7. Externe Dienste",
    body: "Sofern Schriftarten oder Symbole von externen Anbietern (z. B. Google Fonts) geladen werden, kann dabei eine Verbindung zu Servern des Anbieters hergestellt werden. Weitere Informationen entnehmen Sie den Datenschutzhinweisen des jeweiligen Anbieters.",
  },
];

export default function DatenschutzPage() {
  return (
    <>
      <PageSection className="!pt-16 md:!pt-20">
        <SectionHeader
          eyebrow="Rechtliches"
          dark="Datenschutzerklärung"
          description="Informationen zur Verarbeitung personenbezogener Daten auf dieser Website."
        />

        <div className="section-header-gap max-w-3xl divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {SECTIONS.map((section) => (
            <section key={section.title} className="py-7 md:py-8">
              <h2 className="text-[15px] font-normal text-[var(--foreground)]">
                {section.title}
              </h2>
              <p className="prose-muted mt-3 text-[14px] leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
      </PageSection>

      <FooterCta title="Datenschutzfragen? Kontaktieren Sie uns direkt." />
    </>
  );
}
