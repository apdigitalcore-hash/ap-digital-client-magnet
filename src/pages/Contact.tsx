import { CheckCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Helmet } from 'react-helmet-async';
import { organizationSchema, getFAQSchema, getBreadcrumbSchema } from '@/lib/structuredData';

const Contact = () => {
  const faqData = [
    { question: "Is this really free?", answer: "Yes, 100%. The audit call is completely free with no strings attached. We believe in providing value upfront." },
    { question: "How long is the call?", answer: "Typically 20-30 minutes. Enough time to understand your business and give you real insights, without wasting your day." },
    { question: "What happens after the call?", answer: "If it's a good fit, we'll discuss working together. If not, you'll still walk away with actionable advice you can implement yourself." },
    { question: "Do you require long-term contracts?", answer: "No. We work month-to-month. We earn your business every month based on results, not contracts." }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      getFAQSchema(faqData),
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" }
      ])
    ]
  };

  const auditIncludes = [
    'Complete review of your current marketing',
    'Competitor analysis in your local market',
    'Identification of quick-win opportunities',
    'Custom strategy recommendations',
    'Clear pricing and timeline discussion',
    'No obligation or pressure to buy',
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (778) 682-5772',
      href: 'tel:+17786825772',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'apdigital.core@gmail.com',
      href: 'mailto:apdigital.core@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Vancouver, BC, Canada',
      href: null,
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: null,
    },
  ];

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Contact AP Digital | Book a Free Strategy Call</title>
        <meta name="description" content="Book a free 20-minute strategy call with AP Digital. We'll show you how many leads are available in your area. No pressure." />
        <link rel="canonical" href="https://ap-digital.ca/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ap-digital.ca/contact" />
        <meta property="og:title" content="Contact AP Digital | Get a Free Strategy Call" />
        <meta property="og:description" content="Ready to get more leads? Book a free strategy call with AP Digital. Serving salons, trades, real estate & coaches across Vancouver, BC. No contracts." />
        <meta name="twitter:title" content="Contact AP Digital | Get a Free Strategy Call" />
        <meta name="twitter:description" content="Ready to get more leads? Book a free strategy call with AP Digital. Serving salons, trades, real estate & coaches across Vancouver, BC. No contracts." />
        <meta name="robots" content="index, follow" />
        {structuredData && (
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        )}
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-teal blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-teal-light blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Book a Free Strategy Call with AP Digital
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto">
              Let's discuss your goals and show you exactly how we can help your business get more leads.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                What's Included in Your Free Audit
              </h2>
              <p className="text-muted-foreground mb-8">
                This isn't a generic sales call. We'll take a real look at your business and give you actionable insights — whether you work with us or not.
              </p>

              <ul className="space-y-4 mb-12">
                {auditIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-secondary p-6 rounded-xl">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-teal" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{info.label}</div>
                        {info.href ? (
                          <a href={info.href} className="text-foreground font-medium hover:text-teal transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <span className="text-foreground font-medium">{info.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <div className="bg-card p-8 rounded-2xl border border-border shadow-custom-lg">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Request Your Free Audit
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Common Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Is this really free?
                </h3>
                <p className="text-muted-foreground">
                  Yes, 100%. The audit call is completely free with no strings attached. We believe in providing value upfront.
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  How long is the call?
                </h3>
                <p className="text-muted-foreground">
                  Typically 20-30 minutes. Enough time to understand your business and give you real insights, without wasting your day.
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  What happens after the call?
                </h3>
                <p className="text-muted-foreground">
                  If it's a good fit, we'll discuss working together. If not, you'll still walk away with actionable advice you can implement yourself.
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Do you require long-term contracts?
                </h3>
                <p className="text-muted-foreground">
                  No. We work month-to-month. We earn your business every month based on results, not contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;

