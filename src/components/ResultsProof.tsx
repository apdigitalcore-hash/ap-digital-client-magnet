import { ArrowUpRight } from 'lucide-react';

const metrics = [
  {
    value: '2,400+',
    label: 'Leads Generated',
    description: 'Qualified leads delivered to clients',
  },
  {
    value: '8.2x',
    label: 'Avg. ROAS',
    description: 'Return on ad spend',
  },
  {
    value: '340%',
    label: 'Traffic Growth',
    description: 'Average organic increase',
  },
  {
    value: '500+',
    label: 'Content Pieces',
    description: 'Videos & graphics created',
  },
];

const platforms = [
  { name: 'Meta', icon: '/platforms/meta.svg' },
  { name: 'Google', icon: '/platforms/google.svg' },
  { name: 'TikTok', icon: '/platforms/tiktok.svg' },
  { name: 'Instagram', icon: '/platforms/instagram.svg' },
  { name: 'YouTube', icon: '/platforms/youtube.svg' },
];

const ResultsProof = () => {
  return (
    <section className="relative py-20 md:py-28 bg-charcoal overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal mb-6">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Proven Results</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Performance That <span className="text-gradient">Speaks</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real numbers from real campaigns. We don't chase vanity metrics—we drive revenue.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-teal/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 md:p-8 rounded-2xl border border-gray-800 bg-charcoal-light/50 backdrop-blur-sm">
                <div className="stat-value text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-teal font-semibold text-sm uppercase tracking-wider mb-1">
                  {metric.label}
                </div>
                <p className="text-gray-500 text-sm">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Platform logos */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-wider">
            Certified across major platforms
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Meta', 'Google Ads', 'TikTok', 'Instagram', 'YouTube'].map((platform) => (
              <div
                key={platform}
                className="px-6 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 font-medium text-sm hover:text-teal hover:border-teal/30 transition-all duration-300"
              >
                {platform}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative divider */}
        <div className="divider-glow mt-20" />
      </div>
    </section>
  );
};

export default ResultsProof;
