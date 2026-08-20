import { useEffect, useRef, useState, useCallback } from 'react';

const lerp = (current: number, target: number, factor: number) =>
  current + (target - current) * factor;

const MOBILE_QUERY = '(max-width: 767px)';

const WhileYouScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [inView, setInView] = useState(false);
  const [, forceRender] = useState(0);

  // Match the live device, not a desktop responsive mode. The URL-bar
  // collapsing/expanding is what breaks `vh` overlays on phones, and that only
  // happens on a real mobile viewport. On mobile we never mount the fixed
  // overlay or start the rAF loop — the section scrolls as a normal block.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const animate = useCallback(() => {
    const prev = smoothProgressRef.current;
    smoothProgressRef.current = lerp(prev, progressRef.current, 0.08);

    if (Math.abs(smoothProgressRef.current - prev) > 0.0001) {
      forceRender(n => n + 1);
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isMobile) return; // no scroll-tracking / rAF on phones

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const winH = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - winH);

      progressRef.current = Math.max(0, Math.min(1, -rect.top / travel));
      setInView(rect.top <= 5 && rect.bottom > winH * 0.9);
    };

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, isMobile]);

  const progress = smoothProgressRef.current;

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

  const carStart = 0.2;
  const carEnd = 0.9;
  const carProgress = Math.max(0, Math.min(1, (progress - carStart) / (carEnd - carStart)));
  const carVisible = progress >= carStart - 0.02 && progress <= carEnd + 0.02;
  const carX = -25 + carProgress * 125;

  const secondLineOpacity =
    progress < 0.7 ? 0 : Math.min(1, (progress - 0.7) / 0.15);
  const secondLineY =
    progress < 0.7 ? 40 : 40 * (1 - Math.min(1, (progress - 0.7) / 0.15));

  // Mobile: render the copy and CTA as a normal document-flow section. No fixed
  // overlay, no 450lvh track, no car animation — just the messaging stacked in
  // plain blocks so it scrolls without any snapping.
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="while-you-scroll"
        className="relative bg-[#EDEFF2] px-6 py-24"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
          <h2 className="font-serif text-3xl font-medium text-foreground leading-[1.05] tracking-tight sm:text-4xl">
            Every day without ads is
            <br />
            <span className="italic">money lost.</span>
          </h2>

          <img
            src="/mercedes-f1.png"
            alt="Mercedes F1 car racing across screen — AP Digital performance marketing"
            className="w-full max-w-[320px] h-auto"
            loading="lazy"
            decoding="async"
            draggable={false}
          />

          <h2 className="font-serif text-4xl font-medium text-foreground leading-[1.05] tracking-tight sm:text-5xl">
            Let's fix that
            <br />
            <span className="italic">today.</span>
          </h2>
          <a
            href="https://calendly.com/apdigital-core/20min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85"
          >
            Book a Free Audit
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="while-you-scroll"
      className="relative bg-[#EDEFF2]"
      style={{ height: '450lvh', overflowAnchor: 'none' }}
    >
      <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100lvh',
            margin: 0,
            padding: 0,
            backgroundColor: '#EDEFF2',
            overflow: 'hidden',
            zIndex: 30,
            opacity: inView ? 1 : 0,
            visibility: inView ? 'visible' : 'hidden',
            pointerEvents: inView ? 'auto' : 'none',
          }}
        >

          {/* First line */}
          <div
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{
              opacity: firstLineOpacity,
              transform: `translate3d(0, ${firstLineY}px, 0)`,
              willChange: 'transform, opacity',
              zIndex: 10,
            }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground text-center leading-[1.05] tracking-tight max-w-5xl">
              Every day without ads is
              <br />
              <span className="italic">money lost.</span>
            </h2>
          </div>

          {/* Mercedes F1 car */}
          {carVisible && (
            <div
              className="absolute w-[240px] sm:w-[320px] md:w-[420px] lg:w-[520px] xl:w-[620px]"
              style={{
                transform: `translate3d(${carX}vw, -50%, 0)`,
                top: '50%',
                left: 0,
                zIndex: 20,
                willChange: 'transform',
              }}
            >
              <img
                src="/mercedes-f1.png"
                alt="Mercedes F1 car racing across screen — AP Digital performance marketing"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          )}

          {/* Second line + CTA */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6"
            style={{
              opacity: secondLineOpacity,
              transform: `translate3d(0, ${secondLineY}px, 0)`,
              willChange: 'transform, opacity',
              zIndex: 10,
              pointerEvents: secondLineOpacity > 0.5 ? 'auto' : 'none',
            }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-foreground text-center leading-[1.05] tracking-tight">
              Let's fix that
              <br />
              <span className="italic">today.</span>
            </h2>
            <a
              href="https://calendly.com/apdigital-core/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85"
            >
              Book a Free Audit
            </a>
          </div>
      </div>

    </section>
  );
};

export default WhileYouScroll;
