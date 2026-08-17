import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Megaphone, ChevronDown, ArrowRight } from 'lucide-react';
import SectionLabel from './SectionLabel';

const services = [
  {
    icon: Target,
    id: 'service-paid-ads',
    title: 'Paid Ads',
    href: '/services/paid-ads',
    description: 'Laser-targeted campaigns on Google & Meta that maximize your ROI.',
    details:
      'We build, manage, and optimize ad campaigns across Google Ads, Meta (Facebook & Instagram), and TikTok. Our data-driven approach includes audience research, creative testing, retargeting funnels, and weekly performance reporting to ensure every dollar drives measurable results.',
  },
  {
    icon: Megaphone,
    id: 'service-social-media',
    title: 'Social Media',
    href: '/services/social-media',
    description: 'Build authority with consistent, compelling content.',
    details:
      'We handle your entire social presence—content calendars, graphic design, copywriting, community management, and growth strategy across Instagram, Facebook, LinkedIn, and TikTok. Stay top-of-mind with your audience without lifting a finger.',
  },
];

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      id={service.id}
      className="scroll-mt-24 rounded-3xl bg-background shadow-custom-sm transition-shadow duration-300 hover:shadow-custom-lg"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={`${service.title}: ${open ? 'hide' : 'show'} details`}
        className="w-full p-7 text-left lg:p-9"
      >
        <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
          <service.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        </span>

        <h3 className="mb-2 font-serif text-2xl font-medium text-foreground">{service.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>

        <span className="mt-5 flex items-center justify-end">
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-7 pb-7 lg:px-9 lg:pb-9">
          <div className="space-y-4 border-t border-foreground/10 pt-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{service.details}</p>
            <div className="flex flex-wrap gap-5">
              <Link
                to={service.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesLight = () => (
  <section id="services" className="bg-white py-24 md:py-32">
    <div className="container-custom">
      <div className="mb-16 text-center">
        <SectionLabel number="004" label="Services" />
        <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          What We <span className="italic">Deliver</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          Full-stack digital marketing to dominate your market.
        </p>
      </div>

      <div className="mx-auto mb-12 grid max-w-3xl gap-6 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
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
