// ADvice — Vercel serverless function. Runs one campaign simulation through
// Gemini and returns the report. Stateless: nothing is stored server-side.
// Env: GEMINI_API_KEY (required), GEMINI_MODEL (optional), ALLOWED_ORIGINS (optional, comma-separated).

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// Models are tried in order; Google retires names over time, so a list beats a
// single hard-coded id. GEMINI_MODEL, when set, is tried first.
// Each name is metered separately by the free tier — 20 a day each — so the
// list is also the daily capacity. Order is cheapest-to-best-known-good.
const MODELS = [process.env.GEMINI_MODEL, "gemini-2.5-flash", "gemini-flash-latest", "gemini-3.5-flash-lite"]
  .filter(Boolean) as string[];
const ALLOWED = (process.env.ALLOWED_ORIGINS ?? "https://ap-digital.ca,https://www.ap-digital.ca")
  .split(",").map((s) => s.trim()).filter(Boolean);
const PER_IP_PER_HOUR = 8;

function corsFor(origin: string | null): Record<string, string> {
  const ok = origin && (ALLOWED.includes(origin) || /^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin) || /^http:\/\/localhost:\d+$/.test(origin));
  return {
    "Access-Control-Allow-Origin": ok ? origin! : ALLOWED[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

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

const CURRENCIES = ["CAD", "USD"];
const CHANNELS = ["Google Search Ads", "Google Display", "Meta/Facebook", "Instagram", "TikTok", "LinkedIn"];
const INDUSTRIES = ["Ecommerce", "SaaS", "Local service", "Real estate", "Health & wellness", "Finance", "Education", "Food & beverage", "Other"];
const OBJECTIVES = ["Leads", "Messages", "Calls", "Sales", "Website traffic", "Brand awareness"];


const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

interface Inputs {
  campaignName: string;
  product: string;
  productUrl: string;
  industry: string;
  audience: string;
  channel: string;
  objective: string;
  budget: number;
  currency: string;
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
    // Unknown or missing falls back to Leads rather than rejecting: an older
    // client that does not send it still gets a sane report.
    objective: OBJECTIVES.includes(str(b.objective, 40)) ? str(b.objective, 40) : "Leads",
    budget: Math.round(Number(b.budget)),
    currency: CURRENCIES.includes(str(b.currency, 8)) ? str(b.currency, 8) : "CAD",
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
/**
 * What happened when we tried to read a page.
 *
 * Previously this returned `string | null`, and null meant every kind of
 * failure at once. Two live runs showed why that is not enough: sephora.com
 * answers 403 to our user agent, while a dental site answered 200 with a
 * 114-byte stub whose only content was a JavaScript redirect. The second case
 * extracted zero characters, so the model was told it had "minimal content"
 * and guessed the rest. Naming the failure lets the report say plainly that it
 * could not read the page, which is more useful than a confident guess.
 */
export type PageFetch =
  | { status: "ok"; text: string; handoff: string[] }
  | { status: "blocked" | "empty" | "parked" | "unreachable"; text: null; handoff: string[] };

const LANDING_FAILURE: Record<string, string> = {
  blocked: "BLOCKED OUR REQUEST (it refuses automated visits)",
  empty: "RETURNED ALMOST NO READABLE TEXT",
  parked: "IS A PARKED DOMAIN, not a real page",
  unreachable: "COULD NOT BE REACHED",
};

/** Scheduling and booking systems that take the conversion off the advertiser's domain. */
const BOOKING_HOSTS =
  /(nexhealth|localmed|dentrix|flexbooker|calendly|acuityscheduling|janeapp|setmore|zocdoc|simplepractice|squarespace-scheduling|mindbodyonline|booksy|fresha|vagaro|schedulicity|opendental|curve-dental|clio|housecallpro|jobber)/i;

/** Domain parking and for-sale pages. The site is not live at all. */
const PARKED =
  /forsale\.godaddy|afternic|sedoparking|dan\.com|hugedomains|domainmarket|bodis\.com|parkingcrew|above\.com|undeveloped\.com|buydomains/i;

async function readOnce(url: URL): Promise<{ res: Response; html: string } | null> {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(6000),
    redirect: "follow",
    headers: {
      // Some sites refuse an obvious bot. Identify honestly but acceptably.
      "User-Agent": "Mozilla/5.0 (compatible; ADviceBot/1.0; +https://ap-digital.ca/advice)",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!(res.headers.get("content-type") ?? "").includes("text/html")) return null;
  return { res, html: (await res.text()).slice(0, 300_000) };
}

/** The destination of a JS or meta-refresh redirect, if the page is only that. */
export function clientRedirect(html: string, base: URL): URL | null {
  const js = html.match(/(?:window\.)?location(?:\.href)?\s*=\s*["']([^"']+)["']/i)?.[1];
  const meta = html.match(/<meta[^>]+http-equiv=["']?refresh["']?[^>]*content=["'][^"']*url=([^"';]+)/i)?.[1];
  const target = js ?? meta;
  if (!target) return null;
  try {
    return new URL(target, base);
  } catch {
    return null;
  }
}

function extract(html: string): { title: string; text: string } {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const text = html
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return { title, text };
}

/** External hosts the page sends its conversion to — booking systems and forms. */
export function findHandoff(html: string, self: string): string[] {
  const hosts = new Set<string>();
  const re = /(?:href|src|action)\s*=\s*["']https?:\/\/([a-z0-9.-]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const host = m[1].toLowerCase().replace(/^www\./, "");
    if (host === self || host.endsWith(`.${self}`)) continue;
    if (BOOKING_HOSTS.test(host)) hosts.add(host);
  }
  return [...hosts].slice(0, 5);
}

export async function fetchPage(raw: string): Promise<PageFetch> {
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return { status: "unreachable", text: null, handoff: [] };
  }
  const host = url.hostname.toLowerCase();
  if (!["http:", "https:"].includes(url.protocol) || url.port) return { status: "unreachable", text: null, handoff: [] };
  if (
    host === "localhost" || host.endsWith(".local") || host.endsWith(".internal") ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) || host.includes(":") || !host.includes(".")
  ) return { status: "unreachable", text: null, handoff: [] };

  try {
    let got = await readOnce(url);
    if (!got) return { status: "unreachable", text: null, handoff: [] };
    // 403/429 is a bot block, not a broken page — worth saying so exactly.
    if (got.res.status === 403 || got.res.status === 429) return { status: "blocked", text: null, handoff: [] };
    if (!got.res.ok) return { status: "unreachable", text: null, handoff: [] };

    let { title, text } = extract(got.html);
    let current = new URL(got.res.url || url.href);

    // A stub that only redirects in the browser. One hop is enough to reach
    // the real page, and stops here rather than chasing a loop.
    if (text.length < 200) {
      const next = clientRedirect(got.html, current);
      if (next && next.href !== current.href) {
        if (PARKED.test(next.href)) return { status: "parked", text: null, handoff: [] };
        const hop = await readOnce(next);
        if (hop) {
          if (PARKED.test(hop.res.url)) return { status: "parked", text: null, handoff: [] };
          got = hop;
          current = new URL(hop.res.url || next.href);
          ({ title, text } = extract(hop.html));
        }
      }
    }

    if (PARKED.test(got.html) || PARKED.test(current.href)) return { status: "parked", text: null, handoff: [] };

    const handoff = findHandoff(got.html, current.hostname.toLowerCase().replace(/^www\./, ""));
    // A page with almost no text told us nothing, and pretending otherwise is
    // what produced landing-page feedback for a page nobody ever read.
    if (text.length < 200) return { status: "empty", text: null, handoff };

    return { status: "ok", text: `Title: ${title}\n${text.slice(0, 6000)}`, handoff };
  } catch {
    return { status: "unreachable", text: null, handoff: [] };
  }
}

// Ad creative, forwarded to Gemini for this request only and never echoed back.
function readImage(b: Record<string, unknown>): { data: string; mime: string } | null {
  const img = b.image as { data?: unknown; mime?: unknown } | undefined;
  if (!img || typeof img.data !== "string" || typeof img.mime !== "string") return null;
  if (!/^image\/(png|jpeg|webp)$/.test(img.mime)) return null;
  if (img.data.length > 3_000_000) return null;   // ~2MB decoded
  return { data: img.data, mime: img.mime };
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

// ── Claim guard ────────────────────────────────────────────────────────────
/**
 * Catches claims the rewrite invented.
 *
 * The prompt forbids them, but a prompt is a request, not a guarantee, and the
 * cost of one escaping is an advertiser running "Your child's check-up could
 * be FREE" on the strength of accepting a plan that is income tested. So the
 * rewrite is checked against what the advertiser actually wrote: a banned
 * phrase is only allowed through if it already appears in their own input.
 */
export const CLAIM_PATTERNS: [RegExp, string][] = [
  // Health claims first: "pain-free" is a clinical promise, not a price, and
  // the free pattern below would otherwise claim it.
  [/\b(pain[- ]free|cure[sd]?\b|heal(s|ed|ing)?\b|clinically proven|doctor recommended|safe for)/i, "a health outcome claim"],
  // Not preceded by a hyphen or word character, so "hassle-free" and
  // "risk-free" fall to the guarantee and health rules instead of this one.
  [/(?<![\w-])(free|no cost|at no charge|zero cost)\b|\$0\b/i, "a free or no-cost claim"],
  [/\b(best|top|#\s?1|number one|leading|finest|premier|most trusted|highest[- ]rated|award[- ]winning|voted)\b/i, "a superlative or ranking"],
  [/\bguarantee(d|s)?\b|\bpromise(d|s)?\b|\brisk[- ]free\b/i, "a guarantee"],
  [/\$\s?\d|\b\d+\s?% ?(off|discount)\b|\bsave \d/i, "a price or discount"],
  [/\b\d+\s?%|\b\d+\s?(x|times)\b|\b\d{3,}\+?\s+(patients|clients|customers|families|reviews)\b/i, "a statistic"],
];

export function findInventedClaims(
  rewrite: { headline?: string; primaryText?: string; description?: string },
  supplied: string,
): string[] {
  const hay = supplied.toLowerCase();
  const found: string[] = [];
  for (const [field, value] of Object.entries(rewrite)) {
    if (typeof value !== "string" || !value) continue;
    for (const [re, label] of CLAIM_PATTERNS) {
      const m = value.match(re);
      // Already in what they gave us: theirs to make, not ours.
      if (m && !hay.includes(m[0].toLowerCase())) {
        found.push(`${field}: ${label} ("${m[0]}")`);
        break;
      }
    }
  }
  return found;
}

/**
 * Strips patient-list targeting from audience advice for health advertisers.
 *
 * A run for a dental clinic advised "creating lookalike audiences based on
 * existing patient lists". That means uploading a list of dental patients to
 * Meta: health information under PIPEDA and BC health privacy law, and against
 * the platforms' own sensitive-category rules. It is the most damaging thing
 * the report could tell a clinic to do, so it is removed in code rather than
 * discouraged in the prompt.
 *
 * Website retargeting and interest targeting are untouched — they are fine.
 */
const LIST_TARGETING =
  /look[- ]?alike|similar audience|seed audience|customer match|(patient|client|customer|email|CRM|contact)\s+(list|data|file|upload)|upload(ing)?\s+(your|a|the)?\s*(patient|client|customer|email|CRM)|first[- ]party\s+(data|list)/i;

const SAFE_ALTERNATIVE =
  "Do not upload patient lists to ad platforms — a patient list is health information under Canadian privacy law and breaches the platforms' sensitive-category rules. Retarget from your own website pixel instead, and layer interest and local radius targeting.";

export function sanitiseHealthAudience(audience: string[], industry: string): string[] {
  if (industry !== "Health & wellness") return audience;
  const kept = (audience ?? []).filter((a) => !LIST_TARGETING.test(a));
  if (kept.length === audience?.length) return audience;
  return [SAFE_ALTERNATIVE, ...kept];
}

// ── Failure logging and alerting ───────────────────────────────────────────
/**
 * Records every failed simulation and raises an alarm when they cluster.
 *
 * A total outage of the simulator ran for hours and was found by a person
 * trying to use it, because nothing watched. Serverless instances are
 * short-lived and not shared, so this counter is per-instance and
 * deliberately crude: it is a smoke alarm, not a metrics pipeline. Under a
 * real outage every instance fails, so the threshold is reached quickly
 * somewhere, which is all that is needed to get a message out.
 *
 * Sends through the same formsubmit inbox the leads use, so there is no new
 * credential to hold. Alerts are rate limited to one per instance per window
 * so a sustained outage cannot turn into thousands of emails.
 */
const FAIL_WINDOW_MS = 10 * 60_000;
const FAIL_THRESHOLD = 3;
const failures: { at: number; status: number; reason: string }[] = [];
let lastAlertAt = 0;

async function recordFailure(status: number, reason: string, context: Record<string, unknown>) {
  const now = Date.now();
  // Structured so it is greppable in the Vercel log drain.
  console.error(JSON.stringify({ event: "simulation_failed", status, reason: reason.slice(0, 500), ...context }));

  failures.push({ at: now, status, reason });
  while (failures.length && now - failures[0].at > FAIL_WINDOW_MS) failures.shift();
  if (failures.length < FAIL_THRESHOLD) return;
  if (now - lastAlertAt < FAIL_WINDOW_MS) return;
  lastAlertAt = now;

  const body = {
    _subject: `ADvice ALERT: ${failures.length} failed simulations in ${Math.round(FAIL_WINDOW_MS / 60000)} minutes`,
    _template: "table",
    failures: String(failures.length),
    window: `${Math.round(FAIL_WINDOW_MS / 60000)} minutes`,
    latest_status: String(status),
    latest_reason: reason.slice(0, 900),
    recent: failures.map((f) => `${new Date(f.at).toISOString()} ${f.status} ${f.reason.slice(0, 160)}`).join("\n"),
    note: "Sent by the ADvice API when simulations fail repeatedly. Check the Vercel logs for simulation_failed entries.",
  };
  try {
    await fetch("https://formsubmit.co/ajax/apdigital.core@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // An alert that cannot be sent must never take the request down with it.
  }
}

// ── Daily budget ───────────────────────────────────────────────────────────
/**
 * The Gemini key is on the free tier: 20 generateContent calls a day for the
 * whole tool, permanently. So the budget is enforced here, before a model is
 * ever called, rather than letting people discover it as a raw quota error.
 *
 * PER_PERSON is matched on email and on IP, whichever is further along, so a
 * fresh address from the same connection does not reset the allowance. The
 * browser also tracks runs, but that is a convenience: it can be cleared, and
 * this is the enforcement.
 *
 * DAILY_CEILING sits below the provider's 20 on purpose. The headroom absorbs
 * the corrective pass and leaves room to investigate a bad day without the
 * provider's own error ever reaching a visitor.
 */
const PER_PERSON_PER_DAY = 3;
const DAILY_CEILING = 16;

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

type Budget =
  | { allowed: true; globalUsed: number; personUsed: number }
  | { allowed: false; reason: "global" | "person"; globalUsed?: number; personUsed?: number };

/** Hashed so the counter table never holds an email address or an IP. */
async function hashKey(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(`advice:${value.trim().toLowerCase()}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function rpc(fn: string, body: Record<string, unknown>): Promise<any> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`${fn}: ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function takeBudget(email: string, ip: string): Promise<Budget> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    // Without the shared counter there is no global ceiling — only the
    // per-instance limiter below, which a spread of traffic walks straight
    // past. Loud, because silently unprotected is the dangerous state.
    console.error(JSON.stringify({
      event: "budget_store_missing",
      detail: "SUPABASE_URL / SUPABASE_ANON_KEY are not set on this deployment; the daily ceiling is NOT enforced.",
    }));
    return { allowed: true, globalUsed: -1, personUsed: -1 };
  }
  try {
    const r = await rpc("advice_consume", {
      p_person_key: email ? await hashKey(email) : "",
      p_ip_key: await hashKey(ip),
      p_person_limit: PER_PERSON_PER_DAY,
      p_global_limit: DAILY_CEILING,
    });
    if (r?.allowed) return { allowed: true, globalUsed: r.global_used ?? -1, personUsed: r.person_used ?? -1 };
    return { allowed: false, reason: r?.reason === "person" ? "person" : "global", globalUsed: r?.global_used, personUsed: r?.person_used };
  } catch (e) {
    // A counter that is down must not take the tool down with it. The
    // provider's own quota is still a backstop, and this is logged.
    console.error(JSON.stringify({ event: "budget_error", detail: e instanceof Error ? e.message : String(e) }));
    return { allowed: true, globalUsed: -1, personUsed: -1 };
  }
}

/** Hands a slot back when the simulation never actually ran. */
async function refundBudget(email: string, ip: string) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;
  try {
    await rpc("advice_refund", { p_person_key: email ? await hashKey(email) : "", p_ip_key: await hashKey(ip) });
  } catch {
    /* a refund that fails costs one slot, not the request */
  }
}

/** When the allowance comes back, in the visitor's own words. */
function resetsAt(): string {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  const hours = Math.max(1, Math.round((next.getTime() - now.getTime()) / 3600_000));
  return hours <= 1 ? "in about an hour" : `in about ${hours} hours`;
}

const SYSTEM_PROMPT = `You are a senior performance marketer with 10+ years running paid campaigns across Google Ads, Meta, TikTok and LinkedIn for ecommerce, SaaS, local service and B2B brands. You are powering ADvice, a free campaign simulator that predicts performance before a marketer spends money.

Ground every number in industry benchmarks, and keep them internally consistent:
- Google Search: average CTR roughly 3-7% by industry, CPC roughly $1-$9 (legal, finance, insurance and home services higher; ecommerce and arts lower), conversion rate roughly 3-10%.
- Google Display: CTR roughly 0.3-0.8%, CPC roughly $0.40-$1.50, conversion rate roughly 0.5-1.5%.
- Meta/Facebook and Instagram: CPM roughly $8-$25, CTR roughly 0.8-2% (feed), CPC roughly $0.50-$2.50, conversion rate roughly 1-5% depending on offer friction.
- TikTok: CPM roughly $6-$15, CTR roughly 0.8-1.8%, CPC roughly $0.30-$1.50.
- LinkedIn: CPM roughly $30-$80, CTR roughly 0.4-0.9%, CPC roughly $5-$12.
Adjust for the industry, the audience's intent and the quality of the copy. clicks = budget / CPC; conversions = clicks x conversion rate; CPA = budget / conversions. Express ctr and conversionRate as percentage numbers, not fractions: 4.2 means 4.2%, never 0.042.  Give ROAS only when a revenue value can be reasonably inferred (ecommerce, priced products); otherwise return null. Ranges should be honest - wide when the input is thin.

The campaign objective decides what a conversion IS, and the benchmarks above are landing-page conversion rates — they do not transfer across objectives. Use the objective given:
- Leads: a form submission on a landing page. The benchmarks above apply as written.
- Messages: a DM conversation opened in the platform's inbox. There is no landing page in the path, so friction is far lower and rates run roughly 3-4x a lead form's; the advertiser's cost per conversation is NOT a cost per customer, and many conversations never reply. Say so in the assumptions.
- Calls: a phone call connected from the ad. Rates sit between a form and a message, and quality is higher but volume much lower. Call-only inventory is limited, so clicks should be conservative.
- Sales: a completed purchase. Rates are well below lead rates (roughly a third), and ROAS is the number that matters — give it whenever a price can be inferred.
- Website traffic: the click IS the outcome. Set conversionRate and conversions to a low: 0, high: 0 range and cpa to low: 0, high: 0, and state in the assumptions that no conversion step was modelled because the objective is traffic. Judge the campaign on CPC and clicks instead.
- Brand awareness: same as Website traffic — no conversion step. Judge on CPM, reach and CTR, and say so.

Score the creative (0-100 each) against direct-response frameworks: AIDA, PAS, the 4 U's (useful, urgent, unique, ultra-specific), specificity of the offer, proof, and a clear single CTA. The overall score weights headline and CTA most. Verdict: Strong >= 75, Needs Work 50-74, Weak < 50. Score "intent" only for Google Search Ads (how well the copy matches the likely search query); return null for other channels.

Confidence: high only when product, audience, copy and a landing page are all specific; low when most inputs are vague.

Seasonality: judge against the current date given below. Never call a vertical evergreen without checking its buying calendar first.
In particular, for dental, optometry, physiotherapy, massage, chiropractic and anything else paid by private extended health benefits in Canada: these plans run on a calendar year, reset on 1 January, and unused annual maximums are forfeited. October through December is therefore the strongest window of the year in those verticals, with the last three weeks of December the peak, because patients spend remaining benefits before they vanish. A campaign running in Q4 for one of these should be marked a strong window with that reason, and the recommendations should say to lead on using benefits before they expire and to raise budget through November and December. January to March is correspondingly the weakest window, when maximums have just reset and patients are paying out of pocket again.

CLAIM INTEGRITY - this constraint overrides persuasiveness, and a weaker but defensible ad is the correct answer.
The rewrite may restate, sharpen, condense or reorder what the advertiser gave you. It must not introduce a fact they did not supply. Specifically, never add:
- a price, discount, or any "free" / "no cost" / "$0" claim that was not in their input;
- a superlative or ranking ("best", "top", "#1", "leading", "award-winning", "most trusted");
- a guarantee, warranty or promise of a result;
- a medical, dental, health, financial or legal outcome claim;
- a statistic, rating, review count, years in business, or number of customers.
Treat coverage, funding and insurance programmes with particular care: "accepts the Canadian Dental Care Plan" means the practice bills that plan, it does NOT mean treatment is free. These programmes are income tested and cover only some procedures, so never convert "accepts X" into "free" or "covered". Health professions are also regulated: superlatives about a clinic or practitioner breach provincial advertising rules in Canada.
If their input does not support a stronger hook, say so in the improvements - name the single piece of evidence that would unlock a stronger ad (a price, a wait time, a named credential) and ask them for it. Do not manufacture it.

SENSITIVE CATEGORIES - Health & wellness. When the industry is Health & wellness (clinics, dental, medical, optometry, physiotherapy, mental health, any practice holding patient records), NEVER recommend uploading, matching, hashing or importing a customer, patient or client list to an ad platform, and never recommend a lookalike, similar or seed audience built from one. A patient list is health information: in Canada it is protected by PIPEDA and provincial health privacy law, and the platforms' own policies restrict sensitive-category targeting. Instead recommend website retargeting from the practice's own pixel, interest and demographic targeting, and local radius targeting, and state plainly in the audience advice that patient lists must not be uploaded to ad platforms. This applies regardless of how well first-party data would perform.

Recommendations must be specific to THIS product, audience and copy - never generic advice like "test more" or "know your audience". Each improvement names exactly what to change. Rewrite the headline, primary text and description ready to paste, within the channel's character limits (Google Search headlines 30 chars, descriptions 90 chars). Budget advice must name amounts or percentages. If a landing page was provided, give specific feedback on message match, the offer above the fold, and friction; otherwise return null for landingPage.

Competitor snapshot: estimate the number of active advertisers targeting this niche and region, the average CPC, and 3-5 concrete things top-performing ads in this category do differently.

When an ad image is attached you MUST look at it and say what you actually see. Name the specific elements - colours, text on the image, whether a face, product or property appears, how much empty space there is - and judge whether the message survives at thumbnail size, whether the offer or price is visible, and whether it suits the channel's format. At least one improvement MUST be about the image itself, and its detail must reference what the image actually shows rather than generic creative advice. When no image is provided, never describe or assume one, and do not claim the creative is high quality.

Every figure must be in the currency named in the request and nowhere else — never convert, never quote another currency, and state the currency code once in the assumptions. Return only JSON matching the schema.`;

function clampRange(r: { low?: number; high?: number } | null | undefined, min = 0, max = 1e9) {
  if (!r) return null;
  let low = Number(r.low), high = Number(r.high);
  if (!Number.isFinite(low) || !Number.isFinite(high)) return null;
  if (low > high) [low, high] = [high, low];
  return { low: Math.min(max, Math.max(min, low)), high: Math.min(max, Math.max(min, high)) };
}
const clampScore = (n: unknown) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));

// deno-lint-ignore no-explicit-any
// Gemini sometimes returns ctr/conversionRate as fractions (0.05) rather than
// percentages (5), which rendered as "0.0% – 0.1%" next to a sane click count.
// conversions / clicks gives the true rate, so use it to decide the scale.
// deno-lint-ignore no-explicit-any
function fixRateScale(p: any) {
  const mid = (r: any) => (Number(r?.low) + Number(r?.high)) / 2;
  const clicks = mid(p.clicks), convs = mid(p.conversions);
  const impliedPct = clicks > 0 ? (convs / clicks) * 100 : NaN;
  const asPct = (r: any) => ({ low: r.low * 100, high: r.high * 100 });
  if (Number.isFinite(impliedPct) && impliedPct > 0) {
    const given = mid(p.conversionRate);
    // Whichever reading sits closer to the implied rate wins.
    const isFraction = Math.abs(given * 100 - impliedPct) < Math.abs(given - impliedPct);
    if (isFraction) {
      p.conversionRate = asPct(p.conversionRate);
      // The model used fractions, so CTR is a fraction too (0.009 = 0.9%).
      if (mid(p.ctr) <= 0.1) p.ctr = asPct(p.ctr);
    }
    // Either way the scale is settled — never fall through to the guess below.
    return;
  }
  // No usable cross-check: only values too small to be real percentages are
  // treated as fractions (0.05 conversion rate = 5%; 0.01 CTR = 1%).
  if (mid(p.conversionRate) <= 0.2) p.conversionRate = asPct(p.conversionRate);
  if (mid(p.ctr) <= 0.05) p.ctr = asPct(p.ctr);
}

// deno-lint-ignore no-explicit-any
function normalise(r: any) {
  const p = r.predictions ?? {};
  for (const k of ["ctr", "cpc", "clicks", "conversionRate", "conversions", "cpa"]) p[k] = clampRange(p[k]) ?? { low: 0, high: 0 };
  p.roas = clampRange(p.roas);
  fixRateScale(p);
  const c = r.creative ?? {};
  c.overall = clampScore(c.overall);
  for (const k of ["headline", "clarity", "cta", "emotion", "intent"]) if (c[k]) c[k].score = clampScore(c[k].score);
  c.verdict = c.overall >= 75 ? "Strong" : c.overall >= 50 ? "Needs Work" : "Weak";
  // The schema asks for these, but a malformed answer must degrade rather
  // than throw: an exception here costs the visitor the whole simulation.
  r.recommendations = r.recommendations ?? {};
  r.recommendations.improvements = (r.recommendations.improvements ?? []).slice(0, 5);
  r.recommendations.audience = r.recommendations.audience ?? [];
  r.risk = r.risk ?? {};
  r.competitors = r.competitors ?? {};
  return r;
}


// Node-style handler: Vercel's runtime passes (req, res) here, and the
// web-style Request/Response signature crashed on invocation.
// deno-lint-ignore-file no-explicit-any
/**
 * Wrapper so an unhandled throw is still recorded and still answers JSON.
 *
 * The outage that prompted this was a ReferenceError thrown before any of the
 * code below could return a 502, so nothing was logged and nothing alerted.
 */
export default async function handler(req: any, res: any) {
  try {
    return await run(req, res);
  } catch (e) {
    const reason = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
    await recordFailure(500, reason, { kind: "crash", path: "handler" });
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Something went wrong on our end.", kind: "server" }));
    }
  }
}

async function run(req: any, res: any) {
  const origin = req.headers.origin ?? null;
  const cors = corsFor(origin);
  for (const [k, v] of Object.entries(cors)) res.setHeader(k, v as string);
  res.setHeader("Content-Type", "application/json");

  const json = (body: unknown, status = 200) => {
    res.statusCode = status;
    res.end(JSON.stringify(body));
  };

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!GEMINI_API_KEY) return json({ error: "The simulator isn't configured yet.", kind: "config" }, 500);

  let body: Record<string, unknown>;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    return json({ error: "Invalid request.", kind: "input" }, 400);
  }
  const inputs = readInputs(body);
  if (typeof inputs === "string") return json({ error: inputs, kind: "input" }, 400);
  const image = readImage(body);

  const ip = (String(req.headers["x-forwarded-for"] ?? "") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return json({ error: "You've run a lot of simulations this hour. Try again in a little while.", kind: "rate" }, 429);

  // The budget is taken before anything expensive happens, and handed back if
  // the simulation never actually runs.
  const email = str(body.email, 200);
  const budget = await takeBudget(email, ip);
  if (!budget.allowed) {
    if (budget.reason === "person") {
      return json({
        error: `You've used your ${PER_PERSON_PER_DAY} free simulations for today. Your next one unlocks ${resetsAt()}.`,
        kind: "person_limit",
        resetsAt: resetsAt(),
      }, 429);
    }
    console.error(JSON.stringify({ event: "daily_ceiling_reached", global_used: budget.globalUsed, limit: DAILY_CEILING }));
    return json({
      error: `ADvice has reached today's limit. It resets ${resetsAt()}.`,
      kind: "daily_limit",
      resetsAt: resetsAt(),
    }, 429);
  }

  const [landing, product] = await Promise.all([
    inputs.landingUrl ? fetchPage(inputs.landingUrl) : Promise.resolve(null),
    inputs.productUrl && inputs.productUrl !== inputs.landingUrl ? fetchPage(inputs.productUrl) : Promise.resolve(null),
  ]);

  const userPrompt = [
    `Current date: ${new Date().toISOString().slice(0, 10)}`,
    `Channel: ${inputs.channel}`,
    `Campaign objective: ${inputs.objective || "Leads"}`,
    `Industry: ${inputs.industry}`,
    `Monthly budget: $${inputs.budget.toLocaleString("en-US")} ${inputs.currency}`,
    `Report every figure in ${inputs.currency}. Benchmarks below are USD — convert them to ${inputs.currency} before answering.`,
    `What they're selling: ${inputs.product || "(see product URL)"}`,
    inputs.productUrl && `Product URL: ${inputs.productUrl}`,
    product?.status === "ok" && `Product page content (fetched):\n${product.text}`,
    `Target audience: ${inputs.audience}`,
    `Ad headline: ${inputs.headline || "(none)"}`,
    `Primary text: ${inputs.primaryText || "(none)"}`,
    `Description: ${inputs.description || "(none)"}`,
    image ? "An ad image is attached - review it as part of the creative." : "No ad image provided.",
    inputs.landingUrl
      ? landing?.status === "ok"
        ? `Landing page URL: ${inputs.landingUrl}\nLanding page content (fetched):\n${landing.text}`
        : `Landing page URL: ${inputs.landingUrl}\nTHE LANDING PAGE ${LANDING_FAILURE[landing?.status ?? "unreachable"]}. You have not seen this page. Set landingPage to exactly: "We could not read ${inputs.landingUrl}, so there is no landing page feedback in this report." and nothing else. Do not infer, assume or describe what is on it, and do not mention it anywhere else in the report.`
      : "No landing page provided.",
    landing?.handoff?.length
      ? `CONVERSION HANDOFF: the landing page sends its booking or form to ${landing.handoff.join(", ")}, which is a different domain from the advertiser's. Raise this as a HIGH impact improvement: their conversion happens off their own site, so their pixel and analytics never see it, conversion tracking will under-report, and the platform cannot optimise towards it. Tell them to install the pixel on the booking system if it allows it, or to track the click through to it as a conversion.`
      : null,
  ].filter(Boolean).join("\n\n");

  let results;
  let lastError = "";
  // Set when the claim guard has already asked for one corrective rewrite.
  let corrected = false;
  let correction = "";
  let busy = false;
  // A daily quota being spent is not the same as a momentary overload, and
  // "try again in a minute" is false when the answer is hours.
  let quota = false;
  // One pass, not two. Against a 20-a-day budget, a single failure that
  // spends eight model calls is unaffordable: it can burn the whole day.
  // Each entry here is a different model name, tried only when the previous
  // name is rejected outright, which costs no quota. A quota error stops
  // everything immediately, and a transient 5xx buys exactly one retry.
  let transientRetries = 0;
  let modelCalls = 0;
  // Model names whose own daily allowance is spent, and names Google has
  // retired. A retired name says nothing about quota either way.
  const exhausted = new Set<string>();
  const retired = new Set<string>();
  const queue = [...MODELS];
  for (let model = queue.shift(); model; model = queue.shift()) {
    try {
      modelCalls += 1;
      console.log(JSON.stringify({
        event: "model_call", model, call: modelCalls,
        corrective: corrected, global_used: budget.globalUsed, ceiling: DAILY_CEILING,
      }));
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
          signal: AbortSignal.timeout(55_000),
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT + correction }] },
            contents: [{ role: "user", parts: image
              ? [{ text: userPrompt }, { inlineData: { mimeType: image.mime, data: image.data } }]
              : [{ text: userPrompt }] }],
            generationConfig: {
              temperature: 0.4,
              responseMimeType: "application/json",
              responseSchema: RESPONSE_SCHEMA,
            },
          }),
        },
      );
      if (!res.ok) {
        const body = (await res.text()).slice(0, 600);
        lastError = `${model}: ${res.status} ${body}`;
        console.error("gemini", lastError);
        // 404/400 means the name is gone. It is not a quota signal, so it
        // must not stop us reporting quota truthfully below.
        if (res.status === 404 || res.status === 400) {
          retired.add(model);
          // Google names the replacement in the message: "Please update your
          // code to use models/X". Following it keeps the tool working when a
          // name is retired, instead of needing a deploy to find out.
          const suggested = body.match(/use models\/([a-z0-9.\-]+)/i)?.[1];
          if (suggested && !retired.has(suggested) && !exhausted.has(suggested) && !queue.includes(suggested)) {
            console.log(JSON.stringify({ event: "model_retired", model, following: suggested }));
            queue.push(suggested);
          }
          continue;
        }
        // Quota (429) and overload (5xx) are per-model — back off briefly and
        // try the next model instead of failing the visitor.
        // The free tier meters each model name separately: gemini-2.5-flash
        // and gemini-flash-latest each get their own 20 a day on the same
        // key. So a 429 must never re-ask the same model, but the next name
        // is a different pool and worth one attempt. quota is only true once
        // every model has refused.
        if (res.status === 429) {
          busy = true;
          exhausted.add(model);
          quota = MODELS.every((m) => exhausted.has(m) || retired.has(m));
          continue;
        }
        // A genuine transient fault is worth exactly one more attempt.
        if (res.status >= 500) {
          busy = true;
          if (transientRetries < 1) {
            transientRetries += 1;
            queue.unshift(model);
            await new Promise((r) => setTimeout(r, 600));
          }
          continue;
        }
        return json({ error: "The simulation failed. Please try again.", kind: "server", detail: lastError }, 502);
      }
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        lastError = `${model}: empty response ${JSON.stringify(data).slice(0, 400)}`;
        console.error("gemini", lastError);
        continue;
      }
      results = normalise(JSON.parse(text));

      // Everything the advertiser actually told us. A banned phrase that
      // appears here is theirs to make; one that does not is invented.
      const supplied = [
        inputs.product, inputs.audience, inputs.headline, inputs.primaryText,
        inputs.description, product?.text, landing?.text,
      ].filter(Boolean).join(" ");
      results.recommendations.audience = sanitiseHealthAudience(
        results.recommendations.audience ?? [], inputs.industry,
      );

      const invented = findInventedClaims(results.recommendations ?? {}, supplied);
      if (invented.length && !corrected) {
        // One corrective pass. Naming the specific violation works far better
        // than repeating the general rule, and it costs a single call.
        corrected = true;
        correction = `\n\nYour previous answer invented claims the advertiser never supplied: ${invented.join("; ")}. Rewrite the ad using only what they gave you. Do not substitute a different unsupported claim. If there is no strong hook in their input, write a plainer ad and say in the improvements what evidence would unlock a stronger one.`;
        results = undefined;
        // Same model, with the violation named. Costs one extra call, and
        // only ever when the detector actually found something.
        queue.unshift(model);
        continue;
      }
      if (invented.length) {
        // Still inventing after a correction: keep their own words rather than
        // ship a claim they cannot stand behind.
        results.recommendations = {
          ...results.recommendations,
          headline: inputs.headline || results.recommendations.headline,
          primaryText: inputs.primaryText || results.recommendations.primaryText,
          description: inputs.description || results.recommendations.description,
          claimNotice: "The suggested rewrite made claims your input did not support, so your original wording is shown instead. Give ADvice a fact it can use — a price, a wait time, a credential — and run it again.",
        };
      }
      break;
    } catch (e) {
      lastError = `${model}: ${e instanceof Error ? e.message : String(e)}`;
      console.error("gemini error", lastError);
      // A dropped connection is transient, and worth exactly one more try.
      if (transientRetries < 1) {
        transientRetries += 1;
        queue.unshift(model);
      }
    }
  }
  if (!results) {
    // "busy" means the model provider pushed back, which a retry does fix.
    // Anything else is our own failure, and telling someone to retry that is
    // how an outage becomes hours of people retrying into the same crash.
    const error = quota
      ? "ADvice has hit its limit with the AI provider for now. This is on us — it should be back within the hour."
      : busy
        ? "The AI is busy right now. Try again in a minute."
        : "The simulation failed. Please try again.";
    // They asked for a simulation and did not get one: give the slot back.
    await refundBudget(email, ip);
    await recordFailure(502, lastError || "no model returned a result", {
      kind: quota ? "quota" : busy ? "busy" : "server",
      channel: inputs.channel,
      industry: inputs.industry,
      objective: inputs.objective,
      landing: landing?.status ?? "none",
    });
    return json({ error, kind: quota ? "quota" : busy ? "busy" : "server", detail: lastError }, 502);
  }

  console.log(JSON.stringify({
    event: "simulation_ok", model_calls: modelCalls,
    global_used: budget.globalUsed, ceiling: DAILY_CEILING,
    person_used: budget.personUsed, channel: inputs.channel, industry: inputs.industry,
  }));
  return json({
    id: crypto.randomUUID().slice(0, 8),
    createdAt: new Date().toISOString(),
    inputs,
    results,
  });
}

// Root directory: services/advice-api (set in the Vercel project).
