import { useEffect, useState } from 'react';
import loaders from '../data/detailsLoaders.js';
import { cache, getDetails, hasAll, primeDetails } from './detailsStore.js';

// ---------------------------------------------------------------------------
// ARAÇ AYRINTILARI: uzun inceleme, SSS ve kişisel notlar
// Bu metinler ana pakette değil; yalnızca aracın sayfası açıldığında yüklenir.
// Yayın öncesi HTML üretiminde (sunucu tarafı) hepsi baştan hazırdır.
// ---------------------------------------------------------------------------
export { getDetails, primeDetails };

export async function loadDetails(slug) {
  if (hasAll()) return getDetails(slug);
  if (cache.has(slug)) return cache.get(slug);
  let d = null;
  try {
    const load = loaders[`./details/${slug}.js`];
    if (load) d = (await load()).default;
    else d = (await import('../data/carDetails.js')).DETAILS[slug] || null; // yedek: tek parça
  } catch {
    d = null;
  }
  cache.set(slug, d);
  return d;
}

// Sayfa içinde kullanım: önce elde varsa hemen döner, yoksa yükleyip günceller
export function useCarDetails(slug) {
  const [d, setD] = useState(() => (slug ? getDetails(slug) : null));
  useEffect(() => {
    if (!slug) return undefined;
    let alive = true;
    if (hasAll() || cache.has(slug)) {
      setD(getDetails(slug));
      return undefined;
    }
    setD(null);
    loadDetails(slug).then((x) => alive && setD(x));
    return () => {
      alive = false;
    };
  }, [slug]);
  return d;
}
