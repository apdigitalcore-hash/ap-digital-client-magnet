import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhileYouScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      const scrolled = windowHeight - rect.top;
      const total = windowHeight + sectionHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const firstLineOpacity = progress < 0.1 ? progress / 0.1 : progress < 0.35 ? 1 : progress < 0.5 ? 1 - (progress - 0.35) / 0.15 : 0;
  const firstLineY = progress < 0.1 ? 40 * (1 - progress / 0.1) : progress < 0.35 ? 0 : -(progress - 0.35) / 0.15 * 60;

  const carStart = 0.2;
  const carEnd = 0.75;
  const carProgress = Math.max(0, Math.min(1, (progress - carStart) / (carEnd - carStart)));
  const carX = -25 + carProgress * 125;
  const carVisible = progress > carStart - 0.02 && progress < carEnd + 0.02;

  const secondLineOpacity = progress < 0.7 ? 0 : Math.min(1, (progress - 0.7) / 0.15);
  const secondLineY = progress < 0.7 ? 40 : 40 * (1 - Math.min(1, (progress - 0.7) / 0.15));

  return (
    <section
      id="while-you-scroll"
      ref={sectionRef}
      className="relative"
      style={{ height: '450vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <div className="relative h-full w-full flex items-center justify-center">

          {/* First line */}
          <div
            className="absolute inset-0 flex items-center justify-center px-6 z-10"
            style={{
              opacity: firstLineOpacity,
              transform: `translateY(${firstLineY}px)`,
              willChange: 'transform, opacity',
            }}
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground text-center leading-tight">
              Every day without ads
              <br />
              <span className="text-red-500">is money lost.</span>
            </h2>
          </div>

          {/* Mercedes F1 Car */}
          {carVisible && (
            <div
              className="absolute z-20 w-[240px] sm:w-[320px] md:w-[420px] lg:w-[520px] xl:w-[620px]"
              style={{
                left: `${carX}%`,
                top: '50%',
                transform: 'translateY(-50%)',
                willChange: 'left',
              }}
            >
              <img
                src="/mercedes-f1.jpg"
                alt="Mercedes F1 car"
                className="w-full h-auto"
                draggable={false}
              />
            </div>
          )}

          {/* Second line + CTA */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 z-10"
            style={{
              opacity: secondLineOpacity,
              transform: `translateY(${secondLineY}px)`,
              willChange: 'transform, opacity',
            }}
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground text-center leading-tight">
              Let's fix that
              <br />
              <span className="text-gradient">today.</span>
            </h2>
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
    </section>
  );
};

export default WhileYouScroll;
