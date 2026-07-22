import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { DATENSCHUTZ_INTRO, getDatenschutzSections } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung der MUC Cargohandling GmbH – Informationen zur Verarbeitung personenbezogener Daten.",
};

export default function DatenschutzPage() {
  return (
    <LegalDocument
      title="Datenschutzerklärung"
      description="Informationen zur Verarbeitung personenbezogener Daten auf dieser Website."
      intro={DATENSCHUTZ_INTRO}
      sections={getDatenschutzSections()}
    />
  );
}
