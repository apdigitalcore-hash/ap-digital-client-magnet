import { Link } from 'react-router-dom';
import { Scissors, Home, Wrench, MapPin } from 'lucide-react';

const industries = [
  { icon: Scissors, title: 'Salons & Beauty', description: 'Fill your chair with high-value clients every week.', link: '/salon-marketing' },
  { icon: Home, title: 'Real Estate Agents', description: 'Generate qualified buyer and seller leads consistently.', link: '/real-estate-marketing' },
  { icon: Wrench, title: 'Trades & Contractors', description: 'Get your phone ringing with quality local jobs.', link: '/trades-marketing' },
  { icon: MapPin, title: 'Coaches & Trainers', description: 'Fill your roster with clients ready to invest.', link: '/coaching-marketing' },
];

const IndustriesWeServe = () => (
  <section className="bg-white py-24">
    <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-10 text-center">Industries We Serve</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {industries.map((ind) => (
        <Link
          key={ind.title}
          to={ind.link}
          className="group reveal-card relative overflow-hidden bg-white elev-2 hover:elev-3 hover:-translate-y-1 rounded-3xl p-6 transition-all duration-300"
        >
          <span aria-hidden="true" className="reveal-wash absolute inset-0 bg-[#0C0E11]" />
          <div className="relative z-10 w-10 h-10 rounded-lg bg-[#EDEFF2] reveal-chip flex items-center justify-center mb-3">
            <ind.icon className="w-5 h-5 text-foreground reveal-ink" />
          </div>
          <h3 className="relative z-10 font-serif text-base font-medium text-foreground reveal-ink mb-1">{ind.title}</h3>
          <p className="relative z-10 text-muted-foreground reveal-body text-sm">{ind.description}</p>
        </Link>
      ))}
    </div>
  </section>
);

export default IndustriesWeServe;
