import config from '../config/affiliates.json';

export type RetailerId = keyof typeof config.retailers;

export function retailerList() {
  return Object.entries(config.retailers).map(([id, value]) => ({
    id,
    ...value,
  }));
}

export function shopLink(retailerId: string, url: string) {
  const entry = config.retailers[retailerId as RetailerId];
  if (!entry) {
    throw new Error(`Unknown retailer "${retailerId}" in affiliates.json`);
  }
  const query = entry.affiliateQuery.trim();
  const href = query ? `${url}${url.includes('?') ? '&' : '?'}${query}` : url;
  return {
    href,
    rel: query ? 'sponsored noopener noreferrer' : 'noopener noreferrer',
    name: entry.name,
    affiliateLive: query.length > 0,
  };
}

export function anyAffiliateLive() {
  return Object.values(config.retailers).some((entry) => entry.affiliateQuery.trim().length > 0);
}
