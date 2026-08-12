import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getPostBySlug, getRelatedPosts } from '@/lib/blogPosts';
import { CalendarDays, Clock, ArrowLeft } from 'lucide-react';
import { getArticleSchema, getBreadcrumbSchema, getWebPageSchema, founderSchema } from '@/lib/structuredData';
import JsonLd from '@/components/JsonLd';
import { lazy, Suspense } from 'react';

const SocialMediaBudgetCalculator = lazy(() => import('@/components/SocialMediaBudgetCalculator'));

const OG_IMAGE = 'https://ap-digital.ca/og-image.png';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const canonical = post.canonicalUrl ?? `https://ap-digital.ca/blog/${post.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      founderSchema,
      getArticleSchema(post),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${post.slug}` },
      ]),
      getWebPageSchema(post.metaTitle, post.metaDescription, `/blog/${post.slug}`),
    ]
  };

  // Simple markdown-like rendering: split by ## for sections
  const renderBlock = (block: string, key: number) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed === '[LEAD_MAGNET:social-media-budget]') {
      return (
        <Suspense fallback={null} key={key}>
          <SocialMediaBudgetCalculator />
        </Suspense>
      );
    }
    if (trimmed.startsWith('### ')) {
      return <h3 key={key} className="font-display text-xl font-bold text-foreground mt-8 mb-3">{trimmed.slice(4)}</h3>;
    }
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('\n|')) {
      const rows = trimmed.split('\n').filter(line => line.trim().startsWith('|'));
      if (rows.length < 2) return <p key={key} className="text-foreground/80 leading-relaxed mb-6">{renderInline(trimmed)}</p>;
      const [headerRow, ...rest] = rows;
      const separatorIndex = rest.findIndex(r => /^\|[-\s|]+\|?$/.test(r.trim()));
      const dataRows = separatorIndex >= 0 ? rest.slice(separatorIndex + 1) : rest;
      const headers = headerRow.split('|').map(h => h.trim()).filter(Boolean);
      const cells = (row: string) => row.split('|').map(c => c.trim()).filter((_, i) => i > 0 && i <= headers.length);
      return (
        <div key={key} className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left border-collapse border border-border">
            <thead>
              <tr className="bg-muted/50">
                {headers.map((h, idx) => (
                  <th key={idx} className="border border-border px-4 py-3 font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, ridx) => (
                <tr key={ridx} className={ridx % 2 === 1 ? 'bg-muted/30' : ''}>
                  {cells(row).map((cell, cidx) => (
                    <td key={cidx} className="border border-border px-4 py-3 text-foreground/80">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter(l => l.startsWith('- '));
      return (
        <ul key={key} className="list-disc list-inside text-foreground/80 leading-relaxed mb-6 space-y-2">
          {items.map((item, idx) => <li key={idx}>{renderInline(item.slice(2))}</li>)}
        </ul>
      );
    }
    return <p key={key} className="text-foreground/80 leading-relaxed mb-6">{renderInline(trimmed)}</p>;
  };

  const renderContent = (content: string) => {
    const sections = content.split(/^## /m);
    return sections.map((section, i) => {
      if (i === 0) {
        return section.split('\n\n').map((p, j) => renderBlock(p, j));
      }
      const [heading, ...rest] = section.split('\n\n');
      return (
        <div key={i}>
          <h2 className="font-display text-2xl font-bold text-foreground mt-10 mb-4">{heading.trim()}</h2>
          {rest.map((p, j) => renderBlock(p, j))}
        </div>
      );
    });
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\[.*?\]\(.*?\)|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return <Link key={i} to={linkMatch[2]} className="text-teal underline hover:text-teal/80 transition-colors">{linkMatch[1]}</Link>;
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="AP DIGITAL" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={OG_IMAGE} />

      </Helmet>
      <JsonLd data={structuredData} />
      <Header />
      <main id="main-content" className="min-h-screen bg-background pt-28 pb-20">
        <article className="container-custom max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-muted-foreground hover:text-teal transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
            <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="prose-custom">
            {renderContent(post.content)}
          </div>


          <div className="mt-16 bg-card border border-border rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Ready to Fill Your Schedule?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Book a free strategy call with AP DIGITAL and get a custom plan to grow your business.
            </p>
            <Button size="lg" className="bg-teal hover:bg-teal/90 text-white" asChild>
              <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
            </Button>
          </div>

          {getRelatedPosts(slug!, 3).length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Keep Reading</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {getRelatedPosts(slug!, 3).map(related => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className="group bg-card border border-border rounded-xl p-5 hover:border-teal/40 transition-colors"
                  >
                    <span className="text-xs text-teal font-medium">{related.category}</span>
                    <h3 className="font-display text-sm font-bold text-foreground mt-1 mb-2 group-hover:text-teal transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{related.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
