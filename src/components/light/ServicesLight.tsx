import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { MARKS, type MarkKey } from './BrandMarks';

const services: {
  id: string;
  title: string;
  href: string;
  description: string;
  details: string;
  platforms: MarkKey[];
  stats: { value: string; label: string }[];
}[] = [
  {
    id: 'service-paid-ads',
    title: 'Paid Ads',
    href: '/services/paid-ads',
    description: 'Laser-targeted campaigns on Google & Meta that maximize your ROI.',
    details:
      'We build, manage, and optimize ad campaigns across Google Ads, Meta (Facebook & Instagram), and TikTok — audience research, creative testing, retargeting funnels, and weekly performance reporting.',
    platforms: ['google', 'meta', 'facebook', 'tiktok'],
    stats: [
      { value: '$759', label: 'Per month' },
      { value: '14', label: 'Days to launch' },
      { value: '0', label: 'Lock-in months' },
    ],
  },
  {
    id: 'service-social-media',
    title: 'Social Media',
    href: '/services/social-media',
    description: 'Build authority with consistent, compelling content.',
    details:
      'Your entire social presence handled — content calendars, design, copywriting, community management, and growth strategy across Instagram, Facebook, LinkedIn, and TikTok.',
    platforms: ['instagram', 'facebook', 'tiktok', 'meta'],
    stats: [
      { value: '12+', label: 'Posts / month' },
      { value: '340%', label: 'Avg growth' },
      { value: '4', label: 'Platforms' },
    ],
  },
];

/* Dark tile carrying the platform marks — the logos are the point of interest,
   so the tile stays plain and the chips supply the colour. */
const PlatformTile = ({ platforms }: { platforms: MarkKey[] }) => (
  <div className="relative mx-auto aspect-square w-full max-w-[240px] shrink-0 sm:mx-0 sm:w-[38%] sm:max-w-none">
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] p-5"
      style={{
        background:
          'linear-gradient(160deg, #2E333A 0%, #1B1F25 30%, #101318 62%, #0A0C0F 100%)',
        boxShadow:
          '0 26px 60px -22px hsl(220 30% 8% / 0.5), inset 0 -14px 34px hsl(0 0% 0% / 0.5)',
      }}
    >
      {/* Corner light source. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 48% at 26% 10%, hsl(0 0% 100% / 0.20) 0%, transparent 68%)',
        }}
      />
      {/* Top rim light. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10%] top-px h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.45), transparent)',
        }}
      />

      <div className="relative grid grid-cols-2 gap-3.5">
        {platforms.map((key) => {
          const { Mark, label } = MARKS[key];
          return (
            <span
              key={key}
              title={label}
              className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl bg-white shadow-[0_6px_16px_-6px_hsl(220_30%_5%/0.6)]"
            >
              <Mark className="h-7 w-7" />
            </span>
          );
        })}
      </div>
    </div>
  </div>
);

const ServicesLight = () => (
  <section id="services" className="bg-white py-24 md:py-32">
    <div className="container-custom">
      <div className="mb-16 text-center">
        <SectionLabel label="Services" />
        <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          What We <span className="italic">Deliver</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          Full-stack digital marketing to dominate your market.
        </p>
      </div>

      <div className="mx-auto mb-12 max-w-4xl space-y-6">
        {services.map((service) => (
          <div
            key={service.title}
            id={service.id}
            className="elev-2 hover:elev-3 group scroll-mt-24 rounded-[2rem] bg-[#F4F6F8] p-4 transition-shadow duration-300 sm:p-5"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-7">
              <PlatformTile platforms={service.platforms} />

              <div className="flex flex-1 flex-col justify-center py-2 pr-1 sm:py-4">
                <h3 className="font-serif text-2xl font-medium text-foreground sm:text-[1.75rem]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {service.details}
                </p>

                <Link
                  to={service.href}
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  Read more
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>

                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-foreground/10 pt-5">
                  {service.stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-serif text-xl text-foreground sm:text-2xl">{s.value}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        See how we've helped other businesses —{' '}
        <Link to="/case-studies" className="text-foreground underline underline-offset-4">how we work</Link> ·{' '}
        <Link to="/blog" className="text-foreground underline underline-offset-4">read our blog</Link>
      </p>
    </div>
  </section>
);

export default ServicesLight;
