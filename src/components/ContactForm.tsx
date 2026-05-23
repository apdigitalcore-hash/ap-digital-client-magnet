import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { z } from 'zod';
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

// Allowed niche values for validation
const ALLOWED_NICHES = ['salon', 'real-estate', 'trades', 'coaching', 'other'] as const;

const niches = [
  { value: 'salon', label: 'Salon / Beauty' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'trades', label: 'Trades / Contractors' },
  { value: 'coaching', label: 'Coaching / Consulting' },
  { value: 'other', label: 'Other' },
];

// Zod schema for form validation with security-focused constraints
const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be less than 100 characters' })
    .regex(/^[a-zA-Z\s\-'\.]+$/, { message: 'Name contains invalid characters' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .max(255, { message: 'Email must be less than 255 characters' })
    .email({ message: 'Please enter a valid email address' }),
  business: z
    .string()
    .trim()
    .min(1, { message: 'Business name is required' })
    .max(200, { message: 'Business name must be less than 200 characters' }),
  phone: z
    .string()
    .trim()
    .max(20, { message: 'Phone number must be less than 20 characters' })
    .regex(/^[\d\s\+\-\(\)]*$/, { message: 'Phone contains invalid characters' })
    .optional()
    .or(z.literal('')),
  niche: z.enum(ALLOWED_NICHES, { message: 'Please select a valid industry' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  // Honeypot fields - bots will fill these, real users won't see them
  const [honeypot, setHoneypot] = useState('');
  const [honeypotWebsite, setHoneypotWebsite] = useState('');
  const { toast } = useToast();

  const validateForm = (formData: FormData): ContactFormData | null => {
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      business: formData.get('business') as string,
      phone: formData.get('phone') as string,
      niche: formData.get('niche') as string,
    };

    const result = contactFormSchema.safeParse(rawData);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      setFormErrors(errors);
      return null;
    }

    setFormErrors({});
    return result.data;
  };

  // Check if honeypot fields are filled (indicates bot)
  const isBot = (): boolean => {
    return honeypot.length > 0 || honeypotWebsite.length > 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Note: honeypot bot detection removed because browser autofill (Safari
    // on iOS in particular) was filling the hidden URL field and silently
    // rejecting real users. Spam protection is handled server-side.

    if (!gdprConsent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const validatedData = validateForm(formData);

    if (!validatedData) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Redirect to Calendly with name and email pre-filled. Calendly handles
    // the booking, email confirmations to both parties, calendar invites,
    // and reminders automatically — no backend, no email service needed.
    const nicheLabels: Record<string, string> = {
      'salon': 'Salon / Beauty',
      'real-estate': 'Real Estate',
      'trades': 'Trades / Contractors',
      'coaching': 'Coaching / Consulting',
      'other': 'Other',
    };

    const params = new URLSearchParams({
      name: validatedData.name,
      email: validatedData.email,
      a1: validatedData.business,
      a2: validatedData.phone || '',
      a3: nicheLabels[validatedData.niche] || validatedData.niche,
    });

    const calendlyUrl = `https://calendly.com/apdigital-core/20min?${params.toString()}`;
    window.location.href = calendlyUrl;
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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot fields - hidden from real users, bots will fill them */}
      <div 
        aria-hidden="true" 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: '-9999px',
          opacity: 0,
          height: 0,
          width: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <label htmlFor="company_website">Website</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
        <label htmlFor="contact_url">URL</label>
        <input
          type="url"
          id="contact_url"
          name="contact_url"
          value={honeypotWebsite}
          onChange={(e) => setHoneypotWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Smith"
            maxLength={100}
            className={`bg-background ${formErrors.name ? 'border-destructive' : ''}`}
            aria-invalid={!!formErrors.name}
            aria-describedby={formErrors.name ? 'name-error' : undefined}
          />
          {formErrors.name && (
            <p id="name-error" className="text-sm text-destructive">{formErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            maxLength={255}
            className={`bg-background ${formErrors.email ? 'border-destructive' : ''}`}
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? 'email-error' : undefined}
          />
          {formErrors.email && (
            <p id="email-error" className="text-sm text-destructive">{formErrors.email}</p>
          )}
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
            maxLength={200}
            className={`bg-background ${formErrors.business ? 'border-destructive' : ''}`}
            aria-invalid={!!formErrors.business}
            aria-describedby={formErrors.business ? 'business-error' : undefined}
          />
          {formErrors.business && (
            <p id="business-error" className="text-sm text-destructive">{formErrors.business}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (Optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            maxLength={20}
            className={`bg-background ${formErrors.phone ? 'border-destructive' : ''}`}
            aria-invalid={!!formErrors.phone}
            aria-describedby={formErrors.phone ? 'phone-error' : undefined}
          />
          {formErrors.phone && (
            <p id="phone-error" className="text-sm text-destructive">{formErrors.phone}</p>
          )}
        </div>
      </div>

      {/* Niche */}
      <div className="space-y-2">
        <Label htmlFor="niche">What industry are you in? *</Label>
        <Select name="niche">
          <SelectTrigger 
            className={`bg-background ${formErrors.niche ? 'border-destructive' : ''}`}
            aria-invalid={!!formErrors.niche}
            aria-describedby={formErrors.niche ? 'niche-error' : undefined}
          >
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
        {formErrors.niche && (
          <p id="niche-error" className="text-sm text-destructive">{formErrors.niche}</p>
        )}
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
