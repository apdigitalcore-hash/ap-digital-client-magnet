import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import AdviceShell from '@/advice/AdviceShell';
import { runSimulation } from '@/advice/api';
import { CHANNELS, EMPTY_INPUTS, INDUSTRIES, type SimInputs } from '@/advice/types';

const STEPS = ['Your business', 'Channel & budget', 'Your ad'];

const LOADING_LINES = [
  'Reading your ad copy…',
  'Checking your landing page…',
  'Pulling benchmarks for your industry…',
  'Modelling clicks and conversions…',
  'Scoring your creative…',
  'Writing your recommendations…',
];

const field = 'w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#3b82f6] focus:bg-white/[0.05]';
const label = 'mb-1.5 block text-sm font-medium text-white/80';
const hint = 'font-normal text-white/40';

const BUDGET_STEPS = [500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 7500, 10000, 15000, 20000, 30000, 40000, 50000];

const Loading = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, LOADING_LINES.length - 1)), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#3b82f6]" />
        <div className="absolute inset-3 rounded-full bg-[#3b82f6]/20 blur-md" />
      </div>
      <h2 className="mt-8 text-xl font-semibold">Running your simulation…</h2>
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-3 text-sm text-white/55"
        >
          {LOADING_LINES[i]}
        </motion.p>
      </AnimatePresence>
      <div className="mt-8 h-1 w-64 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-[#3b82f6]"
          initial={{ width: '4%' }}
          animate={{ width: '92%' }}
          transition={{ duration: 18, ease: 'easeOut' }}
        />
      </div>
      <p className="mt-4 text-xs text-white/35">Usually 10–20 seconds.</p>
    </div>
  );
};

const AdviceSimulate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [v, setV] = useState<SimInputs>(EMPTY_INPUTS);
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);

  const set = <K extends keyof SimInputs>(k: K) => (e: { target: { value: string } }) =>
    setV((prev) => ({ ...prev, [k]: e.target.value }));

  const stepError = (s: number): string => {
    if (s === 0) {
      if (!v.product.trim() && !v.productUrl.trim()) return 'Tell us what you’re selling.';
      if (!v.industry) return 'Pick an industry.';
      if (!v.audience.trim()) return 'Describe who you’re trying to reach.';
    }
    if (s === 1 && !v.channel) return 'Pick an ad channel.';
    if (s === 2 && !v.headline.trim() && !v.primaryText.trim()) return 'Add at least a headline or primary text.';
    return '';
  };

  const next = () => {
    const e = stepError(step);
    setError(e);
    if (!e) setStep((s) => s + 1);
  };

  const submit = async () => {
    const e = stepError(2);
    setError(e);
    if (e) return;
    setRunning(true);
    try {
      const sim = await runSimulation(v);
      navigate(`/advice/report/${sim.shareId}`, { state: { sim, fresh: true } });
    } catch (err) {
      setRunning(false);
      setError(err instanceof Error ? err.message : 'The simulation failed. Please try again.');
    }
  };

  const budgetIndex = BUDGET_STEPS.findIndex((b) => b >= v.budget);
  const isSearch = v.channel === 'Google Search Ads';

  return (
    <AdviceShell>
      <Helmet>
        <title>Run a Simulation | ADvice</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {running ? (
        <Loading />
      ) : (
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
          <ol className="mb-10 flex items-center gap-2">
            {STEPS.map((s, i) => (
              <li key={s} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    i < step ? 'bg-[#3b82f6] text-white' : i === step ? 'border border-[#3b82f6] text-white' : 'border border-white/15 text-white/40'
                  }`}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className={`hidden text-sm sm:inline ${i === step ? 'text-white' : 'text-white/40'}`}>{s}</span>
                {i < STEPS.length - 1 && <span className="h-px flex-1 bg-white/10" />}
              </li>
            ))}
          </ol>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {step === 0 && (
                <>
                  <h1 className="text-2xl font-semibold tracking-tight">What are you advertising?</h1>
                  <div>
                    <label className={label} htmlFor="campaignName">Campaign name <span className={hint}>(optional)</span></label>
                    <input id="campaignName" className={field} value={v.campaignName} onChange={set('campaignName')} placeholder="Spring promo — Search" />
                  </div>
                  <div>
                    <label className={label} htmlFor="product">What are you selling?</label>
                    <textarea id="product" rows={3} className={field} value={v.product} onChange={set('product')}
                      placeholder="Emergency plumbing in Vancouver — 24/7 callouts, flat $149 diagnostic fee" />
                  </div>
                  <div>
                    <label className={label} htmlFor="productUrl">Product or website URL <span className={hint}>(optional)</span></label>
                    <input id="productUrl" className={field} value={v.productUrl} onChange={set('productUrl')} placeholder="yourbusiness.com" inputMode="url" />
                  </div>
                  <div>
                    <label className={label} htmlFor="industry">Industry</label>
                    <select id="industry" className={field} value={v.industry} onChange={set('industry')}>
                      <option value="" className="bg-[#0a0a0a]">Choose an industry</option>
                      {INDUSTRIES.map((i) => <option key={i} value={i} className="bg-[#0a0a0a]">{i}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={label} htmlFor="audience">Target audience</label>
                    <textarea id="audience" rows={3} className={field} value={v.audience} onChange={set('audience')}
                      placeholder="Homeowners 30–65 in Metro Vancouver searching for a plumber right now" />
                    <p className="mt-1.5 text-xs text-white/40">Age, location, interests and how ready they are to buy.</p>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h1 className="text-2xl font-semibold tracking-tight">Where and how much?</h1>
                  <div>
                    <span className={label}>Ad channel</span>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {CHANNELS.map((c) => (
                        <button
                          type="button"
                          key={c}
                          onClick={() => setV((p) => ({ ...p, channel: c }))}
                          className={`rounded-lg border px-3 py-3 text-left text-sm transition-colors ${
                            v.channel === c ? 'border-[#3b82f6] bg-[#3b82f6]/10 text-white' : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/25'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 flex items-baseline justify-between">
                      <label className={label} htmlFor="budget">Monthly budget</label>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-white/40">$</span>
                        <input
                          aria-label="Monthly budget in dollars"
                          className="w-24 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-right tabular-nums outline-none focus:border-[#3b82f6]"
                          inputMode="numeric"
                          value={v.budget}
                          onChange={(e) => setV((p) => ({ ...p, budget: Math.max(0, Number(e.target.value.replace(/\D/g, '')) || 0) }))}
                        />
                      </div>
                    </div>
                    <input
                      id="budget"
                      type="range"
                      min={0}
                      max={BUDGET_STEPS.length - 1}
                      value={budgetIndex === -1 ? BUDGET_STEPS.length - 1 : budgetIndex}
                      onChange={(e) => setV((p) => ({ ...p, budget: BUDGET_STEPS[Number(e.target.value)] }))}
                      className="w-full accent-[#3b82f6]"
                    />
                    <div className="mt-1 flex justify-between text-xs text-white/35"><span>$500</span><span>$50,000+</span></div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h1 className="text-2xl font-semibold tracking-tight">Paste your ad</h1>
                  <div>
                    <label className={label} htmlFor="headline">Headline {isSearch && <span className={hint}>(30 characters per headline)</span>}</label>
                    <input id="headline" className={field} value={v.headline} onChange={set('headline')} placeholder="24/7 Emergency Plumber" />
                  </div>
                  <div>
                    <label className={label} htmlFor="primaryText">Primary text</label>
                    <textarea id="primaryText" rows={4} className={field} value={v.primaryText} onChange={set('primaryText')}
                      placeholder="Burst pipe? A licensed plumber at your door in 60 minutes. Flat $149 diagnostic, no surprises." />
                  </div>
                  <div>
                    <label className={label} htmlFor="description">Description <span className={hint}>(optional)</span></label>
                    <input id="description" className={field} value={v.description} onChange={set('description')} placeholder="Licensed & insured. Book online in 30 seconds." />
                  </div>
                  <div>
                    <label className={label} htmlFor="landingUrl">Landing page URL <span className={hint}>(optional — we’ll analyse it)</span></label>
                    <input id="landingUrl" className={field} value={v.landingUrl} onChange={set('landingUrl')} placeholder="yourbusiness.com/emergency" inputMode="url" />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {error && <p role="alert" className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300">{error}</p>}

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button type="button" onClick={() => { setError(''); setStep((s) => s - 1); }} className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : <span />}
            {step < 2 ? (
              <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/85">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="button" onClick={submit} className="inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_-8px_#3b82f6] hover:bg-[#2563eb]">
                Run simulation <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </AdviceShell>
  );
};

export default AdviceSimulate;
