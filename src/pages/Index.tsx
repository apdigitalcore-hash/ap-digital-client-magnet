import { useEffect } from 'react';
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
      <Services />
      <Benefits />
      <Testimonials />
      <Process />
      <Pricing />
      <Contact />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
