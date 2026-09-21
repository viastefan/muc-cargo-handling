# Google Maps Standort — MUC Cargohandling

Stand: 21.09.2026

Ein benannter Pin in Google Maps entsteht **nicht** über die Website. Die
Seite zeigt den Standort bereits über Koordinaten (Büro Modul H). Damit
„MUC Cargohandling“ als eigener Ort in Maps und der Google-Suche erscheint,
braucht es ein bestätigtes **Google Unternehmensprofil**.

Die Felder zum Abschreiben stehen auch im Admin-Panel unter
`/admin/system` (Karte „Google Maps Pin“).

---

## 1. Prüfen, ob schon ein Eintrag existiert

In Google Maps nach `MUC Cargohandling GmbH München-Flughafen` suchen.

- **Eintrag vorhanden:** nicht neu anlegen. Oben rechts „Anspruch auf diesen
  Eintrag erheben“ und den Pin danach auf die Bürokoordinaten ziehen.
- **Kein Eintrag:** weiter mit Schritt 2.

Der frühere Places-Eintrag saß versetzt. Nicht den automatisch gesetzten Pin
übernehmen, wenn er nicht auf dem Pavillon in Modul H liegt.

## 2. Profil anlegen

1. Mit einem Google-Konto des Inhabers oder einer bevollmächtigten Person auf
   [business.google.com/create](https://business.google.com/create) gehen.
2. Felder aus der Tabelle unten eins zu eins übernehmen.
3. Bei der Karte **Standort anpassen** wählen und den Pin auf
   `48.350443, 11.767121` setzen.
4. Website: die öffentliche Domain (`https://www.muc-cargo.de`), nicht die
   Vercel-Vorschau — die ist für Suchmaschinen gesperrt.
5. Öffnungszeiten **nicht** eintragen, solange sie nicht bestätigt sind
   (`COMPANY.hours.confirmed` in `src/lib/company.ts` ist noch `false`).
6. Profil zur Bestätigung einreichen (Postkarte, Anruf oder Video). Am
   Flughafen kommt die Postkarte oft nicht zuverlässig an — Video oder Anruf
   sind praxisnäher.

## 3. Felder

| Feld | Wert |
|---|---|
| Name | MUC Cargohandling GmbH |
| Kategorie | Spedition (zusätzlich: Logistikdienst, Luftfrachtunternehmen) |
| Straße | Südallee |
| Adresszusatz | Frachtzentrum, Modul H, Pavillon |
| PLZ / Ort | 85356 München-Flughafen |
| Telefon | +49 (0)89 – 975 94 877 |
| E-Mail | info@muc-cargo.de |
| Website | https://www.muc-cargo.de |
| Pin | 48.350443, 11.767121 |
| Warenannahme (nur Beschreibung, kein zweiter Pin) | Frachtzentrum, Modul E, E48, Rampe 51 |

„Südallee“ steht bewusst nur im Google-Profil: Google geocodiert
„Frachtzentrum, Modul H, Pavillon“ allein oft nicht. Auf der Website bleibt
die Büroadresse unverändert (Korrekturliste vom 18.08.2026).

**Beschreibung (max. 750 Zeichen):**

> Luftfracht-Handling am Flughafen München: Import und Export, Airline
> Handling sowie Röntgen- und Sicherheitskontrollen. MUC Cargohandling GmbH
> ist reglementierter Beauftragter (DE/RA/01278-01). Büro im Frachtzentrum,
> Modul H, Pavillon; Warenannahme Modul E, E48, Rampe 51. Persönliche
> Ansprechpartner, kurze Wege zum Cargo-Drehkreuz.

## 4. Place ID mit der Website verbinden

Sobald der Eintrag live ist:

1. Place ID im
   [Place-ID-Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
   kopieren.
2. In Vercel als `GOOGLE_PLACE_ID` setzen (siehe `.env.example`).
3. Redeploy. Danach nutzen Schema (`hasMap` / `sameAs`) und die Anfahrt-Links
   den echten Places-Eintrag statt nur der Koordinaten.

---

Die Bestätigung kann nur der Inhaber bzw. eine bevollmächtigte Person
abschließen. Ein Agent oder Entwicklerkonto kann den öffentlichen Pin nicht
stellvertretend freischalten.
