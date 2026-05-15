import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { allPosts } from '@/lib/blogPosts';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/structuredData';

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

const Blog = () => (
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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <Header />
    <main id="main-content" className="min-h-screen bg-background pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Digital Marketing Blog — Tips for Salons, Trades &amp; Real Estate
        </h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
          Proven strategies to help local businesses get more leads, more clients, and more revenue.
        </p>

        <div className="flex flex-col gap-6">
          {allPosts.map((post) => (
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
      </div>
    </main>
    <Footer />
  </>
);

export default Blog;
