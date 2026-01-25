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
import { supabase } from '@/integrations/supabase/client';

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

    try {
      const { error } = await supabase.from('leads').insert({
        name: validatedData.name,
        email: validatedData.email,
        business: validatedData.business,
        phone: validatedData.phone || null,
        niche: validatedData.niche,
      });

      if (error) throw error;
      
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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
