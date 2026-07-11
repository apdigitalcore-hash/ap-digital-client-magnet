import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const F1Car = () => (
  <svg viewBox="0 0 400 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Motion blur lines */}
    <line x1="0" y1="55" x2="60" y2="55" stroke="#c0c0c0" strokeWidth="1.5" opacity="0.4" />
    <line x1="10" y1="65" x2="50" y2="65" stroke="#c0c0c0" strokeWidth="1" opacity="0.3" />
    <line x1="5" y1="75" x2="45" y2="75" stroke="#c0c0c0" strokeWidth="1" opacity="0.2" />

    {/* Car body - silver/dark Mercedes */}
    {/* Rear wing */}
    <rect x="75" y="28" width="8" height="3" rx="1" fill="#1a1a1a" />
    <rect x="72" y="22" width="14" height="6" rx="1" fill="#00D2BE" />
    <rect x="74" y="20" width="10" height="3" rx="1" fill="#1a1a1a" />

    {/* Engine cover / rear body */}
    <path d="M88 31 L88 55 L140 55 L140 38 Q130 28 88 31Z" fill="#2a2a2a" />
    <path d="M88 33 L88 53 L135 53 L135 40 Q128 30 88 33Z" fill="#3a3a3a" />

    {/* Air intake / halo */}
    <path d="M148 32 L152 28 L158 28 L162 32" fill="none" stroke="#1a1a1a" strokeWidth="3" />
    <rect x="150" y="28" width="10" height="3" rx="1" fill="#00D2BE" />

    {/* Cockpit */}
    <path d="M140 38 L148 32 L168 32 L175 38" fill="#0a0a0a" />
    <ellipse cx="158" cy="35" rx="6" ry="4" fill="#1a1a1a" />

    {/* Main body */}
    <path d="M140 38 L140 58 L280 58 L290 48 L280 38 Z" fill="#2a2a2a" />
    <path d="M145 40 L145 56 L275 56 L283 47 L275 40 Z" fill="#3a3a3a" />

    {/* Teal stripe */}
    <rect x="100" y="46" width="180" height="4" rx="1" fill="#00D2BE" />

    {/* Petronas teal accents */}
    <rect x="175" y="40" width="40" height="3" rx="1" fill="#00D2BE" opacity="0.8" />
    <rect x="220" y="40" width="25" height="3" rx="1" fill="#00D2BE" opacity="0.6" />

    {/* Front nose */}
    <path d="M280 42 L320 48 L320 52 L280 56 Z" fill="#2a2a2a" />
    <path d="M320 48 L345 50 L320 52 Z" fill="#1a1a1a" />

    {/* Front wing */}
    <path d="M330 44 L355 42 L360 44 L355 46 L330 46 Z" fill="#00D2BE" />
    <path d="M330 54 L355 56 L360 54 L355 52 L330 52 Z" fill="#00D2BE" />
    <rect x="355" y="40" width="3" height="20" rx="1" fill="#1a1a1a" />

    {/* Rear wheel */}
    <circle cx="115" cy="62" r="14" fill="#1a1a1a" />
    <circle cx="115" cy="62" r="11" fill="#333" />
    <circle cx="115" cy="62" r="6" fill="#555" />
    <circle cx="115" cy="62" r="3" fill="#00D2BE" />

    {/* Front wheel */}
    <circle cx="285" cy="60" r="14" fill="#1a1a1a" />
    <circle cx="285" cy="60" r="11" fill="#333" />
    <circle cx="285" cy="60" r="6" fill="#555" />
    <circle cx="285" cy="60" r="3" fill="#00D2BE" />

    {/* Side pods */}
    <path d="M160 55 L160 58 L240 58 L240 55" fill="#222" />

    {/* Number */}
    <text x="200" y="46" fontSize="8" fill="white" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">44</text>
  </svg>
);

const WhileYouScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      const scrolled = windowHeight - rect.top;
      const total = windowHeight + sectionHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const carProgress = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.55));
  const carX = -30 + carProgress * 130;

  const showFirstLine = scrollProgress > 0.05;
  const fadeFirstLine = scrollProgress > 0.45;
  const showSecondLine = scrollProgress > 0.65;

  return (
    <section
      id="while-you-scroll"
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: '500vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* First line - before car */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out px-6"
          style={{
            opacity: showFirstLine && !fadeFirstLine ? 1 : 0,
            transform: showFirstLine && !fadeFirstLine ? 'translateY(0)' : fadeFirstLine ? 'translateY(-60px)' : 'translateY(40px)',
          }}
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground text-center leading-tight">
            Every day without ads
            <br />
            <span className="text-red-500">is money lost.</span>
          </h2>
        </div>

        {/* Car */}
        <div
          className="absolute w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
          style={{
            left: `${carX}%`,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'none',
            opacity: carProgress > 0 && carProgress < 1 ? 1 : 0,
          }}
        >
          <F1Car />
        </div>

        {/* Track line */}
        <div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          style={{
            top: 'calc(50% + 50px)',
            opacity: carProgress > 0 && carProgress < 1 ? 0.5 : 0,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Second line - after car */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-out px-6"
          style={{
            opacity: showSecondLine ? 1 : 0,
            transform: showSecondLine ? 'translateY(0)' : 'translateY(40px)',
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
    </section>
  );
};

export default WhileYouScroll;
