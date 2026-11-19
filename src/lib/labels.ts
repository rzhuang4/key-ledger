export const diyLabel = {
  yes: 'On-board programming',
  no: 'No on-board programming',
  'needs-tool': 'Needs a tool',
} as const;

export const keyTypeLabel = {
  'flip-key': 'Flip key',
  'remote-head-key': 'Remote head key',
  'smart-prox': 'Smart / proximity key',
  'transponder-only': 'Transponder only',
  'separate-remote': 'Separate keyless remote',
} as const;

export const channelLabel = {
  dealer: 'Dealer',
  locksmith: 'Locksmith',
  'online-diy': 'Buy online + DIY',
} as const;

export const fccRoleLabel = {
  oem: 'OEM grant ID',
  'aftermarket-example': 'Printed on an aftermarket remote',
  'seller-listed': 'Seller-listed ID',
} as const;

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatRange(low?: number, high?: number): string {
  if (low == null && high == null) return '';
  if (low != null && high != null && low !== high) {
    return `${formatUsd(low)}–${formatUsd(high)}`;
  }
  return formatUsd((low ?? high) as number);
}

export function formatReviewed(iso: string, dateLocale = 'en-US'): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(dateLocale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
