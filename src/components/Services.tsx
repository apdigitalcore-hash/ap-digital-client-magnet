import { 
  Megaphone, 
  Share2, 
  Target, 
  Search, 
  Palette 
} from 'lucide-react';

const services = [
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Comprehensive campaigns that drive qualified traffic and convert visitors into loyal customers.',
    benefits: [
      'Multi-channel campaign strategy',
      'Performance tracking & analytics',
      'Monthly ROI reporting',
    ],
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    description: 'Build an engaged community and establish authority in your niche with consistent, compelling content.',
    benefits: [
      'Content calendar & scheduling',
      'Community engagement',
      'Growth-focused strategies',
    ],
  },
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
    icon: Palette,
    title: 'Brand Strategy',
    description: 'Develop a memorable brand identity that resonates with your target audience and sets you apart.',
    benefits: [
      'Brand positioning & messaging',
      'Visual identity design',
      'Competitive differentiation',
    ],
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
      </div>
    </section>
  );
};

export default Services;
