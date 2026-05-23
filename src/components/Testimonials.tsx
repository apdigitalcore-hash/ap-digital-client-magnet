import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Owner, Luxe Hair Studio',
    niche: 'Salon',
    content: "AP DIGITAL transformed our online presence completely. We went from struggling to book appointments to having a 3-week waitlist. Their social media strategy alone brought in 40+ new clients in the first month.",
    rating: 5,
    result: '+40 new clients/month',
  },
  {
    name: 'James Rodriguez',
    role: 'Broker, Prime Realty Group',
    niche: 'Real Estate',
    content: "The ROI on our paid ads has been incredible. We're now generating 25+ qualified leads per week, and our cost per lead dropped by 60%. Best investment we've made in marketing.",
    rating: 5,
    result: '25+ leads/week',
  },
  {
    name: 'Mike Thompson',
    role: 'Founder, Elite Plumbing Co.',
    niche: 'Trades',
    content: "As a plumber, I never thought digital marketing was for me. AP DIGITAL proved me wrong. Our local SEO now dominates, and we're fully booked 2 months out. Game-changer.",
    rating: 5,
    result: 'Booked 2 months ahead',
  },
];

const clientLogos = [
  'Urban Salon Co.',
  'HomeFind Realty',
  'ProBuild Contractors',
  'MindShift Coaching',
  'FlexFit Studios',
  'Premier Auto Care',
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider mb-4 block">
            Client Success Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Don't Take Our Word For It—{' '}
            <span className="text-gradient">See The Results</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real testimonials from real business owners who've transformed their growth with our help.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-xl p-6 lg:p-8 border border-border card-hover relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-teal" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-teal text-teal" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Result Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 text-teal text-sm font-semibold mb-6">
                {testimonial.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-8">
            Trusted by businesses across multiple industries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {clientLogos.map((logo) => (
              <div
                key={logo}
                className="px-6 py-3 bg-card rounded-lg border border-border text-muted-foreground font-medium hover:border-teal/30 hover:text-foreground transition-colors"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* Case Study */}
        <div className="mt-20 bg-card rounded-2xl p-6 sm:p-8 lg:p-12 border border-border">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-teal font-semibold text-sm uppercase tracking-wider mb-4 block">
                Featured Case Study
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                How We Helped a Local Salon 5x Their Bookings in 90 Days
              </h3>
              <p className="text-muted-foreground mb-6">
                Luxe Hair Studio was struggling with inconsistent bookings and low online visibility. 
                We implemented a comprehensive digital strategy including local SEO, social media content, 
                and targeted Facebook ads. The results speak for themselves.
              </p>
              <a href="https://calendly.com/apdigital-core/20min" target="_blank" rel="noopener noreferrer" className="text-teal font-semibold hover:underline inline-flex items-center gap-2">
                Get Similar Results →
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-secondary rounded-xl p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-teal mb-1 sm:mb-2">
                  487%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  ROI Increase
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-teal mb-1 sm:mb-2">
                  5x
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  More Bookings
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-teal mb-1 sm:mb-2">
                  90
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Days to Results
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
