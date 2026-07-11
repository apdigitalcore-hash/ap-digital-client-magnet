import { useEffect, useRef, useState } from 'react';

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

      const active = rect.top <= 5 && rect.bottom > windowHeight * 0.9;
      setInView(active);

      const p = active
        ? Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)))
        : rect.top > 0 ? 0 : 1;
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

  // First line: fade in 0.0-0.1, fade out 0.5-0.65
  const firstLineOpacity =
    progress < 0.1
      ? progress / 0.1
      : progress < 0.5
      ? 1
      : progress < 0.65
      ? Math.max(0, 1 - (progress - 0.5) / 0.15)
      : 0;
  const firstLineY =
    progress < 0.1
      ? 40 * (1 - progress / 0.1)
      : progress < 0.5
      ? 0
      : progress < 0.65
      ? -60 * ((progress - 0.5) / 0.15)
      : -60;

  // Car: 0.2 -> 0.9
  const carStart = 0.2;
  const carEnd = 0.9;
  const carProgress = Math.max(0, Math.min(1, (progress - carStart) / (carEnd - carStart)));
  const carVisible = progress >= carStart && progress <= carEnd;
  const carX = -25 + carProgress * 125;

  // Second line + CTA: fade in 0.7-0.85
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
            inset: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            backgroundColor: 'hsl(220, 20%, 97%)',
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
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground text-center leading-tight max-w-5xl">
              Every day without ads is
              <br />
              <span className="text-red-500">money lost.</span>
            </h2>
          </div>

          {/* Mercedes F1 car */}
          {carVisible && (
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
                src="/mercedes-f1.png"
                alt="Mercedes F1 car"
                className="w-full h-auto"
                draggable={false}
              />
            </div>
          )}

          {/* Second line + CTA */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6"
            style={{
              opacity: secondLineOpacity,
              transform: `translateY(${secondLineY}px)`,
              willChange: 'transform, opacity',
              zIndex: 10,
              pointerEvents: secondLineOpacity > 0.5 ? 'auto' : 'none',
            }}
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground text-center leading-tight">
              Let's fix that
              <br />
              <span className="text-gradient">today.</span>
            </h2>
            <a
              href="#contact"
              className="bg-teal text-white font-semibold px-8 py-3 rounded-lg hover:bg-teal-dark transition"
            >
              Book a Free Audit
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhileYouScroll;
