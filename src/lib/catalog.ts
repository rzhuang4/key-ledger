import { loadVehicles, vehicleHref } from './vehicles';

export type CatalogVehicle = {
  years: number[];
  make: string;
  makeSlug: string;
  model: string;
  path: string;
  label: string;
  facts: {
    onboardStatus: string;
    minimumWorkingKeys: number | string;
    pushButtonProcedure: string;
    keyTypes: string[];
  };
  fcc: { id: string; norm: string }[];
  parts: string[];
  batteries: { type: string; known: boolean }[];
  prices: {
    channel: string;
    status: string;
    lowUsd?: number;
    highUsd?: number;
  }[];
};

export function normalizeFcc(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export async function buildCatalog(): Promise<CatalogVehicle[]> {
  const vehicles = await loadVehicles();
  return vehicles.map((entry) => {
    const data = entry.data;
    const years: number[] = [];
    for (let year = data.yearStart; year <= data.yearEnd; year += 1) years.push(year);
    const fcc = data.variants.flatMap((variant) =>
      variant.fccIds.map((item) => ({ id: item.id, norm: normalizeFcc(item.id) })),
    );
    const parts = [...new Set(data.variants.flatMap((variant) => variant.oemPartNumbers.map((part) => part.number)))];
    const batteries = data.variants.map((variant) =>
      variant.battery.status === 'verified' && variant.battery.type
        ? { type: variant.battery.type, known: true }
        : { type: '', known: false },
    );
    return {
      years,
      make: data.make,
      makeSlug: data.makeSlug,
      model: data.model,
      path: vehicleHref(data).replace(/^\/|\/$/g, ''),
      label: `${data.yearSlug} ${data.make} ${data.model}`,
      facts: {
        onboardStatus: data.programmingFacts.onboardStatus,
        minimumWorkingKeys: data.programmingFacts.minimumWorkingKeys,
        pushButtonProcedure: data.programmingFacts.pushButtonProcedure,
        keyTypes: [...new Set(data.variants.map((variant) => variant.keyType))],
      },
      fcc,
      parts,
      batteries,
      prices: data.priceRanges.map((row) => ({
        channel: row.channel,
        status: row.status,
        lowUsd: row.lowUsd,
        highUsd: row.highUsd,
      })),
    };
  });
}
