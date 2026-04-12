import { Helmet } from "react-helmet-async";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AP Digital",
  description:
    "Digital marketing agency serving Burnaby, BC businesses with Meta Ads, Google Ads, and social media marketing.",
  url: "https://ap-digital.ca/burnaby",
  telephone: "+1-778-682-5772",
  email: "apdigital.core@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Burnaby",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: "Burnaby, BC",
};

const Burnaby = () => {
  return (
    <>
      <Helmet>
        <title>Digital Marketing Agency Burnaby BC | AP Digital</title>
        <meta
          name="description"
          content="AP Digital helps Burnaby businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Burnaby, BC. No contracts."
        />
        <link rel="canonical" href="https://ap-digital.ca/burnaby" />
        <meta property="og:title" content="Digital Marketing Agency Burnaby BC | AP Digital" />
        <meta
          property="og:description"
          content="AP Digital helps Burnaby businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Burnaby, BC. No contracts."
        />
        <meta property="og:url" content="https://ap-digital.ca/burnaby" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Digital Marketing Agency Burnaby BC | AP Digital" />
        <meta
          name="twitter:description"
          content="AP Digital helps Burnaby businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Burnaby, BC. No contracts."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />

        {/* HERO */}
        <section className="py-24 md:py-32">
          <div className="container max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Digital Marketing Agency in Burnaby, BC
            </h1>
            <p className="text-xl md:text-2xl font-medium text-muted-foreground mb-4">
              More Leads for Your Burnaby Business. Month-to-Month.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              AP Digital helps Burnaby businesses — trades, salons, real estate
              agents &amp; coaches — get consistent, predictable leads using paid
              ads &amp; social media. No contracts, no fluff. Just results.
            </p>
            <a
              href="https://calendly.com/apdigital-core/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Book Your Free Call
            </a>
          </div>
        </section>

        {/* WHO WE HELP */}
        <section className="py-20 bg-secondary/50">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Who We Help in Burnaby</h2>
            <p className="text-muted-foreground mb-8">
              Burnaby is one of Metro Vancouver's busiest markets — competition is
              high. We help local businesses stand out and get found online.
            </p>
            <ul className="space-y-4">
              {[
                ["Trades & Contractors", "plumbers, HVAC, electricians, roofers in Burnaby & surrounding areas"],
                ["Hair Salons & Spas", "booked-out schedules through targeted social ads"],
                ["Real Estate Agents", "consistent buyer and seller leads in Burnaby's active market"],
                ["Coaches", "fitness, business, and life coaches building a steady client base"],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <strong>{title}</strong> — {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* WHY US */}
        <section className="py-20">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">
              Why Burnaby Businesses Work With Us
            </h2>
            <p className="text-muted-foreground mb-8">
              You get direct access to the person running your ads — not a junior
              account manager.
            </p>
            <ul className="space-y-4">
              {[
                "Month-to-month — cancel any time, no lock-in",
                "Personal management — Arjun handles your account directly",
                "Quick launch — campaigns live within days, leads within weeks",
                "Local knowledge — we know Burnaby and Metro Vancouver",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20 bg-secondary/50">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">
              What We Do for Burnaby Businesses
            </h2>
            <ul className="space-y-4">
              {[
                ["Meta Ads", "reach Burnaby customers on the platforms they use every day"],
                ["Google Ads", "get to the top of Google when Burnaby locals search for your service"],
                ["Social Media Management", "regular content that builds trust and drives enquiries"],
                ["Lead Generation Systems", "from the first click to a booked call, we build the whole funnel"],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <strong>{title}</strong> — {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Let's Talk About Growing Your Burnaby Business
            </h2>
            <p className="text-muted-foreground mb-8">
              Book a free 20-minute strategy call. We'll tell you exactly what's
              working for businesses like yours in Burnaby right now.
            </p>
            <a
              href="https://calendly.com/apdigital-core/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Book Your Free Call
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Burnaby;
