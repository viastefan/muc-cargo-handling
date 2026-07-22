import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { AGB_INTRO, getAgbSections } from "@/lib/legal";

export const metadata: Metadata = {
  title: "AGB",
  description:
    "Allgemeine Geschäftsbedingungen der MUC Cargohandling GmbH für Handling-Leistungen und die Nutzung dieser Website.",
};

export default function AgbPage() {
  return (
    <LegalDocument
      title="Allgemeine Geschäftsbedingungen"
      description="Vertragsbedingungen für Leistungen der MUC Cargohandling GmbH und die Nutzung dieser Website."
      intro={AGB_INTRO}
      sections={getAgbSections()}
    />
  );
}
