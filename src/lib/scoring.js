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
