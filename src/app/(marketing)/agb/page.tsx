import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { AGB_INTRO, getAgbSections } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/agb",
  title: "AGB",
  description:
    "Allgemeine Geschäftsbedingungen der MUC Cargohandling GmbH für Handling-Leistungen und die Nutzung dieser Website.",
});

export default function AgbPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Startseite", path: "/" },
          { name: "AGB", path: "/agb" },
        ]}
      />
      <LegalDocument
        title="Allgemeine Geschäftsbedingungen"
        description="Vertragsbedingungen für Leistungen der MUC Cargohandling GmbH und die Nutzung dieser Website."
        intro={AGB_INTRO}
        sections={getAgbSections()}
      />
    </>
  );
}
