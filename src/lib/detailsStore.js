// Araç ayrıntıları için ortak depo (React ve yükleyici içermez; Node’da da çalışır).
let all = null; // yayın öncesi HTML üretiminde tüm ayrıntılar
export const cache = new Map();

export function primeDetails(details) {
  all = details;
}

export function hasAll() {
  return all != null;
}

export function getDetails(slug) {
  if (all) return all[slug] || null;
  return cache.has(slug) ? cache.get(slug) : null;
}
