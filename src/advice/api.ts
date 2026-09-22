import { supabase } from '@/integrations/supabase/client';
import type { SimInputs, Simulation } from './types';

const CLAIMS_KEY = 'advice:claims';

// Claim tokens for simulations this browser ran anonymously. They let the
// user attach those runs to an account after signing in.
function readClaims(): string[] {
  try {
    return JSON.parse(localStorage.getItem(CLAIMS_KEY) ?? '[]');
  } catch {
    return [];
  }
}
function writeClaims(tokens: string[]) {
  try {
    localStorage.setItem(CLAIMS_KEY, JSON.stringify(tokens.slice(-100)));
  } catch {
    /* storage unavailable — claiming just won't carry over */
  }
}

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
  if (data.claimToken) {
    writeClaims([...readClaims(), data.claimToken]);
    // Already signed in: attach straight away.
    const { data: s } = await supabase.auth.getSession();
    if (s.session) void claimPending();
  }
  return data as Simulation;
}

export async function getReport(shareId: string): Promise<Simulation | null> {
  const { data, error } = await supabase.rpc('get_advice_report' as never, { _share_id: shareId } as never);
  const row = (data as unknown as Array<Record<string, unknown>> | null)?.[0];
  if (error || !row) return null;
  return {
    shareId: row.share_id as string,
    createdAt: row.created_at as string,
    inputs: row.inputs as Simulation['inputs'],
    results: row.results as Simulation['results'],
  };
}

export async function claimPending(): Promise<void> {
  const tokens = readClaims();
  if (!tokens.length) return;
  const { error } = await supabase.rpc('claim_advice_simulations' as never, { _tokens: tokens } as never);
  if (!error) writeClaims([]);
}

export async function sendMagicLink(email: string): Promise<void> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}/advice/my` },
  });
  if (error) throw new Error(error.message);
}

export interface HistoryRow {
  share_id: string;
  campaign_name: string | null;
  channel: string;
  industry: string;
  creative_score: number | null;
  created_at: string;
}

export async function listMine(): Promise<HistoryRow[]> {
  const { data, error } = await supabase
    .from('advice_simulations' as never)
    .select('share_id, campaign_name, channel, industry, creative_score, created_at')
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as HistoryRow[];
}
