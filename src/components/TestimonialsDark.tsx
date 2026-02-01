import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Owner, Luxe Hair Studio',
    niche: 'Salon',
    content: "We went from struggling to book appointments to having a 3-week waitlist. Their social media strategy alone brought in 40+ new clients in the first month.",
    rating: 5,
    result: '+40 clients/month',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'James Rodriguez',
    role: 'Broker, Prime Realty',
    niche: 'Real Estate',
    content: "The ROI on our paid ads has been incredible. We're generating 25+ qualified leads per week, and our cost per lead dropped by 60%.",
    rating: 5,
    result: '25+ leads/week',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Mike Thompson',
    role: 'Founder, Elite Plumbing',
    niche: 'Trades',
    content: "As a plumber, I never thought digital marketing was for me. Now our local SEO dominates, and we're fully booked 2 months out.",
    rating: 5,
    result: 'Booked 2 months out',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
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
