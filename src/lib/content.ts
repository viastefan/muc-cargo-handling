export const SERVICES = [
  {
    href: "/luftfracht",
    title: "Luftfracht",
    subtitle: "Import & Export",
    description: "Annahme, Dokumentation und Übergabe am Cargo-Drehkreuz MUC.",
  },
  {
    href: "/airline-handling",
    title: "Airline Handling",
    subtitle: "Operative Schnittstelle",
    description: "Koordination zwischen Airline, Spedition und Warehouse.",
  },
  {
    href: "/roentgen",
    title: "Röntgen & Security",
    subtitle: "Luftsicherheit",
    description: "Röntgen, Sichtkontrolle, Handdurchsuchung und ETD.",
  },
] as const;

export const LUFTFRACHT_PROCESS = [
  {
    step: "01",
    title: "Annahme & Erfassung",
    text: "Sendung wird erfasst, dokumentiert und für die weitere Abwicklung vorbereitet.",
  },
  {
    step: "02",
    title: "Sicherheitskontrolle",
    text: "Röntgen und ergänzende Verfahren nach Luftsicherheitsvorgaben – regelkonform und nachvollziehbar.",
  },
  {
    step: "03",
    title: "Dokumentation",
    text: "Vollständige Unterlagen für Airline, Spedition und Behörden – transparent und prüfbar.",
  },
  {
    step: "04",
    title: "Übergabe & Freigabe",
    text: "Koordinierte Übergabe in den Flugbetrieb oder an den Empfänger – termingerecht und sicher.",
  },
] as const;

export const LUFTFRACHT_IMPORT_EXPORT_STEPS = [
  {
    title: "Ankunft",
    text: "Annahme mit erster Sichtprüfung.",
  },
  {
    title: "Erfassung",
    text: "Dokumentation notwendiger Sendungsdaten.",
  },
  {
    title: "Lagerung",
    text: "Einlagern auf kontrollierte Lagerflächen.",
  },
  {
    title: "Transport",
    text: "Airline Handling bis termingerechter Auslieferung.",
  },
] as const;

export const COMPANY_VALUES = [
  {
    title: "Präzision",
    text: "Strukturierte Prozesse und klare Verantwortlichkeiten in jedem Arbeitsschritt.",
  },
  {
    title: "Sicherheit",
    text: "Reglementierter Beauftragter mit geprüften Verfahren nach geltenden Vorschriften.",
  },
  {
    title: "Partnerschaft",
    text: "Persönliche Betreuung und direkte Kommunikation mit Airlines und Speditionen.",
  },
] as const;
