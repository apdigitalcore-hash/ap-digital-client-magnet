import { useEffect, useRef, useState, useCallback } from 'react';

const lerp = (current: number, target: number, factor: number) =>
  current + (target - current) * factor;

const WhileYouScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // The scroll track is sized in CSS with lvh rather than a JS pixel value.
  // Measuring innerHeight once captured whichever state the URL bar happened
  // to be in at mount, which could disagree with the 100lvh panel below and
  // let the track run out before the reveal finished. lvh is the same fixed
  // reference for both, and never re-measures mid-scroll.
  const progressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [inView, setInView] = useState(false);
  const [, forceRender] = useState(0);


  const animate = useCallback(() => {
    const prev = smoothProgressRef.current;
    smoothProgressRef.current = lerp(prev, progressRef.current, 0.08);

    if (Math.abs(smoothProgressRef.current - prev) > 0.0001) {
      forceRender(n => n + 1);
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      // Measure against the LIVE viewport height so the reveal timing stays in
      // sync while mobile browser chrome collapses/expands. The locked `vh` is
      // only used for the track height (avoids layout-driven scroll jumps).
      const winH = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - winH);

      progressRef.current = Math.max(0, Math.min(1, -rect.top / travel));
      setInView(rect.top <= 5 && rect.bottom > winH * 0.9);
    };


    let lastWidth = window.innerWidth;
    const handleResize = () => {
      // Ignore height-only changes: on mobile those are just the URL bar
      // collapsing, and reacting to them is what caused the scroll to jump.
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
  }, [animate]);

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

  return (
    <section
      ref={sectionRef}
      id="while-you-scroll"
      className="relative bg-[#EDEFF2]"
      style={{ height: '450lvh', overflowAnchor: 'none' }}
    >
      {/*
        Height is 100lvh, not 100dvh. `dvh` re-measures continuously while the
        mobile URL bar collapses, so this fixed panel resized during the scroll
        and its centred content visibly slid — the "snapping back to centre"
        glitch. `lvh` is pinned to the bar-hidden viewport and never changes.

        lvh rather than svh because this is a full-bleed background: svh is the
        smaller value, so once the bar hid, the panel would fall short of the
        viewport and expose the page behind it.
      */}
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
