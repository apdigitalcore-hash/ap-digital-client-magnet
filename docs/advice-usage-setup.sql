-- ADvice: counter + usage. Run once in Lovable → Cloud → SQL editor.
-- Safe to re-run.

-- ADvice usage limits.
--
-- The Gemini key is on the free tier: 20 generateContent calls a day, for the
-- whole tool. That is a permanent design constraint, so the limits have to be
-- enforced somewhere every serverless instance can see. Vercel functions do
-- not share memory, so an in-process counter cannot hold a global ceiling —
-- this table is the shared counter.
--
-- Keys are SHA-256 hashes computed by the API, never raw emails or IPs, so
-- this table holds no personal data.

create table if not exists public.advice_usage (
  day   date    not null,
  scope text    not null check (scope in ('global', 'person', 'ip')),
  key   text    not null,
  used  integer not null default 0,
  constraint advice_usage_pkey primary key (day, scope, key)
);

alter table public.advice_usage enable row level security;
-- Deliberately no policies, and no grants: with RLS on and nothing granted,
-- neither anon nor authenticated can read or write a row by any route. Every
-- access goes through the SECURITY DEFINER functions below, which are
-- executable by service_role alone.
revoke all on table public.advice_usage from anon, authenticated;

create index if not exists advice_usage_day_idx on public.advice_usage (day);

/**
 * Takes one simulation off the budget, or explains why it cannot.
 *
 * Checks the global ceiling before the per-person one so a spent day is
 * reported as ours rather than as the visitor's fault.
 */
create or replace function public.advice_consume(
  p_person_key   text,
  p_ip_key       text,
  p_person_limit integer,
  p_global_limit integer
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  d date := (now() at time zone 'utc')::date;
  g integer;
  p integer;
begin
  select coalesce(used, 0) into g
    from advice_usage where day = d and scope = 'global' and key = '';
  g := coalesce(g, 0);

  if g >= p_global_limit then
    return jsonb_build_object(
      'allowed', false, 'reason', 'global',
      'global_used', g, 'global_limit', p_global_limit
    );
  end if;

  -- Whichever of email or IP is further along: using a fresh email from the
  -- same connection should not reset the allowance.
  select greatest(
    coalesce((select used from advice_usage where day = d and scope = 'person' and key = p_person_key), 0),
    coalesce((select used from advice_usage where day = d and scope = 'ip'     and key = p_ip_key),     0)
  ) into p;

  if p >= p_person_limit then
    return jsonb_build_object(
      'allowed', false, 'reason', 'person',
      'person_used', p, 'person_limit', p_person_limit
    );
  end if;

  insert into advice_usage (day, scope, key, used) values (d, 'global', '', 1)
    on conflict (day, scope, key) do update set used = advice_usage.used + 1
    returning used into g;

  if coalesce(p_person_key, '') <> '' then
    insert into advice_usage (day, scope, key, used) values (d, 'person', p_person_key, 1)
      on conflict (day, scope, key) do update set used = advice_usage.used + 1;
  end if;

  insert into advice_usage (day, scope, key, used) values (d, 'ip', p_ip_key, 1)
    on conflict (day, scope, key) do update set used = advice_usage.used + 1
    returning used into p;

  return jsonb_build_object(
    'allowed', true,
    'global_used', g, 'global_limit', p_global_limit,
    'person_used', p, 'person_limit', p_person_limit
  );
end;
$$;

/**
 * Gives a slot back when the simulation never ran.
 *
 * A visitor whose run died on a crash or on Gemini's own quota has used none
 * of their three, and should not be charged for our failure.
 */
create or replace function public.advice_refund(
  p_person_key text,
  p_ip_key     text
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  d date := (now() at time zone 'utc')::date;
begin
  update advice_usage set used = greatest(used - 1, 0)
    where day = d and ((scope = 'global' and key = '')
                    or (scope = 'person' and key = p_person_key)
                    or (scope = 'ip'     and key = p_ip_key));
end;
$$;

revoke all on function public.advice_consume(text, text, integer, integer) from public;
revoke all on function public.advice_refund(text, text) from public;
-- service_role only. The publishable key ships in the client bundle, so
-- anything anon can execute, a visitor can execute — and advice_refund would
-- hand them an unlimited supply of simulations.
grant execute on function public.advice_consume(text, text, integer, integer) to service_role;
grant execute on function public.advice_refund(text, text) to service_role;

-- Harden the ADvice usage counter.
--
-- The first version locked the table correctly — RLS on, no policies, so the
-- anon key cannot read or write a row directly — but it granted EXECUTE on
-- both functions to anon. The publishable key is in the client bundle, so
-- anyone could call them:
--
--   advice_refund  — decrements the counters. Called in a loop it drives the
--                    global counter to zero, which bypasses the daily ceiling
--                    entirely. This is the serious one.
--   advice_consume — burns the day's budget for everyone.
--
-- Both now require service_role, a key that only the server holds. anon keeps
-- nothing at all.

revoke all on table public.advice_usage from anon, authenticated;

revoke execute on function public.advice_consume(text, text, integer, integer) from anon, authenticated, public;
revoke execute on function public.advice_refund(text, text)                     from anon, authenticated, public;

grant execute on function public.advice_consume(text, text, integer, integer) to service_role;
grant execute on function public.advice_refund(text, text)                     to service_role;

-- The functions run as their owner, so pin that explicitly rather than relying
-- on whichever role happened to apply the migration.
alter function public.advice_consume(text, text, integer, integer) owner to postgres;
alter function public.advice_refund(text, text)                     owner to postgres;

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
