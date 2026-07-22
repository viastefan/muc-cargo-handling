export const LUFTFRACHT_METRICS = [
  { value: "Import", label: "Annahme, Freigabe und Auslieferung eingehender Sendungen" },
  { value: "Export", label: "Vorbereitung, Sicherung und Übergabe ausgehender Fracht" },
  { value: "MUC", label: "Direkt am Cargo-Drehkreuz Flughafen München" },
] as const;

export const LUFTFRACHT_IMPORT_FLOW = [
  {
    step: "01",
    title: "Ankunft & Entladung",
    text: "Sendung wird am Cargo-Drehkreuz entgegengenommen, entladen und mit erster Sichtprüfung erfasst.",
  },
  {
    step: "02",
    title: "Erfassung & Dokumentation",
    text: "AWB, Zolldaten und Sendungsdetails werden validiert und für die weitere Abwicklung vorbereitet.",
  },
  {
    step: "03",
    title: "Sicherheit & Freigabe",
    text: "Röntgen und ergänzende Verfahren nach Luftsicherheitsvorgaben – dokumentiert und nachvollziehbar.",
  },
  {
    step: "04",
    title: "Lagerung & Auslieferung",
    text: "Kontrollierte Einlagerung und termingerechte Übergabe an Spedition oder Empfänger.",
  },
] as const;

export const LUFTFRACHT_EXPORT_FLOW = [
  {
    step: "01",
    title: "Annahme & Check-in",
    text: "Fracht wird angenommen, Gewicht und Maße verifiziert und für den Exportprozess eingestuft.",
  },
  {
    step: "02",
    title: "Vorbereitung & Sicherung",
    text: "Verpackung, Kennzeichnung und Sicherungskontrolle vor der Übergabe in den Flugbetrieb.",
  },
  {
    step: "03",
    title: "Dokumentation & Compliance",
    text: "Vollständige Exportunterlagen für Airline, Spedition und Behörden – transparent und prüfbar.",
  },
  {
    step: "04",
    title: "Build-up & Übergabe",
    text: "Koordinierte Übergabe an Airline Handling und Ramp – termingerecht und sicher.",
  },
] as const;

export const LUFTFRACHT_END_TO_END = [
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

export const LUFTFRACHT_SERVICES = [
  {
    image: "/images/luftfracht/service-1.jpg",
    title: "Annahme & Erfassung",
    bullets: [
      "Schnelle Entgegennahme am Cargo-Standort",
      "Prüfung von Sendungsdaten und Kennzeichnung",
      "Direkte Abstimmung mit Spedition und Airline",
    ],
  },
  {
    image: "/images/luftfracht/service-2.jpg",
    title: "Dokumentation & Zollunterstützung",
    bullets: [
      "Vollständige Frachtdokumentation",
      "Unterstützung bei zollrelevanten Prozessen",
      "Nachvollziehbare Status- und Übergabeprotokolle",
    ],
  },
  {
    image: "/images/luftfracht/service-3.jpg",
    title: "Sicherheitskontrolle",
    bullets: [
      "Röntgen, Sichtkontrolle und ergänzende Verfahren",
      "Reglementierter Beauftragter DE/RA/01278-01",
      "Klare Freigabeentscheidung mit Dokumentation",
    ],
    href: "/roentgen",
  },
  {
    image: "/images/luftfracht/service-4.jpg",
    title: "Übergabe & Tracking",
    bullets: [
      "Koordinierte Übergabe an Airline oder Empfänger",
      "Termin- und Prioritätensteuerung",
      "Kurze Wege am Flughafen München",
    ],
    href: "/airline-handling",
  },
] as const;

export const LUFTFRACHT_HIGHLIGHTS = [
  {
    title: "Kurze Wege",
    text: "Direkt am Cargo-Drehkreuz MUC – für schnelle Reaktionszeiten und enge Abstimmung.",
    icon: "route" as const,
  },
  {
    title: "Klare Prozesse",
    text: "Definierte Abläufe für Import und Export mit transparenten Verantwortlichkeiten.",
    icon: "process" as const,
  },
  {
    title: "Luftsicherheit",
    text: "Integrierte Security-Prozesse als reglementierter Beauftragter.",
    icon: "shield" as const,
  },
  {
    title: "Persönliche Betreuung",
    text: "Direkter Ansprechpartner statt anonymer Abwicklungskette.",
    icon: "person" as const,
  },
] as const;

export const LUFTFRACHT_FAQ = [
  {
    q: "Welche Sendungsarten bearbeiten Sie?",
    a: "Standard- und Sonderfracht am Flughafen München – von Paletten und Kollo bis zu zeitkritischen Express-Sendungen. Für abweichende Maße oder Sonderanforderungen beraten wir vorab.",
  },
  {
    q: "Wie läuft die Import-Abwicklung ab?",
    a: "Nach Ankunft erfassen wir die Sendung, prüfen Unterlagen, führen die erforderlichen Sicherheitskontrollen durch und übergeben termingerecht an Spedition oder Empfänger.",
  },
  {
    q: "Unterstützen Sie auch beim Export?",
    a: "Ja – von der Annahme über Sicherung und Dokumentation bis zur Übergabe an Airline Handling und Ramp koordinieren wir den gesamten Exportprozess.",
  },
  {
    q: "Wie schnell erhalte ich eine Rückmeldung?",
    a: "Unser Team ist während der Betriebszeiten direkt erreichbar. Für dringende Sendungen stimmen wir Prioritäten und Zeitfenster individuell ab.",
  },
] as const;
