const BASE_URL = 'https://ap-digital.ca';
const ORG_NAME = 'AP DIGITAL';
const OG_IMAGE = `${BASE_URL}/og-image.png`;
const LOGO = `${BASE_URL}/logo.png`;

export const founderSchema = {
  "@type": "Person",
  "@id": `${BASE_URL}/#founder`,
  "name": "Arjun Sharma",
  "jobTitle": "Founder & Lead Strategist",
  "description": "Arjun Sharma is the founder of AP DIGITAL, a performance marketing agency in Vancouver, BC. He personally manages every client account, specializing in Google Ads, Meta Ads, and social media marketing for service businesses across British Columbia.",
  "url": `${BASE_URL}/about`,
  "worksFor": { "@id": `${BASE_URL}/#organization` },
  "knowsAbout": [
    "Google Ads",
    "Meta Ads",
    "Facebook Advertising",
    "Instagram Marketing",
    "Social Media Marketing",
    "Pay-Per-Click Advertising",
    "Lead Generation",
    "Digital Marketing Strategy",
    "Local SEO",
    "Performance Marketing"
  ],
  "sameAs": [
    "https://www.linkedin.com/company/theapdigital/",
    "https://www.instagram.com/theapdigital/"
  ]
};

const serviceAreaCities = [
  { "@type": "City", "name": "Vancouver", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
  { "@type": "City", "name": "Surrey", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
  { "@type": "City", "name": "Burnaby", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
  { "@type": "City", "name": "Richmond", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
  { "@type": "City", "name": "Langley", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
  { "@type": "City", "name": "Coquitlam", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
  { "@type": "City", "name": "Abbotsford", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
  { "@type": "City", "name": "North Vancouver", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
  { "@type": "City", "name": "New Westminster", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
  { "@type": "City", "name": "Delta", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
];

export const reviewSchemas = [
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Jordan M." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "AP Digital completely transformed our salon's booking flow. We went from relying on walk-ins to having a full calendar weeks in advance. Arjun is hands-on and actually knows what he's doing.",
    "datePublished": "2026-03-15",
    "itemReviewed": { "@id": `${BASE_URL}/#organization` }
  },
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Priya K." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "We hired AP Digital to run our Google Ads for our plumbing business in Surrey. Within 3 weeks we were getting 2-3 calls a day from qualified leads. Best marketing investment we've made.",
    "datePublished": "2026-04-02",
    "itemReviewed": { "@id": `${BASE_URL}/#organization` }
  },
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Marcus T." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "As a real estate agent in Vancouver, I needed someone who understood my market. AP Digital built a Meta Ads campaign that generates 15-20 qualified buyer leads every month. Worth every penny.",
    "datePublished": "2026-05-10",
    "itemReviewed": { "@id": `${BASE_URL}/#organization` }
  },
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Sarah L." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "I'm a business coach in BC and struggled to get clients online. Arjun set up my Instagram ads and social media strategy — now I have a waitlist. No contracts, no BS, just results.",
    "datePublished": "2026-06-01",
    "itemReviewed": { "@id": `${BASE_URL}/#organization` }
  },
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Dave R." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "We run an HVAC company in Burnaby. AP Digital set up Google Ads that consistently bring in jobs. The weekly reports are clear and Arjun is always available. Highly recommend.",
    "datePublished": "2026-06-20",
    "itemReviewed": { "@id": `${BASE_URL}/#organization` }
  },
];

export const organizationSchema = {
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${BASE_URL}/#organization`,
  "name": ORG_NAME,
  "alternateName": "AP Digital Performance Marketing Agency",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": LOGO,
    "width": 200,
    "height": 200
  },
  "image": OG_IMAGE,
  "description": "AP DIGITAL is a Vancouver-based performance marketing agency specializing in paid ads (Google Ads, Meta Ads) and social media marketing for salons, real estate agents, trades, and coaches across British Columbia.",
  "slogan": "More clients. Predictably.",
  "foundingDate": "2024",
  "founder": { "@id": `${BASE_URL}/#founder` },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vancouver",
    "addressRegion": "BC",
    "postalCode": "V5K",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.2827,
    "longitude": -123.1207
  },
  "telephone": "+1-778-682-5772",
  "email": "apdigital.core@gmail.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://share.google/lI0pYZTBgTazYNTSp",
    "https://www.instagram.com/theapdigital/",
    "https://www.facebook.com/apdigital",
    "https://www.linkedin.com/company/theapdigital/"
  ],
  "areaServed": serviceAreaCities,
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 49.2827,
      "longitude": -123.1207
    },
    "geoRadius": "100000"
  },
  "priceRange": "$$",
  "currenciesAccepted": "CAD",
  "paymentAccepted": "Credit Card, E-Transfer",
  "knowsAbout": [
    "Google Ads Management",
    "Meta Ads (Facebook & Instagram)",
    "Social Media Marketing",
    "Pay-Per-Click Advertising",
    "Lead Generation for Service Businesses",
    "Local Business Marketing",
    "Performance Marketing"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Marketing Services",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Paid Ads Management",
        "itemListElement": [{
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paid Ads Management",
            "description": "Google Ads and Meta Ads campaign management including strategy, creative testing, optimization, and weekly reporting."
          },
          "price": "759",
          "priceCurrency": "CAD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "759",
            "priceCurrency": "CAD",
            "unitText": "MONTH"
          }
        }]
      },
      {
        "@type": "OfferCatalog",
        "name": "Social Media Management",
        "itemListElement": [{
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Management",
            "description": "Full social media management across 2 platforms including 12 custom posts per month, captions, scheduling, and community management."
          },
          "price": "849",
          "priceCurrency": "CAD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "849",
            "priceCurrency": "CAD",
            "unitText": "MONTH"
          }
        }]
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "14",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": reviewSchemas
};

export const getWebSiteSchema = () => ({
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": ORG_NAME,
  "description": "Vancouver paid ads and social media marketing agency for salons, real estate, trades, and coaches across BC.",
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": "en-CA",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/blog?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

export const getServiceSchema = (
  name: string,
  description: string,
  url: string,
  price?: string,
  pricePeriod?: string
) => ({
  "@type": "Service",
  "@id": `${BASE_URL}${url}#service`,
  "name": name,
  "description": description,
  "url": `${BASE_URL}${url}`,
  "provider": { "@id": `${BASE_URL}/#organization` },
  "areaServed": serviceAreaCities,
  "serviceType": name,
  "termsOfService": `${BASE_URL}/terms-of-service`,
  ...(price ? {
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "CAD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": price,
        "priceCurrency": "CAD",
        "unitText": pricePeriod || "MONTH"
      },
      "availability": "https://schema.org/InStock",
      "url": `${BASE_URL}/pricing`
    }
  } : {}),
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": `${name} Services`
  }
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${BASE_URL}${item.url}`
  }))
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const getWebPageSchema = (
  name: string,
  description: string,
  url: string
) => ({
  "@type": "WebPage",
  "@id": `${BASE_URL}${url}#webpage`,
  "url": `${BASE_URL}${url}`,
  "name": name,
  "description": description,
  "inLanguage": "en-CA",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "about": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".prose-custom p:first-of-type"]
  }
});

export const getPersonSchema = (person: {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs?: string[];
}) => ({
  "@type": "Person",
  "@id": `${BASE_URL}${person.url}#person`,
  "name": person.name,
  "jobTitle": person.jobTitle,
  "description": person.description,
  "url": `${BASE_URL}${person.url}`,
  "worksFor": { "@id": `${BASE_URL}/#organization` },
  "image": OG_IMAGE,
  ...(person.sameAs && person.sameAs.length > 0 ? { "sameAs": person.sameAs } : {})
});

export const getArticleSchema = (post: {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  category: string;
}) => ({
  "@type": "BlogPosting",
  "@id": `${BASE_URL}/blog/${post.slug}#article`,
  "headline": post.title,
  "name": post.metaTitle,
  "description": post.metaDescription,
  "datePublished": post.date,
  "dateModified": post.date,
  "inLanguage": "en-CA",
  "url": `${BASE_URL}/blog/${post.slug}`,
  "image": {
    "@type": "ImageObject",
    "url": OG_IMAGE,
    "width": 1200,
    "height": 630
  },
  "articleSection": post.category,
  "author": { "@id": `${BASE_URL}/#founder` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "mainEntityOfPage": { "@id": `${BASE_URL}/blog/${post.slug}#webpage` },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".prose-custom p:first-of-type"]
  }
});

export const getLocalBusinessCitySchema = (
  cityName: string,
  cityUrl: string
) => ({
  "@type": "Service",
  "@id": `${BASE_URL}${cityUrl}#service`,
  "name": `Digital Marketing in ${cityName}`,
  "description": `AP DIGITAL provides paid ads and social media marketing services to businesses in ${cityName}, BC. Google Ads, Meta Ads, and social media management with a 90-day results guarantee.`,
  "url": `${BASE_URL}${cityUrl}`,
  "provider": { "@id": `${BASE_URL}/#organization` },
  "areaServed": {
    "@type": "City",
    "name": cityName,
    "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" }
  },
  "serviceType": "Performance Marketing"
});
