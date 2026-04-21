import { useState } from 'react';
import { 
  Target, 
  Video, 
  Globe, 
  Search, 
  Megaphone,
  BarChart3,
  ChevronDown
} from 'lucide-react';


const services = [
  {
    icon: Target,
    id: 'service-paid-ads',
    title: 'Paid Ads',
    description: 'Laser-targeted campaigns on Google & Meta that maximize your ROI.',
    stat: '8.2x avg. ROAS',
    details: 'We build, manage, and optimize ad campaigns across Google Ads, Meta (Facebook & Instagram), and TikTok. Our data-driven approach includes audience research, creative testing, retargeting funnels, and weekly performance reporting to ensure every dollar drives measurable results.',
  },
  {
    icon: Video,
    id: 'service-content-creation',
    title: 'Content Creation',
    description: 'Scroll-stopping short-form videos that capture attention.',
    stat: '2.5M+ views',
    details: 'From concept to final cut—we produce high-converting Reels, TikToks, and YouTube Shorts tailored to your brand. Includes scripting, filming guidance, professional editing, captions, and trend-driven hooks designed to go viral and generate inbound leads.',
  },
  {
    icon: Globe,
    id: 'service-web-design',
    title: 'Web Design',
    description: 'High-converting websites built for speed and conversions.',
    stat: '300% more leads',
    details: 'We design and develop fast, mobile-first websites optimized for lead capture. Every site includes conversion-focused landing pages, speed optimization, analytics integration, SEO foundations, and ongoing A/B testing to continuously improve performance.',
  },
  {
    icon: Search,
    id: 'service-seo',
    title: 'SEO',
    description: 'Rank higher on Google and attract organic traffic.',
    stat: 'Page 1 rankings',
    details: 'Our SEO strategy covers technical audits, on-page optimization, local SEO (Google Business Profile), keyword research, content strategy, and quality backlink building. We focus on ranking you for high-intent keywords that bring in ready-to-buy customers.',
  },
  {
    icon: Megaphone,
    id: 'service-social-media',
    title: 'Social Media',
    description: 'Build authority with consistent, compelling content.',
    stat: '850+ followers/mo',
    details: 'We handle your entire social presence—content calendars, graphic design, copywriting, community management, and growth strategy across Instagram, Facebook, LinkedIn, and TikTok. Stay top-of-mind with your audience without lifting a finger.',
  },
  {
    icon: BarChart3,
    id: 'service-lead-gen',
    title: 'Lead Gen',
    description: 'Predictable lead flow systems that fill your calendar.',
    stat: '25+ leads/week',
    details: 'We build end-to-end lead generation systems combining paid ads, landing pages, email/SMS follow-ups, and CRM automation. The result is a predictable pipeline of qualified prospects booking calls and appointments on autopilot.',
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
        className="w-full text-left p-6 lg:p-8"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center group-hover:bg-teal/20 transition-colors">
            <service.icon className="w-6 h-6 text-teal" />
          </div>
          <span className="text-sm font-semibold text-teal">
            {service.stat}
          </span>
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
          <div className="border-t border-border pt-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service.details}
            </p>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesDark;
