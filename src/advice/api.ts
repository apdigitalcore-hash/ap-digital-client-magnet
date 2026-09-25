import { supabase } from '@/integrations/supabase/client';
import type { SimInputs, Simulation } from './types';

const HISTORY_KEY = 'advice:history';

export async function runSimulation(inputs: SimInputs): Promise<Simulation> {
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
  const sim = data as Simulation;
  saveToHistory(sim);
  return sim;
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
export async function captureEmail(email: string, sim: Simulation): Promise<void> {
  const res = await fetch('https://formsubmit.co/ajax/apdigital.core@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      email,
      source: 'ADvice simulator',
      campaign: sim.inputs.campaignName || '(untitled)',
      channel: sim.inputs.channel,
      industry: sim.inputs.industry,
      budget: `$${sim.inputs.budget.toLocaleString()}/mo`,
      'creative-score': sim.results.creative.overall,
      report: await reportUrl(sim),
      _subject: `ADvice signup: ${email} — ${sim.inputs.channel}`,
      _template: 'table',
    }),
  });
  if (!res.ok) throw new Error('Something went wrong. Please try again.');
}
