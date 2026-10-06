import { supabase } from '@/integrations/supabase/client';
import { attributionFields } from '@/lib/attribution';
import { ADVICE_API_URL } from './config';
import type { SimInputs, Simulation } from './types';

const HISTORY_KEY = 'advice:history';
const RUNS_KEY = 'advice:runs';
const EMAIL_KEY = 'advice:email';
const PENDING_LEAD_KEY = 'advice:pendingLead';

/**
 * Free-use policy.
 *
 * The first report costs nothing and asks for nothing — that is what makes
 * people run one and share it. The email is asked for once they have seen a
 * real report, which converts far better than a wall in front of it. Counting
 * lives in the browser, so it is a nudge rather than a licence check.
 */
export const FREE_BEFORE_EMAIL = 1;
/**
 * Simulations per person per day.
 *
 * Matches the server, which is the real gate — this count lives in
 * localStorage and can be cleared, so it exists to set expectations rather
 * than to enforce anything.
 */
export const FREE_TOTAL = 3;

const readNum = (k: string) => {
  try {
    return Number(localStorage.getItem(k)) || 0;
  } catch {
    return 0;
  }
};

export const runCount = () => readNum(RUNS_KEY);

export function savedEmail(): string {
  try {
    return localStorage.getItem(EMAIL_KEY) ?? '';
  } catch {
    return '';
  }
}

export function rememberEmail(email: string) {
  try {
    localStorage.setItem(EMAIL_KEY, email);
  } catch {
    /* storage blocked — the gate simply asks again next time */
  }
}

/**
 * Email given at the gate, before any report exists.
 *
 * Nothing is sent yet: the notification is only useful with the results
 * attached, so the address waits here and goes out the moment the simulation
 * this person was mid-way through finishes.
 */
export function holdLead(email: string) {
  try {
    localStorage.setItem(PENDING_LEAD_KEY, email);
  } catch {
    /* storage blocked — the report page will ask again */
  }
}

function takeHeldLead(): string {
  try {
    const email = localStorage.getItem(PENDING_LEAD_KEY) ?? '';
    localStorage.removeItem(PENDING_LEAD_KEY);
    return email;
  } catch {
    return '';
  }
}

/** What the simulator should do before the next run. */
export function gateState(): 'ok' | 'email' | 'limit' {
  const runs = runCount();
  if (runs >= FREE_TOTAL) return 'limit';
  if (runs >= FREE_BEFORE_EMAIL && !savedEmail()) return 'email';
  return 'ok';
}


/** Downscale to something Gemini reads well without bloating the request. */
export function readImageFile(file: File): Promise<NonNullable<SimInputs['image']>> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const max = 1024;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Could not read that image.'));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Dimensions travel with the creative: the preview has to show it at the
      // shape the platform would, and a 4:5 image forced into 1.91:1 loses its
      // top third — which is usually where the headline sits.
      resolve({
        data: canvas.toDataURL('image/jpeg', 0.82).split(',')[1],
        mime: 'image/jpeg',
        width: canvas.width,
        height: canvas.height,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('That file does not look like an image.'));
    };
    img.src = url;
  });
}

/**
 * Why a simulation failed, carried through to the failure screen.
 *
 * It used to arrive as a bare string, so a crash in our own function and the
 * model provider being busy were indistinguishable. Both showed "the AI is
 * busy, try again" — which during an outage told everyone to retry into the
 * same crash for hours.
 */
export type FailureKind =
  | 'busy' | 'quota' | 'rate' | 'person_limit' | 'daily_limit'
  | 'server' | 'network' | 'input' | 'config';

export class SimulationError extends Error {
  kind: FailureKind;
  constructor(message: string, kind: FailureKind) {
    super(message);
    this.kind = kind;
  }
}

const kindFor = (status: number, given?: string): FailureKind => {
  const known = ['busy', 'quota', 'rate', 'person_limit', 'daily_limit', 'server', 'input', 'config'];
  if (given && known.includes(given)) return given as FailureKind;
  if (status === 429) return 'rate';
  if (status >= 500) return 'server';
  if (status >= 400) return 'input';
  return 'server';
};

async function viaVercel(inputs: SimInputs): Promise<Simulation> {
  let res: Response;
  try {
    res = await fetch(`${ADVICE_API_URL}/api/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // The server enforces the per-person allowance, so it needs the email
      // the gate collected. The browser's own count is a convenience only.
      body: JSON.stringify({ ...inputs, email: savedEmail() ?? '' }),
    });
  } catch {
    // Never reached the server at all — their connection, or we are down.
    throw new SimulationError('We could not reach the simulator.', 'network');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new SimulationError(
      data.error ?? 'The simulation failed. Please try again.',
      kindFor(res.status, data.kind),
    );
  }
  return data as Simulation;
}

async function viaLovable(inputs: SimInputs): Promise<Simulation> {
  const { data, error } = await supabase.functions.invoke('advice-simulate', { body: inputs });
  if (error) {
    let message = 'The simulation failed. Please try again.';
    try {
      const body = await (error as { context?: Response }).context?.json();
      if (body?.error) message = body.error;
    } catch {
      /* keep the generic message */
    }
    throw new Error(message);
  }
  return data as Simulation;
}

/**
 * Runs one simulation.
 *
 * Providers are tried in order — Vercel first once configured, then the
 * Lovable Cloud function — and the whole chain is retried a few times. The
 * backend currently answers only intermittently (two versions are deployed
 * across its instances), and a visitor should not have to press the button
 * again to get a report that a retry would have produced.
 */
// One retry, not four: every attempt can cost a model call.
const ATTEMPTS = 2;
const RETRY_DELAY_MS = 1200;

export async function runSimulation(inputs: SimInputs): Promise<Simulation> {
  const chain = ADVICE_API_URL ? [viaVercel, viaLovable] : [viaLovable];
  let last: unknown;
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    for (const run of chain) {
      try {
        const sim = await run(inputs);
        // The creative stays on the live report so the ad preview can show it,
        // but never reaches storage or a share link: a base64 image would blow
        // up localStorage and bloat the URL, and the creative is the
        // advertiser's, not something to pass around in a link.
        sim.inputs.image = inputs.image;
        try {
          localStorage.setItem(RUNS_KEY, String(runCount() + 1));
        } catch {
          /* storage blocked — the visitor keeps their free runs */
        }
        saveToHistory(sim);
        const held = takeHeldLead();
        // Fire and forget: a failed notification must not cost the visitor
        // the report they just waited for.
        if (held) void captureEmail(held, { sim }).catch(() => holdLead(held));
        return sim;
      } catch (e) {
        last = e;
        // A rate limit, a bad input or a missing key is the final answer;
        // retrying it only wastes the visitor's time. Matching on the kind
        // rather than the wording, which used to drift out of sync.
        // Limits and quota are final answers. Retrying them, or falling
        // through to the other backend on the same key, spends budget to
        // fail again.
        if (e instanceof SimulationError && ['rate', 'quota', 'person_limit', 'daily_limit', 'input', 'config'].includes(e.kind)) throw e;
      }
    }
    if (attempt < ATTEMPTS - 1) await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)));
  }
  throw last instanceof Error ? last : new SimulationError('The simulation failed. Please try again.', 'server');
}

// ── History: kept in this browser only ─────────────────────────────────────
export function readHistory(): Simulation[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
  } catch {
    return [];
  }
}

/** The report without the creative — everything that may be stored or shared. */
const withoutImage = (sim: Simulation): Simulation => ({
  ...sim,
  inputs: { ...sim.inputs, image: undefined },
});

function saveToHistory(sim: Simulation) {
  try {
    const rest = readHistory().filter((s) => s.id !== sim.id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify([withoutImage(sim), ...rest].slice(0, 50)));
  } catch {
    /* storage full or blocked — the report still works via its link */
  }
}

export function removeFromHistory(id: string) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(readHistory().filter((s) => s.id !== id)));
  } catch {
    /* ignore */
  }
}

// ── Share links: the whole report travels in the URL fragment ───────────────
// Deflate + base64url keeps a full report to a few KB. The fragment (#…) is
// never sent to any server, so shared reports stay between the people who
// have the link.
const fromB64Url = (s: string) =>
  Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream) {
  // Copy into a fresh ArrayBuffer so the Blob constructor sees a concrete
  // ArrayBuffer (not a SharedArrayBuffer-backed view), which TS accepts.
  const buf = new ArrayBuffer(bytes.length);
  new Uint8Array(buf).set(bytes);
  const out = new Blob([buf]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(out).arrayBuffer());
}

export async function encodeReport(sim: Simulation): Promise<string> {
  const packed = await pipe(new TextEncoder().encode(JSON.stringify(withoutImage(sim))), new CompressionStream('deflate-raw'));
  let s = '';
  for (let i = 0; i < packed.length; i += 0x8000) s += String.fromCharCode(...packed.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function decodeReport(fragment: string): Promise<Simulation | null> {
  try {
    const raw = await pipe(fromB64Url(fragment), new DecompressionStream('deflate-raw'));
    const sim = JSON.parse(new TextDecoder().decode(raw));
    return sim?.results?.predictions ? (sim as Simulation) : null;
  } catch {
    return null;
  }
}

export const reportUrl = async (sim: Simulation) =>
  `${window.location.origin}/advice/report#${await encodeReport(sim)}`;

// ── Email capture → AP Digital's formsubmit inbox (same as the calculators) ─
/**
 * Sends the lead to AP Digital's inbox.
 *
 * The email is asked for before the run, so the campaign details come from the
 * form (`inputs`); once a report exists, `sim` fills in the score and link too.
 */
export async function captureEmail(
  email: string,
  context?: { inputs?: SimInputs; sim?: Simulation },
): Promise<void> {
  const sim = context?.sim;
  const inputs = context?.inputs ?? sim?.inputs;
  const r = sim?.results;

  const range = (x?: { low: number; high: number }, unit = '') =>
    x ? `${x.low}${unit} – ${x.high}${unit}` : '';
  const money = (x?: { low: number; high: number }) =>
    x ? `$${x.low} – $${x.high}` : '';

  const payload: Record<string, string | number> = {
    email,
    source: 'ADvice simulator',
    'simulations-run': runCount(),

    // what they typed
    campaign: inputs?.campaignName || '(untitled)',
    channel: inputs?.channel ?? '',
    objective: inputs?.objective || 'Leads',
    industry: inputs?.industry ?? '',
    budget: inputs ? `$${inputs.budget.toLocaleString()} ${inputs.currency ?? 'CAD'}/mo` : '',
    product: inputs?.product?.slice(0, 500) ?? '',
    audience: inputs?.audience?.slice(0, 500) ?? '',
    'ad-headline': inputs?.headline ?? '',
    'ad-primary-text': inputs?.primaryText?.slice(0, 600) ?? '',
    'ad-description': inputs?.description ?? '',
    'landing-page': inputs?.landingUrl || '(none given)',
  };

  if (r) {
    const p = r.predictions;
    Object.assign(payload, {
      // what the simulation said
      'creative-score': `${r.creative.overall}/100 — ${r.creative.verdict}`,
      'score-headline': `${r.creative.headline.score} — ${r.creative.headline.note}`,
      'score-clarity': `${r.creative.clarity.score} — ${r.creative.clarity.note}`,
      'score-cta': `${r.creative.cta.score} — ${r.creative.cta.note}`,
      'score-emotion': `${r.creative.emotion.score} — ${r.creative.emotion.note}`,
      'score-intent': r.creative.intent ? `${r.creative.intent.score} — ${r.creative.intent.note}` : 'n/a (not search)',

      'predicted-ctr': range(p.ctr, '%'),
      'predicted-cpc': money(p.cpc),
      'predicted-clicks': range(p.clicks),
      'predicted-conversion-rate': range(p.conversionRate, '%'),
      'predicted-conversions': range(p.conversions),
      'predicted-cpa': money(p.cpa),
      'predicted-roas': p.roas ? `${p.roas.low}x – ${p.roas.high}x` : 'n/a',
      confidence: `${p.confidence} — ${p.confidenceReason}`,

      'risk-overall': r.risk.overall,
      'risk-budget': `${r.risk.budget.status} — ${r.risk.budget.note}`,
      'risk-competition': `${r.risk.competition.level} — ${r.risk.competition.note}`,
      'risk-seasonality': `${r.risk.seasonality.status} — ${r.risk.seasonality.note}`,

      recommendations: r.recommendations.improvements
        .map((m, i) => `${i + 1}. [${m.impact}] ${m.title} — ${m.detail}`)
        .join('\n\n'),
      'rewritten-headline': r.recommendations.headline,
      'rewritten-primary-text': r.recommendations.primaryText,
      'rewritten-description': r.recommendations.description,
      'budget-advice': r.recommendations.budget,
      'audience-advice': r.recommendations.audience.join(' · '),
      'landing-page-feedback': r.recommendations.landingPage ?? '(no landing page given)',
      competitors: `${r.competitors.advertisers.low}–${r.competitors.advertisers.high} advertisers · avg CPC $${r.competitors.avgCpc.low}–$${r.competitors.avgCpc.high}`,
      summary: r.summary,
      report: await reportUrl(sim!),
    });
  }

  // Where they came from, recorded at landing by PageViewTracker.
  Object.assign(payload, attributionFields());

  payload._subject = `ADvice lead: ${email}${r ? ` — ${inputs?.channel}, ${r.creative.overall}/100` : ''}`;
  payload._template = 'table';

  const res = await fetch('https://formsubmit.co/ajax/apdigital.core@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Something went wrong. Please try again.');
  rememberEmail(email);
}
