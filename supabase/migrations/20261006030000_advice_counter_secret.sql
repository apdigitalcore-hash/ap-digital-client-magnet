-- Let the API reach the counter without an edge function.
--
-- The plan was for a Supabase edge function to own the counter, so the service
-- role key never left the platform. Lovable only deploys edge functions its own
-- agent writes — a function pushed from GitHub is never picked up — so that
-- route needs a paid chat message every time this changes. Not a foundation.
--
-- Instead the counter functions take a shared secret and check it themselves.
-- They stay SECURITY DEFINER, the tables stay unreachable, and anon may call
-- them but can do nothing without the secret. PostgREST only exposes `public`,
-- so a caller cannot read the function body to learn it either.
--
-- The secret lives in advice_config, a table only these functions can read.
-- Rotating it is one update plus the matching change in the API.

create table if not exists public.advice_config (
  key   text primary key,
  value text not null
);
alter table public.advice_config enable row level security;
revoke all on table public.advice_config from anon, authenticated;
-- No policies and no grants: unreachable except through the definer functions.

create or replace function public.advice_consume(
  p_secret       text,
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
  if p_secret is null or p_secret <> (select value from advice_config where key = 'secret') then
    return jsonb_build_object('allowed', false, 'reason', 'unauthorised');
  end if;

  select coalesce(used, 0) into g
    from advice_usage where day = d and scope = 'global' and key = '';
  g := coalesce(g, 0);

  if g >= p_global_limit then
    return jsonb_build_object('allowed', false, 'reason', 'global',
                              'global_used', g, 'global_limit', p_global_limit);
  end if;

  select greatest(
    coalesce((select used from advice_usage where day = d and scope = 'person' and key = p_person_key), 0),
    coalesce((select used from advice_usage where day = d and scope = 'ip'     and key = p_ip_key),     0)
  ) into p;

  if p >= p_person_limit then
    return jsonb_build_object('allowed', false, 'reason', 'person',
                              'person_used', p, 'person_limit', p_person_limit);
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

  return jsonb_build_object('allowed', true,
                            'global_used', g, 'global_limit', p_global_limit,
                            'person_used', p, 'person_limit', p_person_limit);
end;
$$;

create or replace function public.advice_refund(
  p_secret     text,
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
  if p_secret is null or p_secret <> (select value from advice_config where key = 'secret') then
    return;
  end if;
  update advice_usage set used = greatest(used - 1, 0)
    where day = d and ((scope = 'global' and key = '')
                    or (scope = 'person' and key = p_person_key)
                    or (scope = 'ip'     and key = p_ip_key));
end;
$$;

/** One row per simulation. Same secret, so the table cannot be filled with noise. */
create or replace function public.advice_record(
  p_secret text,
  p_row    jsonb
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_secret is null or p_secret <> (select value from advice_config where key = 'secret') then
    return;
  end if;
  insert into advice_runs (
    channel, industry, objective, budget, currency,
    creative_score, confidence, landing_status, handoff, model, ms, person_key
  ) values (
    p_row->>'channel', p_row->>'industry', p_row->>'objective',
    nullif(p_row->>'budget','')::integer, p_row->>'currency',
    nullif(p_row->>'creativeScore','')::integer, p_row->>'confidence',
    p_row->>'landingStatus', coalesce((p_row->>'handoff')::boolean, false),
    p_row->>'model', nullif(p_row->>'ms','')::integer, nullif(p_row->>'personKey','')
  );
end;
$$;

-- The old no-secret signatures must not survive: they would be an open door.
drop function if exists public.advice_consume(text, text, integer, integer);
drop function if exists public.advice_refund(text, text);

revoke all on function public.advice_consume(text, text, text, integer, integer) from public;
revoke all on function public.advice_refund(text, text, text)                    from public;
revoke all on function public.advice_record(text, jsonb)                         from public;

grant execute on function public.advice_consume(text, text, text, integer, integer) to anon, authenticated, service_role;
grant execute on function public.advice_refund(text, text, text)                    to anon, authenticated, service_role;
grant execute on function public.advice_record(text, jsonb)                         to anon, authenticated, service_role;

-- ─────────────────────────────────────────────────────────────────────────
-- LAST STEP: replace PASTE_SECRET_HERE below with your secret, then run.
-- It must match ADVICE_BUDGET_SECRET in Vercel exactly.
-- ─────────────────────────────────────────────────────────────────────────
insert into public.advice_config (key, value)
values ('secret', 'PASTE_SECRET_HERE')
on conflict (key) do update set value = excluded.value;
