import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/lib/blogPosts';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';

const Blog = () => (
  <>
    <Helmet>
      <title>Blog | AP DIGITAL — Digital Marketing Tips for Local Businesses</title>
      <meta name="description" content="Actionable digital marketing tips for salons, real estate agents, trades, and coaches. Learn how to generate more leads with social media and paid ads." />
      <link rel="canonical" href="https://ap-digital.ca/blog" />
    </Helmet>
    <Header />
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          The <span className="text-teal">AP DIGITAL</span> Blog
        </h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
          Proven strategies to help local businesses get more leads, more clients, and more revenue.
        </p>

        <div className="flex flex-col gap-6">
          {blogPosts.map((post) => (
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
