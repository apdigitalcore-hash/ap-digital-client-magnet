// ADvice — Lovable Cloud function. Runs one campaign simulation through
// Gemini and returns the report. Stateless: nothing is stored server-side.
// Secrets: GEMINI_API_KEY (required), GEMINI_MODEL (optional).
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GEMINI_API_KEY = Deno.env.get("DefaultGeminiProject");
const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") ?? "gemini-2.0-flash";
const PER_IP_PER_HOUR = 8;

// Best-effort per-instance limiter. Warm instances are reused, so this stops
// casual hammering; Gemini's own quota is the hard backstop.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  if (recent.length >= PER_IP_PER_HOUR) return true;
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const CHANNELS = ["Google Search Ads", "Google Display", "Meta/Facebook", "Instagram", "TikTok", "LinkedIn"];
const INDUSTRIES = ["Ecommerce", "SaaS", "Local service", "Real estate", "Health & wellness", "Finance", "Education", "Food & beverage", "Other"];


const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

interface Inputs {
  campaignName: string;
  product: string;
  productUrl: string;
  industry: string;
  audience: string;
  channel: string;
  budget: number;
  headline: string;
  primaryText: string;
  description: string;
  landingUrl: string;
}

function readInputs(b: Record<string, unknown>): Inputs | string {
  const i: Inputs = {
    campaignName: str(b.campaignName, 120),
    product: str(b.product, 1500),
    productUrl: str(b.productUrl, 500),
    industry: str(b.industry, 40),
    audience: str(b.audience, 1500),
    channel: str(b.channel, 40),
    budget: Math.round(Number(b.budget)),
    headline: str(b.headline, 300),
    primaryText: str(b.primaryText, 2000),
    description: str(b.description, 500),
    landingUrl: str(b.landingUrl, 500),
  };
  if (!i.product && !i.productUrl) return "Tell us what you're selling.";
  if (!INDUSTRIES.includes(i.industry)) return "Pick an industry.";
  if (!CHANNELS.includes(i.channel)) return "Pick an ad channel.";
  if (!i.audience) return "Describe your target audience.";
  if (!Number.isFinite(i.budget) || i.budget < 100 || i.budget > 1_000_000) return "Enter a monthly budget between $100 and $1,000,000.";
  if (!i.headline && !i.primaryText) return "Add at least a headline or primary text.";
  return i;
}

// Fetch a public page as plain text for the model. Only http(s) on public
// hostnames, capped in time and size — this runs on user-supplied URLs.
async function fetchPageText(raw: string): Promise<string | null> {
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase();
  if (!["http:", "https:"].includes(url.protocol) || url.port) return null;
  if (
    host === "localhost" || host.endsWith(".local") || host.endsWith(".internal") ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) || host.includes(":") || !host.includes(".")
  ) return null;
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(6000),
      headers: { "User-Agent": "ADviceBot/1.0 (+https://ap-digital.ca/advice)" },
    });
    if (!res.ok || !(res.headers.get("content-type") ?? "").includes("text/html")) return null;
    const html = (await res.text()).slice(0, 300_000);
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
    const text = html
      .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
    return `Title: ${title}\n${text.slice(0, 6000)}`;
  } catch {
    return null;
  }
}

const range = { type: "OBJECT", properties: { low: { type: "NUMBER" }, high: { type: "NUMBER" } }, required: ["low", "high"] };
const scored = { type: "OBJECT", properties: { score: { type: "INTEGER" }, note: { type: "STRING" } }, required: ["score", "note"] };
const level = (values: string[]) => ({ type: "STRING", enum: values });

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    summary: { type: "STRING" },
    predictions: {
      type: "OBJECT",
      properties: {
        ctr: range, cpc: range, clicks: range, conversionRate: range, conversions: range, cpa: range,
        roas: { ...range, nullable: true },
        confidence: level(["low", "medium", "high"]),
        confidenceReason: { type: "STRING" },
        assumptions: { type: "ARRAY", items: { type: "STRING" } },
      },
      required: ["ctr", "cpc", "clicks", "conversionRate", "conversions", "cpa", "confidence", "confidenceReason", "assumptions"],
    },
    creative: {
      type: "OBJECT",
      properties: {
        overall: { type: "INTEGER" },
        verdict: level(["Strong", "Needs Work", "Weak"]),
        headline: scored, clarity: scored, cta: scored,
        emotion: { type: "OBJECT", properties: { score: { type: "INTEGER" }, note: { type: "STRING" }, triggers: { type: "ARRAY", items: { type: "STRING" } } }, required: ["score", "note", "triggers"] },
        intent: { ...scored, nullable: true },
      },
      required: ["overall", "verdict", "headline", "clarity", "cta", "emotion"],
    },
    risk: {
      type: "OBJECT",
      properties: {
        overall: level(["low", "medium", "high"]),
        summary: { type: "STRING" },
        budget: { type: "OBJECT", properties: { status: level(["too_low", "healthy", "too_high"]), note: { type: "STRING" } }, required: ["status", "note"] },
        competition: { type: "OBJECT", properties: { level: level(["low", "medium", "high"]), note: { type: "STRING" } }, required: ["level", "note"] },
        seasonality: { type: "OBJECT", properties: { status: level(["good", "neutral", "bad"]), note: { type: "STRING" } }, required: ["status", "note"] },
      },
      required: ["overall", "summary", "budget", "competition", "seasonality"],
    },
    recommendations: {
      type: "OBJECT",
      properties: {
        improvements: {
          type: "ARRAY",
          items: { type: "OBJECT", properties: { title: { type: "STRING" }, detail: { type: "STRING" }, impact: level(["high", "medium", "low"]) }, required: ["title", "detail", "impact"] },
        },
        headline: { type: "STRING" },
        primaryText: { type: "STRING" },
        description: { type: "STRING" },
        budget: { type: "STRING" },
        audience: { type: "ARRAY", items: { type: "STRING" } },
        landingPage: { type: "STRING", nullable: true },
      },
      required: ["improvements", "headline", "primaryText", "description", "budget", "audience"],
    },
    competitors: {
      type: "OBJECT",
      properties: {
        advertisers: range,
        avgCpc: range,
        patterns: { type: "ARRAY", items: { type: "STRING" } },
      },
      required: ["advertisers", "avgCpc", "patterns"],
    },
  },
  required: ["summary", "predictions", "creative", "risk", "recommendations", "competitors"],
};

const SYSTEM_PROMPT = `You are a senior performance marketer with 10+ years running paid campaigns across Google Ads, Meta, TikTok and LinkedIn for ecommerce, SaaS, local service and B2B brands. You are powering ADvice, a free campaign simulator that predicts performance before a marketer spends money.

Ground every number in industry benchmarks, and keep them internally consistent:
- Google Search: average CTR roughly 3-7% by industry, CPC roughly $1-$9 (legal, finance, insurance and home services higher; ecommerce and arts lower), conversion rate roughly 3-10%.
- Google Display: CTR roughly 0.3-0.8%, CPC roughly $0.40-$1.50, conversion rate roughly 0.5-1.5%.
- Meta/Facebook and Instagram: CPM roughly $8-$25, CTR roughly 0.8-2% (feed), CPC roughly $0.50-$2.50, conversion rate roughly 1-5% depending on offer friction.
- TikTok: CPM roughly $6-$15, CTR roughly 0.8-1.8%, CPC roughly $0.30-$1.50.
- LinkedIn: CPM roughly $30-$80, CTR roughly 0.4-0.9%, CPC roughly $5-$12.
Adjust for the industry, the audience's intent and the quality of the copy. clicks = budget / CPC; conversions = clicks x conversion rate; CPA = budget / conversions. Give ROAS only when a revenue value can be reasonably inferred (ecommerce, priced products); otherwise return null. Ranges should be honest - wide when the input is thin.

Score the creative (0-100 each) against direct-response frameworks: AIDA, PAS, the 4 U's (useful, urgent, unique, ultra-specific), specificity of the offer, proof, and a clear single CTA. The overall score weights headline and CTA most. Verdict: Strong >= 75, Needs Work 50-74, Weak < 50. Score "intent" only for Google Search Ads (how well the copy matches the likely search query); return null for other channels.

Confidence: high only when product, audience, copy and a landing page are all specific; low when most inputs are vague.

Seasonality: judge against the current date given below.

Recommendations must be specific to THIS product, audience and copy - never generic advice like "test more" or "know your audience". Each improvement names exactly what to change. Rewrite the headline, primary text and description ready to paste, within the channel's character limits (Google Search headlines 30 chars, descriptions 90 chars). Budget advice must name amounts or percentages. If a landing page was provided, give specific feedback on message match, the offer above the fold, and friction; otherwise return null for landingPage.

Competitor snapshot: estimate the number of active advertisers targeting this niche and region, the average CPC, and 3-5 concrete things top-performing ads in this category do differently.

All currency is USD unless the audience location clearly implies another currency, in which case say so in the assumptions. Return only JSON matching the schema.`;

function clampRange(r: { low?: number; high?: number } | null | undefined, min = 0, max = 1e9) {
  if (!r) return null;
  let low = Number(r.low), high = Number(r.high);
  if (!Number.isFinite(low) || !Number.isFinite(high)) return null;
  if (low > high) [low, high] = [high, low];
  return { low: Math.min(max, Math.max(min, low)), high: Math.min(max, Math.max(min, high)) };
}
const clampScore = (n: unknown) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));

// deno-lint-ignore no-explicit-any
function normalise(r: any) {
  const p = r.predictions ?? {};
  for (const k of ["ctr", "cpc", "clicks", "conversionRate", "conversions", "cpa"]) p[k] = clampRange(p[k]) ?? { low: 0, high: 0 };
  p.roas = clampRange(p.roas);
  const c = r.creative ?? {};
  c.overall = clampScore(c.overall);
  for (const k of ["headline", "clarity", "cta", "emotion", "intent"]) if (c[k]) c[k].score = clampScore(c[k].score);
  c.verdict = c.overall >= 75 ? "Strong" : c.overall >= 50 ? "Needs Work" : "Weak";
  r.recommendations.improvements = (r.recommendations?.improvements ?? []).slice(0, 5);
  return r;
}


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  if (!GEMINI_API_KEY) return json({ error: "The simulator isn't configured yet." }, 500);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  const inputs = readInputs(body);
  if (typeof inputs === "string") return json({ error: inputs }, 400);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return json({ error: "You've run a lot of simulations this hour. Try again in a little while." }, 429);

  const [landingText, productText] = await Promise.all([
    inputs.landingUrl ? fetchPageText(inputs.landingUrl) : Promise.resolve(null),
    inputs.productUrl && inputs.productUrl !== inputs.landingUrl ? fetchPageText(inputs.productUrl) : Promise.resolve(null),
  ]);

  const userPrompt = [
    `Current date: ${new Date().toISOString().slice(0, 10)}`,
    `Channel: ${inputs.channel}`,
    `Industry: ${inputs.industry}`,
    `Monthly budget: $${inputs.budget.toLocaleString("en-US")}`,
    `What they're selling: ${inputs.product || "(see product URL)"}`,
    inputs.productUrl && `Product URL: ${inputs.productUrl}`,
    productText && `Product page content (fetched):\n${productText}`,
    `Target audience: ${inputs.audience}`,
    `Ad headline: ${inputs.headline || "(none)"}`,
    `Primary text: ${inputs.primaryText || "(none)"}`,
    `Description: ${inputs.description || "(none)"}`,
    inputs.landingUrl
      ? landingText
        ? `Landing page URL: ${inputs.landingUrl}\nLanding page content (fetched):\n${landingText}`
        : `Landing page URL: ${inputs.landingUrl} (could not be fetched - say so in landingPage feedback and judge only from the URL)`
      : "No landing page provided.",
  ].filter(Boolean).join("\n\n");

  let results;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
        signal: AbortSignal.timeout(55_000),
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
          },
        }),
      },
    );
    if (!res.ok) {
      console.error("gemini", res.status, (await res.text()).slice(0, 500));
      return json({ error: res.status === 429 ? "The AI is busy right now. Try again in a minute." : "The simulation failed. Please try again." }, 502);
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    results = normalise(JSON.parse(text));
  } catch (e) {
    console.error("gemini error", e);
    return json({ error: "The simulation failed. Please try again." }, 502);
  }

  return json({
    id: crypto.randomUUID().slice(0, 8),
    createdAt: new Date().toISOString(),
    inputs,
    results,
  });
});
