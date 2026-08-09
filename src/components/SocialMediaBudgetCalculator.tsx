import { useState } from 'react';
import { Download, CheckCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const industries = [
  { value: 'salon', label: 'Salon / Beauty', baseFee: 1800, adSpend: 800, packageName: 'Growth Package' },
  { value: 'real-estate', label: 'Real Estate', baseFee: 2200, adSpend: 1500, packageName: 'Growth + Listings' },
  { value: 'trades', label: 'Trades / Contractor', baseFee: 2000, adSpend: 1200, packageName: 'Lead Generation' },
  { value: 'coaching', label: 'Coaching / Consulting', baseFee: 1600, adSpend: 700, packageName: 'Lead Generation' },
  { value: 'restaurant', label: 'Restaurant / Café', baseFee: 1400, adSpend: 500, packageName: 'Local Foot Traffic' },
  { value: 'other', label: 'Other Service Business', baseFee: 1800, adSpend: 800, packageName: 'Growth Package' },
];

const budgetLevels = [
  { value: 'starter', label: 'Starter ($1,500/mo)', multiplier: 0.85, adMultiplier: 0.6 },
  { value: 'growth', label: 'Growth ($3,000/mo)', multiplier: 1.0, adMultiplier: 1.0 },
  { value: 'scale', label: 'Scale ($5,000+/mo)', multiplier: 1.45, adMultiplier: 1.8 },
];

const SocialMediaBudgetCalculator = () => {
  const [industry, setIndustry] = useState('');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const selectedIndustry = industries.find((i) => i.value === industry);
  const selectedBudget = budgetLevels.find((b) => b.value === budget);

  const managementFee = selectedIndustry && selectedBudget
    ? Math.round(selectedIndustry.baseFee * selectedBudget.multiplier)
    : 0;

  const adSpend = selectedIndustry && selectedBudget
    ? Math.round(selectedIndustry.adSpend * selectedBudget.adMultiplier)
    : 0;

  const totalMonthly = managementFee + adSpend;

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !business.trim() || !industry) {
      toast({
        title: 'Missing info',
        description: 'Please fill in your name, email, business, and industry to get the template.',
        variant: 'destructive',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          business: business.trim(),
          phone: '',
          niche: industry,
          source: 'social-media-budget-template',
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Lead magnet submission error:', err);
      toast({
        title: 'Could not send template',
        description: 'Please try again or book a call directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-teal" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">Template is on its way</h3>
        <p className="text-muted-foreground mb-4">
          Check your inbox for the 2026 Social Media Budget Template. If you don't see it in a few minutes, check your spam folder.
        </p>
        <Button variant="hero" asChild>
          <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">
            Book a Free Strategy Call
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-teal" />
        <h3 className="font-display text-xl font-bold text-foreground">2026 Social Media Budget Calculator</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="calc-industry">Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger id="calc-industry" className="bg-background">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((i) => (
                <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calc-budget">Investment Level</Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger id="calc-budget" className="bg-background">
              <SelectValue placeholder="Select your budget level" />
            </SelectTrigger>
            <SelectContent>
              {budgetLevels.map((b) => (
                <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedIndustry && selectedBudget && (
        <div className="bg-background rounded-xl p-5 mb-6 border border-border">
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Management Fee</p>
              <p className="font-display text-2xl font-bold text-foreground">${managementFee.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{selectedIndustry.label}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Recommended Ad Spend</p>
              <p className="font-display text-2xl font-bold text-teal">${adSpend.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Paid to Meta/Google/LinkedIn</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Total Monthly Investment</p>
              <p className="font-display text-2xl font-bold text-foreground">${totalMonthly.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Estimated before tax</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleDownload} className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Want the full Google Sheets template with formulas, monthly breakdowns, and ROI projections? Drop your details below and we'll send it to you.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lm-name">Name</Label>
            <Input id="lm-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lm-email">Email</Label>
            <Input id="lm-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lm-business">Business Name</Label>
            <Input id="lm-business" value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Your Business" className="bg-background" />
          </div>
        </div>
        <Button type="submit" variant="hero" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : <><Download className="w-4 h-4 mr-2" />Send Me the Free Template</>}
        </Button>
        <p className="text-xs text-muted-foreground">
          No spam. Unsubscribe anytime. Your email is stored securely and never shared.
        </p>
      </form>
    </div>
  );
};

export default SocialMediaBudgetCalculator;
