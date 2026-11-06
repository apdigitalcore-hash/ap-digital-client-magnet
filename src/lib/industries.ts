/**
 * Every industry page, grouped. The list lives here only — two copies of it is
 * how the homepage's four went stale against the fifteen that actually exist.
 *
 * All fifteen are linked from the homepage, the city pages and the service
 * pages on purpose. An "Industries" index page would read cleaner but puts
 * every industry page an extra hop from the strongest pages on the site, and
 * with the site averaging position 40 in search, moving links further away is
 * the wrong direction.
 *
 * The groups are what a visitor scans. Fifteen equal tiles gave them fifteen
 * things to read and no order to read them in; six of those were trades, which
 * only became apparent after reading all fifteen.
 */
export const INDUSTRY_GROUPS = [
  {
    label: 'Trades & home services',
    items: [
      { name: 'Trades & Contractors', to: '/trades-marketing' },
      { name: 'General Contractors', to: '/contractor-marketing' },
      { name: 'HVAC', to: '/hvac-marketing' },
      { name: 'Plumbers', to: '/plumber-marketing' },
      { name: 'Electricians', to: '/electrician-marketing' },
      { name: 'Roofers', to: '/roofer-marketing' },
    ],
  },
  {
    label: 'Health & beauty',
    items: [
      { name: 'Dental & Clinics', to: '/dental-marketing' },
      { name: 'Salons & Beauty', to: '/salon-marketing' },
      { name: 'Gyms & Fitness', to: '/fitness-marketing' },
    ],
  },
  {
    label: 'Property',
    items: [
      { name: 'Real Estate', to: '/real-estate-marketing' },
      { name: 'Property Management', to: '/property-management-marketing' },
    ],
  },
  {
    label: 'Professional services',
    items: [
      { name: 'Law Firms', to: '/law-firm-marketing' },
      { name: 'Coaching & Consulting', to: '/coaching-marketing' },
    ],
  },
  {
    label: 'Consumer',
    items: [
      { name: 'Restaurants', to: '/restaurant-marketing' },
      { name: 'Car Detailing', to: '/car-detailing-marketing' },
    ],
  },
];

export const INDUSTRY_COUNT = INDUSTRY_GROUPS.reduce(
  (n, g) => n + g.items.length,
  0,
);
