import { Link } from 'react-router-dom';
import { Target, Megaphone, Video } from 'lucide-react';

const services = [
  { icon: Target, title: 'Paid Advertising', description: 'Targeted ads on Google, Facebook & Instagram that maximize ROI.', link: '/services/paid-ads' },
  { icon: Megaphone, title: 'Social Media Management', description: 'Build authority and engagement with consistent, compelling content.', link: '/services/social-media' },
  { icon: Video, title: 'Content Creation', description: 'Scroll-stopping short-form videos and graphics that drive action.', link: '/services/content-creation' },
];

const OurServices = () => (
  <section className="mt-16 pt-12 border-t border-border">
    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Our Services</h2>
    <div className="grid sm:grid-cols-3 gap-4">
      {services.map((svc) => (
        <Link
          key={svc.title}
          to={svc.link}
          className="bg-card border border-border rounded-xl p-5 group hover:border-teal/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-3 group-hover:bg-teal/20 transition-colors">
            <svc.icon className="w-5 h-5 text-teal" />
          </div>
          <h3 className="font-display text-base font-bold text-foreground mb-1 group-hover:text-teal transition-colors">{svc.title}</h3>
          <p className="text-muted-foreground text-sm">{svc.description}</p>
        </Link>
      ))}
    </div>
  </section>
);

export default OurServices;
