-- =====================================================================
-- TECEX — Supabase schema
-- Run once: Supabase Dashboard > SQL Editor > New query > paste > Run.
-- Safe to re-run.
-- =====================================================================

-- 1) One table: every enquiry from the website form lands here.
create table if not exists public.enquiries (
  id         uuid        primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text        not null check (char_length(name) between 2 and 100),
  email      text        not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone      text        check (phone   is null or char_length(phone)   <= 30),
  company    text        check (company is null or char_length(company) <= 150),
  service    text        check (service is null or char_length(service) <= 100),
  message    text        not null check (char_length(message) between 5 and 2000),
  status     text        not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

-- 2) Lock the table down. With RLS on and no policy, nobody can do anything.
alter table public.enquiries enable row level security;

-- 3) Visitors (anon key) may INSERT new enquiries only.
--    There is deliberately NO select / update / delete policy, so the public
--    can never read or change other people's enquiries.
--    You read them in the Dashboard > Table Editor (the dashboard is not restricted by RLS).
drop policy if exists "Anyone can submit an enquiry" on public.enquiries;
create policy "Anyone can submit an enquiry"
  on public.enquiries
  for insert
  to anon, authenticated
  with check (status = 'new');

-- 4) Table-level permission: insert only.
grant insert on public.enquiries to anon, authenticated;
