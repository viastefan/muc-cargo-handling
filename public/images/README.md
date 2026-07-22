# Bilder für die Website

Kopiere deine Bilder in die passenden Ordner. **Dateinamen exakt einhalten.**

## Shared (`shared/`) — Logo & Grafiken

| Datei | Verwendung |
|-------|------------|
| **`logo.png`** | MUC Cargo Handling Logo (Header, Partner-Bereich) |
| `logo.svg` | Fallback, falls PNG fehlt |
| **`weltkugel.png`** | Rote Weltkugel — letzter roter CTA-Abschnitt (alle Seiten) |
| **`partner-vk-freight.png`** | VK Freight Management Logo (Röntgen-Seite) |

> Falls deine Dateien anders heißen: im Finder umbenennen oder in `src/lib/media.ts` anpassen.

## Startseite (`home/`)

| Datei | Verwendung |
|-------|------------|
| `hero.jpg` | Hero (z. B. Frachtflugzeug) |
| `service-roentgen.jpg` | Kachel Röntgenkontrolle |
| `service-sichtkontrolle.jpg` | Kachel Sichtkontrolle |
| `service-handdurchsuchung.jpg` | Kachel Handdurchsuchung |
| `service-etd.jpg` | Kachel ETD |

## Unternehmen (`unternehmen/`)

| Datei | Verwendung |
|-------|------------|
| `hero.jpg` | Hero „Über MUC Cargo Handling“ (Team/Büro) |
| `stats.jpg` | Großes Bild über den Statistik-Kacheln |

## Luftfracht (`luftfracht/`)

| Datei | Verwendung |
|-------|------------|
| `hero.jpg` | Hero Luftfracht |
| `service-1.jpg` … `service-4.jpg` | Service-Kacheln |

## Airline Handling (`airline-handling/`)

| Datei | Verwendung |
|-------|------------|
| `hero.jpg` | Hero Cargo-Hold / Airline |
| `import-export.jpg` | Import & Export |
| `dokumente.jpg` | Dokumentenmanagement |
| `zoll.jpg` | Zoll & Compliance |
| `uld.jpg` | ULD-Handling |

## Röntgen (`roentgen/`)

| Datei | Verwendung |
|-------|------------|
| `hero.jpg` | Hero Sicherheit / Monitore |
| `kontrolle-roentgen.jpg` | Röntgenkontrolle |
| `kontrolle-sicht.jpg` | Sichtkontrolle |
| `kontrolle-hand.jpg` | Handdurchsuchung |
| `kontrolle-etd.jpg` | ETD |

## Kontakt (`kontakt/`)

| Datei | Verwendung |
|-------|------------|
| `hero.jpg` | Hero Kontakt |

## Nach dem Kopieren

```bash
git add public/images
git commit -m "Eigene Bilder und Logos"
git push
```
