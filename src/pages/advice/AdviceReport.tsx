import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Check, Download, Link2, RotateCcw } from 'lucide-react';
import AdviceShell from '@/advice/AdviceShell';
import ReportView from '@/advice/ReportView';
import { captureEmail, decodeReport, encodeReport, reportUrl } from '@/advice/api';
import type { Simulation } from '@/advice/types';

const SaveCard = ({ sim }: { sim: Simulation }) => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');
    try {
      await captureEmail(email.trim(), sim);
      setState('sent');
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (state === 'sent') {
    return (
      <div className="advice-noprint rounded-xl border border-[#3b82f6]/30 bg-[#3b82f6]/[0.06] p-6">
        <p className="font-medium">You’re on the list</p>
        <p className="mt-1 text-sm text-white/60">We’ll send new ADvice features to {email}. This simulation is already saved under My simulations in this browser.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="advice-noprint rounded-xl border border-[#3b82f6]/30 bg-[#3b82f6]/[0.06] p-6">
      <p className="font-medium">Save your simulations</p>
      <p className="mt-1 text-sm text-white/60">Your reports are saved in this browser. Add your email to get a copy of this report’s link and hear about new features.</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="flex-1 rounded-lg border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm outline-none focus:border-[#3b82f6]"
        />
        <button type="submit" disabled={state === 'sending'} className="rounded-lg bg-[#3b82f6] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2563eb] disabled:opacity-60">
          {state === 'sending' ? 'Sending…' : 'Save my report'}
        </button>
      </div>
      {state === 'error' && <p className="mt-2 text-sm text-red-300">{message}</p>}
    </form>
  );
};

const AdviceReport = () => {
  const location = useLocation();
  const passed = (location.state as { sim?: Simulation; fresh?: boolean } | null) ?? null;
  const [sim, setSim] = useState<Simulation | null>(passed?.sim ?? null);
  const [missing, setMissing] = useState(false);
  const [copied, setCopied] = useState(false);
  const fresh = !!passed?.fresh;

  // A report opened from a link carries itself in the #fragment; one opened
  // from this app arrives in router state and gets its fragment written in,
  // so reloading or bookmarking the page keeps working.
  useEffect(() => {
    if (passed?.sim) {
      encodeReport(passed.sim).then((f) => window.history.replaceState(window.history.state, '', `/advice/report#${f}`));
      return;
    }
    const f = window.location.hash.slice(1);
    if (!f) return setMissing(true);
    decodeReport(f).then((s) => (s ? setSim(s) : setMissing(true)));
  }, [passed?.sim]);

  const share = async () => {
    if (!sim) return;
    const url = await reportUrl(sim);
    try {
      if (navigator.share && /Mobi/i.test(navigator.userAgent)) {
        await navigator.share({ title: 'My ADvice simulation', url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt('Copy this link', url);
    }
  };

  const title = sim ? `${sim.inputs.campaignName || 'Campaign simulation'} — ADvice report` : 'ADvice report';

  return (
    <AdviceShell>
      <Helmet>
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="An AI simulation of this ad campaign — predicted results, creative score and recommendations. Run your own free on ADvice." />
      </Helmet>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {missing ? (
          <div className="py-24 text-center">
            <h1 className="text-2xl font-semibold">Report not found</h1>
            <p className="mt-2 text-white/55">This link looks incomplete — make sure you copied all of it.</p>
            <Link to="/advice/simulate" className="mt-8 inline-block rounded-lg bg-[#3b82f6] px-5 py-2.5 text-sm font-medium">Run your own simulation</Link>
          </div>
        ) : !sim ? (
          <div className="space-y-4 py-12">
            {[0, 1, 2].map((k) => <div key={k} className="h-32 animate-pulse rounded-xl bg-white/[0.04]" />)}
          </div>
        ) : (
          <>
            {!fresh && (
              <div className="advice-noprint mb-8 flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/65">Someone shared this ADvice simulation with you.</p>
                <Link to="/advice/simulate" className="text-sm font-medium text-[#60a5fa] hover:text-white">Run your own free →</Link>
              </div>
            )}

            <ReportView sim={sim} />

            <div className="advice-noprint mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-8 sm:flex-row">
              <Link to="/advice/simulate" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/85">
                <RotateCcw className="h-4 w-4" /> Run another simulation
              </Link>
              <button type="button" onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium hover:border-white/35">
                <Download className="h-4 w-4" /> Download report as PDF
              </button>
              <button type="button" onClick={share} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium hover:border-white/35">
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Link2 className="h-4 w-4" />}
                {copied ? 'Link copied' : 'Share report'}
              </button>
            </div>

            {fresh && <div className="mt-8"><SaveCard sim={sim} /></div>}
          </>
        )}
      </div>
    </AdviceShell>
  );
};

export default AdviceReport;
