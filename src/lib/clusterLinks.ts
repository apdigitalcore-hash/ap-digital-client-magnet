import clusters from './clusters.json';

const promo = (clusters as { advicePromo: { heading: string; body: string; cta: string; posts: string[] } }).advicePromo;

/** The ADvice callout belongs only on posts about ad spend. */
export const advicePromoFor = (slug: string) => (promo.posts.includes(slug) ? promo : null);

export interface ClusterLink { slug: string; label: string }
export interface Cluster { key: string; label: string; intro: string; hub: string; posts: string[] }

/** The cluster a post belongs to, if any. scripts/inject-meta.js reads the same JSON. */
export function getCluster(slug: string): Cluster | null {
  for (const [key, c] of Object.entries(clusters as unknown as Record<string, Omit<Cluster, 'key'>>)) {
    if (key === 'advicePromo') continue;
    if (c.posts?.includes(slug)) return { key, ...c };
  }
  return null;
}

/** Sibling posts in the cluster, hub first, current post removed. */
export function clusterSiblings(slug: string): string[] {
  const c = getCluster(slug);
  if (!c) return [];
  return [c.hub, ...c.posts.filter((s) => s !== c.hub)].filter((s) => s !== slug);
}
