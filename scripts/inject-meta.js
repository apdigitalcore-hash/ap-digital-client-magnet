import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const baseHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

const routes = [
  {
    path: 'trades-marketing',
    title: 'Trades Marketing Agency BC | Plumber, HVAC & Electrician Leads | AP Digital',
    description: 'AP Digital generates leads for BC plumbers, electricians, HVAC companies, roofers & contractors using Meta Ads. No contracts. Starts at $500/month.'
  },
  {
    path: 'salon-marketing',
    title: 'Salon Marketing Agency Vancouver | Get More Bookings | AP Digital',
    description: 'AP Digital helps Vancouver salons get more bookings using Meta Ads & organic content. Month-to-month. No contracts.'
  },
  {
    path: 'real-estate-marketing',
    title: 'Real Estate Marketing Agency BC | Leads for Realtors | AP Digital',
    description: 'AP Digital generates real estate leads across BC using Meta Ads. Serving realtors, brokerages & investors. Month-to-month.'
  },
  {
    path: 'coaching-marketing',
    title: 'Coaching Marketing Agency BC | Get More Clients | AP Digital',
    description: 'AP Digital helps life, business & fitness coaches across BC get more clients using Meta Ads. No lock-in contracts.'
  },
  {
    path: 'services/paid-ads',
    title: 'Paid Ads Agency Vancouver | Meta & Google Ads | AP Digital',
    description: 'AP Digital manages Meta Ads & Google Ads for Vancouver small businesses. Salons, trades, realtors & coaches. Month-to-month.'
  },
  {
    path: 'services/social-media',
    title: 'Social Media Marketing Vancouver | Content & Growth | AP Digital',
    description: 'AP Digital manages social media for Vancouver salons, trades & real estate professionals. Short-form content & organic growth.'
  },
  {
    path: 'services/content-creation',
    title: 'Content Creation Agency Vancouver | Short-Form Video | AP Digital',
    description: 'AP Digital creates short-form video content and social posts for Vancouver small businesses.'
  },
  {
    path: 'services/seo',
    title: 'SEO Agency Vancouver | Search Engine Optimization | AP Digital',
    description: 'AP Digital provides SEO for Vancouver small businesses — salons, trades, real estate & coaches. Get found on Google. Month-to-month.'
  },
  {
    path: 'services/lead-generation',
    title: 'Lead Generation Agency Vancouver | Predictable Leads | AP Digital',
    description: 'AP Digital builds lead generation systems for Vancouver salons, trades, realtors & coaches using Meta Ads and organic content.'
  },
  {
    path: 'services/web-design',
    title: 'Web Design Agency Vancouver | Websites for Small Business | AP Digital',
    description: 'AP Digital builds fast, conversion-focused websites for Vancouver small businesses. Salons, trades, real estate & coaches.'
  },
  {
    path: 'about',
    title: 'About AP Digital | Vancouver Digital Marketing Agency | Arjun Sharma',
    description: 'AP Digital was founded by Arjun Sharma in Pitt Meadows, BC. We specialize in lead generation for salons, trades, real estate & coaches.'
  },
  {
    path: 'contact',
    title: 'Contact AP Digital | Book a Free Strategy Call',
    description: 'Book a free 20-minute strategy call with AP Digital. We will show you how many leads are available in your area. No pressure.'
  },
  {
    path: 'blog',
    title: 'Digital Marketing Blog | AP Digital — Tips for Salons, Trades & Realtors',
    description: 'Marketing tips, ad strategies & lead generation guides for Vancouver salons, trades businesses, realtors & coaches.'
  },
  {
    path: 'surrey',
    title: 'Digital Marketing Agency Surrey BC | AP Digital',
    description: 'AP Digital helps Surrey businesses get more leads using Meta Ads & Google Ads. Salons, trades, real estate & coaches. Month-to-month.'
  },
  {
    path: 'burnaby',
    title: 'Digital Marketing Agency Burnaby BC | AP Digital',
    description: 'AP Digital helps Burnaby businesses get more leads. Salons, trades, realtors & coaches. Meta Ads & Google Ads. Month-to-month.'
  },
  {
    path: 'langley',
    title: 'Digital Marketing Agency Langley BC | AP Digital',
    description: 'AP Digital helps Langley businesses get predictable leads. Salons, trades, real estate & coaches. No contracts.'
  },
  {
    path: 'coquitlam',
    title: 'Digital Marketing Agency Coquitlam BC | AP Digital',
    description: 'AP Digital helps Coquitlam businesses generate leads. Salons, trades, realtors & coaches. Meta Ads & Google Ads. Month-to-month.'
  }
];

for (const route of routes) {
  const canonical = `https://ap-digital.ca/${route.path}`;
  let html = baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${route.description}" />`);

  if (!html.includes('<meta name="description"')) {
    html = html.replace('</head>', `<meta name="description" content="${route.description}" />\n</head>`);
  }

  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', `<link rel="canonical" href="${canonical}" />\n</head>`);
  } else {
    html = html.replace(/<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${canonical}" />`);
  }

  // Write as flat .html file for Vercel cleanUrls (e.g. dist/trades-marketing.html)
  const parts = route.path.split('/');
  const filename = parts.pop();
  const parentDir = parts.length > 0 ? resolve(distDir, ...parts) : distDir;
  if (!existsSync(parentDir)) mkdirSync(parentDir, { recursive: true });
  writeFileSync(resolve(parentDir, `${filename}.html`), html);
  console.log(`Generated: dist/${route.path}.html`);

  // Also write as directory index for fallback (e.g. dist/trades-marketing/index.html)
  const indexDir = resolve(distDir, route.path);
  if (!existsSync(indexDir)) mkdirSync(indexDir, { recursive: true });
  writeFileSync(resolve(indexDir, 'index.html'), html);
  console.log(`Generated: dist/${route.path}/index.html`);
}

console.log('Meta injection complete.');
