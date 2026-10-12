import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, Calendar, Users } from 'lucide-react';
import OurServices from '@/components/OurServices';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import FaqLight from '@/components/light/FaqLight';
import PastelCTA from '@/components/light/PastelCTA';
import InlineCTA from '@/components/light/InlineCTA';

const TITLE = 'Dental Marketing Vancouver — Patient Leads | AP Digital';
const DESC = 'Google Ads & Meta Ads for Vancouver dental clinics — new patient campaigns from $759/month. Month-to-month, no contracts.';
const CANONICAL = 'https://ap-digital.ca/dental-marketing';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const included = [
  'Google Ads targeting "dentist near me" & high-intent searches',
  'Meta Ads campaigns for cosmetic & family dentistry',
  'Google Business Profile optimization: hours, services, insurance & languages',
  'Landing pages built for patient conversions',
  'Call tracking to measure booked appointments',
  'Weekly performance reporting & optimization',
  'Retargeting only where Google and Meta health policies allow it',
  'Competitor ad analysis & positioning',
];

const results = [
  { icon: TrendingUp, stat: 'Google + Meta', label: 'Search and social campaigns for new-patient enquiries' },
  { icon: Calendar, stat: 'No Contract', label: 'Month-to-month, 30 days\' notice' },
  { icon: Users, stat: '90-Day', label: 'Lead-volume target agreed before launch' },
];

const faqs = [
  {
    question: 'How do I get more dental patients in Vancouver?',
    answer: 'Google Ads is the fastest channel — people searching "dentist near me" or "emergency dentist Vancouver" are ready to book. AP Digital runs geo-targeted Google and Meta campaigns that put your clinic in front of patients within 10–15 km. How many enquiries that produces depends on your budget, the treatments you promote and how competitive your area is; implant and clear aligner searches typically cost far more per click than a general check-up.',
  },
  {
    question: 'How much does dental marketing cost?',
    answer: 'Most dental clinics start with $1,000–$2,000/month in ad spend, paid directly to Google or Meta, plus a $759/month management fee, so about $1,759/month all in at the minimum. Management covers Google Ads, Meta Ads, landing pages, call tracking and weekly optimization. No setup fees, no contracts.',
  },
  {
    question: 'How fast will I see new patients from ads?',
    answer: 'Most clients see their first qualified leads within 2 weeks of launch, and Meta Ads typically take 2 to 3 weeks to optimize. How many new-patient enquiries follow depends on your area, budget, the services you promote and whether the phone is answered, so we report the numbers weekly rather than promise them.',
  },
  {
    question: 'Which services should I advertise as a dentist?',
    answer: 'Start with what your clinic has capacity for and wants more of: emergency and same-day appointments, new-patient exams for family dentistry, or specific treatments such as implants or clear aligners. Each needs its own campaign and landing page. We help you prioritize based on your chair time, your team and your margins, and every ad stays within BCCOHP standards.',
  },
  {
    question: 'Do you work with dental clinics outside Vancouver?',
    answer: 'Yes. We work with dental clinics across Metro Vancouver including Surrey, Burnaby, Richmond, Langley, Coquitlam, and Abbotsford. Our geo-targeting ensures your ads reach patients in your specific catchment area.',
  },
  {
    question: 'Is there a contract for dental marketing?',
    answer: 'No. AP Digital works month-to-month with all dental clients. No lock-in contracts, no cancellation fees. We agree a lead-volume target at kickoff, and if we miss it by month 3 we keep working at no fee for a further 30 days. Ad spend is paid to Google or Meta either way.',
  },
  {
    question: 'Can you help my dental clinic rank on Google Maps?',
    answer: 'We optimize your Google Business Profile: accurate categories, services, hours including emergency availability, insurance and direct billing details, languages spoken and photos of the clinic. That is what Google uses alongside distance and reviews to decide which clinics appear in the map results for searches like "dentist near me". Confirm with BCCOHP how you ask patients for reviews, and keep anything you publish accurate and unedited.',
  },
  {
    question: 'Can my clinic ask patients for Google reviews?',
    answer: 'Most likely yes, but confirm with BCCOHP before you build a programme around it. The pre-2022 College rules were described as restricting testimonials and reviews; the current Standards for the Oral Health Team (1 April 2026) contain no such restriction. The only marketing rule is standard 6.2, which requires marketing and advertisements to be accurate and not mislead the public, and the April 2026 Bylaws add no advertising section. Patients can leave reviews on Google on their own. If you reply to one, never confirm that the reviewer is a patient or mention their treatment. We will run a review programme once you have confirmed your approach with BCCOHP.',
  },
  {
    question: 'Can we advertise prices or new-patient specials?',
    answer: 'Check BCCOHP rules first. College guidance indicates some discounts are permitted as long as the advertising is not misleading, but it also warns that promotions tied to a particular treatment can compromise individualized care. We do not write price, coupon or discount ads for a dental clinic until you have confirmed the offer complies.',
  },
  {
    question: 'Can we retarget website visitors or upload our patient list to Google or Meta?',
    answer: 'Never upload a patient list. Patient names and contact details are health information, and putting them into an ad platform creates a privacy problem. Retargeting is limited too: Google treats cosmetic and surgical procedures as sensitive health content, and ads in sensitive categories cannot use advertiser-curated audiences such as remarketing lists. We check each campaign against current policy before launch.',
  },
  {
    question: 'Who is responsible for BCCOHP compliance in our ads?',
    answer: 'The dentist. BCCOHP\'s Standards for the Oral Health Team require registrants to ensure their marketing and advertisements are accurate and do not mislead the public, and to comply with advertising, competition and privacy law. We write copy designed to meet that standard, but a dentist at your clinic should review every ad and page before it runs.',
  },
  {
    question: 'Do we own the Google Ads account and Google Business Profile?',
    answer: 'Yes. Your Google Ads account and Google Business Profile stay in your clinic\'s name, and ad spend is billed to you directly by Google or Meta. If you leave, with 30 days\' notice, you keep the accounts and their history.',
  },
  {
    question: 'What makes dental marketing different from other industries?',
    answer: 'Three things. Dentistry is regulated, so ad copy has to meet BCCOHP standards. Dental treatments can fall into Google\'s and Meta\'s sensitive health categories, which limits targeting and remarketing. And a new patient can stay with a clinic for years through hygiene recall, so what you can afford to spend to win one depends on your own retention and treatment mix, which we work out with you rather than assume.',
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    founderSchema,
    getServiceSchema('Dental Marketing', DESC, '/dental-marketing'),
    getFAQSchema(faqs),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Dental Marketing', url: '/dental-marketing' },
    ]),
    getWebPageSchema(TITLE, DESC, '/dental-marketing'),
  ]
};

const DentalMarketing = () => (
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
          Dental Patient Leads in Metro Vancouver
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          We run Google Ads and Meta campaigns that put your clinic in front of people searching for a dentist in your area, and we track every enquiry through to a booked appointment.
        </p>

        <InlineCTA context="clinic" />

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">High-intent patients</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">We target people Googling "dentist near me," "dental implants," and "emergency dentist" — people searching with a specific need in mind.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">Built around your numbers</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">What a new patient is worth depends on your treatment mix and how long patients stay. We size budgets from your clinic's own figures, not an industry average.</p>
          </div>
          <div className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl transition-all duration-300 p-6">
              <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
            <p className="reveal-ink relative z-10 font-semibold text-foreground mb-1">90-day guarantee</p>
            <p className="reveal-body relative z-10 text-sm text-muted-foreground">No contracts, no lock-in. If we miss the lead target we agree on in 90 days, we keep working at no fee for a further 30 days.</p>
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

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Why Google Ads Works for Dentists</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Unlike salons or coaches, people looking for a dentist usually start with a Google search. They are not scrolling Instagram for one; they type "dentist near me" or "emergency dentist Burnaby" when they need one.
          </p>
          <p className="mb-4">
            That is why Google Ads usually leads a dental budget: you pay to appear when someone is looking. A complete Google Business Profile supports your place in the map results below the ads, so the two work together.
          </p>
          <p>
            Meta Ads can add awareness for elective services such as whitening or clear aligners, but platform health policies and BCCOHP standards both limit what those ads can say and show, so they play a supporting role.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Emergency and Same-Day Demand vs. Elective Cosmetic Work</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Dental marketing covers two very different kinds of search, and they behave so differently that they need separate campaigns, separate landing pages and separate budgets.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Emergency and same-day</h3>
          <p className="mb-4">
            Searches like emergency dentist, toothache dentist open now or same-day dentist come from someone in pain who wants an appointment today. They typically call one of the first clinics they see, from an ad or the map results, and move on if nobody answers. What matters is being visible at that moment, accurate hours on your Google profile, a landing page that says plainly whether you see emergencies today, and a phone that gets picked up. These campaigns only make sense if you genuinely keep same-day capacity.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">Elective and cosmetic</h3>
          <p className="mb-4">
            Searches for implants, clear aligners, veneers or whitening come from people weighing a planned and often expensive decision. They typically research for weeks, compare clinics, look for financing and insurance information, and book a consultation before committing. Clicks on these terms typically cost far more than general searches. What helps here is a clear, factual page for each service: what the consultation involves, how treatment works, how insurance and financing apply, and who on your team provides it.
          </p>
          <p>
            Judge emergency campaigns on booked same-day visits and cosmetic campaigns on booked consultations; blended together, the cheap emergency calls hide how the expensive cosmetic spend is doing.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">New-Patient Acquisition vs. Hygiene Recall</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Advertising is for finding new patients. Keeping them is a different job, and most of a clinic's long-term value typically comes from patients who return for hygiene appointments year after year.
          </p>
          <p className="mb-4">
            That distinction matters for the budget. Ad spend should be judged on new patients booked, and recall should be handled by your practice management system and front desk, through the reminders your existing patients have agreed to receive. Recall never needs an ad platform, and your patient list should never be uploaded to one: patient names and contact details are health information.
          </p>
          <p>
            It also shapes what you can afford to pay for a new patient. A clinic where most new patients stay for years can justify a higher cost per booked first visit than one where many come once. We work that out with your own figures, such as how many new patients return for a second hygiene visit, rather than borrowing an industry average.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">The Map Pack and Google Business Profile for a Clinic</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            For searches like dentist near me, Google shows a map with three clinics, often above the ordinary results. A clinic has an advantage over mobile businesses here: a fixed address that Google can rank around. Proximity to the searcher typically weighs heavily, so a clinic in Burnaby will rarely appear for a search made in Surrey however complete its profile is. Within the area you can realistically win, the profile decides who shows first.
          </p>
          <p className="mb-4">
            We keep the profile accurate and complete: the right primary category, each service listed, hours that include whether you take emergencies, accessibility details, languages spoken by your team, insurance and direct billing information, and current photos of the clinic and team. Every detail must be true, because the profile is advertising too.
          </p>
          <p>
            Reviews are where dentists need to be careful. Patients can leave Google reviews on their own, and those reviews affect how a clinic appears. The pre-2022 College rules were described as restricting testimonials and review links; the current Standards contain no such rule, leaving standard 6.2 — accurate and not misleading — as the test. A review that is real and unedited meets that. Confirm with BCCOHP before building a programme around reviews, and never edit or cherry-pick them in a way that misleads. If you reply to a review, never confirm the reviewer is a patient or discuss their care in public.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Insurance and Direct Billing as Search Drivers</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Many people choose a dentist partly on how they will pay. Searches that include direct billing, a specific insurer or the federal Canadian Dental Care Plan come from people who have already decided cost and paperwork matter, and they are often ready to book once they find a clinic that fits.
          </p>
          <p className="mb-4">
            If your clinic offers direct billing to insurers, say so on your Google profile, your landing pages and in the ads themselves. If your clinic participates in the Canadian Dental Care Plan, a dedicated page explaining how it works at your clinic gives those searchers a clear answer. If you do not participate, do not imply that you do.
          </p>
          <p>
            Coverage depends on each patient's plan, so the copy should explain what you do, such as submitting claims directly, not what any patient will pay.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What Compliant Dental Ad Copy Looks Like</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Dentists in BC are regulated by the BC College of Oral Health Professionals. Its Standards for the Oral Health Team require registrants to ensure their marketing and advertisements are accurate and do not mislead the public, and to comply with federal, provincial and municipal law, including advertising, competition and privacy legislation. A clinic that follows careless marketing advice has a regulatory problem, not just a marketing one.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">What we will not write</h3>
          <p className="mb-4">
            We do not write superlatives such as best dentist in Vancouver or state of the art, which cannot be verified. We do not promise outcomes, such as a perfect smile or painless treatment. We do not describe a dentist as a specialist or imply specialist status unless the dentist confirms they are entitled to that title under BCCOHP rules. And we do not write price, coupon or discount ads, testimonial ads or before-and-after ads until you have confirmed with BCCOHP that what you want to run is permitted.
          </p>
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">What compliant ads look like</h3>
          <p className="mb-4">
            Compliant dental ads are plain and factual. They name the service, the location and the next step: new-patient exams in Burnaby, evening appointments available, direct billing to most insurers. They state verifiable facts about the clinic, such as hours, languages spoken, accessibility and parking, and they describe what happens at an appointment rather than what the result will be.
          </p>
          <p>
            The dentist is responsible for compliance with BCCOHP standards, so a dentist at your clinic should review every ad, landing page and profile update before it runs. We build that approval step into every campaign. We are not regulators or lawyers; if anything is unclear, BCCOHP is the authority.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What the Ad Platforms and Privacy Law Allow</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Google's personalized advertising policy treats health as a sensitive category, including invasive procedures such as cosmetic or surgical work. Ads in sensitive categories cannot use advertiser-curated audiences, which includes remarketing lists and uploaded customer lists, so some dental campaigns, particularly for cosmetic or surgical treatment, typically run on search intent alone.
          </p>
          <p className="mb-4">
            Meta's advertising policies bar ad copy that asserts or implies personal attributes of the person seeing it, including their physical health. A headline that speaks to the reader's own teeth or dental problems as if the platform knows about them is out. General, factual copy about the service is fine.
          </p>
          <p>
            Underneath both is privacy law. Never target people by an inferred health condition or treatment need, and never upload patient lists to an ad platform. Your clinic's patient data belongs in your practice management system, not in Google or Meta.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">Intake: Does the Phone Get Answered?</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            The ads produce enquiries; the front desk decides what happens to them. People looking for a dentist typically contact more than one clinic, and an emergency caller who reaches voicemail will usually try the next clinic on the list.
          </p>
          <p className="mb-4">
            Before launch we look at who answers calls, what happens at lunch and after hours, and whether new patients can book online. Call tracking shows how many calls the ads produce and how many were answered, often the most useful number a clinic sees in its first month.
          </p>
          <p>
            We track calls and booking requests through to booked appointments and report the cost per booked new-patient appointment weekly. For keeping enquiries organised, see our guide to the <Link to="/blog/best-crm-small-business-canada" className="text-foreground underline underline-offset-4">best CRM for small businesses in Canada</Link>.
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">What It Costs and What to Expect</h2>
        <div className="prose prose-lg text-muted-foreground mb-16 max-w-none">
          <p className="mb-4">
            Management is $759/month, month-to-month with 30 days' notice. Ad spend is paid directly to Google or Meta on your own account; we recommend at least $1,000/month, which makes about $1,759/month all in at the minimum. Cosmetic and implant campaigns typically need more than the minimum because those clicks cost more. See full <Link to="/pricing" className="text-foreground underline underline-offset-4">pricing</Link>, and for how clicks are priced, our guide to <Link to="/blog/how-much-do-google-ads-cost-vancouver" className="text-foreground underline underline-offset-4">Google Ads costs in Vancouver</Link>.
          </p>
          <p>
            Most clients see their first qualified leads within 2 weeks of launch. At kickoff we agree a lead-volume target for our own work, and if we miss it by month 3 we keep working at no fee for a further 30 days. That is a commitment about our service, not a promise of patient numbers.
          </p>
        </div>

        <FaqLight faqs={faqs} />

        <OurServices />

        <div className="mt-16 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">Cities We Serve</h2>
          <p className="text-muted-foreground mb-6">We help dental clinics across Metro Vancouver and the Fraser Valley. See <Link to="/pricing" className="text-foreground underline underline-offset-4 hover:text-foreground/70">pricing</Link> or browse <Link to="/case-studies" className="text-foreground underline underline-offset-4 hover:text-foreground/70">how we work</Link>.</p>
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

export default DentalMarketing;
