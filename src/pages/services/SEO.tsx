import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Phone, Star } from 'lucide-react';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, getFAQSchema } from '@/lib/structuredData';

const TITLE = 'SEO Services Vancouver BC | Local SEO Agency | AP Digital';
const DESC = 'Rank higher on Google and get found by local customers. AP Digital offers SEO services for small businesses in Vancouver, BC. Month-to-month, no lock-in.';
const CANONICAL = 'https://ap-digital.ca/services/seo';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Comprehensive technical SEO audit',
  'Keyword research & content strategy',
  'On-page optimization (titles, metas, headings)',
  'Local SEO & Google Business Profile optimization',
  'Backlink building & outreach',
  'Monthly ranking & traffic reports',
  'Site speed & Core Web Vitals optimization',
  'Competitor gap analysis',
];

const faqs = [
  {
    question: 'How long does SEO take to show results?',
    answer: 'Most clients start seeing ranking improvements within 60 to 90 days, and meaningful traffic growth within four to six months. Local SEO — especially Google Business Profile optimization — can show results much faster, often within 30 days. SEO is a long game, but once you rank, the leads keep coming without paying per click.',
  },
  {
    question: 'How much do SEO services cost in Vancouver?',
    answer: 'Our SEO packages start at $750 per month for local SEO and scale up based on competitiveness, number of target keywords, and content volume. We quote every engagement upfront with no lock-in contracts. Most clients see positive ROI within four to six months as rankings climb.',
  },
  {
    question: 'Do you do local SEO or national SEO?',
    answer: 'Both, though we specialize in local SEO for small businesses across Metro Vancouver and the Fraser Valley. Local SEO focuses on Google Business Profile, map pack rankings, local citations, and location-specific content — the kind of work that drives phone calls and bookings from nearby customers. We also support broader national campaigns for service-area businesses.',
  },
  {
    question: 'Can you guarantee first-page rankings?',
    answer: 'No reputable SEO agency can guarantee specific rankings — and anyone who does is lying. Google controls the algorithm, not us. What we do guarantee is transparent monthly reporting, proven strategies that compound over time, and a clear roadmap to meaningful traffic and lead growth. The majority of our clients reach page one within six months.',
  },
  {
    question: 'Do you build backlinks?',
    answer: 'Yes — ethical, high-quality backlinks are still one of the strongest ranking signals. We earn links through digital PR, local partnerships, industry directories, guest content, and resource pages. We never buy spammy links or use link farms, because those tactics get websites penalized by Google and destroy long-term equity.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getServiceSchema('Search Engine Optimization (SEO)', DESC, '/services/seo'),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'SEO Services', url: '/services/seo' },
    ]),
    getWebPageSchema(TITLE, DESC, '/services/seo'),
    getFAQSchema(faqs),
  ]
};

const SEO = () => (
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
    <main className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
          SEO for Canadian Small Business — Get Found on Google
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
          <p>When someone searches for the services you offer, are they finding you — or your competitors? If you're not on the first page of Google, you're invisible to the customers who are ready to buy right now.</p>
          <p>At AP DIGITAL, we implement proven SEO strategies that move your business up the rankings and keep you there. From technical optimizations and keyword targeting to local SEO and content strategy, we cover every angle that Google cares about.</p>
          <p>Unlike paid ads, SEO builds long-term equity for your business. Every page we optimize, every backlink we earn, and every piece of content we create compounds over time — giving you a growing stream of organic traffic that doesn't cost you per click.</p>
          <p>We focus on the keywords that actually drive revenue for your business, not vanity rankings. You'll see exactly where you rank, how much traffic you're getting, and how it's converting — with transparent monthly reports and a clear roadmap for growth.</p>
          <p>Local SEO is the single highest-ROI marketing investment for any Metro Vancouver small business. When someone in Surrey searches "hair salon near me" or a homeowner in Burnaby types "roofing contractor Burnaby," Google's local pack — the map and three businesses at the top of the page — captures more than 40% of all clicks. Getting into that pack is where we focus most of our local SEO work. We optimize your Google Business Profile with the right categories, service areas, photos, posts, and review strategy, then build local citations, drive authentic reviews, and earn links from Vancouver-based websites to cement your authority in the eyes of Google.</p>
          <p>On-page and technical SEO is where most agencies cut corners — and where we go deep. We audit your site for crawl errors, broken links, duplicate content, thin pages, slow load times, and mobile usability issues. We rewrite title tags and meta descriptions to match actual search intent, structure your headings for both humans and Google, implement schema markup so your pages show up as rich results, and optimize internal linking so authority flows to your most important pages. This technical foundation is what separates sites that rank from sites that sit on page three.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">Page 1</p>
            <p className="text-muted-foreground text-sm">Rankings within 6 months</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Phone className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">3x</p>
            <p className="text-muted-foreground text-sm">Average organic traffic growth</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-teal mx-auto mb-3" />
            <p className="font-display text-3xl font-bold text-teal mb-2">$750/mo</p>
            <p className="text-muted-foreground text-sm">Starting SEO package</p>
          </div>
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

        <IndustriesWeServe />

        <section className="mt-16 mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-foreground font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <div className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We provide SEO services for businesses across Metro Vancouver and the Fraser Valley.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Langley', href: '/langley' },
              { city: 'Coquitlam', href: '/coquitlam' },
            ].map(({ city, href }) => (
              <Link key={href} to={href} className="bg-muted rounded-xl p-4 text-center hover:bg-muted/80 transition-colors">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book your free strategy call and discover how SEO can bring you a steady stream of organic leads.</p>
          <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white">
            <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default SEO;
