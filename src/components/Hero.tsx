import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-right.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex bg-near-black overflow-hidden">
      {/* Left Content */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-between min-h-screen px-6 sm:px-10 lg:px-16 pt-28 pb-12">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal/20 text-teal mb-8 w-fit animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-sm font-medium">#1 Marketing Agency in Canada</span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-primary-foreground leading-[1.05] tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Digital Marketing That Generates{' '}
            <span className="text-gradient">Qualified Leads.</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-base md:text-lg text-muted-foreground max-w-md mb-10 animate-fade-up leading-relaxed" 
            style={{ animationDelay: '0.2s' }}
          >
            We help local businesses generate leads, boost visibility, and scale revenue—guaranteed results in 90 days.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-wrap items-center gap-4 animate-fade-up" 
            style={{ animationDelay: '0.3s' }}
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#contact" className="flex items-center gap-2">
                Book a Free Strategy Call
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="light" size="lg" asChild>
              <a href="#process" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                See How It Works
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Logos */}
        <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center gap-6 md:gap-10 opacity-50">
            {['SalonPro', 'RealtyMax', 'TradesCo', 'CoachHub', 'GrowthLab'].map(brand => (
              <div key={brand} className="text-primary-foreground font-display font-semibold text-sm md:text-base">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src={heroImage}
          alt="Digital marketing agency for local businesses in Vancouver BC"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        {/* Subtle gradient blend from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-near-black via-near-black/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
