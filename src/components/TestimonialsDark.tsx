import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Owner, Glow Beauty Bar',
    niche: 'Salon',
    content: "Honestly, I was skeptical at first. We'd tried a few agencies before and got burned. But these guys actually delivered—our booking calendar went from half-empty to a 3-week waitlist in about 6 weeks. The reels they made for us just kept going viral locally.",
    rating: 5,
    result: '+40 clients/month',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Marcus Chen',
    role: 'Realtor, Re/Max Elite',
    niche: 'Real Estate',
    content: "I was spending way too much on Zillow leads that never converted. AP Digital switched me to targeted Meta ads and honestly, the difference was night and day. I'm getting 25+ serious buyer inquiries a week now, and my cost per lead dropped by like 60%.",
    rating: 5,
    result: '25+ leads/week',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Dave Kowalski',
    role: 'Owner, Kowalski Plumbing & Heating',
    niche: 'Trades',
    content: "Look, I'm a plumber—I fix pipes, I don't do marketing. Tried doing my own Google Ads and wasted a ton of money. These guys took over and now we show up first when anyone in Mississauga searches for emergency plumbing. Fully booked 2 months out.",
    rating: 5,
    result: 'Booked 2 months out',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
];

const TestimonialsDark = () => {
  return (
    <section className="py-20 md:py-28 bg-charcoal-dark">
      <div className="container-custom">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              What Clients <span className="text-gradient">Say</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl">
              Don't take our word for it—hear from business owners who've transformed their growth.
            </p>
          </div>
          <Button variant="heroOutline" size="lg" asChild className="shrink-0">
            <Link to="/contact" className="flex items-center gap-2">
              Get Similar Results
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-teal/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full p-6 lg:p-8 rounded-2xl border border-gray-800 bg-charcoal-light/50 backdrop-blur-sm">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-teal/20 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-teal text-teal" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Result badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-semibold mb-6">
                  {testimonial.result}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsDark;
