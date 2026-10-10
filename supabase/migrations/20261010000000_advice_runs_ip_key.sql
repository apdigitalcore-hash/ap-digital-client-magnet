-- Repeat use was only countable for people who had given an email.
--
-- person_key is a hash of the email, and the email gate only appears on
-- someone's second simulation — so every first-time run was recorded with an
-- empty key. 8 of the first 14 rows had no key at all, which means anyone who
-- tried ADvice once and left was invisible, and a returning visitor whose
-- first email-bearing run was their second visit looked like a new person.
--
-- Repeat use is the number the paid tier rests on, and that blind spot could
-- only ever make it read low.
--
-- The hashed IP is already computed on every request for the daily limit
-- (p_ip_key on advice_consume) and then thrown away. Keep it.
--
-- It is deliberately a SEPARATE column, not a backfill of person_key. IP is a
-- blurrier identity: an office shares one, and one person on wifi then
-- cellular looks like two. So email-keyed repeat use stays the honest figure
-- and the IP figure is a loose upper bound. Two numbers, and it stays obvious
-- which one to trust.

alter table public.advice_runs add column if not exists ip_key text;

create index if not exists advice_runs_ip_idx on public.advice_runs (ip_key);

-- Same insert, plus ip_key. Unchanged otherwise, including the secret check.
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
    creative_score, confidence, landing_status, handoff, model, ms,
    person_key, ip_key
  ) values (
    p_row->>'channel', p_row->>'industry', p_row->>'objective',
    nullif(p_row->>'budget','')::integer, p_row->>'currency',
    nullif(p_row->>'creativeScore','')::integer, p_row->>'confidence',
    p_row->>'landingStatus', coalesce((p_row->>'handoff')::boolean, false),
    p_row->>'model', nullif(p_row->>'ms','')::integer,
    nullif(p_row->>'personKey',''), nullif(p_row->>'ipKey','')
  );
end;
$$;

revoke all on function public.advice_record(text, jsonb) from public;
grant execute on function public.advice_record(text, jsonb) to anon, authenticated, service_role;

/**
 * Repeat use counted by IP instead of email — the loose upper bound.
 *
 * advice_repeat_use(days) is unchanged and remains the figure to quote. This
 * one covers the people who never reached the email gate, at the cost of
 * conflating anyone who shares an IP. Read them side by side: the truth is
 * somewhere between, and a large gap means most visitors leave before the gate.
 */
create or replace function public.advice_repeat_use_ip(p_days integer default 30)
returns table (runs_total bigint, ips bigint, ips_repeat bigint, runs_per_ip numeric)
language sql
security definer
set search_path = public
as $$
  with per as (
    select ip_key, count(*) n
      from advice_runs
     where created_at > now() - make_interval(days => p_days)
       and ip_key is not null and ip_key <> ''
     group by ip_key
  )
  select
    (select count(*) from advice_runs where created_at > now() - make_interval(days => p_days)),
    (select count(*) from per),
    (select count(*) from per where n > 1),
    (select round(avg(n), 2) from per);
$$;

revoke all on function public.advice_repeat_use_ip(integer) from public, anon, authenticated;
grant execute on function public.advice_repeat_use_ip(integer) to service_role;
