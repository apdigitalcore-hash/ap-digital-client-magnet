import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhileYouScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      const visible = rect.top < windowHeight && rect.bottom > 0;
      setInView(visible);

      const scrolled = windowHeight - rect.top;
      const total = windowHeight + sectionHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Phase 1: first text fade in 0.05-0.35, fade out 0.35-0.50
  const firstLineOpacity =
    progress < 0.05
      ? 0
      : progress < 0.35
      ? Math.min(1, (progress - 0.05) / 0.3)
      : progress < 0.5
      ? Math.max(0, 1 - (progress - 0.35) / 0.15)
      : 0;
  const firstLineY =
    progress < 0.05
      ? 40
      : progress < 0.35
      ? 40 * (1 - (progress - 0.05) / 0.3)
      : progress < 0.5
      ? -60 * ((progress - 0.35) / 0.15)
      : -60;

  // Phase 2: car drives left to right 0.20-0.75
  const carStart = 0.2;
  const carEnd = 0.75;
  const carProgress = Math.max(0, Math.min(1, (progress - carStart) / (carEnd - carStart)));
  const carX = -25 + carProgress * 125;

  // Phase 3: second text fade in 0.70-0.85
  const secondLineOpacity =
    progress < 0.7 ? 0 : Math.min(1, (progress - 0.7) / 0.15);
  const secondLineY =
    progress < 0.7 ? 40 : 40 * (1 - Math.min(1, (progress - 0.7) / 0.15));

  return (
    <section
      ref={sectionRef}
      id="while-you-scroll"
      className="relative"
      style={{ height: '450vh' }}
    >
      {inView && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'hsl(var(--background))',
            overflow: 'hidden',
            zIndex: 30,
          }}
        >
          {/* First line */}
          <div
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{
              opacity: firstLineOpacity,
              transform: `translateY(${firstLineY}px)`,
              willChange: 'transform, opacity',
              zIndex: 10,
            }}
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground text-center leading-tight">
              Every day without ads
              <br />
              <span className="text-red-500">is money lost.</span>
            </h2>
          </div>

          {/* Mercedes F1 car */}
          <div
            className="absolute w-[240px] sm:w-[320px] md:w-[420px] lg:w-[520px] xl:w-[620px]"
            style={{
              left: `${carX}%`,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              willChange: 'transform, opacity',
            }}
          >
            <img
              src="/mercedes-f1.jpg"
              alt="Mercedes F1 car"
              className="w-full h-auto"
              style={{ mixBlendMode: 'multiply' }}
              draggable={false}
            />
          </div>

          {/* Second line + CTA */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6"
            style={{
              opacity: secondLineOpacity,
              transform: `translateY(${secondLineY}px)`,
              willChange: 'transform, opacity',
              zIndex: 10,
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
      )}
    </section>
  );
};

export default WhileYouScroll;
