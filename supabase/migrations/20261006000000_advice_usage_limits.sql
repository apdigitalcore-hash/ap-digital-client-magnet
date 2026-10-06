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
-- Deliberately no policies: the anon key must not read or write this directly.
-- Every access goes through the SECURITY DEFINER functions below.

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
grant execute on function public.advice_consume(text, text, integer, integer) to anon, authenticated;
grant execute on function public.advice_refund(text, text) to anon, authenticated;
