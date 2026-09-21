# Übergabe — MUC Cargohandling

Stand: 11.09.2026

---

## 1. Was fertig ist

**Website** (alle Seiten live, mobil geprüft)
Startseite, Unternehmen, Luftfracht Import/Export, Airline Handling, Röntgen &
Security, FAQ, Kontakt, Impressum, Datenschutz, AGB.

**Anfragen-Panel** unter `/admin`
Anfragen aus dem Kontaktformular laufen automatisch ein. Pro Anfrage:
Status setzen, Bearbeiter zuweisen, interne Notiz, Antwort verfassen,
vollständiger Bearbeitungsverlauf, Export als CSV, DSGVO-Löschung.

**Team-Verwaltung**
Eigene Zugänge pro Mitarbeiter mit Rollen (Admin / Mitarbeiter), Passwort
zurücksetzen, Konten deaktivieren. Jeder ändert sein Passwort selbst.

**Datenschutz**
Cookie-Banner mit gleichwertigen Schaltflächen, Google Maps erst nach
Einwilligung, keine externen Schriftarten, IP-Adressen nur gehasht
gespeichert, Auftragsverarbeiter in der Datenschutzerklärung benannt.

### Geprüft am 11.09.2026 auf der Live-Seite

Eine echte Testanfrage wurde über das Kontaktformular abgeschickt, erschien mit
Referenz, Thema, Absender und Status im Panel, wurde beantwortet (Eintrag im
Verlauf) und anschließend gelöscht. Alle Seiten liefern HTTP 200, keine
Konsolenfehler.

---

## 2. Zugang zum Panel

**Adresse:** `/admin` (z. B. https://muc-cargo-handling.vercel.app/admin)

**Master-Zugang:** `admin@muc-cargo.de` + das Passwort aus der
Umgebungsvariable `ADMIN_PASSWORD`.

Dieser Zugang funktioniert immer — auch wenn noch keine Benutzer angelegt sind
oder jemand sich ausgesperrt hat. Er ist der Notfallschlüssel und gehört nicht
in Umlauf.

**Erster Schritt nach der Übergabe:** Über *Team* für jede Person einen eigenen
Zugang anlegen. Das System vergibt ein Einmal-Passwort, das beim ersten Login
geändert werden muss. Danach arbeitet niemand mehr mit dem Master-Zugang.

---

## 3. Was noch offen ist

### Push-Benachrichtigungen (Code fertig, zwei Handgriffe fehlen)

1. `supabase/migrations/0003_push_subscriptions.sql` im Supabase-SQL-Editor
   ausführen
2. In Vercel setzen: `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`,
   danach Redeploy

Danach erscheint auf der Übersicht die Karte „Auf diesem Gerät aktivieren".
Auf dem iPhone muss die Seite vorher über *Teilen → Zum Home-Bildschirm*
hinzugefügt werden — Apple erlaubt Web-Push nur dort.

**Den aktuellen Stand zeigt das Panel selbst unter *Einrichtung*.** Diese Seite
prüft bei jedem Aufruf Datenbank, Tabellen, Schlüssel und angemeldete Geräte und
nennt zu jedem offenen Punkt den konkreten nächsten Schritt.

### Eigene Domain

Die Seite läuft noch auf `muc-cargo-handling.vercel.app`. Solange das so ist,
ist sie für Suchmaschinen gesperrt (`robots.txt`), damit die Vorschauadresse
nicht bei Google landet. Sobald die richtige Domain verbunden ist, schaltet
sich das automatisch um. Danach `SITE_URL` in Vercel auf die neue Adresse
setzen.

### Öffnungszeiten

Die Live-Statusanzeige („Jetzt geöffnet · schließt 17:00") ist bewusst
abgeschaltet, weil die Zeiten nicht bestätigt sind. Zum Aktivieren in
`src/lib/company.ts` die echten Zeiten eintragen und `confirmed: true` setzen.

### Google Maps Pin

In Google Maps gibt es noch keinen Eintrag unter dem Firmennamen — deshalb
kein benannter Pin bei der Suche. Die Website zeigt den Standort bereits über
die Bürokoordinaten (Modul H, Pavillon).

Damit der Pin in Maps erscheint:

1. Google Unternehmensprofil anlegen oder klaimen — Felder und Schritte stehen
   unter `/admin/system` und in `docs/GOOGLE-STANDORT.md`
2. Pin manuell auf `48.350443, 11.767121` setzen (nicht den automatischen
   versetzten Places-Pin übernehmen)
3. Nach der Freischaltung Place ID als `GOOGLE_PLACE_ID` in Vercel setzen und
   redeployen

Die Bestätigung (Postkarte / Anruf / Video) muss der Inhaber oder eine
bevollmächtigte Person mit dem Google-Konto der Firma machen.

### E-Mail-Versand

Antworten werden derzeit im eigenen Mailprogramm des Bearbeiters geöffnet
(vorausgefüllt) und im Verlauf protokolliert. Das braucht keine Zugangsdaten
und funktioniert sofort. Ein Versand direkt aus der App würde entweder einen
zentralen Versanddienst oder eine OAuth-Verknüpfung der jeweiligen Postfächer
erfordern — beides bewusst noch nicht umgesetzt.

---

## 4. Technisches

**Stack:** Next.js (App Router), Tailwind, Supabase (PostgREST), Vercel.
Keine Laufzeit-Abhängigkeiten für Datenbank, Mail oder Krypto — alles über
`fetch` und Node-Bordmittel.

**Sicherheit:** Row Level Security auf allen Tabellen ohne Policy — ausschließlich
der Server mit dem Secret Key hat Zugriff. Sitzungen als HMAC-signierte Cookies,
Passwörter mit scrypt gehasht, Anmeldeversuche gedrosselt, CSV-Export gegen
Formel-Injektion abgesichert, strenge Content-Security-Policy.

**Umgebungsvariablen:** siehe `.env.example` und `docs/BACKEND-SETUP.md`.

**Bilder tauschen:** siehe `docs/BILDER-TAUSCH.md`.

---

## 5. Empfehlung vor der Übergabe

1. Die beiden Push-Schritte erledigen und auf dem Handy testen
2. Eigene Zugänge für das Team anlegen, Master-Zugang zurücklegen
3. Öffnungszeiten bestätigen und aktivieren
4. Supabase Secret Key neu erzeugen und in Vercel tauschen — der aktuelle
   wurde während der Entwicklung im Klartext übertragen
5. Domain verbinden, danach `SITE_URL` anpassen
6. Google Unternehmensprofil anlegen (`docs/GOOGLE-STANDORT.md` bzw. `/admin/system`), danach `GOOGLE_PLACE_ID` setzen
