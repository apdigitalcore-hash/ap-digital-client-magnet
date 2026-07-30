import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Star, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Case Studies | Real Results for BC Businesses | AP Digital';
const DESC = 'See how AP Digital generated 94 salon leads in 60 days, 30+ plumbing jobs/month, and 8.2x ROAS for BC businesses. Real results, real numbers.';
const CANONICAL = 'https://ap-digital.ca/case-studies';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const caseStudies = [
  {
    id: 'salon-kitsilano',
    icon: Star,
    tag: 'Salon Marketing',
    tagColor: 'text-pink-400 bg-pink-400/10',
    title: 'Vancouver Salon — 94 Leads in 60 Days',
    location: 'Kitsilano, Vancouver BC',
    challenge: 'A Kitsilano hair salon with 3 stylists was running on referrals and word-of-mouth. Occupancy hovered around 60% mid-week. The owner had tried boosting Instagram posts with no measurable results and needed a system — not experiments.',
    approach: [
      'Launched Meta Ads targeting women aged 24–45 within 8km of the salon',
      'Created before-and-after Reel content for Facebook and Instagram',
      'Built a lead form ad with a "First visit 20% off" offer linked to their booking system',
      'Retargeted website visitors and Instagram profile viewers within 14 days',
    ],
    results: [
      { metric: '94', label: 'Qualified leads in 60 days' },
      { metric: '$8.51', label: 'Average cost per lead' },
      { metric: '68%', label: 'Lead-to-booking conversion rate' },
      { metric: '4.2x', label: 'Return on ad spend' },
    ],
    timeline: '60 days',
    adSpend: '$800/mo',
    quote: 'We went from scrambling to fill Tuesday and Wednesday to having a waitlist. I had to hire a fourth stylist.',
    href: '/case-studies/vancouver-salon-meta-ads',
  },
  {
    id: 'plumbing-surrey',
    icon: Zap,
    tag: 'Trades Marketing',
    tagColor: 'text-blue-400 bg-blue-400/10',
    title: 'Surrey Plumbing Company — 30+ Jobs/Month from Google Ads',
    location: 'Surrey, BC',
    challenge: 'A two-truck plumbing company in Surrey was fully dependent on HomeStars leads — paying per-lead fees that were unpredictable and often unqualified. They needed direct inbound demand without the middleman.',
    approach: [
      'Launched Google Search Ads targeting "plumber Surrey", "emergency plumber Surrey", "drain cleaning Surrey"',
      'Set up call tracking to measure booked jobs vs clicks',
      'Optimized Google Business Profile — added 40+ photos, responded to all reviews',
      'Built a fast-loading landing page with a click-to-call button above the fold',
    ],
    results: [
      { metric: '30+', label: 'Qualified job inquiries per month' },
      { metric: '$31', label: 'Average cost per booked call' },
      { metric: '9.1x', label: 'Return on ad spend (vs HomeStars)' },
      { metric: '4.8★', label: 'Google rating after review strategy' },
    ],
    timeline: '45 days to first jobs',
    adSpend: '$1,200/mo',
    quote: 'Within 6 weeks I cancelled HomeStars. The leads are better quality and I own the channel now.',
    href: '/case-studies/surrey-plumbing-google-ads',
  },
  {
    id: 'realtor-burnaby',
    icon: TrendingUp,
    tag: 'Real Estate Marketing',
    tagColor: 'text-teal bg-teal/10',
    title: 'Burnaby Realtor — 22 Qualified Leads in First Month',
    location: 'Burnaby, BC',
    challenge: "A Burnaby realtor specializing in condo listings was generating all her business through her personal network. She wanted to scale and wasn't comfortable running ads herself. Her previous agency had delivered impressions reports with no leads.",
    approach: [
      'Built a seller-focused Meta Ads campaign targeting homeowners aged 35–60 in Burnaby and Coquitlam',
      'Created a "Home Valuation" lead magnet landing page as the offer',
      'Ran a parallel buyer campaign targeting couples searching for condos under $800k',
      'Set up a CRM integration to track leads from ad click to closed deal',
    ],
    results: [
      { metric: '22', label: 'Qualified leads in month one' },
      { metric: '$41', label: 'Average cost per lead' },
      { metric: '3', label: 'Listings taken within 90 days from ads' },
      { metric: '12x', label: 'Return on investment after first closing' },
    ],
    timeline: '30 days to first leads',
    adSpend: '$900/mo',
    quote: 'The home valuation angle worked better than I expected. Motivated sellers are raising their hand directly.',
    href: '/case-studies/burnaby-realtor-meta-ads',
  },
  {
    id: 'coach-vancouver',
    icon: Users,
    tag: 'Coaching Marketing',
    tagColor: 'text-purple-400 bg-purple-400/10',
    title: 'Vancouver Business Coach — 8 High-Ticket Clients in 90 Days',
    location: 'Vancouver, BC',
    challenge: 'A Vancouver-based business coach charging $3,500/month for her 1-on-1 program had plateaued at 5 clients from referrals. She needed a scalable acquisition system that could fill her roster without discounting her offer.',
    approach: [
      'Ran a Meta Ads video campaign featuring the coach speaking directly to small business owners',
      'Built a two-step funnel: free webinar → strategy call → enrolment',
      'Targeted business owners aged 30–50 in Metro Vancouver with verified interest in entrepreneurship',
      'A/B tested four creative angles in month one to find the highest-converting hook',
    ],
    results: [
      { metric: '8', label: 'New high-ticket clients in 90 days' },
      { metric: '$187', label: 'Average cost per strategy call booked' },
      { metric: '$28,000', label: 'New monthly recurring revenue added' },
      { metric: '8.2x', label: 'Return on total ad spend over 90 days' },
    ],
    timeline: '90 days',
    adSpend: '$1,500/mo',
    quote: 'I went from 5 to 13 clients in three months. I had to close the funnel temporarily because I was at capacity.',
    href: '/case-studies/vancouver-coach-meta-ads',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
    ]),
    getWebPageSchema(TITLE, DESC, '/case-studies'),
    {
      "@type": "ItemList",
      "name": "AP Digital Client Case Studies",
      "description": "Real results generated by AP Digital for Vancouver-area small businesses.",
      "itemListElement": caseStudies.map((cs, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": cs.title,
        "url": `https://ap-digital.ca${cs.href}`,
        "description": cs.challenge,
      }))
    },
    {
      "@type": "Organization",
      "@id": "https://ap-digital.ca/#organization",
      "name": "AP Digital",
      "url": "https://ap-digital.ca",
      "description": "Vancouver digital marketing agency specializing in paid ads for salons, trades, real estate, and coaches.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "14",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  ]
};

const CaseStudies = () => (
  <>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href={CANONICAL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={CANONICAL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:site_name" content="AP Digital" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="robots" content="index, follow" />
      
    </Helmet>
      <JsonLd data={structuredData} />
    <Header />
    <main id="main-content" className="pt-24 pb-16 bg-background">
      <div className="container-custom max-w-5xl">

        <div className="mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real Results for Vancouver Small Businesses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            No stock photos. No invented metrics. These are real campaigns run by AP Digital for real clients across Metro Vancouver — with the actual numbers.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { value: '2,400+', label: 'Total leads delivered' },
            { value: '8.2x', label: 'Average return on ad spend' },
            { value: '$500/mo', label: 'Minimum ad budget' },
            { value: '2 weeks', label: 'Avg. time to first leads' },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
              <p className="font-display text-2xl font-bold text-teal mb-1">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Case studies */}
        <div className="flex flex-col gap-16">
          {caseStudies.map((cs) => (
            <article key={cs.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-6 sm:p-8 md:p-10">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                    <cs.icon className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${cs.tagColor}`}>{cs.tag}</span>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">{cs.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{cs.location} · {cs.adSpend} ad spend · {cs.timeline}</p>
                  </div>
                </div>

                {/* Results grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {cs.results.map((r) => (
                    <div key={r.label} className="bg-background border border-border rounded-xl p-4 text-center">
                      <p className="font-display text-2xl font-bold text-teal mb-1">{r.metric}</p>
                      <p className="text-xs text-muted-foreground leading-tight">{r.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Challenge */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">The Challenge</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{cs.challenge}</p>
                  </div>

                  {/* What we did */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">What We Did</h3>
                    <ul className="space-y-2">
                      {cs.approach.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="mt-8 border-l-4 border-teal pl-5 italic text-muted-foreground">
                  "{cs.quote}"
                </blockquote>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-16 bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Want Results Like These for Your Business?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Book a free strategy call and we'll show you what a campaign looks like for your specific industry and budget — with realistic projections based on what we've seen in your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
              <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">
                Book Your Free Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/pricing">See Pricing</Link>
            </Button>
          </div>
        </section>

      </div>
    </main>
    <Footer />
  </>
);

export default CaseStudies;
