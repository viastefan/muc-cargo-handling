export type FaqItem = {
  q: string;
  a: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: readonly FaqItem[];
};

/** Kurze Auswahl für die Startseite */
export const FAQ_HOME: readonly FaqItem[] = [
  {
    q: "Welche Leistungen bietet MUC Cargo Handling?",
    a: "Wir übernehmen Luftfracht Import und Export, Airline Handling sowie Sicherheitskontrollen am Flughafen München – von der Annahme über Dokumentation und Sicherung bis zur Übergabe an Spedition oder Airline.",
  },
  {
    q: "Für wen sind Ihre Leistungen gedacht?",
    a: "Für Speditionen, Airlines, Logistikpartner und Unternehmen mit Luftfracht am Standort München. Wir arbeiten als verlässlicher Partner entlang der Cargo-Kette mit klaren Prozessen und direkter Ansprechbarkeit.",
  },
  {
    q: "Sind Sie als Reglementierter Beauftragter zugelassen?",
    a: "Ja. Wir arbeiten als Reglementierter Beauftragter (DE/RA/01278-01) und führen Sicherheitskontrollen nach geltenden luftsicherheitsrechtlichen Vorgaben durch – dokumentiert und nachvollziehbar.",
  },
  {
    q: "Wie erreiche ich Sie für eine Anfrage?",
    a: "Per Kontaktformular, E-Mail oder telefonisch während der Betriebszeiten. Für dringende Sendungen stimmen wir Prioritäten und Zeitfenster individuell mit Ihnen ab.",
  },
] as const;

/** Vollständige FAQ – nur über Footer / Startseiten-Button verlinkt */
export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: "allgemein",
    title: "Allgemein",
    items: [
      {
        q: "Seit wann sind Sie am Flughafen München tätig?",
        a: "MUC Cargo Handling ist seit 2003 am Flughafen München aktiv. Diese Erfahrung fließt in strukturierte Abläufe, geschultes Personal und verlässliche Koordination mit Partnern vor Ort ein – Import, Export und Sicherheitsprozesse inklusive.",
      },
      {
        q: "Wo befindet sich Ihr Standort?",
        a: "Lager und Büro liegen in der Südallee am Flughafen München (85356). Kurze Wege zum Cargo-Drehkreuz ermöglichen effiziente Abstimmung, schnelle Übergaben und eine direkte Erreichbarkeit vor Ort.",
      },
      {
        q: "Sind Sie als Reglementierter Beauftragter zugelassen?",
        a: "Ja. Wir arbeiten als Reglementierter Beauftragter (DE/RA/01278-01) und führen Sicherheitskontrollen nach den geltenden luftsicherheitsrechtlichen Vorgaben durch – dokumentiert und nachvollziehbar.",
      },
      {
        q: "Was unterscheidet Sie von anderen Handling-Partnern?",
        a: "Kurze Wege am Standort, persönliche Ansprechpartner und dokumentierte Sicherheitsprozesse unter einem Dach. Statt anonymer Schnittstellen erhalten Sie klare Verantwortlichkeiten vom Eingang bis zur Übergabe.",
      },
      {
        q: "In welchen Sprachen können wir kommunizieren?",
        a: "Unser Team berät Sie auf Deutsch und Englisch. Für internationale Sendungen und Dokumentation sind beide Sprachen im Tagesgeschäft etabliert.",
      },
      {
        q: "Mit welchen Partnern arbeiten Sie zusammen?",
        a: "Am Standort München arbeiten wir mit erfahrenen Partnern entlang der Cargo-Kette zusammen – unter anderem im Handling und bei Sicherheitsprozessen. So entstehen kurze Wege und klare Verantwortlichkeiten.",
      },
    ],
  },
  {
    id: "luftfracht",
    title: "Luftfracht Import & Export",
    items: [
      {
        q: "Welche Sendungsarten bearbeiten Sie?",
        a: "Standard- und Sonderfracht am Flughafen München – von Paletten und Kollo bis zu zeitkritischen Express-Sendungen. Für abweichende Maße oder Sonderanforderungen beraten wir vorab und prüfen die Machbarkeit.",
      },
      {
        q: "Wie läuft die Import-Abwicklung ab?",
        a: "Nach Ankunft erfassen wir die Sendung, prüfen Unterlagen, führen die erforderlichen Sicherheitskontrollen durch und übergeben termingerecht an Spedition oder Empfänger. Status und Übergaben bleiben dabei transparent.",
      },
      {
        q: "Unterstützen Sie auch beim Export?",
        a: "Ja – von der Annahme über Sicherung und Dokumentation bis zur Übergabe an Airline Handling und Ramp koordinieren wir den gesamten Exportprozess am Standort München.",
      },
      {
        q: "Welche Unterlagen benötigen Sie für eine Abwicklung?",
        a: "Je nach Sendung und Richtung benötigen wir unter anderem AWB, Handelsrechnung, Packliste und ggf. Zolldokumente. Wir informieren Sie vorab, welche Unterlagen für Ihren Fall erforderlich sind.",
      },
      {
        q: "Können Sie auch zeitkritische Sendungen priorisieren?",
        a: "Ja. Bei dringenden Luftfrachten stimmen wir Abläufe, Sicherheitsfenster und Übergaben eng mit Ihnen und den beteiligten Partnern ab – mit klaren Prioritäten im Tagesgeschäft.",
      },
      {
        q: "Bieten Sie Einlagerung und Kommissionierung an?",
        a: "Ja. Wir unterstützen bei sicherer Einlagerung, Kommissionierung und Palettierung am Standort – abgestimmt auf Ihren Zeitplan und die nachfolgenden Handling-Schritte.",
      },
      {
        q: "Was passiert bei Unregelmäßigkeiten oder fehlenden Dokumenten?",
        a: "Wir melden Abweichungen frühzeitig, dokumentieren den Status und stimmen die nächsten Schritte mit Ihnen ab – damit Verzögerungen so gering wie möglich bleiben.",
      },
    ],
  },
  {
    id: "airline-handling",
    title: "Airline Handling",
    items: [
      {
        q: "Was umfasst Ihr Airline Handling?",
        a: "Wir unterstützen Airlines und Handling-Partner bei der Abwicklung am Boden – von Annahme und Dokumentation über Sicherung bis zur koordinierten Übergabe an nachgelagerte Prozesse.",
      },
      {
        q: "Arbeiten Sie mit festen SLAs?",
        a: "Zeitfenster und Prioritäten werden projekt- und sendungsbezogen vereinbart. Unser Ziel sind verlässliche Übergaben und transparente Kommunikation entlang des Handling-Prozesses.",
      },
      {
        q: "Können Sie Sonderfracht oder Übermaß bearbeiten?",
        a: "Für abweichende Abmessungen oder besondere Anforderungen prüfen wir die Machbarkeit im Vorfeld und schlagen passende Abläufe bzw. Alternativen vor.",
      },
      {
        q: "Wie erfolgt die Abstimmung mit Airlines und Ground Handling?",
        a: "Über klar definierte Schnittstellen und direkte Kommunikation vor Ort. So bleiben Status, Zeitfenster und Verantwortlichkeiten für alle Beteiligten nachvollziehbar.",
      },
      {
        q: "Unterstützen Sie auch Dokumenten- und Shuttleservices?",
        a: "Ja. Für zeitkritische Unterlagen und kurze Wege am Flughafen organisieren wir abgestimmte Dokumenten- und Shuttleläufe im Rahmen des Handling-Prozesses.",
      },
    ],
  },
  {
    id: "sicherheit",
    title: "Sicherheit & Röntgen",
    items: [
      {
        q: "Welche Sicherheitsverfahren setzen Sie ein?",
        a: "Je nach Sendung kommen Röntgenkontrolle, Sichtkontrolle, Handdurchsuchung oder Sprengstoff-Spurendetektion zum Einsatz – immer regelkonform und nachvollziehbar dokumentiert.",
      },
      {
        q: "Welche Sendungen können geröntgt werden?",
        a: "Standardfracht bis ca. 179 cm Breite, 170 cm Höhe und 2.000 kg Gewicht. Für Sondermaße beraten wir zu Alternativverfahren und passenden Kontrollschritten.",
      },
      {
        q: "Wie läuft die Freigabe nach der Kontrolle ab?",
        a: "Nach erfolgreicher Prüfung dokumentieren wir das Ergebnis und stimmen die Freigabe mit den beteiligten Partnern ab, damit Ihre Sendung zügig weiterbearbeitet werden kann.",
      },
      {
        q: "Wer führt die Sicherheitskontrollen durch?",
        a: "Geschultes Fachpersonal unter Aufsicht unseres Reglementierten Beauftragten. Technik und manuelle Prüfung ergänzen sich je nach Sendungsprofil.",
      },
      {
        q: "Wie lange dauert eine typische Sicherheitskontrolle?",
        a: "Das hängt von Sendungsart, Volumen und gewähltem Verfahren ab. Wir stimmen realistische Zeitfenster vorab ab und priorisieren bei Bedarf dringende Sendungen.",
      },
      {
        q: "Was ist bei Röntgenaufträgen zu beachten?",
        a: "Nutzen Sie unser Röntgenauftrags-Formular und geben Sie Maße, Gewicht und besondere Anforderungen an. So können wir Kapazität und Verfahren frühzeitig planen.",
      },
    ],
  },
  {
    id: "dokumente",
    title: "Dokumente & Formulare",
    items: [
      {
        q: "Welche Formulare stehen zum Download bereit?",
        a: "Auf der Startseite finden Sie u. a. Arbeitsauftrag, Röntgenauftrag sowie Unterlagen zu Zulassung und Versicherung – jeweils mit Vorschau und Download.",
      },
      {
        q: "Muss ich Formulare vorab ausfüllen?",
        a: "Für eine zügige Bearbeitung empfehlen wir, die relevanten Formulare möglichst vollständig auszufüllen. Fehlen Angaben, klären wir diese kurz mit Ihnen nach.",
      },
      {
        q: "In welchem Format erhalte ich die Dokumente?",
        a: "Die Formulare stehen als PDF bereit. Sie können sie herunterladen, digital ausfüllen bzw. ausdrucken und uns auf dem vereinbarten Weg übermitteln.",
      },
      {
        q: "Wo finde ich Angaben zu Zulassung und Versicherung?",
        a: "Aktuelle Nachweise und Informationen stellen wir über die Download-Bereiche auf der Website bereit. Bei speziellen Anforderungen melden Sie sich gern direkt.",
      },
    ],
  },
  {
    id: "kontakt",
    title: "Kontakt & Ablauf",
    items: [
      {
        q: "Wie schnell erhalte ich eine Rückmeldung?",
        a: "Unser Team ist während der Betriebszeiten direkt erreichbar. Für dringende Sendungen stimmen wir Prioritäten und Zeitfenster individuell ab – in der Regel innerhalb eines Werktags.",
      },
      {
        q: "Wie stelle ich eine Anfrage?",
        a: "Über das Kontaktformular auf unserer Website, per E-Mail oder telefonisch. Je vollständiger Ihre Angaben zu Sendung, Route und Zeitfenster sind, desto schneller können wir einschätzen und antworten.",
      },
      {
        q: "Welche Angaben helfen bei der ersten Einschätzung?",
        a: "Sendungsart, Maße/Gewicht, Import oder Export, gewünschtes Zeitfenster sowie besondere Sicherheits- oder Dokumentenanforderungen. Auch AWB-Nummer und Partner vor Ort sind hilfreich.",
      },
      {
        q: "Bieten Sie eine feste Ansprechperson?",
        a: "Ja. Sie erhalten direkte Betreuung statt anonymer Abwicklungskette – mit klaren Verantwortlichkeiten für Ihre Sendungen am Standort München.",
      },
      {
        q: "Kann ich Sie vor Ort am Flughafen besuchen?",
        a: "Termine vor Ort sind nach Absprache möglich. Melden Sie sich kurz mit Ihrem Anliegen – wir koordinieren einen passenden Zeitpunkt am Standort Südallee.",
      },
      {
        q: "Wie erreiche ich Sie außerhalb der üblichen Zeiten?",
        a: "Für zeitkritische Fälle nennen Sie Priorität und Erreichbarkeit in Ihrer Anfrage. Wir prüfen, ob eine beschleunigte Abstimmung möglich ist, und melden uns entsprechend zurück.",
      },
    ],
  },
] as const;
