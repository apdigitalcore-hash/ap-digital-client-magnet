import { Link } from 'react-router-dom';
import {
  Scissors, Home, Building2, Wrench, GraduationCap, Stethoscope, Wind,
  Dumbbell, UtensilsCrossed, Scale, Droplets, Zap, HardHat, Hammer,
} from 'lucide-react';

/**
 * Every industry page, as one compact band of links.
 *
 * The homepage and the city pages each used to show four of the fourteen, in
 * their own markup, which meant a dentist, lawyer, roofer or restaurant owner
 * saw nothing for them — and ten pages got no link from the strongest pages on
 * the site.
 *
 * A single "Industries" card opening an index page would read cleaner, but it
 * puts every industry page an extra hop from the homepage. With the site
 * averaging position 40 in search, moving links further away is the wrong
 * direction, so this keeps all fourteen and makes the tiles small enough that
 * it still takes less room than four large cards did.
 *
 * The list lives here only. Two copies of it is how four became stale.
 */
const INDUSTRIES = [
  { icon: Home, name: 'Real Estate', to: '/real-estate-marketing' },
  { icon: Scissors, name: 'Salons & Beauty', to: '/salon-marketing' },
  { icon: GraduationCap, name: 'Coaching & Consulting', to: '/coaching-marketing' },
  { icon: Stethoscope, name: 'Dental & Clinics', to: '/dental-marketing' },
  { icon: Dumbbell, name: 'Gyms & Fitness', to: '/fitness-marketing' },
  { icon: UtensilsCrossed, name: 'Restaurants', to: '/restaurant-marketing' },
  { icon: Scale, name: 'Law Firms', to: '/law-firm-marketing' },
  { icon: Wrench, name: 'Trades & Contractors', to: '/trades-marketing' },
  { icon: Hammer, name: 'General Contractors', to: '/contractor-marketing' },
  { icon: Wind, name: 'HVAC', to: '/hvac-marketing' },
  { icon: Droplets, name: 'Plumbers', to: '/plumber-marketing' },
  { icon: Zap, name: 'Electricians', to: '/electrician-marketing' },
  { icon: HardHat, name: 'Roofers', to: '/roofer-marketing' },
  { icon: Building2, name: 'Property Management', to: '/property-management-marketing' },
];

const IndustryGrid = ({ className = '' }: { className?: string }) => (
  <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 ${className}`}>
    {INDUSTRIES.map(({ icon: Icon, name, to }) => (
      <Link
        key={to}
        to={to}
        className="group flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 elev-1 transition-all duration-200 hover:-translate-y-0.5 hover:elev-2"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EDEFF2] transition-colors group-hover:bg-[#0C0E11]">
          <Icon className="h-4 w-4 text-foreground transition-colors group-hover:text-white" strokeWidth={1.75} />
        </span>
        <span className="text-sm font-medium leading-tight text-foreground">{name}</span>
      </Link>
    ))}
  </div>
);

export default IndustryGrid;
