// ADvice budget + usage recorder.
//
// Runs inside Supabase, where SUPABASE_SERVICE_ROLE_KEY already exists, so the
// key that bypasses every row-level security rule never has to be copied into
// another platform. The Vercel function calls this instead, proving itself with
// a shared secret that is worthless if it leaks — rotate it and move on.
//
// Env: ADVICE_BUDGET_SECRET (set in Lovable → Cloud → Secrets).
//      SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically.

const SECRET = Deno.env.get("ADVICE_BUDGET_SECRET") ?? "";
const URL_ = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-advice-secret, authorization, apikey",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

/** Calls Postgres as the service role. Never reachable from a browser. */
async function rpc(fn: string, args: Record<string, unknown>) {
  const res = await fetch(`${URL_}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify(args),
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) throw new Error(`${fn}: ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function insertRun(row: Record<string, unknown>) {
  const res = await fetch(`${URL_}/rest/v1/advice_runs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) throw new Error(`insert: ${res.status} ${(await res.text()).slice(0, 200)}`);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  if (!SECRET || req.headers.get("x-advice-secret") !== SECRET) {
    // Deliberately terse: an unauthenticated caller learns nothing.
    return json({ error: "Not authorised" }, 401);
  }
  if (!URL_ || !SERVICE_KEY) return json({ error: "Not configured" }, 500);

  let body: Record<string, any>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  try {
    switch (body.action) {
      case "consume":
        return json(await rpc("advice_consume", {
          p_person_key: String(body.personKey ?? ""),
          p_ip_key: String(body.ipKey ?? ""),
          p_person_limit: Number(body.personLimit ?? 3),
          p_global_limit: Number(body.globalLimit ?? 50),
        }));

      case "refund":
        await rpc("advice_refund", {
          p_person_key: String(body.personKey ?? ""),
          p_ip_key: String(body.ipKey ?? ""),
        });
        return json({ ok: true });

      case "record":
        // Best effort: a missing row must never cost someone their report, so
        // the caller does not wait on this and a failure only logs.
        await insertRun({
          channel: body.channel ?? null,
          industry: body.industry ?? null,
          objective: body.objective ?? null,
          budget: body.budget ?? null,
          currency: body.currency ?? null,
          creative_score: body.creativeScore ?? null,
          confidence: body.confidence ?? null,
          landing_status: body.landingStatus ?? null,
          handoff: !!body.handoff,
          model: body.model ?? null,
          ms: body.ms ?? null,
          person_key: body.personKey || null,
        });
        return json({ ok: true });

      default:
        return json({ error: "Unknown action" }, 400);
    }
  } catch (e) {
    console.error("advice-budget", e instanceof Error ? e.message : String(e));
    return json({ error: "Upstream failure" }, 502);
  }
});
