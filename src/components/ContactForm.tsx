import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const niches = [
  { value: 'salon', label: 'Salon / Beauty' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'trades', label: 'Trades / Contractors' },
  { value: 'coaching', label: 'Coaching / Consulting' },
  { value: 'other', label: 'Other' },
];

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      business: formData.get('business'),
      phone: formData.get('phone'),
      niche: formData.get('niche'),
    };

    // Simulate form submission - replace with actual endpoint
    try {
      // Example: await fetch('/api/leads', { method: 'POST', body: JSON.stringify(data) });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "We'll be in touch within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-teal" />
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
          Thank You!
        </h3>
        <p className="text-muted-foreground">
          Your request has been received. One of our strategists will reach out within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Smith"
            required
            className="bg-background"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="bg-background"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="business">Business Name *</Label>
          <Input
            id="business"
            name="business"
            placeholder="Your Business"
            required
            className="bg-background"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (Optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="bg-background"
          />
        </div>
      </div>

      {/* Niche */}
      <div className="space-y-2">
        <Label htmlFor="niche">What industry are you in? *</Label>
        <Select name="niche" required>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {niches.map((niche) => (
              <SelectItem key={niche.value} value={niche.value}>
                {niche.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* GDPR Consent */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="gdpr"
          checked={gdprConsent}
          onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
        />
        <Label htmlFor="gdpr" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
          I agree to the{' '}
          <a href="#privacy" className="text-teal hover:underline">
            Privacy Policy
          </a>{' '}
          and consent to being contacted about my inquiry. *
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          'Submitting...'
        ) : (
          <>
            Book Your Free Strategy Call
            <Send className="w-4 h-4" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        No obligation. We'll discuss your goals and show you exactly how we can help.
      </p>
    </form>
  );
};

export default ContactForm;
