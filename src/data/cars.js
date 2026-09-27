import { overallScore, slugify } from '../lib/scoring.js';

// ---------------------------------------------------------------------------
// KATEGORİLER
// Yeni kategori eklemek için bu listeye bir satır ekleyin.
// ---------------------------------------------------------------------------
export const CATEGORIES = [
  {
    slug: 'kompakt-sedan',
    title: 'En İyi Kompakt Sedanlar',
    short: 'Kompakt sedan',
    intro: 'Türkiye’nin en çok satan sınıfı. Bagaj, tüketim ve fiyat dengesi burada her şeyden önemli.',
  },
  {
    slug: 'premium-sedan',
    title: 'En İyi Premium Sedanlar',
    short: 'Premium sedan',
    intro: 'Sürüş keyfi, kabin kalitesi ve teknolojinin en üst seviyede buluştuğu sedanlar.',
  },
  {
    slug: 'aile-suv',
    title: 'En İyi Kompakt ve Aile SUV’ları',
    short: 'Aile SUV',
    intro: 'Yüksek oturma pozisyonu, geniş bagaj ve aile bütçesi arasında en iyi dengeyi kuran SUV’lar.',
  },
  {
    slug: 'elektrikli',
    title: 'En İyi Elektrikli Otomobiller',
    short: 'Elektrikli',
    intro: 'Menzil, şarj hızı ve verimlilik ölçümlerimize göre öne çıkan elektrikli modeller.',
  },
];

// ---------------------------------------------------------------------------
// ARAÇLAR
// Yeni araç eklemek için bir bloğu kopyalayıp değerleri değiştirin.
// - ratings: 8 başlığın her biri 0–10 arası, küsuratlı olabilir (ör. 8.7)
// - Genel puan ve sıralama OTOMATİK hesaplanır, elle yazmanıza gerek yok.
// - bodyType: 'sedan' | 'suv' | 'fastback'  (fotoğraf yoksa silüet için)
// - image: isteğe bağlı, ör. '/cars/toyota-corolla-hybrid.png'
//
// NOT: Aşağıdaki alt puanlar örnek olarak doldurulmuştur.
// Kendi test değerlendirmelerinizle değiştirin.
// ---------------------------------------------------------------------------
const RAW_CARS = [
  // --- Kompakt sedan ---
  {
    make: 'Toyota', model: 'Corolla Hybrid', year: 2024, version: '1.8 Hybrid Dream e-CVT',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 1650000,
    specs: { motor: '1.8L tam hibrit, 140 bg', hizlanma: '9,3 sn', tuketim: '4,5 L/100 km', bagaj: '471 L' },
    ratings: { surus: 7.8, guvenlik: 9.0, konfor: 8.2, tuketim: 9.6, malzeme: 8.0, tasarim: 7.9, fiyat: 8.8, teknoloji: 7.5 },
    pros: ['Şehir içinde rakipsiz yakıt ekonomisi', 'Kanıtlanmış mekanik dayanıklılık', 'Standart Toyota Safety Sense'],
    cons: ['Ani gaz tepkilerinde yükselen motor sesi (e-CVT)', 'Sade multimedya arayüzü'],
    summary: 'Kompakt sedan sınıfının verimlilik lideri. Dayanıklılığı ve düşük işletme giderleriyle aileler için en güvenli tercihlerden biri.',
  },
  {
    make: 'Renault', model: 'Megane Sedan', year: 2024, version: '1.3 TCe Icon EDC',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 1540000,
    specs: { motor: '1.3 turbo benzinli, 140 bg', hizlanma: '9,0 sn', tuketim: '5,9 L/100 km', bagaj: '503 L' },
    ratings: { surus: 7.9, guvenlik: 8.3, konfor: 8.4, tuketim: 8.2, malzeme: 7.4, tasarim: 7.8, fiyat: 8.6, teknoloji: 7.6 },
    pros: ['Canlı motor ve EDC şanzıman uyumu', '503 litrelik geniş bagaj', 'Yumuşak sürüş konforu'],
    cons: ['Otoyolda rüzgâr sesi belirgin', 'Orta konsolda sert plastikler'],
    summary: 'Geniş bagajı ve canlı turbo motoruyla dengeli bir aile otomobili.',
  },
  {
    make: 'Honda', model: 'Civic Sedan', year: 2024, version: '1.5 VTEC Turbo Elegance',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 1940000,
    specs: { motor: '1.5 VTEC Turbo, 182 bg', hizlanma: '8,1 sn', tuketim: '6,7 L/100 km', bagaj: '512 L' },
    ratings: { surus: 9.0, guvenlik: 8.8, konfor: 8.0, tuketim: 7.8, malzeme: 8.3, tasarim: 8.6, fiyat: 7.6, teknoloji: 8.1 },
    pros: ['182 beygirle güçlü ivmelenme', 'Bal peteği desenli şık kokpit', 'Dengeli viraj davranışı'],
    cons: ['CVT şanzımanın hissiz karakteri', 'Düşük hızlarda yol gürültüsü'],
    summary: 'Güçlü performansı ve dinamik şasisiyle sürüş keyfini sedan pratikliğiyle birleştiriyor.',
  },
  {
    make: 'Skoda', model: 'Octavia', year: 2024, version: '1.5 e-TEC Premium DSG',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 1850000,
    specs: { motor: '1.5 e-TEC hafif hibrit, 150 bg', hizlanma: '8,5 sn', tuketim: '5,3 L/100 km', bagaj: '600 L' },
    ratings: { surus: 8.2, guvenlik: 9.0, konfor: 8.3, tuketim: 8.7, malzeme: 8.2, tasarim: 7.9, fiyat: 8.5, teknoloji: 8.4 },
    pros: ['Sınıf lideri 600 litrelik liftback bagaj', 'Bir üst segment seviyesinde diz mesafesi', 'Akıllı “Simply Clever” çözümleri'],
    cons: ['Yumuşak süspansiyonda virajda gövde yatması', 'Multimedyanın geç açılması'],
    summary: 'Liftback bagaj kapağının getirdiği büyük yükleme hacmiyle sınıfının en işlevsel otomobili.',
  },
  {
    make: 'Fiat', model: 'Egea Sedan', year: 2024, version: '1.6 MultiJet Lounge',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 1310000,
    specs: { motor: '1.6 MultiJet dizel, 130 bg', hizlanma: '9,8 sn', tuketim: '4,3 L/100 km', bagaj: '520 L' },
    ratings: { surus: 7.1, guvenlik: 6.8, konfor: 7.0, tuketim: 9.1, malzeme: 6.5, tasarim: 7.0, fiyat: 9.3, teknoloji: 6.6 },
    pros: ['Çok düşük tüketim ve yüksek tork', 'Ucuz ve yaygın servis ağı', 'Geniş bagaj'],
    cons: ['Zayıf kabin ses yalıtımı', 'Eski güvenlik mimarisi'],
    summary: 'Satın alma ve kullanım maliyetinde Türkiye’nin en mantıklı fiyat/performans otomobillerinden biri.',
  },

  // --- Premium sedan ---
  {
    make: 'BMW', model: '3 Serisi', year: 2024, version: '320i M Sport',
    category: 'premium-sedan', bodyType: 'sedan', price: 3450000,
    specs: { motor: '1.6 turbo benzinli, 170 bg', hizlanma: '7,7 sn', tuketim: '7,1 L/100 km', bagaj: '480 L' },
    ratings: { surus: 9.5, guvenlik: 9.1, konfor: 8.4, tuketim: 8.0, malzeme: 9.0, tasarim: 8.8, fiyat: 7.4, teknoloji: 9.0 },
    pros: ['50:50 ağırlık dağılımı', 'Hızlı ve pürüzsüz 8 ileri şanzıman', 'Kavisli çift ekran'],
    cons: ['M Sport süspansiyon bozuk yolda sert', 'Pahalı opsiyonlar'],
    summary: 'Sürüş dinamikleri ve keskin yol tutuşta sınıfının referans noktası.',
  },
  {
    make: 'Mercedes-Benz', model: 'C-Serisi', year: 2024, version: 'C200 4MATIC AMG',
    category: 'premium-sedan', bodyType: 'sedan', price: 3850000,
    specs: { motor: '1.5 EQ Boost, 204 bg', hizlanma: '7,3 sn', tuketim: '6,9 L/100 km', bagaj: '455 L' },
    ratings: { surus: 8.8, guvenlik: 9.3, konfor: 9.1, tuketim: 8.1, malzeme: 9.0, tasarim: 9.3, fiyat: 7.0, teknoloji: 9.5 },
    pros: ['S-Serisi’nden gelen dijital kabin', '4MATIC dört çeker güvencesi', 'Etkileyici gece ambiyansı'],
    cons: ['AMG jantlarla bozuk yolda sertlik', 'Alt panellerde sert plastik'],
    summary: 'Teknoloji, lüks ambiyans ve dört çeker güvenliğini en prestijli biçimde sunuyor.',
  },
  {
    make: 'Audi', model: 'A4 Sedan', year: 2024, version: '40 TDI quattro S line',
    category: 'premium-sedan', bodyType: 'sedan', price: 3600000,
    specs: { motor: '2.0 TDI dizel, 204 bg', hizlanma: '6,9 sn', tuketim: '5,4 L/100 km', bagaj: '460 L' },
    ratings: { surus: 8.9, guvenlik: 9.1, konfor: 9.0, tuketim: 8.9, malzeme: 9.0, tasarim: 8.2, fiyat: 7.3, teknoloji: 8.6 },
    pros: ['quattro çekişin verdiği güven', 'Otoyolda çok sessiz kabin', 'Uzun yolda düşük tüketim'],
    cons: ['Kabin tasarımı rakiplerine göre eskimiş', 'Arkada yüksek şaft tüneli'],
    summary: 'Sessizliği ve quattro güveniyle uzun yolları kolayca tüketen bir yol otomobili.',
  },
  {
    make: 'Audi', model: 'A3 Sedan', year: 2024, version: '35 TFSI Advanced',
    category: 'premium-sedan', bodyType: 'sedan', price: 2320000,
    specs: { motor: '1.5 hafif hibrit, 150 bg', hizlanma: '8,4 sn', tuketim: '5,6 L/100 km', bagaj: '425 L' },
    ratings: { surus: 8.5, guvenlik: 8.9, konfor: 8.6, tuketim: 8.6, malzeme: 8.4, tasarim: 8.5, fiyat: 7.6, teknoloji: 8.7 },
    pros: ['Virtual Cockpit ergonomisi', 'Kompakt premium şıklık', 'Dengeli ve konforlu sürüş'],
    cons: ['Kapı alt panelleri sert', 'Arka görüş dar'],
    summary: 'Şehirde çevik, uzun yolda olgun hissettiren kompakt premium sedan.',
  },
  {
    make: 'BMW', model: 'M3 Sedan', year: 2024, version: 'Competition M xDrive',
    category: 'premium-sedan', bodyType: 'sedan', price: 9800000,
    specs: { motor: '3.0 sıralı 6 twin-turbo, 510 bg', hizlanma: '3,5 sn', tuketim: '10,1 L/100 km', bagaj: '480 L' },
    ratings: { surus: 9.9, guvenlik: 9.0, konfor: 6.8, tuketim: 5.9, malzeme: 9.2, tasarim: 9.1, fiyat: 6.2, teknoloji: 9.2 },
    pros: ['Pist odaklı S58 motor', 'Arkadan itiş moduna geçebilen M xDrive', 'Olağanüstü fren performansı'],
    cons: ['Günlük şehir kullanımı için çok sert', 'Yüksek kullanım maliyeti'],
    summary: 'Süper spor otomobil performansını dört kapılı bir sedanda sunuyor.',
  },

  // --- Aile SUV ---
  {
    make: 'Hyundai', model: 'Tucson', year: 2024, version: '1.6 CRDi Prime Plus',
    category: 'aile-suv', bodyType: 'suv', price: 2150000,
    specs: { motor: '1.6 dizel, 136 bg', hizlanma: '11,4 sn', tuketim: '5,6 L/100 km', bagaj: '598 L' },
    ratings: { surus: 7.8, guvenlik: 8.8, konfor: 8.6, tuketim: 8.5, malzeme: 8.2, tasarim: 9.0, fiyat: 8.4, teknoloji: 8.9 },
    pros: ['598 litrelik büyük bagaj', 'Gizli LED’li parametrik ön tasarım', 'Zengin donanım'],
    cons: ['Dizel motor kalkışta sakin', 'Parlak siyah yüzeyler çabuk çiziliyor'],
    summary: 'Cesur tasarımı ve geniş iç hacmiyle sınıfının en mantıklı aile SUV’larından biri.',
  },
  {
    make: 'Kia', model: 'Sportage', year: 2024, version: '1.6 T-GDI Prestige',
    category: 'aile-suv', bodyType: 'suv', price: 2280000,
    specs: { motor: '1.6 turbo benzinli, 150 bg', hizlanma: '9,6 sn', tuketim: '6,8 L/100 km', bagaj: '591 L' },
    ratings: { surus: 8.0, guvenlik: 8.8, konfor: 8.8, tuketim: 7.8, malzeme: 8.1, tasarim: 8.9, fiyat: 8.2, teknoloji: 9.1 },
    pros: ['Kavisli panoramik ekran', 'Yumuşak sürüş ve rahat koltuklar', 'Geniş arka diz mesafesi'],
    cons: ['Şehir içinde yüksek tüketim', 'Yan panellerde sert plastik'],
    summary: 'Modern kabini ve yüksek konfor seviyesiyle öne çıkan bir aile otomobili.',
  },
  {
    make: 'Nissan', model: 'Qashqai', year: 2024, version: '1.5 e-POWER',
    category: 'aile-suv', bodyType: 'suv', price: 2240000,
    specs: { motor: '1.5 benzinli jeneratör + elektrik motoru, 190 bg', hizlanma: '7,9 sn', tuketim: '5,3 L/100 km', bagaj: '504 L' },
    ratings: { surus: 8.2, guvenlik: 9.0, konfor: 8.5, tuketim: 8.7, malzeme: 8.5, tasarim: 8.3, fiyat: 7.9, teknoloji: 8.6 },
    pros: ['Şarj gerektirmeyen elektrikli sürüş hissi', '330 Nm anlık tork', 'Kaliteli kabin işçiliği'],
    cons: ['Yüksek hızda kabine gelen motor sesi', 'Ortalama bagaj hacmi'],
    summary: 'Priz derdi olmadan elektrikli otomobilin sessizlik ve tork avantajını yaşatıyor.',
  },
  {
    make: 'Peugeot', model: '408', year: 2024, version: '1.2 PureTech GT',
    category: 'aile-suv', bodyType: 'fastback', price: 1980000,
    specs: { motor: '1.2 turbo benzinli, 130 bg', hizlanma: '10,4 sn', tuketim: '6,0 L/100 km', bagaj: '536 L' },
    ratings: { surus: 7.9, guvenlik: 8.6, konfor: 8.3, tuketim: 8.1, malzeme: 8.2, tasarim: 9.5, fiyat: 7.9, teknoloji: 8.5 },
    pros: ['Göz alıcı fastback-SUV formu', '3D i-Cockpit gösterge', 'Geniş bagaj ağzı'],
    cons: ['1.2 motor bu gövde için sınırda', 'Arkada basık tavan'],
    summary: 'Klasik SUV çizgilerinden sıkılanlar için şık bir fastback alternatifi.',
  },
  {
    make: 'Chery', model: 'Tiggo 8 Pro', year: 2024, version: '1.6 TGDI Exceptional',
    category: 'aile-suv', bodyType: 'suv', price: 1840000,
    specs: { motor: '1.6 TGDI, 183 bg', hizlanma: '9,1 sn', tuketim: '8,1 L/100 km', bagaj: '889 L (5 koltuk)' },
    ratings: { surus: 7.4, guvenlik: 8.2, konfor: 8.0, tuketim: 6.6, malzeme: 7.6, tasarim: 8.0, fiyat: 8.9, teknoloji: 8.8 },
    pros: ['7 kişilik oturma düzeni', 'Eksiksiz donanım listesi', 'Çok geniş yükleme alanı'],
    cons: ['Şehir içinde yüksek tüketim', 'Virajda gövde salınımı'],
    summary: 'Kalabalık aileler için 7 koltuk ve yüksek donanımı ulaşılabilir fiyatla sunuyor.',
  },

  // --- Elektrikli ---
  {
    make: 'Tesla', model: 'Model Y', year: 2024, version: 'Long Range AWD',
    category: 'elektrikli', bodyType: 'suv', price: 3150000,
    specs: { motor: 'Çift motor AWD, 514 bg', hizlanma: '5,0 sn', tuketim: '16,9 kWh/100 km', bagaj: '854 L (ön + arka)' },
    ratings: { surus: 8.8, guvenlik: 9.4, konfor: 7.8, tuketim: 9.5, malzeme: 7.9, tasarim: 8.2, fiyat: 8.6, teknoloji: 9.6 },
    pros: ['Çok yüksek batarya verimliliği', 'Supercharger şarj ağı', 'Önde ve arkada iki bagaj'],
    cons: ['Fiziksel düğmelerin yokluğu', 'Sert süspansiyon ayarı'],
    summary: 'Geniş iç hacmi ve şarj ağıyla en zahmetsiz elektrikli otomobil deneyimlerinden biri.',
  },
  {
    make: 'Porsche', model: 'Taycan', year: 2024, version: '4S Performance Plus',
    category: 'elektrikli', bodyType: 'sedan', price: 7900000,
    specs: { motor: '800V çift motor, 544 bg', hizlanma: '3,7 sn', tuketim: '20,4 kWh/100 km', bagaj: '407 L' },
    ratings: { surus: 9.8, guvenlik: 9.2, konfor: 8.7, tuketim: 8.3, malzeme: 9.5, tasarim: 9.6, fiyat: 6.5, teknoloji: 9.4 },
    pros: ['Gerçek spor otomobil dinamikleri', '800V mimariyle çok hızlı şarj', 'Kusursuz viraj tutuşu'],
    cons: ['Dar arka yaşam alanı', 'Çok pahalı opsiyonlar'],
    summary: 'Elektrikli çağda saf spor otomobil karakterini yaşatan bir mühendislik örneği.',
  },
  {
    make: 'BMW', model: 'i7', year: 2024, version: 'xDrive60 Excellence',
    category: 'elektrikli', bodyType: 'sedan', price: 8900000,
    specs: { motor: 'Çift motor AWD, 544 bg', hizlanma: '4,7 sn', tuketim: '19,6 kWh/100 km', bagaj: '500 L' },
    ratings: { surus: 8.9, guvenlik: 9.4, konfor: 9.8, tuketim: 8.5, malzeme: 9.7, tasarim: 8.0, fiyat: 6.3, teknoloji: 9.9 },
    pros: ['Arkada 31,3 inç tavan ekranı', 'Olağanüstü kabin sessizliği', 'Havalı süspansiyonla yumuşak sürüş'],
    cons: ['Şehirde park etmek zor', 'Tartışmalı ön ızgara tasarımı'],
    summary: 'Arka koltuğunda sinema konforu sunan elektrikli bir makam otomobili.',
  },
  {
    make: 'BYD', model: 'Seal', year: 2024, version: 'AWD Excellence',
    category: 'elektrikli', bodyType: 'sedan', price: 2390000,
    specs: { motor: 'Çift motor AWD, 530 bg', hizlanma: '3,8 sn', tuketim: '18,2 kWh/100 km', bagaj: '400 L' },
    ratings: { surus: 9.1, guvenlik: 9.0, konfor: 8.4, tuketim: 8.8, malzeme: 8.3, tasarim: 8.9, fiyat: 8.8, teknoloji: 9.1 },
    pros: ['3,8 saniyede 0–100', 'Blade Batarya güvenliği', 'Dönebilen multimedya ekranı'],
    cons: ['Dar bagaj ağzı', 'Yapay direksiyon hissi'],
    summary: '530 beygirlik gücü ve güvenli batarya yapısıyla dikkat çeken bir spor sedan.',
  },
  {
    make: 'Togg', model: 'T10X', year: 2024, version: 'V2 RWD Uzun Menzil',
    category: 'elektrikli', bodyType: 'suv', price: 1823000,
    specs: { motor: 'Arkadan itiş, 218 bg', hizlanma: '7,8 sn', tuketim: '16,9 kWh/100 km', bagaj: '441 L' },
    ratings: { surus: 8.0, guvenlik: 9.0, konfor: 8.6, tuketim: 9.0, malzeme: 8.1, tasarim: 8.7, fiyat: 8.5, teknoloji: 9.0 },
    pros: ['Uçtan uca dijital kokpit', 'Geniş arka diz mesafesi', 'Yerli dijital ekosistem'],
    cons: ['Yazılım güncellemelerinde ara sıra gecikmeler', 'Orta boy bagaj'],
    summary: 'Geniş ekranları ve ferah kabiniyle yerli akıllı elektrikli SUV.',
  },
];

// ---------------------------------------------------------------------------
// Otomatik alanlar: slug, genel puan ve kategori içi sıra
// ---------------------------------------------------------------------------
const withScores = RAW_CARS.map((car) => ({
  ...car,
  slug: car.slug || slugify(`${car.make} ${car.model} ${car.year}`),
  score: overallScore(car.ratings),
}));

// Eşit genel puanda, yuvarlanmamış toplam puanı yüksek olan öne geçer.
const exactTotal = (c) => Object.values(c.ratings).reduce((a, b) => a + b, 0);

const rankMap = new Map();
for (const cat of CATEGORIES) {
  withScores
    .filter((c) => c.category === cat.slug)
    .sort((a, b) => b.score - a.score || exactTotal(b) - exactTotal(a))
    .forEach((c, i) => rankMap.set(c.slug, i + 1));
}

export const CARS = withScores.map((c) => ({ ...c, rank: rankMap.get(c.slug) }));

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCar(slug) {
  return CARS.find((c) => c.slug === slug);
}

export function carsInCategory(slug) {
  return CARS.filter((c) => c.category === slug).sort((a, b) => a.rank - b.rank);
}

export function searchCars(query) {
  const q = query.trim().toLocaleLowerCase('tr-TR');
  if (!q) return [];
  return CARS.filter((c) =>
    `${c.make} ${c.model} ${c.version} ${c.year}`.toLocaleLowerCase('tr-TR').includes(q)
  ).sort((a, b) => b.score - a.score);
}
