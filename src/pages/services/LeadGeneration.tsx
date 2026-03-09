import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';

const included = [
  'Custom lead generation funnel design',
  'Landing page creation & optimization',
  'Email & SMS nurturing sequences',
  'CRM setup & integration',
  'Lead scoring & qualification systems',
  'Appointment booking automation',
  'Monthly lead flow reports',
  'Conversion rate optimization',
];

const LeadGeneration = () => (
  <>
    <Helmet>
      <title>Lead Generation Agency Canada | Predictable Leads for Local Business | AP DIGITAL</title>
      <meta name="description" content="AP DIGITAL builds predictable lead generation systems for Canadian local businesses. Stop chasing clients and start filling your calendar with qualified prospects every week." />
      <link rel="canonical" href="https://ap-digital.ca/services/lead-generation" />
    </Helmet>
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          Predictable Lead Generation So You <span className="text-gradient">Never Chase Clients Again</span>
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>The biggest challenge local businesses face isn't delivering great work — it's getting a consistent flow of new clients. Referrals are unpredictable, and hoping for the phone to ring isn't a growth strategy.</p>
          <p>At AP DIGITAL, we build lead generation systems that run on autopilot. From high-converting landing pages and targeted ad campaigns to automated follow-up sequences, we create a machine that attracts, qualifies, and nurtures leads until they're ready to book.</p>
          <p>Our approach combines paid advertising, funnel optimization, and CRM automation into one seamless system. You'll know exactly how many leads are coming in, what they cost, and how they're converting — giving you full control over your business growth.</p>
          <p>Whether you need 10 leads a week or 100, we'll design a system that scales with your capacity. No more feast-or-famine cycles — just predictable, profitable growth month after month.</p>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">What's Included</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-16">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Industries We Serve */}
        <IndustriesWeServe />

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and let us build a lead generation system that keeps your calendar full.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <Link to="/contact">Book Your Free Strategy Call</Link>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default LeadGeneration;
