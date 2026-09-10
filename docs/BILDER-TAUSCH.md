# Bild-Dubletten — was noch getauscht werden muss

Fünf Bildpaare sind aktuell **inhaltsgleich** (dieselbe Datei doppelt genutzt).
Jeweils **eine** Seite behält das Bild, die andere Datei muss ersetzt werden.
Dateiname exakt beibehalten, einfach in `public/images/…` überschreiben.

| Datei (ersetzen) | zeigt aktuell dasselbe wie | Verwendung | Motiv-Vorschlag |
|---|---|---|---|
| `airline-handling/cargo-tarmac.jpg` | `luftfracht/intro-band.jpg` | Karte „Import & Export Handling" | Palette/ULD auf dem Vorfeld, Cargo-Schlepper |
| `airline-handling/aircraft-loading.jpg` | `kontakt/hero.jpg` | Karte „Sicherheits- und ULD-Handling" | ULD-Container / Beladung Frachtraum mit Netz |
| `luftfracht/hero.jpg` | `airline-handling/warehouse-check.jpg` | Hero Luftfracht-Seite | weite Cargo-Szene, Frachtflugzeug / Cargo-Halle |
| `luftfracht/service-1.jpg` | `airline-handling/crate-inspection.jpg` | Karte „Annahme & Erfassung" | Wareneingang, Scannen/Tablet an der Rampe |
| `luftfracht/service-4.jpg` | `luftfracht/documentation-desk.jpg` | Karte „Übergabe & Tracking" | Übergabe, Dolly Richtung Flugzeug, Handscanner |

Zusätzlich vom Auftraggeber gewünscht:

| Datei (ersetzen) | Verwendung | Motiv-Vorschlag |
|---|---|---|
| `roentgen/kontrolle-hand.jpg` | Karte „Handdurchsuchung" (Röntgen-Seite) | behandschuhte Hände, die ein Paket/Kiste manuell prüfen — **kein** Röntgen-Monitor |

## Nach dem Ersetzen

```bash
git add public/images
git commit -m "Eigene Bilder — Dubletten ersetzt"
git push
```

Kein Rebuild nötig für den lokalen Dev-Server — Refresh genügt. Vercel baut
nach dem Push automatisch neu.

## Alternativ: Unsplash-Key

Mit einem kostenlosen Unsplash Access Key (unsplash.com/developers) kann der
Tausch automatisiert erfolgen — Key an Claude geben.
