import { useState } from 'react';
import { ArrowRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import realEstateBefore from '@/assets/real-estate-before.jpg';
import realEstateAfter from '@/assets/real-estate-after.jpg';

interface CaseStudy {
  id: number;
  client: string;
  niche: string;
  location: string;
  tagline: string;
  description: string;
  metrics: { value: string; label: string }[];
  services: string[];
  beforeImage: string;
  afterImage: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    client: 'Luxe Hair Studio',
    niche: 'Salon & Beauty',
    location: 'Mississauga, ON',
    tagline: 'From half-empty chairs to a 3-week waitlist',
    description: 'Luxe was struggling with inconsistent bookings and zero online presence. We built a conversion-focused website, launched targeted Instagram Reels, and ran Meta ads to local audiences.',
    metrics: [
      { value: '62%', label: 'More Bookings' },
      { value: '3-Week', label: 'Waitlist' },
      { value: '#1', label: 'Google Local' },
    ],
    services: ['Website Design', 'Instagram Reels', 'Meta Ads'],
    beforeImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop&q=60&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    client: 'ProPlumb Solutions',
    niche: 'Trades & Contractors',
    location: 'Vancouver, BC',
    tagline: 'Booked solid for 2 months straight',
    description: 'ProPlumb relied entirely on word-of-mouth. We took over their Google presence—optimized their profile, built local citations, and launched Google Ads targeting emergency keywords.',
    metrics: [
      { value: '110%', label: 'More Leads' },
      { value: '$14', label: 'Cost Per Call' },
      { value: '5x', label: 'Google Reviews' },
    ],
    services: ['Google Ads', 'Local SEO', 'Review Management'],
    beforeImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop&q=60&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    client: 'Coastal Realty Group',
    niche: 'Real Estate',
    location: 'Toronto, ON',
    tagline: '340 qualified leads in 90 days',
    description: 'Coastal was burning cash on Zillow with minimal returns. We created hyper-targeted Facebook and Instagram campaigns with compelling property showcases and retargeting funnels.',
    metrics: [
      { value: '$3.10', label: 'Per Lead' },
      { value: '215', label: 'Leads in 90 Days' },
      { value: '9', label: 'Deals Closed' },
    ],
    services: ['Meta Ads', 'Landing Pages', 'Retargeting'],
    beforeImage: realEstateBefore,
    afterImage: realEstateAfter,
  },
  {
    id: 4,
    client: 'Maple Dental Care',
    niche: 'Dental / Healthcare',
    location: 'Calgary, AB',
    tagline: '200+ new patients in 6 months',
    description: 'Maple Dental had an outdated website that failed to convert. We redesigned it with virtual tours, patient reviews, and seamless booking. Combined with multi-location SEO, patient acquisition skyrocketed.',
    metrics: [
      { value: '23', label: 'New Patients/Mo' },
      { value: '4.9★', label: 'Google Rating' },
      { value: '41%', label: 'More Bookings' },
    ],
    services: ['Website Redesign', 'Local SEO', 'Content Strategy'],
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop&q=60&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-near-black">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-teal text-sm font-bold uppercase tracking-widest mb-3">Case Studies</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3">
              Our <span className="text-gradient">Work</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg">
              Real campaigns. Real numbers. Drag to compare before & after.
            </p>
          </div>
          <Button variant="heroOutline" size="lg" asChild className="shrink-0">
            <Link to="/contact" className="flex items-center gap-2">
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              className="group relative rounded-2xl overflow-hidden border border-gray-800 hover:border-teal/30 transition-all duration-500 bg-charcoal-light/30"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Before/After Slider */}
                <div className="relative h-72 md:h-[420px] overflow-hidden">
                  <BeforeAfterSlider
                    beforeImage={study.beforeImage}
                    afterImage={study.afterImage}
                  />
                  {/* Niche badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-near-black/70 backdrop-blur-sm border border-gray-700 text-xs font-medium text-primary-foreground z-20">
                    {study.niche}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <span>{study.location}</span>
                  </div>
                  
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2 group-hover:text-teal transition-colors">
                    {study.client}
                  </h3>
                  
                  <p className="text-teal text-sm font-semibold mb-4 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    {study.tagline}
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {study.description}
                  </p>

                  {/* Services tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 rounded-full bg-gray-800/60 text-xs text-gray-300 border border-gray-700/50"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800/60">
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4">Want to be our next success story?</p>
          <Button variant="hero" size="xl" asChild className="shadow-teal-lg">
            <Link to="/contact" className="flex items-center gap-2">
              Get Your Free Growth Audit
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
