import { COMPANY } from "./company";

export const LEGAL_UPDATED = "Juli 2026";

export const DATENSCHUTZ_SECTIONS = [
  {
    id: "verantwortlicher",
    title: "Verantwortlicher",
    body: `Verantwortlich für die Datenverarbeitung auf dieser Website ist die ${COMPANY.legalName}, ${COMPANY.office.line1.replace("Büroadresse: ", "")}, ${COMPANY.office.line2}.`,
    contact: true,
  },
  {
    id: "erhebung",
    title: "Erhebung und Speicherung",
    body: "Beim Besuch unserer Website werden technisch notwendige Daten (z. B. IP-Adresse, Browsertyp, Zeitpunkt des Zugriffs) in Server-Logfiles verarbeitet, um Stabilität und Sicherheit des Angebots zu gewährleisten.",
  },
  {
    id: "kontaktformular",
    title: "Kontaktformular",
    body: "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben inklusive der von Ihnen angegebenen Kontaktdaten zur Bearbeitung der Anfrage und für Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
  },
  {
    id: "zweck",
    title: "Zweck und Rechtsgrundlage",
    body: "Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage und zur Kommunikation mit Ihnen auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).",
  },
  {
    id: "speicherdauer",
    title: "Speicherdauer",
    body: "Ihre Daten werden gelöscht, sobald sie für die Erreichung des Zwecks der Erhebung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
  },
] as const;

export const DATENSCHUTZ_RIGHTS = [
  "Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten",
  "Berichtigung unrichtiger Daten",
  "Löschung Ihrer bei uns gespeicherten Daten",
  "Einschränkung der Datenverarbeitung",
  "Datenübertragbarkeit",
  "Widerspruch gegen die Verarbeitung",
  "Beschwerde bei einer Aufsichtsbehörde",
] as const;

export const IMPRESSUM_BLOCKS = [
  {
    id: "anbieter",
    title: "Anbieter",
    lines: [
      COMPANY.legalName,
      COMPANY.office.line1.replace("Büroadresse: ", ""),
      COMPANY.office.line2,
    ],
  },
  {
    id: "lager",
    title: "Lager & Postanschrift",
    lines: [COMPANY.lager.line1, COMPANY.lager.line2, COMPANY.lager.line3],
  },
  {
    id: "geschaeftsfuehrung",
    title: "Geschäftsführung",
    lines: [COMPANY.managingDirector],
  },
  {
    id: "reg-agent",
    title: "Reglementierter Beauftragter",
    lines: [`Reg.B. ${COMPANY.regAgent}`],
  },
] as const;

export const AGB_SECTIONS = [
  {
    id: "geltung",
    title: "1. Geltungsbereich",
    body: "Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge und Leistungen der MUC Cargohandling GmbH im Bereich Luftfracht-Handling, Airline Handling und damit verbundener Sicherheits- und Logistikleistungen am Flughafen München, sofern nicht schriftlich etwas anderes vereinbart wurde.",
  },
  {
    id: "leistungen",
    title: "2. Leistungsumfang",
    body: "Der konkrete Leistungsumfang ergibt sich aus der jeweiligen Auftragsbestätigung, dem Frachtbrief, den einschlägigen IATA-Vorschriften sowie den geltenden luftsicherheitsrechtlichen Bestimmungen. Änderungen oder Erweiterungen bedürfen der Schriftform.",
  },
  {
    id: "pflichten",
    title: "3. Pflichten des Auftraggebers",
    body: "Der Auftraggeber ist verpflichtet, alle für die Abwicklung erforderlichen Unterlagen vollständig und rechtzeitig bereitzustellen sowie Sendungen ordnungsgemäß zu deklarieren. Gefahrgut und sonderregulierte Sendungen sind vorab anzuzeigen.",
  },
  {
    id: "haftung",
    title: "4. Haftung",
    body: "Wir haften im Rahmen der gesetzlichen Bestimmungen und der einschlägigen Transport- und Speditionsbedingungen. Für leichte Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten und beschränkt auf den vorhersehbaren, typischen Schaden.",
  },
  {
    id: "zahlung",
    title: "5. Preise und Zahlung",
    body: "Es gelten die zum Zeitpunkt der Auftragserteilung vereinbarten Preise. Rechnungen sind innerhalb der vereinbarten Frist ohne Abzug zahlbar. Bei Zahlungsverzug können Verzugszinsen in gesetzlicher Höhe berechnet werden.",
  },
  {
    id: "datenschutz",
    title: "6. Datenschutz",
    body: "Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung. Diese ist unter /datenschutz abrufbar.",
  },
  {
    id: "schluss",
    title: "7. Schlussbestimmungen",
    body: "Es gilt deutsches Recht. Gerichtsstand ist, soweit zulässig, München. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
  },
] as const;
