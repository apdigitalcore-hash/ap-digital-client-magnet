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
          className="bg-white elev-2 hover:elev-3 rounded-3xl p-6 group transition-shadow duration-300"
        >
          <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-3 group-hover:bg-teal/20 transition-colors">
            <ind.icon className="w-5 h-5 text-foreground" />
          </div>
          <h3 className="font-serif text-base font-medium text-foreground mb-1">{ind.title}</h3>
          <p className="text-muted-foreground text-sm">{ind.description}</p>
        </Link>
      ))}
    </div>
  </section>
);

export default IndustriesWeServe;
