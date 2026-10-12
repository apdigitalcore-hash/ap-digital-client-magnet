import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Scale, Phone } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Law Firm Marketing Vancouver — Case Leads | AP Digital';
const DESC = 'Google & Meta Ads for Vancouver law firms — family, injury, immigration and real estate practices. Month-to-month, no lock-in contracts.';
const CANONICAL = 'https://ap-digital.ca/law-firm-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Search Ads for "lawyer near me" and practice-area terms',
  'Practice-area landing pages (family, injury, immigration, real estate)',
  'Google Business Profile optimization and review generation',
  'Call tracking so you know which consultations came from which keyword',
  'Meta Ads for awareness, used only where platform policy and your practice area allow',
  'Consultation booking forms wired to your intake process',
  'Competitor ad monitoring across Metro Vancouver firms',
  'Weekly reporting on cost per booked consultation, not just clicks',
];

const results = [
  { icon: TrendingUp, stat: 'Google Ads', label: 'Search campaigns for people looking for legal help' },
  { icon: Phone, stat: 'No Contract', label: 'Month-to-month, 30 days\' notice' },
  { icon: Scale, stat: '90-Day', label: 'Lead-volume target agreed before launch' },
];

const faqs = [
  {
    question: 'How do law firms in Vancouver get more clients online?',
    answer: 'Most people looking for a lawyer start on Google. Someone typing "family lawyer Vancouver" or "immigration lawyer near me" usually has a specific matter in mind. We run Google Search Ads for each practice area into a matching landing page, keep your Google Business Profile complete, and set up intake tracking so you can see which searches produce booked consultations.',
  },
  {
    question: 'How much does law firm marketing cost in BC?',
    answer: 'Management is $759/month, month-to-month. Ad spend is separate and paid directly to Google or Meta; we recommend at least $1,000/month, which makes about $1,759/month all in at the minimum. Legal clicks typically cost more than most local services, so many practice areas need more than the minimum to gather useful data. We size the budget on a call from your practice area and the geography you serve.',
  },
  {
    question: 'Which practice areas work best with paid ads?',
    answer: 'Search ads suit practice areas where people look for a lawyer when a specific matter arises: family law, immigration, criminal defence, real estate conveyancing and personal injury. Personal injury has changed for motor vehicle claims, since ICBC\'s Enhanced Care model removed the right to sue in most crashes from May 1, 2021. Corporate and commercial work usually comes through referral and reputation rather than search ads.',
  },
  {
    question: 'Do you follow Law Society advertising rules?',
    answer: 'We write to them, but compliance is yours. Rule 4.2-5 of the Law Society of BC\'s Code of Professional Conduct prohibits marketing that is false, inaccurate, unverifiable, reasonably capable of misleading, or contrary to the public interest. The ads and pages we write avoid outcome promises, superlatives, result testimonials and anything we cannot verify. The lawyer is responsible for compliance with Law Society rules, so your firm reviews and approves every ad and page before it runs.',
  },
  {
    question: 'How fast will my firm see case inquiries?',
    answer: 'Most clients see their first qualified leads within 2 weeks of launch. Legal clicks typically cost more than most local services, so the first weeks are mostly about cutting wasted spend, tightening negative keywords and checking that intake is answering every enquiry.',
  },
  {
    question: 'Can you help my firm rank in Google Maps?',
    answer: 'We optimize your Google Business Profile: practice areas, office photos, hours, languages spoken and accurate contact details, which is what Google uses to decide whether to show your firm in the map results for searches like "lawyer near me". How you ask for and use client reviews should be checked against Law Society guidance before you start.',
  },
  {
    question: 'Do you work with solo practitioners?',
    answer: 'Yes. Solo and two-lawyer firms are a good fit as long as someone can answer enquiries quickly. People looking for a lawyer typically contact more than one firm, so an unanswered call or a form left until tomorrow is often an enquiry lost.',
  },
  {
    question: 'Can a law firm use Google Ads remarketing?',
    answer: 'It depends on the practice area. Google\'s personalized advertising policy treats some topics, including relationship hardships such as family breakdown, as sensitive, and ads in sensitive categories cannot use advertiser-curated audiences such as remarketing lists. A family law campaign on Google typically has to run without remarketing. We check each campaign against the current policy before launch.',
  },
  {
    question: 'Who is responsible for Law Society compliance in our ads?',
    answer: 'The lawyer. We write copy designed to stay within Rule 4.2-5 of the Law Society of BC\'s Code of Professional Conduct, but we are not lawyers and do not give ethics advice. Every ad, landing page and profile update should be reviewed by a lawyer at your firm before it runs, and the Law Society\'s own guidance is the authority if anything is unclear.',
  },
  {
    question: 'Can we use client reviews or testimonials in our ads?',
    answer: 'Be careful. A 2025 Law Society of BC ethics advisory says the factual statements in a testimonial must be true and verifiable, and that a former client\'s sincere belief is not enough. Vague praise and descriptions of results are where firms get into trouble. We do not write testimonial-led ads or ads that describe case results; if you want to use reviews in marketing, check the Law Society\'s guidance first.',
  },
  {
    question: 'Is personal injury advertising still worth it in BC after ICBC\'s changes?',
    answer: 'It depends on the firm. ICBC says that for crashes on or after May 1, 2021, suing for compensation is not possible except in limited circumstances, though a lawyer can still advise on the claims process. Firms with injury work outside motor vehicle claims, or with older claims still active, face a different search market from before 2021. We look at what your firm actually handles before recommending any budget.',
  },
  {
    question: 'Do we own the Google Ads account and Google Business Profile?',
    answer: 'Yes. Your Google Ads account and Google Business Profile stay in your firm\'s name, and ad spend is billed to you directly by Google or Meta. If you leave, with 30 days\' notice, you keep the accounts and their history.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No. AP Digital works month-to-month with every client, with 30 days\' notice and no cancellation fee. We agree a lead-volume target for our own work at kickoff, and if we miss it by month 3 we keep working at no fee for a further 30 days. That is a commitment about our service, not a promise about your matters or your clients.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Law Firm Marketing', DESC, '/law-firm-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Law Firm Marketing', url: '/law-firm-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/law-firm-marketing'),
  ]
};

const LawFirmMarketing = () => (
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
          Law Firm Case Leads in Vancouver
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          People don't browse for a lawyer. They search once, call two or three firms, and hire the one that answers. We put your firm in front of those searches across Metro Vancouver — and track it all the way to signed files.
        </p>

        <InlineCTA context="firm" />

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Urgent, high-intent search</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">"Family lawyer Vancouver," "immigration lawyer near me," "real estate lawyer Burnaby" — people searching with a specific matter in mind.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Economics differ by practice</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">What a new client is worth varies enormously by practice area and fee model. We build budgets and bids around your firm's own numbers, not a generic cost per lead.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Compliance-aware copy</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">Ads and pages written to stay within Law Society of BC marketing rules: no outcome promises, no superlatives, no result testimonials. You approve everything.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Why Search Wins for Vancouver Law Firms</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Legal hiring is event-driven. A separation, a car accident, a visa refusal, a closing date — something happens, and the search starts the same day. That usually makes Google Search the most reliable channel for a BC firm: you pay to appear when someone is looking, in the areas you practise in.
          </p>
          <p className="mb-4">
            The catch is cost. Legal clicks typically cost more than most local services, so loose campaigns burn budget fast. We control that with tight practice-area segmentation, thorough negative keyword lists, and call tracking that shows which keywords produce booked consultations.
          </p>
          <p>
            Around that, a complete Google Business Profile supports your place in the map results. Retargeting people who read your page but did not call is restricted for some practice areas, which is covered below.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Intent and Economics by Practice Area</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Law firm marketing is really four or five different businesses sharing a name. The way people search, how long they take to decide and what a new client is worth to the firm differ sharply between practice areas, so a campaign built for one usually fails for another.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Family law</h3>
          <p className="mb-4">
            Family law searches mix urgent needs with weeks of research into separation, parenting time, support and property, often during one of the hardest periods of someone's life. Ad copy has to inform rather than press on distress, landing pages should explain the process and the consultation clearly, and Google's policy on relationship hardships typically rules out remarketing to past visitors. Fees are usually hourly or retainer-based, so value depends heavily on the matter.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Personal injury after Enhanced Care</h3>
          <p className="mb-4">
            Personal injury marketing in BC changed in 2021. ICBC says that for crashes on or after May 1, 2021, suing for compensation is not possible except in limited circumstances, though a lawyer can still advise on the claims process. Search demand for car-crash injury lawyers no longer means what it did before 2021, while injury work outside motor vehicle claims continues. Personal injury files are commonly taken on contingency, so each matter's value is uncertain until it resolves, and established firms contest what remains.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Immigration</h3>
          <p className="mb-4">
            Immigration searches are often deadline-driven and frequently happen in languages other than English, which matters in a region as multilingual as Metro Vancouver. If your firm serves clients in Punjabi, Mandarin, Hindi or Tagalog, ads and landing pages in those languages, written and reviewed by fluent staff, can reach people an English-only campaign misses. Regulated immigration consultants advertise for many of the same searches, so the ad should say plainly what a lawyer offers. Targeting must never be based on someone's inferred status or circumstances.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Real estate law and conveyancing</h3>
          <p className="mb-4">
            Conveyancing is higher volume and more price-sensitive than the other three, and in BC notaries public compete for much of the same work. Searches like real estate lawyer Vancouver or conveyancing fees often come from people comparing quotes, so a clear fee structure on the landing page, where you can state one accurately, does more than anything else. Much of this work also comes through realtor referrals, which is a reason to understand how agents market themselves; see our <Link to="/real-estate-marketing" className="text-foreground underline underline-offset-4">real estate marketing</Link> page.
          </p>
          <p>
            Corporate, commercial and estate planning work rarely suits search ads in the same way. It is mostly won through referrals and reputation, and an honest agency should say so before taking your budget.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Writing Ads That Stay Within Law Society Rules</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Lawyer marketing in BC is governed by Chapter 4 of the Law Society of BC's Code of Professional Conduct. Rule 4.2-5 prohibits marketing that is false, inaccurate, unverifiable, reasonably capable of misleading, or contrary to the public interest, and the commentary treats marketing that takes advantage of a person's physical or emotional vulnerability as a breach. A firm that follows careless marketing advice has a regulatory problem, not just a marketing one.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">What we will not write</h3>
          <p className="mb-4">
            We do not write ads that promise or imply outcomes, such as winning a case or getting the settlement someone deserves. We do not use superlatives like best, top or number one, which cannot be verified. We do not write copy that speaks to the reader's distress or assumes their situation, such as asking whether they are going through a divorce, and we do not build audiences around people's inferred legal troubles. We do not describe a lawyer as a specialist or certified unless the lawyer confirms they are entitled to under Law Society rules. And we do not write testimonial-led ads or ads that describe case results.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">What compliant ads look like</h3>
          <p className="mb-4">
            Compliant legal ads are plain and factual. They name the practice area, the location and the next step: family law consultations in Vancouver covering separation, parenting and support. They state verifiable facts: languages spoken, years in practice, office hours, whether evening appointments are available, and a fee structure where one exists and is accurate. They describe what happens at a consultation rather than what happens at the end of a case.
          </p>
          <p>
            The lawyer is responsible for compliance with Law Society rules, so a lawyer at your firm should review every ad, landing page and profile update before it runs. We build that approval step into every campaign. We are not lawyers and do not give ethics advice; if a line is unclear, the Law Society's guidance is the authority.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What the Ad Platforms Allow</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Both major ad platforms also limit how legal services can be targeted and worded, and the limits change, so we check each campaign against current policy before launch.
          </p>
          <p className="mb-4">
            Google's personalized advertising policy treats some topics as sensitive, including relationship hardships such as family breakdown. Ads in sensitive categories cannot use advertiser-curated audiences, which includes remarketing lists and uploaded customer lists. In practice, a family law campaign on Google typically runs on search intent alone, without following past visitors around the web. Standard conversion tracking still works, so you can see which searches produce consultations.
          </p>
          <p>
            Meta's advertising policies bar ad copy that asserts or implies personal attributes of the person seeing it, such as their health, vulnerable financial status or criminal record. That rules out the most common bad legal ad on Facebook: a headline that speaks to the reader as if the platform knows what they are going through. Meta can still work for awareness, such as a general explainer about the family law process or a notice that your firm offers consultations in a particular language, but for most practice areas Google search carries the budget.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Intake: Where Legal Marketing Is Won or Lost</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            The ads produce enquiries. Intake decides what happens to them, and in legal services it is usually where most of the value leaks.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Answer quickly</h3>
          <p className="mb-4">
            People looking for a lawyer typically contact more than one firm. Voicemail during business hours, forms left until tomorrow and no evening cover all lose enquiries the ads have already paid for, so before launch we look at who answers and when.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Keep the first form short</h3>
          <p className="mb-4">
            A first-contact form should collect what intake needs to respond: name, contact details, practice area, and a brief, non-detailed description of the matter. Many firms prefer not to receive detailed confidential facts through a web form before a conflict check, so the form should say what not to include. Your firm decides what it collects.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Track to the consultation, and beyond if you can</h3>
          <p className="mb-4">
            We track calls and forms through to booked consultations and report cost per consultation by practice area every week. If your firm is willing to share which consultations became retained clients, without any confidential detail, those outcomes can be fed back into Google Ads so bidding favours the searches that produce real matters, where Google's customer data policies allow it. Those policies restrict some sensitive categories, including divorce and separation, so for family law this step may not be available. For keeping enquiries organised, see our guide to the <Link to="/blog/best-crm-small-business-canada" className="text-foreground underline underline-offset-4">best CRM for small businesses in Canada</Link>.
          </p>
          <p>
            Your Google Ads account and Google Business Profile stay in your firm's name, so the data and history stay with you.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What It Costs and What to Expect</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Management is $759/month, month-to-month with 30 days' notice. Ad spend is paid directly to Google or Meta on your own account; we recommend at least $1,000/month, which makes about $1,759/month all in at the minimum. Competitive practice areas usually need more than the minimum, and we will tell you on a call if yours does. See full <Link to="/pricing" className="text-foreground underline underline-offset-4">pricing</Link>, and for how clicks are priced, our guide to <Link to="/blog/how-much-do-google-ads-cost-vancouver" className="text-foreground underline underline-offset-4">Google Ads costs in Vancouver</Link>.
          </p>
          <p>
            Most clients see their first qualified leads within 2 weeks of launch. At kickoff we agree a lead-volume target for our own work, and if we miss it by month 3 we keep working at no fee for a further 30 days. That is a commitment about our service. Nobody can promise you matters, clients or outcomes, and any agency that does is asking you to repeat that promise in your own ads.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We work with law firms across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>.</p>
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

export default LawFirmMarketing;
