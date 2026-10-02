-- MARGO Atelier — durable consultations store (Supabase PostgreSQL)
-- Run in Supabase Dashboard → SQL Editor (or via CLI migration).

create table if not exists public.consultations (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  occasion text not null default '',
  event_date text not null default '',
  timeline text not null default '',
  settings jsonb not null default '[]'::jsonb,
  setting_other text not null default '',
  event_city text not null default '',
  budget text not null default '',
  silhouette text not null default '',
  style text not null default '',
  colors jsonb not null default '[]'::jsonb,
  custom_color_note text not null default '',
  measurements jsonb not null default '{}'::jsonb,
  reference_images jsonb not null default '[]'::jsonb,
  reference_notes text not null default '',
  priorities jsonb not null default '[]'::jsonb,
  contact jsonb not null default '{}'::jsonb,
  ai_style_direction jsonb,
  consent_accepted boolean not null default false,
  consent_accepted_at timestamptz,
  consent_version text not null default '',
  preferred_channel text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'scheduled', 'fitting', 'completed')),
  archived boolean not null default false,
  archived_at timestamptz,
  summary_text text not null default ''
);

create index if not exists consultations_created_at_idx
  on public.consultations (created_at desc);

create index if not exists consultations_status_idx
  on public.consultations (status);

create index if not exists consultations_archived_idx
  on public.consultations (archived);

-- Service role bypasses RLS; block direct client access.
alter table public.consultations enable row level security;

drop policy if exists "consultations_deny_clients" on public.consultations;
create policy "consultations_deny_clients"
  on public.consultations
  for all
  to anon, authenticated
  using (false)
  with check (false);

-- Private bucket for reference photos (service role only; do not make public).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'consultation-references',
  'consultation-references',
  false,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
