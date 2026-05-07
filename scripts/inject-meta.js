import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const baseHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

const BASE_URL = 'https://ap-digital.ca';

const orgSchema = {
  "@type": ["LocalBusiness", "MarketingAgency"],
  "@id": `${BASE_URL}/#organization`,
  "name": "AP Digital",
  "url": BASE_URL,
  "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png` },
  "telephone": "+1-778-682-5772",
  "email": "apdigital.core@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vancouver",
    "addressRegion": "BC",
    "addressCountry": "CA"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 49.2827, "longitude": -123.1207 },
  "areaServed": ["Vancouver", "Surrey", "Burnaby", "Langley", "Coquitlam", "Metro Vancouver"],
  "sameAs": [
    "https://www.instagram.com/theapdigital/",
    "https://www.facebook.com/apdigital",
    "https://www.linkedin.com/company/apdigital"
  ],
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
};

function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`
    }))
  };
}

function serviceSchema(name, desc, path) {
  return {
    "@type": "Service",
    "name": name,
    "description": desc,
    "url": `${BASE_URL}${path}`,
    "provider": { "@id": `${BASE_URL}/#organization` },
    "areaServed": { "@type": "Country", "name": "Canada" }
  };
}

function webPageSchema(name, desc, path) {
  return {
    "@type": "WebPage",
    "@id": `${BASE_URL}${path}#webpage`,
    "url": `${BASE_URL}${path}`,
    "name": name,
    "description": desc,
    "inLanguage": "en-CA",
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "publisher": { "@id": `${BASE_URL}/#organization` }
  };
}

function articleSchema(post) {
  return {
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blog/${post.slug}#article`,
    "headline": post.title,
    "name": post.metaTitle,
    "description": post.metaDescription,
    "datePublished": post.date,
    "dateModified": post.date,
    "inLanguage": "en-CA",
    "url": `${BASE_URL}/blog/${post.slug}`,
    "image": { "@type": "ImageObject", "url": `${BASE_URL}/og-image.png`, "width": 1200, "height": 630 },
    "articleSection": post.category,
    "author": { "@id": `${BASE_URL}/#organization` },
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "mainEntityOfPage": { "@id": `${BASE_URL}/blog/${post.slug}#webpage` }
  };
}

// ── Static pages ──────────────────────────────────────────────────────────────

const staticRoutes = [
  {
    path: 'trades-marketing',
    title: 'Trades Marketing BC | Plumber, HVAC & Electrician Leads | AP Digital',
    description: 'AP Digital gets BC plumbers, electricians, HVAC companies & roofers 20–50 qualified leads/month via Google & Meta Ads. No contracts. Starts at $500/month.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Trades Marketing', 'Lead generation for BC plumbers, electricians, HVAC & roofers using Meta Ads & Google Ads.', '/trades-marketing'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Trades Marketing', url: '/trades-marketing' }]),
        webPageSchema('Trades Marketing Agency BC | AP Digital', 'Lead generation for BC trades businesses using Meta Ads & Google Ads.', '/trades-marketing'),
      ]
    }
  },
  {
    path: 'salon-marketing',
    title: 'Salon Marketing Vancouver | Fill Your Chair Every Week | AP Digital',
    description: 'Get 20–40 new salon clients/month with Meta Ads & Instagram content. AP Digital serves Vancouver salons. Month-to-month. No contracts.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Salon Marketing', 'Social media & paid ads for Vancouver salons. Get consistent bookings every week.', '/salon-marketing'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Salon Marketing', url: '/salon-marketing' }]),
        webPageSchema('Salon Marketing Agency Vancouver | AP Digital', 'Meta Ads & social media for Vancouver salons.', '/salon-marketing'),
      ]
    }
  },
  {
    path: 'real-estate-marketing',
    title: 'Real Estate Marketing BC | Buyer & Seller Leads | AP Digital',
    description: 'AP Digital generates 15–30 buyer & seller leads/month for BC realtors using Meta Ads. Serving Vancouver, Surrey & Burnaby. Month-to-month.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Real Estate Marketing', 'Buyer & seller lead generation for BC realtors using Meta Ads & Google Ads.', '/real-estate-marketing'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Real Estate Marketing', url: '/real-estate-marketing' }]),
        webPageSchema('Real Estate Marketing Agency BC | AP Digital', 'Lead generation for BC realtors & brokerages.', '/real-estate-marketing'),
      ]
    }
  },
  {
    path: 'coaching-marketing',
    title: 'Coaching Marketing BC | Get Consistent Clients | AP Digital',
    description: 'AP Digital helps BC life, business & fitness coaches get 20–40 new leads/month with Meta Ads funnels. Month-to-month. No lock-in contracts.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Coaching Marketing', 'Meta Ads & social media marketing for coaches & consultants across BC.', '/coaching-marketing'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Coaching Marketing', url: '/coaching-marketing' }]),
        webPageSchema('Coaching Marketing Agency BC | AP Digital', 'Lead generation for BC coaches & consultants.', '/coaching-marketing'),
      ]
    }
  },
  {
    path: 'services/paid-ads',
    title: 'Paid Ads Agency Vancouver | Meta & Google Ads | AP Digital',
    description: 'AP Digital manages Meta & Google Ads for Vancouver salons, trades, realtors & coaches. 5–10× ROAS. First leads within 2 weeks. Month-to-month.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Paid Advertising', 'Meta Ads & Google Ads management for Vancouver small businesses.', '/services/paid-ads'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Paid Ads', url: '/services/paid-ads' }]),
        webPageSchema('Paid Ads Agency Vancouver | AP Digital', 'Meta & Google Ads for Vancouver businesses.', '/services/paid-ads'),
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How much do paid ads cost in Vancouver?", "acceptedAnswer": { "@type": "Answer", "text": "Most clients invest $500–$1,500/month in ad spend plus a management fee quoted upfront. No hidden costs." } },
            { "@type": "Question", "name": "How fast will I see results from paid ads?", "acceptedAnswer": { "@type": "Answer", "text": "Most clients see their first qualified leads within two weeks of campaign launch." } },
            { "@type": "Question", "name": "Should I use Facebook Ads or Google Ads?", "acceptedAnswer": { "@type": "Answer", "text": "It depends on your business. Meta Ads excel for brand awareness and visual offers. Google Ads capture high-intent searches. Many clients benefit from both." } },
            { "@type": "Question", "name": "Do you require a long-term contract?", "acceptedAnswer": { "@type": "Answer", "text": "No. All paid ads management is month-to-month. We earn your business with results, not lock-in contracts." } }
          ]
        }
      ]
    }
  },
  {
    path: 'services/social-media',
    title: 'Social Media Marketing Vancouver | Reels & Content | AP Digital',
    description: 'AP Digital manages social media for Vancouver salons, trades & realtors. Instagram Reels, short-form video & organic growth. Month-to-month.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Social Media Marketing', 'Social media management & content creation for Vancouver small businesses.', '/services/social-media'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Social Media', url: '/services/social-media' }]),
        webPageSchema('Social Media Marketing Vancouver | AP Digital', 'Social media management for Vancouver businesses.', '/services/social-media'),
      ]
    }
  },
  {
    path: 'services/content-creation',
    title: 'Content Creation Agency Vancouver | Reels & Social Video | AP Digital',
    description: 'AP Digital creates scroll-stopping Reels, short-form video & social posts for Vancouver small businesses. Content that drives bookings and leads.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Content Creation', 'Short-form video & social content creation for Vancouver businesses.', '/services/content-creation'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Content Creation', url: '/services/content-creation' }]),
        webPageSchema('Content Creation Agency Vancouver | AP Digital', 'Short-form video & Reels for Vancouver businesses.', '/services/content-creation'),
      ]
    }
  },
  {
    path: 'services/seo',
    title: 'SEO Agency Vancouver | Page 1 Rankings in 90 Days | AP Digital',
    description: 'AP Digital provides local SEO for Vancouver salons, trades, realtors & coaches. Most clients reach page 1 within 90–180 days. Month-to-month.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Search Engine Optimization (SEO)', 'Local SEO for Vancouver small businesses. Rank higher on Google in 90–180 days.', '/services/seo'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'SEO Services', url: '/services/seo' }]),
        webPageSchema('SEO Agency Vancouver | AP Digital', 'Local SEO for Vancouver salons, trades & realtors.', '/services/seo'),
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How long does SEO take to show results?", "acceptedAnswer": { "@type": "Answer", "text": "Most clients see ranking improvements within 60–90 days and meaningful traffic growth within 4–6 months. Local SEO with Google Business Profile optimization can show results within 30 days." } },
            { "@type": "Question", "name": "How much do SEO services cost in Vancouver?", "acceptedAnswer": { "@type": "Answer", "text": "Our SEO packages start at $750/month for local SEO. All quotes are upfront with no lock-in contracts." } },
            { "@type": "Question", "name": "Can you guarantee first-page rankings?", "acceptedAnswer": { "@type": "Answer", "text": "No reputable SEO agency can guarantee specific rankings. We guarantee transparent monthly reporting and proven strategies. The majority of our clients reach page one within 6 months." } }
          ]
        }
      ]
    }
  },
  {
    path: 'services/lead-generation',
    title: 'Lead Generation Agency Vancouver | 2,400+ Leads Delivered',
    description: 'AP Digital has delivered 2,400+ leads for Vancouver salons, trades, realtors & coaches. 5–10× ROAS. First leads within 2 weeks. Month-to-month.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Lead Generation', 'Paid ads & content systems that generate consistent leads for Vancouver businesses.', '/services/lead-generation'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Lead Generation', url: '/services/lead-generation' }]),
        webPageSchema('Lead Generation Agency Vancouver | AP Digital', 'Predictable lead generation for Vancouver businesses.', '/services/lead-generation'),
      ]
    }
  },
  {
    path: 'services/web-design',
    title: 'Web Design Agency Vancouver | Built to Generate Leads | AP Digital',
    description: 'AP Digital builds fast, lead-generating websites for Vancouver salons, trades, realtors & coaches. Mobile-first, SEO-ready, conversion-focused.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Web Design', 'Conversion-focused websites for Vancouver small businesses.', '/services/web-design'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Web Design', url: '/services/web-design' }]),
        webPageSchema('Web Design Agency Vancouver | AP Digital', 'Fast, lead-generating websites for Vancouver businesses.', '/services/web-design'),
      ]
    }
  },
  {
    path: 'about',
    title: 'About AP Digital | Founded by Arjun Sharma | Vancouver Marketing Agency',
    description: 'AP Digital was founded by Arjun Sharma in Vancouver, BC. We specialize in lead generation for salons, trades, real estate & coaches. Personal management, no contracts.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        { "@type": "Person", "@id": `${BASE_URL}/about#person`, "name": "Arjun Sharma", "jobTitle": "Founder & Lead Strategist", "worksFor": { "@id": `${BASE_URL}/#organization` }, "url": `${BASE_URL}/about` },
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]),
        webPageSchema('About AP Digital | Arjun Sharma', 'Founded by Arjun Sharma in Vancouver, BC.', '/about'),
      ]
    }
  },
  {
    path: 'contact',
    title: 'Book a Free Strategy Call | AP Digital Vancouver',
    description: 'Book a free 20-minute strategy call with AP Digital. We will show you how many leads are available in your area. No pitch. No pressure. No contracts.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]),
        webPageSchema('Contact AP Digital | Book a Free Strategy Call', 'Book a free call with AP Digital Vancouver.', '/contact'),
      ]
    }
  },
  {
    path: 'blog',
    title: 'Digital Marketing Blog | AP Digital Vancouver',
    description: 'Paid ads, SEO & lead generation guides for Vancouver salons, trades businesses, realtors & coaches. Proven strategies from AP Digital.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]),
        webPageSchema('Digital Marketing Blog | AP Digital', 'Marketing guides for Vancouver salons, trades & realtors.', '/blog'),
      ]
    }
  },
  {
    path: 'surrey',
    title: 'Digital Marketing Agency Surrey BC | Leads for Local Business',
    description: 'AP Digital helps Surrey salons, trades, realtors & coaches get consistent leads with Meta & Google Ads. Month-to-month. No contracts.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Digital Marketing Surrey BC', 'Lead generation for Surrey small businesses using Meta Ads & Google Ads.', '/surrey'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Surrey', url: '/surrey' }]),
        webPageSchema('Digital Marketing Agency Surrey BC | AP Digital', 'Meta & Google Ads for Surrey businesses.', '/surrey'),
        {
          "@type": "LocalBusiness",
          "@id": `${BASE_URL}/surrey#localbusiness`,
          "name": "AP Digital — Surrey Digital Marketing Agency",
          "url": `${BASE_URL}/surrey`,
          "telephone": "+1-778-682-5772",
          "areaServed": [
            { "@type": "City", "name": "Surrey" },
            { "@type": "City", "name": "White Rock" },
            { "@type": "City", "name": "Delta" },
            { "@type": "City", "name": "Langley" }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How quickly will I see leads in Surrey?", "acceptedAnswer": { "@type": "Answer", "text": "Most Surrey businesses see their first leads within 2 weeks of launching Meta Ads with AP Digital." } },
            { "@type": "Question", "name": "Do I have to sign a long-term contract?", "acceptedAnswer": { "@type": "Answer", "text": "No contracts. We work month-to-month with every Surrey client." } },
            { "@type": "Question", "name": "How much does digital marketing cost in Surrey?", "acceptedAnswer": { "@type": "Answer", "text": "Most clients start with $500–$1,500/month in ad spend. Our management fee is transparent and quoted upfront." } }
          ]
        }
      ]
    }
  },
  {
    path: 'burnaby',
    title: 'Digital Marketing Agency Burnaby BC | Leads for Local Business',
    description: 'AP Digital helps Burnaby salons, trades, realtors & coaches get more leads with Meta & Google Ads. Month-to-month. No contracts.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Digital Marketing Burnaby BC', 'Lead generation for Burnaby small businesses using Meta Ads & Google Ads.', '/burnaby'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Burnaby', url: '/burnaby' }]),
        webPageSchema('Digital Marketing Agency Burnaby BC | AP Digital', 'Meta & Google Ads for Burnaby businesses.', '/burnaby'),
        {
          "@type": "LocalBusiness",
          "@id": `${BASE_URL}/burnaby#localbusiness`,
          "name": "AP Digital — Burnaby Digital Marketing Agency",
          "url": `${BASE_URL}/burnaby`,
          "telephone": "+1-778-682-5772",
          "areaServed": [{ "@type": "City", "name": "Burnaby" }]
        }
      ]
    }
  },
  {
    path: 'langley',
    title: 'Digital Marketing Agency Langley BC | Leads for Local Business',
    description: 'AP Digital helps Langley salons, trades, realtors & coaches get predictable leads with Meta & Google Ads. Month-to-month. No contracts.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Digital Marketing Langley BC', 'Lead generation for Langley small businesses using Meta Ads & Google Ads.', '/langley'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Langley', url: '/langley' }]),
        webPageSchema('Digital Marketing Agency Langley BC | AP Digital', 'Meta & Google Ads for Langley businesses.', '/langley'),
        {
          "@type": "LocalBusiness",
          "@id": `${BASE_URL}/langley#localbusiness`,
          "name": "AP Digital — Langley Digital Marketing Agency",
          "url": `${BASE_URL}/langley`,
          "telephone": "+1-778-682-5772",
          "areaServed": [{ "@type": "City", "name": "Langley" }]
        }
      ]
    }
  },
  {
    path: 'coquitlam',
    title: 'Digital Marketing Agency Coquitlam BC | Leads for Local Business',
    description: 'AP Digital helps Coquitlam salons, trades, realtors & coaches generate more leads with Meta & Google Ads. Month-to-month. No contracts.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        orgSchema,
        serviceSchema('Digital Marketing Coquitlam BC', 'Lead generation for Coquitlam businesses using Meta Ads & Google Ads.', '/coquitlam'),
        breadcrumb([{ name: 'Home', url: '/' }, { name: 'Coquitlam', url: '/coquitlam' }]),
        webPageSchema('Digital Marketing Agency Coquitlam BC | AP Digital', 'Meta & Google Ads for Coquitlam businesses.', '/coquitlam'),
        {
          "@type": "LocalBusiness",
          "@id": `${BASE_URL}/coquitlam#localbusiness`,
          "name": "AP Digital — Coquitlam Digital Marketing Agency",
          "url": `${BASE_URL}/coquitlam`,
          "telephone": "+1-778-682-5772",
          "areaServed": [{ "@type": "City", "name": "Coquitlam" }]
        }
      ]
    }
  }
];

// ── Blog posts ────────────────────────────────────────────────────────────────

const blogPosts = [
  { slug: 'how-to-get-more-salon-clients', metaTitle: 'How to Get More Salon Clients in 2026 | AP Digital', metaDescription: 'Struggling to fill your appointment book? Proven strategies to get more salon clients using social media, paid ads & referrals in Vancouver, BC.', date: '2026-03-10', category: 'Salon Marketing' },
  { slug: 'how-to-market-a-trades-business-online', metaTitle: 'How to Market a Trades Business Online in Canada | AP Digital', metaDescription: 'A practical guide to online marketing for tradespeople in Canada. Learn how plumbers, electricians & HVAC techs get leads with Google Ads, Meta Ads & SEO.', date: '2026-03-12', category: 'Trades Marketing' },
  { slug: 'real-estate-agent-social-media-tips', metaTitle: 'Social Media Tips for Real Estate Agents Canada | AP Digital', metaDescription: 'The top social media strategies for Canadian real estate agents that generate buyer & seller leads in 2026.', date: '2026-03-12', category: 'Real Estate Marketing' },
  { slug: 'how-much-does-social-media-marketing-cost-canada', metaTitle: 'How Much Does Social Media Marketing Cost in Canada? | AP Digital', metaDescription: 'Transparent breakdown of social media marketing costs for Canadian businesses — agency fees, ad spend & what to expect at every price point.', date: '2026-03-12', category: 'Marketing Strategy' },
  { slug: 'best-ads-platform-for-small-business-canada', metaTitle: 'Facebook Ads vs Google Ads for Small Business in Canada 2026 | AP Digital', metaDescription: 'Meta Ads or Google Ads — which is better for your Canadian small business? Head-to-head comparison with costs, niches & recommendations.', date: '2026-03-12', category: 'Paid Advertising' },
  { slug: 'social-media-marketing-cost-canada', metaTitle: 'Social Media Marketing Cost Canada 2026 | AP Digital', metaDescription: "Full breakdown of social media marketing costs for Canadian businesses — from DIY to full-service agency. Know what you're paying for before you spend a dollar.", date: '2026-03-17', category: 'Marketing Strategy' },
  { slug: 'facebook-ads-vs-google-ads', metaTitle: 'Facebook Ads vs Google Ads: Which Is Better for Canadian Business? | AP Digital', metaDescription: "Facebook Ads vs Google Ads — what's the difference and which should you run? AP Digital breaks down both platforms for Canadian small businesses.", date: '2026-03-17', category: 'Paid Advertising' },
  { slug: 'real-estate-social-media-tips', metaTitle: 'Real Estate Social Media Tips That Generate Leads | AP Digital', metaDescription: "Stop posting just for likes. Real estate social media strategies that generate actual buyer & seller leads for Canadian realtors in 2026.", date: '2026-03-17', category: 'Real Estate Marketing' },
  { slug: 'email-marketing-vs-social-media', metaTitle: 'Email Marketing vs Social Media: What Works in 2026? | AP Digital', metaDescription: 'Email or social media — where should your business focus? We compare both channels for Canadian small businesses so you can make the smartest marketing choice.', date: '2026-07-10', category: 'Marketing Strategy' },
  { slug: 'best-ads-for-trades-businesses-canada', metaTitle: 'Best Ads for Trades Businesses in Canada | AP Digital', metaDescription: 'Which platform works best for plumbers, HVAC, electricians & roofers in Canada? We break down Meta Ads vs Google Ads for trades businesses.', date: '2026-08-05', category: 'Trades Marketing' },
  { slug: 'digital-marketing-agency-vancouver-bc', metaTitle: 'Digital Marketing Agency Vancouver BC | AP Digital', metaDescription: 'Looking for a digital marketing agency in Vancouver, BC? AP Digital helps local businesses get more leads with paid ads & social media. No contracts.', date: '2026-03-15', category: 'Agency' },
  { slug: 'salon-marketing-vancouver-bc', metaTitle: 'Salon Marketing Vancouver BC: Get More Clients | AP Digital', metaDescription: 'The complete guide to salon marketing in Vancouver, BC. Instagram ads, Google Ads & local SEO strategies to fill your bookings week after week.', date: '2026-03-17', category: 'Salon Marketing' },
  { slug: 'trades-marketing-vancouver-bc', metaTitle: 'Trades Marketing Vancouver BC: Get More Leads | AP Digital', metaDescription: 'How trades businesses in Vancouver, BC get a steady flow of leads online. Paid ads & SEO strategies for plumbers, HVAC, electricians & roofers.', date: '2026-03-18', category: 'Trades Marketing' },
  { slug: 'real-estate-agent-marketing-vancouver-bc', metaTitle: 'Real Estate Agent Marketing Vancouver BC | AP Digital', metaDescription: 'How Vancouver realtors get consistent leads in 2026 using Meta Ads, social media & Google Ads. Practical guide for BC real estate agents.', date: '2026-03-19', category: 'Real Estate Marketing' },
  { slug: 'meta-ads-cost-contractors-bc', metaTitle: 'How Much Do Meta Ads Cost for Contractors in BC? | AP Digital', metaDescription: 'Realistic Meta Ads budgets for plumbers, HVAC, electricians & roofers in Metro Vancouver. Know what to spend before launching your first campaign.', date: '2026-03-20', category: 'Trades Marketing' },
  { slug: 'hvac-marketing-vancouver-bc', metaTitle: 'HVAC Marketing Vancouver BC: Get More Leads | AP Digital', metaDescription: 'How HVAC companies in Vancouver, BC get consistent service calls using Meta Ads, Google Ads & local SEO. Real strategies that work.', date: '2026-03-21', category: 'Trades Marketing' },
  { slug: 'coaching-clients-bc', metaTitle: 'How to Get More Coaching Clients in BC | AP Digital', metaDescription: "Struggling to find coaching clients in BC? How fitness, business & life coaches use paid ads & social media to grow their practice.", date: '2026-03-22', category: 'Coaching Marketing' },
  { slug: 'plumber-marketing-metro-vancouver', metaTitle: 'Plumber Marketing Metro Vancouver: Get More Calls | AP Digital', metaDescription: 'How plumbing companies in Metro Vancouver get more service calls with Google Ads, Meta Ads & local SEO. Lead generation guide for BC plumbers.', date: '2026-03-23', category: 'Trades Marketing' },
  { slug: 'electrician-leads-bc', metaTitle: 'How Electricians Get More Leads in BC | AP Digital', metaDescription: 'The best ways for BC electricians to generate consistent leads online. Paid ads, Google Business Profile & local SEO for electrical contractors.', date: '2026-03-24', category: 'Trades Marketing' },
  { slug: 'best-digital-marketing-agency-vancouver', metaTitle: 'Best Digital Marketing Agency Vancouver 2026 | AP Digital', metaDescription: 'Looking for the best digital marketing agency in Vancouver? What to look for, red flags to avoid, and how to pick an agency that delivers real ROI.', date: '2026-04-01', category: 'Agency' },
  { slug: 'vancouver-small-business-seo-guide', metaTitle: 'Vancouver Small Business SEO Guide 2026 | AP Digital', metaDescription: 'How Vancouver small businesses rank higher on Google with local SEO, Google Business Profile optimization, and content strategy. Complete 2026 guide.', date: '2026-04-05', category: 'SEO' },
  { slug: 'facebook-ads-vancouver-small-business', metaTitle: 'Facebook Ads for Vancouver Small Business 2026 | AP Digital', metaDescription: 'How Vancouver small businesses use Facebook & Instagram ads to generate leads and grow. Targeting tips, budget advice, and real campaign strategies.', date: '2026-04-08', category: 'Paid Advertising' },
  { slug: 'vancouver-google-ads-guide-local-business', metaTitle: 'Google Ads Vancouver: Local Business Guide 2026 | AP Digital', metaDescription: 'How Vancouver local businesses use Google Ads & Local Service Ads to get more calls, leads, and booked jobs. Complete strategy guide.', date: '2026-04-10', category: 'Paid Advertising' },
  { slug: 'social-media-marketing-vancouver', metaTitle: 'Social Media Marketing Vancouver 2026 | AP Digital', metaDescription: 'What social media strategies actually work for Vancouver local businesses in 2026. Platform selection, content ideas, and real growth tactics.', date: '2026-04-12', category: 'Social Media' },
];

// ── HTML generation helpers ───────────────────────────────────────────────────

function injectIntoHtml(html, { title, description, canonical, schema }) {
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description"[^>]*\/?>/, `<meta name="description" content="${description}" />`);
  } else {
    html = html.replace('</head>', `<meta name="description" content="${description}" />\n</head>`);
  }

  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  } else {
    html = html.replace('</head>', `<link rel="canonical" href="${canonical}" />\n</head>`);
  }

  if (schema) {
    const scriptTag = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
    html = html.replace('</head>', `${scriptTag}\n</head>`);
  }

  return html;
}

function writeRoute(path, html) {
  const parts = path.split('/');
  const filename = parts.pop();
  const parentDir = parts.length > 0 ? resolve(distDir, ...parts) : distDir;
  if (!existsSync(parentDir)) mkdirSync(parentDir, { recursive: true });
  writeFileSync(resolve(parentDir, `${filename}.html`), html);
  console.log(`  ✓ dist/${path}.html`);

  const indexDir = resolve(distDir, path);
  if (!existsSync(indexDir)) mkdirSync(indexDir, { recursive: true });
  writeFileSync(resolve(indexDir, 'index.html'), html);
}

// ── Generate static pages ─────────────────────────────────────────────────────

console.log('\n📄 Generating static page HTML...');
for (const route of staticRoutes) {
  const html = injectIntoHtml(baseHtml, {
    title: route.title,
    description: route.description,
    canonical: `${BASE_URL}/${route.path}`,
    schema: route.schema,
  });
  writeRoute(route.path, html);
}

// ── Generate blog post HTML ───────────────────────────────────────────────────

console.log('\n📝 Generating blog post HTML...');
for (const post of blogPosts) {
  const canonical = `${BASE_URL}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      orgSchema,
      articleSchema(post),
      breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.metaTitle, url: `/blog/${post.slug}` },
      ]),
      webPageSchema(post.metaTitle, post.metaDescription, `/blog/${post.slug}`),
    ]
  };
  const html = injectIntoHtml(baseHtml, {
    title: post.metaTitle,
    description: post.metaDescription,
    canonical,
    schema,
  });
  writeRoute(`blog/${post.slug}`, html);
}

console.log('\n✅ Meta injection complete.');
