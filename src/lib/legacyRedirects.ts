/**
 * Old /blog/ URLs that still rank in Google but no longer have a post.
 *
 * They return 200 serving the SPA shell — soft 404s — and two of them sit at
 * position 4.7 and 6.5, the best positions on the site. Most were removed
 * deliberately (27f6ae5 merged the social-media-cost duplicates to fix
 * cannibalisation, 2d5b5a5 removed ten duplicates), so restoring the posts
 * would rebuild the problem those commits fixed. Each points instead at the
 * live post that replaced it.
 *
 * vercel.json carries the same map as real 301s, but the live host does not
 * appear to honour vercel.json, so this is what actually runs: the build
 * writes a static redirect stub per entry and the SPA uses it for in-app
 * navigation. scripts/inject-meta.js asserts the two stay in sync.
 */
export const LEGACY_BLOG_REDIRECTS: Record<string, string> = {
  'social-media-marketing-cost-canada': 'how-much-does-social-media-marketing-cost-canada',
  'best-digital-marketing-agency-vancouver': 'digital-marketing-agency-vancouver-bc',
  'how-to-choose-marketing-agency-bc': 'digital-marketing-agency-vancouver-bc',
  'how-to-market-a-trades-business-online': 'trades-marketing-vancouver-bc',
  'trades-digital-marketing-guide': 'trades-marketing-vancouver-bc',
  'how-to-get-more-salon-clients': 'salon-marketing-vancouver-bc',
  'facebook-ads-vancouver-small-business': 'best-ads-platform-for-small-business-canada',
  'facebook-ads-vs-google-ads': 'best-ads-platform-for-small-business-canada',
  'google-ads-vs-meta-ads-local-business': 'best-ads-platform-for-small-business-canada',
  'real-estate-social-media-tips': 'real-estate-agent-social-media-tips',
  'how-much-should-salon-spend-on-marketing': 'salon-marketing-vancouver-bc',
  'average-cost-per-lead-plumbers-canada': 'plumber-marketing-metro-vancouver',
  'how-to-calculate-marketing-budget-service-business': 'digital-marketing-budget-small-business-canada',

  // Pruned 2026-09-24: thin posts that duplicated a stronger page. Targets
  // starting with "/" are service or city pages rather than other posts.
  'paid-ads-abbotsford-bc': '/abbotsford',
  'social-media-burnaby-bc': '/burnaby',
  'social-media-marketing-north-vancouver': '/vancouver',
  'facebook-ads-surrey-bc': '/surrey',
  'digital-marketing-langley-bc': '/langley',
  'electrician-leads-bc': '/electrician-marketing',
  'dental-marketing-vancouver-bc': '/dental-marketing',
  'gym-marketing-vancouver-bc': '/fitness-marketing',
  'hvac-marketing-vancouver-bc': '/hvac-marketing',
  'plumber-marketing-metro-vancouver': '/plumber-marketing',
  'restaurant-marketing-vancouver-bc': '/restaurant-marketing',
  'coaching-clients-bc': '/coaching-marketing',
  'social-media-coaching-business-bc': '/coaching-marketing',
  'google-ads-coaching-business-bc': '/coaching-marketing',
  'salon-google-ads-vancouver': '/salon-marketing',
  'social-media-marketing-vancouver': '/services/social-media',
  'google-ads-coquitlam-tri-cities': 'tri-cities-google-ads-cost',
  'vancouver-google-ads-guide-local-business': 'how-much-do-google-ads-cost-vancouver',
  'instagram-ads-salons-vancouver': 'salon-social-media-management-vancouver',
  'best-ads-for-trades-businesses-canada': 'trades-marketing-vancouver-bc',
  'real-estate-agent-social-media-tips': 'real-estate-agent-marketing-vancouver-bc',
  'how-to-get-more-salon-clients-vancouver': 'salon-marketing-vancouver-bc',
};
