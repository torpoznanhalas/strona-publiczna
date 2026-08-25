-- Uruchom cały plik w Supabase: SQL Editor > New query > Run.

create extension if not exists pgcrypto;

create table if not exists public.supporters (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  first_name text not null check (char_length(first_name) between 2 and 80),
  last_initial text not null check (char_length(last_initial) = 1),
  city text not null check (char_length(city) between 2 and 100),
  postal_code text,
  email text not null unique,
  adult_confirmed boolean not null default false,
  public_display_consent boolean not null default false,
  privacy_version text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'withdrawn')),
  ip_hash text,
  user_agent text,
  moderator_note text
);

alter table public.supporters add column if not exists utm_source text;
alter table public.supporters add column if not exists utm_medium text;
alter table public.supporters add column if not exists utm_campaign text;
alter table public.supporters add column if not exists utm_content text;

create index if not exists supporters_status_idx on public.supporters(status);
create index if not exists supporters_created_at_idx on public.supporters(created_at desc);
create index if not exists supporters_ip_hash_idx on public.supporters(ip_hash, created_at desc);

alter table public.supporters enable row level security;

-- Anonimowe zdarzenia lejka. Nie zapisujemy tu danych formularza, IP ani user-agenta.
create table if not exists public.support_funnel_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  session_id uuid not null,
  event_name text not null check (
    event_name in (
      'page_view',
      'landing_page_view',
      'support_form_view',
      'support_section_view',
      'support_form_start',
      'support_form_success'
    )
  ),
  page_path text not null default '/' check (char_length(page_path) between 1 and 200),
  utm_source text check (utm_source is null or char_length(utm_source) <= 200),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 200),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 200),
  utm_content text check (utm_content is null or char_length(utm_content) <= 200)
);

alter table public.support_funnel_events
  add column if not exists page_path text not null default '/';

alter table public.support_funnel_events
  drop constraint if exists support_funnel_events_page_path_check;
alter table public.support_funnel_events
  add constraint support_funnel_events_page_path_check check (
    char_length(page_path) between 1 and 200
  );

alter table public.support_funnel_events
  drop constraint if exists support_funnel_events_event_name_check;
alter table public.support_funnel_events
  add constraint support_funnel_events_event_name_check check (
    event_name in (
      'page_view',
      'landing_page_view',
      'support_form_view',
      'support_section_view',
      'support_form_start',
      'support_form_success'
    )
  );

alter table public.support_funnel_events
  drop constraint if exists support_funnel_events_session_id_event_name_key;
create unique index if not exists support_funnel_events_session_event_path_uidx
  on public.support_funnel_events(session_id, event_name, page_path);

create index if not exists support_funnel_events_created_at_idx
  on public.support_funnel_events(created_at desc);
create index if not exists support_funnel_events_utm_content_idx
  on public.support_funnel_events(utm_content, event_name);

alter table public.support_funnel_events enable row level security;

-- Nie tworzymy polityk dla anon/authenticated. Dane są obsługiwane wyłącznie
-- przez serwerowy endpoint korzystający z service_role, który nie trafia do przeglądarki.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists supporters_set_updated_at on public.supporters;
create trigger supporters_set_updated_at
before update on public.supporters
for each row execute function public.set_updated_at();

-- Widok pomocniczy dla moderatorów w panelu Supabase.
create or replace view public.supporters_moderation
with (security_invoker = true)
as
select
  id,
  created_at,
  first_name,
  last_initial,
  city,
  postal_code,
  email,
  public_display_consent,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_content,
  status,
  moderator_note
from public.supporters
order by created_at desc;

-- Gotowy przekrój lejka kampanii po kreacji reklamowej.
create or replace view public.support_funnel_by_content
with (security_invoker = true)
as
select
  page_path,
  coalesce(utm_content, '(brak)') as utm_content,
  count(distinct session_id) filter (
    where event_name in ('page_view', 'landing_page_view')
  ) as visits,
  count(distinct session_id) filter (
    where event_name in ('support_form_view', 'support_section_view')
  ) as form_views,
  count(distinct session_id) filter (where event_name = 'support_form_start') as form_starts,
  count(distinct session_id) filter (where event_name = 'support_form_success') as form_successes
from public.support_funnel_events
group by page_path, coalesce(utm_content, '(brak)')
order by form_successes desc, visits desc;
