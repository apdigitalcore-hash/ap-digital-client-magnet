import { 
  Target, 
  Video, 
  Globe, 
  Search, 
  Megaphone,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Target,
    title: 'Paid Ads',
    description: 'Laser-targeted campaigns on Google & Meta that maximize your ROI.',
    stat: '8.2x avg. ROAS',
  },
  {
    icon: Video,
    title: 'Content Creation',
    description: 'Scroll-stopping short-form videos that capture attention.',
    stat: '2.5M+ views',
  },
  {
    icon: Globe,
    title: 'Web Design',
    description: 'High-converting websites built for speed and conversions.',
    stat: '300% more leads',
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Rank higher on Google and attract organic traffic.',
    stat: 'Page 1 rankings',
  },
  {
    icon: Megaphone,
    title: 'Social Media',
    description: 'Build authority with consistent, compelling content.',
    stat: '850+ followers/mo',
  },
  {
    icon: BarChart3,
    title: 'Lead Gen',
    description: 'Predictable lead flow systems that fill your calendar.',
    stat: '25+ leads/week',
  },
];

const niches = [
  { title: 'Salons & Beauty', link: '/salon-marketing' },
  { title: 'Real Estate', link: '/real-estate-marketing' },
  { title: 'Trades & Contractors', link: '/trades-marketing' },
  { title: 'Local Businesses', link: '/local-marketing' },
];

const ServicesDark = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-secondary">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            What We <span className="text-gradient">Deliver</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Full-stack digital marketing to dominate your market.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-teal/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
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
            </div>
          ))}
        </div>

        {/* Industries */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Specialized marketing for:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {niches.map((niche) => (
              <Link
                key={niche.title}
                to={niche.link}
                className="px-5 py-2.5 rounded-full bg-card border border-border text-foreground font-medium hover:border-teal hover:text-teal transition-all duration-300"
              >
                {niche.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesDark;
