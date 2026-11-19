/** Kelley Blue Book figures already cited on the cost guide. Not vehicle quotes. */
export const kbb = {
  publisher: 'Kelley Blue Book',
  author: 'Chris Hardesty',
  published: '2025-07-14',
  accessed: '2026-11-19',
  url: 'https://www.kbb.com/car-advice/key-fob-replacement/',
  rows: [
    { id: 'mechanical' as const, parts: [5, 15] as const, programming: null, total: [5, 15] as const },
    { id: 'transponder' as const, parts: [50, 100] as const, programming: [75, 150] as const, total: [125, 250] as const },
    { id: 'switchblade' as const, parts: [75, 150] as const, programming: [75, 150] as const, total: [150, 300] as const },
    { id: 'smart' as const, parts: [125, 250] as const, programming: [75, 150] as const, total: [200, 400] as const },
  ],
  locksmithSavings: '10–25%',
  diyFobUsd: [50, 100] as const,
  diyProgrammerUsd: 50,
};

export function usdBand(low: number, high: number): string {
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  return low === high ? fmt(low) : `${fmt(low)}–${fmt(high)}`;
}
