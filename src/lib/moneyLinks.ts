import data from './moneyLinks.json';

export interface MoneyLink { path: string; label: string }

type Rule = { match: string[]; path: string; label: string };
const hit = (text: string, rules: Rule[], max: number): MoneyLink[] =>
  rules.filter(r => r.match.some(m => text.includes(m))).slice(0, max).map(({ path, label }) => ({ path, label }));

// Service, industry and city pages a post is about, matched on slug + title.
// scripts/inject-meta.js applies the same rules to the prerendered HTML.
export function getMoneyLinks(slug: string, title: string): MoneyLink[] {
  const text = `${slug.replace(/-/g, ' ')} ${title}`.toLowerCase();
  const links = [
    ...hit(text, data.services, 1),
    ...hit(text, data.niches, 2),
    ...hit(text, data.cities, 2),
  ];
  if (!links.some(l => l.path.startsWith('/services'))) links.unshift({ path: '/services/paid-ads', label: 'Google & Meta Ads management' });
  if (!links.some(l => data.cities.some(c => c.path === l.path))) links.push({ path: '/vancouver', label: 'Vancouver' });
  return [...links, { path: '/pricing', label: 'Pricing' }];
}
