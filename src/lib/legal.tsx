import type { ReactNode } from "react";
import { COMPANY } from "@/lib/company";

export type LegalSection = {
  title: string;
  paragraphs: ReactNode[];
};

const officeStreet = COMPANY.office.line1.replace("Büroadresse: ", "");

export const LEGAL_UPDATED = "22. Juli 2026";

export const DATENSCHUTZ_INTRO =
  "Wir informieren Sie nachfolgend gemäß Art. 13 und 14 DSGVO über die Verarbeitung personenbezogener Daten bei Nutzung dieser Website sowie bei Kontaktaufnahme mit uns.";

export function getDatenschutzSections(): LegalSection[] {
  return [
    {
      title: "1. Verantwortlicher",
      paragraphs: [
        <>
          Verantwortlich für die Datenverarbeitung im Sinne der DSGVO ist:
          <br />
          <br />
          {COMPANY.legalName}
          <br />
          {officeStreet}
          <br />
          {COMPANY.office.line2}
          <br />
          <br />
          Tel.:{" "}
          <a href={`tel:${COMPANY.phoneTel}`} className="link-underline">
            {COMPANY.phone}
          </a>
          <br />
          E-Mail:{" "}
          <a href={`mailto:${COMPANY.email}`} className="link-underline">
            {COMPANY.email}
          </a>
        </>,
      ],
    },
    {
      title: "2. Übersicht der Verarbeitungen",
      paragraphs: [
        "Wir verarbeiten personenbezogene Daten insbesondere im Zusammenhang mit dem Betrieb dieser Website (Hosting, Logfiles, Sicherheit), der Einwilligung in optionale Cookies, der Einbindung externer Karten- und Icon-Dienste sowie der Bearbeitung von Anfragen über das Kontaktformular oder per E-Mail.",
      ],
    },
    {
      title: "3. Hosting und Server-Logfiles",
      paragraphs: [
        "Diese Website wird bei einem professionellen Hosting-Anbieter betrieben (derzeit Vercel Inc., USA). Dabei können technisch notwendige Verbindungsdaten verarbeitet werden, darunter IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene URL, Referrer-URL, Browsertyp/-version sowie Betriebssystem.",
        "Die Verarbeitung erfolgt zur Bereitstellung und Absicherung des Onlineangebots auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren, stabilen Websitebetrieb). Soweit eine Übermittlung in Drittländer erfolgt, geschieht dies auf Basis geeigneter Garantien (insbesondere EU-Standardvertragsklauseln) des Hosting-Anbieters.",
        "Logdaten werden in der Regel nur kurzzeitig und soweit für Sicherheits- und Fehleranalyse erforderlich gespeichert und anschließend gelöscht oder anonymisiert, sofern keine längeren gesetzlichen Aufbewahrungspflichten bestehen.",
      ],
    },
    {
      title: "4. Cookies und Einwilligung",
      paragraphs: [
        "Diese Website verwendet Cookies und vergleichbare Technologien. Technisch notwendige Cookies sind für den Betrieb der Website erforderlich. Statistik- und Marketing-Cookies setzen wir nur, wenn Sie dem über unser Cookie-Banner zustimmen.",
        <>
          Im Einzelnen:
          <br />
          <br />
          <strong className="font-medium text-[var(--foreground)]">muc_consent</strong>{" "}
          (notwendig): speichert Ihre Einwilligungsauswahl. Laufzeit ca. 6 Monate,
          SameSite=Lax, bei HTTPS zusätzlich Secure.
          <br />
          <br />
          <strong className="font-medium text-[var(--foreground)]">muc_analytics</strong>{" "}
          (Statistik, optional): wird nur bei Einwilligung gesetzt.
          <br />
          <br />
          <strong className="font-medium text-[var(--foreground)]">muc_marketing</strong>{" "}
          (Marketing, optional): wird nur bei Einwilligung gesetzt; ohne Einwilligung
          wird es gelöscht.
        </>,
        "Rechtsgrundlage für notwendige Cookies ist Art. 6 Abs. 1 lit. f DSGVO bzw. § 25 Abs. 2 TDDDG. Für optionale Cookies ist Rechtsgrundlage Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die gespeicherten Cookies in Ihrem Browser löschen und die Seite erneut aufrufen; die Auswahl erscheint dann wieder beim ersten Besuch.",
      ],
    },
    {
      title: "5. Kontaktformular und E-Mail",
      paragraphs: [
        "Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten (z. B. Name, Unternehmen, E-Mail-Adresse, Telefonnummer, Anliegen/Nachricht) zur Bearbeitung Ihrer Anfrage und für etwaige Anschlussfragen.",
        "Pflichtangaben im Formular sind als solche gekennzeichnet. Ohne diese Angaben können wir Ihre Anfrage ggf. nicht bearbeiten. Die Übermittlung setzt zudem die Bestätigung der Kenntnisnahme unserer Datenschutzhinweise voraus.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen bzw. Vertragserfüllung), soweit die Anfrage auf den Abschluss oder die Durchführung eines Vertrags gerichtet ist; im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen) bzw. Art. 6 Abs. 1 lit. a DSGVO, soweit eine Einwilligung eingeholt wird.",
        "Zur Zustellung Ihrer Anfrage kann ein von uns genutzter Webhook-/E-Mail-Dienst eingesetzt werden. Eine Weitergabe an Dritte erfolgt nur, soweit dies zur Bearbeitung erforderlich ist oder gesetzliche Pflichten bestehen. Wir geben Ihre Daten nicht zu Werbezwecken an Dritte weiter.",
      ],
    },
    {
      title: "6. Karten und Anfahrt (Google Maps)",
      paragraphs: [
        "Auf einzelnen Seiten binden wir eine Kartenansicht über Google Maps (Google Ireland Limited / Google LLC) ein und verlinken auf Google Maps zur Anfahrt. Beim Laden der eingebetteten Karte kann Google personenbezogene Daten (insbesondere Ihre IP-Adresse und Geräteinformationen) verarbeiten und Cookies setzen.",
        "Die Einbindung dient der Darstellung unseres Standorts und der Nutzerfreundlichkeit (Art. 6 Abs. 1 lit. f DSGVO). Bitte beachten Sie die Datenschutzhinweise von Google: https://policies.google.com/privacy",
      ],
    },
    {
      title: "7. Icon-Schriftarten (Google Fonts / Material Symbols)",
      paragraphs: [
        "Zur Darstellung einzelner UI-Icons wird der Dienst „Material Symbols“ über Google Fonts (fonts.googleapis.com / fonts.gstatic.com) geladen. Dabei stellt Ihr Browser eine Verbindung zu Servern von Google her; dabei kann Ihre IP-Adresse verarbeitet werden.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen, performanten Darstellung von Icons). Weitere Informationen: https://policies.google.com/privacy",
      ],
    },
    {
      title: "8. Downloads und Dokumente",
      paragraphs: [
        "Auf der Website bereitgestellte PDF-Dokumente und Vorschaubilder können lokal von unserem Hosting-Anbieter ausgeliefert werden. Beim Download fallen dieselben technischen Verbindungsdaten an wie beim übrigen Seitenaufruf (siehe Hosting und Logfiles).",
      ],
    },
    {
      title: "9. Empfänger und Auftragsverarbeitung",
      paragraphs: [
        "Personenbezogene Daten können an technische Dienstleister übermittelt werden, die uns beim Betrieb der Website und der Kommunikation unterstützen (z. B. Hosting, ggf. E-Mail-/Webhook-Dienste). Diese Stellen verarbeiten Daten nur im Rahmen unserer Weisungen bzw. geltender Auftragsverarbeitungsverträge, soweit erforderlich.",
      ],
    },
    {
      title: "10. Speicherdauer",
      paragraphs: [
        "Wir speichern personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Anfragen aus dem Kontaktformular löschen bzw. sperren wir, sobald die Bearbeitung abgeschlossen ist und keine gesetzlichen oder berechtigten Aufbewahrungsgründe (z. B. Nachweispflichten) entgegenstehen. Cookie-Einwilligungen speichern wir entsprechend der genannten Laufzeiten.",
      ],
    },
    {
      title: "11. Ihre Rechte",
      paragraphs: [
        "Sie haben nach Maßgabe der gesetzlichen Voraussetzungen insbesondere folgende Rechte:",
        <>
          • Auskunft (Art. 15 DSGVO)
          <br />
          • Berichtigung (Art. 16 DSGVO)
          <br />
          • Löschung (Art. 17 DSGVO)
          <br />
          • Einschränkung der Verarbeitung (Art. 18 DSGVO)
          <br />
          • Datenübertragbarkeit (Art. 20 DSGVO)
          <br />
          • Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen
          (Art. 21 DSGVO)
          <br />• Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)
        </>,
        <>
          Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter{" "}
          <a href={`mailto:${COMPANY.email}`} className="link-underline">
            {COMPANY.email}
          </a>
          .
        </>,
      ],
    },
    {
      title: "12. Beschwerderecht",
      paragraphs: [
        "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist insbesondere die Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Für Bayern ist dies u. a. das Bayerische Landesamt für Datenschutzaufsicht (BayLDA).",
      ],
    },
    {
      title: "13. SSL-/TLS-Verschlüsselung",
      paragraphs: [
        "Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.",
      ],
    },
    {
      title: "14. Keine automatisierte Entscheidungsfindung",
      paragraphs: [
        "Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet im Rahmen dieser Website nicht statt.",
      ],
    },
    {
      title: "15. Änderung dieser Datenschutzerklärung",
      paragraphs: [
        `Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder Änderungen unserer Leistungen abbildet. Für Ihren erneuten Besuch gilt jeweils die aktuelle Fassung. Stand: ${LEGAL_UPDATED}.`,
      ],
    },
  ];
}

export const AGB_INTRO =
  "Die nachfolgenden Allgemeinen Geschäftsbedingungen gelten für die Nutzung dieser Website sowie – soweit nicht abweichend schriftlich vereinbart – für Leistungen der MUC Cargohandling GmbH im Bereich Luftfracht-Handling, Airline Handling und sicherheitsrelevante Zusatzleistungen am Flughafen München.";

export function getAgbSections(): LegalSection[] {
  return [
    {
      title: "1. Geltungsbereich",
      paragraphs: [
        `Diese AGB gelten für alle Geschäftsbeziehungen zwischen der ${COMPANY.legalName} („wir“, „Auftragnehmer“) und ihren Kunden („Auftraggeber“), soweit nicht im Einzelfall etwas anderes schriftlich vereinbart ist.`,
        "Abweichende, entgegenstehende oder ergänzende Bedingungen des Auftraggebers werden nur Vertragsbestandteil, wenn wir ihrer Geltung ausdrücklich schriftlich zugestimmt haben.",
        "Für Speditions-, Lager- und handlingbezogene Transportleistungen gelten ergänzend – soweit anwendbar und nicht abweichend vereinbart – die Allgemeinen Deutschen Spediteurbedingungen (ADSp) in der jeweils aktuellen Fassung. Bei Widersprüchen gehen individuelle Vereinbarungen diesen AGB und den ADSp vor; diese AGB gehen den ADSp vor, soweit sie ausdrücklich abweichende Regelungen treffen.",
      ],
    },
    {
      title: "2. Vertragspartner und Vertragsschluss",
      paragraphs: [
        <>
          Vertragspartner ist die {COMPANY.legalName}, {officeStreet},{" "}
          {COMPANY.office.line2}.
        </>,
        "Angebote auf dieser Website sind freibleibend und unverbindlich, soweit nicht ausdrücklich als verbindlich gekennzeichnet. Ein Vertrag kommt erst durch unsere Auftragsbestätigung, durch ausdrückliche Annahme oder durch Beginn der Leistungserbringung zustande.",
        "Anfragen über das Kontaktformular oder per E-Mail stellen kein verbindliches Angebot dar, sondern eine unverbindliche Kontaktaufnahme.",
      ],
    },
    {
      title: "3. Leistungsgegenstand",
      paragraphs: [
        "Unser Leistungsangebot umfasst insbesondere Luftfracht-Import- und Export-Handling, Airline Handling, Röntgen-/Sicherheitskontrollen im Rahmen unserer Zulassungen sowie damit zusammenhängende organisatorische und dokumentarische Dienstleistungen am Standort Flughafen München.",
        `Wir sind reglementierter Beauftragter (Reg.B. ${COMPANY.regAgent}). Sicherheitsrelevante Leistungen erbringen wir nur im Rahmen geltender luftsicherheitsrechtlicher Vorgaben und unserer jeweiligen Zulassungen.`,
        "Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Auftrag, der Auftragsbestätigung und etwaigen Leistungsbeschreibungen. Änderungen und Ergänzungen bedürfen der schriftlichen Absprache.",
      ],
    },
    {
      title: "4. Pflichten des Auftraggebers",
      paragraphs: [
        "Der Auftraggeber stellt uns rechtzeitig alle für die Leistungserbringung erforderlichen Informationen, Dokumente und Freigaben zur Verfügung (insbesondere Sendungsdaten, Empfänger-/Absenderangaben, Zoll- und Sicherheitsinformationen, besondere Behandlungshinweise).",
        "Der Auftraggeber gewährleistet, dass die zur Bearbeitung übergebenen Güter und Angaben den geltenden Vorschriften entsprechen und keine verbotenen oder falsch deklarierten Inhalte enthalten. Verstöße können zur Ablehnung oder Unterbrechung der Leistung führen; entstehende Mehrkosten trägt der Auftraggeber, soweit gesetzlich zulässig.",
        "Der Auftraggeber benennt ansprechbare Kontaktpersonen und sorgt für die Erreichbarkeit während der Abwicklung.",
      ],
    },
    {
      title: "5. Termine und Fristen",
      paragraphs: [
        "Termine und Fristen sind nur verbindlich, wenn sie von uns ausdrücklich als verbindlich bestätigt wurden. Unverbindliche Zeitangaben stellen keine Garantie dar.",
        "Verzögerungen aufgrund unvollständiger Unterlagen, behördlicher Maßnahmen, Flughafen-/Sicherheitsprozesse, höherer Gewalt oder Mitwirkungspflichten des Auftraggebers verlängern Fristen angemessen.",
      ],
    },
    {
      title: "6. Preise und Zahlung",
      paragraphs: [
        "Es gelten die jeweils vereinbarten Preise zuzüglich gesetzlicher Umsatzsteuer, soweit anwendbar. Nebenkosten (z. B. Lager, Sonderfahrten, behördliche Gebühren, Mehrleistungen) können gesondert berechnet werden, wenn sie beauftragt oder erforderlich sind und dem Auftraggeber mitgeteilt wurden bzw. üblich und zumutbar sind.",
        "Rechnungen sind innerhalb der vereinbarten Frist ohne Abzug zahlbar. Bei Zahlungsverzug sind wir berechtigt, gesetzliche Verzugszinsen und weiteren Verzugsschaden geltend zu machen.",
        "Eine Aufrechnung oder Zurückbehaltung durch den Auftraggeber ist nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig, soweit zwingendes Recht nichts anderes vorsieht.",
      ],
    },
    {
      title: "7. Haftung",
      paragraphs: [
        "Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach Maßgabe zwingender gesetzlicher Vorschriften (insbesondere bei Verletzung von Leben, Körper oder Gesundheit und nach dem Produkthaftungsgesetz).",
        "Bei leichter Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), und zwar begrenzt auf den vertragstypischen, vorhersehbaren Schaden. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen, soweit gesetzlich zulässig.",
        "Für speditionstypische Leistungen gelten – soweit einbezogen – die Haftungsregelungen der ADSp sowie ggf. anwendbare internationale Abkommen. Eine weitergehende Haftung übernehmen wir nur, wenn dies ausdrücklich schriftlich vereinbart wurde.",
        "Die Haftung für mittelbare Schäden, entgangenen Gewinn und reine Vermögensfolgeschäden ist – außer in den Fällen unbeschränkter Haftung – ausgeschlossen, soweit gesetzlich zulässig.",
      ],
    },
    {
      title: "8. Höhere Gewalt",
      paragraphs: [
        "Ereignisse höherer Gewalt und sonstige von uns nicht zu vertretende Umstände (z. B. Naturereignisse, Streik, Aussperrung, behördliche Anordnungen, Ausfälle kritischer Flughafeninfrastruktur, Cyberangriffe, Pandemien) entbinden uns für die Dauer der Störung von der Leistungspflicht. Wir informieren den Auftraggeber unverzüglich und bemühen uns um zumutbare Abhilfe.",
      ],
    },
    {
      title: "9. Geheimhaltung und Sicherheit",
      paragraphs: [
        "Beide Parteien behandeln vertrauliche Informationen der anderen Partei vertraulich und verwenden sie nur zur Vertragserfüllung, es sei denn, die Information ist öffentlich bekannt oder eine Offenbarung ist gesetzlich bzw. behördlich gefordert.",
        "Der Auftraggeber erkennt an, dass am Flughafen und im Rahmen unserer Tätigkeit als reglementierter Beauftragter besondere Sicherheits- und Zutrittsregeln gelten. Weisungen unseres Personals und der zuständigen Stellen sind zu beachten.",
      ],
    },
    {
      title: "10. Nutzung der Website",
      paragraphs: [
        "Die Inhalte dieser Website dienen der Information über unser Unternehmen und unsere Leistungen. Wir bemühen uns um Aktualität und Richtigkeit, übernehmen jedoch keine Gewähr für Vollständigkeit oder Eignung für einen bestimmten Zweck, soweit gesetzlich zulässig.",
        "Eine missbräuchliche Nutzung der Website (z. B. automatisierte Abrufe, Angriffe auf die IT-Sicherheit, Versand von Spam über Formulare) ist untersagt. Wir behalten uns vor, den Zugang bei Missbrauch einzuschränken.",
      ],
    },
    {
      title: "11. Datenschutz",
      paragraphs: [
        <>
          Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
          <a href="/datenschutz" className="link-underline">
            Datenschutzerklärung
          </a>
          .
        </>,
      ],
    },
    {
      title: "12. Schlussbestimmungen",
      paragraphs: [
        "Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG), soweit nicht zwingende Verbraucherschutzvorschriften entgegenstehen.",
        "Gerichtsstand für Kaufleute, juristische Personen des öffentlichen Rechts und öffentlich-rechtliche Sondervermögen ist – soweit zulässig – München. Wir bleiben berechtigt, den Auftraggeber auch an seinem allgemeinen Gerichtsstand zu verklagen.",
        "Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmung gilt die gesetzlich zulässige Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.",
        `Stand: ${LEGAL_UPDATED}.`,
      ],
    },
  ];
}
