# ADvice: finishing the daily-limit setup

Two steps, both needing a login I can't do. Ten minutes total.

## 1. Create the counter (Supabase)

The counter lives in Postgres because Vercel functions share no memory, so a
global ceiling cannot live inside one.

1. Open the SQL editor:
   https://supabase.com/dashboard/project/pgivuezbonyqqbaazfnp/sql/new
2. Paste the whole of `docs/advice-usage-setup.sql` and run it.
3. Confirm it worked — this should return one row, `advice_usage`:
   ```sql
   select tablename from pg_tables where tablename = 'advice_usage';
   ```

It is safe to run twice.

## 2. Point the API at it (Vercel)

Project: **advice-api** → Settings → Environment Variables. Add two, for
Production:

| Name | Value |
| --- | --- |
| `SUPABASE_URL` | `https://pgivuezbonyqqbaazfnp.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | the **service_role** key from Supabase → Settings → API |

**It must be the service_role key, not the anon/publishable one.** The
publishable key ships inside the client bundle, so anything it can call a
visitor can call — and `advice_refund` would then be an unlimited supply of
simulations. The migration grants these functions to `service_role` alone.

Treat that key like a password: it bypasses every row-level security policy in
the project. Paste it straight from Supabase into Vercel and nowhere else.

Then redeploy (any push does it, or Vercel → Deployments → Redeploy).

## 3. Check it took

Run four simulations from the same browser. The fourth should say:

> You've used your 3 free simulations for today. Your next one unlocks in about N hours.

If instead it keeps running, the API cannot see the counter. Look in the Vercel
logs for `budget_store_missing` — that event fires on every request when the
two variables are absent, which is the deliberate loud failure rather than a
silent unprotected one.

## What this turns on

- **3 simulations per person per day**, matched on email and IP, whichever is
  further along, so a fresh address on the same connection does not reset it.
- **50 simulations a day in total**, well under the roughly 140 model calls the
  seven-model list provides.
- **Refunds** — a run that fails on a crash or on the provider's own quota
  gives the slot back.

Keys are stored as SHA-256 hashes, so the table holds no emails or IP
addresses.
