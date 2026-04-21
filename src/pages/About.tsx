import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Target,
  BarChart3,
  Video,
  Scissors,
  Home,
  Wrench,
  Dumbbell,
  TrendingUp,
  Users,
  Star,
  Award,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  organizationSchema,
  getBreadcrumbSchema,
  getWebPageSchema,
  getPersonSchema,
  getFAQSchema,
} from '@/lib/structuredData';

const TITLE = 'About AP Digital | Vancouver Digital Marketing Agency | Arjun Sharma';
const DESC = 'AP Digital was founded by Arjun Sharma in Vancouver, BC. We specialize in lead generation for salons, trades, real estate & coaches.';
const CANONICAL = 'https://ap-digital.ca/about';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const faqs = [
  {
    question: 'Who founded AP Digital?',
    answer: 'AP Digital was founded by Arjun Sharma, a Vancouver-based marketing strategist who saw local businesses wasting thousands on agencies that delivered vanity metrics instead of actual leads. Arjun personally manages every client account — you are never handed off to a junior or overseas team.',
  },
  {
    question: 'Where is AP Digital based?',
    answer: 'AP Digital is headquartered in Vancouver, BC, and serves small businesses across Metro Vancouver and the Fraser Valley — including Surrey, Burnaby, Langley, Coquitlam, Port Coquitlam, Maple Ridge, New Westminster, and the City of Vancouver. We also work with Canadian clients nationally when the fit is right.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We specialize in four industries: salons and beauty, trades and contractors, real estate agents, and coaches and trainers. Staying niche means we bring playbooks that already work in your vertical — not experiments using your budget. We have run more than 50 campaigns across these categories.',
  },
  {
    question: 'Do you require long-term contracts?',
    answer: 'No. Every AP Digital engagement is month-to-month. We earn your business with results, not contractual lock-in. Most clients stay with us long-term because the campaigns are profitable — not because they are obligated to.',
  },
  {
    question: 'How big is the team?',
    answer: 'AP Digital is intentionally small. Arjun leads strategy and client accounts personally, supported by a tight-knit team of specialist contractors for video editing, design, and paid media execution. This structure keeps overhead low, quality high, and communication direct — you always know who is working on your account.',
  },
  {
    question: 'How does AP Digital measure success?',
    answer: 'We measure two things: qualified leads and revenue. Not likes, not impressions, not followers. Every client gets a reporting dashboard that ties every campaign back to real business outcomes — cost per lead, booking rate, and return on ad spend. If a channel is not making money, we cut it.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ]),
    getWebPageSchema(TITLE, DESC, '/about'),
    getPersonSchema({
      name: 'Arjun Sharma',
      jobTitle: 'Founder & Marketing Strategist',
      description: 'Arjun Sharma is the founder of AP Digital, a Vancouver-based marketing agency helping Canadian small businesses generate predictable leads through short-form content and paid advertising.',
      url: '/about',
      sameAs: [
        'https://www.instagram.com/theapdigital/',
        'https://www.linkedin.com/company/apdigital',
      ],
    }),
    getFAQSchema(faqs),
  ]
};

const About = () => {
  const differentiators = [
    {
      icon: Target,
      title: 'Niche Specialists',
      description: 'We only work with salons, real estate agents, trades, and coaches — so we know exactly what works in your industry before we ever run a dollar of ad spend.',
    },
    {
      icon: BarChart3,
      title: 'Results Guaranteed',
      description: 'We measure everything by leads and revenue, not vanity metrics. If it does not generate business, we do not do it. Every campaign has a cost-per-lead target we commit to.',
    },
    {
      icon: Video,
      title: 'Short-Form Content Experts',
      description: 'We create scroll-stopping Reels, TikToks, and video ads that drive real action — not just likes. Video is the #1 performing format in 2026 and we have the playbook.',
    },
  ];

  const niches = [
    { icon: Scissors, label: 'Salons & Beauty', description: 'Filling chairs with new clients through Instagram Reels, Facebook Ads, and local targeting.', href: '/salon-marketing' },
    { icon: Home, label: 'Real Estate Agents', description: 'Building personal brands and generating qualified buyer and seller leads on social media.', href: '/real-estate-marketing' },
    { icon: Wrench, label: 'Trades & Contractors', description: 'Getting phones ringing with local job leads through Google and Facebook advertising.', href: '/trades-marketing' },
    { icon: Dumbbell, label: 'Coaches & Trainers', description: 'Turning social media followers into paying clients with content strategy and paid ads.', href: '/coaching-marketing' },
  ];

  const stats = [
    { icon: TrendingUp, value: '2,400+', label: 'Qualified leads delivered' },
    { icon: Users, value: '50+', label: 'Canadian businesses served' },
    { icon: Star, value: '5.0', label: 'Google rating from 14+ reviews' },
    { icon: Award, value: '8.2x', label: 'Average return on ad spend' },
  ];

  const values = [
    {
      title: 'Transparency over jargon',
      description: 'No smoke and mirrors. You see every dollar spent, every lead generated, and every number that matters. If you cannot understand a report in under 60 seconds, it is a bad report.',
    },
    {
      title: 'Niche expertise over generalism',
      description: 'We say no to industries we do not understand. This is why our campaigns outperform generalist agencies — we have already run the test in your vertical.',
    },
    {
      title: 'Outcomes over outputs',
      description: 'Posting more is not a strategy. Running more ads is not a strategy. We start from the business outcome you need and work backwards to the minimum viable campaign that gets you there.',
    },
    {
      title: 'Long-term partnerships over one-off gigs',
      description: 'Marketing compounds. The clients who stay with us for 12+ months see 3-5x the results of one-off projects. That is why we build every engagement as a long-term relationship, not a quick transaction.',
    },
  ];

  return (
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
        <meta property="og:site_name" content="AP DIGITAL" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Header />

      <main>
        {/* Dark Hero */}
        <section className="relative bg-near-black pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-teal/5 rounded-full blur-3xl" />
          </div>
          <div className="container-custom relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Vancouver, BC · Serving Metro Vancouver</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mb-6">
              About <span className="text-gradient">AP Digital</span> — Built for Vancouver Small Business
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
              Founded by Arjun Sharma in Vancouver, BC, AP Digital is a specialist marketing agency helping salons, trades, real estate agents, and coaches generate predictable leads through short-form content and targeted paid advertising. No lock-in contracts. No vanity metrics. Just measurable results.
            </p>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-charcoal py-12 md:py-16 border-b border-gray-800">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 text-teal mx-auto mb-3" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Founder */}
        <section className="container-custom py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Meet the Founder</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Arjun Sharma — Founder & Marketing Strategist
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed max-w-3xl">
              <p>
                Arjun Sharma founded AP Digital with a simple frustration: Canadian small business owners were being oversold on generic marketing services and under-delivered on actual results. Every salon, contractor, and realtor he talked to had the same story — they had paid an agency four or five figures, watched their ad spend disappear, and had nothing to show for it except a prettier Instagram grid.
              </p>
              <p>
                He built AP Digital to flip that model. Instead of selling hours, Arjun sells outcomes. Instead of chasing 12-month retainers, he runs month-to-month engagements that have to be re-earned every 30 days. Instead of generalizing across every vertical, AP Digital specializes in four — salons, trades, real estate, and coaches — so the agency brings battle-tested playbooks to every new client.
              </p>
              <p>
                Arjun personally leads strategy and account management for every AP Digital client. When you sign on, you are not handed off to a junior account manager or an overseas team. You talk directly to the person running your campaigns, which is exactly how it should be when your money is on the line.
              </p>
              <p>
                Outside of AP Digital, Arjun is deeply embedded in the Vancouver small business community — from Surrey and Burnaby to Langley, Coquitlam, and the Fraser Valley. He understands how local markets behave, what kind of creative resonates with Canadian audiences, and how to build campaigns that feel native to the Lower Mainland rather than imported from Silicon Valley.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container-custom max-w-4xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                AP Digital was founded in Vancouver, BC after Arjun spent years watching local businesses get taken for a ride by agencies that cared more about billing cycles than business outcomes. Flashy campaigns with no leads. Expensive retainers with no accountability. Monthly reports full of impressions, reach, and engagement — but no actual revenue. It was broken, and we knew we could fix it.
              </p>
              <p>
                We built AP Digital with one mission: help Canadian small businesses get predictable, measurable leads using the strategies that actually work today — short-form video content and targeted paid advertising. Every dollar our clients spend is tied to a result. Every campaign is built to generate leads, not just impressions. Every report maps back to real dollars in the bank.
              </p>
              <p>
                Since launching, we have delivered more than 2,400 qualified leads to Canadian small businesses, produced over 500 pieces of short-form video content, and earned a 5.0-star Google rating from 14+ real clients. We have helped salons fill their chairs, contractors fill their calendars, and realtors close more deals — all through one philosophy: marketing is only valuable if it makes the phone ring.
              </p>
              <p>
                Today, AP Digital is the go-to marketing partner for small businesses across Metro Vancouver and the Fraser Valley. And we are just getting started.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Help */}
        <section className="container-custom py-16 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Who We Help</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
            We specialize in four industries. Staying focused means we bring playbooks that already work in your vertical — not experiments using your budget.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {niches.map((niche) => (
              <Link
                key={niche.label}
                to={niche.href}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-teal/50 transition-all duration-300 group"
              >
                <niche.icon className="w-8 h-8 text-teal mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-teal transition-colors">{niche.label}</h3>
                <p className="text-muted-foreground text-sm">{niche.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* What We Believe (Values) */}
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">What We Believe</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
              Four operating principles that guide every engagement we take on.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why AP DIGITAL */}
        <section className="container-custom py-16 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">Why AP Digital</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.map((item) => (
              <div key={item.title} className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container-custom max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal mb-4">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Frequently Asked</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Questions about AP Digital</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-foreground font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="container-custom py-16 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Cities We Serve</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
            AP Digital works with small businesses across Metro Vancouver and the Fraser Valley. Click your city for localized information.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Langley', href: '/langley' },
              { city: 'Coquitlam', href: '/coquitlam' },
            ].map(({ city, href }) => (
              <Link
                key={href}
                to={href}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-teal/50 hover:shadow-md transition-all"
              >
                <MapPin className="w-5 h-5 text-teal mx-auto mb-2" />
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-near-black py-16 md:py-20">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Get Real Results?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Book a free strategy call with Arjun and let's talk about how AP Digital can generate predictable leads for your business.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;

