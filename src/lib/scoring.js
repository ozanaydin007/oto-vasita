import { CRITERIA } from '../data/criteria.js';

const clamp = (n) => Math.max(0, Math.min(10, n));

// Genel puan = 10 başlığın ağırlıklı ortalaması (ağırlıklar criteria.js içinde), tek ondalığa yuvarlanır.
export function weightedAverage(ratings = {}) {
  let sum = 0;
  let wsum = 0;
  for (const c of CRITERIA) {
    const v = ratings[c.key];
    if (typeof v !== 'number') continue;
    const w = c.weight ?? 1;
    sum += clamp(v) * w;
    wsum += w;
  }
  return wsum ? sum / wsum : null;
}

export function overallScore(ratings = {}) {
  const avg = weightedAverage(ratings);
  return avg == null ? null : Math.round(avg * 10) / 10;
}

export function formatScore(n) {
  if (n == null) return '–';
  return n.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// Fiyatı olmayan (ikinci el ya da listede bulunmayan) araçlarda null döner.
export function formatPrice(p) {
  if (p == null) return null;
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(p);
}

// Araç kartlarında ve inceleme sayfasında gösterilecek fiyat metni.
export function priceLabel(car) {
  if (car.price != null) return formatPrice(car.price);
  return car.used ? 'İkinci el, liste fiyatı yok' : 'Güncel liste fiyatı yok';
}

export function scoreVerdict(n) {
  if (n == null) return '';
  if (n >= 9) return 'Mükemmel';
  if (n >= 8) return 'Çok iyi';
  if (n >= 7) return 'İyi';
  if (n >= 6) return 'Ortalama';
  return 'Zayıf';
}

// "Toyota Corolla Hybrid" -> "toyota-corolla-hybrid"
export function slugify(text) {
  const map = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' };
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/[çğıöşü]/g, (ch) => map[ch] || ch)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
