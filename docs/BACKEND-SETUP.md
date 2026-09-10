# Backend-Setup — Anfragen, Admin-Panel, Benachrichtigungen

Die Website läuft ohne Backend als reine Marketing-Seite. Sobald die folgenden
Umgebungsvariablen gesetzt sind, werden Anfragen dauerhaft gespeichert, im
Admin-Panel bearbeitbar und per E-Mail/SMS zugestellt.

## 1. Supabase (Datenspeicher)

Projekt: `MUC CARGOHANDLING` · Ref `cjlvghyrmcbrnekqszwr`

**Migration** (einmalig, Supabase → SQL Editor → New query → Run):
Inhalt von `supabase/migrations/0001_inquiries.sql` einfügen und ausführen.
Die Tabelle `inquiries` hat RLS aktiviert **ohne Policy** → nur der Server mit
dem Secret Key kommt an die Daten, der publishable Key nicht.

**Keys** (Supabase → Project Settings → API Keys):

| Env-Variable | Wert |
|---|---|
| `SUPABASE_URL` | `https://cjlvghyrmcbrnekqszwr.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | der **secret** Key (`sb_secret_…`) — nur serverseitig! |

> Empfehlung: Den Secret Key nach dem Launch einmal in Supabase rotieren und
> nur in Vercel / `.env.local` führen.

## 2. Admin-Panel (`/admin`)

| Env-Variable | Wert |
|---|---|
| `ADMIN_PASSWORD` | mind. 12 Zeichen, zufällig |
| `ADMIN_SESSION_SECRET` | `openssl rand -hex 32` |
| `IP_HASH_SALT` | `openssl rand -hex 16` (salzt den IP-Hash in der DB) |

Login: `https://<domain>/admin/login`. Session-Cookie 8 h, HttpOnly, Secure.
Ohne `ADMIN_PASSWORD` ist `/admin` komplett gesperrt.

## 3. E-Mail-Versand (Resend)

Ohne diese Variablen wird nur geloggt — die Website funktioniert weiter.

1. Account auf [resend.com](https://resend.com) anlegen (Gratis-Tier reicht).
2. Domain `muc-cargo.de` verifizieren (DNS-Records aus Resend übernehmen).
   Bis dahin testweise Absender `onboarding@resend.dev` (nur an eigene Adresse).
3. API-Key erzeugen.

| Env-Variable | Beispiel |
|---|---|
| `RESEND_API_KEY` | `re_…` |
| `MAIL_FROM` | `MUC Cargohandling <anfrage@muc-cargo.de>` |
| `MAIL_REPLY_TO` | `info@muc-cargo.de` |
| `INQUIRY_NOTIFY_TO` | `info@muc-cargo.de,stefandirnberger@viawen.com` |

Der Kunde erhält eine gebrandete Eingangsbestätigung, das Team eine
Benachrichtigung mit „Im Panel öffnen"-Button.

## 4. SMS-Versand (Twilio, optional)

| Env-Variable | Wert |
|---|---|
| `TWILIO_ACCOUNT_SID` | `AC…` |
| `TWILIO_AUTH_TOKEN` | … |
| `TWILIO_FROM` | gekaufte Twilio-Nummer (E.164) |
| `INQUIRY_SMS_TO` | `+491637044875,+4917620047750` |

Kosten: ~1 €/Monat je Nummer + ~0,08 €/SMS. In DE ggf. A2P-Registrierung nötig.

## 5. Sonstiges

| Env-Variable | Zweck |
|---|---|
| `SITE_URL` | `https://www.muc-cargo.de` — absolute Links in E-Mails, Sitemap, robots |
| `CONTACT_WEBHOOK_URL` | optionaler zusätzlicher JSON-Webhook |

## 6. In Vercel eintragen

Project → Settings → Environment Variables → alle obigen Werte für
**Production** (und Preview) hinterlegen → Redeploy.

## Lokaler Test

`.env.local` ist bereits mit Supabase + Admin-Werten befüllt (gitignored).
`npm run dev`, dann `http://localhost:3000/admin/login`.
