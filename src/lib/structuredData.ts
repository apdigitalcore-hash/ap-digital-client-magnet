// JSON-LD Structured Data for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ap-digital.ca/#organization",
  "name": "AP DIGITAL",
  "description": "Digital marketing agency in Canada helping local businesses get consistent leads through short-form content and paid ads.",
  "url": "https://ap-digital.ca",
  "logo": "https://ap-digital.ca/logo.png",
  "image": "https://ap-digital.ca/og-image.png",
  "telephone": "+1-778-682-5772",
  "email": "apdigital.core@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pitt Meadows",
    "addressRegion": "BC",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.2214,
    "longitude": -122.6899
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Canada"
    },
    {
      "@type": "State",
      "name": "British Columbia"
    },
    {
      "@type": "City",
      "name": "Pitt Meadows"
    }
  ],
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-17:00",
  "sameAs": []
};

export const getServiceSchema = (
  name: string,
  description: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": name,
  "provider": {
    "@type": "LocalBusiness",
    "name": "AP DIGITAL",
    "url": "https://ap-digital.ca"
  },
  "name": name,
  "description": description,
  "url": url,
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  }
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://ap-digital.ca${item.url}`
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
  "name": name,
  "description": description,
  "url": `https://ap-digital.ca${url}`,
  "isPartOf": {
    "@type": "WebSite",
    "name": "AP DIGITAL",
    "url": "https://ap-digital.ca"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AP DIGITAL",
    "url": "https://ap-digital.ca"
  }
});
