-- What ADvice is actually being used for.
--
-- Nothing records a simulation today, so the question behind the paid tier —
-- do people run more than one, and for what — has no evidence either way.
-- This is that evidence, and it is deliberately not a list of people:
-- person_key is the same SHA-256 hash the counter uses, which makes repeat
-- use countable without storing an email address.

create table if not exists public.advice_runs (
  id             uuid        primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),

  -- what they asked for
  channel        text,
  industry       text,
  objective      text,
  budget         integer,
  currency       text,

  -- what came back
  creative_score integer,
  confidence     text,

  -- how it went
  landing_status text,     -- ok | blocked | empty | parked | unreachable | none
  handoff        boolean   not null default false,
  model          text,
  ms             integer,

  -- hashed, never the address itself: lets "ran more than once" be counted
  -- without the table becoming a mailing list
  person_key     text
);

alter table public.advice_runs enable row level security;
revoke all on table public.advice_runs from anon, authenticated;
-- No policies and no grants: only the service role, through the edge function.

create index if not exists advice_runs_created_idx on public.advice_runs (created_at desc);
create index if not exists advice_runs_person_idx  on public.advice_runs (person_key);

/** Repeat use, which is the number the whole paid-tier idea rests on. */
create or replace function public.advice_repeat_use(p_days integer default 30)
returns table (runs_total bigint, people bigint, people_repeat bigint, runs_per_person numeric)
language sql
security definer
set search_path = public
as $$
  with per as (
    select person_key, count(*) n
      from advice_runs
     where created_at > now() - make_interval(days => p_days)
       and person_key is not null and person_key <> ''
     group by person_key
  )
  select
    (select count(*) from advice_runs where created_at > now() - make_interval(days => p_days)),
    (select count(*) from per),
    (select count(*) from per where n > 1),
    (select round(avg(n), 2) from per);
$$;

revoke all on function public.advice_repeat_use(integer) from public, anon, authenticated;
grant execute on function public.advice_repeat_use(integer) to service_role;
