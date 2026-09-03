export const HOME_STORY = {
  titleDark: "Erfahrung und Expertise seit 2003.",
  titleLight: "Vom Start bis zur Perfektion.",
  subtitle:
    "Qualität und Know-how für Ihre reibungslose Luftfrachtabwicklung am Flughafen München.",
  paragraphs: [
    "Im Mai 2003 gegründet als ALD – Airport Lagerdienste e.K., 2013 umgewandelt zur GmbH und seit 2015 die heutige MUC Cargohandling GmbH.",
    "Qualität, Zuverlässigkeit, Pünktlichkeit und Flexibilität stehen im Mittelpunkt unseres Handelns – mit fairen Preisen und Know-how, auf das Sie sich verlassen können.",
  ],
} as const;

export const HOME_TEAM_INTRO = {
  eyebrow: "Leistungen",
  titleDark: "Ihr zuverlässiger Partner",
  titleLight: "für Luftfrachthandling am Münchner Flughafen.",
  description:
    "Wir sind ein kompetentes Team mit langjähriger Erfahrung am Münchner Flughafen. Mit bewährtem Handling und klaren Prozessen garantieren wir eine für Sie optimale Lösung – von der Annahme bis zur sicheren Freigabe.",
} as const;

export const HOME_IMAGE_CTA = {
  title: "Gemeinsam für eine kontrollierte Luftfracht",
  ctaLabel: "Ihre Ansprechpartner",
  ctaHref: "/unternehmen#team",
  image: "/images/home/team-band.jpg",
} as const;

/** Zusätzliche Leistungsbereiche — kompakte Ergänzung zu den drei Kernbereichen */
export const HOME_CAPABILITY_AREAS = [
  { title: "Optimierte Luftfracht-Logistik", href: "/luftfracht" },
  { title: "Kommissionieren und Palettieren", href: "/luftfracht" },
  { title: "Verpackung und Materialverkauf", href: "/kontakt" },
  { title: "Sichere Einlagerung", href: "/luftfracht" },
  { title: "Dokumenten- / Shuttleservice", href: "/airline-handling" },
  { title: "Transport- / Transportvermittlung", href: "/kontakt" },
] as const;

export const SECURITY_METHODS = [
  {
    title: "Röntgenkontrolle",
    text: "Schnelle, bildgebende Prüfung nach Luftsicherheitsvorgaben.",
    icon: "xray" as const,
  },
  {
    title: "Sichtkontrolle",
    text: "Geschulte Fachkräfte prüfen Unversehrtheit und Kennzeichnung.",
    icon: "eye" as const,
  },
  {
    title: "Handdurchsuchung",
    text: "Manuelle Vertiefung, wenn Technik allein nicht ausreicht.",
    icon: "hand" as const,
  },
  {
    title: "Sprengstoff-Spurendetektion",
    text: "ETD als ergänzendes Verfahren im Sicherheitsprozess.",
    icon: "etd" as const,
  },
] as const;
