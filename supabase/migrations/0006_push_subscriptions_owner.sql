-- MUC Cargohandling — Geräte einem Benutzer zuordnen
-- Nach 0005_inquiry_history_integrity.sql ausführen.
--
-- push_subscriptions kannte bisher keinen Besitzer (geteilter Geräte-Pool)
-- — jede neue Anfrage weckte jedes registrierte Gerät, unabhängig davon,
-- wer zuständig ist. user_id ist nullable: der Master-/Notfall-Zugang hat
-- keine Zeile in admin_users und kann daher weiterhin ohne Besitzer
-- registrieren (bekommt dann nur noch Broadcasts, keine gezielte
-- Zuweisungs-Benachrichtigung).

alter table public.push_subscriptions
  add column if not exists user_id uuid references public.admin_users (id) on delete cascade;

create index if not exists push_subscriptions_user_idx on public.push_subscriptions (user_id);
