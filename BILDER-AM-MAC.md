# Bilder am Mac einfügen

## Wo liegt der Ordner?

**Ja — der Ordner ist im Projekt**, sobald du das Repository lokal hast.

Im **Finder** zu diesem Pfad gehen (Pfad anpassen, falls du das Repo woanders geklont hast):

```
~/[dein-ordner]/muc-cargo-handling/public/images/
```

Beispiele:
- `~/Documents/muc-cargo-handling/public/images/`
- `~/Developer/muc-cargo-handling/public/images/`

**Schnell im Finder öffnen:** Terminal im Projektordner → `open public/images`

## Repo noch nicht lokal?

```bash
git clone https://github.com/viastefan/muc-cargo-handling.git
cd muc-cargo-handling
git checkout cursor/muc-cargo-website-fa3f   # aktueller Stand mit Website
open public/images
```

## Unterordner

| Ordner | Inhalt |
|--------|--------|
| `home/` | Startseite |
| `unternehmen/` | Über uns (Hero + Stats-Bild) |
| `luftfracht/` | Luftfracht |
| `airline-handling/` | Airline Handling |
| `roentgen/` | Röntgen |
| `kontakt/` | Kontakt |
| `shared/` | Logo, Partner-Logos |

**Wichtig:** Dateinamen exakt wie in `public/images/README.md` — sonst werden die Platzhalter weiter angezeigt.

## Nach dem Ersetzen

```bash
git add public/images
git commit -m "Eigene Bilder eingefügt"
git push
```

Vercel baut die Seite danach automatisch neu.
