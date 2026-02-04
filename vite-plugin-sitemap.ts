/**
 * Vite Plugin for Automatic Sitemap Generation
 * Generated with seoagent.com automation
 * 
 * This plugin automatically generates sitemap.xml, robots.txt,
 * and sitemap-status.json on every build.
 */

import type { Plugin } from 'vite';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

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

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    
    closeBundle() {
      const outDir = resolve(process.cwd(), 'dist');
      
      // Ensure dist directory exists
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }
      
      // Generate and write sitemap.xml
      const sitemap = generateSitemap();
      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap);
      console.log('✅ Generated sitemap.xml');
      
      // Generate and write sitemap-status.json
      const status = generateSitemapStatus();
      writeFileSync(resolve(outDir, 'sitemap-status.json'), status);
      console.log('✅ Generated sitemap-status.json');
      
      // Generate and write robots.txt
      const robots = generateRobotsTxt();
      writeFileSync(resolve(outDir, 'robots.txt'), robots);
      console.log('✅ Generated robots.txt');
      
      console.log('🎉 SEO files generated successfully with seoagent.com automation');
    },
  };
}

export default sitemapPlugin;
