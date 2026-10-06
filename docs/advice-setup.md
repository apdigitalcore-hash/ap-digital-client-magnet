# ADvice: limits and usage data

Three pastes, all inside tools you already use. No Supabase dashboard.

## Why it is built this way

The counter has to be readable — the server asks "how many has this person had
today?" before allowing a run — so it cannot live in an email inbox. It lives in
the database Lovable already manages for you, which is a Supabase project. You
reach it through Lovable → Cloud, same as the `leads` table.

The key that can bypass every security rule on that database never leaves
Supabase. A small edge function there owns the counter, and the API proves
itself with a shared secret you invent. If that secret ever leaks, you rotate it
and nothing else is exposed.

## 1. Create the tables (Lovable)

Lovable → your project → **More** → **Cloud** → **SQL editor**.
Paste all of `docs/advice-usage-setup.sql` and run it. Safe to run twice.

Check it worked — Cloud → Database should now list `advice_usage` and
`advice_runs` beside `leads`.

## 2. Add the shared secret (Lovable)

Invent a random string, 30+ characters of gibberish. Generate one with:

```bash
openssl rand -base64 32
```

Lovable → **Cloud** → **Secrets** → **Add secret**:

| Name | Value |
| --- | --- |
| `ADVICE_BUDGET_SECRET` | your random string |

## 3. Point the API at it (Vercel)

Vercel → **advice-api** → Settings → **Environment Variables**, scope Production:

| Name | Value |
| --- | --- |
| `ADVICE_BUDGET_URL` | `https://pgivuezbonyqqbaazfnp.supabase.co/functions/v1/advice-budget` |
| `ADVICE_BUDGET_SECRET` | the same random string |

Then **Deployments → Redeploy**. Environment variables only apply to a new build.

## 4. Check it took

Run four simulations from one browser. The fourth should say:

> You've used your 3 free simulations for today.

If it keeps running, the API cannot see the counter. Vercel logs will show
`budget_store_missing` on every request — that event exists so an unprotected
state is loud rather than silent.

## What you get

**Limits.** Three simulations per person per day, matched on email and IP so a
fresh address on the same connection does not reset it. Fifty a day across
everyone, well under the roughly 140 model calls the seven-model list allows. A
run that fails gives its slot back.

**Evidence.** One row per simulation in `advice_runs`: channel, industry,
objective, budget, creative score, confidence, whether the landing page could be
read, whether the booking is handed to another domain, which model answered and
how long it took.

Deliberately no email address. `person_key` is the same hash the counter uses,
which makes repeat use countable without the table becoming a mailing list.

Ask Lovable's chat things like *"how many ADvice simulations in the last 7 days,
grouped by industry"*, or run:

```sql
select * from advice_repeat_use(30);
-- runs_total | people | people_repeat | runs_per_person
```

That last number is the one the paid tier rests on. If almost nobody runs a
second simulation, there is no paywall worth building yet.
