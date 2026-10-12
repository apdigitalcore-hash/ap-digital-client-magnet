import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Share2, Users, ShieldCheck } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Coaching Client Leads BC — Marketing | AP Digital';
const DESC = 'Coaching marketing with Meta Ads funnels & social media for BC life, business & fitness coaches. Month-to-month. No lock-in contracts.';
const CANONICAL = 'https://ap-digital.ca/coaching-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Instagram & TikTok growth strategy',
  'Short-form video planning — hooks, scripts & captions (Reels, TikToks)',
  'Facebook & Instagram ad campaigns for client acquisition',
  'Personal brand positioning & content pillars',
  'Lead capture funnel & landing page',
  'Email nurturing sequences for warm leads',
  'Weekly performance report on ad spend, leads & booked calls',
  'Community engagement & DM strategy',
];

const results = [
  { icon: Users, stat: 'Meta Ads', label: 'Facebook & Instagram lead campaigns' },
  { icon: Share2, stat: 'No Contract', label: 'Month-to-month, 30 days\' notice' },
  { icon: ShieldCheck, stat: '90-Day', label: 'Lead-volume target agreed before launch' },
];

const faqs = [
  {
    question: 'How do coaches get more clients in BC?',
    answer: 'The fastest path is running Instagram and Facebook ads promoting a lead magnet (free workshop, guide, or discovery call) to your ideal client avatar. AP Digital builds these funnels for coaches across BC — from ad creative to landing page to follow-up sequence.',
  },
  {
    question: 'What types of coaches do you work with?',
    answer: 'AP Digital works with life coaches, business coaches, executive coaches, fitness coaches, wellness coaches, career coaches, and consultants across British Columbia. If you sell a service that starts with a discovery call, our approach fits how you sell.',
  },
  {
    question: 'How much does coaching marketing cost in BC?',
    answer: 'Management is $759/month. Ad spend is separate and paid directly to Meta or Google, and we recommend at least $1,000/month so campaigns gather enough data to optimize, which makes about $1,759/month all in at the minimum. Social media management is a separate service at $849/month for 2 platforms.',
  },
  {
    question: 'Is there a contract for coaching marketing?',
    answer: 'No. AP Digital works month-to-month with all coaching clients. No lock-in, no cancellation fees. If we miss the lead target we agree on in 90 days, we keep working at no fee for a further 30 days.',
  },
  {
    question: 'Should coaches use Instagram or Facebook for marketing?',
    answer: 'Both. Instagram is where you build your personal brand through Reels, carousels, and Stories — it creates the know-like-trust factor coaching requires. Facebook is where you run lead generation ads and build community through groups. We manage both platforms and run paid campaigns across the Meta network.',
  },
  {
    question: 'How do I build a personal brand as a coach online?',
    answer: 'Start with a consistent posting schedule, typically three to five times a week, mixing teaching content, behind-the-scenes and personal stories. Use Instagram Reels for reach and carousels for saves. If you share client stories, get their permission and never present one person\'s result as typical. Our social media management service handles your content calendar, posting and community management on two platforms.',
  },
  {
    question: 'Can you help me fill my coaching program or group?',
    answer: 'Yes. We run launch campaigns for group programs, courses and masterminds: awareness ads in the weeks before, workshop or webinar registration ads, then retargeting to people who registered or engaged. How a launch performs depends on your offer, your audience and your price, so we judge each one on registrations and booked calls and adjust the next.',
  },
  {
    question: 'Can I advertise client results or income claims as a coach?',
    answer: 'Be very careful. Canada\'s Competition Act prohibits representations that are false or misleading in a material respect, and a claim about how well something performs has to be based on an adequate and proper test done before the claim is made. Income promises, "six-figure" framing and one client\'s transformation presented as typical are where coaches get into trouble. We do not write ads that promise earnings or outcomes; you are responsible for any claims in your marketing.',
  },
  {
    question: 'Can wellness or life coaches talk about mental health in ads?',
    answer: 'Not as something coaching treats. Coaches are not therapists, and ads that imply diagnosis, treatment or therapeutic outcomes create real problems with ad platforms and with clients who need clinical care. Describe what you actually do, such as accountability, structure and goal setting, and say clearly that coaching is not a substitute for medical or mental health care.',
  },
  {
    question: 'Should I use a webinar, a challenge or a discovery call funnel?',
    answer: 'It depends on what you sell. High-ticket 1:1 coaching usually suits a short application and a discovery call. Group programs often suit a webinar or workshop that teaches and then invites people to apply. Challenges suit lower-priced or community-led programs, but they take a lot of your time to run. We help you choose before building anything.',
  },
  {
    question: 'Do I need an audience before running ads?',
    answer: 'It helps a great deal. Ads amplify what already works: an offer people have bought, content that gets a response, a clear description of who you help. A coach with no proof of demand yet usually learns more from conversations and organic content first. If you already have a warm audience, ads aimed at the people who watch and engage with your content are typically the cheapest place to start.',
  },
  {
    question: 'How do I find a coaching marketing agency near me?',
    answer: 'AP Digital works with life coaches, business coaches, and consultants across BC. We run Meta Ads for lead generation and Google Ads for high-intent searches like "business coach near me." Month-to-month, no contracts.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Coaching Marketing', DESC, '/coaching-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Coaching Marketing', url: '/coaching-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/coaching-marketing'),
  ]
};

const CoachingMarketing = () => (
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
          Coaching Client Leads in BC
        </h1>

        {/* Short intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Coaching clients buy trust before they buy a program. We build the Meta Ads funnels, content plans and follow-up that put your expertise in front of the right people, and we measure our work against booked discovery calls.
        </p>

        <InlineCTA context="coaching business" />

        {/* 3-column why strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">High-ticket lead funnels</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">We build webinar and discovery-call funnels with application questions that screen enquiries before they reach your calendar.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Content that builds authority</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Short-form video plans, email sequences and social content that show how you think, so prospects know you before the first call.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">No contract, no risk</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Month-to-month with 30 days' notice. No lock-in contracts and no cancellation fees.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">What Sets Us Apart</h2>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Why Coaching Marketing Is a Trust Problem First</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Coaching is unregulated in Canada. Anyone can call themselves a life coach, business coach or executive coach, and credentials range from rigorous voluntary certifications, such as those from the International Coaching Federation, to none at all. Prospective clients know this. They arrive sceptical, they compare, and they take longer to decide than buyers of most services.
          </p>
          <p className="mb-4">
            That makes marketing for coaches different from marketing a plumber or a salon. Nobody urgently needs a coach this afternoon. The sale happens when someone has seen enough of how you think to believe you can help with their specific problem, and that usually takes several touches over weeks or months: a video, a post, a free workshop, an email, then a call.
          </p>
          <p>
            What builds that trust is specificity rather than hype. Say exactly who you work with and what you help them do. Show your process and your thinking in public. State your credentials accurately, without implying certifications you do not hold. Publish your price or a price range if you can. Every one of those does more for a sceptical prospect than a bigger promise.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Coaching Is Not Therapy: Claims to Keep Out of Your Ads</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Coaching ads attract claims that can cause real problems. Canada's Competition Act prohibits representations to the public that are false or misleading in a material respect, judged on the general impression they create, and a claim about how well a product or service performs must be based on an adequate and proper test carried out before the claim is made. A coach's marketing is no exception.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">What we will not write</h3>
          <p className="mb-4">
            We do not write ads that promise or imply earnings, such as six-figure practices or quitting your job in ninety days. We do not write ads that present one client's transformation as what everyone can expect. And we do not write ads that imply health, mental health or therapeutic outcomes. Coaches are not therapists. A wellness or life coach whose ads suggest they treat anxiety, depression or trauma is creating a problem with ad platforms and, more importantly, may attract people who need clinical care. Meta also applies health and wellness rules, such as restricting weight loss ads to people 18 and over, and those rules change often enough that we check them for every campaign.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">What works instead</h3>
          <p>
            Describe what you actually do: the structure, the sessions, the accountability, the kind of person you work best with. Invite people to a free workshop or a discovery call to find out whether it fits. If you use client stories, get permission, keep them factual and make clear that results vary. You are responsible for the claims in your marketing; we write copy designed to stay on the right side of them, but we are not lawyers.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Webinar, Challenge or Discovery Call: Choosing a Funnel</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Most coaching funnels are variations on three shapes. The right one depends on what you sell and how much of your own time you can put into it.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Discovery call</h3>
          <p className="mb-4">
            Ad, short landing page, application form, calendar booking, call. This suits high-ticket 1:1 coaching, where you need relatively few clients and want to talk to each one. The application questions matter: asking about the person's goal, timeline and readiness to invest typically reduces the number of bookings but raises their quality, which protects your calendar.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Webinar or workshop</h3>
          <p className="mb-4">
            Ad, registration page, reminder emails, a live or recorded session that teaches something useful, then an invitation to apply or join. This suits group programs, where you are enrolling many people at once. Registration is not attendance, so the reminders and the replay carry as much weight as the ads.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Challenge</h3>
          <p className="mb-4">
            A free multi-day challenge, usually run in a group, ending with an offer. Challenges build community and momentum and suit lower-priced or group programs, but they take a lot of the coach's time and energy to run well. They are rarely the right first funnel.
          </p>
          <p>
            A simpler fourth option, a free guide or checklist followed by an email sequence, suits courses and lower-priced offers, and it builds an email list you own. Email to that list needs consent under Canada's Anti-Spam Legislation, so the sign-up form should make clear what people are signing up for.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">1:1, Group Programs and Courses: Different Ad Economics</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            The same ad budget can make sense for one coaching business and none for another, because the arithmetic changes with what you sell.
          </p>
          <p className="mb-4">
            High-ticket 1:1 coaching needs few clients, so the question is whether ads can produce enough good discovery calls each month at a cost one new client covers. Group programs need many people at once, so spend usually concentrates in launch windows rather than running flat all year. Low-priced courses need volume, and they are the hardest to make pay with cold ads; they typically work better sold to an existing audience or email list, or as a step toward a higher-priced program.
          </p>
          <p>
            Work it out with your own numbers before spending. Take your program price, the share of discovery calls that typically become clients for you, and what each booked call costs, and see what one client costs to win. Our weekly report gives you the cost per booked call, so after a few weeks that calculation uses real figures rather than guesses.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Organic Content vs. Paid Ads: Where Coaching Clients Come From</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            For most coaches, the first clients come from referrals, their network and organic content, not ads. That is not a failure of advertising; it is how trust-based services work. Paid ads are best at amplifying something that already works: an offer people have bought, a message that gets replies, a video that resonates.
          </p>
          <p className="mb-4">
            The practical approach is to let organic content find the message and let ads scale it. A Reel that got unusual saves and comments is a strong candidate for an ad. People who watched most of your videos, engaged with your Instagram or visited your site are typically the cheapest and warmest audience you can advertise to, far warmer than strangers.
          </p>
          <p>
            Consistent organic posting is a job in itself. If you want help with it, our <Link to="/services/social-media" className="text-foreground underline underline-offset-4">social media management</Link> service covers two platforms, usually Instagram and Facebook, and is quoted separately from ads. For how email and social compare as follow-up channels, see <Link to="/blog/email-marketing-vs-social-media" className="text-foreground underline underline-offset-4">email marketing vs. social media</Link>.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Why Meta Usually Beats Google for Coaches</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Google Ads captures demand that already exists. Someone searching for a plumber needs one now. Relatively few people search for a life coach, because most do not yet think of coaching as the answer to their problem. Coaching demand is mostly created rather than captured: someone sees a video that names a problem they have been living with, and only then starts to consider help.
          </p>
          <p className="mb-4">
            That is why Meta Ads on Facebook and Instagram usually carry a coaching budget. They put your face, your voice and your thinking in front of people who match your ideal client, before they are searching. Google still has a place for coaches with clear search demand, such as an executive coach or career coach in Vancouver, or business coach near me, and we run search campaigns where that demand exists.
          </p>
          <p>
            For a broader comparison of the two platforms, see <Link to="/blog/best-ads-platform-for-small-business-canada" className="text-foreground underline underline-offset-4">the best ad platform for small businesses in Canada</Link>.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Your Personal Brand Is the Product</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            In most businesses, ad creative can be handed to an agency. In coaching it cannot be handed over entirely, because people are buying you. The best-performing creative is usually the coach on camera, speaking directly about a problem their audience recognises, and nobody else can record that.
          </p>
          <p className="mb-4">
            Here is how we split the work. We research the audience, plan the angles and hooks, write outlines or scripts in your voice, set up the campaigns, test the variations and tell you which messages land. You record: typically a batch of short videos in one session every few weeks, filmed on a phone in good light. Polished studio production is rarely necessary and sometimes works against you, because it reads as an ad rather than a person.
          </p>
          <p>
            Fitness coaches overlap with gyms and studios in how they market; if that is you, our <Link to="/fitness-marketing" className="text-foreground underline underline-offset-4">fitness marketing</Link> page covers the local side.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Selling in BC vs. Selling Internationally</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Some coaches serve clients in person in Metro Vancouver. Many coach online and could sell anywhere. The choice changes the campaigns.
          </p>
          <p className="mb-4">
            A local or BC audience is smaller and easier to build familiarity with; in-person workshops and events become possible, and Google search for local terms adds a channel. An international audience is larger, but you compete with coaches everywhere, ad costs typically vary a lot by country, and practical details matter: time zones for live sessions, whether you price in Canadian or US dollars, and whether your examples make sense to someone outside Canada.
          </p>
          <p>
            We usually recommend proving the offer with a defined audience first, often Canada, then widening once you know what converts.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What It Costs and What to Expect</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Ads management is $759/month, month-to-month with 30 days' notice. Ad spend is paid directly to Meta or Google on your own account; we recommend at least $1,000/month, which makes about $1,759/month all in at the minimum. Social media management is a separate service at $849/month for two platforms. See full <Link to="/pricing" className="text-foreground underline underline-offset-4">pricing</Link>.
          </p>
          <p>
            Most clients see their first qualified leads within 2 weeks of launch. At kickoff we agree a lead-volume target for our own work, and if we miss it by month 3 we keep working at no fee for a further 30 days. That is a commitment about our service, not a promise about your income or your clients' results. Your Google Ads account stays in your name, and ad spend is billed to you directly by Google or Meta.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help coaches across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>.</p>
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

export default CoachingMarketing;
