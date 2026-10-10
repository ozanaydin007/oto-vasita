import { CARS } from '../data/cars.js';
import { CRITERIA } from '../data/criteria.js';

// ---------------------------------------------------------------------------
// ARAÇ BULUCU — sorular ve eşleştirme
// Her sorunun seçenekleri ya araçları filtreler (filter) ya da puan
// başlıklarının önemini değiştirir (weights). "Fark etmez" seçenekleri
// hiçbir şeyi etkilemez.
// ---------------------------------------------------------------------------
export const PREMIUM = [
  'Audi', 'BMW', 'Mercedes-Benz', 'Mercedes-AMG', 'Porsche', 'Lexus', 'Volvo', 'Land Rover', 'Jaguar',
  'Alfa Romeo', 'Maserati', 'Bentley', 'Aston Martin', 'Ferrari', 'Lamborghini', 'Tesla', 'DS', 'MINI', 'Infiniti',
];

export function bodyGroup(car) {
  if (car.category === 'spor') return 'spor';
  if (car.category === 'arazi-pickup') return 'pickup';
  if (car.bodyType === 'suv' || car.category.includes('suv')) return 'suv';
  if (car.bodyType === 'sedan' || car.category.includes('sedan')) return 'sedan';
  return 'hatchback';
}

const isHybrid = (c) => ['Hibrit', 'Hafif hibrit', 'Şarj edilebilir hibrit'].includes(c.fuel);
const IMPORTANCE = [
  { value: 0, label: 'Hiç önemli değil' },
  { value: 1, label: 'Biraz önemli' },
  { value: 2, label: 'Önemli' },
  { value: 3, label: 'Çok önemli' },
];
const imp = (key) => IMPORTANCE.map((o) => ({ ...o, weights: { [key]: o.value } }));

export const QUESTIONS = [
  {
    id: 'yil',
    title: 'Hangi model yılı aralığındaki otomobillere bakalım?',
    options: [
      { value: 'y1', label: '1990–2000', filter: (c) => c.year >= 1990 && c.year < 2000 },
      { value: 'y2', label: '2000–2010', filter: (c) => c.year >= 2000 && c.year < 2010 },
      { value: 'y3', label: '2010–2020', filter: (c) => c.year >= 2010 && c.year < 2020 },
      { value: 'y4', label: '2020 – bayiden sıfır', filter: (c) => c.year >= 2020 },
      { value: 'any', label: 'Fark etmez' },
    ],
  },
  {
    id: 'durum',
    title: 'Sıfır mı, ikinci el mi?',
    options: [
      { value: 'sifir', label: 'Sıfır', filter: (c) => !c.used },
      { value: 'ikinci', label: 'İkinci el', filter: (c) => c.used },
      { value: 'any', label: 'Fark etmez' },
    ],
  },
  {
    id: 'butce',
    title: 'Sıfır otomobil için bütçeniz ne kadar?',
    hint: 'Liste fiyatı yalnızca sıfır otomobillerde var; ikinci el otomobiller bu sorudan etkilenmez.',
    options: [
      { value: 'b1', label: '1,5 milyon TL’ye kadar', filter: (c) => c.price == null || c.price <= 1500000 },
      { value: 'b2', label: '1,5 – 2,5 milyon TL', filter: (c) => c.price == null || c.price <= 2500000 },
      { value: 'b3', label: '2,5 – 4 milyon TL', filter: (c) => c.price == null || c.price <= 4000000 },
      { value: 'b4', label: '4 milyon TL ve üzeri', filter: () => true },
      { value: 'any', label: 'Fark etmez' },
    ],
  },
  {
    id: 'kasa',
    title: 'Nasıl bir kasa tipi istiyorsunuz?',
    options: [
      { value: 'hatchback', label: 'Hatchback', filter: (c) => bodyGroup(c) === 'hatchback' },
      { value: 'sedan', label: 'Sedan', filter: (c) => bodyGroup(c) === 'sedan' },
      { value: 'suv', label: 'SUV', filter: (c) => bodyGroup(c) === 'suv' },
      { value: 'spor', label: 'Spor / coupé', filter: (c) => bodyGroup(c) === 'spor' },
      { value: 'pickup', label: 'Pick-up / arazi', filter: (c) => bodyGroup(c) === 'pickup' },
      { value: 'any', label: 'Fark etmez' },
    ],
  },
  {
    id: 'yakit',
    title: 'Hangi yakıt türünü tercih edersiniz?',
    options: [
      { value: 'benzin', label: 'Benzin', filter: (c) => c.fuel === 'Benzin' || c.fuel === 'Benzin + LPG' },
      { value: 'dizel', label: 'Dizel', filter: (c) => c.fuel === 'Dizel' },
      { value: 'hibrit', label: 'Hibrit', filter: isHybrid },
      { value: 'elektrik', label: 'Elektrikli', filter: (c) => c.fuel === 'Elektrik' },
      { value: 'any', label: 'Fark etmez' },
    ],
  },
  {
    id: 'vites',
    title: 'Vites tercihiniz?',
    options: [
      { value: 'otomatik', label: 'Otomatik', filter: (c) => c.gearbox === 'Otomatik' },
      { value: 'manuel', label: 'Manuel', filter: (c) => c.gearbox === 'Manuel' },
      { value: 'any', label: 'Fark etmez' },
    ],
  },
  {
    id: 'kullanim',
    title: 'Otomobili çoğunlukla nerede kullanacaksınız?',
    options: [
      { value: 'sehir', label: 'Çoğunlukla şehir içi', weights: { tuketim: 2, guvenilirlik: 1 } },
      { value: 'uzun', label: 'Çoğunlukla uzun yol', weights: { konfor: 2, guvenlik: 1, surus: 1 } },
      { value: 'karisik', label: 'İkisi de', weights: { konfor: 1, tuketim: 1 } },
    ],
  },
  {
    id: 'kisi',
    title: 'Otomobili genellikle kaç kişi kullanacak?',
    options: [
      { value: 'tek', label: 'Tek başıma ya da iki kişi', weights: { surus: 1, tasarim: 1 } },
      { value: 'aile', label: '3–4 kişilik aile', weights: { guvenlik: 2, konfor: 1 } },
      { value: 'kalabalik', label: '5 kişi ve üzeri / çok eşya', weights: { konfor: 2, guvenlik: 2 }, bonus: (c) => (bodyGroup(c) === 'suv' ? 0.3 : 0) },
    ],
  },
  { id: 'guvenilirlik', title: 'Otomobilin bozulmaması, kronik sorun çıkarmaması sizin için ne kadar önemli?', options: imp('guvenilirlik') },
  { id: 'performans', title: 'Performans ve sürüş keyfi ne kadar önemli?', options: imp('surus') },
  { id: 'tuketim', title: 'Düşük yakıt (veya enerji) tüketimi ne kadar önemli?', options: imp('tuketim') },
  { id: 'konfor', title: 'Yol konforu ve sessiz bir kabin ne kadar önemli?', options: imp('konfor') },
  { id: 'guvenlik', title: 'Güvenlik donanımları ve çarpışma testi sonuçları ne kadar önemli?', options: imp('guvenlik') },
  { id: 'teknoloji', title: 'Büyük ekranlar, sürüş destek sistemleri gibi teknolojiler ne kadar önemli?', options: imp('teknoloji') },
  { id: 'malzeme', title: 'İç mekân malzeme kalitesi ne kadar önemli?', options: imp('malzeme') },
  { id: 'tasarim', title: 'Tasarım ve görünüş ne kadar önemli?', options: imp('tasarim') },
  { id: 'ikinciel', title: 'Satarken az değer kaybetmesi ne kadar önemli?', options: imp('ikinciel') },
  { id: 'fiyat', title: 'Fiyatına göre aldığınız değer (fiyat/performans) ne kadar önemli?', options: imp('fiyat') },
  {
    id: 'cekis',
    title: 'Çekiş sistemi konusunda bir tercihiniz var mı?',
    options: [
      { value: '4x4', label: 'Dört çeker şart', filter: (c) => c.drive === 'awd' || c.drive === '4wd' },
      { value: 'rwd', label: 'Arkadan itiş isterim', filter: (c) => c.drive === 'rwd' },
      { value: 'fwd', label: 'Önden çekiş yeterli', filter: (c) => c.drive === 'fwd' },
      { value: 'any', label: 'Fark etmez' },
    ],
  },
  {
    id: 'marka',
    title: 'Premium bir marka sizin için önemli mi?',
    options: [
      { value: 'sart', label: 'Evet, premium marka olsun', filter: (c) => PREMIUM.includes(c.make) },
      { value: 'tercih', label: 'Olursa güzel olur', bonus: (c) => (PREMIUM.includes(c.make) ? 0.3 : 0) },
      { value: 'any', label: 'Fark etmez' },
    ],
  },
];

const LABELS = Object.fromEntries(CRITERIA.map((c) => [c.key, c.label]));

// Cevaplara göre araçları puanlar. Katı filtrelerle hiç araç kalmazsa
// filtreler sırayla gevşetilir ve kullanıcıya hangisinin gevşetildiği söylenir.
export function findCars(answers, limit = 12) {
  const chosen = QUESTIONS.map((q) => ({ q, o: q.options.find((o) => o.value === answers[q.id]) })).filter((x) => x.o);
  const weights = Object.fromEntries(CRITERIA.map((c) => [c.key, 1]));
  for (const { o } of chosen) for (const [k, v] of Object.entries(o.weights || {})) weights[k] += v;
  const totalW = Object.values(weights).reduce((a, b) => a + b, 0);

  const RELAX_ORDER = ['butce', 'yil', 'cekis', 'kasa', 'vites', 'yakit', 'marka', 'durum'];
  const relaxed = [];
  const filters = () => chosen.filter(({ q, o }) => o.filter && !relaxed.includes(q.id));
  let pool = CARS.filter((c) => filters().every(({ o }) => o.filter(c)));
  for (const id of RELAX_ORDER) {
    if (pool.length >= 3) break;
    if (!chosen.some(({ q, o }) => q.id === id && o.filter)) continue;
    relaxed.push(id);
    pool = CARS.filter((c) => filters().every(({ o }) => o.filter(c)));
  }

  const results = pool.map((car) => {
    let s = 0;
    for (const [k, w] of Object.entries(weights)) s += (car.ratings[k] ?? 0) * w;
    let match = s / totalW;
    for (const { o } of chosen) if (o.bonus) match += o.bonus(car);
    const strengths = Object.entries(weights)
      .filter(([, w]) => w >= 2)
      .map(([k]) => k)
      .filter((k) => car.ratings[k] >= 8.5)
      .sort((a, b) => car.ratings[b] - car.ratings[a])
      .slice(0, 3)
      .map((k) => LABELS[k]);
    return { car, match, strengths };
  });
  results.sort((a, b) => b.match - a.match);
  const top = results[0]?.match || 10;
  return {
    relaxed: relaxed.map((id) => QUESTIONS.find((q) => q.id === id).title),
    results: results.slice(0, limit).map((r) => ({ ...r, percent: Math.round(Math.min(99, (r.match / Math.max(top, 9.5)) * 97)) })),
  };
}
