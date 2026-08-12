import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, CheckCircle, Loader2 } from 'lucide-react';

const INDUSTRIES = [
  { value: 'salon', label: 'Salon / Beauty' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'trades', label: 'Trades / Contractors' },
  { value: 'coaching', label: 'Coaching / Consulting' },
  { value: 'restaurant', label: 'Restaurant / Café' },
  { value: 'dental', label: 'Dental / Health' },
  { value: 'fitness', label: 'Fitness / Gym' },
  { value: 'other', label: 'Other' },
];

const AD_SPEND_TIERS = [
  { value: 500, label: '$500/mo' },
  { value: 1000, label: '$1,000/mo' },
  { value: 1500, label: '$1,500/mo' },
  { value: 2500, label: '$2,500/mo' },
  { value: 5000, label: '$5,000+/mo' },
];

function getEstimate(industry: string, adSpend: number) {
  const managementFee = adSpend <= 1000 ? 759 : adSpend <= 2500 ? 999 : 1499;

  const cplRanges: Record<string, [number, number]> = {
    'salon': [8, 20],
    'real-estate': [15, 40],
    'trades': [15, 40],
    'coaching': [20, 50],
    'restaurant': [5, 15],
    'dental': [20, 50],
    'fitness': [10, 25],
    'other': [15, 35],
  };

  const [cplLow, cplHigh] = cplRanges[industry] || cplRanges['other'];
  const leadsHigh = Math.round(adSpend / cplLow);
  const leadsLow = Math.round(adSpend / cplHigh);

  return { managementFee, totalMonthly: adSpend + managementFee, leadsLow, leadsHigh, cplLow, cplHigh };
}

const SocialMediaBudgetCalculator = () => {
  const [industry, setIndustry] = useState('');
  const [adSpend, setAdSpend] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const estimate = industry && adSpend ? getEstimate(industry, adSpend) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !business.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const industryLabel = INDUSTRIES.find((i) => i.value === industry)?.label ?? industry;

      const res = await fetch('https://formsubmit.co/ajax/apdigital.core@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          business: business.trim(),
          industry: industryLabel,
          'ad-spend': `$${adSpend.toLocaleString()}/mo`,
          'estimated-total': estimate ? `$${estimate.totalMonthly.toLocaleString()}/mo` : '',
          'estimated-leads': estimate ? `${estimate.leadsLow}–${estimate.leadsHigh}/mo` : '',
          _subject: `Budget Calculator Lead: ${name.trim()} — ${industryLabel}`,
          _template: 'table',
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 my-10 text-center">
        <CheckCircle className="w-12 h-12 text-teal mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-foreground mb-2">You're all set!</h3>
        <p className="text-muted-foreground">
          We'll follow up with a custom budget breakdown for your business. Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-10">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-teal" />
        <h3 className="font-display text-xl font-bold text-foreground">Social Media Budget Calculator</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Your industry</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm"
          >
            <option value="">Select industry</option>
            {INDUSTRIES.map((i) => (
              <option key={i.value} value={i.value}>{i.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Monthly ad spend</label>
          <select
            value={adSpend}
            onChange={(e) => setAdSpend(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm"
          >
            <option value={0}>Select budget</option>
            {AD_SPEND_TIERS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {estimate && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-background border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-teal">${estimate.totalMonthly.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Total / month</div>
            </div>
            <div className="bg-background border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{estimate.leadsLow}–{estimate.leadsHigh}</div>
              <div className="text-xs text-muted-foreground mt-1">Est. leads / month</div>
            </div>
            <div className="bg-background border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-foreground">${estimate.cplLow}–${estimate.cplHigh}</div>
              <div className="text-xs text-muted-foreground mt-1">Cost per lead</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Includes ${adSpend.toLocaleString()} ad spend + ${estimate.managementFee}/mo management. Estimates based on typical BC results — your actual performance may vary.
          </p>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-4">
              Get a custom budget breakdown for your business:
            </p>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Business name"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
              />
              <div className="sm:col-span-3">
                <Button type="submit" disabled={loading} className="w-full bg-teal hover:bg-teal/90 text-white">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Get My Custom Budget Breakdown
                </Button>
              </div>
              {error && <p className="sm:col-span-3 text-sm text-red-500">{error}</p>}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialMediaBudgetCalculator;
