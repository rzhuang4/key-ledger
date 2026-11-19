import { getCollection } from 'astro:content';

export async function loadVehicles() {
  const vehicles = await getCollection('vehicles');
  return vehicles.sort((a, b) => {
    const make = a.data.make.localeCompare(b.data.make);
    if (make !== 0) return make;
    const model = a.data.model.localeCompare(b.data.model);
    if (model !== 0) return model;
    return a.data.yearStart - b.data.yearStart;
  });
}

export function vehicleHref(data: {
  makeSlug: string;
  modelSlug: string;
  yearSlug: string;
}): string {
  return `/${data.makeSlug}/${data.modelSlug}/${data.yearSlug}/`;
}
