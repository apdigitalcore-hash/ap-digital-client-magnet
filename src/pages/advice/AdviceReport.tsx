import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Check, Download, Image as ImageIcon, Link2, RotateCcw } from 'lucide-react';
import AdviceShell from '@/advice/AdviceShell';
import ReportView from '@/advice/ReportView';
import { captureEmail, decodeReport, encodeReport, reportUrl, savedEmail } from '@/advice/api';
import { downloadReportPdf } from '@/advice/pdf';
import { renderPreviewImage } from '@/advice/previewImage';
import { saveBlob } from '@/advice/saveFile';
import { previewPair } from '@/advice/adPreview';
import { trackCustom, trackGa4 } from '@/lib/pixel';
import type { Simulation } from '@/advice/types';

const SaveCard = ({ sim }: { sim: Simulation }) => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');
    try {
      await captureEmail(email.trim(), { sim });
      // A free-tool signup, not a booked call — Lead is reserved for bookings.
      trackCustom('AdviceSignup', { content_name: 'ADvice report email', content_category: sim.inputs.industry });
      trackGa4('report_email_saved', {
        channel: sim.inputs.channel,
        industry: sim.inputs.industry,
        objective: sim.inputs.objective || 'Leads',
        budget: sim.inputs.budget,
      });
      setState('sent');
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (state === 'sent') {
    return (
      <div className="advice-noprint rounded-xl border border-black/[0.06] bg-[#f5f5f7] p-6">
        <p className="font-medium">You’re on the list</p>
        <p className="mt-1 text-sm text-[#6e6e73]">We’ll send new ADvice features to {email}. This simulation is already saved under My simulations in this browser.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="advice-noprint rounded-xl border border-black/[0.06] bg-[#f5f5f7] p-6">
      <p className="font-medium">Save your simulations</p>
      <p className="mt-1 text-sm text-[#6e6e73]">Your reports are saved in this browser. Add your email to get a copy of this report’s link and hear about new features.</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="min-h-[44px] flex-1 rounded-2xl border border-black/[0.1] bg-white px-3.5 py-2.5 text-[15px] outline-none focus:border-[#1d1d1f]"
        />
        <button type="submit" disabled={state === 'sending'} className="min-h-[44px] rounded-full bg-[#1d1d1f] px-5 py-2.5 text-sm font-medium text-white hover:bg-black disabled:opacity-60">
          {state === 'sending' ? 'Sending…' : 'Save my report'}
        </button>
      </div>
      {state === 'error' && <p className="mt-2 text-sm text-[#d70015]">{message}</p>}
      <p className="mt-3 text-xs text-[#86868b]">
        We use it to send ADvice updates, nothing else. See our{' '}
        <Link to="/privacy-policy" className="underline hover:text-[#1d1d1f]">privacy policy</Link>.
      </p>
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
  // Fires once per report shown, so Meta and GA4 can attribute a completed
  // simulation back to the page and campaign that produced it. Custom events
  // rather than Lead: a free simulation is not a sales conversion, and mixing
  // the two made the Lead count useless for judging booked calls. Set up as
  // Custom Conversions in Events Manager for retargeting and optimisation.
  const tracked = useRef('');
  useEffect(() => {
    if (!sim || tracked.current === sim.id) return;
    tracked.current = sim.id;
    if (fresh) {
      trackCustom('AdviceReportViewed', { content_name: 'ADvice simulation', content_category: sim.inputs.industry });
    }
    trackGa4('simulation_completed', {
      channel: sim.inputs.channel,
      industry: sim.inputs.industry,
      budget: sim.inputs.budget,
      creative_score: sim.results.creative.overall,
      shared: !fresh,
    });
  }, [sim, fresh]);

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
      // The preview is the part people actually pass around, so it goes with
      // the link wherever the device can carry a file.
      const image = await renderPreviewImage(sim).catch(() => null);
      if (navigator.share && /Mobi/i.test(navigator.userAgent)) {
        const file = image ? new File([image], 'ad-preview.png', { type: 'image/png' }) : null;
        if (file && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ title: 'My ADvice simulation', text: url, files: [file] });
          return;
        }
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
    <AdviceShell title={title}>
      <Helmet>
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="An AI simulation of this ad campaign — predicted results, creative score and recommendations. Run your own free on ADvice." />
        <meta property="og:image" content="https://ap-digital.ca/advice-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ap-digital.ca/advice-og.png" />
      </Helmet>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {missing ? (
          <div className="py-24 text-center">
            <h1 className="text-2xl font-semibold">Report not found</h1>
            <p className="mt-2 text-[#6e6e73]">This link looks incomplete — make sure you copied all of it.</p>
            <Link to="/advice/simulate" className="mt-8 inline-block rounded-full bg-[#1d1d1f] px-5 py-2.5 text-sm font-medium text-white">Run your own simulation</Link>
          </div>
        ) : !sim ? (
          <div className="space-y-4 py-12">
            {[0, 1, 2].map((k) => <div key={k} className="h-32 animate-pulse rounded-xl bg-[#f5f5f7]" />)}
          </div>
        ) : (
          <>
            {!fresh && (
              <div className="advice-noprint mb-8 flex flex-col gap-3 rounded-xl border border-black/[0.06] bg-[#f5f5f7] p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#6e6e73]">Someone shared this ADvice simulation with you.</p>
                <Link to="/advice/simulate" className="text-sm font-medium text-[#1d1d1f] hover:text-[#1d1d1f]">Run your own free →</Link>
              </div>
            )}

            <ReportView sim={sim} />

            <div className="advice-noprint mt-12 flex flex-col gap-3 border-t border-black/[0.06] pt-8 sm:flex-row">
              <Link to="/advice/simulate" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-5 py-2.5 text-sm font-medium text-white hover:bg-black">
                <RotateCcw className="h-4 w-4" /> Run another simulation
              </Link>
              <button type="button" onClick={() => downloadReportPdf(sim)} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-black/[0.12] px-5 py-2.5 text-sm font-medium hover:border-black/30">
                <Download className="h-4 w-4" /> Download report as PDF
              </button>
              <button type="button" onClick={share} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-black/[0.12] px-5 py-2.5 text-sm font-medium hover:border-black/30">
                {copied ? <Check className="h-4 w-4 text-[#248a3d]" /> : <Link2 className="h-4 w-4" />}
                {copied ? 'Link copied' : 'Share report'}
              </button>
              {previewPair(sim) && (
                <button
                  type="button"
                  onClick={async () => {
                    const blob = await renderPreviewImage(sim);
                    if (!blob) return;
                    const name = (sim.inputs.campaignName || 'ad-preview')
                      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'ad-preview';
                    await saveBlob(blob, `${name}-preview.png`);
                  }}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-black/[0.12] px-5 py-2.5 text-sm font-medium hover:border-black/30"
                >
                  <ImageIcon className="h-4 w-4" /> Save ad preview
                </button>
              )}
            </div>

            <div className="advice-noprint mt-10 rounded-[20px] bg-[#f5f5f7] p-8 text-center">
              <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Want this built and run for you?</h2>
              <p className="mx-auto mt-2 max-w-[46ch] text-[15px] text-[#6e6e73]">
                AP Digital runs Google and Meta Ads for local businesses from $759/month — month-to-month, and we keep
                working free if we miss the lead target we agree on.
              </p>
              <Link
                to="/book"
                onClick={() => trackGa4('advice_book_click', { channel: sim.inputs.channel, industry: sim.inputs.industry })}
                className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-[#1d1d1f] px-6 py-3 text-[15px] text-white transition-colors hover:bg-black"
              >
                Book a free call
              </Link>
            </div>

            {fresh && !savedEmail() && <div className="mt-8"><SaveCard sim={sim} /></div>}
          </>
        )}
      </div>
    </AdviceShell>
  );
};

export default AdviceReport;
