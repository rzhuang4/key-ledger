import { loadVehicles } from './vehicles';

export async function makeStaticPaths() {
  const vehicles = await loadVehicles();
  const slugs = [...new Set(vehicles.map((entry) => entry.data.makeSlug))];
  return slugs.map((make) => ({
    params: { make },
    props: { vehicles: vehicles.filter((entry) => entry.data.makeSlug === make) },
  }));
}

export async function vehicleStaticPaths() {
  const vehicles = await loadVehicles();
  return vehicles.map((entry) => ({
    params: {
      make: entry.data.makeSlug,
      model: entry.data.modelSlug,
      year: entry.data.yearSlug,
    },
    props: { entry },
  }));
}
