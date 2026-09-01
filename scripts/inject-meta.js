import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const baseHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

const BASE_URL = 'https://ap-digital.ca';

// ── Shared schema fragments ─────────────────────────────────────────────────

const founderSchema = {
  "@type": "Person",
  "@id": `${BASE_URL}/#founder`,
  "name": "Arjun Sharma",
  "jobTitle": "Founder & Lead Strategist",
  "description": "Arjun Sharma is the founder of AP Digital, a performance marketing agency in Vancouver, BC. He personally manages every client account, specializing in Google Ads, Meta Ads, and social media marketing for service businesses across British Columbia.",
  "url": `${BASE_URL}/about`,
  "worksFor": { "@id": `${BASE_URL}/#organization` },
  "knowsAbout": ["Google Ads", "Meta Ads", "Facebook Advertising", "Instagram Marketing", "Social Media Marketing", "Lead Generation", "Performance Marketing", "Local SEO"],
  "sameAs": ["https://www.linkedin.com/company/theapdigital/", "https://www.instagram.com/theapdigital/"]
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": "AP DIGITAL",
  "description": "Vancouver performance marketing agency for trades, salons, real estate agents, coaches, dental clinics, gyms, and restaurants across BC.",
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": "en-CA"
};

const orgSchema = {
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${BASE_URL}/#organization`,
  "name": "AP DIGITAL",
  "alternateName": "AP Digital Marketing Agency",
  "description": "AP Digital is a performance marketing agency based in Vancouver, British Columbia, serving Metro Vancouver and the Fraser Valley. The agency runs Google Ads and Meta Ads campaigns and manages social media for local service businesses including trades and contractors, salons, real estate agents and coaches. Not affiliated with any similarly named agency operating outside British Columbia.",
  "url": BASE_URL,
  "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 200, "height": 200 },
  "image": `${BASE_URL}/og-image.png`,
  "telephone": "+1-778-682-5772",
  "email": "apdigital.core@gmail.com",
  "founder": { "@id": `${BASE_URL}/#founder` },
  "foundingDate": "2024",
  "address": { "@type": "PostalAddress", "addressLocality": "Vancouver", "addressRegion": "BC", "postalCode": "V5K", "addressCountry": "CA" },
  "geo": { "@type": "GeoCoordinates", "latitude": 49.2827, "longitude": -123.1207 },
  // Kept in step with serviceAreaCities in src/lib/structuredData.ts; the
  // assertion below fails the build if the two drift apart again.
  "areaServed": [
    { "@type": "City", "name": "Vancouver", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Surrey", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Burnaby", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Richmond", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Langley", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Coquitlam", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Abbotsford", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Mission", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Chilliwack", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Maple Ridge", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Port Coquitlam", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Port Moody", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "North Vancouver", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "New Westminster", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Delta", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "AdministrativeArea", "name": "Metro Vancouver", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "AdministrativeArea", "name": "Fraser Valley", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
  ],
  "sameAs": ["https://www.instagram.com/theapdigital/", "https://www.linkedin.com/company/theapdigital/", "https://maps.google.com/?cid=2620094312878162208"],
  "priceRange": "$$",
  "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" }
};

function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem", "position": i + 1, "name": item.name, "item": `${BASE_URL}${item.url}`
    }))
  };
}

function serviceSchema(name, desc, path) {
  return {
    "@type": "Service", "name": name, "description": desc,
    "url": `${BASE_URL}${path}`, "provider": { "@id": `${BASE_URL}/#organization` },
    "areaServed": { "@type": "AdministrativeArea", "name": "British Columbia" }
  };
}

function webPageSchema(name, desc, path) {
  return {
    "@type": "WebPage", "@id": `${BASE_URL}${path}#webpage`,
    "url": `${BASE_URL}${path}`, "name": name, "description": desc,
    "inLanguage": "en-CA", "isPartOf": { "@id": `${BASE_URL}/#website` },
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", "main p:first-of-type"] }
  };
}

function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question", "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };
}

function articleSchema(post) {
  return {
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blog/${post.slug}#article`,
    "headline": post.metaTitle,
    "name": post.metaTitle,
    "description": post.metaDescription,
    "datePublished": post.date,
    // Mirrors src/lib/structuredData.ts: a refreshed post should report
    // when it was refreshed, not when it was first published.
    "dateModified": post.dateModified || post.date,
    "inLanguage": "en-CA",
    "url": `${BASE_URL}/blog/${post.slug}`,
    "image": { "@type": "ImageObject", "url": `${BASE_URL}/og-image.png`, "width": 1200, "height": 630 },
    "articleSection": post.category,
    "author": { "@id": `${BASE_URL}/#founder` },
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "mainEntityOfPage": { "@id": `${BASE_URL}/blog/${post.slug}#webpage` },
    "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".prose-custom p:first-of-type"] }
  };
}

// ── Static route definitions ────────────────────────────────────────────────

const staticRoutes = [
  // ─── Industry pages ───
  {
    path: 'trades-marketing',
    title: 'Trades Marketing BC | Plumber, HVAC & Electrician Leads | AP Digital',
    description: 'AP Digital runs Google & Meta Ads for BC plumbers, electricians, HVAC companies & roofers. No contracts. Starts at $759/month.',
    body: '<h1>Trades &amp; Contractor Marketing — Get More Leads in BC</h1><p>AP Digital is a Vancouver-based performance marketing agency that helps trades businesses — plumbers, electricians, HVAC technicians, roofers, and general contractors — get more qualified leads through Google Ads and Meta Ads. Month-to-month. No contracts. 90-day results guarantee.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/plumber-marketing">Plumber Marketing</a></li><li><a href="/electrician-marketing">Electrician Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/best-ads-for-trades-businesses-canada">Best ads for trades</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Trades & Contractor Marketing', 'Lead generation for BC plumbers, electricians, HVAC, roofers & general contractors using Google Ads & Meta Ads.', '/trades-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Trades Marketing', url: '/trades-marketing' }]),
      webPageSchema('Trades Marketing BC | Plumber, HVAC & Electrician Leads | AP Digital', 'Lead generation for BC trades businesses.', '/trades-marketing'),
      faqSchema([
        { q: 'How much do Google Ads cost for contractors in BC?', a: 'Most trades businesses invest $500–$2,000/month in ad spend plus a management fee starting at $759/month. Cost per lead ranges from $15–$60 depending on the trade and location.' },
        { q: 'How fast will I get leads from Google Ads?', a: 'Most contractors see their first qualified leads within 1–2 weeks of campaign launch. Google Ads captures people actively searching for services like yours.' },
        { q: 'Should contractors use Google Ads or Facebook Ads?', a: 'Google Ads captures high-intent searches ("plumber near me"). Meta Ads builds awareness and generates leads from people who need your service but haven\'t searched yet. We recommend both for maximum coverage.' },
        { q: 'Do you require a contract?', a: 'No. AP Digital works month-to-month. No lock-in contracts, no cancellation fees. We also offer a 90-day performance guarantee.' },
        { q: 'What trades do you work with?', a: 'We serve plumbers, electricians, HVAC companies, roofers, general contractors, landscapers, painters, and other home service businesses across Metro Vancouver and the Fraser Valley.' }
      ])
    ]}
  },
  {
    path: 'salon-marketing',
    title: 'Salon Marketing Vancouver | Fill Your Chair Every Week | AP Digital',
    description: 'Get more salon clients with Meta Ads & Instagram content. AP Digital serves Vancouver salons. Month-to-month. No contracts.',
    body: '<h1>Salon Marketing — Fill Your Chair Every Week</h1><p>AP Digital helps hair salons, barbershops, and beauty studios in Vancouver get more new client inquiries with Meta Ads, Instagram content, and Google Ads. Month-to-month. No contracts. 90-day results guarantee.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/fitness-marketing">Fitness Marketing</a></li><li><a href="/dental-marketing">Dental Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/salon-marketing-vancouver-bc">Salon marketing guide</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Salon Marketing', 'Social media & paid ads for Vancouver salons. Get consistent bookings every week.', '/salon-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Salon Marketing', url: '/salon-marketing' }]),
      webPageSchema('Salon Marketing Vancouver | AP Digital', 'Meta Ads & social media for Vancouver salons.', '/salon-marketing'),
    ]}
  },
  {
    path: 'real-estate-marketing',
    title: 'Real Estate Marketing BC | Buyer & Seller Leads | AP Digital',
    description: 'Real estate marketing with Meta Ads & Google Ads for BC realtors. Serving Vancouver, Surrey & Burnaby. Month-to-month.',
    body: '<h1>Real Estate Marketing — Consistent Buyer &amp; Seller Leads</h1><p>AP Digital generates qualified buyer and seller leads for BC realtors using Meta Ads and Google Ads. Month-to-month. No lock-in contracts.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/property-management-marketing">Property Management Marketing</a></li><li><a href="/coaching-marketing">Coaching Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/real-estate-agent-marketing-vancouver-bc">Realtor marketing guide</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Real Estate Marketing', 'Lead generation for BC realtors using Meta Ads & Google Ads.', '/real-estate-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Real Estate Marketing', url: '/real-estate-marketing' }]),
      webPageSchema('Real Estate Marketing BC | AP Digital', 'Lead generation for BC realtors.', '/real-estate-marketing'),
    ]}
  },
  {
    path: 'property-management-marketing',
    title: 'Fill Rental Vacancies Faster | Property Management Marketing BC',
    description: 'Marketing for BC property managers: fill vacancies faster with Google & Meta Ads. Flat $759/month, month-to-month, no contracts.',
    body: '<h1>Property Management Marketing — Fill Vacancies Faster</h1><p>AP Digital runs Google Ads and Meta Ads for property managers across Metro Vancouver and the Fraser Valley, so units spend fewer days empty. A $1,800 unit loses roughly $60 for every vacant day. Flat $759/month management. Month-to-month. No lock-in contracts.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/real-estate-marketing">Real Estate Marketing</a></li><li><a href="/contractor-marketing">Contractor Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/property-management-marketing-cost">What it costs</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Property Management Marketing', 'Advertising that fills rental vacancies for BC property managers.', '/property-management-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Property Management Marketing', url: '/property-management-marketing' }]),
      webPageSchema('Property Management Marketing BC | AP Digital', 'Advertising that fills rental vacancies faster for BC property managers.', '/property-management-marketing'),
    ]}
  },
  {
    path: 'coaching-marketing',
    title: 'Coaching Marketing BC | Get Consistent Clients | AP Digital',
    description: 'AP Digital helps BC life, business & fitness coaches get more clients with Meta Ads funnels. Month-to-month. No lock-in contracts.',
    body: '<h1>Coaching Marketing — Get Consistent Clients in BC</h1><p>AP Digital helps life, business, and fitness coaches in BC get more qualified leads with Meta Ads funnels and social media campaigns. Month-to-month. No lock-in contracts.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/fitness-marketing">Fitness Marketing</a></li><li><a href="/law-firm-marketing">Law Firm Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/coaching-clients-bc">Getting coaching clients in BC</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Coaching Marketing', 'Meta Ads & social media for BC coaches.', '/coaching-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Coaching Marketing', url: '/coaching-marketing' }]),
      webPageSchema('Coaching Marketing BC | AP Digital', 'Lead generation for BC coaches.', '/coaching-marketing'),
    ]}
  },
  {
    path: 'dental-marketing',
    title: 'Dental Marketing Vancouver | Get More Patients | AP Digital',
    description: 'Get more dental patients with Google Ads & Meta Ads. AP Digital serves Vancouver dental clinics. Month-to-month. No contracts. 90-day guarantee.',
    body: '<h1>Dental Marketing — Get More Patients Online</h1><p>AP Digital helps dental clinics in Vancouver and Metro Vancouver get more new-patient appointments through Google Ads and Meta Ads. Month-to-month. No contracts. 90-day results guarantee.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/salon-marketing">Salon Marketing</a></li><li><a href="/law-firm-marketing">Law Firm Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/dental-marketing-vancouver-bc">Dental marketing guide</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Dental Marketing', 'Patient acquisition for Vancouver dental clinics via Google Ads & Meta Ads.', '/dental-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Dental Marketing', url: '/dental-marketing' }]),
      webPageSchema('Dental Marketing Vancouver | AP Digital', 'Google Ads & Meta Ads for Vancouver dental clinics.', '/dental-marketing'),
    ]}
  },
  {
    path: 'hvac-marketing',
    title: 'HVAC Marketing Vancouver | More Service Calls | AP Digital',
    description: 'Get more HVAC service calls with Google Ads & Meta Ads. AP Digital serves Vancouver HVAC companies. Month-to-month. No contracts.',
    body: '<h1>HVAC Marketing — More Service Calls, Less Downtime</h1><p>AP Digital helps HVAC companies in Metro Vancouver generate consistent service calls and installation leads through Google Ads and Meta Ads. Month-to-month. No contracts.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/plumber-marketing">Plumber Marketing</a></li><li><a href="/trades-marketing">Trades Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/hvac-marketing-vancouver-bc">HVAC marketing guide</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('HVAC Marketing', 'Lead generation for HVAC companies in Metro Vancouver.', '/hvac-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'HVAC Marketing', url: '/hvac-marketing' }]),
      webPageSchema('HVAC Marketing Vancouver | AP Digital', 'Google Ads & Meta Ads for Vancouver HVAC companies.', '/hvac-marketing'),
    ]}
  },
  {
    path: 'fitness-marketing',
    title: 'Gym & Fitness Marketing Vancouver | More Members | AP Digital',
    description: 'Get more gym members with Meta Ads & Google Ads. AP Digital serves Vancouver gyms & fitness studios. Month-to-month. No contracts.',
    body: '<h1>Gym &amp; Fitness Marketing — Fill Your Membership</h1><p>AP Digital helps gyms, fitness studios, and personal trainers in Vancouver get more members and clients through Meta Ads, Google Ads, and social media marketing. Month-to-month. No contracts.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/salon-marketing">Salon Marketing</a></li><li><a href="/coaching-marketing">Coaching Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/gym-marketing-vancouver-bc">Gym marketing guide</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Gym & Fitness Marketing', 'Membership growth for Vancouver gyms & fitness studios.', '/fitness-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Fitness Marketing', url: '/fitness-marketing' }]),
      webPageSchema('Gym & Fitness Marketing Vancouver | AP Digital', 'Meta Ads & Google Ads for Vancouver gyms.', '/fitness-marketing'),
    ]}
  },
  {
    path: 'restaurant-marketing',
    title: 'Restaurant Marketing Vancouver | Fill More Tables | AP Digital',
    description: 'Get more reservations & walk-ins with Meta Ads, Google Ads & social media. AP Digital serves Vancouver restaurants & cafes. Month-to-month. No contracts.',
    body: '<h1>Restaurant Marketing — Fill More Tables with Ads &amp; Social</h1><p>AP Digital helps restaurants and cafes in Vancouver get more reservations and walk-ins through Meta Ads, Google Ads, and Instagram content. Month-to-month. No contracts.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/salon-marketing">Salon Marketing</a></li><li><a href="/fitness-marketing">Fitness Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/restaurant-marketing-vancouver-bc">Restaurant marketing guide</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Restaurant Marketing', 'Reservation & walk-in campaigns for Vancouver restaurants.', '/restaurant-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Restaurant Marketing', url: '/restaurant-marketing' }]),
      webPageSchema('Restaurant Marketing Vancouver | AP Digital', 'Meta Ads & Google Ads for Vancouver restaurants.', '/restaurant-marketing'),
    ]}
  },
  {
    path: 'law-firm-marketing',
    title: 'Law Firm Marketing Vancouver | Get More Clients | AP Digital',
    description: 'Get more legal clients with Google Ads & Meta Ads. AP Digital serves Vancouver law firms. Month-to-month. No contracts. 90-day guarantee.',
    body: '<h1>Law Firm Marketing — Get More Clients Online</h1><p>AP Digital helps law firms in Vancouver and Metro Vancouver attract more clients through Google Ads and Meta Ads. Month-to-month. No contracts. 90-day results guarantee.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/dental-marketing">Dental Marketing</a></li><li><a href="/coaching-marketing">Coaching Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/how-much-do-google-ads-cost-vancouver">What Google Ads cost</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Law Firm Marketing', 'Client acquisition for Vancouver law firms via Google Ads & Meta Ads.', '/law-firm-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Law Firm Marketing', url: '/law-firm-marketing' }]),
      webPageSchema('Law Firm Marketing Vancouver | AP Digital', 'Google Ads & Meta Ads for Vancouver law firms.', '/law-firm-marketing'),
    ]}
  },
  // ─── Trades sub-niche pages ───
  {
    path: 'plumber-marketing',
    title: 'Plumber Marketing Vancouver | Get More Service Calls | AP Digital',
    description: 'Google Ads & Local SEO for Metro Vancouver plumbers. Month-to-month. No contracts. 90-day guarantee.',
    body: '<h1>Plumber Marketing — Get More Service Calls with Google Ads</h1><p>When a pipe bursts at 2am, homeowners Google it. AP Digital builds booked-estimate systems for BC plumbers using Google Ads, Local Service Ads, and Google Business Profile optimization.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/electrician-marketing">Electrician Marketing</a></li><li><a href="/roofer-marketing">Roofer Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/plumber-marketing-metro-vancouver">Plumber marketing guide</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Plumber Marketing', 'Google Ads & lead generation for plumbing companies in Metro Vancouver.', '/plumber-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Trades Marketing', url: '/trades-marketing' }, { name: 'Plumber Marketing', url: '/plumber-marketing' }]),
      webPageSchema('Plumber Marketing Vancouver | AP Digital', 'Google Ads for Metro Vancouver plumbers.', '/plumber-marketing'),
      faqSchema([
        { q: 'How much do Google Ads cost for plumbers in Metro Vancouver?', a: 'Most plumbing companies invest $1,000–$2,500/month in ad spend plus a $759/month management fee. Plumbing keywords cost $8–$25 per click in Metro Vancouver.' },
        { q: 'How fast will I get calls from Google Ads?', a: 'Most plumbers see their first inbound calls within 48 hours. Emergency plumbing searches convert immediately.' },
        { q: 'Should plumbers use Google Ads or Local Service Ads?', a: 'Both. LSAs appear at the top with a Google Guaranteed badge and you pay per lead. Standard Google Search Ads capture the rest of the first page.' },
      ])
    ]}
  },
  {
    path: 'electrician-marketing',
    title: 'Electrician Marketing Vancouver | Get More Jobs | AP Digital',
    description: 'Get 25+ qualified electrical jobs/month with Google Ads & Local SEO. AP Digital serves Metro Vancouver electricians. Month-to-month. No contracts. 90-day guarantee.',
    body: '<h1>Electrician Marketing — Get More Jobs with Google Ads</h1><p>Panel upgrades, EV charger installs, emergency rewiring — AP Digital builds booked-estimate systems for BC electricians using Google Ads, Local Service Ads, and Google Business Profile optimization. EV charger installation is up 140% YoY in BC.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/plumber-marketing">Plumber Marketing</a></li><li><a href="/contractor-marketing">Contractor Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/electrician-leads-bc">Electrician leads in BC</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Electrician Marketing', 'Google Ads & lead generation for electricians in Metro Vancouver.', '/electrician-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Trades Marketing', url: '/trades-marketing' }, { name: 'Electrician Marketing', url: '/electrician-marketing' }]),
      webPageSchema('Electrician Marketing Vancouver | AP Digital', 'Google Ads for Metro Vancouver electricians.', '/electrician-marketing'),
      faqSchema([
        { q: 'How much do Google Ads cost for electricians in BC?', a: 'Most electrical companies invest $1,000–$2,000/month in ad spend plus a $759/month management fee. Electrical keywords cost $10–$30 per click.' },
        { q: 'Is EV charger installation worth advertising for?', a: 'Yes — it\'s the fastest-growing electrical keyword in BC, up 140% year-over-year. Average Level 2 charger install: $1,500–$3,000.' },
      ])
    ]}
  },
  {
    path: 'roofer-marketing',
    title: 'Roofer Marketing Vancouver | Get More Roofing Jobs | AP Digital',
    description: 'Google Ads & Local SEO that bring roofing leads. AP Digital serves Metro Vancouver roofers. Month-to-month. No contracts. 90-day guarantee.',
    body: '<h1>Roofer Marketing — Get More Roofing Jobs with Google Ads</h1><p>BC\'s rainy season means roofing searches spike every fall. AP Digital builds booked-estimate systems for Metro Vancouver roofing companies using Google Ads, Local Service Ads, storm-response campaigns, and Google Business Profile optimization.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/contractor-marketing">Contractor Marketing</a></li><li><a href="/plumber-marketing">Plumber Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/best-ads-for-trades-businesses-canada">Best ads for trades</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Roofer Marketing', 'Google Ads & lead generation for roofing companies in Metro Vancouver.', '/roofer-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Trades Marketing', url: '/trades-marketing' }, { name: 'Roofer Marketing', url: '/roofer-marketing' }]),
      webPageSchema('Roofer Marketing Vancouver | AP Digital', 'Google Ads for Metro Vancouver roofers.', '/roofer-marketing'),
    ]}
  },
  {
    path: 'contractor-marketing',
    title: 'General Contractor Marketing Vancouver | More Renovation Jobs | AP Digital',
    description: 'Google Ads & Meta Ads that bring renovation leads. AP Digital serves Metro Vancouver general contractors. Month-to-month. No contracts.',
    body: '<h1>General Contractor Marketing — Get More Renovation Jobs</h1><p>Kitchen renos, bathroom remodels, basement finishing, laneway houses — AP Digital builds booked-estimate systems for general contractors using Google Ads, Meta Ads, and portfolio-driven landing pages.</p><nav aria-label="Related"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/roofer-marketing">Roofer Marketing</a></li><li><a href="/electrician-marketing">Electrician Marketing</a></li><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/blog/meta-ads-cost-contractors-bc">What Meta Ads cost contractors</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('General Contractor Marketing', 'Google Ads & Meta Ads for general contractors in Metro Vancouver.', '/contractor-marketing'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Trades Marketing', url: '/trades-marketing' }, { name: 'Contractor Marketing', url: '/contractor-marketing' }]),
      webPageSchema('General Contractor Marketing Vancouver | AP Digital', 'Lead generation for Metro Vancouver GCs.', '/contractor-marketing'),
    ]}
  },
  // ─── Service pages ───
  {
    path: 'services/paid-ads',
    title: 'Paid Ads Agency Vancouver | Meta & Google Ads | AP Digital',
    description: 'AP Digital manages Meta & Google Ads for Vancouver businesses. First leads within 2 weeks. Month-to-month, no contracts. From $759/mo.',
    body: '<h1>Paid Ads — Meta &amp; Google Ads Management</h1><p>AP Digital manages Meta Ads (Facebook and Instagram) and Google Ads campaigns for Vancouver businesses. Month-to-month, from $759/month.</p><nav aria-label="Quick links"><ul><li><a href="/pricing">Pricing</a></li><li><a href="/case-studies">Our Approach</a></li><li><a href="/contact">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Paid Advertising', 'Meta Ads & Google Ads management for Vancouver small businesses.', '/services/paid-ads'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Paid Ads', url: '/services/paid-ads' }]),
      webPageSchema('Paid Ads Agency Vancouver | AP Digital', 'Meta & Google Ads for Vancouver businesses.', '/services/paid-ads'),
    ]}
  },
  {
    path: 'services/social-media',
    title: 'Social Media Marketing Vancouver | Reels & Content | AP Digital',
    description: 'AP Digital manages social media for Vancouver businesses. Instagram Reels, short-form video & organic growth. Month-to-month. From $849/mo.',
    body: '<h1>Social Media Marketing — Content That Drives Leads</h1><p>AP Digital manages social media for Vancouver businesses across Instagram, Facebook, and TikTok. 12+ custom posts per month, Reels production, and community management. Month-to-month, from $849/month.</p><nav aria-label="Quick links"><ul><li><a href="/pricing">Pricing</a></li><li><a href="/contact">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Social Media Marketing', 'Social media management & content creation for Vancouver businesses.', '/services/social-media'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Social Media', url: '/services/social-media' }]),
      webPageSchema('Social Media Marketing Vancouver | AP Digital', 'Social media management for Vancouver businesses.', '/services/social-media'),
    ]}
  },
  // ─── Core pages ───
  {
    path: 'pricing',
    title: 'Marketing Pricing Vancouver | From $759/mo | AP Digital',
    description: 'Transparent pricing for paid ads and social media management. Month-to-month. 90-day results guarantee. Updated August 2026.',
    body: '<h1>Transparent Pricing. No Surprises.</h1><p>Per-service pricing built around how your business actually grows. Every service is month-to-month and backed by our 90-day results guarantee. Prices last updated August 2026.</p><ul><li>Paid Ads Management — $759/mo</li><li>Social Media Management — $849/mo</li></ul><p>Additional work (SEO, web design, lead-generation systems) is scoped per project on a free strategy call.</p><nav aria-label="Quick links"><ul><li><a href="/services/paid-ads">Paid Ads</a></li><li><a href="/services/social-media">Social Media</a></li><li><a href="/contact">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }]),
      webPageSchema('Marketing Pricing Vancouver | From $759/mo | AP Digital', 'Transparent per-service pricing. Month-to-month. 90-day guarantee.', '/pricing'),
    ]}
  },
  {
    path: 'case-studies',
    title: 'Our Approach | How We Work | AP Digital',
    description: 'How AP Digital runs paid ads and social media for BC businesses: what we report, what we charge, and the terms. No published case studies yet.',
    body: '<h1>How We Work</h1><p>We do not have published case studies yet. Rather than showing numbers we cannot attribute to a named client, here is exactly how the work runs: paid ads management at $759/month, social media management at $849/month, both month-to-month with no lock-in contract and 30 days notice to cancel. Ad spend is separate and paid directly to Google or Meta. We agree a lead-volume target before launch, and report leads, cost per lead, and what changed each week.</p><nav aria-label="Quick links"><ul><li><a href="/pricing">Pricing</a></li><li><a href="/services/paid-ads">Paid Ads</a></li><li><a href="/contact">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Our Approach', url: '/case-studies' }]),
      webPageSchema('Our Approach | AP Digital Vancouver', 'How we run paid ads and social media for BC businesses.', '/case-studies'),
    ]}
  },
  {
    path: 'how-to-choose-a-marketing-agency-vancouver',
    title: 'How to Choose a Marketing Agency in Vancouver | AP Digital',
    description: "What to look for when hiring a Vancouver Google Ads or Meta Ads agency — red flags, questions to ask, and what separates agencies that deliver.",
    body: '<h1>How to Choose a Marketing Agency in Vancouver</h1><p>What to look for when hiring a Vancouver Google Ads or Meta Ads agency — red flags, questions to ask, and what separates agencies that deliver real results from those that don\'t. Written by Arjun Sharma, Founder of AP Digital.</p><nav aria-label="Quick links"><ul><li><a href="/pricing">Pricing</a></li><li><a href="/case-studies">Our Approach</a></li><li><a href="/contact">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'How to Choose a Marketing Agency', url: '/how-to-choose-a-marketing-agency-vancouver' }]),
      webPageSchema("How to Choose a Marketing Agency in Vancouver", "Buyer's guide for hiring a Vancouver marketing agency.", '/how-to-choose-a-marketing-agency-vancouver'),
      { "@type": "Article", "headline": "How to Choose a Marketing Agency in Vancouver BC", "datePublished": "2026-05-01", "dateModified": "2026-08-05", "author": { "@id": `${BASE_URL}/#founder` }, "publisher": { "@id": `${BASE_URL}/#organization` } },
    ]}
  },
  {
    path: 'about',
    title: 'About AP Digital | Founded by Arjun Sharma | Vancouver Marketing Agency',
    description: 'AP Digital was founded by Arjun Sharma in Vancouver, BC. We specialize in lead generation for trades, salons, real estate & coaches. No contracts.',
    body: '<h1>About AP Digital</h1><p>AP Digital was founded by Arjun Sharma in Vancouver, BC. We specialize in performance marketing and lead generation for local service businesses — trades contractors, salons, real estate agents, coaches, dental clinics, gyms, and restaurants. Arjun personally manages every client account.</p><nav aria-label="Quick links"><ul><li><a href="/pricing">Pricing</a></li><li><a href="/case-studies">Our Approach</a></li><li><a href="/contact">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]),
      webPageSchema('About AP Digital | Arjun Sharma', 'Founded by Arjun Sharma in Vancouver, BC.', '/about'),
    ]}
  },
  {
    path: 'book',
    title: 'Book a Free Strategy Call | AP Digital',
    description: 'Book a free 20-minute call with AP Digital. We review what you are running now and tell you what we would do. No charge, no obligation.',
    body: '<h1>Book a Free Strategy Call</h1><p>Twenty minutes on the phone. We look at what you are running now, tell you what we would change, and give you a straight answer on whether we are the right fit — including when the answer is no. No charge and no obligation. It helps to have your website URL handy.</p><p>For reference: paid ads management is $759/month and social media management is $849/month, month-to-month with no lock-in contract.</p><nav aria-label="Quick links"><ul><li><a href="/pricing">Pricing</a></li><li><a href="/services/paid-ads">Paid Ads</a></li><li><a href="/contact">Contact</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Book a Call', url: '/book' }]),
      webPageSchema('Book a Free Strategy Call | AP Digital', 'Book a free 20-minute strategy call with AP Digital.', '/book'),
    ]}
  },
  {
    path: 'contact',
    title: 'Book a Free Strategy Call | AP Digital Vancouver',
    description: 'Book a free 20-minute strategy call with AP Digital. No pitch. No pressure. No contracts.',
    body: '<h1>Book a Free Strategy Call</h1><p>Book a free 20-minute strategy call with Arjun Sharma at AP Digital. We\'ll show you how many leads are available in your area and what it would cost to capture them. No pitch. No pressure. No contracts.</p><nav aria-label="Quick links"><ul><li><a href="/pricing">Pricing</a></li><li><a href="/case-studies">Our Approach</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]),
      webPageSchema('Contact AP Digital | Book a Free Strategy Call', 'Book a free call with AP Digital Vancouver.', '/contact'),
    ]}
  },
  {
    path: 'blog',
    title: 'Digital Marketing Blog | AP Digital Vancouver',
    description: 'Paid ads, SEO & lead generation guides for Vancouver businesses. Proven strategies from AP Digital.',
    body: '<h1>Digital Marketing Blog</h1><p>Paid ads, SEO, and lead generation guides for Vancouver trades businesses, salons, real estate agents, coaches, and more. Proven strategies from AP Digital, written by Arjun Sharma.</p><nav aria-label="Quick links"><ul><li><a href="/trades-marketing">Trades Marketing</a></li><li><a href="/salon-marketing">Salon Marketing</a></li><li><a href="/pricing">Pricing</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]),
      webPageSchema('Digital Marketing Blog | AP Digital', 'Marketing guides for Vancouver businesses.', '/blog'),
    ]}
  },
  // ─── Founder bio ───
  {
    path: 'about/arjun-sharma',
    title: 'Arjun Sharma | Founder & Lead Strategist | AP Digital Vancouver',
    description: 'Arjun Sharma is the founder of AP Digital, a Vancouver performance marketing agency. He personally manages every client account, specializing in Google Ads and Meta Ads for trades contractors across BC.',
    body: '<h1>Arjun Sharma — Founder &amp; Lead Strategist</h1><p>Arjun Sharma founded AP Digital in Vancouver, BC to help trades contractors, salons, real estate agents, and coaches get predictable leads through Google Ads and Meta Ads. He personally manages every client account.</p><nav aria-label="Quick links"><ul><li><a href="/about">About AP Digital</a></li><li><a href="/case-studies">Our Approach</a></li><li><a href="/blog">Articles by Arjun</a></li><li><a href="/contact">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }, { name: 'Arjun Sharma', url: '/about/arjun-sharma' }]),
      webPageSchema('Arjun Sharma | Founder & Lead Strategist | AP Digital', 'Founder bio and methodology.', '/about/arjun-sharma'),
    ]}
  },
  // ─── Case study detail pages ───
  {
    path: 'digital-marketing-near-me',
    title: 'Digital Marketing Agency Near Me | BC Local Ads | AP Digital',
    description: 'Looking for a digital marketing agency near you in BC? AP Digital runs Google Ads & Meta Ads for trades, salons, realtors & coaches across Metro Vancouver. No contracts.',
    body: '<h1>Digital Marketing Agency Near You — Metro Vancouver & Fraser Valley</h1><p>AP Digital is a local digital marketing agency serving trades, salons, realtors, and coaches across Metro Vancouver and the Fraser Valley. Google Ads, Meta Ads, local SEO. Month-to-month. No contracts.</p><nav aria-label="Quick links"><ul><li><a href="/vancouver">Vancouver</a></li><li><a href="/surrey">Surrey</a></li><li><a href="/burnaby">Burnaby</a></li><li><a href="/richmond">Richmond</a></li><li><a href="/langley">Langley</a></li><li><a href="/coquitlam">Coquitlam</a></li><li><a href="/abbotsford">Abbotsford</a></li><li><a href="/contact">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      serviceSchema('Digital Marketing Near Me', 'Local digital marketing agency for BC businesses.', '/digital-marketing-near-me'),
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Digital Marketing Near Me', url: '/digital-marketing-near-me' }]),
      webPageSchema('Digital Marketing Agency Near Me | AP Digital', 'Local digital marketing for Metro Vancouver & Fraser Valley businesses.', '/digital-marketing-near-me'),
    ]}
  },
  // ─── Calendly redirect target — must never be indexed ───
  {
    path: 'thank-you',
    robots: 'noindex, nofollow',
    title: "You're booked in | AP Digital",
    description: 'Your call is booked. Check your email for the calendar invite.',
    body: '<h1>You&rsquo;re booked in</h1><p>Check your email for the calendar invite. If it hasn&rsquo;t arrived in a few minutes, look in spam.</p>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema,
      webPageSchema("You're booked in | AP Digital", 'Booking confirmation.', '/thank-you'),
    ]}
  },
  // ─── Offer page (outbound only, kept out of the index) ───
  {
    path: 'free-pilot',
    robots: 'noindex, follow',
    title: 'Free 14-Day Ad Pilot | AP Digital',
    description: 'We run your Meta ads free for 14 days. You pay the ad budget directly to Meta. We charge nothing. A few spots available this month.',
    body: '<h1>We&rsquo;ll run your ads free for 14 days</h1><p>You pay the ad budget straight to Meta on your own card. We charge you nothing. No contract, no setup fee, no catch. Shut it off whenever you want. 20 minute call &mdash; if it&rsquo;s not a fit we&rsquo;ll tell you on the call.</p><ul><li>$0 paid to us during the pilot</li><li>14 days, then you decide &mdash; no obligation</li><li>Ad budget never touches our account</li></ul><nav aria-label="Quick links"><ul><li><a href="/services/paid-ads">Paid Ads</a></li><li><a href="/case-studies">Our Approach</a></li><li><a href="/contact">Book a Free Call</a></li></ul></nav>',
    schema: { "@context": "https://schema.org", "@graph": [
      orgSchema, founderSchema,
      breadcrumb([{ name: 'Home', url: '/' }, { name: 'Free 14-Day Pilot', url: '/free-pilot' }]),
      webPageSchema('Free 14-Day Ad Pilot | AP Digital', 'A free 14-day managed Meta ads pilot for BC businesses.', '/free-pilot'),
      faqSchema([
        { q: 'What\'s the catch?', a: 'There isn\'t one, but there is a reason. We need case studies to sell to other businesses like yours. If it goes well we\'ll ask you to continue as a paying client, and you\'re completely free to say no.' },
        { q: 'How much do I need to spend on ads?', a: 'Whatever you\'re comfortable with. $30 a day for the 14 days is enough to get real data. It goes to Meta on your card, we never touch it, and you can pause it at any moment.' },
        { q: 'What does it cost if I want to continue?', a: 'Paid ads management starts at $759 a month, month to month, no long contracts. Plenty of people take the 14 days and stop, and that\'s a legitimate outcome.' },
        { q: 'What happens to my ad account afterward?', a: 'It\'s yours and it always was. We work through partner access, which you can revoke with two clicks. Everything we build stays in your account whether you continue with us or not.' },
      ])
    ]}
  },
  // ─── City pages ───
  // Neighbourhoods per city, so the prerendered FAQ answers match what the
  // rendered page says rather than being generic.
  ...[
    ['vancouver',  'Kitsilano, Mount Pleasant, East Vancouver and Yaletown', 'Vancouver Marketing Agency — From $759/mo, No Contract', 'Google Ads and Meta Ads managed for Vancouver businesses — Kitsilano, Mount Pleasant, Yaletown, East Van. From $759/month, month-to-month, no lock-in.'],
    ['surrey',     'Newton, Guildford, South Surrey and Cloverdale', 'Surrey Lead Generation: Google & Meta Ads, No Lock-In', 'Paid ads for Surrey businesses in Newton, Guildford, South Surrey and Cloverdale. $759/month, cancel with 30 days\' notice. No long-term contract.'],
    ['burnaby',    'Metrotown, Brentwood, North Burnaby and Edmonds', 'Burnaby Ads Management — $759/mo, Cancel Anytime', 'Meta and Google campaigns for Burnaby businesses near Metrotown, Brentwood and Edmonds. Management from $759/month. Month-to-month, no lock-in.'],
    ['richmond',   'City Centre, Steveston, Broadmoor and Brighouse', 'Richmond Google Ads for Local Business — No Contract', 'Richmond businesses in City Centre, Steveston and Brighouse: Google Ads and Meta Ads from $759/month. No contract, cancel with 30 days\' notice.'],
    ['langley',    'Willoughby, Walnut Grove, Murrayville and Aldergrove', 'Langley Marketing — First Leads in 2 Weeks, No Contract', 'Langley trades, salons and realtors: most clients see their first qualified leads within 2 weeks. Ads from $759/month, month-to-month, no contract.'],
    ['coquitlam',  'Port Moody, Port Coquitlam and the wider Tri-Cities', 'Coquitlam Google & Meta Ads From $759/mo — No Lock-In', 'Google Ads and Meta Ads for Coquitlam, Port Moody and Port Coquitlam businesses. From $759/month with no lock-in contract. Book a 20-minute call.'],
    ['abbotsford', 'West Abbotsford, Clearbrook, Auguston and Matsqui', 'Abbotsford Marketing for Trades — $759/mo, No Contract', 'Marketing for Abbotsford contractors, trades and salons across the Fraser Valley. Google and Meta Ads from $759/month. Month-to-month, no contract.'],
  ].map(([city, areas, metaTitle, metaDesc]) => {
    const cap = city.charAt(0).toUpperCase() + city.slice(1);
    return {
      path: city,
      title: metaTitle,
      description: metaDesc,
      // H1 matches the React page exactly. It used to read "Digital Marketing
      // Agency in ${cap}, BC" — an eighth headline, different from all seven
      // rendered ones, and the only one Google actually crawled.
      body: `<h1>${cap} Google &amp; Meta Ads + Social Media Management</h1><p>AP Digital helps ${cap} businesses get more leads with Google Ads, Meta Ads, and social media management. We serve trades contractors, salons, real estate agents, coaches, and more, across ${areas}. Month-to-month. No contracts.</p><nav aria-label="Quick links"><ul><li><a href="/services/paid-ads">Google &amp; Meta Ads</a></li><li><a href="/services/social-media">Social Media Management</a></li><li><a href="/trades-marketing">Trades Marketing</a></li><li><a href="/salon-marketing">Salon Marketing</a></li><li><a href="/real-estate-marketing">Real Estate Marketing</a></li><li><a href="/dental-marketing">Dental Marketing</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/how-to-choose-a-marketing-agency-vancouver">How to Choose an Agency</a></li><li><a href="/book">Book a Free Call</a></li></ul></nav>`,
      schema: { "@context": "https://schema.org", "@graph": [
        orgSchema, founderSchema,
        serviceSchema(`Digital Marketing ${cap} BC`, `Lead generation for ${cap} businesses using Google Ads & Meta Ads.`, `/${city}`),
        breadcrumb([{ name: 'Home', url: '/' }, { name: cap, url: `/${city}` }]),
        webPageSchema(metaTitle, `Google Ads & Meta Ads for ${cap} businesses.`, `/${city}`),
        // The city pages carry FAQs in the rendered page but the prerendered
        // HTML had no FAQPage node at all, so crawlers reading the static
        // markup never saw them. These mirror the page's leading questions.
        faqSchema([
          { q: `Who is the best digital marketing agency in ${cap} for contractors?`,
            a: `For ${cap} trades — plumbers, HVAC, electricians, roofers — the agency worth hiring is the one that targets at neighbourhood level rather than blanketing Metro Vancouver, and that reports cost per booked job rather than impressions. AP Digital runs Google Ads and Meta Ads for ${cap} contractors across ${areas}, month-to-month with no lock-in. Arjun Sharma manages every account personally.` },
          { q: `Is there a ${cap} marketing company that works month-to-month?`,
            a: `Yes. AP Digital works month-to-month with every ${cap} client — pause or cancel with 30 days' notice, no exit fee.` },
          { q: `How much does a marketing agency in ${cap} cost?`,
            a: `Paid ads management is $759/month and social media management is $849/month, quoted separately. Ad spend is separate again and goes straight to Google or Meta. Most ${cap} businesses start between $1,000 and $2,000/month all in.` },
        ]),
      ]}
    };
  }),
];

// ── Blog posts (current as of 2026-08-05) ───────────────────────────────────
// Only posts that exist in src/lib/blogPosts.ts — deleted posts are excluded

const blogPosts = [
  { slug: 'real-estate-agent-social-media-tips', contentExcerpt: 'The real estate market in Canada is as competitive as it\'s ever been. Whether you\'re working in the GTA, Vancouver, Calgary, or a smaller market, one thing is clear: the agents who dominate social media are the ones closing more deals. If you\'re still relying solely on yard signs, open houses, and your brokerage\'s website, you\'re falling behind.', metaTitle: 'Social Media Tips for Real Estate Agents Canada | AP Digital', metaDescription: 'The top social media strategies for Canadian real estate agents that generate buyer & seller leads in 2026.', date: '2026-03-12', category: 'Real Estate Marketing' },
  { slug: 'how-much-does-social-media-marketing-cost-canada', dateModified: '2026-08-23', contentExcerpt: 'Social media marketing in Canada costs $500 to $5,000+ per month for management and strategy in 2026, plus another $500 to $5,000 per month in ad spend if you run paid campaigns. Management splits into three tiers: budget at $500 to $1,000, growth at $1,500 to $3,000, and full-service at $3,000 to $5,000+.', metaTitle: 'Social Media Marketing Cost in Canada: 2026 Price Guide', metaDescription: 'Real 2026 prices for Canadian social media marketing: agency fees, ad spend, and what each budget actually gets you. Plus a free budget calculator.', date: '2026-08-09', category: 'Marketing Strategy' },
  { slug: 'best-ads-platform-for-small-business-canada', contentExcerpt: 'If you\'re a small business owner in Canada trying to figure out where to spend your advertising budget, you\'ve probably asked yourself this question: should I run Facebook Ads or Google Ads? It\'s one of the most common debates in digital marketing — and the answer isn\'t as simple as picking one over the other.', metaTitle: 'Facebook Ads vs Google Ads for Small Business in Canada 2026 | AP Digital', metaDescription: 'Meta Ads or Google Ads — which is better for your Canadian small business? Head-to-head comparison with costs, niches & recommendations.', date: '2026-03-12', category: 'Paid Advertising' },
  { slug: 'email-marketing-vs-social-media', contentExcerpt: 'Every small business owner has a limited marketing budget — so where should you put your money? Email marketing and social media marketing are two of the most effective digital channels, but they work very differently. Here\'s an honest comparison to help you decide.  What Is Email Marketing? Email marketing means sending targeted messages directly to a list of subscribers.', metaTitle: 'Email Marketing vs Social Media: What Works in 2026? | AP Digital', metaDescription: 'Email or social media — where should your business focus? We compare both channels for Canadian small businesses.', date: '2026-07-10', category: 'Marketing Strategy' },
  { slug: 'best-ads-for-trades-businesses-canada', contentExcerpt: 'If you\'re a plumber, electrician, roofer, HVAC tech, or general contractor in Canada — you already know that word-of-mouth only goes so far. The businesses booking $50K–$100K+ per month in jobs are the ones running ads. Here\'s exactly how to do it right.', metaTitle: 'Best Ads for Trades Businesses in Canada | AP Digital', metaDescription: 'Which platform works best for plumbers, HVAC, electricians & roofers in Canada? Meta Ads vs Google Ads for trades businesses.', date: '2026-08-05', category: 'Trades Marketing' },
  { slug: 'digital-marketing-agency-vancouver-bc', contentExcerpt: 'If you\'re a local business owner in Vancouver, BC searching for a digital marketing agency, you\'ve probably already noticed the problem: there are hundreds of agencies promising results, and almost all of them sound exactly the same. "Data-driven." "Full-service." "Results-focused." The words blur together, and it\'s nearly impossible to know who to trust with your marketing budget.', metaTitle: 'Digital Marketing Agency Vancouver BC | AP Digital', metaDescription: 'Looking for a digital marketing agency in Vancouver, BC? AP Digital helps local businesses get more leads with paid ads & social media.', date: '2026-03-15', category: 'Agency' },
  { slug: 'salon-marketing-vancouver-bc', contentExcerpt: 'Running a salon in Vancouver, BC is both an incredible opportunity and a serious challenge. The city has one of the highest densities of salons per capita in Canada — from Kitsilano to Yaletown to North Vancouver — and clients have endless options at their fingertips. If your marketing isn\'t working hard for you, your competitors are taking those bookings.', metaTitle: 'Salon Marketing Vancouver BC: Get More Clients | AP Digital', metaDescription: 'The complete guide to salon marketing in Vancouver, BC. Instagram ads, Google Ads & local SEO strategies.', date: '2026-03-17', category: 'Salon Marketing' },
  { slug: 'trades-marketing-vancouver-bc', contentExcerpt: 'If you\'re a contractor in Vancouver BC — whether you\'re a plumber in Burnaby, an electrician in Surrey, a roofer in Coquitlam, or a general contractor anywhere in Metro Vancouver — you already know the market is competitive. New builds are slowing, homeowners are more selective, and the contractors winning the most jobs aren\'t necessarily the most skilled.', metaTitle: 'Trades Marketing Vancouver BC: Get More Leads | AP Digital', metaDescription: 'How trades businesses in Vancouver, BC get a steady flow of leads online. Paid ads & SEO strategies for contractors.', date: '2026-03-18', category: 'Trades Marketing' },
  { slug: 'real-estate-agent-marketing-vancouver-bc', contentExcerpt: 'Vancouver\'s real estate market is one of the most competitive in North America. With thousands of licensed realtors competing for a limited number of listings and buyers, the agents who win aren\'t always the most experienced — they\'re the most visible. In 2026, your personal brand and digital marketing are the difference between a thriving business and a quiet phone.', metaTitle: 'Real Estate Agent Marketing Vancouver BC | AP Digital', metaDescription: 'How Vancouver realtors get consistent leads using Meta Ads, social media & Google Ads.', date: '2026-03-19', category: 'Real Estate Marketing' },
  { slug: 'meta-ads-cost-contractors-bc', contentExcerpt: 'If you\'re a contractor in BC thinking about running Facebook or Instagram ads, the first question is almost always: "How much is this going to cost me?" It\'s a fair question — and unlike a lot of agencies, we\'re going to give you a straight answer.  What Does "Meta Ads Cost" Actually Mean? When people talk about Meta Ads costs, there are two separate numbers to understand: 1.', metaTitle: 'How Much Do Meta Ads Cost for Contractors in BC? | AP Digital', metaDescription: 'Realistic Meta Ads budgets for plumbers, HVAC, electricians & roofers in Metro Vancouver.', date: '2026-03-20', category: 'Trades Marketing' },
  { slug: 'hvac-marketing-vancouver-bc', contentExcerpt: 'Running an HVAC business in Vancouver BC comes with a unique challenge: you\'re either slammed or slow. Furnace season hits in October and the phones ring off the hook. By March, it slows down. Summer AC demand is growing but still unpredictable. The HVAC companies that stay booked year-round are the ones who have cracked the marketing equation.', metaTitle: 'HVAC Marketing Vancouver BC: Get More Leads | AP Digital', metaDescription: 'How HVAC companies in Vancouver, BC get consistent service calls using Meta Ads, Google Ads & local SEO.', date: '2026-03-21', category: 'Trades Marketing' },
  { slug: 'coaching-clients-bc', contentExcerpt: 'If you\'re a coach in BC — whether you\'re a life coach, business coach, fitness coach, or health coach — you already know the hardest part isn\'t delivering results. It\'s getting a consistent flow of clients in the first place. Most coaches in Metro Vancouver rely on referrals, word of mouth, or cold outreach on LinkedIn and Instagram. These methods work — but they\'re unpredictable.', metaTitle: 'How to Get More Coaching Clients in BC | AP Digital', metaDescription: "How fitness, business & life coaches use paid ads & social media to grow their practice in BC.", date: '2026-03-22', category: 'Coaching Marketing' },
  { slug: 'plumber-marketing-metro-vancouver', contentExcerpt: 'Plumbing is one of the most competitive trades markets in Metro Vancouver. Every neighbourhood has multiple plumbers competing for the same jobs — and the ones who consistently win aren\'t necessarily the most experienced. They\'re the ones who show up first online when a homeowner needs help.', metaTitle: 'Plumber Marketing Metro Vancouver: Get More Calls | AP Digital', metaDescription: 'How plumbing companies in Metro Vancouver get more service calls with Google Ads, Meta Ads & local SEO.', date: '2026-03-23', category: 'Trades Marketing' },
  { slug: 'electrician-leads-bc', contentExcerpt: 'Electrical work is one of the most in-demand trades in Metro Vancouver. New builds, EV charger installations, panel upgrades, smart home wiring — the demand is there. But so is the competition. There are thousands of licensed electricians in BC, and the ones consistently landing the best jobs are the ones showing up online when homeowners and project managers search.', metaTitle: 'How Electricians Get More Leads in BC | AP Digital', metaDescription: 'The best ways for BC electricians to generate consistent leads online. Paid ads, Google Business Profile & local SEO.', date: '2026-03-24', category: 'Trades Marketing' },
  { slug: 'vancouver-small-business-seo-guide', contentExcerpt: 'If you own a small business in Vancouver and you\'re not showing up on the first page of Google, you\'re invisible to the majority of your potential customers. In 2026, local SEO isn\'t optional — it\'s the foundation of a successful digital presence. Here\'s your complete guide to ranking higher in Vancouver.', metaTitle: 'Vancouver Small Business SEO Guide 2026 | AP Digital', metaDescription: 'How Vancouver small businesses rank higher on Google with local SEO, Google Business Profile optimization, and content strategy.', date: '2026-04-05', category: 'SEO' },
  { slug: 'vancouver-google-ads-guide-local-business', contentExcerpt: 'When a Vancouver homeowner needs a plumber at 10 PM on a Tuesday or a business owner searches for "web designer Vancouver" during their lunch break, they go to Google. If your business isn\'t showing up at the top of those search results, you\'re losing jobs to competitors who are. Here\'s how Vancouver businesses can use Google Ads to capture high-intent leads in 2026.', metaTitle: 'Google Ads Vancouver: Local Business Guide 2026 | AP Digital', metaDescription: 'How Vancouver local businesses use Google Ads & Local Service Ads to get more calls, leads, and booked jobs.', date: '2026-04-10', category: 'Paid Advertising' },
  { slug: 'social-media-marketing-vancouver', contentExcerpt: 'Social media marketing in Vancouver is unlike any other Canadian market. The city\'s diversity, tech-savviness, and highly competitive business landscape mean that generic social strategies fall flat. Here\'s what actually works for Vancouver local businesses in 2026.  The Vancouver Social Media Landscape Vancouver\'s population is young, urban, and digitally connected.', metaTitle: 'Social Media Marketing Vancouver 2026 | AP Digital', metaDescription: 'What social media strategies actually work for Vancouver local businesses in 2026.', date: '2026-04-12', category: 'Social Media' },
  { slug: 'google-ads-coaching-business-bc', contentExcerpt: 'If you\'re a life coach, business coach, or wellness coach in BC, you\'ve probably tried organic social media, networking events, and referrals to find clients. Those channels work — but they\'re slow and unpredictable. Google Ads lets you get in front of people who are actively searching for a coach right now.', metaTitle: 'Google Ads for Coaching Business in BC | AP Digital', metaDescription: 'How BC coaches use Google Ads to get discovery call bookings and high-ticket clients.', date: '2026-04-15', category: 'Coaching Marketing' },
  { slug: 'salon-google-ads-vancouver', contentExcerpt: 'Most salon marketing advice focuses on Instagram and Facebook. And those platforms work — but they have a major limitation: you\'re showing ads to people who weren\'t looking for a salon. Google Ads flips that. You show up when someone in Vancouver literally types "hair salon near me" into their phone.  Why Google Ads Is a Game-Changer for Vancouver Salons Think about how people find a new salon.', metaTitle: 'Google Ads for Salons in Vancouver | AP Digital', metaDescription: 'How Vancouver salons use Google Ads to fill their appointment books with new clients.', date: '2026-04-18', category: 'Salon Marketing' },
  { slug: 'digital-marketing-richmond-bc', contentExcerpt: 'Richmond is one of the most competitive business markets in Metro Vancouver. With a dense population, a thriving restaurant scene, a massive retail corridor, and proximity to YVR, Richmond businesses face unique challenges — and unique opportunities — when it comes to digital marketing.  Why Richmond Businesses Need Digital Marketing Richmond\'s demographics are distinct.', metaTitle: 'Digital Marketing Richmond BC | AP Digital', metaDescription: 'Digital marketing services for Richmond, BC businesses. Google Ads, Meta Ads & social media.', date: '2026-04-20', category: 'City' },
  { slug: 'digital-marketing-langley-bc', contentExcerpt: 'Langley is one of the fastest-growing communities in the Fraser Valley — and that growth means opportunity for local businesses. But it also means more competition. Whether you\'re in Langley City or the Township, the businesses winning right now are the ones investing in digital marketing that actually drives leads.', metaTitle: 'Digital Marketing Langley BC | AP Digital', metaDescription: 'Digital marketing services for Langley, BC businesses. Paid ads, SEO & social media.', date: '2026-04-22', category: 'City' },
  { slug: 'paid-ads-abbotsford-bc', contentExcerpt: 'If you run a small business in Abbotsford, you already know how competitive the Fraser Valley market has become. Whether you\'re a contractor, salon owner, coach, or realtor, paid ads on Google and Meta are the fastest way to get in front of people who are actively looking for what you offer.  Why Paid Ads Work for Abbotsford Businesses Abbotsford is growing fast.', metaTitle: 'Paid Ads Abbotsford BC | AP Digital', metaDescription: 'Paid ads management for Abbotsford & Fraser Valley businesses.', date: '2026-04-25', category: 'City' },
  { slug: 'social-media-marketing-north-vancouver', contentExcerpt: 'North Vancouver has a unique market. The North Shore community is tight-knit, lifestyle-driven, and highly active on social media. For local businesses, that\'s an enormous opportunity — if you know how to show up the right way.  Why Social Media Matters on the North Shore North Vancouver residents are affluent, educated, and digitally savvy.', metaTitle: 'Social Media Marketing North Vancouver | AP Digital', metaDescription: 'Social media marketing for North Vancouver businesses.', date: '2026-04-28', category: 'City' },
  { slug: 'facebook-ads-surrey-bc', contentExcerpt: 'Surrey is the fastest-growing city in BC, and that growth means opportunity. More residents, more homeowners, more people searching for local services. But it also means more competition. Facebook Ads give Surrey businesses a way to cut through the noise and reach the right people at the right time.', metaTitle: 'Facebook Ads Surrey BC | AP Digital', metaDescription: 'Facebook & Instagram ads for Surrey, BC businesses. Targeted ads that generate leads.', date: '2026-05-01', category: 'City' },
  { slug: 'social-media-coaching-business-bc', contentExcerpt: 'If you\'re a coach in BC — whether you focus on life coaching, business coaching, wellness, fitness, or career transitions — social media is your most powerful tool for attracting clients. But most coaches approach it wrong. They post motivational quotes, get a few likes, and wonder why their calendar is still empty. Here\'s what actually works.', metaTitle: 'Social Media for Coaching Business in BC | AP Digital', metaDescription: 'Social media strategies for BC coaches to attract clients and build authority.', date: '2026-05-05', category: 'Coaching Marketing' },
  { slug: 'instagram-ads-salons-vancouver', contentExcerpt: 'Instagram is the single best advertising platform for salons in Vancouver. Your work is visual, your audience lives on Instagram, and the platform\'s targeting lets you reach potential clients within walking distance of your chair. If you\'re not running Instagram Ads, you\'re leaving bookings on the table.', metaTitle: 'Instagram Ads for Salons in Vancouver | AP Digital', metaDescription: 'How Vancouver salons use Instagram ads and Reels to fill their appointment books.', date: '2026-05-08', category: 'Salon Marketing' },
  { slug: 'how-much-do-google-ads-cost-vancouver', contentExcerpt: 'One of the most common questions we get from Vancouver business owners is: "How much will Google Ads cost me?" The honest answer is: it depends on your industry, your competition, and your goals. But we can give you real numbers based on what our clients actually pay.  Average Cost Per Click in Vancouver by Industry Google Ads operates on an auction system.', metaTitle: 'How Much Do Google Ads Cost in Vancouver? | AP Digital', metaDescription: 'Realistic Google Ads budgets and cost-per-click data for Vancouver businesses.', date: '2026-05-10', category: 'Paid Advertising' },
  { slug: 'social-media-burnaby-bc', contentExcerpt: 'Burnaby sits right in the heart of Metro Vancouver — bordered by Vancouver, New Westminster, Coquitlam, and the North Shore. That central location means your potential customer base is massive, but it also means competition for attention is fierce. A strong social media presence is how Burnaby businesses stand out.', metaTitle: 'Social Media Marketing Burnaby BC | AP Digital', metaDescription: 'Social media marketing for Burnaby, BC businesses.', date: '2026-05-12', category: 'City' },
  { slug: 'tiktok-ads-small-business-bc', contentExcerpt: 'TikTok isn\'t just for dance videos anymore. In 2026, it\'s a legitimate advertising platform with over 15 million monthly active users in Canada. For BC small businesses, TikTok Ads offer something Meta and Google don\'t: lower costs and a younger, highly engaged audience. But is it right for YOUR business? Let\'s break it down.', metaTitle: 'TikTok Ads for Small Business in BC | AP Digital', metaDescription: 'Should your BC small business run TikTok ads? Costs, strategies, and when it makes sense.', date: '2026-05-15', category: 'Paid Advertising' },
  { slug: 'google-ads-coquitlam-tri-cities', contentExcerpt: 'The Tri-Cities — Coquitlam, Port Moody, and Port Coquitlam — are among the fastest-growing communities in Metro Vancouver. New developments, new residents, and new businesses mean more people searching Google for local services every day. Google Ads lets you be the first business they find.', metaTitle: 'Google Ads Coquitlam & Tri-Cities | AP Digital', metaDescription: 'Google Ads for Coquitlam, Port Moody & Port Coquitlam businesses.', date: '2026-05-18', category: 'City' },
  { slug: 'dental-marketing-vancouver-bc', contentExcerpt: 'The dental market in Vancouver is one of the most competitive in Canada. With over 1,500 dentists in Metro Vancouver, patients have endless options — and they choose based on what they find online. The clinics growing fastest aren\'t the ones with the fanciest offices. They\'re the ones showing up first on Google when someone searches "dentist near me.', metaTitle: 'Dental Marketing Vancouver BC: Get More Patients | AP Digital', metaDescription: 'How dental clinics in Vancouver get more new-patient appointments with Google Ads and Meta Ads.', date: '2026-08-05', category: 'Dental Marketing' },
  { slug: 'gym-marketing-vancouver-bc', contentExcerpt: 'Vancouver\'s fitness market is saturated. From boutique studios in Yaletown to CrossFit boxes in East Van to big-box gyms in Surrey, every neighbourhood has multiple options competing for the same members. The gyms that win aren\'t the ones with the best equipment — they\'re the ones with the best marketing.', metaTitle: 'Gym Marketing Vancouver BC: More Members | AP Digital', metaDescription: 'How gyms and fitness studios in Vancouver grow membership with Meta Ads and social media.', date: '2026-08-05', category: 'Fitness Marketing' },
  { slug: 'restaurant-marketing-vancouver-bc', contentExcerpt: 'Vancouver\'s food scene is world-class — and brutally competitive. Over 4,000 restaurants compete for diners across Metro Vancouver, and the average restaurant lifespan is just 5 years. The ones that survive and thrive aren\'t always the best chefs — they\'re the ones people know about.', metaTitle: 'Restaurant Marketing Vancouver BC: Fill More Tables | AP Digital', metaDescription: 'How Vancouver restaurants get more reservations and walk-ins with Meta Ads and Instagram.', date: '2026-08-05', category: 'Restaurant Marketing' },
  { slug: 'how-much-do-instagram-ads-cost-canada', contentExcerpt: 'Instagram Ads in Canada typically cost $0.50–$3.50 per click, $6–$15 per thousand impressions (CPM), and $10–$60 per lead depending on your industry, targeting, and ad creative quality. This guide breaks down real 2026 pricing so you can budget with confidence.', metaTitle: 'How Much Do Instagram Ads Cost in Canada? 2026 Guide | AP Digital', metaDescription: 'Instagram Ads costs in Canada: CPC, CPM, cost per lead by industry. Real 2026 pricing for small businesses with budget recommendations.', date: '2026-08-11', category: 'Paid Ads' },
  { slug: 'google-ads-cost-small-business-canada', contentExcerpt: 'Google Ads in Canada cost $1–$15+ per click depending on your industry and competition. Most small businesses spend $800–$3,000/month on ad spend plus $500–$1,500/month for management. This guide gives you real 2026 numbers so you know exactly what to expect.', metaTitle: 'How Much Do Google Ads Cost in Canada? 2026 Small Business Guide | AP Digital', metaDescription: 'Google Ads costs for Canadian small businesses: CPC by industry, monthly budgets, and cost per lead. Real 2026 data with budget recommendations.', date: '2026-08-11', category: 'Paid Ads' },
  { slug: 'digital-marketing-budget-small-business-canada', contentExcerpt: 'Most Canadian small businesses should spend 5–15% of their gross revenue on marketing. For a business making $250,000/year, that\'s $12,500–$37,500/year — or roughly $1,000–$3,100/month. This guide breaks down exactly how to allocate that budget across channels for maximum ROI in 2026.', metaTitle: 'Digital Marketing Budget Guide for Canadian Small Business 2026 | AP Digital', metaDescription: 'How much should a Canadian small business spend on marketing? Budget breakdowns by revenue, channel allocation, and industry-specific recommendations for 2026.', date: '2026-08-11', category: 'Marketing Strategy' },
  { slug: 'best-crm-small-business-canada', contentExcerpt: 'A CRM (Customer Relationship Management) tool helps you track leads, follow up faster, and close more deals. With dozens of options available, picking the right one matters. This guide compares the top CRMs for Canadian small businesses with real 2026 pricing.', metaTitle: 'Best CRM for Small Business in Canada 2026 | AP Digital', metaDescription: 'Compare the best CRMs for Canadian small businesses in 2026. Pricing in CAD, features, and which CRM fits your industry — from free to enterprise.', date: '2026-08-11', category: 'Strategy' },
  { slug: 'how-to-get-more-google-reviews-canada', contentExcerpt: 'Google reviews are the single most important factor in local search rankings and the first thing potential customers check before contacting a business. Businesses with 50+ reviews get 266% more leads than those with fewer than 10. This guide gives you 10 proven methods to consistently generate more reviews for your Canadian business.', metaTitle: 'How to Get More Google Reviews in Canada (2026 Guide) | AP Digital', metaDescription: '10 proven methods to get more Google reviews for your Canadian business. Includes review request templates, response scripts, and what Google allows.', date: '2026-08-11', category: 'SEO' },
  { slug: 'how-much-does-seo-cost-canada', contentExcerpt: 'Most Canadian small businesses pay between $750 and $3,500 per month for ongoing SEO in 2026. One-off projects — a technical audit, a local SEO setup, a migration cleanup — run $1,500 to $7,500 depending on the size of the site. Freelancers and independent consultants bill $75 to $200 per hour, and agencies serving competitive national markets routinely quote $5,000 to $15,000 per month. That is the direct answer, and most articles on this subject will not give it to you.', metaTitle: 'How Much Does SEO Cost in Canada? 2026 Price Guide', metaDescription: 'Real 2026 SEO pricing in Canada: monthly retainers, one-off project costs, hourly rates, and what each budget actually buys you. No vague ranges.', date: '2026-08-21', dateModified: '2026-08-21', category: 'SEO' },
  { slug: 'how-much-does-email-marketing-cost-canada', contentExcerpt: 'Email marketing in Canada has two separate costs, and conflating them is why most pricing articles are useless. The software costs $30 to $500 per month for most small businesses, scaling with the size of your list. Having someone run it costs $500 to $1,500 per month for a freelancer, or $1,500 to $4,000 per month for an agency.', metaTitle: 'Email Marketing Cost in Canada: 2026 Price Guide', metaDescription: 'What email marketing actually costs in Canada in 2026 — software by list size, freelancer rates, agency retainers, and one-off setup fees. Real numbers.', date: '2026-08-21', dateModified: '2026-08-21', category: 'Strategy' },
  { slug: 'how-much-does-a-website-cost-canada', contentExcerpt: 'A professional small business website in Canada costs $2,000 to $8,000 from a freelancer and $8,000 to $25,000 from an agency in 2026. A DIY site built on a template platform costs $200 to $600 per year and nothing but your time. Custom builds and e-commerce start around $15,000 and run past $75,000 for anything genuinely complex.', metaTitle: 'How Much Does a Website Cost in Canada? 2026 Guide', metaDescription: 'Real 2026 website costs in Canada: DIY builders, freelancers, agencies and custom builds — plus the ongoing fees most quotes leave out.', date: '2026-08-21', dateModified: '2026-08-21', category: 'Digital Marketing' },
  { slug: 'tri-cities-google-ads-cost', contentExcerpt: 'A Tri-Cities business running Google Ads pays **two separate bills**: ad spend to Google, typically **$800 to $2,500 per month**, and management, typically **$759 to $2,000 per month**. All in, most Coquitlam, Port Moody and Port Coquitlam businesses run **$1,500 to $4,000 a month**.  Cost per click in the Tri-Cities g', metaTitle: 'Google Ads Cost Tri-Cities | Coquitlam & Port Moody | AP Digital', metaDescription: 'Google Ads for Tri-Cities businesses, managed from $759/month. First leads typically within 2 weeks. Month-to-month. No contracts.', date: '2026-08-24', dateModified: '2026-08-24', category: 'City' },
  { slug: 'marketing-agency-tri-cities', contentExcerpt: 'A marketing agency in the Tri-Cities costs **$759 to $2,500 per month** in management fees, plus ad spend paid directly to the platforms. Most Coquitlam, Port Moody and Port Coquitlam businesses end up between **$1,500 and $3,000 a month all in** once ad spend is included.  If you are at the point of hiring rather than', metaTitle: 'Marketing Agency Tri-Cities | Coquitlam, Port Moody | AP Digital', metaDescription: 'Google & Meta Ads for Tri-Cities businesses, managed from $759/month. First leads typically within 2 weeks. Month-to-month. No contracts.', date: '2026-08-24', dateModified: '2026-08-24', category: 'City' },
  { slug: 'salon-social-media-management-vancouver', contentExcerpt: 'Social media management for a Vancouver salon costs **$500 to $2,500 per month** depending on scope, and the single biggest variable is whether the price includes someone coming to the salon to shoot content. Ours is **$849/month** for two platforms, twelve custom posts, captions, scheduling and community management —', metaTitle: 'Salon Social Media Management Vancouver | AP Digital', metaDescription: 'Instagram & Meta content managed for Vancouver salons from $849/month. Posting, captions, community management. Month-to-month. No contracts.', date: '2026-08-24', dateModified: '2026-08-24', category: 'Salon Marketing' },
  { slug: 'how-to-get-more-salon-clients-vancouver', contentExcerpt: 'Almost every Vancouver salon that has stopped growing has one of four problems, and they need completely different fixes. Before spending anything, work out which one you have — because the money that solves a reach problem does nothing for a retention problem.  **Not enough people know you exist.** Your chairs are emp', metaTitle: 'How to Get More Salon Clients in Vancouver | AP Digital', metaDescription: 'Meta Ads & Instagram content for Vancouver salons, managed from $759/month. First leads typically within 2 weeks. Month-to-month. No contracts.', date: '2026-08-24', dateModified: '2026-08-24', category: 'Salon Marketing' },
  { slug: 'salon-marketing-surrey', contentExcerpt: 'Surrey is the hardest salon market in Metro Vancouver to advertise in, and the reason is geography. Newton, Guildford, South Surrey, Fleetwood and Cloverdale behave like five separate towns. A client in South Surrey will not drive to Guildford for a blow-dry, and an ad targeting "Surrey" wastes most of its budget reach', metaTitle: 'Salon Marketing Surrey BC | Fill Your Chairs | AP Digital', metaDescription: 'Meta Ads & Instagram content for Surrey salons, managed from $759/month. First leads typically within 2 weeks. Month-to-month. No contracts.', date: '2026-08-24', dateModified: '2026-08-24', category: 'Salon Marketing' },
  { slug: 'property-management-marketing-cost', dateModified: '2026-08-30', contentExcerpt: 'A property manager in BC should budget $800 to $2,000 per month in ad spend across a portfolio, plus $759/month for management. But budget against the cost of a vacant day, not a percentage of revenue: a unit renting at $1,800 a month loses roughly $60 for every day it sits empty, so cutting fourteen days off time-to-lease on one unit recovers about $840.', metaTitle: 'Property Management Marketing Cost in BC: 2026 Guide', metaDescription: 'What BC property managers pay to fill vacancies: ad spend by portfolio size, management fees, and the cost of a day empty. Real numbers.', date: '2026-08-30', category: 'Strategy' },
];

// ── FAQ data is read from the React source, never copied ────────────────────
// The prerendered HTML used to emit no FAQPage at all, and hand-copying every
// Q&A into this file would only recreate the drift that caused it. Parse the
// FAQs straight out of src/lib/blogPosts.ts so there is a single source of
// truth, and throw if the parse ever stops working rather than silently
// shipping pages with the markup missing.
function loadPostsFromSource() {
  const ts = readFileSync(resolve(__dirname, '../src/lib/blogPosts.ts'), 'utf-8');
  // Questions containing an apostrophe are written as double-quoted strings,
  // so both quote styles have to be accepted.
  const STR = String.raw`((?:'(?:[^'\\]|\\.)*')|(?:"(?:[^"\\]|\\.)*"))`;
  const unquote = (lit) => {
    const q = lit[0];
    return lit.slice(1, -1).replace(new RegExp(String.raw`\\([\\` + q + `])`, 'g'), '$1');
  };
  const pairRe = new RegExp(
    String.raw`\{\s*question:\s*` + STR + String.raw`\s*,\s*answer:\s*` + STR + String.raw`\s*\}`, 'g');
  const field = (text, key) => {
    const m = text.match(new RegExp(key + String.raw`:\s*` + STR));
    return m ? unquote(m[1]) : undefined;
  };

  const out = {};
  for (const chunk of ts.split(/\n\s*slug: /).slice(1)) {
    const slugMatch = chunk.match(new RegExp('^' + STR));
    if (!slugMatch) continue;
    const slug = unquote(slugMatch[1]);
    const head = chunk.slice(0, chunk.indexOf('content:'));

    const rec = {
      metaTitle: field(head, 'metaTitle'),
      metaDescription: field(head, 'metaDescription'),
      date: field(head, 'date'),
      dateModified: field(head, 'dateModified'),
      category: field(head, 'category'),
    };

    // The prerendered body used to be the excerpt alone, so all 453 in-body
    // contextual links across the blog were invisible to crawlers, and a
    // 1,400-word post was served to Google as two sentences.
    const contentStart = chunk.indexOf('content: `');
    if (contentStart !== -1) {
      const from = contentStart + 'content: `'.length;
      let i = from;
      while (i < chunk.length) {
        if (chunk[i] === '\\') { i += 2; continue; }
        if (chunk[i] === '`') break;
        i++;
      }
      rec.content = chunk.slice(from, i).replace(/\\([`$\\])/g, '$1');
    }

    const faqBlock = chunk.match(/\n\s*faqs:\s*\[([\s\S]*?)\n\s*\],/);
    if (faqBlock) {
      const faqs = [];
      pairRe.lastIndex = 0;
      let m;
      while ((m = pairRe.exec(faqBlock[1])) !== null) faqs.push({ q: unquote(m[1]), a: unquote(m[2]) });
      const expected = (faqBlock[1].match(/\bquestion:/g) || []).length;
      if (faqs.length !== expected) {
        throw new Error(
          `inject-meta: "${slug}" has ${expected} FAQ entries in blogPosts.ts but the parser ` +
          `extracted ${faqs.length}. Fix the parser rather than shipping incomplete FAQPage markup.`);
      }
      rec.faqs = faqs;
    }
    out[slug] = rec;
  }
  return out;
}

// ── areaServed must match the React source ─────────────────────────────────
// This file and src/lib/structuredData.ts each carry their own copy. They were
// already out of step — 8 flat strings here against 10 City objects there — so
// the tags Google crawled claimed a narrower service area than the app did.
{
  const ts = readFileSync(resolve(__dirname, '../src/lib/structuredData.ts'), 'utf-8');
  const block = ts.slice(ts.indexOf('const serviceAreaCities'), ts.indexOf('];', ts.indexOf('const serviceAreaCities')));
  const fromSource = [...block.matchAll(/"name":\s*"([^"]+)"/g)]
    .map((m) => m[1]).filter((n) => n !== 'British Columbia');
  const fromHere = (orgSchema.areaServed || []).map((a) => a.name);
  const missing = fromSource.filter((n) => !fromHere.includes(n));
  const extra = fromHere.filter((n) => !fromSource.includes(n));
  if (missing.length || extra.length) {
    throw new Error(
      `inject-meta: areaServed drift between this file and structuredData.ts. ` +
      `Missing here: [${missing}]. Only here: [${extra}].`);
  }
  console.log(`   areaServed: ${fromHere.length} areas, in step with structuredData.ts`);
}

const sourcePosts = loadPostsFromSource();
{
  // A new post added to blogPosts.ts but not to the list above used to be
  // silently skipped: no prerendered HTML, no meta, invisible to crawlers.
  const enumerated = new Set(blogPosts.map(p => p.slug));
  const orphans = Object.keys(sourcePosts).filter(slug => !enumerated.has(slug));
  if (orphans.length) {
    throw new Error(
      `inject-meta: ${orphans.length} post(s) in blogPosts.ts are missing from the ` +
      `blogPosts list in this file, so no HTML would be generated: [${orphans.join(', ')}].`);
  }
}
// blogPosts.ts is the single source of truth for post metadata. This file used
// to keep its own copy of metaTitle/metaDescription/dates, and 33 of 41 posts
// had drifted — meaning the tags Google crawled were not the ones the site
// showed. Anything present in source now overwrites the copy here.
let faqPostCount = 0, syncedFields = 0;
for (const post of blogPosts) {
  const src = sourcePosts[post.slug];
  if (!src) continue;
  for (const key of ['metaTitle', 'metaDescription', 'date', 'dateModified', 'category']) {
    if (src[key] !== undefined && src[key] !== post[key]) { post[key] = src[key]; syncedFields++; }
  }
  if (src.faqs) { post.faqs = src.faqs; faqPostCount++; }
  if (src.content) post.content = src.content;
}
console.log(`   FAQ schema: ${faqPostCount} posts carry FAQs (parsed from blogPosts.ts)`);
console.log(`   Meta sync:  ${syncedFields} field(s) refreshed from blogPosts.ts`);


// ── HTML generation helpers ─────────────────────────────────────────────────

// Every replacement below is passed as a function, not a string. String.replace()
// interprets $$, $&, $` and $' inside a replacement string, and the schema
// legitimately contains "$$" for priceRange plus dollar amounts throughout the
// body copy. Passing strings silently turned "$$" into "$" on all 83 pages —
// the source said the right thing and the output did not.
function injectIntoHtml(html, { title, description, canonical, schema, body, robots }) {
  // Replace title
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`);

  // Replace meta description
  html = html.replace(/<meta name="description"[^>]*\/?>/, () => `<meta name="description" content="${escapeAttr(description)}" />`);

  // Add canonical
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*\/?>/, () => `<link rel="canonical" href="${canonical}" />`);
  } else {
    html = html.replace('</head>', () => `  <link rel="canonical" href="${canonical}" />\n</head>`);
  }

  // Per-route robots override (the shell defaults to "index, follow")
  if (robots) {
    if (/<meta name="robots"/.test(html)) {
      html = html.replace(/<meta name="robots"[^>]*\/?>/, () => `<meta name="robots" content="${robots}" />`);
    } else {
      html = html.replace('</head>', () => `  <meta name="robots" content="${robots}" />\n</head>`);
    }
  }

  // Replace OG tags
  html = html.replace(/<meta property="og:url"[^>]*\/?>/, () => `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta property="og:title"[^>]*\/?>/, () => `<meta property="og:title" content="${escapeAttr(title)}" />`);
  html = html.replace(/<meta property="og:description"[^>]*\/?>/, () => `<meta property="og:description" content="${escapeAttr(description)}" />`);

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title"[^>]*\/?>/, () => `<meta name="twitter:title" content="${escapeAttr(title)}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*\/?>/, () => `<meta name="twitter:description" content="${escapeAttr(description)}" />`);

  // Inject JSON-LD schema
  if (schema) {
    if (schema['@graph'] && !schema['@graph'].some(n => n['@type'] === 'WebSite')) {
      schema['@graph'].unshift(websiteSchema);
    }
    const scriptTag = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
    html = html.replace('</head>', () => `${scriptTag}\n</head>`);
  }

  // Inject semantic body content (visible to crawlers, replaced by React hydration)
  if (body) {
    html = html.replace(
      '<div id="root"></div>',
      () => `<div id="root"><main id="main-content">${body}</main></div>`
    );
  }

  return html;
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/&(?!amp;|quot;|lt;|gt;)/g, '&amp;');
}

function writeRoute(path, html) {
  const indexDir = resolve(distDir, path);
  if (!existsSync(indexDir)) mkdirSync(indexDir, { recursive: true });
  writeFileSync(resolve(indexDir, 'index.html'), html);
  console.log(`  ✓ dist/${path}/index.html`);
}

// ── Homepage (highest-value SEO/GEO page) ──────────────────────────────────

const homepageHtml = injectIntoHtml(baseHtml, {
  title: 'Vancouver Digital Marketing Agency | AP Digital',
  description: 'Vancouver marketing agency for trades, salons, realtors & coaches. Meta & Google Ads that generate predictable leads. Month-to-month, from $759/mo.',
  canonical: BASE_URL + '/',
  schema: { "@context": "https://schema.org", "@graph": [
    websiteSchema, orgSchema, founderSchema,
    webPageSchema('Vancouver Digital Marketing Agency | AP Digital', 'Performance marketing agency for BC small businesses.', '/'),
    breadcrumb([{ name: 'Home', url: '/' }]),
  ]},
  body: '<h1>Vancouver Digital Marketing Agency — Predictable Leads for Local Businesses</h1><p>AP Digital is a Vancouver-based performance marketing agency that helps trades contractors, salons, real estate agents, coaches, dental clinics, gyms, and restaurants get predictable leads every month through Google Ads, Meta Ads, and social media. Founded by Arjun Sharma. Month-to-month. No contracts. 90-day results guarantee.</p><ul><li>Google Ads &amp; Meta Ads specialists</li><li>Trades contractors are our primary niche</li><li>From $759/month — no lock-in contracts</li><li>90-day results guarantee</li></ul><nav aria-label="Services"><ul><li><a href="/services/paid-ads">Paid Ads</a></li><li><a href="/services/social-media">Social Media</a></li><li><a href="/trades-marketing">Trades Marketing</a></li><li><a href="/salon-marketing">Salon Marketing</a></li><li><a href="/real-estate-marketing">Real Estate Marketing</a></li><li><a href="/dental-marketing">Dental Marketing</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/case-studies">Our Approach</a></li><li><a href="/contact">Book a Free Strategy Call</a></li></ul></nav>',
});
// Write homepage as dist/index.html (overwrite the SPA shell)
writeFileSync(resolve(distDir, 'index.html'), homepageHtml);
console.log('  ✓ dist/index.html (homepage)');

// ── Generate static pages ───────────────────────────────────────────────────

// ── Static page titles come from the React source too ──────────────────────
// The blog-post sync above never covered static routes, so /services/paid-ads
// shipped "Paid Ads Agency Vancouver" while its React source said "Google Ads
// Agency Vancouver" — and Google, crawling the prerendered version, attached
// that commercial query to an informational article instead. Ten static pages
// had drifted the same way.
function loadStaticMeta() {
  const app = readFileSync(resolve(__dirname, '../src/App.tsx'), 'utf-8');
  const routes = {};
  for (const m of app.matchAll(/<Route path="\/([^"]*)" element=\{<(\w+)/g)) routes[m[1]] = m[2];
  const files = {};
  for (const m of app.matchAll(/const (\w+) = lazy\(\(\) => import\("\.([^"]+)"\)\);/g)) files[m[1]] = m[2];
  for (const m of app.matchAll(/import (\w+) from "\.([^"]+)";/g)) files[m[1]] = m[2];

  const out = {};
  for (const [path, comp] of Object.entries(routes)) {
    const rel = files[comp];
    if (!rel) continue;
    const fp = resolve(__dirname, '../src' + rel + '.tsx');
    if (!existsSync(fp)) continue;
    const src = readFileSync(fp, 'utf-8');
    const t = src.match(/const TITLE = '((?:[^'\\]|\\.)*)'/);
    const d = src.match(/const DESC = '((?:[^'\\]|\\.)*)'/);
    // The rendered <h1>, flattened to text. Nine niche pages shipped an H1 in
    // the prerendered body that differed from the one on the page, and since
    // the prerendered body is what Google reads, the crawled version was the
    // only one that counted. Deriving it here means it cannot drift again.
    const hm = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    // JSX source already carries entities (&amp;), and the body is re-escaped
    // on the way out — so decode here first or the result is &amp;amp;.
    const h1 = hm
      ? hm[1].replace(/\{'\s*'\}/g, ' ').replace(/\{[^}]*\}/g, '')
             .replace(/<[^>]*>/g, '')
             .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
             .replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
             .replace(/\s+/g, ' ').trim()
      : undefined;
    if (t || d || h1) {
      out[path] = {
        title: t ? t[1].replace(/\\'/g, "'") : undefined,
        description: d ? d[1].replace(/\\'/g, "'") : undefined,
        h1: h1 || undefined,
      };
    }
  }
  return out;
}

{
  const reactTitles = loadStaticMeta();
  let synced = 0, h1Synced = 0;
  for (const route of staticRoutes) {
    const meta = reactTitles[route.path];
    if (!meta) continue;
    if (meta.title && meta.title !== route.title) { route.title = meta.title; synced++; }
    if (meta.description && meta.description !== route.description) { route.description = meta.description; synced++; }
    if (meta.h1 && route.body) {
      const cur = route.body.match(/<h1>([\s\S]*?)<\/h1>/);
      const want = meta.h1.replace(/&/g, '&amp;');
      if (cur && cur[1] !== want) {
        route.body = route.body.replace(/<h1>[\s\S]*?<\/h1>/, () => `<h1>${want}</h1>`);
        h1Synced++;
      }
    }
  }
  console.log(`   Static meta:   ${synced} field(s) synced from React source`);
}

// ── FAQ schema for static pages, read from the React source ────────────────
// Sixteen static pages rendered FAQ questions to visitors while the prerendered
// HTML carried no FAQPage at all, and the few that had one emitted 2-5 of 8-11.
// Same split-source problem as the blog posts. Parsed from the page component so
// the markup can only ever describe questions that are actually on the page.
function loadStaticFaqs() {
  const app = readFileSync(resolve(__dirname, '../src/App.tsx'), 'utf-8');
  const routes = {};
  for (const m of app.matchAll(/<Route path="\/([^"]*)" element=\{<(\w+)/g)) routes[m[1]] = m[2];
  const files = {};
  for (const m of app.matchAll(/const (\w+) = lazy\(\(\) => import\("\.([^"]+)"\)\);/g)) files[m[1]] = m[2];
  for (const m of app.matchAll(/import (\w+) from "\.([^"]+)";/g)) files[m[1]] = m[2];

  const STR = String.raw`((?:'(?:[^'\\]|\\.)*')|(?:"(?:[^"\\]|\\.)*"))`;
  const unquote = (lit) => {
    const q = lit[0];
    return lit.slice(1, -1).replace(new RegExp(String.raw`\\([\\` + q + `])`, 'g'), '$1');
  };
  const pairRe = new RegExp(
    String.raw`\{\s*question:\s*` + STR + String.raw`\s*,\s*answer:\s*` + STR + String.raw`\s*,?\s*\}`, 'g');

  const out = {};
  for (const [path, comp] of Object.entries(routes)) {
    const rel = files[comp];
    if (!rel) continue;
    const fp = resolve(__dirname, '../src' + rel + '.tsx');
    if (!existsSync(fp)) continue;
    const block = readFileSync(fp, 'utf-8').match(/const faqs = \[([\s\S]*?)\n\];/);
    if (!block) continue;

    const faqs = [];
    pairRe.lastIndex = 0;
    let m;
    while ((m = pairRe.exec(block[1])) !== null) faqs.push({ q: unquote(m[1]), a: unquote(m[2]) });

    const expected = (block[1].match(/\bquestion:/g) || []).length;
    if (faqs.length !== expected) {
      throw new Error(
        `inject-meta: /${path} has ${expected} FAQ entries in its component but the parser ` +
        `extracted ${faqs.length}. Fix the parser rather than shipping partial FAQPage markup.`);
    }
    if (faqs.length) out[path] = faqs;
  }
  return out;
}

{
  const staticFaqs = loadStaticFaqs();
  let added = 0, replaced = 0;
  for (const route of staticRoutes) {
    const faqs = staticFaqs[route.path];
    if (!faqs || !route.schema || !Array.isArray(route.schema['@graph'])) continue;
    const graph = route.schema['@graph'];
    const i = graph.findIndex((n) => n && n['@type'] === 'FAQPage');
    if (i >= 0) { graph[i] = faqSchema(faqs); replaced++; }
    else { graph.push(faqSchema(faqs)); added++; }
  }
  console.log(`   Static FAQs:   ${added} page(s) gained FAQPage, ${replaced} completed from source`);
}

// ── Give the prerendered body real substance ───────────────────────────────
// Every niche and city page shipped 39-59 words of HTML. Google runs JS so it
// sees the whole page, which is why these rank — but most AI crawlers do not,
// and this site's best lead arrived via an AI assistant. Those crawlers were
// judging a 40-word stub.
//
// The added text is the page's own FAQ content, which a visitor genuinely sees,
// so the prerendered version describes the same page rather than inventing a
// summary of it.
function expandBodyWithFaqs(body, faqs) {
  if (!faqs || !faqs.length) return body;
  const items = faqs.slice(0, 4).map(
    (f) => `<section><h2>${escapeHtml(f.q)}</h2><p>${escapeHtml(f.a)}</p></section>`).join('');
  const navAt = body.indexOf('<nav');
  const block = `<section aria-label="Common questions">${items}</section>`;
  return navAt >= 0 ? body.slice(0, navAt) + block + body.slice(navAt) : body + block;
}

{
  const staticFaqsForBody = loadStaticFaqs();
  let expanded = 0;
  for (const route of staticRoutes) {
    const faqs = staticFaqsForBody[route.path];
    if (!faqs || !route.body) continue;
    const before = route.body.length;
    route.body = expandBodyWithFaqs(route.body, faqs);
    if (route.body.length > before) expanded++;
  }
  console.log(`   Body depth:    ${expanded} static page(s) expanded with their own FAQ copy`);
}

console.log('\n📄 Generating static page HTML...');
for (const route of staticRoutes) {
  const html = injectIntoHtml(baseHtml, {
    title: route.title,
    description: route.description,
    canonical: `${BASE_URL}/${route.path}`,
    schema: route.schema,
    body: route.body || '',
    robots: route.robots,
  });
  writeRoute(route.path, html);
}


// ── Markdown → HTML for the prerendered blog body ───────────────────────────
// Deliberately small: the posts use only h2/h3, paragraphs, bullets, ordered
// lists, tables, bold and links. Anything richer should be added here rather
// than shipped as raw markdown text.
function renderMarkdown(md) {
  const inline = (t) => escapeHtml(t)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => `<a href="${href}">${text}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  const lines = md.split('\n');
  const out = [];
  let i = 0;

  const cells = (row) => row.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();

    if (!t) { i++; continue; }

    const h = t.match(/^(#{2,3})\s+(.*)$/);
    if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); i++; continue; }

    // table: header row, separator, then body rows
    if (t.startsWith('|') && (lines[i + 1] || '').trim().match(/^\|[\s:|-]+\|$/)) {
      const head = cells(t);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(cells(lines[i].trim())); i++; }
      out.push(
        '<table><thead><tr>' + head.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
        rows.map(r => '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') +
        '</tbody></table>');
      continue;
    }

    if (/^[-*]\s+/.test(t)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].trim().replace(/^[-*]\s+/, '')); i++; }
      out.push('<ul>' + items.map(x => `<li>${inline(x)}</li>`).join('') + '</ul>');
      continue;
    }

    if (/^\d+\.\s+/.test(t)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { items.push(lines[i].trim().replace(/^\d+\.\s+/, '')); i++; }
      out.push('<ol>' + items.map(x => `<li>${inline(x)}</li>`).join('') + '</ol>');
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|\||[-*]\s|\d+\.\s)/.test(lines[i].trim())) {
      para.push(lines[i].trim()); i++;
    }
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('');
}

// ── Generate blog post HTML ─────────────────────────────────────────────────

console.log('\n📝 Generating blog post HTML...');
for (const post of blogPosts) {
  const canonical = `${BASE_URL}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      orgSchema, founderSchema,
      articleSchema(post),
      breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.metaTitle.split(' | ')[0], url: `/blog/${post.slug}` },
      ]),
      webPageSchema(post.metaTitle, post.metaDescription, `/blog/${post.slug}`),
      // The React page emits FAQPage via getFAQSchema, but the prerendered
      // HTML never did — so the FAQ markup Google actually crawls was absent
      // on every post that has FAQs. Emit it here too when the post carries them.
      ...(post.faqs?.length ? [faqSchema(post.faqs)] : []),
    ]
  };
  const bodyContent = post.content
    ? renderMarkdown(post.content)
    : (post.contentExcerpt ? `<p>${escapeHtml(post.contentExcerpt)}</p>` : '');
  const body = `<article><h1>${escapeHtml(post.metaTitle.split(' | ')[0])}</h1><p>${escapeHtml(post.metaDescription)}</p>${bodyContent}<p>By <a href="/about/arjun-sharma">Arjun Sharma</a>, Founder of <a href="/about">AP Digital</a>. Published ${post.date}.</p></article><nav aria-label="Related"><ul><li><a href="/blog">All Articles</a></li><li><a href="/case-studies">Our Approach</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/trades-marketing">Trades Marketing</a></li><li><a href="/contact">Book a Free Call</a></li></ul></nav>`;
  const html = injectIntoHtml(baseHtml, {
    title: post.metaTitle,
    description: post.metaDescription,
    canonical,
    schema,
    body,
  });
  writeRoute(`blog/${post.slug}`, html);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


// ── Legacy /blog/ URLs that still rank ──────────────────────────────────────
// The live host does not honour vercel.json, so its redirects never fire and
// these URLs served the SPA shell as soft 404s. A static stub per URL works on
// any host: it carries a canonical to the surviving post so Google consolidates
// the ranking, and bounces a human immediately.
function loadLegacyRedirects() {
  const ts = readFileSync(resolve(__dirname, '../src/lib/legacyRedirects.ts'), 'utf-8');
  const body = ts.slice(ts.indexOf('LEGACY_BLOG_REDIRECTS'));
  const out = {};
  for (const m of body.matchAll(/'([a-z0-9-]+)':\s*'([a-z0-9-]+)'/g)) out[m[1]] = m[2];
  if (Object.keys(out).length === 0) {
    throw new Error('inject-meta: parsed 0 legacy redirects — the parser is out of date.');
  }
  return out;
}

const legacyRedirects = loadLegacyRedirects();

// vercel.json holds the same map for the day this moves to a host that reads
// it. Assert rather than duplicate silently.
{
  const vercel = JSON.parse(readFileSync(resolve(__dirname, '../vercel.json'), 'utf-8'));
  const inVercel = Object.fromEntries(
    (vercel.redirects || [])
      .filter((r) => r.source.startsWith('/blog/'))
      .map((r) => [r.source.replace('/blog/', ''), r.destination.replace('/blog/', '')]));
  const keys = new Set([...Object.keys(legacyRedirects), ...Object.keys(inVercel)]);
  const drifted = [...keys].filter((k) => legacyRedirects[k] !== inVercel[k]);
  if (drifted.length) {
    throw new Error(
      `inject-meta: legacyRedirects.ts and vercel.json disagree on: ${drifted.join(', ')}. ` +
      `Update both, or the two hosts would behave differently.`);
  }
}

let stubCount = 0;
for (const [from, to] of Object.entries(legacyRedirects)) {
  if (!blogPosts.some((p) => p.slug === to)) {
    throw new Error(`inject-meta: legacy redirect "${from}" points at "${to}", which is not a live post.`);
  }
  const target = `${BASE_URL}/blog/${to}`;
  const stub = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved — AP Digital</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=/blog/${to}">
<!-- No noindex here on purpose: noindex alongside a canonical is a
     conflicting signal and can get the URL dropped instead of having
     its ranking folded into the target. The canonical plus a zero-delay
     refresh is what consolidates it. -->
</head>
<body>
<p>This page has moved to <a href="/blog/${to}">${target}</a>.</p>
<script>window.location.replace('/blog/${to}');</script>
</body>
</html>
`;
  const dir = resolve(distDir, 'blog', from);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), stub);
  stubCount++;
}
console.log(`   Legacy URLs: ${stubCount} redirect stub(s) written`);

console.log('\n✅ Meta injection complete.');
console.log(`   ${staticRoutes.length} pages + ${blogPosts.length} blog posts generated.`);
