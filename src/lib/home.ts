export const HOME_STORY = {
  titleDark: "Erfahrung und Expertise seit 2003.",
  titleLight: "Vom Start bis zur Perfektion.",
  subtitle:
    "Qualität und Know-how für Ihre reibungslose Luftfrachtabwicklung am Flughafen München.",
  paragraphs: [
    "Im Mai 2003 wurde die ALD – Airport Lagerdienste e.K. durch Johnbosco Onyeke gegründet. Durch kontinuierliches Wachstum und die Erweiterung des Leistungsspektrums erfolgte 2013 die Umwandlung zur ALD – Airport Lagerdienste GmbH. Im August 2015 entstand daraus die heutige MUC Cargohandling GmbH.",
    "Unser Ziel ist es, qualitative und quantitative Lösungen zu bieten und unsere Kunden mit Know-how zu unterstützen. Qualität, Zuverlässigkeit, Pünktlichkeit, Flexibilität und faire Preise stehen im Mittelpunkt unseres Handelns.",
    "Als Reglementierter Beauftragter (DE/RA/01278-01) erfüllen wir die hohen Anforderungen der Luftsicherheit und begleiten Ihre Sendungen mit dokumentierten, regelkonformen Prozessen.",
  ],
} as const;

export const HOME_TEAM_INTRO = {
  eyebrow: "Leistungen",
  titleDark: "Ihr zuverlässiger Partner",
  titleLight: "für Luftfrachthandling am MUC.",
  description:
    "Wir sind ein kompetentes Team mit langjähriger Erfahrung am Münchner Flughafen. Mit bewährtem Handling und klaren Prozessen garantieren wir eine für Sie optimale Lösung – von der Annahme bis zur sicheren Freigabe.",
} as const;

export const HOME_IMAGE_CTA = {
  title: "Gemeinsam für eine kontrollierte Luftfracht",
  ctaLabel: "Ihre Ansprechpartner",
  ctaHref: "/unternehmen#team",
  image: "/images/home/team-band.jpg",
} as const;

/** Zusätzliche Leistungsbereiche – kompakte Ergänzung zu den drei Kernbereichen */
export const HOME_CAPABILITY_AREAS = [
  { title: "Optimierte Luftfracht-Logistik", href: "/luftfracht" },
  { title: "Kommissionieren und Palettieren", href: "/kontakt" },
  { title: "Verpackung und Materialverkauf", href: "/kontakt" },
  { title: "Sichere Einlagerung", href: "/kontakt" },
  { title: "Dokumenten- / Shuttleservice", href: "/kontakt" },
  { title: "Transport- / Transportvermittlung", href: "/kontakt" },
] as const;

export const SECURITY_METHODS = [
  {
    title: "Röntgenkontrolle",
    text: "Schnelle, bildgebende Prüfung nach Luftsicherheitsvorgaben.",
  },
  {
    title: "Sichtkontrolle",
    text: "Geschulte Fachkräfte prüfen Unversehrtheit und Kennzeichnung.",
  },
  {
    title: "Handdurchsuchung",
    text: "Manuelle Vertiefung, wenn Technik allein nicht ausreicht.",
  },
  {
    title: "Sprengstoff-Spurendetektion",
    text: "ETD als ergänzendes Verfahren im Sicherheitsprozess.",
  },
] as const;

export const HOME_DOWNLOADS = [
  {
    title: "Effiziente Bearbeitung Ihres Arbeitsauftrags",
    meta: "PDF · aktualisiert 24.07.2023",
    files: [
      { label: "Arbeitsauftrag", href: "/downloads/arbeitsauftrag.pdf" },
      { label: "Röntgenauftrag", href: "/downloads/roentgenauftrag.pdf" },
    ],
  },
  {
    title: "Zuverlässige Unterstützung für die Zulassung",
    meta: "PDF · aktualisiert 24.07.2023",
    files: [{ label: "Zulassung Reg.B.", href: "/downloads/zulassung-regb.pdf" }],
  },
  {
    title: "Versicherungsservice – Speditionslogistik & Lager",
    meta: "PDF · aktualisiert 24.07.2023",
    files: [{ label: "Versicherungsbestätigung", href: "/downloads/versicherungsbestaetigung.pdf" }],
  },
  {
    title: "Versicherungsbestätigung Betriebshaftpflicht",
    meta: "PDF · aktualisiert 10.07.2019",
    files: [{ label: "Betriebshaftpflicht", href: "/downloads/betriebshaftpflicht.pdf" }],
  },
] as const;

export const MAP_EMBED =
  "https://maps.google.com/maps?q=S%C3%BCdallee+Modul+F+85356+M%C3%BCnchen-Flughafen&t=&z=14&ie=UTF8&iwloc=&output=embed";
