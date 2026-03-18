// JSON-LD Structured Data for SEO

const BASE_URL = 'https://ap-digital.ca';
const ORG_NAME = 'AP DIGITAL';
const OG_IMAGE = `${BASE_URL}/og-image.png`;
const LOGO = `${BASE_URL}/logo.png`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MarketingAgency"],
  "@id": `${BASE_URL}/#organization`,
  "name": ORG_NAME,
  "description": "Digital marketing agency in Vancouver, BC helping salons, real estate agents, trades businesses, and coaches get consistent leads through short-form content and paid ads.",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": LOGO,
    "width": 200,
    "height": 200
  },
  "image": OG_IMAGE,
  "telephone": "+1-778-682-5772",
  "email": "apdigital.core@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vancouver",
    "addressRegion": "BC",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.2827,
    "longitude": -123.1207
  },
  "areaServed": [
    { "@type": "Country", "name": "Canada" },
    { "@type": "State", "name": "British Columbia" },
    { "@type": "City", "name": "Vancouver" }
  ],
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/apdigital.co"
  ]
};

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "name": ORG_NAME,
  "url": BASE_URL,
  "description": "Digital marketing agency in Vancouver, BC specializing in lead generation for salons, real estate agents, trades, and coaches.",
  "publisher": { "@id": `${BASE_URL}/#organization` },
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
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}${url}#service`,
  "serviceType": name,
  "name": name,
  "description": description,
  "url": `${BASE_URL}${url}`,
  "provider": {
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#organization`,
    "name": ORG_NAME,
    "url": BASE_URL
  },
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": name
  }
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${BASE_URL}${item.url}`
  }))
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
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
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}${url}#webpage`,
  "name": name,
  "description": description,
  "url": `${BASE_URL}${url}`,
  "inLanguage": "en-CA",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "about": { "@id": `${BASE_URL}/#organization` },
  "publisher": { "@id": `${BASE_URL}/#organization` }
});

export const getArticleSchema = (post: {
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  date: string;
  category: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${BASE_URL}/blog/${post.slug}#article`,
  "headline": post.title,
  "name": post.metaTitle,
  "description": post.metaDescription,
  "url": `${BASE_URL}/blog/${post.slug}`,
  "datePublished": post.date,
  "dateModified": post.date,
  "image": {
    "@type": "ImageObject",
    "url": OG_IMAGE,
    "width": 1200,
    "height": 630
  },
  "author": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": ORG_NAME,
    "url": BASE_URL
  },
  "publisher": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": ORG_NAME,
    "logo": {
      "@type": "ImageObject",
      "url": LOGO
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${BASE_URL}/blog/${post.slug}#webpage`
  },
  "articleSection": post.category,
  "inLanguage": "en-CA",
  "isPartOf": { "@id": `${BASE_URL}/#website` }
});
