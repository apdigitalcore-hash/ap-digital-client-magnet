const BASE_URL = 'https://ap-digital.ca';
const ORG_NAME = 'AP DIGITAL';
const OG_IMAGE = `${BASE_URL}/og-image.png`;
const LOGO = `${BASE_URL}/logo.png`;

export const organizationSchema = {
  "@type": ["LocalBusiness", "MarketingAgency"],
  "@id": `${BASE_URL}/#organization`,
  "name": ORG_NAME,
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": LOGO,
    "width": 200,
    "height": 200
  },
  "image": OG_IMAGE,
  "description": "AP DIGITAL is a Vancouver-based digital marketing agency helping salons, real estate agents, trades, and coaches get predictable leads through social media and paid ads.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pitt Meadows",
    "addressRegion": "BC",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.2165,
    "longitude": -122.6895
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
    "https://www.linkedin.com/company/apdigital"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  },
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "14",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const getWebSiteSchema = () => ({
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": ORG_NAME,
  "description": "Canadian digital marketing agency for salons, real estate, trades, and coaches.",
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/?s={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

export const getServiceSchema = (
  name: string,
  description: string,
  url: string
) => ({
  "@type": "Service",
  "@id": `${BASE_URL}${url}#service`,
  "name": name,
  "description": description,
  "url": `${BASE_URL}${url}`,
  "provider": { "@id": `${BASE_URL}/#organization` },
  "areaServed": { "@type": "Country", "name": "Canada" },
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
  "publisher": { "@id": `${BASE_URL}/#organization` }
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
  "author": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "mainEntityOfPage": { "@id": `${BASE_URL}/blog/${post.slug}#webpage` }
});
