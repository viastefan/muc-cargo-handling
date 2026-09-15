-- MUC Cargohandling — Session-Widerruf für Panel-Benutzer
-- Nach 0003_push_subscriptions.sql ausführen.
--
-- Sitzungs-Cookies sind zustandslose, signierte Tokens (siehe admin-auth.ts)
-- — bisher ohne jede Möglichkeit, ein einmal ausgestelltes Token vor Ablauf
-- (8h) für ungültig zu erklären. Weder "Abmelden" noch ein Passortwechsel
-- hat das gestohlene/alte Cookie tatsächlich entwertet, nur das eigene
-- Browser-Cookie gelöscht bzw. weiterverwendet.
--
-- token_version wird bei jedem Passwortwechsel (eigener oder durch einen
-- Admin zurückgesetzt) sowie bei "Auf allen anderen Geräten abmelden" auf
-- einen neuen Wert gesetzt; jedes Token trägt den Stand zum Ausstellungs-
-- zeitpunkt und wird bei Abweichung beim nächsten Request ungültig
-- (admin-session.ts). Der Master-/Notfall-Zugang (ADMIN_PASSWORD) hat keine
-- Zeile hier — sein Widerruf bleibt die Rotation von ADMIN_SESSION_SECRET.

alter table public.admin_users
  add column if not exists token_version bigint not null default 0;
