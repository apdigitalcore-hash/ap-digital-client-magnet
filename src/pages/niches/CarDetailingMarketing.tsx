import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Camera, Calendar, ShieldCheck } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Car Detailing Marketing Vancouver — More Bookings | AP Digital';
const DESC = 'Google Ads & Meta Ads for mobile and shop-based auto detailers in Metro Vancouver. $759/month, month-to-month, 90-day results guarantee.';
const CANONICAL = 'https://ap-digital.ca/car-detailing-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Search Ads for "car detailing near me," "ceramic coating [city]" & mobile detailing searches',
  'Meta Ads built on your own before-and-after photos and short videos',
  'Separate campaigns for ceramic coating, paint correction & PPF versus maintenance details',
  'Google Business Profile setup for mobile (service-area) or shop-based detailers',
  'Landing pages with your package menu and an online booking or quote form',
  'Review requests after every completed detail, with a direct link to your profile',
  'Retargeting for visitors who viewed coating or correction pages without booking',
  'Weekly performance report showing cost per booked appointment',
];

const results = [
  { icon: Camera, stat: 'Google & Meta', label: 'Search ads for intent, before-and-after ads for reach' },
  { icon: Calendar, stat: 'No Contract', label: 'Month-to-month, 30 days\' notice' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Lead-volume target agreed before launch' },
];

const faqs = [
  {
    question: 'How do I get more car detailing clients?',
    answer: 'Cover the two ways people find a detailer. Google Ads and a complete Google Business Profile catch people already searching for car detailing or ceramic coating near them. Meta Ads, built on your own before-and-after photos, reach car owners who were not searching yet. Then make booking easy, ask every customer for a review, and offer a maintenance plan at the end of the first detail so one booking turns into several.',
  },
  {
    question: 'How much does car detailing marketing cost?',
    answer: 'AP Digital charges $759/month for management, month-to-month with 30 days\' notice. Ad spend is separate and paid directly to Google or Meta on your own account. We recommend at least $1,000/month in ad spend so campaigns gather enough data to optimize, which makes about $1,759/month all in at the minimum.',
  },
  {
    question: 'Should a detailing business use Google Ads or Meta Ads?',
    answer: 'Usually both, for different jobs. Google Ads catches people searching right now, which suits maintenance details, pre-sale details and anyone comparing ceramic coating installers. Meta Ads show your before-and-after work to people who were not searching, which is how high-ticket services like paint correction get discovered. Most detailers start with Google search and add Meta once they have a library of good photos.',
  },
  {
    question: 'How does a mobile detailer show up on Google Maps without a shop?',
    answer: 'Set your Google Business Profile up as a service-area business: verify it with your real address, hide that address from the public, and list the cities and areas you travel to. Map results still lean on where your business is based, so you will typically show most strongly near your home base. Reviews that mention the service and the area, and regular photos of your work, help you show further out.',
  },
  {
    question: 'How do I sell more ceramic coating and paint correction?',
    answer: 'Treat them as a separate product from washes. Give each its own landing page that explains the prep, how long the job takes, what aftercare it needs and what the warranty covers, with close-up before-and-after photos taken under good light. Run them in their own campaigns so their cost per booking is measured on its own, and retarget people who read those pages without booking. Your existing maintenance customers are also your warmest coating leads.',
  },
  {
    question: 'Should I buy car detailing leads or run my own ads?',
    answer: 'Lead sites and marketplaces are an easy start, but they typically send each request to several detailers at once, so you compete on price and speed. Your own Google Ads, Meta Ads and Google Business Profile send each enquiry to you alone, and the reviews and customer list build on your own business. Many detailers keep a marketplace running while their own channels ramp up.',
  },
  {
    question: 'When is the busy season for car detailing in BC?',
    answer: 'Spring and summer are typically busiest, as pollen, road trips and dry weather bring people in and coating work is easier to schedule. Winter brings road salt and grime and a steady stream of interior work, but outdoor mobile work is harder in heavy rain. Pre-sale details happen all year. Your ad budget should shift with those patterns rather than stay flat.',
  },
  {
    question: 'Do I own my Google Ads account and Google Business Profile?',
    answer: 'Yes. Your Google Ads account and Google Business Profile stay in your name, and ad spend is billed to you directly by Google or Meta. If you leave, with 30 days\' notice, you keep the accounts, the history, the photos and every review.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. AP Digital works month-to-month with no lock-in and no cancellation fees. We agree on a lead-volume target at kickoff, and if we miss it by month 3 we keep working at no fee for a further 30 days.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Car Detailing Marketing', DESC, '/car-detailing-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Car Detailing Marketing', url: '/car-detailing-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/car-detailing-marketing'),
  ]
};

const CarDetailingMarketing = () => (
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
    </Helmet>
    <JsonLd data={structuredData} />
    <Header />
    <main id="main-content" className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] tracking-tight mb-8">
          Car Detailing Marketing in Metro Vancouver
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Ceramic coatings, paint correction, interior resets and mobile maintenance washes. AP Digital runs Google Ads and Meta Ads for mobile and shop-based auto detailing businesses across Metro Vancouver and the Fraser Valley, measured on booked appointments rather than clicks.
        </p>

        <InlineCTA context="detailing business" />

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Your before-and-afters are the ad</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Few services show their result in a single photo. A swirled bonnet next to a corrected one does more selling than any headline we could write.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Mobile or shop, built differently</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">A mobile detailer sells convenience across a service area. A shop sells a place worth driving to. The targeting, copy and Google profile follow from that.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">No contract, 90-day guarantee</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Month-to-month. If we miss the lead target we agree on at kickoff by month 3, we keep working at no fee for a further 30 days.</p>
          </div>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">What You Get</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mb-16">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground">
              <CheckCircle className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">How We Work</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {results.map((r) => (
            <div key={r.label} className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-7 text-center">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
              <r.icon className="reveal-ink relative z-10 w-8 h-8 text-foreground mx-auto mb-3" />
              <div className="reveal-ink relative z-10 font-serif text-3xl font-medium text-foreground mb-2">{r.stat}</div>
              <p className="reveal-body relative z-10 text-muted-foreground text-sm">{r.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Mobile Detailing vs. Shop-Based: Why the Ads Differ</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Car detailing marketing starts with one question: does the customer come to you, or do you go to them? The answer changes who you target, what the ad says, how your Google profile is set up and what the booking form has to ask.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Mobile detailing marketing</h3>
          <p className="mb-4">
            A mobile detailer is selling convenience: the car gets done in the driveway while the owner gets on with their day, and the ad should say so in its first line. Targeting follows your realistic driving radius rather than a whole region, often tighter for maintenance washes and wider for coating and correction jobs that are worth the drive.
          </p>
          <p className="mb-4">
            The booking form matters more for mobile work. It needs the address, the vehicle, and whether there is space, power and water on site. Condo and townhouse parkades often restrict washing, so a mobile detailer serving dense areas should say clearly whether they use waterless or rinseless methods.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Shop-based detailing</h3>
          <p className="mb-4">
            A shop is selling a place worth driving to: controlled lighting, a clean bay, time to do a multi-day coating properly. Targeting centres on the shop and on the drive time people will accept, which is typically longer for a paint correction than for an interior clean. Your address, hours and photos of the bay matter in the ad and on your Google profile, and the Map Pack, the three local businesses Google shows on a map, works in your favour because you have a fixed location to rank around.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Running both</h3>
          <p>
            Plenty of detailers do maintenance on the road and bring correction and coating jobs back to a shop or rented bay. Run the two as separate campaigns with separate landing pages: a driveway wash and a two-stage correction are bought by different people.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">High-Ticket Work vs. Maintenance Details</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Auto detailing marketing has to handle two very different purchases, often from the same business.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Ceramic coating, paint correction and PPF</h3>
          <p className="mb-4">
            These are researched purchases. Someone searching for ceramic coating in Burnaby is usually comparing installers and asking for quotes before they commit. They want to know what the correction stage involves, how long they will be without the car, what aftercare is needed and what the warranty covers. A detailer who answers those questions on a dedicated page, with close-up photos of their own work, is far more likely to get the call. These jobs belong in their own campaign, judged on cost per booked consultation or quote rather than cost per click.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Maintenance washes and interior details</h3>
          <p className="mb-4">
            These are decided on convenience and trust, often within minutes. Ads should lead with the package, the area you cover and how soon you can come, and the landing page should show clear pricing.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Why they feed each other</h3>
          <p>
            Separate campaigns do not mean separate customers. A maintenance customer who has seen your work up close is the easiest coating sale you will make, and a freshly coated car needs regular maintenance washes to keep the coating performing.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Before-and-After Photos: Why Meta Ads Work Unusually Well Here</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Most local services struggle to show what they do in an ad. Detailing does not. A side-by-side of a hazy, swirled panel and the same panel after correction, or a short clip of water beading off a freshly coated bonnet, explains the service in a second. That is exactly the kind of creative Facebook and Instagram reward, and it is why <Link to="/services/paid-ads" className="text-foreground underline underline-offset-4">Meta Ads</Link> earn a larger share of the budget in this vertical than they do for most trades.
          </p>
          <p className="mb-4">
            The photos have to come from your own jobs, and the habits that make them work are simple. Shoot the before and the after from the same angle, in the same light. Use a light that shows swirl marks and scratches for correction work, because that is what the buyer is paying to remove. For interiors, the before should show the real mess. Short vertical videos, such as a slow pass along a corrected door or the 50/50 tape line on a bonnet, often outperform still photos. Ask the owner before you post, and blur licence plates.
          </p>
          <p className="mb-4">
            Meta Ads reach car owners within your radius who were not searching for a detailer that day, which makes Meta the natural channel for discovery and high-ticket services, while Google search catches people who already know what they want. If you also want help keeping your own Instagram and Facebook active between ads, that is our <Link to="/services/social-media" className="text-foreground underline underline-offset-4">social media management</Link> service, quoted separately.
          </p>
          <p>
            For a fuller comparison of the two platforms for a local business, see <Link to="/blog/google-ads-vs-meta-ads-local-business" className="text-foreground underline underline-offset-4">Google Ads vs. Meta Ads</Link>.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Google Business Profile and Reviews for a Detailer With No Fixed Address</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            When someone searches car detailing near me, the Map Pack takes a large share of the clicks. A shop-based detailer sets up a normal profile with a visible address. A mobile detailer sets it up as a service-area business: Google still needs a real address to verify the profile, but you can hide it from the public and list the cities and areas you travel to instead. A PO box or a virtual office will not pass verification and risks suspension.
          </p>
          <p className="mb-4">
            Map results typically lean on where the business is based, even for service-area profiles, so a mobile detailer will usually show most strongly near home and need ads to reach the far edge of the service area. Within that area, the profile itself decides who shows first: the car detailing category, each service listed separately, accurate hours, and new photos of your work added regularly.
          </p>
          <p className="mb-4">
            Reviews carry unusual weight because the customer is handing over a car they care about. Ask at handover, when the car looks its best, and text a direct link. Reviews that mention the service and the area, such as a ceramic coating in Langley or an interior detail in Coquitlam, help more than a generic five stars. Reply to every review, including the occasional bad one. Our guide to <Link to="/blog/how-to-get-more-google-reviews-canada" className="text-foreground underline underline-offset-4">getting more Google reviews</Link> covers the process.
          </p>
          <p>
            Your Google Business Profile and Google Ads account stay in your name. Ad spend is billed to you directly by Google or Meta, so if you ever leave, the profile, the reviews and the account history leave with you.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Seasonality in BC: Planning the Detailing Year</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Detailing demand in Metro Vancouver and the Fraser Valley follows the weather more than most services, and a flat monthly budget ignores that. The fixed part is the program itself: $759/month for management, month-to-month with 30 days' notice, plus ad spend paid directly to Google or Meta. We recommend at least $1,000/month in ad spend, so about $1,759/month all in at the minimum. What should move through the year is where that spend goes.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Winter: salt, grime and interiors</h3>
          <p className="mb-4">
            When snow and ice arrive, municipalities put down salt and brine, and wet roads coat everything in grime. That brings demand for salt removal, underbody washes and interiors that have taken months of wet boots. Heavy rain makes outdoor mobile work harder to schedule, so mobile detailers often lean on interior packages and covered locations in these months.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Spring: pollen and the reset</h3>
          <p className="mb-4">
            Spring pollen leaves a yellow film on every car in the region, and many owners want a full reset after winter. People also start planning coatings for the dry months, so this is when to put more budget behind coating and correction campaigns.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Summer: the busy season</h3>
          <p className="mb-4">
            Dry spells make outdoor work and coating cures easier to schedule, and bugs, sap and road-trip dirt keep maintenance steady. If your calendar is full, spend can drop back toward the minimum.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Fall: protection before the rain</h3>
          <p className="mb-4">
            Before the wet season, owners who want their paint protected through winter book sealants and coatings. A short push in September and early October aimed at protection before the rain tends to land well.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">All year: pre-sale details</h3>
          <p>
            People selling a car privately or trading it in want it to look its best before photos and viewings. Pre-sale searches happen in every month, and a dedicated package and ad for them is simple to run alongside everything else. See full <Link to="/pricing" className="text-foreground underline underline-offset-4">pricing</Link>.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Recurring Packages vs. One-Off Jobs</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            A one-off detail is a transaction. A maintenance plan, whether a wash every two weeks, a monthly interior or a quarterly decontamination, is a customer relationship, and it changes the whole marketing equation. When a first detail typically leads to months of repeat visits, you can afford to spend more to win that first booking than a detailer who only ever sees each car once.
          </p>
          <p className="mb-4">
            That only works if the plan is actually offered, and the best moment is at handover after the first detail, when the customer is looking at a clean car. A simple menu of two or three plans, booked on the spot, beats an email a week later.
          </p>
          <p>
            It is also how to measure marketing honestly. We report cost per booked first appointment weekly, but whether advertising pays depends on what each new customer is worth over the following months. Track which ad each customer came from and whether they moved onto a plan, and you will know which campaigns to scale.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What to Expect in the First 90 Days</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            At kickoff we agree a lead-volume target and set up tracking so every call, form and online booking is counted. We clean up or create your Google Business Profile, build landing pages for your main packages, and launch Google search first, since it catches existing demand fastest. Most clients see their first qualified leads within 2 weeks of launch.
          </p>
          <p className="mb-4">
            Meta Ads follow once we have a set of your before-and-after photos and videos to test. Paid social typically shows qualified leads within 2 to 3 weeks as the campaigns learn. With real booking data coming in, we move budget toward the services and areas that book and away from the ones that do not.
          </p>
          <p>
            By the end of month three you should know your cost per booked appointment for each service and whether the program pays for itself. If we have missed the lead target we agreed at kickoff, we keep working at no fee for a further 30 days. That is the 90-day results guarantee, and you can stop at any time with 30 days' notice.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Related Pages</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/services/paid-ads" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Google &amp; Meta Ads</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">How we run paid ads for local service businesses.</p>
            </Link>
            <Link to="/services/social-media" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Social Media Management</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Instagram and Facebook managed between campaigns.</p>
            </Link>
            <Link to="/salon-marketing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Salon Marketing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Before-and-after led Meta Ads for Vancouver salons.</p>
            </Link>
            <Link to="/pricing" className="bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300">
              <p className="font-bold text-foreground">Pricing</p>
              <p className="reveal-body relative z-10 text-sm text-muted-foreground">Management fees, ad spend and what is included.</p>
            </Link>
          </div>
        </div>

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help mobile and shop-based detailers across Metro Vancouver and the Fraser Valley.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { city: 'Vancouver', href: '/vancouver' },
              { city: 'Surrey', href: '/surrey' },
              { city: 'Burnaby', href: '/burnaby' },
              { city: 'Richmond', href: '/richmond' },
              { city: 'Langley', href: '/langley' },
              { city: 'Coquitlam', href: '/coquitlam' },
              { city: 'Abbotsford', href: '/abbotsford' },
            ].map(({ city, href }) => (
              <Link key={href} to={href} className="bg-white elev-1 hover:elev-2 hover:-translate-y-0.5 rounded-2xl p-4 text-center transition-all duration-300">
                <span className="font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>

        <PastelCTA />
      </div>
    </main>
    <Footer />
  </>
);

export default CarDetailingMarketing;
