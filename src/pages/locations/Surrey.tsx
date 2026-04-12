import { Helmet } from "react-helmet-async";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AP Digital",
  description:
    "Digital marketing agency serving Surrey, BC businesses with Meta Ads, Google Ads, and social media marketing.",
  url: "https://ap-digital.ca/surrey",
  telephone: "+1-778-682-5772",
  email: "apdigital.core@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Surrey",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: "Surrey, BC",
};

const whoWeHelp = [
  {
    title: "Trades & Contractors",
    desc: "plumbers, HVAC, electricians, roofers across Surrey & South Fraser",
  },
  {
    title: "Hair Salons & Beauty Studios",
    desc: "filling chairs with consistent bookings",
  },
  {
    title: "Real Estate Agents",
    desc: "generating buyer and seller leads in Surrey's competitive market",
  },
  {
    title: "Coaches & Consultants",
    desc: "attracting clients online in BC",
  },
];

const whyUs = [
  "Month-to-month — no long-term contracts",
  "Transparent pricing — from $500/month in ad spend",
  "Fast results — most clients see leads within 2 weeks",
  "Local — we understand the Metro Vancouver & Surrey market",
];

const services = [
  {
    title: "Meta Ads",
    desc: "targeted campaigns reaching Surrey residents looking for your service",
  },
  {
    title: "Google Ads",
    desc: "show up at the top of Google when Surrey customers search for you",
  },
  {
    title: "Social Media Management",
    desc: "consistent content that builds your brand and drives leads",
  },
  {
    title: "Lead Generation Systems",
    desc: "full-funnel setup from ad to booked appointment",
  },
];

const Surrey = () => {
  return (
    <>
      <Helmet>
        <title>Digital Marketing Agency Surrey BC | AP Digital</title>
        <meta
          name="description"
          content="AP Digital helps Surrey businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Surrey, BC. No contracts."
        />
        <link rel="canonical" href="https://ap-digital.ca/surrey" />
        <meta property="og:title" content="Digital Marketing Agency Surrey BC | AP Digital" />
        <meta
          property="og:description"
          content="AP Digital helps Surrey businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Surrey, BC. No contracts."
        />
        <meta property="og:url" content="https://ap-digital.ca/surrey" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Digital Marketing Agency Surrey BC | AP Digital" />
        <meta
          name="twitter:description"
          content="AP Digital helps Surrey businesses get more leads with Meta Ads, Google Ads & social media. Serving trades, salons, realtors & coaches in Surrey, BC. No contracts."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />

        {/* HERO */}
        <section className="flex flex-col items-center justify-center px-6 py-28 text-center lg:py-40">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Digital Marketing Agency in Surrey,&nbsp;BC
          </h1>
          <p className="mt-4 text-xl font-medium text-accent-foreground sm:text-2xl">
            Get More Leads. No Contracts. Real Results.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            AP Digital helps Surrey businesses — trades, salons, real estate
            agents &amp; coaches — get a predictable flow of leads using Meta
            Ads, Google Ads &amp; social media. Managed personally by Arjun
            Sharma. Month-to-month.
          </p>
          <div className="mt-10">
            <a
              href="https://calendly.com/apdigital-core/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book Your Free Call
            </a>
          </div>
        </section>

        {/* WHO WE HELP */}
        <section className="bg-secondary px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Who We Help in Surrey
            </h2>
            <p className="mt-4 text-muted-foreground">
              We work with local Surrey businesses that are tired of relying on
              word-of-mouth and ready to grow with paid advertising and social
              media.
            </p>
            <ul className="mt-8 space-y-4">
              {whoWeHelp.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <strong>{item.title}</strong> — {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* WHY US */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why Surrey Businesses Choose AP Digital
            </h2>
            <p className="mt-4 text-muted-foreground">
              No outsourcing. No account managers. Arjun personally runs every
              campaign.
            </p>
            <ul className="mt-8 space-y-4">
              {whyUs.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-secondary px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              What We Do for Surrey Businesses
            </h2>
            <ul className="mt-8 space-y-4">
              {services.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <strong>{item.title}</strong> — {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-primary px-6 py-20 text-center text-primary-foreground">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Get More Leads in Surrey?
            </h2>
            <p className="mt-4 opacity-90">
              Book a free 20-minute strategy call. We'll tell you exactly what's
              working in your market and show you what a campaign would look
              like. No pitch, no pressure.
            </p>
            <div className="mt-10">
              <a
                href="https://calendly.com/apdigital-core/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-background px-8 py-4 font-semibold text-foreground transition-opacity hover:opacity-90"
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
};

export default Surrey;
