import { useEffect, useRef, useState, useCallback } from 'react';

const lerp = (current: number, target: number, factor: number) =>
  current + (target - current) * factor;

const WhileYouScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // Mobile browsers change innerHeight when the URL bar hides/shows. Using
  // `vh`/live innerHeight made the 450vh track resize mid-scroll, which the
  // browser compensated for by jumping the scroll position. Lock the viewport
  // height once and only update it when the WIDTH changes (real orientation /
  // resize), never on height-only chrome collapse.
  const [vh, setVh] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
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

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const travel = Math.max(1, sectionHeight - vh);

      progressRef.current = Math.max(0, Math.min(1, -rect.top / travel));
      setInView(rect.top <= 0 && rect.bottom >= vh);
    };


    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return; // ignore URL-bar height changes
      lastWidth = window.innerWidth;
      setVh(window.innerHeight);
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
  }, [animate, vh]);

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
      className="relative bg-background"
      style={{ height: vh * 4.5, overflowAnchor: 'none' }}
    >
      <div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: vh,
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
              transform: `translate3d(0, ${firstLineY}px, 0)`,
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
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground text-center leading-tight">
              Let's fix that
              <br />
              <span className="text-gradient">today.</span>
            </h2>
            <a
              href="https://calendly.com/apdigital-core/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal text-white font-semibold px-8 py-3 rounded-lg hover:bg-teal-dark transition"
            >
              Book a Free Audit
            </a>
          </div>
      </div>

    </section>
  );
};

export default WhileYouScroll;
