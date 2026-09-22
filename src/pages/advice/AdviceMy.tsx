import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import AdviceShell from '@/advice/AdviceShell';
import { claimPending, listMine, sendMagicLink, type HistoryRow } from '@/advice/api';
import { supabase } from '@/integrations/supabase/client';

const scoreClass = (s: number | null) =>
  s == null ? 'text-white/40' : s >= 75 ? 'text-emerald-400' : s >= 50 ? 'text-amber-300' : 'text-red-400';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await sendMagicLink(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Your simulations</h1>
      {sent ? (
        <p className="mt-4 text-white/60">Check {email} for a sign-in link.</p>
      ) : (
        <>
          <p className="mt-3 text-white/60">Sign in with your email to see every simulation you’ve saved.</p>
          <form onSubmit={submit} className="mt-8 flex flex-col gap-2 sm:flex-row">
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com" aria-label="Email address"
              className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-[#3b82f6]"
            />
            <button type="submit" className="rounded-lg bg-[#3b82f6] px-5 py-2.5 text-sm font-medium hover:bg-[#2563eb]">Send link</button>
          </form>
          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        </>
      )}
    </div>
  );
};

const AdviceMy = () => {
  const [status, setStatus] = useState<'loading' | 'out' | 'in'>('loading');
  const [rows, setRows] = useState<HistoryRow[]>([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async (signedIn: boolean, userEmail?: string) => {
      if (!signedIn) return setStatus('out');
      setEmail(userEmail ?? '');
      setStatus('in');
      try {
        await claimPending();
        setRows(await listMine());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load your simulations.');
      }
    };
    supabase.auth.getSession().then(({ data }) => load(!!data.session, data.session?.user.email));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') load(true, session?.user.email);
      if (event === 'SIGNED_OUT') setStatus('out');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <AdviceShell>
      <Helmet>
        <title>My Simulations | ADvice</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {status === 'loading' && <div className="h-40 animate-pulse rounded-xl bg-white/[0.04]" />}
        {status === 'out' && <SignIn />}
        {status === 'in' && (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">My simulations</h1>
                <p className="mt-1 text-sm text-white/45">
                  Signed in as {email} ·{' '}
                  <button type="button" onClick={() => supabase.auth.signOut()} className="underline hover:text-white">Sign out</button>
                </p>
              </div>
              <Link to="/advice/simulate" className="inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-medium hover:bg-[#2563eb]">
                New simulation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {error && <p className="mt-6 text-sm text-red-300">{error}</p>}

            {rows.length === 0 && !error ? (
              <p className="mt-12 rounded-xl border border-white/[0.08] p-8 text-center text-white/55">No simulations yet. Run one and it’ll show up here.</p>
            ) : (
              <ul className="mt-8 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08]">
                {rows.map((r) => (
                  <li key={r.share_id}>
                    <Link to={`/advice/report/${r.share_id}`} className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[1fr_180px_110px_60px]">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{r.campaign_name || 'Untitled simulation'}</p>
                        <p className="text-xs text-white/40 sm:hidden">{r.channel} · {new Date(r.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className="hidden text-sm text-white/60 sm:block">{r.channel}</span>
                      <span className="hidden text-sm text-white/45 sm:block">{new Date(r.created_at).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                      <span className={`text-right text-lg font-semibold tabular-nums ${scoreClass(r.creative_score)}`}>{r.creative_score ?? '—'}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </AdviceShell>
  );
};

export default AdviceMy;
