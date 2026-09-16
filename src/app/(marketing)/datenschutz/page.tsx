import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { DATENSCHUTZ_INTRO, getDatenschutzSections } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/datenschutz",
  title: "Datenschutz",
  description:
    "Datenschutzerklärung der MUC Cargohandling GmbH – Informationen zur Verarbeitung personenbezogener Daten.",
});

export default function DatenschutzPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Startseite", path: "/" },
          { name: "Datenschutz", path: "/datenschutz" },
        ]}
      />
      <LegalDocument
        title="Datenschutzerklärung"
        description="Informationen zur Verarbeitung personenbezogener Daten auf dieser Website."
        intro={DATENSCHUTZ_INTRO}
        sections={getDatenschutzSections()}
      />
    </>
  );
}
