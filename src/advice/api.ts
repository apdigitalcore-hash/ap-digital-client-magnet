import { supabase } from '@/integrations/supabase/client';
import { ADVICE_API_URL } from './config';
import type { SimInputs, Simulation } from './types';

const HISTORY_KEY = 'advice:history';
const RUNS_KEY = 'advice:runs';
const EMAIL_KEY = 'advice:email';

/**
 * Free-use policy.
 *
 * The first report costs nothing and asks for nothing — that is what makes
 * people run one and share it. The email is asked for once they have seen a
 * real report, which converts far better than a wall in front of it. Counting
 * lives in the browser, so it is a nudge rather than a licence check.
 */
export const FREE_BEFORE_EMAIL = 1;
export const FREE_TOTAL = 5;

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

/** What the simulator should do before the next run. */
export function gateState(): 'ok' | 'email' | 'limit' {
  const runs = runCount();
  if (runs >= FREE_TOTAL) return 'limit';
  if (runs >= FREE_BEFORE_EMAIL && !savedEmail()) return 'email';
  return 'ok';
}


/** Downscale to something Gemini reads well without bloating the request. */
export function readImageFile(file: File): Promise<{ data: string; mime: string }> {
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
      resolve({ data: canvas.toDataURL('image/jpeg', 0.82).split(',')[1], mime: 'image/jpeg' });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('That file does not look like an image.'));
    };
    img.src = url;
  });
}

async function viaVercel(inputs: SimInputs): Promise<Simulation> {
  const res = await fetch(`${ADVICE_API_URL}/api/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? 'The simulation failed. Please try again.');
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
const ATTEMPTS = 4;
const RETRY_DELAY_MS = 1200;

export async function runSimulation(inputs: SimInputs): Promise<Simulation> {
  const chain = ADVICE_API_URL ? [viaVercel, viaLovable] : [viaLovable];
  let last: unknown;
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    for (const run of chain) {
      try {
        const sim = await run(inputs);
        // The creative is not part of the report, and a base64 image would
        // blow up both localStorage and the share link.
        delete sim.inputs.image;
        try {
          localStorage.setItem(RUNS_KEY, String(runCount() + 1));
        } catch {
          /* storage blocked — the visitor keeps their free runs */
        }
        saveToHistory(sim);
        return sim;
      } catch (e) {
        last = e;
        // A rate-limit or validation message is the final answer; retrying
        // it just wastes the visitor's time.
        const msg = e instanceof Error ? e.message : '';
        if (/lot of simulations|capacity|isn.t configured/i.test(msg)) throw e;
      }
    }
    if (attempt < ATTEMPTS - 1) await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)));
  }
  throw last instanceof Error ? last : new Error('The simulation failed. Please try again.');
}

// ── History: kept in this browser only ─────────────────────────────────────
export function readHistory(): Simulation[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveToHistory(sim: Simulation) {
  try {
    const rest = readHistory().filter((s) => s.id !== sim.id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify([sim, ...rest].slice(0, 50)));
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
  const packed = await pipe(new TextEncoder().encode(JSON.stringify(sim)), new CompressionStream('deflate-raw'));
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
  const res = await fetch('https://formsubmit.co/ajax/apdigital.core@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      email,
      source: 'ADvice simulator',
      campaign: inputs?.campaignName || '(untitled)',
      channel: inputs?.channel ?? '',
      industry: inputs?.industry ?? '',
      budget: inputs ? `$${inputs.budget.toLocaleString()}/mo` : '',
      'creative-score': sim ? sim.results.creative.overall : '(before first run)',
      'simulations-run': runCount(),
      product: inputs?.product?.slice(0, 300) ?? '',
      audience: inputs?.audience?.slice(0, 300) ?? '',
      headline: inputs?.headline ?? '',
      report: sim ? await reportUrl(sim) : '',
      _subject: `ADvice signup: ${email}`,
      _template: 'table',
    }),
  });
  if (!res.ok) throw new Error('Something went wrong. Please try again.');
  rememberEmail(email);
}
