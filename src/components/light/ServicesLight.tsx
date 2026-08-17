import { Link } from 'react-router-dom';
import { Target, Megaphone, ArrowRight } from 'lucide-react';
import SectionLabel from './SectionLabel';

const services = [
  {
    icon: Target,
    id: 'service-paid-ads',
    title: 'Paid Ads',
    href: '/services/paid-ads',
    description: 'Laser-targeted campaigns on Google & Meta that maximize your ROI.',
    details:
      'We build, manage, and optimize ad campaigns across Google Ads, Meta (Facebook & Instagram), and TikTok — audience research, creative testing, retargeting funnels, and weekly performance reporting.',
    stats: [
      { value: '5–10x', label: 'Avg ROAS' },
      { value: '14', label: 'Days to launch' },
      { value: '$15+', label: 'Cost per lead' },
    ],
  },
  {
    icon: Megaphone,
    id: 'service-social-media',
    title: 'Social Media',
    href: '/services/social-media',
    description: 'Build authority with consistent, compelling content.',
    details:
      'Your entire social presence handled — content calendars, design, copywriting, community management, and growth strategy across Instagram, Facebook, LinkedIn, and TikTok.',
    stats: [
      { value: '12+', label: 'Posts / month' },
      { value: '340%', label: 'Avg growth' },
      { value: '4', label: 'Platforms' },
    ],
  },
];

/* Dark glossy tile — the anchor object in each card, per the reference. */
const GlossObject = ({ Icon }: { Icon: typeof Target }) => (
  <div className="relative mx-auto aspect-square w-full max-w-[240px] shrink-0 sm:mx-0 sm:w-[38%] sm:max-w-none">
    <div
      className="relative h-full w-full overflow-hidden rounded-[2rem]"
      style={{
        background:
          'linear-gradient(160deg, #3A3F47 0%, #22262C 26%, #12151A 58%, #0A0C0F 100%)',
        boxShadow:
          '0 26px 60px -22px hsl(220 30% 8% / 0.5), inset 0 -14px 34px hsl(0 0% 0% / 0.55)',
      }}
    >
      {/* Corner light source. */}
      <span
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 48% at 26% 12%, hsl(0 0% 100% / 0.24) 0%, transparent 68%)',
        }}
      />
      {/* Glossy droplet at centre. */}
      <span
        className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2"
        style={{
          borderRadius: '52% 48% 46% 54% / 48% 52% 48% 52%',
          background:
            'radial-gradient(48% 44% at 34% 26%, hsl(0 0% 100% / 0.62) 0%, hsl(220 12% 42% / 0.36) 24%, #14171B 58%, #07090B 100%)',
          boxShadow:
            '0 16px 30px -10px hsl(0 0% 0% / 0.7), inset 0 -6px 16px hsl(0 0% 0% / 0.6)',
        }}
      />
      {/* Icon reads over the object so the tile still says what it is. */}
      <span className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-7 w-7 text-white/85" strokeWidth={1.5} />
      </span>
      {/* Top rim light. */}
      <span
        className="absolute inset-x-[10%] top-px h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.5), transparent)',
        }}
      />
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
              <GlossObject Icon={service.icon} />

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
        <Link to="/case-studies" className="text-foreground underline underline-offset-4">client results</Link> ·{' '}
        <Link to="/blog" className="text-foreground underline underline-offset-4">read our blog</Link>
      </p>
    </div>
  </section>
);

export default ServicesLight;
