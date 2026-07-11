import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhileYouScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight;
      const end = -section.offsetHeight;
      const range = start - end;
      const current = start - rect.top;
      const progress = Math.max(0, Math.min(1, current / range));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leadsLost = Math.floor(scrollProgress * 27);
  const revenueLost = Math.floor(scrollProgress * 14800);
  const bookingsLost = Math.floor(scrollProgress * 43);
  const showCTA = scrollProgress > 0.55;

  const formatMoney = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <section
      id="while-you-scroll"
      ref={sectionRef}
      className="relative bg-background"
      style={{ minHeight: '180vh' }}
    >
      <div className="sticky top-0 min-h-screen flex items-center justify-center">
        <div className="container-custom w-full py-20">
          <div className="max-w-3xl mx-auto text-center">

            {/* Eyebrow */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-red-500">
                <span
                  className="w-2 h-2 rounded-full bg-red-500 animate-pulse"
                />
                Right now, while you scroll
              </span>
            </div>

            {/* Main headline */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-14">
              Your competitors are{' '}
              <span className="text-gradient">running ads.</span>
              <br />
              You're not.
            </h2>

            {/* Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-14">
              <div className="relative p-6 sm:p-8 rounded-2xl border border-red-200 bg-red-50/60">
                <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-red-600 tabular-nums mb-2">
                  {leadsLost}
                </div>
                <p className="text-sm sm:text-base text-foreground/70 font-medium">
                  leads went to your competitor
                </p>
              </div>

              <div className="relative p-6 sm:p-8 rounded-2xl border border-red-200 bg-red-50/60">
                <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-red-600 tabular-nums mb-2">
                  {formatMoney(revenueLost)}
                </div>
                <p className="text-sm sm:text-base text-foreground/70 font-medium">
                  in revenue — gone
                </p>
              </div>

              <div className="relative p-6 sm:p-8 rounded-2xl border border-red-200 bg-red-50/60">
                <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-red-600 tabular-nums mb-2">
                  {bookingsLost}
                </div>
                <p className="text-sm sm:text-base text-foreground/70 font-medium">
                  bookings you missed this month
                </p>
              </div>
            </div>

            {/* CTA reveal */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: showCTA ? 1 : 0,
                transform: showCTA ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">
                Ready to stop watching?
              </p>
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://calendly.com/apdigital-core/20min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Book a Free Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhileYouScroll;
