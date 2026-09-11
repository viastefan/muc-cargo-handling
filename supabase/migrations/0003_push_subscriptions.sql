-- MUC Cargohandling — Push-Abos für Benachrichtigungen bei neuen Anfragen
-- Nach 0002_admin_users.sql ausführen. Wieder RLS an, keine Policy → nur der
-- Server (Service-Role-Key) hat Zugriff.

create table if not exists public.push_subscriptions (
  id          uuid primary key default gen_random_uuid(),
  endpoint    text not null unique,
  p256dh      text not null,
  auth        text not null,
  label       text,                        -- z. B. "iPhone von Stefan"
  created_at  timestamptz not null default now(),
  last_ok_at  timestamptz,
  fail_count  int not null default 0
);

create index if not exists push_subscriptions_created_idx
  on public.push_subscriptions (created_at desc);

alter table public.push_subscriptions enable row level security;
alter table public.push_subscriptions force row level security;

comment on table public.push_subscriptions is
  'Web-Push-Abos der Panel-Nutzer (RFC 8291). Endpoint ist eindeutig pro Gerät.';
