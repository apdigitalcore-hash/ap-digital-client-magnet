import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SEMRUSH_KEY = Deno.env.get("SEMRUSH_API_KEY");
const GSC_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
const DOMAIN = "ap-digital.ca";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function fetchSemrush() {
  if (!LOVABLE_API_KEY || !SEMRUSH_KEY) return null;
  const url = `${GATEWAY}/semrush/backlinks/backlinks_overview?target=${DOMAIN}&target_type=root_domain&export_columns=ascore,total,domains_num`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": SEMRUSH_KEY,
    },
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Semrush failed [${res.status}]: ${text}`);
    return null;
  }
  try {
    const parsed = JSON.parse(text);
    const cols: string[] = parsed?.data?.columnNames ?? [];
    const row: unknown[] = parsed?.data?.rows?.[0] ?? [];
    const get = (name: string) => {
      const i = cols.indexOf(name);
      return i >= 0 ? Number(row[i]) : null;
    };
    return {
      authority_score: get("ascore"),
      backlinks: get("total"),
      referring_domains: get("domains_num"),
    };
  } catch (e) {
    console.error("Semrush parse error", e, text.slice(0, 300));
    return null;
  }
}

async function fetchGsc() {
  if (!LOVABLE_API_KEY || !GSC_KEY) return null;
  const headers = {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": GSC_KEY,
  };
  const sitesRes = await fetch(`${GATEWAY}/google_search_console/webmasters/v3/sites`, { headers });
  if (!sitesRes.ok) {
    console.error(`GSC sites failed [${sitesRes.status}]: ${await sitesRes.text()}`);
    return null;
  }
  const { siteEntry = [] } = await sitesRes.json() as {
    siteEntry?: { siteUrl: string; permissionLevel?: string }[];
  };
  const verified = siteEntry.filter((e) => e.permissionLevel !== "siteUnverifiedUser");
  const match = verified.find((e) =>
    e.siteUrl === `sc-domain:${DOMAIN}` || e.siteUrl.includes(DOMAIN)
  );
  if (!match) return null;

  const end = new Date();
  const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000);
  const body = {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
  const res = await fetch(
    `${GATEWAY}/google_search_console/webmasters/v3/sites/${encodeURIComponent(match.siteUrl)}/searchAnalytics/query`,
    { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(body) },
  );
  if (!res.ok) {
    console.error(`GSC query failed [${res.status}]: ${await res.text()}`);
    return null;
  }
  const data = await res.json() as { rows?: { clicks: number; impressions: number; position: number }[] };
  const row = data.rows?.[0];
  if (!row) return { gsc_clicks: 0, gsc_impressions: 0, gsc_avg_position: null };
  return {
    gsc_clicks: Math.round(row.clicks),
    gsc_impressions: Math.round(row.impressions),
    gsc_avg_position: Number(row.position?.toFixed(2) ?? 0),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) return json({ error: "Unauthorized" }, 401);

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);

  const admin = createClient(supabaseUrl, serviceKey);
  const { data: isAdmin } = await admin.rpc("has_role", {
    _user_id: userData.user.id,
    _role: "admin",
  });
  if (!isAdmin) return json({ error: "Forbidden: admin only" }, 403);

  try {
    const [semrush, gsc] = await Promise.all([fetchSemrush(), fetchGsc()]);

    const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
    const { count: leadCount } = await admin
      .from("leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since);

    const snapshot = {
      snapshot_date: new Date().toISOString().slice(0, 10),
      ...(semrush ?? {}),
      ...(gsc ?? {}),
      organic_leads: leadCount ?? 0,
    };

    const { error: upsertErr } = await admin
      .from("seo_snapshots")
      .upsert(snapshot, { onConflict: "snapshot_date" });
    if (upsertErr) throw new Error(upsertErr.message);

    const { data: history, error: histErr } = await admin
      .from("seo_snapshots")
      .select("*")
      .order("snapshot_date", { ascending: true })
      .limit(180);
    if (histErr) throw new Error(histErr.message);

    return json({
      snapshot,
      history,
      sources: { semrush: Boolean(semrush), search_console: Boolean(gsc) },
    });
  } catch (e) {
    console.error("seo-snapshot error", e);
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
