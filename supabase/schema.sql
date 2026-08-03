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

create index if not exists supporters_status_idx on public.supporters(status);
create index if not exists supporters_created_at_idx on public.supporters(created_at desc);
create index if not exists supporters_ip_hash_idx on public.supporters(ip_hash, created_at desc);

alter table public.supporters enable row level security;

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
  status,
  moderator_note
from public.supporters
order by created_at desc;
