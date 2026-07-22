import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Megaphone,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';


const services = [
  {
    icon: Target,
    id: 'service-paid-ads',
    title: 'Paid Ads',
    href: '/services/paid-ads',
    description: 'Laser-targeted campaigns on Google & Meta that maximize your ROI.',
    details: 'We build, manage, and optimize ad campaigns across Google Ads, Meta (Facebook & Instagram), and TikTok. Our data-driven approach includes audience research, creative testing, retargeting funnels, and weekly performance reporting to ensure every dollar drives measurable results.',
  },
  {
    icon: Megaphone,
    id: 'service-social-media',
    title: 'Social Media',
    href: '/services/social-media',
    description: 'Build authority with consistent, compelling content.',
    details: 'We handle your entire social presence—content calendars, graphic design, copywriting, community management, and growth strategy across Instagram, Facebook, LinkedIn, and TikTok. Stay top-of-mind with your audience without lifting a finger.',
  },
];


const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      id={service.id}
      className="group relative rounded-2xl bg-card border border-border hover:border-teal/30 transition-all duration-300 hover:shadow-xl scroll-mt-24"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={`${service.title}: ${open ? 'hide' : 'show'} details`}
        className="w-full text-left p-6 lg:p-8"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center group-hover:bg-teal/20 transition-colors">
            <service.icon className="w-6 h-6 text-teal" />
          </div>
        </div>

        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-teal transition-colors">
          {service.title}
        </h3>

        <p className="text-muted-foreground">
          {service.description}
        </p>

        <div className="flex items-center justify-end mt-4">
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180 text-teal' : ''}`}
          />
        </div>
      </button>

      {/* Expandable details */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service.details}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={service.href}
                className="inline-flex items-center gap-1.5 text-teal text-sm font-semibold hover:gap-2.5 transition-all duration-200"
              >
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-1.5 text-muted-foreground text-sm font-semibold hover:text-teal transition-colors"
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

const ServicesDark = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-secondary">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            What We <span className="text-gradient">Deliver</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Full-stack digital marketing to dominate your market.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-3xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm">
          See how we've helped other businesses — <Link to="/case-studies" className="text-teal underline hover:text-teal/80">client results</Link> · <Link to="/blog" className="text-teal underline hover:text-teal/80">read our blog</Link>
        </p>
      </div>
    </section>
  );
};

export default ServicesDark;
