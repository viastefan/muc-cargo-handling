-- MUC Cargohandling — Anfragen-Speicher
-- Wird über das Admin-Panel (/admin) bedient. Zugriff ausschließlich mit dem
-- Service-Role-Key vom Server (Next.js API-Routen). Der anon/public Key hat
-- durch aktiviertes RLS ohne Policy keinerlei Lese- oder Schreibrecht.

create extension if not exists "pgcrypto";

create table if not exists public.inquiries (
  id            uuid primary key default gen_random_uuid(),
  reference     text not null unique,
  created_at    timestamptz not null default now(),

  -- Anliegen
  topic         text not null,
  source        text not null default 'website',   -- 'inquiry-flow' | 'contact-form'
  first_name    text not null,
  last_name     text not null,
  company       text,
  email         text not null,
  phone         text,
  message       text not null,

  -- Bearbeitung im Panel
  status        text not null default 'new',        -- 'new' | 'in_progress' | 'done' | 'archived'
  admin_note    text,
  handled_at    timestamptz,

  -- Technische Metadaten (Missbrauchsanalyse, keine Klartext-IP)
  ip_hash       text,
  user_agent    text,

  constraint inquiries_status_check
    check (status in ('new', 'in_progress', 'done', 'archived')),
  constraint inquiries_topic_check
    check (topic in ('luftfracht', 'airline', 'roentgen', 'allgemein'))
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx     on public.inquiries (status);
create index if not exists inquiries_email_idx      on public.inquiries (lower(email));

-- Row Level Security: an, ohne Policy → anon/public Key sieht/schreibt nichts.
alter table public.inquiries enable row level security;
alter table public.inquiries force row level security;

comment on table public.inquiries is
  'Website-Anfragen (Kontaktformular + Anfrage-Flow). Nur Server-seitiger Zugriff via service_role.';
