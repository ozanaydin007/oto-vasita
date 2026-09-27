import { CRITERIA } from '../data/criteria.js';

const clamp = (n) => Math.max(0, Math.min(10, n));

// Genel puan = 8 başlığın ortalaması, tek ondalığa yuvarlanır.
// Ağırlıklı ortalama isterseniz CRITERIA içine "weight" ekleyip burayı güncelleyebilirsiniz.
export function overallScore(ratings = {}) {
  const values = CRITERIA.map((c) => ratings[c.key]).filter((v) => typeof v === 'number');
  if (values.length === 0) return null;
  const avg = values.reduce((sum, v) => sum + clamp(v), 0) / values.length;
  return Math.round(avg * 10) / 10;
}

export function formatScore(n) {
  if (n == null) return '–';
  return n.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function formatPrice(p) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(p);
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
