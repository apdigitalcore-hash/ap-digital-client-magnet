import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  keywords?: string;
}

const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://apdigital.lovable.app/og-image.png',
  structuredData,
  keywords,
}: SEOHeadProps) => {
  const baseUrl = 'https://apdigital.lovable.app';
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const updateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Primary Meta Tags
    updateMeta('title', title);
    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMeta('author', 'AP DIGITAL');
    updateMeta('publisher', 'AP DIGITAL');

    // Canonical URL
    updateLink('canonical', fullCanonicalUrl);

    // Open Graph / Facebook
    updateMeta('og:type', 'website', true);
    updateMeta('og:url', fullCanonicalUrl, true);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:locale', 'en_CA', true);
    updateMeta('og:site_name', 'AP DIGITAL', true);

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:url', fullCanonicalUrl);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);

    // Geo Tags
    updateMeta('geo.region', 'CA-BC');
    updateMeta('geo.placename', 'Pitt Meadows');
    updateMeta('geo.position', '49.2214;-122.6899');
    updateMeta('ICBM', '49.2214, -122.6899');

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('#structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // We don't remove meta tags on unmount as they should persist
    };
  }, [title, description, canonicalUrl, ogImage, keywords, structuredData, fullCanonicalUrl]);

  return null; // This component doesn't render anything
};

export default SEOHead;
