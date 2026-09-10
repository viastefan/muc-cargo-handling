-- MUC Cargohandling — Admin-Benutzer, Zuweisung, Aktivitätsprotokoll
-- Nach 0001_inquiries.sql ausführen. Wieder RLS an, keine Policy → nur der
-- Server (Service-Role-Key) hat Zugriff.

-- ── Admin-Benutzer ─────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  id             uuid primary key default gen_random_uuid(),
  email          text not null unique,
  name           text not null,
  password_hash  text not null,               -- scrypt: <salt-hex>:<hash-hex>
  role           text not null default 'member',  -- 'admin' | 'member'
  active         boolean not null default true,
  created_at     timestamptz not null default now(),
  last_login_at  timestamptz,
  must_change_pw boolean not null default true,
  constraint admin_users_role_check check (role in ('admin', 'member'))
);

create index if not exists admin_users_email_idx on public.admin_users (lower(email));

alter table public.admin_users enable row level security;
alter table public.admin_users force row level security;

-- ── Anfragen: Zuweisung ───────────────────────────────────────────────────
alter table public.inquiries
  add column if not exists assigned_to uuid references public.admin_users(id) on delete set null;

create index if not exists inquiries_assigned_idx on public.inquiries (assigned_to);

-- ── Aktivitätsprotokoll ───────────────────────────────────────────────────
create table if not exists public.inquiry_events (
  id           bigint generated always as identity primary key,
  inquiry_ref  text not null,
  created_at   timestamptz not null default now(),
  actor_name   text not null,
  kind         text not null,                 -- 'status' | 'assign' | 'note' | 'created'
  detail       text
);

create index if not exists inquiry_events_ref_idx on public.inquiry_events (inquiry_ref, created_at desc);

alter table public.inquiry_events enable row level security;
alter table public.inquiry_events force row level security;

comment on table public.admin_users is
  'Benutzer des internen Anfragen-Panels. Passwörter als scrypt-Hash.';
comment on table public.inquiry_events is
  'Bearbeitungsverlauf je Anfrage (Status, Zuweisung, Notiz).';
