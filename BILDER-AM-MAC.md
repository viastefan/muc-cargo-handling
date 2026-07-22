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
| `shared/` | **logo.png**, **weltkugel.png**, **partner-vk-freight.png** |

### Shared-Dateien (umbenennen falls nötig)

| Deine Datei → Zielname |
|------------------------|
| MUC Logo → `shared/logo.png` |
| Rote Weltkugel → `shared/weltkugel.png` |
| VK Freight Management Logo → `shared/partner-vk-freight.png` |

**Wichtig:** Dateinamen exakt wie in `public/images/README.md` — sonst werden die Platzhalter weiter angezeigt.

## Nach dem Ersetzen

```bash
git add public/images
git commit -m "Eigene Bilder eingefügt"
git push
```

Vercel baut die Seite danach automatisch neu.

---

## Häufiger Fehler: „nothing to commit“ / Bilder werden nicht gepusht

**Symptom:** Im Finder liegen PNG/JPG-Dateien **direkt im Projektordner** (`muc-cargo-handling/` neben `package.json`) — und `git add public/images` meldet *nothing to commit*.

**Ursache:** Git trackt nur Dateien **in** `public/images/…`. Bilder im Projekt-Root sind für Git „untracked“ und werden mit `git add public/images` **nicht** erfasst.

**So prüfen (Terminal im Projektordner):**

```bash
git status
```

Stehen die Bilder unter *Untracked files* mit Namen wie `Gemini_Generated_…` oder `managers-walking…` **ohne** Pfad `public/images/` → falscher Ort.

**Richtig:**

1. Finder: `open public/images` (oder manuell in `public/images/home/`, `luftfracht/` usw.)
2. Bilder **dorthin verschieben** (nicht nur kopieren lassen im Root)
3. **Umbenennen** wie in `public/images/README.md` (z. B. `home/hero.jpg`, `shared/logo.png`)
4. Dann:

```bash
git status                    # sollte public/images/… zeigen
git add public/images
git commit -m "Eigene Bilder eingefügt"
git push
```

**Nicht** die rohen Gemini/ChatGPT-Dateien im Projekt-Root committen — die gehören nach dem Umbenennen in die Unterordner unter `public/images/`.

### Kurz-Checkliste

| Schritt | OK? |
|--------|-----|
| Bild liegt unter `public/images/home/hero.jpg` (Beispiel) | ☐ |
| Dateiname stimmt mit README überein | ☐ |
| `git status` zeigt `new file: public/images/...` | ☐ |
| `git commit` ausgeführt | ☐ |
| `git push` auf dem richtigen Branch | ☐ |

Aktueller Website-Branch (falls abweichend): `main` oder Feature-Branches wie `cursor/luftfracht-ui-fa3f` — mit `git branch` prüfen.
