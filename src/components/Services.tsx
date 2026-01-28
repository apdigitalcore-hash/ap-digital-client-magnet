import { 
  Megaphone, 
  Target, 
  Video, 
  Globe, 
  Search, 
  Users,
  Scissors,
  Home,
  Wrench,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Target,
    title: 'Paid Advertising',
    description: 'Laser-targeted ads on Google, Facebook, and Instagram that maximize your ad spend ROI.',
    benefits: [
      'Google & Meta Ads certified',
      'A/B testing & optimization',
      'Retargeting campaigns',
    ],
  },
  {
    icon: Video,
    title: 'Content Creation',
    description: 'Scroll-stopping short-form videos and graphics that capture attention and drive engagement.',
    benefits: [
      'Short-form video production',
      'Social media graphics',
      'Brand photography',
    ],
  },
  {
    icon: Globe,
    title: 'Web Services',
    description: 'High-converting websites and landing pages designed to turn visitors into paying customers.',
    benefits: [
      'Custom website design',
      'Landing page optimization',
      'Mobile-first development',
    ],
  },
  {
    icon: Megaphone,
    title: 'Social Media Management',
    description: 'Build an engaged community and establish authority with consistent, compelling content.',
    benefits: [
      'Content calendar & scheduling',
      'Community engagement',
      'Growth-focused strategies',
    ],
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Rank higher on Google and attract organic traffic that converts—without paying for every click.',
    benefits: [
      'Local SEO for service areas',
      'Technical SEO audits',
      'Content optimization',
    ],
  },
  {
    icon: Users,
    title: 'Lead Generation',
    description: 'Predictable lead flow systems that keep your calendar full with qualified prospects.',
    benefits: [
      'Funnel optimization',
      'Lead nurturing sequences',
      'CRM integration',
    ],
  },
];

const niches = [
  {
    icon: Scissors,
    title: 'Salon & Beauty',
    description: 'Fill your appointment book with high-value clients.',
    link: '/salon-marketing',
  },
  {
    icon: Home,
    title: 'Real Estate',
    description: 'Generate qualified buyer and seller leads consistently.',
    link: '/real-estate-marketing',
  },
  {
    icon: Wrench,
    title: 'Trades & Contractors',
    description: 'Get more calls from homeowners who need your services.',
    link: '/trades-marketing',
  },
  {
    icon: MapPin,
    title: 'Local Businesses',
    description: 'Dominate your local market and outrank competitors.',
    link: '/local-marketing',
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider mb-4 block">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to{' '}
            <span className="text-gradient">Dominate Online</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From strategy to execution, we handle every aspect of your digital presence 
            so you can focus on what you do best—running your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-card rounded-xl p-6 lg:p-8 card-hover border border-border group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-6 group-hover:bg-teal/20 transition-colors">
                <service.icon className="w-6 h-6 text-teal" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Industries We Serve */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider mb-4 block">
            Industries We Serve
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Specialized Marketing for Your Industry
          </h3>
          <p className="text-muted-foreground">
            We understand the unique challenges of your business and deliver results that matter.
          </p>
        </div>

        {/* Niches Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {niches.map((niche, index) => (
            <Link
              key={niche.title}
              to={niche.link}
              className="bg-card rounded-xl p-6 card-hover border border-border group text-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-4 group-hover:bg-teal/20 transition-colors">
                <niche.icon className="w-5 h-5 text-teal" />
              </div>
              
              <h4 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-teal transition-colors">
                {niche.title}
              </h4>
              
              <p className="text-muted-foreground text-sm">
                {niche.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
