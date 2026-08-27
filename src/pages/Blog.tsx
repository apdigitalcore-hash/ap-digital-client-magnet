import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { allPosts } from '@/lib/blogPosts';
import { CalendarDays, Clock, ArrowRight, Search, X } from 'lucide-react';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';

const TITLE = 'Marketing Blog | Tips for BC Salons, Trades & Realtors';
const DESC = 'Marketing tips, ad strategies & lead generation guides for Vancouver salons, trades businesses, realtors & coaches.';
const CANONICAL = 'https://ap-digital.ca/blog';
const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
    ]),
    getWebPageSchema(TITLE, DESC, '/blog'),
  ]
};

/**
 * Filtering is deliberately client-side with no URL change.
 *
 * A /blog?q=... or /blog/category/... scheme would mint unlimited crawlable
 * near-duplicate listing pages, which is the last thing a site whose problem is
 * thin authority needs. Keeping it in React state means zero new URLs, zero
 * crawl surface, and nothing to noindex.
 */
const Blog = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(allPosts.map((p) => p.category))].sort(),
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPosts.filter((post) => {
      if (category && post.category !== category) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
  <>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href={CANONICAL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={CANONICAL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:site_name" content="AP DIGITAL" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="robots" content="index, follow" />
      
    </Helmet>
      <JsonLd data={structuredData} />
    <Header />
    <main id="main-content" className="min-h-screen bg-background pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Digital Marketing Blog — Tips for Salons, Trades &amp; Real Estate
        </h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
          Proven strategies to help local businesses get more leads, more clients, and more revenue.
        </p>


        {/* Search and category filter — state only, no URL change. */}
        <div className="mb-8">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles — try salon, Google Ads, pricing"
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-11 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory(null)}
              aria-pressed={category === null}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                category === null
                  ? 'bg-teal text-white'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              All ({allPosts.length})
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(category === c ? null : c)}
                aria-pressed={category === c}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  category === c
                    ? 'bg-teal text-white'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
            {results.length === allPosts.length
              ? `${allPosts.length} articles`
              : `${results.length} of ${allPosts.length} articles`}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {results.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-teal/30 transition-colors"
            >
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-teal transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-teal font-medium text-sm group-hover:gap-2 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        {results.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-foreground font-medium mb-1">No articles match that.</p>
            <p className="text-sm text-muted-foreground">
              Try a broader term, or{' '}
              <button type="button" onClick={() => { setQuery(''); setCategory(null); }} className="text-teal underline">
                clear the filters
              </button>.
            </p>
          </div>
        )}
      </div>
    </main>
    <Footer />
  </>
  );
};

export default Blog;
