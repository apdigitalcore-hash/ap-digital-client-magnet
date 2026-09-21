import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText } from "npm:ai";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const SYSTEM_PROMPT = `You are a senior SEO and content strategist for AP Digital, a Vancouver, BC digital
marketing agency serving local service businesses (salons, trades, real estate, coaching, dental, HVAC,
fitness, restaurants, law firms, property management) across Metro Vancouver and the Fraser Valley.

You are given raw pasted data: competitor keyword/traffic exports, Search Console rows, Semrush gap tables,
or informal notes. The data may be messy, partial, or inconsistent. Never invent metrics that are not present;
if something is missing, say so plainly.

Produce a prioritized opportunity brief in Markdown with exactly these sections:

## Snapshot
Three to five bullets on what the data actually shows.

## Priority opportunities
A Markdown table, highest priority first, max 12 rows, with columns:
| # | Keyword / topic | Est. volume | Difficulty | Intent | Page to create or update | Why now |

## Quick wins (next 14 days)
Striking-distance or low-effort items with the specific on-page change to make.

## Content plan (next 90 days)
Grouped by cluster, with a suggested H1 and target URL slug for each new page.

## Gaps and risks
What the data does not cover and what to pull next.

Rules: be concrete about URLs and headlines, use Canadian spelling and CAD, never recommend buying links,
and keep every recommendation something a small agency team can execute.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "").trim();
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
  if (!isAdmin) return json({ error: "Forbidden: team access only" }, 403);

  if (!LOVABLE_API_KEY) return json({ error: "AI is not configured." }, 500);

  let body: { competitorData?: string; seoData?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const competitorData = (body.competitorData ?? "").slice(0, 40000).trim();
  const seoData = (body.seoData ?? "").slice(0, 40000).trim();
  const notes = (body.notes ?? "").slice(0, 4000).trim();

  if (!competitorData && !seoData) {
    return json({ error: "Paste competitor data or SEO data first." }, 400);
  }

  const prompt = [
    competitorData && `# Competitor data\n\n${competitorData}`,
    seoData && `# Our SEO data\n\n${seoData}`,
    notes && `# Team notes / focus\n\n${notes}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: LOVABLE_API_KEY,
      headers: {
        "Lovable-API-Key": LOVABLE_API_KEY,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
    });

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      system: SYSTEM_PROMPT,
      prompt,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "medium",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const brief = await result.text;
    if (!brief?.trim()) {
      return json({ error: "The model returned an empty brief. Try again with more data." }, 502);
    }
    return json({ brief });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("opportunity-brief error", message);
    const status = /402|credit/i.test(message)
      ? 402
      : /429|rate limit/i.test(message)
        ? 429
        : 500;
    return json(
      {
        error:
          status === 402
            ? "AI credits are exhausted. Top up credits in workspace settings."
            : status === 429
              ? "Too many requests right now. Wait a moment and try again."
              : "Could not generate the brief. Please try again.",
      },
      status,
    );
  }
});
