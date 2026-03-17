import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getPostBySlug } from '@/lib/blogPosts';
import { CalendarDays, Clock, ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  // Simple markdown-like rendering: split by ## for sections
  const renderBlock = (block: string, key: number) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('### ')) {
      return <h3 key={key} className="font-display text-xl font-bold text-foreground mt-8 mb-3">{trimmed.slice(4)}</h3>;
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
    // Links [text](url) and Bold **text**
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
        <link rel="canonical" href={`https://ap-digital.ca/blog/${post.slug}`} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.date,
          author: { "@type": "Organization", name: "AP DIGITAL" },
          publisher: { "@type": "Organization", name: "AP DIGITAL" },
        })}</script>
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background pt-28 pb-20">
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
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Book Your Free Strategy Call</Link>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
