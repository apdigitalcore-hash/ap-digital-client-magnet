import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Target, BarChart3, Video, Scissors, Home, Wrench, Dumbbell } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { organizationSchema, getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';

const TITLE = 'About AP DIGITAL | Canadian Digital Marketing Agency | Vancouver BC';
const DESC = 'AP DIGITAL is a Vancouver-based digital marketing agency helping salons, real estate agents, trades, and coaches get predictable leads through social media and paid ads.';
const CANONICAL = 'https://ap-digital.ca/about';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ]),
    getWebPageSchema(TITLE, DESC, '/about'),
  ]
};

const About = () => {
  const differentiators = [
    {
      icon: Target,
      title: 'Niche Specialists',
      description: 'We only work with salons, real estate agents, trades, and coaches — so we know exactly what works in your industry.',
    },
    {
      icon: BarChart3,
      title: 'Results Guaranteed',
      description: 'We measure everything by leads and revenue, not vanity metrics. If it doesn\'t generate business, we don\'t do it.',
    },
    {
      icon: Video,
      title: 'Short-Form Content Experts',
      description: 'We create scroll-stopping Reels, TikToks, and video ads that drive real action — not just likes.',
    },
  ];

  const niches = [
    { icon: Scissors, label: 'Salons & Beauty', description: 'Filling chairs with new clients through Instagram Reels, Facebook Ads, and local targeting.', href: '/salon-marketing' },
    { icon: Home, label: 'Real Estate Agents', description: 'Building personal brands and generating qualified buyer and seller leads on social media.', href: '/real-estate-marketing' },
    { icon: Wrench, label: 'Trades & Contractors', description: 'Getting phones ringing with local job leads through Google and Facebook advertising.', href: '/trades-marketing' },
    { icon: Dumbbell, label: 'Coaches & Trainers', description: 'Turning social media followers into paying clients with content strategy and paid ads.', href: '/coaching-marketing' },
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
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-custom py-16 md:py-24">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl">
            We're AP DIGITAL — A Results-First Marketing Agency
          </h1>
        </section>

        {/* Our Story */}
        <section className="container-custom py-12 md:py-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="max-w-3xl space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              AP DIGITAL was founded in Vancouver, BC by a young entrepreneur who saw local businesses wasting thousands of dollars on marketing that didn't convert. Flashy campaigns with no leads. Expensive agencies with no accountability. It was broken — and we knew we could fix it.
            </p>
            <p>
              We built AP DIGITAL with one mission: help local businesses get predictable, measurable leads using the strategies that actually work today — short-form video content and targeted paid advertising.
            </p>
            <p>
              Every dollar our clients spend is tied to a result. Every campaign is built to generate leads, not just impressions. That's the AP DIGITAL difference.
            </p>
          </div>
        </section>

        {/* Who We Help */}
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">Who We Help</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {niches.map((niche) => (
                <Link
                  key={niche.label}
                  to={niche.href}
                  className="bg-card rounded-xl p-6 shadow-custom-sm hover:shadow-custom-md transition-all duration-300 group"
                >
                  <niche.icon className="w-8 h-8 text-teal mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-teal transition-colors">{niche.label}</h3>
                  <p className="text-muted-foreground text-sm">{niche.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why AP DIGITAL */}
        <section className="container-custom py-16 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">Why AP DIGITAL</h2>
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

        {/* CTA */}
        <section className="bg-dark-bg py-16 md:py-20">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Get Real Results?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Book a free strategy call and let's talk about how we can generate predictable leads for your business.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Book Your Free Strategy Call</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
