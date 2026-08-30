import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DarkCTAProps {
  headline?: string;
  subheadline?: string;
  showPhone?: boolean;
}

const DarkCTA = ({ 
  headline = "Ready to Scale Your Business?", 
  subheadline = "Book a free strategy call and see exactly how we can grow your leads and revenue.",
  showPhone = true 
}: DarkCTAProps) => {
  return (
    <section className="relative py-24 md:py-32 bg-charcoal overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[300px] bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-teal/3 rounded-full blur-3xl" />
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" asChild className="shadow-teal-lg">
              <Link to="/book" className="flex items-center gap-2">
                Book a Free Strategy Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            {showPhone && (
              <Button variant="light" size="lg" asChild>
                <a href="tel:+17786825772" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 (778) 682-5772
                </a>
              </Button>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal" />
              No long-term contracts
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal" />
              90-day results guarantee
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal" />
              Free strategy session
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DarkCTA;
