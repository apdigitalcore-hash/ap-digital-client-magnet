import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Hollis Whitaker',
    role: 'Salon Owner · Kitsilano, Vancouver',
    content: "Honestly thought another agency was going to be a waste of money. Six weeks in we had a proper waitlist and I had to hire a second stylist. The reels they shot in the studio just kept hitting.",
    result: '+40 clients/mo',
  },
  {
    name: 'Emmett Brogan',
    role: 'Realtor · North Vancouver',
    content: "I was dumping close to two grand a month into Zillow leads going nowhere. Switched everything to Meta ads with their team and now I'm closing 2-3 deals a month off it. Stopped checking Zillow entirely.",
    result: '25+ leads/wk',
  },
  {
    name: 'Declan Voss',
    role: 'Plumber · Calgary SE',
    content: "I'm a plumber, I don't know what a funnel is and I don't want to. They handle the Google stuff, the calls come in, I show up. Booked into late next month right now which has never happened before.",
    result: 'Booked 2 months',
  },
  {
    name: 'Sloane Marchetti',
    role: 'Executive Coach · Toronto',
    content: "Was getting maybe two discovery calls a month off LinkedIn and crickets everywhere else. The short-form content strategy they built completely changed it. Last month I had to close my calendar.",
    result: '7x more calls',
  },
];

const TestimonialsDark = () => {
  return (
    <section className="py-20 md:py-28 bg-charcoal-dark">
      <div className="container-custom">
        {/* Section header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3">
              Real Results. <span className="text-gradient">Real People.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg">
              Canadian business owners who stopped guessing and started growing.
            </p>
          </div>
          <Button variant="heroOutline" size="lg" asChild className="shrink-0">
            <Link to="/contact" className="flex items-center gap-2">
              Get Similar Results
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full p-6 rounded-2xl border border-gray-800 bg-charcoal-light/50 hover:border-teal/30 transition-colors duration-300 flex flex-col">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-teal text-teal" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 text-sm leading-relaxed mb-5 flex-1">
                  "{testimonial.content}"
                </p>

                {/* Result badge */}
                <div className="inline-flex self-start items-center px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-wide mb-5">
                  {testimonial.result}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-800/60">
                  <div>
                    <div className="font-semibold text-primary-foreground text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsDark;
