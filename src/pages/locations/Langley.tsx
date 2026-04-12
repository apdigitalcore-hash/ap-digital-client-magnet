import { Helmet } from "react-helmet-async";
import { CheckCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AP Digital",
  description:
    "Digital marketing agency serving Langley, BC businesses with Meta Ads, Google Ads, and social media marketing.",
  url: "https://ap-digital.ca/langley",
  telephone: "+1-778-682-5772",
  email: "apdigital.core@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Langley",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: "Langley, BC",
};

const CALENDLY = "https://calendly.com/apdigital-core/30min";

const whoWeHelp = [
  {
    title: "Trades & Contractors",
    desc: "plumbers, HVAC, electricians, roofers across Langley Township & City",
  },
  {
    title: "Salons & Beauty Studios",
    desc: "consistently full appointment books",
  },
  {
    title: "Real Estate Agents",
    desc: "lead generation in Langley's growing property market",
  },
  {
    title: "Coaches & Service Businesses",
    desc: "building a predictable client pipeline online",
  },
];

const whyUs = [
  {
    title: "Month-to-month",
    desc: "you stay because it works, not because you're locked in",
  },
  {
    title: "Direct access",
    desc: "work with the person actually running your ads",
  },
  {
    title: "Fast turnaround",
    desc: "campaigns live in days, not weeks",
  },
  {
    title: "Proven in BC",
    desc: "we understand what works in Langley and the Fraser Valley",
  },
];

const services = [
  {
    title: "Meta Ads",
    desc: "targeted Facebook & Instagram campaigns reaching Langley residents ready to buy",
  },
  {
    title: "Google Ads",
    desc: "appear at the top of Google when Langley customers search for your service",
  },
  {
    title: "Social Media Management",
    desc: "content that builds your reputation and drives inbound leads",
  },
  {
    title: "Lead Generation",
    desc: "full funnel from ad click to booked appointment",
  },
];

const Langley = () => {
  return (
    <>
      <Helmet>
        <title>Digital Marketing Agency Langley BC | AP Digital</title>
        <meta
          name="description"
          content="AP Digital helps Langley businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Langley, BC. No contracts."
        />
        <link rel="canonical" href="https://ap-digital.ca/langley" />
        <meta property="og:title" content="Digital Marketing Agency Langley BC | AP Digital" />
        <meta
          property="og:description"
          content="AP Digital helps Langley businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Langley, BC. No contracts."
        />
        <meta property="og:url" content="https://ap-digital.ca/langley" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Digital Marketing Agency Langley BC | AP Digital" />
        <meta
          name="twitter:description"
          content="AP Digital helps Langley businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Langley, BC. No contracts."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Digital Marketing Agency in Langley, BC
            </h1>
            <p className="mt-4 text-lg font-medium text-primary md:text-xl">
              Predictable Leads for Langley Businesses. No Contracts.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
              AP Digital helps Langley trades, salons, real estate agents &amp;
              coaches get a steady stream of leads using Meta Ads, Google Ads &amp;
              social media. Personal service, transparent pricing, month-to-month.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book Your Free Call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* WHO WE HELP */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <h2 className="text-3xl font-bold md:text-4xl">
              Who We Help in Langley
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Langley is a fast-growing community with a booming trades and
              service market. We help local businesses capture that demand online
              before competitors do.
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {whoWeHelp.map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <p className="font-semibold text-card-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* WHY US */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <h2 className="text-3xl font-bold md:text-4xl">
              Why Langley Businesses Choose AP Digital
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Most agencies put you in a 12-month contract and hand you to a
              junior employee. We don't.
            </p>
            <ul className="mt-10 space-y-4">
              {whyUs.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p>
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-muted-foreground"> — {item.desc}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICES */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <h2 className="text-3xl font-bold md:text-4xl">
              What We Do for Langley Businesses
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {services.map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <p className="font-semibold text-card-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <h2 className="text-3xl font-bold text-secondary-foreground md:text-4xl">
              Ready to Get More Leads in Langley?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Book a free strategy call. We'll walk you through exactly what a
              campaign for your Langley business would look like — budget,
              timeline, and expected results.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book Your Free Call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Langley;
