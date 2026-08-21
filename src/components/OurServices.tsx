import { Link } from 'react-router-dom';
import { Target, Megaphone } from 'lucide-react';

const services = [
  { icon: Target, title: 'Paid Advertising', description: 'Targeted ads on Google, Facebook & Instagram that maximize ROI.', link: '/services/paid-ads' },
  { icon: Megaphone, title: 'Social Media Management', description: 'Build authority and engagement with consistent, compelling content.', link: '/services/social-media' },
];

const OurServices = () => (
  <section className="bg-white py-24">
    <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-10 text-center">Our Services</h2>
    <div className="grid sm:grid-cols-2 max-w-2xl gap-4">
      {services.map((svc) => (
        <Link
          key={svc.title}
          to={svc.link}
          className="bg-white elev-2 hover:elev-3 rounded-3xl p-6 group transition-shadow duration-300"
        >
          <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-3 group-hover:bg-teal/20 transition-colors">
            <svc.icon className="w-5 h-5 text-foreground" />
          </div>
          <h3 className="font-serif text-base font-medium text-foreground mb-1">{svc.title}</h3>
          <p className="text-muted-foreground text-sm">{svc.description}</p>
        </Link>
      ))}
    </div>
  </section>
);

export default OurServices;
