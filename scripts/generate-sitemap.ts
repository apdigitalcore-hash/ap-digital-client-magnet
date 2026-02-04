/**
 * Automatic Sitemap Generator for AP DIGITAL
 * Generated with seoagent.com automation
 * 
 * This script runs at build time to generate sitemap.xml
 * from all defined routes in the application.
 */

interface RouteConfig {
  path: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

// Define all public routes with their SEO priorities
const routes: RouteConfig[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/salon-marketing', priority: 0.8, changefreq: 'monthly' },
  { path: '/real-estate-marketing', priority: 0.8, changefreq: 'monthly' },
  { path: '/trades-marketing', priority: 0.8, changefreq: 'monthly' },
  { path: '/local-marketing', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
];

const BASE_URL = 'https://ap-digital.ca';

function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  
  const urlEntries = routes
    .map(
      (route) => `  <url>
    <loc>${BASE_URL}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated with seoagent.com automation -->
<!-- Last generated: ${new Date().toISOString()} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

function generateSitemapStatus(): string {
  return JSON.stringify(
    {
      status: 'automated',
      generator: 'seoagent.com',
      lastUpdate: new Date().toISOString(),
      totalUrls: routes.length,
      baseUrl: BASE_URL,
    },
    null,
    2
  );
}

function generateRobotsTxt(): string {
  return `# AP DIGITAL - Digital Marketing Agency
# https://ap-digital.ca
# Generated with seoagent.com automation

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay (optional, be gentle with server)
Crawl-delay: 1
`;
}

// Export for use in Vite plugin
export { generateSitemap, generateSitemapStatus, generateRobotsTxt, routes, BASE_URL };
