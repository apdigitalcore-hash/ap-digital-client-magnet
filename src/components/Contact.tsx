import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from './ContactForm';
const Contact = () => {
  return <section id="contact" className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div>
            <span className="text-teal font-semibold text-sm uppercase tracking-wider mb-4 block">
              Let's Talk
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to{' '}
              <span className="text-gradient">Scale Your Business?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Book your free strategy call today. We'll analyze your current marketing, 
              identify growth opportunities, and create a custom plan—no strings attached.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <a href="tel:+15551234567" className="text-muted-foreground hover:text-teal transition-colors">+1 (778) 682-5772</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a href="mailto:hello@apdigital.com" className="text-muted-foreground hover:text-teal transition-colors">apdigital.core@gmail.com</a>
                </div>
              </div>

              

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                  <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM PST</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-card rounded-lg border border-border text-sm text-muted-foreground">
                🔒 100% Confidential
              </div>
              <div className="px-4 py-2 bg-card rounded-lg border border-border text-sm text-muted-foreground">
                ⚡ Response within 24h
              </div>
              <div className="px-4 py-2 bg-card rounded-lg border border-border text-sm text-muted-foreground">
                ✨ No Obligation
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-card rounded-2xl p-5 sm:p-8 lg:p-10 border border-border shadow-custom-lg">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              Get Your Free Strategy Session
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;