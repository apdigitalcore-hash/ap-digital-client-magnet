import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-right.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-near-black overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Digital marketing agency for local businesses in Vancouver BC"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        {/* Radial light effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(255,255,255,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-near-black/60" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p
          className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground mb-8 animate-fade-up font-medium"
        >
          AP Digital Marketing
        </p>

        {/* Headline */}
        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.08] tracking-tight mb-8 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          Digital Marketing &{' '}
          <br className="hidden sm:block" />
          Lead Generation
        </h1>

        {/* Subheadline */}
        <p
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up leading-relaxed"
          style={{ animationDelay: '0.2s' }}
        >
          Marketing does not have to be complicated.
          We help local businesses generate predictable leads and
          scale revenue. Your job is to show up and close them.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <Button variant="hero" size="lg" asChild>
            <a href="#contact" className="flex items-center gap-2">
              Book a Strategy Call
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="light" size="lg" asChild>
            <a href="#services">
              See What's Included
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="absolute bottom-8 left-0 right-0 z-10 animate-fade-up" style={{ animationDelay: '0.5s' }}>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-16 opacity-40 px-4">
          {['Google', 'Facebook', 'Instagram', 'LinkedIn'].map(brand => (
            <span key={brand} className="text-primary-foreground font-display font-semibold text-sm md:text-base tracking-wide">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
