import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { MARKS, type MarkKey } from './BrandMarks';
import { CursorArt, ChatArt } from './ObjectArt';

/**
 * Two service cards, wide, with the title split across two lines — the name in
 * full strength and the qualifier in a lighter tone — a LEARN MORE control, and
 * a media panel bleeding off the inner edge.
 *
 * The card used to carry a title, a one-line description, a long details
 * paragraph, a read-more link and a three-column bordered stat grid. The
 * details paragraph is the service page's job, so the card keeps the line that
 * says what the service is and the three facts a buyer actually weighs, set as
 * one quiet row rather than a bordered table.
 *
 * The media panel holds the real platform marks. A generic 3D object would say
 * less here than the Google and Meta logos do.
 */
const services: {
  id: string;
  title: string;
  qualifier: string;
  href: string;
  description: string;
  Art: typeof CursorArt;
  platforms: MarkKey[];
  facts: string[];
  tone: 'light' | 'dark';
}[] = [
  {
    id: 'service-paid-ads',
    title: 'Paid Ads',
    qualifier: 'Google & Meta',
    href: '/services/paid-ads',
    description:
      'Audience research, creative testing and retargeting funnels, reported weekly on leads rather than impressions.',
    Art: CursorArt,
    platforms: ['google', 'meta', 'facebook'],
    facts: ['$759 / month', '14 days to launch', 'No lock-in'],
    tone: 'light',
  },
  {
    id: 'service-social-media',
    title: 'Social Media',
    qualifier: 'content & community',
    href: '/services/social-media',
    description:
      'Content calendars, captions, scheduling and community management on the two platforms that fit your business.',
    Art: ChatArt,
    platforms: ['instagram', 'facebook', 'tiktok', 'meta'],
    facts: ['$849 / month', '12 posts / month', '2 platforms'],
    tone: 'dark',
  },
];

/* The drawing carries the panel; the platform chips sit beneath it, because a
   logo says which platforms this is actually bought on and a drawing cannot. */
const MediaPanel = ({
  Art,
  platforms,
  tone,
}: {
  Art: typeof CursorArt;
  platforms: MarkKey[];
  tone: 'light' | 'dark';
}) => {
  const dark = tone === 'dark';
  const line = dark ? 'hsl(0 0% 100% / 0.05)' : 'hsl(220 20% 10% / 0.045)';
  return (
    <div
      className={`relative flex shrink-0 flex-col items-center justify-center gap-5 overflow-hidden rounded-[1.5rem] px-6 py-8 sm:w-[42%] ${
        dark ? 'bg-white/[0.06]' : 'bg-[#E8EBEF]'
      }`}
    >
      {/* Faint grid, so the panel reads as a surface rather than a flat swatch. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
          backgroundSize: '26px 26px',
        }}
      />
      <Art tone={dark ? 'dark' : 'light'} className="relative h-28 w-28 sm:h-32 sm:w-32" />
      <div className="relative flex items-center gap-2.5">
        {platforms.map((key) => {
          const { Mark, label } = MARKS[key];
          return (
            <span
              key={key}
              title={label}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-[0_8px_18px_-10px_hsl(220_30%_5%/0.45)]"
            >
              <Mark className="h-[1.15rem] w-[1.15rem]" />
            </span>
          );
        })}
      </div>
    </div>
  );
};

const ServicesLight = () => (
  <section id="services" className="bg-[#EDEFF2] py-24 md:py-32">
    <div className="container-custom">
      <div className="mb-14 text-center">
        <SectionLabel label="Services" />
        <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          What We <span className="italic">Deliver</span>
        </h2>
      </div>

      <div className="mx-auto mb-12 grid max-w-5xl gap-6">
        {services.map((service) => {
          const dark = service.tone === 'dark';
          return (
            <article
              key={service.id}
              id={service.id}
              className={`elev-2 scroll-mt-24 overflow-hidden rounded-[1.75rem] p-5 sm:p-6 ${
                dark ? 'bg-[#0C0E11]' : 'bg-white'
              }`}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch">
                <div className="flex flex-1 flex-col justify-between gap-7 py-2 sm:py-4 sm:pl-4">
                  <div>
                    <h3 className="font-serif text-[1.9rem] font-medium leading-[1.15] sm:text-[2.35rem]">
                      <span className={dark ? 'text-white' : 'text-foreground'}>
                        {service.title}
                      </span>
                      <br />
                      <span className={dark ? 'text-white/45' : 'text-foreground/40'}>
                        {service.qualifier}
                      </span>
                    </h3>
                    <p
                      className={`mt-4 max-w-md text-sm leading-relaxed ${
                        dark ? 'text-white/60' : 'text-muted-foreground'
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div>
                    <Link
                      to={service.href}
                      className="group inline-flex items-center gap-3"
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 group-hover:-translate-y-0.5 ${
                          dark ? 'bg-white' : 'bg-foreground'
                        }`}
                      >
                        <ArrowUpRight
                          className={`h-4 w-4 ${dark ? 'text-[#0C0E11]' : 'text-background'}`}
                          strokeWidth={2}
                        />
                      </span>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                          dark ? 'text-white/70' : 'text-foreground/70'
                        }`}
                      >
                        Learn more
                      </span>
                    </Link>

                    <p
                      className={`mt-5 text-xs ${dark ? 'text-white/40' : 'text-foreground/40'}`}
                    >
                      {service.facts.join('  ·  ')}
                    </p>
                  </div>
                </div>

                <MediaPanel
                  Art={service.Art}
                  platforms={service.platforms}
                  tone={service.tone}
                />
              </div>
            </article>
          );
        })}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        See exactly how we work —{' '}
        <Link to="/case-studies" className="text-foreground underline underline-offset-4">
          our approach
        </Link>{' '}
        ·{' '}
        <Link to="/blog" className="text-foreground underline underline-offset-4">
          read our blog
        </Link>
      </p>
    </div>
  </section>
);

export default ServicesLight;
