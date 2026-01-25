import { useEffect, Suspense, lazy } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const MarketingDivider = lazy(() => import('@/components/3d/MarketingDivider'));

const DividerFallback = () => (
  <div className="h-32 w-full bg-gradient-to-r from-transparent via-teal/5 to-transparent" />
);

const Index = () => {
  useEffect(() => {
    // Update document title for SEO
    document.title = 'AP DIGITAL | Data-Driven Marketing for Local Businesses';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'AP DIGITAL helps salons, real estate, trades, and coaching businesses grow with proven digital marketing strategies. Get your free strategy call today.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'AP DIGITAL helps salons, real estate, trades, and coaching businesses grow with proven digital marketing strategies. Get your free strategy call today.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Suspense fallback={<DividerFallback />}>
        <MarketingDivider variant="growth" className="bg-background" />
      </Suspense>
      <Services />
      <Suspense fallback={<DividerFallback />}>
        <MarketingDivider variant="analytics" className="bg-background" />
      </Suspense>
      <Benefits />
      <Suspense fallback={<DividerFallback />}>
        <MarketingDivider variant="target" className="bg-background" />
      </Suspense>
      <Testimonials />
      <Suspense fallback={<DividerFallback />}>
        <MarketingDivider variant="megaphone" className="bg-background" />
      </Suspense>
      <Process />
      <Suspense fallback={<DividerFallback />}>
        <MarketingDivider variant="network" className="bg-background" />
      </Suspense>
      <Pricing />
      <Contact />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
