import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import heroVideo from '@/assets/hero-video.mp4';
import heroFallback from '@/assets/hero-fallback.jpg';

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video/Image Background */}
      <div className="absolute inset-0 z-0">
        {!isMobile ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster={heroFallback}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroFallback}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      {/* Subtle accent glow effects */}
      <div className="absolute inset-0 opacity-20 z-[1] pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-teal blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-teal-light blur-3xl" />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-sm font-medium">Trusted by 150+ Local Businesses</span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" 
            style={{ animationDelay: '0.1s' }}
          >
            Grow Your Business With{' '}
            <span className="text-gradient">Data-Driven</span>{' '}
            Digital Marketing
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-up" 
            style={{ animationDelay: '0.2s' }}
          >
            We help Salons, Real Estate Agencies, Tradespeople, and Coaches generate leads, boost visibility, and scale revenue—guaranteed results in 90 days.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" 
            style={{ animationDelay: '0.3s' }}
          >
            <Button variant="hero" size="xl" asChild>
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

          {/* Social Proof */}
          <div 
            className="mt-16 pt-12 border-t border-primary-foreground/10 animate-fade-up" 
            style={{ animationDelay: '0.4s' }}
          >
            <p className="text-primary-foreground/60 text-sm mb-6">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              {['SalonPro', 'RealtyMax', 'TradesCo', 'CoachHub', 'GrowthLab'].map(brand => (
                <div key={brand} className="text-primary-foreground/80 font-display font-semibold text-lg">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-teal rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
