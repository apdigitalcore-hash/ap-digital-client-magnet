import { Helmet } from "react-helmet-async";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AP Digital",
  description:
    "Digital marketing agency serving Coquitlam, BC businesses with Meta Ads, Google Ads, and social media marketing.",
  url: "https://ap-digital.ca/coquitlam",
  telephone: "+1-778-682-5772",
  email: "apdigital.core@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coquitlam",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: "Coquitlam, BC",
};

const whoWeHelp = [
  {
    title: "Trades & Contractors",
    desc: "plumbers, HVAC, electricians, roofers in Coquitlam & the Tri-Cities",
  },
  {
    title: "Hair Salons & Beauty Studios",
    desc: "fully booked appointment books through social media ads",
  },
  {
    title: "Real Estate Agents",
    desc: "buyer and seller leads across Coquitlam, Port Coquitlam & Port Moody",
  },
  {
    title: "Coaches",
    desc: "growing a coaching business with predictable online leads",
  },
];

const whyUs = [
  "No contracts — month-to-month with every client",
  "Personal management — Arjun runs your account, no handoffs",
  "Transparent — you know exactly where every dollar goes",
  "Local — we know Coquitlam, the Tri-Cities, and Metro Vancouver",
];

const services = [
  {
    title: "Meta Ads",
    desc: "high-converting ads targeting Coquitlam and Tri-Cities residents",
  },
  {
    title: "Google Ads",
    desc: "top-of-search visibility when Coquitlam locals search for your service",
  },
  {
    title: "Social Media Management",
    desc: "consistent posting that builds local brand awareness",
  },
  {
    title: "Lead Generation Systems",
    desc: "we build the full funnel so leads come to you automatically",
  },
];

const Coquitlam = () => (
  <>
    <Helmet>
      <title>Digital Marketing Agency Coquitlam BC | AP Digital</title>
      <meta
        name="description"
        content="AP Digital helps Coquitlam businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Coquitlam, BC. No contracts."
      />
      <link rel="canonical" href="https://ap-digital.ca/coquitlam" />
      <meta property="og:title" content="Digital Marketing Agency Coquitlam BC | AP Digital" />
      <meta
        property="og:description"
        content="AP Digital helps Coquitlam businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Coquitlam, BC. No contracts."
      />
      <meta property="og:url" content="https://ap-digital.ca/coquitlam" />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content="Digital Marketing Agency Coquitlam BC | AP Digital" />
      <meta
        name="twitter:description"
        content="AP Digital helps Coquitlam businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Coquitlam, BC. No contracts."
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>

    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Digital Marketing Agency in Coquitlam, BC
          </h1>
          <p className="mt-4 text-lg font-medium text-primary md:text-xl">
            More Customers for Your Coquitlam Business. From $500/Month.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-secondary-foreground">
            AP Digital helps Coquitlam businesses — trades, salons, real estate agents &amp; coaches
            — get consistent leads through paid ads and social media. No long-term contracts.
            Personal management. Real results.
          </p>
          <div className="mt-10">
            <a
              href="https://calendly.com/apdigital-core/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Book Your Free Call
            </a>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-card py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Who We Help in Coquitlam
          </h2>
          <p className="mt-4 text-secondary-foreground">
            Whether you're a contractor in Port Coquitlam, a salon in Coquitlam Centre, or a
            realtor covering the Tri-Cities — we help you get found online and turn clicks into
            booked jobs.
          </p>
          <ul className="mt-8 space-y-4">
            {whoWeHelp.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <strong>{item.title}</strong> — {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why Coquitlam Businesses Work With AP Digital
          </h2>
          <p className="mt-4 text-secondary-foreground">
            Lean, fast campaigns with no bloated agency overhead passed on to you.
          </p>
          <ul className="mt-8 space-y-4">
            {whyUs.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="bg-card py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What We Do for Coquitlam Businesses
          </h2>
          <ul className="mt-8 space-y-4">
            {services.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <strong>{item.title}</strong> — {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Let's Get Your Coquitlam Business More Leads
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-secondary-foreground">
            Book a free 20-minute call. We'll show you what's working for businesses in Coquitlam
            right now and build you a quick plan — no strings attached.
          </p>
          <div className="mt-10">
            <a
              href="https://calendly.com/apdigital-core/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Book Your Free Call
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </>
);

export default Coquitlam;
