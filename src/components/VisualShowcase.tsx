import { Play, ExternalLink, Instagram, Video } from 'lucide-react';

const showcaseItems = [
  {
    type: 'video',
    title: 'Social Media Content',
    description: 'Scroll-stopping reels & TikToks',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=800&fit=crop',
    stats: '2.5M+ views generated',
  },
  {
    type: 'ad',
    title: 'Paid Ad Creatives',
    description: 'High-converting Meta & Google ads',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    stats: '$2.40 avg. cost per lead',
  },
  {
    type: 'website',
    title: 'Website Designs',
    description: 'Fast, mobile-first sites that convert',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    stats: '300% more conversions',
  },
  {
    type: 'social',
    title: 'Brand Content',
    description: 'Cohesive visual identities',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&h=800&fit=crop',
    stats: '850+ followers/month',
  },
];

const VisualShowcase = () => {
  return (
    <section className="py-20 md:py-28 bg-near-black overflow-hidden">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16 px-4">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Content That <span className="text-gradient">Converts</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We create attention-grabbing content that drives real business results.
          </p>
        </div>

        {/* Visual grid - asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Tall video card */}
          <div className="relative group lg:row-span-2 overflow-hidden rounded-2xl md:rounded-3xl">
            <img
              src={showcaseItems[0].image}
              alt={showcaseItems[0].title}
              className="w-full h-[400px] lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-teal flex items-center justify-center shadow-teal-lg">
                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-teal text-sm font-semibold mb-2">
                <Video className="w-4 h-4" />
                {showcaseItems[0].stats}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-1">
                {showcaseItems[0].title}
              </h3>
              <p className="text-gray-400 text-sm">
                {showcaseItems[0].description}
              </p>
            </div>
          </div>

          {/* Ad creative card */}
          <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl lg:col-span-2">
            <img
              src={showcaseItems[1].image}
              alt={showcaseItems[1].title}
              className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-teal text-sm font-semibold mb-2">
                <ExternalLink className="w-4 h-4" />
                {showcaseItems[1].stats}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-1">
                {showcaseItems[1].title}
              </h3>
              <p className="text-gray-400 text-sm">
                {showcaseItems[1].description}
              </p>
            </div>
          </div>

          {/* Tall social card */}
          <div className="relative group lg:row-span-2 overflow-hidden rounded-2xl md:rounded-3xl">
            <img
              src={showcaseItems[3].image}
              alt={showcaseItems[3].title}
              className="w-full h-[400px] lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-teal text-sm font-semibold mb-2">
                <Instagram className="w-4 h-4" />
                {showcaseItems[3].stats}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-1">
                {showcaseItems[3].title}
              </h3>
              <p className="text-gray-400 text-sm">
                {showcaseItems[3].description}
              </p>
            </div>
          </div>

          {/* Website card */}
          <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl lg:col-span-2">
            <img
              src={showcaseItems[2].image}
              alt={showcaseItems[2].title}
              className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-teal text-sm font-semibold mb-2">
                <ExternalLink className="w-4 h-4" />
                {showcaseItems[2].stats}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-1">
                {showcaseItems[2].title}
              </h3>
              <p className="text-gray-400 text-sm">
                {showcaseItems[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualShowcase;
