// Marketing Audit AI — generates a personalized marketing analysis from quiz answers.
// Uses Anthropic Claude when ANTHROPIC_API_KEY is set; otherwise falls back to a
// sophisticated rule-based engine so the tool is never broken.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = [
  "https://ap-digital.ca",
  "https://www.ap-digital.ca",
  "https://apdigital.lovable.app",
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const safeOrigin = origin || "";
  const allowed =
    allowedOrigins.some((o) => safeOrigin.startsWith(o)) ||
    safeOrigin.includes(".lovableproject.com") ||
    safeOrigin.includes(".lovable.app") ||
    (Deno.env.get("ENVIRONMENT") === "development" &&
      (safeOrigin.startsWith("http://localhost") ||
        safeOrigin.startsWith("http://127.0.0.1")));
  if (!allowed) return {};
  return {
    "Access-Control-Allow-Origin": safeOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
  };
}

// Rate limit (in-memory, resets on cold start)
const rateLimits = new Map<string, number[]>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 3600000;

function checkRate(key: string): boolean {
  const now = Date.now();
  const hits = (rateLimits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_REQUESTS) return false;
  hits.push(now);
  rateLimits.set(key, hits);
  return true;
}

const ALLOWED_INDUSTRIES = [
  "trades", "salon", "real-estate", "coaching", "ecommerce",
  "saas", "restaurant", "fitness", "professional-services", "other",
];

const DIMENSIONS = ["social", "ads", "seo", "website", "content", "reviews", "funnel"] as const;
type Dimension = typeof DIMENSIONS[number];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+/i;

interface AuditPayload {
  email: string;
  firstName?: string;
  businessName?: string;
  websiteUrl?: string;
  industry: string;
  answers: Record<Dimension, number>;
}

function validate(body: unknown): { ok: true; data: AuditPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  const b = body as Record<string, unknown>;

  const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
  if (!EMAIL_REGEX.test(email) || email.length > 255) return { ok: false, error: "Invalid email" };

  const industry = typeof b.industry === "string" ? b.industry : "";
  if (!ALLOWED_INDUSTRIES.includes(industry)) return { ok: false, error: "Invalid industry" };

  const answers = b.answers as Record<string, unknown> | undefined;
  if (!answers || typeof answers !== "object") return { ok: false, error: "Missing answers" };

  const cleanAnswers: Record<Dimension, number> = {} as Record<Dimension, number>;
  for (const dim of DIMENSIONS) {
    const v = answers[dim];
    if (typeof v !== "number" || v < 0 || v > 100) {
      return { ok: false, error: `Invalid answer for ${dim}` };
    }
    cleanAnswers[dim] = Math.round(v);
  }

  const firstName = typeof b.firstName === "string" ? b.firstName.trim().slice(0, 60) : undefined;
  const businessName = typeof b.businessName === "string" ? b.businessName.trim().slice(0, 120) : undefined;
  const websiteUrlRaw = typeof b.websiteUrl === "string" ? b.websiteUrl.trim() : "";
  const websiteUrl = websiteUrlRaw && URL_REGEX.test(websiteUrlRaw) ? websiteUrlRaw.slice(0, 300) : undefined;

  return { ok: true, data: { email, firstName, businessName, websiteUrl, industry, answers: cleanAnswers } };
}

// ── Industry benchmarks (what a healthy business in this space looks like) ──
const BENCHMARKS: Record<string, Record<Dimension, number>> = {
  trades:               { social: 55, ads: 70, seo: 75, website: 65, content: 50, reviews: 80, funnel: 60 },
  salon:                { social: 80, ads: 65, seo: 60, website: 60, content: 70, reviews: 85, funnel: 55 },
  "real-estate":        { social: 75, ads: 70, seo: 65, website: 70, content: 65, reviews: 75, funnel: 65 },
  coaching:             { social: 80, ads: 60, seo: 55, website: 65, content: 80, reviews: 65, funnel: 75 },
  ecommerce:            { social: 70, ads: 80, seo: 75, website: 85, content: 60, reviews: 70, funnel: 80 },
  saas:                 { social: 55, ads: 70, seo: 80, website: 85, content: 75, reviews: 60, funnel: 80 },
  restaurant:           { social: 75, ads: 55, seo: 70, website: 55, content: 60, reviews: 85, funnel: 45 },
  fitness:              { social: 80, ads: 65, seo: 60, website: 60, content: 70, reviews: 75, funnel: 60 },
  "professional-services": { social: 60, ads: 60, seo: 75, website: 70, content: 65, reviews: 70, funnel: 70 },
  other:                { social: 65, ads: 65, seo: 65, website: 65, content: 65, reviews: 70, funnel: 65 },
};

// Human label per dimension
const DIM_LABELS: Record<Dimension, string> = {
  social: "Social Media",
  ads: "Paid Ads",
  seo: "SEO & Google Presence",
  website: "Website & Conversion",
  content: "Content Engine",
  reviews: "Reviews & Reputation",
  funnel: "Sales & Follow-up",
};

// ── Rule-based analysis (fallback + Claude-free mode) ───────────────────────

function generateInsight(dim: Dimension, score: number, benchmark: number, industry: string): string {
  const gap = benchmark - score;
  const bucket =
    score < 35 ? "critical" : score < 60 ? "weak" : score < 80 ? "okay" : "strong";

  const pool: Record<Dimension, Record<string, string[]>> = {
    social: {
      critical: [
        `You're essentially invisible on social. In ${industry}, prospects scroll before they search — every day without a feed is a day a competitor wins by default.`,
        `Zero signal on social means zero top-of-funnel. Most ${industry} buyers check Instagram or TikTok before they ever visit a website.`,
      ],
      weak: [
        `Your social is intermittent — posting when inspired, silent when busy. The algorithm rewards cadence, not quality spikes.`,
        `You're on social, but the feed reads like a graveyard. A steady 3x/week schedule would outperform your current effort by 5–10×.`,
      ],
      okay: [
        `You're consistent enough to be findable, but engagement is likely shallow. The fix is usually hooks and first-line tension, not frequency.`,
        `You post regularly but the content mix is weak. Mixing carousels, short-form video, and story polls lifts reach without more work.`,
      ],
      strong: [
        `Social is working — keep the cadence, but audit whether it's actually driving leads or just vanity engagement.`,
        `Strong presence. The next move is turning followers into booked calls with a pinned lead magnet and weekly CTA posts.`,
      ],
    },
    ads: {
      critical: [
        `No paid traffic means you're 100% dependent on referrals and organic — which is fragile. One ad set running at $20/day can double your pipeline.`,
        `Zero ads = zero control over volume. You can't scale what you can't buy.`,
      ],
      weak: [
        `Ads are running but bleeding. Usually it's one of three things: wrong audience, weak creative, or a broken landing page. All fixable in a week.`,
        `You've tried ads and got burned. Almost always a targeting or tracking issue — not a "ads don't work" issue.`,
      ],
      okay: [
        `Ads are generating something, but CPL is probably higher than it needs to be. Most accounts we audit have 30–50% wasted spend on bad placements and audiences.`,
      ],
      strong: [
        `Ads are performing — the question is whether you're at saturation on your best audience. If CPL has flatlined, it's time to test new angles and creative.`,
      ],
    },
    seo: {
      critical: [
        `You're invisible on Google. Every day, people in your area are searching for exactly what you sell — and finding your competitors instead.`,
        `No SEO foundation means the cheapest, most sustainable traffic channel is closed to you.`,
      ],
      weak: [
        `You're listed but not ranking. A Google Business Profile with reviews + 3 location pages usually doubles local visibility in 60 days.`,
      ],
      okay: [
        `You rank for something, but probably not the commercial-intent terms that actually convert. "[service] near me" beats "best [service] tips" every time.`,
      ],
      strong: [
        `Strong SEO foundation. The compound growth play is publishing 2 SEO-targeted case studies per month with local keywords.`,
      ],
    },
    website: {
      critical: [
        `Without a site (or with a broken one), every other channel leaks. This is the #1 thing to fix — nothing else compounds without it.`,
      ],
      weak: [
        `Your site exists but isn't converting. Usually: slow load, weak headline, buried CTA, or no social proof above the fold. Each is a 1-hour fix.`,
      ],
      okay: [
        `The site works, but conversion rate is probably 1–2% when it could be 4–6%. Re-writing the hero and adding sticky CTAs typically doubles leads.`,
      ],
      strong: [
        `Site is solid. Next leverage: page speed optimization and A/B testing the hero message against different pain points.`,
      ],
    },
    content: {
      critical: [
        `No content means no trust. In ${industry}, buyers need 5–7 touchpoints before they'll fill a form. Without content, every touchpoint has to come from paid.`,
      ],
      weak: [
        `You're creating occasionally, but it's not compounding. The winning format for ${industry} is usually 1 long piece per week, repurposed into 5 short-form clips.`,
      ],
      okay: [
        `Content is flowing, but probably not serving a specific funnel stage. Map each piece to "awareness / consideration / decision" and you'll see the gaps.`,
      ],
      strong: [
        `Content engine is working. Scale play: turn your best-performing pieces into evergreen lead magnets.`,
      ],
    },
    reviews: {
      critical: [
        `Reviews are the single highest-ROI marketing asset you're not using. Every competitor with 50+ reviews is taking your leads before you get a chance.`,
      ],
      weak: [
        `You have some reviews but not enough social proof velocity. Automating the review request (SMS after service) 3×'s volume in 30 days.`,
      ],
      okay: [
        `Reviews are decent, but you're probably not responding to them. Every review response is SEO fuel and conversion insurance.`,
      ],
      strong: [
        `Strong reputation. Now turn it into marketing — use review quotes in ads and landing pages, not just on the profile page.`,
      ],
    },
    funnel: {
      critical: [
        `No follow-up system = leaks everywhere. The industry average is that 80% of sales happen between touch 5–12, but most ${industry} businesses stop after touch 2.`,
      ],
      weak: [
        `You're capturing leads but the follow-up is inconsistent. A 7-day email sequence + 3 SMS triggers recovers 20–30% of lost deals.`,
      ],
      okay: [
        `Funnel exists, but probably manual. Automating the first 3 touches alone saves 8+ hours a week.`,
      ],
      strong: [
        `Follow-up game is strong. The next unlock is winback campaigns for leads that went cold 60+ days ago.`,
      ],
    },
  };

  const lines = pool[dim][bucket];
  const line = lines[Math.floor(Math.random() * lines.length)];
  const gapNote = gap >= 20
    ? ` You're ${gap} points behind the industry benchmark — meaningful, but closable inside a quarter.`
    : gap >= 10
    ? ` You're tracking just below average for ${industry} — a few targeted fixes and you're ahead.`
    : gap > 0
    ? ` You're essentially at the industry average — the upside is in going beyond it, not catching up.`
    : ` You're ahead of the ${industry} benchmark here — this is a strength to amplify.`;
  return line + gapNote;
}

function buildActionItems(dim: Dimension, industry: string): string[] {
  const map: Record<Dimension, string[]> = {
    social: [
      "Pick ONE platform where your buyer actually scrolls — stop trying to be everywhere.",
      `Post 3× per week with a rotating mix: 1 hook post, 1 case study/testimonial, 1 educational carousel.`,
      "Pin a post with your lead magnet — every new follower should see it within 10 seconds.",
    ],
    ads: [
      "Pause any ad set that's been running 7+ days with CPL over 1.5× target.",
      "Rebuild 3 new creatives this week: 1 pain-focused, 1 result-focused, 1 testimonial-driven.",
      "Install the Meta Pixel + Conversions API properly — most agencies skip this and burn budget.",
    ],
    seo: [
      "Claim and optimize your Google Business Profile — photos, services, Q&A, weekly posts.",
      "Build 3 local landing pages: [service] in [city] for your top 3 service areas.",
      "Ask your 10 best clients for a Google review this week. One text each. Do it now.",
    ],
    website: [
      "Rewrite your hero headline as a promise: outcome + timeframe + proof. No jargon.",
      "Add a sticky CTA bar on mobile — most sites lose 40% of leads because the CTA scrolls off.",
      "Run PageSpeed Insights and fix anything under 75 on mobile. Every second costs 7% conversion.",
    ],
    content: [
      "Pick one lead-generating content format and commit for 30 days. Pick the one you'd actually do.",
      `Batch content: record 4 videos in one session, repurpose each into 3–5 short clips.`,
      "Every piece of content should end with a clear next step — link in bio is not a CTA.",
    ],
    reviews: [
      "Automate a review request via SMS 1 hour after service completion.",
      "Respond to every review within 24 hours — yes, even the 5-star ones.",
      "Add your 5 best review quotes directly to your website hero and landing pages.",
    ],
    funnel: [
      "Build a 7-email nurture sequence for the next 30 days of new leads.",
      "Add SMS to your funnel — open rates are 98% vs 20% for email.",
      "Set up a winback campaign for every lead that hasn't replied in 14 days.",
    ],
  };
  return map[dim];
}

function ruleBasedAnalysis(data: AuditPayload) {
  const bench = BENCHMARKS[data.industry] || BENCHMARKS.other;

  const dimensionAnalyses = DIMENSIONS.map((dim) => {
    const score = data.answers[dim];
    const benchmark = bench[dim];
    return {
      dimension: dim,
      label: DIM_LABELS[dim],
      score,
      benchmark,
      insight: generateInsight(dim, score, benchmark, data.industry),
      actions: buildActionItems(dim, data.industry),
    };
  });

  const overall = Math.round(
    DIMENSIONS.reduce((sum, d) => sum + data.answers[d], 0) / DIMENSIONS.length
  );
  const benchAvg = Math.round(
    DIMENSIONS.reduce((sum, d) => sum + bench[d], 0) / DIMENSIONS.length
  );

  const weakest = [...dimensionAnalyses].sort((a, b) => a.score - b.score)[0];
  const strongest = [...dimensionAnalyses].sort((a, b) => b.score - a.score)[0];

  // Tier summary
  const tier =
    overall >= 80 ? "Optimized" : overall >= 65 ? "Solid but leaking" :
    overall >= 45 ? "Underperforming" : "Critical gaps";

  const greeting = data.firstName ? `${data.firstName}, ` : "";
  const biz = data.businessName ? ` (${data.businessName})` : "";

  const headline =
    tier === "Optimized"
      ? `${greeting}your marketing is in the top tier — you're doing what 90% of your industry isn't.`
      : tier === "Solid but leaking"
      ? `${greeting}your marketing is working — but there's real money being left on the table.`
      : tier === "Underperforming"
      ? `${greeting}your marketing has foundation gaps that are costing you leads every week.`
      : `${greeting}your marketing needs urgent triage — multiple systems are offline.`;

  const summary =
    `Based on your answers${biz}, you scored ${overall}% overall — the ${data.industry} benchmark is ${benchAvg}%. ` +
    `Your biggest leak is ${weakest.label} at ${weakest.score}% (benchmark: ${weakest.benchmark}%). ` +
    `Your strongest area is ${strongest.label} at ${strongest.score}%. ` +
    `The shortest path to more leads is fixing ${weakest.label} first — the compounding effect on the other channels is significant.`;

  const nextStep =
    tier === "Critical gaps"
      ? `Start with ${weakest.label}. Nothing else compounds until this is stable. If you try to fix 3 things at once, you'll finish none.`
      : tier === "Underperforming"
      ? `Attack ${weakest.label} for the next 30 days. Don't touch the other channels until this one is at benchmark.`
      : tier === "Solid but leaking"
      ? `You don't need a rebuild — you need 2–3 surgical fixes in ${weakest.label} and ${dimensionAnalyses[1].label}. That's probably 6 weeks of focused work.`
      : `Keep doing what's working. The asymmetric upside now is systemizing — so this doesn't depend on you showing up every day.`;

  return {
    overall,
    benchmark: benchAvg,
    tier,
    headline,
    summary,
    nextStep,
    dimensions: dimensionAnalyses,
    weakest: weakest.dimension,
    strongest: strongest.dimension,
  };
}

// ── Optional Claude enhancement ─────────────────────────────────────────────

async function claudeEnhance(
  data: AuditPayload,
  base: ReturnType<typeof ruleBasedAnalysis>,
): Promise<ReturnType<typeof ruleBasedAnalysis> | null> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return null;

  const prompt = `You are a senior marketing strategist writing a personalized audit for a ${data.industry} business${data.businessName ? ` called "${data.businessName}"` : ""}${data.websiteUrl ? ` (${data.websiteUrl})` : ""}.

Their self-reported scores (0-100) per dimension:
${DIMENSIONS.map((d) => `- ${DIM_LABELS[d]}: ${data.answers[d]}/100 (industry benchmark: ${BENCHMARKS[data.industry][d]})`).join("\n")}

Overall score: ${base.overall}% (benchmark for ${data.industry}: ${base.benchmark}%)
Weakest area: ${DIM_LABELS[base.weakest as Dimension]}

Return strict JSON with this shape (no markdown, no prose outside JSON):
{
  "headline": "one sharp sentence that hooks them, max 140 chars",
  "summary": "2-3 sentence diagnosis tying the scores together, specific to ${data.industry}",
  "nextStep": "the ONE thing they should do this week, with a reason",
  "dimensionInsights": {
    "social": "2 sentences max, specific and non-generic",
    "ads": "2 sentences max",
    "seo": "2 sentences max",
    "website": "2 sentences max",
    "content": "2 sentences max",
    "reviews": "2 sentences max",
    "funnel": "2 sentences max"
  }
}

Voice: direct, no fluff, no platitudes. Call out real issues. Reference their industry specifically. Write like you're texting a smart friend, not writing a corporate report.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1600,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      console.error("Claude API error", res.status, await res.text());
      return null;
    }
    const body = await res.json();
    const text = body?.content?.[0]?.text;
    if (typeof text !== "string") return null;

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd < 0) return null;
    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    return {
      ...base,
      headline: typeof parsed.headline === "string" ? parsed.headline : base.headline,
      summary: typeof parsed.summary === "string" ? parsed.summary : base.summary,
      nextStep: typeof parsed.nextStep === "string" ? parsed.nextStep : base.nextStep,
      dimensions: base.dimensions.map((d) => ({
        ...d,
        insight:
          parsed?.dimensionInsights?.[d.dimension] &&
          typeof parsed.dimensionInsights[d.dimension] === "string"
            ? parsed.dimensionInsights[d.dimension]
            : d.insight,
      })),
    };
  } catch (err) {
    console.error("Claude enhancement failed", err);
    return null;
  }
}

// ── Email delivery via Resend (optional) ────────────────────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmailHtml(
  data: AuditPayload,
  analysis: ReturnType<typeof ruleBasedAnalysis>,
): string {
  const greeting = data.firstName ? `Hi ${escapeHtml(data.firstName)},` : "Hi,";
  const rows = analysis.dimensions
    .map((d) => {
      const gap = d.benchmark - d.score;
      const color = d.score >= d.benchmark ? "#14b8a6" : gap >= 20 ? "#f97316" : "#eab308";
      return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #1f2937;">
            <div style="font-weight:600;color:#f9fafb;font-size:15px;">${escapeHtml(d.label)}</div>
            <div style="color:#9ca3af;font-size:13px;margin-top:2px;">
              You: <span style="color:${color};font-weight:600;">${d.score}</span> &nbsp;·&nbsp;
              Benchmark: ${d.benchmark}
            </div>
            <div style="color:#d1d5db;font-size:13px;margin-top:6px;line-height:1.5;">${escapeHtml(d.insight)}</div>
          </td>
        </tr>`;
    })
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111827;border:1px solid #1f2937;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:32px;">
          <div style="color:#14b8a6;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Marketing Health Audit</div>
          <h1 style="color:#f9fafb;font-size:22px;line-height:1.3;margin:12px 0 8px;">${escapeHtml(analysis.headline)}</h1>
          <p style="color:#9ca3af;font-size:13px;margin:0 0 20px;">${greeting} here's your report.</p>

          <div style="background:#0a0a0a;border:1px solid #1f2937;border-radius:8px;padding:20px;margin:16px 0;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
              <div>
                <div style="color:#9ca3af;font-size:12px;">Overall Score</div>
                <div style="color:#f9fafb;font-size:36px;font-weight:700;">${analysis.overall}<span style="color:#6b7280;font-size:18px;">/100</span></div>
              </div>
              <div style="text-align:right;">
                <div style="color:#9ca3af;font-size:12px;">Industry Benchmark</div>
                <div style="color:#14b8a6;font-size:20px;font-weight:600;">${analysis.benchmark}</div>
              </div>
            </div>
            <div style="margin-top:12px;color:#14b8a6;font-size:14px;font-weight:600;">${escapeHtml(analysis.tier)}</div>
          </div>

          <p style="color:#d1d5db;font-size:14px;line-height:1.6;margin:16px 0;">${escapeHtml(analysis.summary)}</p>

          <div style="background:#0a0a0a;border-left:3px solid #14b8a6;padding:16px;margin:20px 0;border-radius:4px;">
            <div style="color:#14b8a6;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Your One Next Step</div>
            <div style="color:#f9fafb;font-size:14px;line-height:1.6;margin-top:8px;">${escapeHtml(analysis.nextStep)}</div>
          </div>

          <h2 style="color:#f9fafb;font-size:16px;margin:24px 0 8px;">Channel-by-channel breakdown</h2>
          <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>

          <div style="margin-top:32px;padding-top:20px;border-top:1px solid #1f2937;text-align:center;">
            <a href="https://ap-digital.ca" style="display:inline-block;background:#14b8a6;color:#0a0a0a;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;font-size:14px;">Book a strategy call</a>
          </div>

          <p style="color:#6b7280;font-size:11px;line-height:1.6;margin:24px 0 0;text-align:center;">
            AP Digital · Vancouver · <a href="https://ap-digital.ca" style="color:#9ca3af;">ap-digital.ca</a><br>
            Benchmarks sourced from AP Digital client data and public industry reports.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sendResultEmail(
  data: AuditPayload,
  analysis: ReturnType<typeof ruleBasedAnalysis>,
): Promise<boolean> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return false;
  const from = Deno.env.get("AUDIT_EMAIL_FROM") || "AP Digital <audit@ap-digital.ca>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [data.email],
        subject: `Your Marketing Health Report — ${analysis.overall}/100 (${analysis.tier})`,
        html: renderEmailHtml(data, analysis),
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send failed", err);
    return false;
  }
}

// ── Handler ─────────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = getCorsHeaders(origin);

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...cors, "content-type": "application/json" },
    });
  }

  const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
  if (!checkRate(ip)) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again in an hour." }), {
      status: 429, headers: { ...cors, "content-type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400, headers: { ...cors, "content-type": "application/json" },
    });
  }

  const validation = validate(body);
  if (!validation.ok) {
    return new Response(JSON.stringify({ error: validation.error }), {
      status: 400, headers: { ...cors, "content-type": "application/json" },
    });
  }
  const data = validation.data;

  const base = ruleBasedAnalysis(data);
  const enhanced = await claudeEnhance(data, base);
  const analysis = enhanced || base;
  const source = enhanced ? "claude" : "rule-based";

  const emailed = await sendResultEmail(data, analysis);

  // Persist (non-blocking for the user — we still return analysis if store fails)
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (supabaseUrl && serviceKey) {
      const admin = createClient(supabaseUrl, serviceKey);
      await admin.from("audit_submissions").insert({
        email: data.email,
        first_name: data.firstName ?? null,
        business_name: data.businessName ?? null,
        website_url: data.websiteUrl ?? null,
        industry: data.industry,
        answers: data.answers,
        scores: Object.fromEntries(analysis.dimensions.map((d) => [d.dimension, d.score])),
        overall_score: analysis.overall,
        weakest_area: analysis.weakest,
        analysis_source: source,
        analysis,
      });
    }
  } catch (err) {
    console.error("Failed to persist audit", err);
  }

  return new Response(JSON.stringify({ ok: true, source, analysis, emailed }), {
    status: 200, headers: { ...cors, "content-type": "application/json" },
  });
});
