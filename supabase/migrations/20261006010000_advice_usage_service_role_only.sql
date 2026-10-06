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
