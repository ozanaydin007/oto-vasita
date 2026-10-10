import { useEffect, useState } from 'react';
import { CRITERIA } from '../data/criteria.js';
import { getCar } from '../data/cars.js';
import { formatScore } from './scoring.js';

// ---------------------------------------------------------------------------
// KARŞILAŞTIRMA
// Seçilen araçlar ziyaretçinin kendi tarayıcısında tutulur (en fazla 3 araç).
// ---------------------------------------------------------------------------
export const MAX_COMPARE = 3;
const KEY = 'otovaro-karsilastirma';
const listeners = new Set();

export function getCompare() {
  try {
    const list = JSON.parse(window.localStorage.getItem(KEY) || '[]');
    return Array.isArray(list) ? list.filter((s) => getCar(s)).slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
}

export function setCompare(list) {
  const clean = [...new Set(list)].filter((s) => getCar(s)).slice(0, MAX_COMPARE);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(clean));
  } catch {
    // depolama kapalıysa yalnızca bu sayfa için geçerli olur
  }
  listeners.forEach((fn) => fn(clean));
  return clean;
}

export function toggleCompare(slug) {
  const list = getCompare();
  if (list.includes(slug)) return setCompare(list.filter((s) => s !== slug));
  if (list.length >= MAX_COMPARE) return list;
  return setCompare([...list, slug]);
}

export function useCompare() {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(getCompare());
    const fn = () => setList(getCompare());
    listeners.add(fn);
    window.addEventListener('storage', fn);
    return () => {
      listeners.delete(fn);
      window.removeEventListener('storage', fn);
    };
  }, []);
  return list;
}

// "a-vs-b-vs-c" <-> ['a','b','c']
export const comparePath = (slugs) => `/karsilastir/${slugs.join('-vs-')}`;

export function parsePair(pair = '') {
  return [...new Set(pair.split('-vs-'))].filter((s) => getCar(s)).slice(0, MAX_COMPARE);
}

export const carName = (c) => `${c.year} ${c.make} ${c.model}`;

// ---------------------------------------------------------------------------
// Teknik veri karşılaştırması: hangi değer daha iyi?
// ---------------------------------------------------------------------------
const num = (text) => {
  const m = String(text || '').match(/(\d+(?:[.,]\d+)?)/);
  return m ? Number(m[1].replace('.', '').replace(',', '.')) : null;
};
const numDec = (text) => {
  const m = String(text || '').match(/(\d+(?:,\d+)?)/);
  return m ? Number(m[1].replace(',', '.')) : null;
};
const unit = (text) => (/kWh/.test(text || '') ? 'kWh' : /L\/100/.test(text || '') ? 'L' : null);

export const SPEC_ROWS = [
  { key: 'price', label: 'Liste fiyatı', better: 'low', value: (c) => c.price, show: (c, fmt) => fmt(c) },
  { key: 'hp', label: 'Motor gücü', better: 'high', value: (c) => c.hp, show: (c) => (c.hp != null ? `${c.hp} bg` : '—') },
  { key: 'motor', label: 'Motor', show: (c) => c.specs?.motor || '—' },
  { key: 'tork', label: 'Maksimum tork', better: 'high', value: (c) => num(c.specs?.tork), show: (c) => c.specs?.tork || '—' },
  { key: 'gucAgirlik', label: 'Güç/ağırlık', better: 'high', value: (c) => c.specs?.gucAgirlikSayi ?? null, show: (c) => c.specs?.gucAgirlik || '—' },
  { key: 'cekis', label: 'Çekiş', show: (c) => c.specs?.cekis || '—' },
  { key: 'hizlanma', label: '0–100 km/s', better: 'low', value: (c) => numDec(c.specs?.hizlanma), show: (c) => c.specs?.hizlanma || '—' },
  { key: 'azami', label: 'Azami sürat', better: 'high', value: (c) => num(c.specs?.azami), show: (c) => c.specs?.azami || '—' },
  { key: 'tuketim', label: 'Tüketim', better: 'low', value: (c) => numDec(c.specs?.tuketim), group: (c) => unit(c.specs?.tuketim), show: (c) => c.specs?.tuketim || '—' },
  {
    key: 'menzil',
    label: 'Elektrikli menzil',
    better: 'high',
    value: (c) => (c.fuel === 'Elektrik' || c.fuel === 'Şarj edilebilir hibrit' ? num(c.specs?.menzil) : null),
    show: (c) => (c.specs?.menzil ? c.specs.menzil.split(' (')[0].split(';')[0] : '—'),
  },
  { key: 'agirlik', label: 'Boş ağırlık', better: 'low', value: (c) => num(c.specs?.agirlik), show: (c) => c.specs?.agirlik || '—' },
  { key: 'depo', label: 'Yakıt deposu', show: (c) => c.specs?.depo || '—' },
  { key: 'bagaj', label: 'Bagaj', better: 'high', value: (c) => num(c.specs?.bagaj), show: (c) => c.specs?.bagaj || '—' },
  { key: 'fuel', label: 'Yakıt', show: (c) => c.fuel },
  { key: 'gearbox', label: 'Vites', show: (c) => c.gearbox },
];

// Bir satırda en iyi değere sahip araçların indeksleri
export function bestIndexes(row, cars) {
  if (!row.better) return [];
  const vals = cars.map((c) => {
    const v = row.value(c);
    return v == null || Number.isNaN(v) ? null : v;
  });
  if (row.group) {
    const groups = cars.map((c) => row.group(c));
    if (new Set(groups.filter(Boolean)).size > 1) return [];
  }
  const valid = vals.filter((v) => v != null);
  if (valid.length < 2) return [];
  const best = row.better === 'high' ? Math.max(...valid) : Math.min(...valid);
  return vals.map((v, i) => (v === best ? i : -1)).filter((i) => i >= 0);
}

export function bestRating(key, cars) {
  const vals = cars.map((c) => c.ratings[key]);
  const best = Math.max(...vals);
  if (vals.every((v) => v === best)) return [];
  return vals.map((v, i) => (v === best ? i : -1)).filter((i) => i >= 0);
}

// ---------------------------------------------------------------------------
// "Hangisini almalı?" özeti
// ---------------------------------------------------------------------------
const PRIORITY = {
  surus: 'sürüş keyfi',
  guvenlik: 'güvenlik',
  konfor: 'konfor',
  tuketim: 'düşük yakıt masrafı',
  malzeme: 'kabin kalitesi',
  tasarim: 'tasarım',
  fiyat: 'fiyat/değer',
  teknoloji: 'teknoloji',
  guvenilirlik: 'uzun vadeli dayanıklılık',
  ikinciel: 'ikinci el değeri',
};

const joinTr = (items) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} ve ${items.at(-1)}`;

export function compareVerdict(cars) {
  if (cars.length < 2) return null;
  const sorted = [...cars].sort((a, b) => b.score - a.score);
  const sentences = [];
  if (sorted[0].score === sorted[1].score) {
    sentences.push(`${carName(sorted[0])} ile ${carName(sorted[1])} genel puanda ${formatScore(sorted[0].score)} ile başa baş gidiyor.`);
  } else {
    sentences.push(
      `Genel puanda ${formatScore(sorted[0].score)} ile ${carName(sorted[0])} önde; ama doğru seçim sizin önceliklerinize bağlı.`
    );
  }
  const picks = [];
  for (const car of cars) {
    const others = cars.filter((c) => c !== car);
    const leads = CRITERIA.map((cr) => {
      const mine = car.ratings[cr.key];
      const bestOther = Math.max(...others.map((o) => o.ratings[cr.key]));
      return { key: cr.key, lead: mine - bestOther };
    })
      .filter((x) => x.lead >= 0.3)
      .sort((a, b) => b.lead - a.lead)
      .slice(0, 3);
    if (leads.length) {
      const list = joinTr(leads.map((x) => PRIORITY[x.key]));
      sentences.push(`${carName(car)}; ${list} konusunda rakiplerinden belirgin şekilde daha iyi.`);
      picks.push(`${list} öncelikliyse ${car.make} ${car.model}`);
    }
  }
  if (picks.length >= 2) {
    sentences.push(`Kısacası: ${picks.join('; ')} sizin için daha doğru seçim.`);
  } else if (picks.length === 0) {
    sentences.push('Puanlar birbirine çok yakın; seçimi test sürüşü, fiyat ve kişisel zevkiniz belirleyecek.');
  }
  return sentences.join(' ');
}
