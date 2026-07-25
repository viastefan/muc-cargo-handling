# MUC Cargo Admin („Atelier“)

## Zugang

1. Öffentliche Website öffnen und in der **Fußzeile auf das Logo** klicken → `/admin`
2. Alternativ direkt: `/admin/login`
3. Passwort (Initial): `muccargo1!`
4. Nach dem Login: Dashboard unter `/admin`

Passwort unter **Einstellungen** ändern. Session-Cookie ist httpOnly (12 Stunden).

Empfohlen in Production: Umgebungsvariable `ADMIN_SESSION_SECRET` setzen.

## News anlegen

1. **News** → **Neue News**
2. Titel, Teaser, Inhalt, Kategorie pflegen
3. Status **Veröffentlicht** oder später **Publish Now**
4. Speichern
5. Öffentlich unter `/news` und `/news/[slug]` (nur `published`; Drafts bleiben unsichtbar)

## Ops-Status setzen

1. **Ops-Status**
2. Level, Titel, Text, optional „Gültig bis“
3. **Öffentlich anzeigen** aktivieren, wenn der Status live bereitstehen soll
4. Speichern

Hinweis: Die bestehende Marketing-Website wurde bewusst **nicht** umgebaut. Status/Banner/Profil liegen im CMS bereit zur späteren Einbindung.

## Anfragen bearbeiten

1. Kontaktformular auf `/kontakt` absenden
2. Eintrag erscheint in **Anfragen**
3. Status: Neu / In Arbeit / Erledigt
4. Interne Notiz speichern, optional löschen

Optional: `CONTACT_WEBHOOK_URL` für zusätzlichen Versand; die Inbox ist die führende Persistenz.

## Persistenz

- Lokal/Node: `data/cms/store.json` (Atomwrite)
- Auf read-only Hosts (typisch Vercel Serverless): Memory-Fallback pro Instanz — Diagnose zeigt den Hinweis
- Für dauerhafte Multi-Instance-Production später Blob/DB anbinden (Store ist zentral vorbereitet)

## Logout / Website

- Sidebar oder Topbar: **Abmelden** / **Zur Website**
