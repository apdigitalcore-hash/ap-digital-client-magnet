import { useState } from 'react';
import { ExternalLink, Globe, Search, Video, Megaphone, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type Category = 'all' | 'web' | 'seo' | 'content' | 'marketing';

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  category: Category;
  niche: string;
  description: string;
  results: string[];
  image: string;
  challenge?: string;
  solution?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Complete Brand Overhaul',
    client: 'Luxe Hair Studio',
    category: 'web',
    niche: 'Salon & Beauty',
    description: 'Modern website redesign with online booking integration and SEO optimization.',
    challenge: 'Outdated website with no online booking, losing clients to competitors with modern digital presence.',
    solution: 'Built a stunning responsive website with integrated booking system, optimized for local search and mobile users.',
    results: ['300% increase in online bookings', '45% lower bounce rate', 'Page 1 Google ranking'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Local SEO Domination',
    client: 'ProPlumb Solutions',
    category: 'seo',
    niche: 'Trades & Contractors',
    description: 'Comprehensive local SEO strategy targeting service areas across Greater Vancouver.',
    challenge: 'Invisible in local search results, relying solely on word-of-mouth referrals for new business.',
    solution: 'Implemented aggressive local SEO with optimized Google Business Profile, citation building, and review generation.',
    results: ['#1 for "plumber Vancouver"', '180% more organic leads', '5x Google reviews'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Viral Reels Campaign',
    client: 'Elite Fitness Coach',
    category: 'content',
    niche: 'Coaching',
    description: 'Short-form video content strategy that generated massive engagement and leads.',
    challenge: 'Struggling to stand out in a saturated fitness coaching market with minimal social media presence.',
    solution: 'Created a content strategy focused on transformation stories and quick tips, optimized for Instagram Reels and TikTok.',
    results: ['2.5M+ total views', '850 new followers/month', '120 qualified leads'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Meta Ads Success',
    client: 'Coastal Realty Group',
    category: 'marketing',
    niche: 'Real Estate',
    description: 'High-converting Facebook and Instagram ad campaigns for buyer and seller leads.',
    challenge: 'High cost per lead from traditional advertising methods with poor targeting capabilities.',
    solution: 'Launched targeted Meta ad campaigns with custom audiences, retargeting, and compelling property showcases.',
    results: ['$2.40 cost per lead', '340 leads in 90 days', '12 closed deals'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'E-commerce Website',
    client: 'Mountain Gear Co.',
    category: 'web',
    niche: 'Retail',
    description: 'Custom e-commerce platform with seamless checkout and inventory management.',
    challenge: 'No online sales channel, missing out on the growing e-commerce market in outdoor gear.',
    solution: 'Built a fully custom e-commerce site with advanced filtering, wishlist features, and streamlined checkout.',
    results: ['$180k revenue in 6 months', '4.2% conversion rate', '60% mobile traffic'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Content Marketing Strategy',
    client: 'GreenScape Landscaping',
    category: 'content',
    niche: 'Trades & Contractors',
    description: 'Before/after content series showcasing transformations across social platforms.',
    challenge: 'Difficulty showcasing quality of work and differentiating from budget competitors.',
    solution: 'Developed a visual content strategy with professional before/after photography and video walkthroughs.',
    results: ['400% engagement increase', '75 project inquiries', 'Local media feature'],
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&h=400&fit=crop',
  },
  {
    id: 7,
    title: 'Google Ads Campaign',
    client: 'Swift HVAC Services',
    category: 'marketing',
    niche: 'Trades & Contractors',
    description: 'Strategic Google Ads targeting emergency and maintenance service keywords.',
    challenge: 'Inconsistent lead flow, especially during non-peak seasons for HVAC services.',
    solution: 'Created targeted Google Ads campaigns for emergency services and seasonal maintenance with call tracking.',
    results: ['$18 cost per call', '200+ monthly calls', '8x ROAS'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
  },
  {
    id: 8,
    title: 'Multi-Location SEO',
    client: 'Bright Smile Dental',
    category: 'seo',
    niche: 'Healthcare',
    description: 'Local SEO strategy for 5 dental clinic locations across British Columbia.',
    challenge: 'Multiple locations competing against each other in search, with inconsistent online presence.',
    solution: 'Implemented location-specific SEO with unique content, optimized GMB profiles, and local link building.',
    results: ['Top 3 for all locations', '220% organic traffic', '150 new patients/month'],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop',
  },
  {
    id: 9,
    title: 'Corporate Website Redesign',
    client: 'Pacific Consulting Group',
    category: 'web',
    niche: 'Business/Corporate',
    description: 'Professional corporate website with case studies, team profiles, and lead generation.',
    challenge: 'Outdated corporate site failing to convey expertise and generate qualified B2B leads.',
    solution: 'Designed a sleek, professional website with compelling case studies, thought leadership content, and strategic CTAs.',
    results: ['65% more qualified leads', '3.2 min avg. session', '40% lower bounce rate'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
  },
];

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All Work', icon: ExternalLink },
  { id: 'web', label: 'Web Services', icon: Globe },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'content', label: 'Content Creation', icon: Video },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const currentIndex = selectedItem ? filteredItems.findIndex(item => item.id === selectedItem.id) : -1;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1]);
    }
  };

  return (
    <section id="portfolio" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-teal font-semibold text-sm uppercase tracking-wider mb-4 block">
            Our Portfolio
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Real Results for{' '}
            <span className="text-gradient">Real Businesses</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse our work across different industries and services. Every project is designed to drive measurable growth.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                activeCategory === category.id
                  ? 'bg-teal text-primary-foreground shadow-lg shadow-teal/25'
                  : 'bg-card border border-border text-muted-foreground hover:border-teal hover:text-teal'
              )}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-card rounded-xl overflow-hidden border border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-teal/10 hover:-translate-y-2 hover:border-teal/50"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-primary-foreground text-sm font-medium flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ExternalLink className="w-4 h-4" />
                    View Details
                  </span>
                </div>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-teal/90 text-primary-foreground text-xs font-medium">
                  {item.niche}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-teal text-xs font-medium uppercase tracking-wider mb-1">
                  {categories.find(c => c.id === item.category)?.label}
                </p>
                <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-teal transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {item.client}
                </p>

                {/* Results */}
                <ul className="space-y-1.5">
                  {item.results.map((result, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">
          <VisuallyHidden>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
          </VisuallyHidden>
          
          {selectedItem && (
            <div className="flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="relative md:w-1/2 h-64 md:h-auto">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-teal text-primary-foreground text-sm font-medium">
                  {selectedItem.niche}
                </span>
                
                {/* Navigation Arrows */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 md:hidden">
                  <button
                    onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                    disabled={currentIndex === 0}
                    className="p-2 rounded-full bg-primary/80 text-primary-foreground disabled:opacity-30 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToNext(); }}
                    disabled={currentIndex === filteredItems.length - 1}
                    className="p-2 rounded-full bg-primary/80 text-primary-foreground disabled:opacity-30 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-1/2 p-6 md:p-8 relative">
                {/* Desktop Navigation */}
                <div className="hidden md:flex absolute top-4 right-4 gap-2">
                  <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className="p-2 rounded-full bg-secondary text-foreground disabled:opacity-30 hover:bg-teal hover:text-primary-foreground transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={currentIndex === filteredItems.length - 1}
                    className="p-2 rounded-full bg-secondary text-foreground disabled:opacity-30 hover:bg-teal hover:text-primary-foreground transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-teal text-sm font-medium uppercase tracking-wider mb-2">
                  {categories.find(c => c.id === selectedItem.category)?.label}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {selectedItem.client}
                </p>

                <p className="text-foreground mb-6">
                  {selectedItem.description}
                </p>

                {selectedItem.challenge && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-1">The Challenge</h4>
                    <p className="text-muted-foreground text-sm">{selectedItem.challenge}</p>
                  </div>
                )}

                {selectedItem.solution && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-1">Our Solution</h4>
                    <p className="text-muted-foreground text-sm">{selectedItem.solution}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Results</h4>
                  <ul className="space-y-2">
                    {selectedItem.results.map((result, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-foreground">
                        <span className="w-2 h-2 rounded-full bg-teal flex-shrink-0" />
                        <span className="font-medium">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-muted-foreground text-xs mt-6">
                  {currentIndex + 1} of {filteredItems.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
