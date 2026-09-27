import { overallScore, slugify } from '../lib/scoring.js';

// ---------------------------------------------------------------------------
// KATEGORİLER
// ---------------------------------------------------------------------------
export const CATEGORIES = [
  {
    slug: 'sehir-hatchback',
    title: 'En İyi Şehir Otomobilleri',
    short: 'Şehir hatchback',
    intro: 'Kolay park, düşük tüketim ve makul fiyat. Şehirde yaşayanlar ve ilk otomobilini alanlar için en mantıklı sınıf.',
  },
  {
    slug: 'kompakt-hatchback',
    title: 'En İyi Kompakt Hatchbackler',
    short: 'Kompakt hatchback',
    intro: 'Sürüş keyfi, kabin kalitesi ve pratikliği bir arada arayanlar için en rekabetçi sınıflardan biri.',
  },
  {
    slug: 'kompakt-sedan',
    title: 'En İyi Kompakt Sedanlar',
    short: 'Kompakt sedan',
    intro: 'Türkiye’nin en çok satan sınıfı. Bagaj, tüketim ve fiyat dengesi burada her şeyden önemli.',
  },
  {
    slug: 'premium-sedan',
    title: 'En İyi Premium ve Üst Sınıf Sedanlar',
    short: 'Premium sedan',
    intro: 'Sürüş keyfi, kabin kalitesi ve teknolojinin en üst seviyede buluştuğu sedanlar. Türkiye’de ÖTV nedeniyle çoğu 1.6 litre altı motorlarla satılıyor.',
  },
  {
    slug: 'kucuk-suv',
    title: 'En İyi Küçük SUV’lar',
    short: 'Küçük SUV',
    intro: 'Hatchback boyutlarında, daha yüksek oturma pozisyonu sunan B-SUV ve crossover’lar. Pazarın en hızlı büyüyen sınıfı.',
  },
  {
    slug: 'aile-suv',
    title: 'En İyi Kompakt ve Aile SUV’ları',
    short: 'Aile SUV',
    intro: 'Yüksek oturma pozisyonu, geniş bagaj ve aile bütçesi arasında en iyi dengeyi kuran SUV’lar.',
  },
  {
    slug: 'premium-suv',
    title: 'En İyi Premium SUV’lar',
    short: 'Premium SUV',
    intro: 'Marka prestiji, kabin kalitesi ve ileri teknolojiyi yüksek sürüş pozisyonuyla birleştiren modeller.',
  },
  {
    slug: 'elektrikli',
    title: 'En İyi Elektrikli Otomobiller',
    short: 'Elektrikli',
    intro: 'Menzil, şarj hızı ve verimlilik değerlendirmelerimize göre öne çıkan elektrikli modeller.',
  },
];

// ---------------------------------------------------------------------------
// ARAÇLAR — TÜRKİYE PAZARI
// - Versiyonlar ve motorlar Türkiye’de satılan seçeneklere göre düzenlendi.
// - price: Eylül 2026 tavsiye edilen anahtar teslim liste fiyatı (TL).
//   Fiyatlar her ay değişir; güncellemeyi unutmayın.
//   "priceEstimate: true" olanlar için güncel liste fiyatı bulunamadı, tahmindir.
// - ratings: 8 başlık, 0–10 arası, küsuratlı olabilir.
// - Genel puan ve sıralama OTOMATİK hesaplanır.
// - bodyType: 'sedan' | 'suv' | 'fastback'
// ---------------------------------------------------------------------------
const RAW_CARS = [
  // =========================================================================
  // ŞEHİR HATCHBACK
  // =========================================================================
  {
    make: 'Renault', model: 'Clio', year: 2026, version: 'TCe 115 EDC Evolution Plus',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1830000,
    specs: { motor: 'Turbo benzin, 115 bg, EDC otomatik', hizlanma: '10,5 sn', tuketim: '5,5 L/100 km', bagaj: '391 L' },
    ratings: { surus: 7.8, guvenlik: 8.0, konfor: 7.7, tuketim: 8.3, malzeme: 7.6, tasarim: 8.6, fiyat: 8.5, teknoloji: 8.2 },
    pros: ['Bursa üretimi, sınıfının en uygun otomatiklerinden', 'Geniş bagaj', 'Yeni nesilde modern kabin ve tasarım'],
    cons: ['Arka koltuk diz mesafesi dar', 'EDC şanzıman düşük hızda sarsıntılı olabiliyor'],
    summary: 'Yerli üretimin fiyat avantajı, geniş bagajı ve yenilenen tasarımıyla şehir otomobili sınıfının en mantıklı tercihlerinden biri.',
  },
  {
    make: 'Toyota', model: 'Yaris Hybrid', year: 2026, version: '1.5 Hybrid Flame e-CVT',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 2350000,
    specs: { motor: '1.5L tam hibrit, 116 bg', hizlanma: '9,7 sn', tuketim: '3,9 L/100 km', bagaj: '286 L' },
    ratings: { surus: 7.6, guvenlik: 9.0, konfor: 7.2, tuketim: 9.8, malzeme: 7.2, tasarim: 7.8, fiyat: 7.2, teknoloji: 7.6 },
    pros: ['Şehir içinde rakipsiz yakıt tüketimi', 'Güçlü standart güvenlik paketi', 'Toyota hibrit dayanıklılığı'],
    cons: ['Küçük bagaj ve dar arka koltuk', 'Sınıfının en pahalılarından'],
    summary: 'Şehirde neredeyse elektrikli kadar ekonomik; alan yerine düşük yakıt masrafını seçenlerin otomobili.',
  },
  {
    make: 'Hyundai', model: 'i20', year: 2026, version: '1.0 T-GDI 90 Elite DCT',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 2068000,
    specs: { motor: '1.0L turbo, 90 bg, DCT', hizlanma: '12,5 sn', tuketim: '5,3 L/100 km', bagaj: '352 L' },
    ratings: { surus: 7.2, guvenlik: 7.6, konfor: 7.6, tuketim: 8.3, malzeme: 7.2, tasarim: 8.0, fiyat: 8.0, teknoloji: 8.0 },
    pros: ['İzmit’te üretim', 'Geniş iç hacim', 'Dijital gösterge ve zengin donanım'],
    cons: ['90 bg ile performans sınırlı', 'Kabin malzemeleri sade'],
    summary: 'Geniş kabini ve bol donanımıyla dengeli bir şehir otomobili; Türkiye’ye özel 90 bg motor ise ancak yetiyor.',
  },
  {
    make: 'Seat', model: 'Ibiza', year: 2026, version: '1.0 EcoTSI 116 Style Plus DSG',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1985000,
    specs: { motor: '1.0L turbo, 116 bg, DSG', hizlanma: '9,5 sn', tuketim: '5,3 L/100 km', bagaj: '355 L' },
    ratings: { surus: 8.2, guvenlik: 8.0, konfor: 7.6, tuketim: 8.2, malzeme: 7.3, tasarim: 7.8, fiyat: 8.2, teknoloji: 7.7 },
    pros: ['Sınıfının en canlı sürüşlerinden', 'Güçlü motor ve hızlı DSG', 'Polo altyapısı daha uygun fiyata'],
    cons: ['Süspansiyon kötü yolda sert', 'Kabinde sert plastikler'],
    summary: 'Volkswagen altyapısını genç bir karakter ve iyi bir fiyatla sunan, sürmesi keyifli bir şehir otomobili.',
  },
  {
    make: 'Opel', model: 'Corsa', year: 2026, version: 'Hybrid 1.2 136 GS e-DCT6',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1955000,
    specs: { motor: '1.2L turbo hafif hibrit, 136 bg', hizlanma: '8,9 sn', tuketim: '4,9 L/100 km', bagaj: '309 L' },
    ratings: { surus: 8.0, guvenlik: 7.4, konfor: 7.6, tuketim: 8.6, malzeme: 7.3, tasarim: 7.8, fiyat: 8.2, teknoloji: 7.7 },
    pros: ['Sınıfına göre güçlü hibrit motor', 'Düşük tüketim', 'Klasik, kullanışlı gösterge düzeni'],
    cons: ['Arka koltuk ve bagaj ortalama', 'Kabinde sert plastikler'],
    summary: 'Hafif hibrit motoruyla hem canlı hem ekonomik; fiyat/performans dengesi çok güçlü bir şehir otomobili.',
  },
  {
    make: 'Skoda', model: 'Fabia', year: 2026, version: '1.0 TSI 115 Premium DSG',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 2009900,
    specs: { motor: '1.0L turbo, 115 bg, DSG', hizlanma: '9,7 sn', tuketim: '5,3 L/100 km', bagaj: '380 L' },
    ratings: { surus: 7.7, guvenlik: 8.0, konfor: 7.9, tuketim: 8.3, malzeme: 7.4, tasarim: 7.2, fiyat: 8.0, teknoloji: 7.4 },
    pros: ['Sınıfının en geniş kabinlerinden', '380 litrelik bagaj', 'Pratik akıllı çözümler'],
    cons: ['Tasarımı sönük', 'Multimedya sade'],
    summary: 'Volkswagen mekaniğini daha fazla alanla sunan, akılla seçilecek bir şehir otomobili.',
  },
  {
    make: 'Dacia', model: 'Sandero', year: 2026, version: 'TCe 100 Expression',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1460000,
    specs: { motor: '1.0L turbo, 100 bg, manuel', hizlanma: '11,6 sn', tuketim: '5,4 L/100 km', bagaj: '328 L' },
    ratings: { surus: 6.9, guvenlik: 6.0, konfor: 7.2, tuketim: 8.2, malzeme: 6.0, tasarim: 7.0, fiyat: 9.4, teknoloji: 6.6 },
    pros: ['Piyasanın en uygun fiyatlı sıfır otomobillerinden', 'Geniş kabin', 'Basit ve ucuz bakım'],
    cons: ['Euro NCAP’te düşük yıldız', 'Ucuz kabin malzemeleri'],
    summary: 'Az parayla çok otomobil. Beklentisi temel ihtiyaçlar olanlar için fiyatına göre rakipsiz.',
  },
  {
    make: 'Suzuki', model: 'Swift', year: 2026, version: '1.2 MHEV CVT Life',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 2079000,
    specs: { motor: '1.2L hafif hibrit, 82 bg, CVT', hizlanma: '12,5 sn', tuketim: '4,7 L/100 km', bagaj: '265 L' },
    ratings: { surus: 7.5, guvenlik: 7.0, konfor: 7.0, tuketim: 9.0, malzeme: 6.8, tasarim: 7.6, fiyat: 7.4, teknoloji: 7.3 },
    pros: ['Çok düşük tüketim', 'Hafif ve çevik', 'Suzuki güvenilirliği'],
    cons: ['Küçük bagaj', 'Performans sınırlı'],
    summary: 'Küçük, hafif ve ekonomik; şehir içi kullanım için tasarlanmış sade bir otomobil.',
  },

  // =========================================================================
  // KOMPAKT HATCHBACK
  // =========================================================================
  {
    make: 'Volkswagen', model: 'Golf', year: 2026, version: '1.5 eTSI 150 Style DSG',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 3591000,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '8,5 sn', tuketim: '5,4 L/100 km', bagaj: '381 L' },
    ratings: { surus: 8.7, guvenlik: 8.8, konfor: 8.6, tuketim: 8.2, malzeme: 8.0, tasarim: 7.8, fiyat: 6.6, teknoloji: 8.3 },
    pros: ['Sınıfının referans sürüş dengesi', 'Güçlü ve verimli motor', 'Olgun, sessiz kabin'],
    cons: ['Sınıfının en pahalılarından', 'Bagaj rakiplerin gerisinde'],
    summary: 'Kompakt sınıfın ölçü birimi olmaya devam ediyor; her konuda iyi ama bedeli yüksek.',
  },
  {
    make: 'Peugeot', model: '308', year: 2026, version: '1.5 BlueHDi 130 GT EAT8',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2695000,
    specs: { motor: '1.5L turbodizel, 130 bg, EAT8', hizlanma: '10,6 sn', tuketim: '4,6 L/100 km', bagaj: '412 L' },
    ratings: { surus: 8.1, guvenlik: 8.0, konfor: 8.1, tuketim: 8.9, malzeme: 8.3, tasarim: 9.0, fiyat: 7.8, teknoloji: 8.3 },
    pros: ['Uzun yolda çok düşük dizel tüketimi', 'Sınıfın en etkileyici tasarımı', 'Kaliteli kabin'],
    cons: ['i-Cockpit düzeni herkese uymuyor', 'Arka koltuk başüstü dar'],
    summary: 'Türkiye’de dizel motorla satılan 308, tasarımı ve düşük yakıt masrafıyla uzun yol yapanlara hitap ediyor.',
  },
  {
    make: 'Opel', model: 'Astra', year: 2026, version: '1.5 Dizel 130 GS AT8',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2590000,
    specs: { motor: '1.5L turbodizel, 130 bg, AT8', hizlanma: '10,6 sn', tuketim: '4,7 L/100 km', bagaj: '422 L' },
    ratings: { surus: 8.0, guvenlik: 7.8, konfor: 8.2, tuketim: 8.8, malzeme: 7.8, tasarim: 8.4, fiyat: 7.9, teknoloji: 8.0 },
    pros: ['AGR sertifikalı çok rahat koltuklar', 'Düşük dizel tüketimi', 'Fiziksel tuşları koruyan net kabin'],
    cons: ['Arka görüş sınırlı', 'Dizel motor soğukta sesli'],
    summary: '308’in altyapısını daha sade ve kullanışlı bir kabinle birleştiren, çok kilometre yapanlar için mantıklı bir kompakt.',
  },
  {
    make: 'Seat', model: 'Leon', year: 2026, version: '1.5 eTSI 116 Style DSG',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2560000,
    specs: { motor: '1.5L turbo hafif hibrit, 116 bg', hizlanma: '10,2 sn', tuketim: '5,3 L/100 km', bagaj: '380 L' },
    ratings: { surus: 8.4, guvenlik: 8.6, konfor: 8.0, tuketim: 8.3, malzeme: 7.6, tasarim: 8.2, fiyat: 8.0, teknoloji: 8.0 },
    pros: ['Golf altyapısı çok daha uygun fiyata', 'Keskin direksiyon', 'Hafif hibritle iyi tüketim'],
    cons: ['116 bg dolu araçta yetersiz kalabiliyor', 'Malzemeler Golf’ün gerisinde'],
    summary: 'Golf’ün mekaniğini genç bir karakter ve bir milyon TL’ye yakın daha düşük fiyatla sunan akıllı bir alternatif.',
  },
  {
    make: 'Skoda', model: 'Scala', year: 2026, version: '1.0 TSI 115 Elite DSG',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2014900,
    specs: { motor: '1.0L turbo, 115 bg, DSG', hizlanma: '9,8 sn', tuketim: '5,2 L/100 km', bagaj: '467 L' },
    ratings: { surus: 7.6, guvenlik: 8.4, konfor: 8.0, tuketim: 8.4, malzeme: 7.5, tasarim: 7.3, fiyat: 8.7, teknoloji: 7.6 },
    pros: ['467 litre ile dev bagaj', 'Geniş arka koltuk', 'Sınıfının en uygun fiyatlılarından'],
    cons: ['Sürüş karakteri sıradan', 'Tasarımı dikkat çekmiyor'],
    summary: 'Kompakt fiyatına neredeyse aile otomobili alanı sunan, sessiz ama çok mantıklı bir seçenek.',
  },
  {
    make: 'Toyota', model: 'Corolla Hatchback', year: 2026, version: '1.8 Hybrid Flame e-CVT',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2905000,
    specs: { motor: '1.8L tam hibrit, 140 bg', hizlanma: '9,2 sn', tuketim: '4,4 L/100 km', bagaj: '361 L' },
    ratings: { surus: 7.9, guvenlik: 8.8, konfor: 8.0, tuketim: 9.5, malzeme: 7.8, tasarim: 8.0, fiyat: 7.4, teknoloji: 7.6 },
    pros: ['Çok düşük tüketim', 'Yüksek güvenilirlik', 'Sessiz şehir içi sürüş'],
    cons: ['Küçük bagaj', 'Arka koltuk dar'],
    summary: 'Sedan kardeşinin verimliliğini daha kompakt ve biraz daha sportif bir gövdeyle sunuyor.',
  },
  {
    make: 'Hyundai', model: 'i30', year: 2026, version: '1.5 T-GDI MHEV 140 Prime DCT',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2299000,
    specs: { motor: '1.5L turbo hafif hibrit, 140 bg', hizlanma: '9,0 sn', tuketim: '5,6 L/100 km', bagaj: '395 L' },
    ratings: { surus: 7.8, guvenlik: 8.2, konfor: 7.9, tuketim: 8.2, malzeme: 7.5, tasarim: 7.4, fiyat: 8.2, teknoloji: 7.8 },
    pros: ['Güçlü ve akıcı motor', 'Fiyatına göre zengin donanım', 'Geniş kabin'],
    cons: ['Tasarımı yaşını hissettiriyor', 'Multimedya rakiplerin gerisinde'],
    summary: 'Gösterişsiz ama sağlam; güçlü motoru ve makul fiyatıyla mantıklı bir kompakt hatchback.',
  },
  {
    make: 'Kia', model: 'Ceed', year: 2026, version: '1.5 T-GDI 140 Elegance DCT',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2070000,
    specs: { motor: '1.5L turbo, 140 bg, DCT', hizlanma: '9,6 sn', tuketim: '5,8 L/100 km', bagaj: '395 L' },
    ratings: { surus: 7.9, guvenlik: 8.2, konfor: 7.8, tuketim: 8.0, malzeme: 7.5, tasarim: 7.7, fiyat: 8.4, teknoloji: 7.7 },
    pros: ['Güçlü motor, uygun fiyat', 'Dengeli yol tutuş', 'Uzun garanti'],
    cons: ['Kabin tasarımı eski', 'Arka görüş ortalama'],
    summary: 'Golf fiyatının çok altında, benzer güçte motor ve olgun sürüş sunan değer odaklı bir tercih.',
  },

  // =========================================================================
  // KOMPAKT SEDAN
  // =========================================================================
  {
    make: 'Toyota', model: 'Corolla Hybrid', year: 2026, version: '1.8 Hybrid Dream e-CVT',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 2968000,
    specs: { motor: '1.8L tam hibrit, 140 bg', hizlanma: '9,3 sn', tuketim: '4,5 L/100 km', bagaj: '471 L' },
    ratings: { surus: 7.8, guvenlik: 9.0, konfor: 8.2, tuketim: 9.6, malzeme: 8.0, tasarim: 7.9, fiyat: 7.8, teknoloji: 7.5 },
    pros: ['Sakarya üretimi', 'Şehir içinde rakipsiz yakıt ekonomisi', 'Kanıtlanmış mekanik dayanıklılık'],
    cons: ['Ani gaz tepkilerinde yükselen motor sesi (e-CVT)', 'Sade multimedya arayüzü'],
    summary: 'Kompakt sedan sınıfının verimlilik lideri. Dayanıklılığı ve düşük işletme giderleriyle aileler için en güvenli tercihlerden biri.',
  },
  {
    make: 'Fiat', model: 'Egea Sedan', year: 2026, version: '1.6 Multijet 130 DCT Lounge',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 2090900,
    specs: { motor: '1.6L turbodizel, 130 bg, DCT', hizlanma: '9,9 sn', tuketim: '4,8 L/100 km', bagaj: '520 L' },
    ratings: { surus: 7.1, guvenlik: 6.2, konfor: 7.3, tuketim: 8.8, malzeme: 6.4, tasarim: 6.8, fiyat: 8.6, teknoloji: 6.9 },
    pros: ['Bursa üretimi, 520 litrelik dev bagaj', 'Güçlü ve çok ekonomik dizel', 'Parça ve servis çok kolay'],
    cons: ['Eskimiş platform ve güvenlik', 'Sade kabin'],
    summary: 'Türkiye’nin en tanıdık sedanı; yeni dizel motoruyla düşük tüketim ve geniş bagajı ulaşılabilir fiyatla sunuyor.',
  },
  {
    make: 'Renault', model: 'Megane Sedan', year: 2026, version: '1.3 TCe 140 EDC Icon',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 2349000,
    specs: { motor: '1.3L turbo, 140 bg, EDC', hizlanma: '9,5 sn', tuketim: '6,0 L/100 km', bagaj: '503 L' },
    ratings: { surus: 7.6, guvenlik: 7.6, konfor: 8.0, tuketim: 7.8, malzeme: 7.3, tasarim: 7.4, fiyat: 8.3, teknoloji: 7.4 },
    pros: ['Bursa üretimi', 'Güçlü motor ve otomatik şanzıman', 'Geniş bagaj ve arka koltuk'],
    cons: ['Platform ve multimedya yaşını hissettiriyor', 'Tüketim hibritlerin gerisinde'],
    summary: 'Uzun süredir üretilse de güçlü motoru, bagajı ve fiyatıyla hâlâ mantıklı bir aile sedanı.',
  },
  {
    make: 'Dacia', model: 'Logan', year: 2026, version: 'Eco-G 120 Journey Otomatik',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 1784000,
    specs: { motor: '1.0L turbo, benzin + fabrika çıkışlı LPG, 120 bg', hizlanma: '11,9 sn', tuketim: '6,9 L/100 km (LPG ile düşük maliyet)', bagaj: '528 L' },
    ratings: { surus: 6.8, guvenlik: 6.0, konfor: 7.3, tuketim: 8.6, malzeme: 6.2, tasarim: 7.0, fiyat: 9.2, teknoloji: 6.8 },
    pros: ['Fabrika LPG ile çok düşük yakıt maliyeti', 'Piyasanın en uygun otomatik sedanlarından', 'Geniş bagaj'],
    cons: ['Güvenlik donanımı ve NCAP sonucu zayıf', 'Ucuz malzemeler'],
    summary: 'Az bütçeyle geniş, otomatik ve LPG’li bir sedan arayanlar için en rasyonel seçim.',
  },
  {
    make: 'Honda', model: 'Civic Sedan', year: 2026, version: '1.5 VTEC Turbo Executive+',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 2700000, priceEstimate: true,
    specs: { motor: '1.5L turbo benzin, 182 bg (ECO LPG seçeneği de var)', hizlanma: '8,2 sn', tuketim: '6,7 L/100 km', bagaj: '495 L' },
    ratings: { surus: 8.8, guvenlik: 8.5, konfor: 8.3, tuketim: 7.4, malzeme: 8.1, tasarim: 8.2, fiyat: 7.2, teknoloji: 7.8 },
    pros: ['Sınıfının en iyi sürüş keyfi', 'Güçlü motor', 'Yüksek güvenilirlik ve ikinci el değeri'],
    cons: ['Tüketim hibritlerin gerisinde', 'Multimedya sade'],
    summary: 'Sedan pratikliğini gerçek sürüş keyfiyle birleştiren, Türkiye’de yıllardır sevilen bir tercih.',
  },
  {
    make: 'Skoda', model: 'Octavia', year: 2026, version: '1.5 TSI mHEV 150 Prestige DSG',
    category: 'kompakt-sedan', bodyType: 'fastback', price: 3459900,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '8,5 sn', tuketim: '5,3 L/100 km', bagaj: '600 L' },
    ratings: { surus: 8.3, guvenlik: 8.9, konfor: 8.6, tuketim: 8.3, malzeme: 8.0, tasarim: 7.8, fiyat: 7.3, teknoloji: 8.2 },
    pros: ['600 litrelik bagaj ve üst sınıf alan', 'Olgun sürüş ve konfor', 'Güçlü, verimli motor'],
    cons: ['Üst donanımlarda fiyat hızla artıyor', 'Tasarımı muhafazakâr'],
    summary: 'Kompakt fiyatına orta sınıf sedan alanı. Aileler için sınıfının en dengeli paketlerinden biri.',
  },
  {
    make: 'Citroën', model: 'C4 X', year: 2026, version: '1.2 Hybrid 145 Max e-DCS6',
    category: 'kompakt-sedan', bodyType: 'fastback', price: 2345000,
    specs: { motor: '1.2L turbo hafif hibrit, 145 bg', hizlanma: '9,5 sn', tuketim: '5,2 L/100 km', bagaj: '510 L' },
    ratings: { surus: 7.4, guvenlik: 7.4, konfor: 8.8, tuketim: 8.4, malzeme: 7.2, tasarim: 8.0, fiyat: 8.2, teknoloji: 7.5 },
    pros: ['Sınıfının en yumuşak süspansiyonu', 'Rahat Advanced Comfort koltuklar', 'Geniş bagaj'],
    cons: ['Yol tutuşu sportif değil', 'Arka görüş sınırlı'],
    summary: 'Konforu her şeyin önüne koyanlar için tasarlanmış, farklı görünümlü bir sedan-crossover karışımı.',
  },
  {
    make: 'Peugeot', model: '408', year: 2026, version: '1.2 Hybrid 145 GT e-DCS6',
    category: 'kompakt-sedan', bodyType: 'fastback', price: 3028000,
    specs: { motor: '1.2L turbo hafif hibrit, 145 bg', hizlanma: '9,1 sn', tuketim: '5,3 L/100 km', bagaj: '536 L' },
    ratings: { surus: 8.1, guvenlik: 8.0, konfor: 8.2, tuketim: 8.4, malzeme: 8.3, tasarim: 9.3, fiyat: 7.2, teknoloji: 8.2 },
    pros: ['Yolda en çok dikkat çeken tasarımlardan', 'Kaliteli kabin', 'Geniş bagaj'],
    cons: ['GT donanımda fiyat yüksek', 'Arka başüstü mesafesi sınırlı'],
    summary: 'Tasarımıyla sınıf kalıplarını kıran fastback; 308’in kalitesini daha fazla alanla sunuyor.',
  },

  // =========================================================================
  // PREMIUM SEDAN
  // =========================================================================
  {
    make: 'BMW', model: '3 Serisi', year: 2026, version: '320i M Sport',
    category: 'premium-sedan', bodyType: 'sedan', price: 6307600,
    specs: { motor: '1.6L turbo, 170 bg (Türkiye’ye özel)', hizlanma: '8,1 sn', tuketim: '6,4 L/100 km', bagaj: '480 L' },
    ratings: { surus: 9.2, guvenlik: 8.9, konfor: 8.4, tuketim: 7.8, malzeme: 8.8, tasarim: 8.5, fiyat: 7.0, teknoloji: 8.8 },
    pros: ['Sınıfının en iyi sürüş dinamikleri', 'Mükemmel şanzıman ve direksiyon', 'Kavisli ekran ve iDrive'],
    cons: ['1.6 motor şasinin hakkını tam veremiyor', 'M Sport süspansiyon kötü yolda sert'],
    summary: 'Türkiye’ye özel 1.6 motoruyla bile sürücü odaklı premium sedanın referansı. Direksiyon başında olmayı sevenler için ilk tercih.',
  },
  {
    make: 'Mercedes-Benz', model: 'C Serisi', year: 2026, version: 'C 200 4MATIC AMG',
    category: 'premium-sedan', bodyType: 'sedan', price: 6485000,
    specs: { motor: '1.5L turbo hafif hibrit, 204 bg, 4MATIC', hizlanma: '7,3 sn', tuketim: '7,0 L/100 km', bagaj: '455 L' },
    ratings: { surus: 8.5, guvenlik: 9.2, konfor: 8.8, tuketim: 7.5, malzeme: 8.9, tasarim: 9.0, fiyat: 6.9, teknoloji: 9.1 },
    pros: ['Mini S-Serisi etkisi yaratan kabin', '4MATIC dört çeker standart', 'Gelişmiş sürüş destek sistemleri'],
    cons: ['Dokunmatik direksiyon tuşları', 'Yüksek fiyat'],
    summary: 'Kabin atmosferi ve konforuyla sınıfının en lüks hissettireni; Türkiye versiyonunda dört çeker de standart.',
  },
  {
    make: 'Audi', model: 'A5 Sedan', year: 2026, version: 'TFSI 204 quattro S tronic',
    category: 'premium-sedan', bodyType: 'fastback', price: 8545869,
    specs: { motor: '2.0L turbo, 204 bg (150 kW), quattro', hizlanma: '7,0 sn', tuketim: '7,3 L/100 km', bagaj: '445 L' },
    ratings: { surus: 8.6, guvenlik: 8.9, konfor: 8.6, tuketim: 7.2, malzeme: 8.8, tasarim: 8.4, fiyat: 6.0, teknoloji: 9.0 },
    pros: ['Yeni nesil dijital kokpit ve yolcu ekranı', 'quattro dört çeker', 'Yüksek işçilik kalitesi'],
    cons: ['2.0 motor nedeniyle rakiplerden çok daha pahalı', 'Ekranların çokluğu dikkat dağıtabiliyor'],
    summary: 'Teknolojide sınıfının öncüsü; Türkiye’de 1.6 altı motor seçeneği olmaması fiyatını rakiplerinin çok üstüne taşıyor.',
  },
  {
    make: 'Skoda', model: 'Superb', year: 2026, version: '1.5 TSI mHEV 150 Prestige DSG',
    category: 'premium-sedan', bodyType: 'fastback', price: 4744900,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '9,2 sn', tuketim: '5,9 L/100 km', bagaj: '645 L' },
    ratings: { surus: 8.0, guvenlik: 9.0, konfor: 9.0, tuketim: 8.3, malzeme: 8.4, tasarim: 8.0, fiyat: 8.2, teknoloji: 8.6 },
    pros: ['Limuzin gibi geniş arka koltuk', 'Dev bagaj', 'Premium rakiplerin çok altında fiyat'],
    cons: ['Premium marka prestiji yok', '150 bg ağır gövdede sınırda'],
    summary: 'Premium markaların fiyatının çok altında, onlarla yarışan konfor ve alan sunan akıllı bir tercih.',
  },
  {
    make: 'BMW', model: '5 Serisi', year: 2026, version: '520i M Sport',
    category: 'premium-sedan', bodyType: 'sedan', price: 9290400,
    specs: { motor: '1.6L turbo hafif hibrit, 190 bg (Türkiye’ye özel)', hizlanma: '7,9 sn', tuketim: '6,9 L/100 km', bagaj: '520 L' },
    ratings: { surus: 9.0, guvenlik: 9.3, konfor: 9.1, tuketim: 7.8, malzeme: 9.1, tasarim: 8.2, fiyat: 6.3, teknoloji: 9.3 },
    pros: ['Konfor ve sürüş dengesi mükemmel', 'Geniş ve sessiz kabin', 'Üst düzey teknoloji'],
    cons: ['Çok yüksek fiyat', 'Tasarımı tartışmalı'],
    summary: 'İş sınıfı sedanın en eksiksiz örneklerinden; Türkiye’ye özel 1.6 motor günlük kullanımda yeterli performans sunuyor.',
  },
  {
    make: 'Mercedes-Benz', model: 'E Serisi', year: 2026, version: 'E 180 AMG',
    category: 'premium-sedan', bodyType: 'sedan', price: 8668500,
    specs: { motor: '1.5L turbo hafif hibrit, 170 bg', hizlanma: '9,0 sn', tuketim: '6,9 L/100 km', bagaj: '540 L' },
    ratings: { surus: 8.3, guvenlik: 9.5, konfor: 9.4, tuketim: 7.7, malzeme: 9.3, tasarim: 8.8, fiyat: 6.2, teknoloji: 9.5 },
    pros: ['Sınıfının en konforlu sürüşü', 'MBUX Superscreen ve üst düzey teknoloji', 'Çok yüksek güvenlik'],
    cons: ['Giriş motoru ağır gövdede zorlanıyor', 'Fiyatı çok yüksek'],
    summary: 'Konfor ve teknolojinin zirvesi; sürüş keyfinden çok huzurlu seyahat arayanlar için.',
  },

  // =========================================================================
  // KÜÇÜK SUV
  // =========================================================================
  {
    make: 'Renault', model: 'Captur', year: 2026, version: 'Mild Hybrid 140 EDC Techno',
    category: 'kucuk-suv', bodyType: 'suv', price: 2325000,
    specs: { motor: '1.3L turbo hafif hibrit, 140 bg', hizlanma: '9,9 sn', tuketim: '5,9 L/100 km', bagaj: '484 L' },
    ratings: { surus: 7.6, guvenlik: 8.0, konfor: 7.9, tuketim: 7.9, malzeme: 7.6, tasarim: 8.0, fiyat: 8.2, teknoloji: 8.3 },
    pros: ['Kayar arka koltukla esnek bagaj', 'Google tabanlı multimedya', 'Güçlü motor'],
    cons: ['EDC şanzıman düşük hızda sarsıntılı olabiliyor', 'Arka orta koltuk dar'],
    summary: 'Pratikliği, teknolojisi ve fiyatıyla sınıfının en dengeli küçük SUV’larından biri.',
  },
  {
    make: 'Peugeot', model: '2008', year: 2026, version: '1.2 Hybrid 145 GT eDCS6',
    category: 'kucuk-suv', bodyType: 'suv', price: 2632000,
    specs: { motor: '1.2L turbo hafif hibrit, 145 bg', hizlanma: '9,2 sn', tuketim: '5,3 L/100 km', bagaj: '434 L' },
    ratings: { surus: 7.9, guvenlik: 7.6, konfor: 7.9, tuketim: 8.3, malzeme: 8.0, tasarim: 8.9, fiyat: 7.4, teknoloji: 8.1 },
    pros: ['Sınıfının en premium görünen kabini', 'Hafif hibritle iyi tüketim', 'Çevik sürüş'],
    cons: ['GT donanımda fiyat yüksek', 'Arka koltuk rakiplerden dar'],
    summary: 'Görünüşü ve kabin kalitesiyle öne çıkan, kendini bir üst sınıf gibi hissettiren küçük SUV.',
  },
  {
    make: 'Toyota', model: 'Yaris Cross', year: 2026, version: '1.5 Hybrid 130 Flame e-CVT',
    category: 'kucuk-suv', bodyType: 'suv', price: 3345000,
    specs: { motor: '1.5L tam hibrit, 130 bg', hizlanma: '10,2 sn', tuketim: '4,4 L/100 km', bagaj: '397 L' },
    ratings: { surus: 7.5, guvenlik: 8.8, konfor: 7.4, tuketim: 9.6, malzeme: 7.2, tasarim: 7.9, fiyat: 6.6, teknoloji: 7.8 },
    pros: ['Sınıfının en düşük tüketimi', 'Toyota güvenilirliği', 'Güçlü güvenlik paketi'],
    cons: ['Sınıfının en pahalılarından', 'Kabin malzemeleri fiyatının gerisinde'],
    summary: 'Yakıt masrafını en aza indirmek isteyenler için ideal; ancak fiyatı artık bir üst sınıfa yaklaştı.',
  },
  {
    make: 'Hyundai', model: 'Bayon', year: 2026, version: '1.0 T-GDI 90 Elite DCT',
    category: 'kucuk-suv', bodyType: 'suv', price: 2192000,
    specs: { motor: '1.0L turbo, 90 bg, DCT', hizlanma: '12,9 sn', tuketim: '5,5 L/100 km', bagaj: '411 L' },
    ratings: { surus: 7.0, guvenlik: 7.4, konfor: 7.6, tuketim: 8.1, malzeme: 7.1, tasarim: 7.5, fiyat: 8.0, teknoloji: 7.9 },
    pros: ['İzmit üretimi', 'Geniş bagaj', 'Zengin donanım'],
    cons: ['90 bg ile performans zayıf', 'Gerçek bir SUV duruşu yok'],
    summary: 'i20 altyapısını daha yüksek duruş ve bagajla sunan, bütçe dostu bir küçük SUV.',
  },
  {
    make: 'Volkswagen', model: 'T-Cross', year: 2026, version: '1.0 TSI 116 Style DSG',
    category: 'kucuk-suv', bodyType: 'suv', price: 3008000,
    specs: { motor: '1.0L turbo, 116 bg, DSG', hizlanma: '10,2 sn', tuketim: '5,6 L/100 km', bagaj: '455 L' },
    ratings: { surus: 7.8, guvenlik: 8.3, konfor: 8.0, tuketim: 8.1, malzeme: 7.5, tasarim: 7.6, fiyat: 6.8, teknoloji: 7.8 },
    pros: ['Olgun ve sessiz sürüş', 'Kayar arka koltuk', 'Güçlü ikinci el değeri'],
    cons: ['Fiyatına göre sert plastikler', 'Rakiplerden belirgin pahalı'],
    summary: 'Polo’nun olgunluğunu yüksek oturma pozisyonuyla birleştiren güvenli bir tercih; bedeli ise yüksek.',
  },
  {
    make: 'Ford', model: 'Puma', year: 2026, version: '1.0 EcoBoost 155 ST-Line X',
    category: 'kucuk-suv', bodyType: 'suv', price: 2615600,
    specs: { motor: '1.0L turbo, 155 bg, 7 ileri otomatik', hizlanma: '8,9 sn', tuketim: '5,9 L/100 km', bagaj: '456 L' },
    ratings: { surus: 8.8, guvenlik: 7.9, konfor: 7.5, tuketim: 7.8, malzeme: 7.4, tasarim: 8.2, fiyat: 7.8, teknoloji: 8.0 },
    pros: ['Sınıfının en eğlenceli sürüşü', 'Bagaj altındaki MegaBox', 'Güçlü motor'],
    cons: ['Sert süspansiyon', 'Arka yaşam alanı dar'],
    summary: 'Küçük SUV sınıfında sürüş keyfi arayanların ilk durağı; pratiklikte de şaşırtıcı derecede iyi.',
  },
  {
    make: 'Skoda', model: 'Kamiq', year: 2026, version: '1.0 TSI 115 Elite DSG',
    category: 'kucuk-suv', bodyType: 'suv', price: 2149900,
    specs: { motor: '1.0L turbo, 115 bg, DSG', hizlanma: '9,9 sn', tuketim: '5,5 L/100 km', bagaj: '400 L' },
    ratings: { surus: 7.7, guvenlik: 8.3, konfor: 8.1, tuketim: 8.2, malzeme: 7.5, tasarim: 7.3, fiyat: 8.5, teknoloji: 7.6 },
    pros: ['Geniş arka koltuk', 'Konforlu süspansiyon', 'T-Cross’tan çok daha uygun fiyat'],
    cons: ['Tasarımı sıradan', 'Sürüşte heyecan yok'],
    summary: 'T-Cross’un mekaniğini daha fazla alan ve yaklaşık 850 bin TL daha düşük fiyatla sunan mantıklı küçük SUV.',
  },
  {
    make: 'Opel', model: 'Frontera', year: 2026, version: 'Hybrid 1.2 136 GS e-DCT6',
    category: 'kucuk-suv', bodyType: 'suv', price: 2290000,
    specs: { motor: '1.2L turbo hafif hibrit, 136 bg', hizlanma: '9,0 sn', tuketim: '5,4 L/100 km', bagaj: '460 L' },
    ratings: { surus: 7.3, guvenlik: 7.2, konfor: 7.8, tuketim: 8.3, malzeme: 7.0, tasarim: 7.9, fiyat: 8.4, teknoloji: 7.5 },
    pros: ['Geniş ve pratik kabin', 'Güçlü hibrit motor', 'Fiyatına göre büyük gövde'],
    cons: ['Kabinde sert malzemeler', 'Sürüş dinamikleri sıradan'],
    summary: 'Fiyatına göre sunduğu alan ve hafif hibrit motoruyla aileler için mantıklı, yeni bir küçük SUV.',
  },
  {
    make: 'Hyundai', model: 'Kona', year: 2026, version: '1.6 T-GDI Prime DCT',
    category: 'kucuk-suv', bodyType: 'suv', price: 2384050,
    specs: { motor: '1.6L turbo benzin, DCT', hizlanma: '7,8 sn', tuketim: '6,9 L/100 km', bagaj: '466 L' },
    ratings: { surus: 7.8, guvenlik: 8.6, konfor: 8.2, tuketim: 7.5, malzeme: 7.8, tasarim: 8.4, fiyat: 8.2, teknoloji: 8.6 },
    pros: ['Güçlü motor', 'Geniş kabin ve bagaj', 'Çift ekranlı modern kokpit'],
    cons: ['Tüketim hibrit rakiplerden yüksek', 'Tasarım herkese hitap etmiyor'],
    summary: 'Yeni neslinde büyüyen Kona, güçlü motoru ve fiyatıyla küçük SUV ile aile SUV’u arasında iyi bir köprü kuruyor.',
  },
  {
    make: 'Fiat', model: 'Egea Cross', year: 2026, version: '1.6 Multijet 130 DCT Lounge',
    category: 'kucuk-suv', bodyType: 'suv', price: 2062900,
    specs: { motor: '1.6L turbodizel, 130 bg, DCT', hizlanma: '10,0 sn', tuketim: '4,9 L/100 km', bagaj: '440 L' },
    ratings: { surus: 7.0, guvenlik: 6.2, konfor: 7.4, tuketim: 8.8, malzeme: 6.5, tasarim: 7.2, fiyat: 8.5, teknoloji: 6.9 },
    pros: ['Bursa üretimi', 'Ekonomik dizel ve otomatik şanzıman', 'Yüksek yerden yükseklik'],
    cons: ['Eskimiş platform', 'Güvenlik puanı düşük'],
    summary: 'Egea’nın yükseltilmiş hali; dizel ekonomisi ve crossover duruşunu uygun fiyatla sunuyor.',
  },

  // =========================================================================
  // AİLE SUV
  // =========================================================================
  {
    make: 'Renault', model: 'Duster', year: 2026, version: 'Turbo TCe 145 EDC Techno',
    category: 'aile-suv', bodyType: 'suv', price: 2080000,
    specs: { motor: 'Turbo benzin, 145 bg, EDC otomatik', hizlanma: '10,0 sn', tuketim: '6,2 L/100 km', bagaj: '472 L' },
    ratings: { surus: 7.4, guvenlik: 6.8, konfor: 7.6, tuketim: 7.8, malzeme: 6.8, tasarim: 8.0, fiyat: 9.2, teknoloji: 7.2 },
    pros: ['Fiyatına göre inanılmaz değer', 'Sağlam ve iddialı duruş', '4x4 ve LPG seçenekleri'],
    cons: ['Ucuz kabin malzemeleri', 'Güvenlik puanı rakiplerin gerisinde'],
    summary: 'Aile SUV’una en uygun fiyatlı giriş biletlerinden; Türkiye’de Renault logosuyla satılıyor.',
  },
  {
    make: 'Peugeot', model: '3008', year: 2026, version: '1.2 Hybrid 136 GT eDCS6',
    category: 'aile-suv', bodyType: 'suv', price: 3390000,
    specs: { motor: '1.2L turbo hafif hibrit, 136 bg', hizlanma: '10,2 sn', tuketim: '5,6 L/100 km', bagaj: '520 L' },
    ratings: { surus: 7.9, guvenlik: 8.3, konfor: 8.2, tuketim: 8.0, malzeme: 8.4, tasarim: 9.2, fiyat: 7.2, teknoloji: 8.8 },
    pros: ['21 inçlik panoramik kavisli ekran', 'Çarpıcı fastback tasarım', 'Kaliteli kabin'],
    cons: ['Motor ağır gövdede zorlanabiliyor', 'GT donanımda fiyat yüksek'],
    summary: 'Tasarım ve teknolojide sınıfının en iddialısı; göz alıcı bir aile SUV’u arayanlar için.',
  },
  {
    make: 'Volkswagen', model: 'Tiguan', year: 2026, version: '1.5 eTSI 150 Elegance DSG',
    category: 'aile-suv', bodyType: 'suv', price: 4629000,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '9,1 sn', tuketim: '6,0 L/100 km', bagaj: '652 L' },
    ratings: { surus: 8.4, guvenlik: 8.9, konfor: 8.7, tuketim: 7.9, malzeme: 8.3, tasarim: 8.0, fiyat: 6.4, teknoloji: 8.6 },
    pros: ['652 litrelik bagaj', 'DCC süspansiyonla üstün konfor', 'Olgun, sessiz sürüş'],
    cons: ['Fiyatı premium SUV’lara yaklaştı', 'Bazı fonksiyonlar menülere gömülü'],
    summary: 'Konfor, alan ve kaliteyi en dengeli şekilde birleştiren aile SUV’larından; bedeli ise çok yüksek.',
  },
  {
    make: 'Toyota', model: 'C-HR', year: 2026, version: '1.8 Hybrid Passion e-CVT',
    category: 'aile-suv', bodyType: 'suv', price: 3045000,
    specs: { motor: '1.8L tam hibrit, 140 bg', hizlanma: '9,9 sn', tuketim: '4,8 L/100 km', bagaj: '388 L' },
    ratings: { surus: 8.0, guvenlik: 8.8, konfor: 7.9, tuketim: 9.2, malzeme: 8.0, tasarim: 8.8, fiyat: 7.6, teknoloji: 8.0 },
    pros: ['Sakarya üretimi', 'Çok düşük tüketim', 'Keskin ve modern tasarım'],
    cons: ['Küçük bagaj', 'Arka koltuk ve görüş sınırlı'],
    summary: 'Aileden çok çiftlere uygun; tasarım ve verimlilikte güçlü, pratiklikte sınıfının gerisinde.',
  },
  {
    make: 'Toyota', model: 'RAV4', year: 2026, version: '2.5 Hybrid 4x4 Passion X-Pack',
    category: 'aile-suv', bodyType: 'suv', price: 5639000,
    specs: { motor: '2.5L tam hibrit, 222 bg, 4x4', hizlanma: '8,1 sn', tuketim: '5,8 L/100 km', bagaj: '580 L' },
    ratings: { surus: 7.9, guvenlik: 9.0, konfor: 8.2, tuketim: 8.6, malzeme: 7.8, tasarim: 7.8, fiyat: 6.0, teknoloji: 8.0 },
    pros: ['Güçlü ve verimli hibrit', 'Standart dört çeker', 'Uzun ömürlü mekanik'],
    cons: ['2.5 motor nedeniyle çok yüksek fiyat', 'Kabin malzemeleri fiyatının gerisinde'],
    summary: 'Güvenilirlik ve dört çekeri birleştiren sağlam bir aile SUV’u; ÖTV nedeniyle fiyatı premium seviyede.',
  },
  {
    make: 'Hyundai', model: 'Tucson', year: 2026, version: '1.6 T-GDI 180 4x2 Elite DCT',
    category: 'aile-suv', bodyType: 'suv', price: 3470000,
    specs: { motor: '1.6L turbo benzin, 180 bg, DCT', hizlanma: '9,1 sn', tuketim: '7,0 L/100 km', bagaj: '620 L' },
    ratings: { surus: 7.9, guvenlik: 8.7, konfor: 8.5, tuketim: 7.3, malzeme: 8.0, tasarim: 8.6, fiyat: 7.5, teknoloji: 8.7 },
    pros: ['Güçlü motor', 'Geniş bagaj', 'Zengin teknoloji ve donanım'],
    cons: ['Tüketim hibrit rakiplerden yüksek', 'Direksiyon hissi zayıf'],
    summary: 'Donanım, tasarım ve alanı iyi fiyatla sunan, sınıfının en dengeli paketlerinden.',
  },
  {
    make: 'Kia', model: 'Sportage', year: 2026, version: '1.6 T-GDI 150 Prestige DCT',
    category: 'aile-suv', bodyType: 'suv', price: 3340000,
    specs: { motor: '1.6L turbo benzin, 150 bg, DCT', hizlanma: '10,4 sn', tuketim: '7,0 L/100 km', bagaj: '591 L' },
    ratings: { surus: 7.8, guvenlik: 8.7, konfor: 8.4, tuketim: 7.3, malzeme: 8.1, tasarim: 8.4, fiyat: 7.6, teknoloji: 8.7 },
    pros: ['Kavisli çift ekran', 'Geniş arka koltuk', 'Uzun garanti'],
    cons: ['150 bg dolu araçta sınırda', 'Dokunmatik çift fonksiyonlu panel kafa karıştırıcı'],
    summary: 'Tucson’un kuzeni; kaliteli kabini ve geniş donanım yelpazesiyle eşit derecede güçlü bir aday.',
  },
  {
    make: 'Nissan', model: 'Qashqai', year: 2026, version: 'e-POWER 190 Skypack',
    category: 'aile-suv', bodyType: 'suv', price: 4115200,
    specs: { motor: '1.5L seri hibrit (e-POWER), 190 bg', hizlanma: '7,9 sn', tuketim: '5,3 L/100 km', bagaj: '504 L' },
    ratings: { surus: 7.8, guvenlik: 8.6, konfor: 8.3, tuketim: 8.5, malzeme: 8.0, tasarim: 8.0, fiyat: 6.6, teknoloji: 8.3 },
    pros: ['Elektrikli gibi sessiz, akıcı hızlanma', 'Rahat süspansiyon', 'Kaliteli kabin'],
    cons: ['Otoyolda tüketim artıyor', 'e-POWER fiyatı çok yükseldi'],
    summary: 'e-POWER sistemiyle şehirde çok keyifli; mild hybrid versiyonu ise daha mantıklı bir fiyat sunuyor.',
  },
  {
    make: 'Chery', model: 'Tiggo 7', year: 2026, version: 'Prestige 4x2',
    category: 'aile-suv', bodyType: 'suv', price: 2580000,
    specs: { motor: '1.6L turbo benzin, 7DCT', hizlanma: '—', tuketim: '7,5 L/100 km', bagaj: '500 L' },
    ratings: { surus: 7.0, guvenlik: 8.2, konfor: 7.9, tuketim: 7.2, malzeme: 7.6, tasarim: 7.8, fiyat: 8.6, teknoloji: 8.4 },
    pros: ['Fiyatına göre çok zengin donanım', 'Geniş kabin', '4x4 seçeneği'],
    cons: ['Sürüş dinamikleri Avrupalı rakiplerin gerisinde', 'Uzun vadeli ikinci el değeri belirsiz'],
    summary: 'Az paraya çok donanım isteyenler için güçlü bir alternatif; marka güveni zamanla oturacak.',
  },
  {
    make: 'Skoda', model: 'Kodiaq', year: 2026, version: '1.5 TSI mHEV 150 Prestige DSG',
    category: 'aile-suv', bodyType: 'suv', price: 4749900,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '9,7 sn', tuketim: '6,1 L/100 km', bagaj: '845 L (5 koltuk)' },
    ratings: { surus: 8.1, guvenlik: 8.9, konfor: 8.8, tuketim: 7.8, malzeme: 8.3, tasarim: 7.9, fiyat: 7.0, teknoloji: 8.5 },
    pros: ['Dev bagaj ve 7 koltuk seçeneği', 'Çok konforlu, sessiz sürüş', 'Pratik detaylar'],
    cons: ['Motor dolu araçta zorlanabiliyor', 'Büyük boyutlar şehirde zorlayıcı'],
    summary: 'Kalabalık aileler için sınıfının en mantıklı seçeneği; alan ve konforda neredeyse rakipsiz.',
  },
  {
    make: 'Renault', model: 'Austral', year: 2026, version: 'Mild Hybrid 160 Techno Otomatik',
    category: 'aile-suv', bodyType: 'suv', price: 2875000,
    specs: { motor: '1.3L turbo hafif hibrit, 160 bg', hizlanma: '9,6 sn', tuketim: '6,3 L/100 km', bagaj: '500 L' },
    ratings: { surus: 8.0, guvenlik: 8.6, konfor: 8.2, tuketim: 7.9, malzeme: 8.0, tasarim: 8.0, fiyat: 8.2, teknoloji: 8.6 },
    pros: ['OpenR ekran ve Google hizmetleri', 'Kaliteli kabin', 'Rakiplerine göre uygun fiyat'],
    cons: ['Arka koltuk başüstü sınırlı', 'Tam hibrit seçeneği şu an listede yok'],
    summary: 'Teknoloji ve kabin kalitesinde iddialı, fiyatıyla da dikkat çeken çevik bir aile SUV’u.',
  },
  {
    make: 'Cupra', model: 'Formentor', year: 2026, version: '1.5 eTSI 150 VZ-Line DSG',
    category: 'aile-suv', bodyType: 'suv', price: 3775000,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '8,9 sn', tuketim: '5,9 L/100 km', bagaj: '450 L' },
    ratings: { surus: 8.9, guvenlik: 8.6, konfor: 7.6, tuketim: 7.9, malzeme: 7.9, tasarim: 9.1, fiyat: 7.0, teknoloji: 8.2 },
    pros: ['Sınıfının en sportif sürüşü', 'Göz alıcı tasarım', 'Alçak, otomobil gibi oturma'],
    cons: ['Sert süspansiyon', 'Aile için bagaj ve arka alan ortalama'],
    summary: 'SUV olmaktan çok yükseltilmiş bir hot-hatch; aile ihtiyacından çok sürüş keyfi arayanlar için.',
  },

  // =========================================================================
  // PREMIUM SUV
  // =========================================================================
  {
    make: 'BMW', model: 'X1', year: 2026, version: 'sDrive20i M Sport',
    category: 'premium-suv', bodyType: 'suv', price: 5854800,
    specs: { motor: '1.5L turbo hafif hibrit, 170 bg', hizlanma: '8,4 sn', tuketim: '6,4 L/100 km', bagaj: '540 L' },
    ratings: { surus: 8.6, guvenlik: 9.0, konfor: 8.4, tuketim: 7.9, malzeme: 8.6, tasarim: 8.3, fiyat: 6.9, teknoloji: 8.9 },
    pros: ['Pratik ve geniş kabin', 'Keskin direksiyon', 'Kavisli ekran'],
    cons: ['Fiziksel tuş neredeyse yok', 'M Sport süspansiyon sert'],
    summary: 'Premium SUV dünyasına mantıklı giriş kapılarından; hem pratik hem sürüşte BMW karakteri taşıyor.',
  },
  {
    make: 'Mercedes-Benz', model: 'GLA', year: 2026, version: 'GLA 200 AMG',
    category: 'premium-suv', bodyType: 'suv', price: 4760000,
    specs: { motor: '1.3L turbo hafif hibrit, 163 bg', hizlanma: '8,7 sn', tuketim: '6,3 L/100 km', bagaj: '435 L' },
    ratings: { surus: 7.9, guvenlik: 8.9, konfor: 8.1, tuketim: 7.9, malzeme: 8.4, tasarim: 8.2, fiyat: 7.4, teknoloji: 8.5 },
    pros: ['Premium SUV’ların en ulaşılabilirlerinden', 'Şık kabin atmosferi', 'Mercedes prestiji'],
    cons: ['Rakiplerine göre küçük bagaj', 'Model yaşını hissettiriyor'],
    summary: 'Mercedes kabin deneyimini kompakt boyutlarda ve X1’den bir milyon TL daha uygun fiyatla sunuyor.',
  },
  {
    make: 'Audi', model: 'Q3', year: 2026, version: 'TFSI 150 S tronic',
    category: 'premium-suv', bodyType: 'suv', price: 5311292,
    specs: { motor: '1.5L turbo, 150 bg (110 kW)', hizlanma: '9,3 sn', tuketim: '6,5 L/100 km', bagaj: '488 L' },
    ratings: { surus: 8.2, guvenlik: 8.8, konfor: 8.4, tuketim: 7.8, malzeme: 8.6, tasarim: 8.5, fiyat: 7.0, teknoloji: 8.7 },
    pros: ['Yeni nesilde yenilenen teknoloji', 'Kaliteli, sessiz kabin', 'Kayar arka koltuk'],
    cons: ['Opsiyonlar pahalı', 'Giriş motoru sınırlı'],
    summary: 'Yeni neslinde teknoloji ve kalite çıtasını yükselten, dengeli bir premium kompakt SUV.',
  },
  {
    make: 'BMW', model: 'X3', year: 2026, version: 'X3 20 M Sport',
    category: 'premium-suv', bodyType: 'suv', price: 7635700,
    specs: { motor: '1.6L turbo hafif hibrit, 190 bg (Türkiye’ye özel)', hizlanma: '8,4 sn', tuketim: '7,4–8,2 L/100 km', bagaj: '570 L' },
    ratings: { surus: 8.7, guvenlik: 9.2, konfor: 8.7, tuketim: 7.3, malzeme: 8.8, tasarim: 8.0, fiyat: 6.5, teknoloji: 9.0 },
    pros: ['Sınıfının en iyi sürüşü', 'Geniş ve kaliteli kabin', 'Harman Kardon ve zengin donanım'],
    cons: ['Tasarımı tartışmalı', 'Türkiye versiyonunda dört çeker yok'],
    summary: 'Türkiye’ye özel 1.6 motoruyla orta boy premium SUV’da sürüş keyfinin referansı olmaya devam ediyor.',
  },
  {
    make: 'Mercedes-Benz', model: 'GLC', year: 2026, version: 'GLC 180 AMG',
    category: 'premium-suv', bodyType: 'suv', price: 7169000,
    specs: { motor: '1.5L turbo hafif hibrit, 170 bg', hizlanma: '8,9 sn', tuketim: '7,3 L/100 km', bagaj: '620 L' },
    ratings: { surus: 8.2, guvenlik: 9.4, konfor: 9.1, tuketim: 7.5, malzeme: 9.0, tasarim: 8.7, fiyat: 6.6, teknoloji: 9.2 },
    pros: ['Sınıfının en konforlu sürüşü', 'Lüks kabin', 'Geniş bagaj'],
    cons: ['170 bg büyük gövdede zorlanıyor', 'Dokunmatik kontroller'],
    summary: 'Konfor ve lüks hissinde sınıfın lideri; Türkiye’ye uygun 1.5 motor performanstan çok verimlilik için seçilmiş.',
  },
  {
    make: 'Volvo', model: 'XC60', year: 2026, version: 'B5 AWD Mild Hybrid Plus',
    category: 'premium-suv', bodyType: 'suv', price: 7292014,
    specs: { motor: '2.0L turbo hafif hibrit, 250 bg, AWD', hizlanma: '6,9 sn', tuketim: '7,6 L/100 km', bagaj: '483 L' },
    ratings: { surus: 8.0, guvenlik: 9.5, konfor: 8.9, tuketim: 7.2, malzeme: 8.9, tasarim: 8.8, fiyat: 6.7, teknoloji: 8.6 },
    pros: ['Sınıfının en güvenli otomobillerinden', 'Güçlü motor ve dört çeker', 'Çok rahat koltuklar'],
    cons: ['Tüketim yüksek', '2.0 motor nedeniyle yüksek ÖTV'],
    summary: 'Rakipleri 1.6 altına inerken güçlü 2.0 motoru ve dört çekeriyle kalan, güvenlik ve huzur arayanlar için bir SUV.',
  },
  {
    make: 'Lexus', model: 'NX', year: 2026, version: '350h 4x4 Executive',
    category: 'premium-suv', bodyType: 'suv', price: 7000000, priceEstimate: true,
    specs: { motor: '2.5L tam hibrit, 244 bg, 4x4', hizlanma: '7,7 sn', tuketim: '5,8 L/100 km', bagaj: '520 L' },
    ratings: { surus: 7.8, guvenlik: 9.1, konfor: 8.7, tuketim: 8.8, malzeme: 9.0, tasarim: 8.5, fiyat: 6.6, teknoloji: 8.4 },
    pros: ['Premium sınıfta en düşük tüketimlerden', 'Kusursuz işçilik', 'Yüksek güvenilirlik'],
    cons: ['Sürüş keyfi sınırlı', 'e-CVT hızlanmada gürültülü'],
    summary: 'Alman rakiplere sessiz, verimli ve bakımı kolay bir alternatif; işçilikte hiçbirinden geri değil.',
  },

  // =========================================================================
  // ELEKTRİKLİ
  // =========================================================================
  {
    make: 'Togg', model: 'T10X', year: 2026, version: 'V2 RWD Uzun Menzil',
    category: 'elektrikli', bodyType: 'suv', price: 2411000,
    specs: { motor: '218 bg, 88,5 kWh batarya, ~523 km WLTP', hizlanma: '7,4 sn', tuketim: '17,8 kWh/100 km', bagaj: '441 L' },
    ratings: { surus: 7.8, guvenlik: 8.9, konfor: 8.2, tuketim: 7.6, malzeme: 7.8, tasarim: 8.5, fiyat: 8.6, teknoloji: 8.8 },
    pros: ['Fiyatına göre uzun menzil', 'Geniş ekranlı teknoloji odaklı kabin', 'Yaygın yerli servis ağı'],
    cons: ['Hızlı şarj gücü rakiplerin gerisinde', 'Bazı yazılım özellikleri hâlâ olgunlaşıyor'],
    summary: 'Türkiye’nin en çok satan elektriklilerinden; menzil, donanım ve fiyat dengesi çok güçlü.',
  },
  {
    make: 'Togg', model: 'T10F', year: 2026, version: 'V2 RWD Uzun Menzil',
    category: 'elektrikli', bodyType: 'sedan', price: 2370930,
    specs: { motor: '218 bg, 88,5 kWh batarya, ~600 km WLTP', hizlanma: '7,0 sn', tuketim: '15,5 kWh/100 km', bagaj: '470 L' },
    ratings: { surus: 8.0, guvenlik: 8.8, konfor: 8.3, tuketim: 8.3, malzeme: 7.9, tasarim: 8.4, fiyat: 8.6, teknoloji: 8.9 },
    pros: ['Aerodinamik gövdeyle uzun menzil', 'Zengin standart donanım', 'Yaygın yerli servis'],
    cons: ['Yazılım güncellemelerine bağımlı özellikler', 'Arka başüstü sınırlı'],
    summary: 'T10X’in teknolojisini daha verimli bir sedan gövdeyle sunan, menzil odaklı yerli seçenek.',
  },
  {
    make: 'Tesla', model: 'Model Y', year: 2026, version: 'Long Range Arkadan İtiş',
    category: 'elektrikli', bodyType: 'suv', price: 3682800,
    specs: { motor: 'Tek motor, ~620 km WLTP', hizlanma: '5,6 sn', tuketim: '15,0 kWh/100 km', bagaj: '854 L (ön+arka)' },
    ratings: { surus: 8.2, guvenlik: 9.2, konfor: 8.2, tuketim: 9.2, malzeme: 7.9, tasarim: 8.2, fiyat: 7.6, teknoloji: 9.4 },
    pros: ['Sınıfının en iyi verimliliği', 'Supercharger ağı', 'Dev bagaj hacmi'],
    cons: ['Neredeyse tüm kontroller ekranda', 'Standart Range’e göre ciddi fiyat farkı'],
    summary: 'Verimlilik, şarj altyapısı ve yazılımda hâlâ ölçü birimi; bütçe öncelikliyse Standart Range versiyonu çok daha ucuz.',
  },
  {
    make: 'Peugeot', model: 'e-208', year: 2026, version: 'GT 100 kW',
    category: 'elektrikli', bodyType: 'fastback', price: 2080000,
    specs: { motor: '136 bg, ~51 kWh, ~400 km WLTP', hizlanma: '8,3 sn', tuketim: '15,5 kWh/100 km', bagaj: '309 L' },
    ratings: { surus: 8.0, guvenlik: 7.4, konfor: 7.8, tuketim: 8.3, malzeme: 7.8, tasarim: 9.0, fiyat: 8.2, teknoloji: 8.0 },
    pros: ['Sınıfının en şık tasarımlarından', 'Çevik şehir sürüşü', 'Şehir için yeterli menzil'],
    cons: ['Arka yaşam alanı sınırlı', 'Hızlı şarj gücü ortalama'],
    summary: 'Türkiye’de 208 ailesinin öne çıkan versiyonu; şehirde şık ve keyifli bir elektrikli.',
  },
  {
    make: 'Renault', model: '5 E-Tech', year: 2026, version: 'Techno EV52 150 bg',
    category: 'elektrikli', bodyType: 'fastback', price: 2099000,
    specs: { motor: '150 bg, 52 kWh, ~410 km WLTP', hizlanma: '7,9 sn', tuketim: '15,0 kWh/100 km', bagaj: '326 L' },
    ratings: { surus: 8.4, guvenlik: 8.0, konfor: 7.8, tuketim: 8.6, malzeme: 7.6, tasarim: 9.4, fiyat: 8.3, teknoloji: 8.5 },
    pros: ['Retro ve karakterli tasarım', 'Eğlenceli, çevik sürüş', 'Google tabanlı multimedya'],
    cons: ['Arka koltuk dar', 'Bagaj küçük'],
    summary: 'Tasarımıyla göz dolduran, şehirde sürmesi çok keyifli ve fiyatı makul bir elektrikli hatchback.',
  },
  {
    make: 'BYD', model: 'Seal', year: 2026, version: 'Excellence AWD',
    category: 'elektrikli', bodyType: 'sedan', price: 4077000,
    specs: { motor: '530 bg çift motor, 82,5 kWh, ~520 km WLTP', hizlanma: '3,8 sn', tuketim: '17,0 kWh/100 km', bagaj: '400 L + 53 L ön' },
    ratings: { surus: 8.4, guvenlik: 9.0, konfor: 8.4, tuketim: 8.0, malzeme: 8.2, tasarim: 8.6, fiyat: 7.2, teknoloji: 8.6 },
    pros: ['Süper otomobil hızlanması', 'Kaliteli kabin', 'Dört çeker'],
    cons: ['Yüksek güç nedeniyle yüksek ÖTV dilimi', 'Yazılım arayüzü karmaşık'],
    summary: 'Performans ve kalitede iddialı bir elektrikli sedan; Türkiye’de yalnızca güçlü versiyonuyla satılıyor.',
  },
  {
    make: 'BYD', model: 'Sealion 7', year: 2026, version: 'Excellence AWD',
    category: 'elektrikli', bodyType: 'suv', price: 4190000,
    specs: { motor: '530 bg çift motor, 82,5 kWh, ~500 km WLTP', hizlanma: '4,5 sn', tuketim: '20,0 kWh/100 km', bagaj: '520 L' },
    ratings: { surus: 8.2, guvenlik: 9.0, konfor: 8.4, tuketim: 7.4, malzeme: 8.2, tasarim: 8.4, fiyat: 7.0, teknoloji: 8.6 },
    pros: ['Çok güçlü çift motor', 'Geniş kabin', 'Zengin standart donanım'],
    cons: ['Tüketim yüksek', 'Fiyatı Model Y’nin üzerinde'],
    summary: 'Güçlü ve donanımlı bir elektrikli SUV; verimlilikte Tesla’nın gerisinde kalıyor.',
  },
  {
    make: 'Volkswagen', model: 'ID.4', year: 2026, version: '125 kW 170 PS',
    category: 'elektrikli', bodyType: 'suv', price: 3126000,
    specs: { motor: '170 bg, ~52 kWh, ~360 km WLTP', hizlanma: '9,0 sn', tuketim: '16,5 kWh/100 km', bagaj: '543 L' },
    ratings: { surus: 7.6, guvenlik: 9.0, konfor: 8.6, tuketim: 8.0, malzeme: 7.6, tasarim: 7.6, fiyat: 6.8, teknoloji: 8.0 },
    pros: ['Konforlu, sessiz sürüş', 'Geniş kabin ve bagaj', 'Olgun yol davranışı'],
    cons: ['Fiyatına göre kısa menzil', 'Dokunmatik tuşlar'],
    summary: 'Aileler için rahat bir elektrikli SUV; ancak bu fiyata rakipleri çok daha uzun menzil sunuyor.',
  },
  {
    make: 'Hyundai', model: 'Ioniq 5', year: 2026, version: '160 kW Advance',
    category: 'elektrikli', bodyType: 'suv', price: 3490000,
    specs: { motor: '229 bg, 84 kWh, ~570 km WLTP', hizlanma: '7,5 sn', tuketim: '17,0 kWh/100 km', bagaj: '520 L' },
    ratings: { surus: 8.0, guvenlik: 9.1, konfor: 8.8, tuketim: 8.3, malzeme: 8.2, tasarim: 9.3, fiyat: 7.4, teknoloji: 9.0 },
    pros: ['800V altyapıyla çok hızlı şarj', 'İkonik retro-fütüristik tasarım', 'Lounge gibi geniş kabin'],
    cons: ['Arka görüş sınırlı', 'Fiyatı yüksek'],
    summary: 'Şarj hızı ve kabin ferahlığıyla elektrikli dünyanın en iyi aile otomobillerinden.',
  },
  {
    make: 'Kia', model: 'EV6', year: 2026, version: 'Elegance Standart Menzil 125 kW',
    category: 'elektrikli', bodyType: 'fastback', price: 3790000,
    specs: { motor: '170 bg, ~63 kWh, ~390 km WLTP', hizlanma: '8,5 sn', tuketim: '16,5 kWh/100 km', bagaj: '480 L' },
    ratings: { surus: 8.4, guvenlik: 9.0, konfor: 8.3, tuketim: 8.3, malzeme: 8.2, tasarim: 9.0, fiyat: 6.6, teknoloji: 8.9 },
    pros: ['800V hızlı şarj', 'Sportif ve çevik sürüş', 'Etkileyici tasarım'],
    cons: ['Standart menzilde fiyatına göre kısa menzil', 'Arka görüş sınırlı'],
    summary: 'Sürücü odaklı karakteri ve tasarımıyla etkileyici; Türkiye’deki standart menzil versiyonunun fiyatı ise zorlayıcı.',
  },
  {
    make: 'Volvo', model: 'EX30', year: 2026, version: 'Ultra P4 Long Range',
    category: 'elektrikli', bodyType: 'suv', price: 2485390,
    specs: { motor: '204 bg, ~64 kWh, ~470 km WLTP', hizlanma: '7,4 sn', tuketim: '16,9 kWh/100 km', bagaj: '318 L' },
    ratings: { surus: 8.0, guvenlik: 9.0, konfor: 7.6, tuketim: 8.2, malzeme: 8.2, tasarim: 9.0, fiyat: 8.4, teknoloji: 8.3 },
    pros: ['Premium markada ulaşılabilir fiyat', 'Üst donanım standart', 'Şık ve sürdürülebilir kabin malzemeleri'],
    cons: ['Küçük bagaj ve arka koltuk', 'Tüm kontroller tek ekranda'],
    summary: 'Premium elektrikliye en uygun giriş; şehirde yaşayan çiftler için stilli bir seçenek.',
  },
  {
    make: 'Kia', model: 'EV3', year: 2026, version: 'Elegance Long Range 150 kW',
    category: 'elektrikli', bodyType: 'suv', price: 2485000,
    specs: { motor: '204 bg, 81,4 kWh, ~600 km WLTP', hizlanma: '7,9 sn', tuketim: '15,5 kWh/100 km', bagaj: '460 L' },
    ratings: { surus: 7.8, guvenlik: 8.9, konfor: 8.2, tuketim: 8.8, malzeme: 7.9, tasarim: 8.6, fiyat: 8.8, teknoloji: 8.7 },
    pros: ['Kompakt boyutlarda çok uzun menzil', 'Fiyatına göre güçlü paket', 'Geniş bagaj'],
    cons: ['Şarj hızı 800V kardeşlerinin gerisinde', 'GT-Line donanımda fiyat çok artıyor'],
    summary: 'Kompakt elektrikli SUV sınıfında menzil ve fiyat dengesinde çıtayı yükselten, çok güçlü bir paket.',
  },
  {
    make: 'Skoda', model: 'Elroq', year: 2026, version: '60 e-Prestige 204 PS',
    category: 'elektrikli', bodyType: 'suv', price: 3314900,
    specs: { motor: '204 bg, ~59 kWh, ~400 km WLTP', hizlanma: '8,0 sn', tuketim: '16,0 kWh/100 km', bagaj: '470 L' },
    ratings: { surus: 7.9, guvenlik: 9.0, konfor: 8.4, tuketim: 8.3, malzeme: 7.9, tasarim: 8.2, fiyat: 7.2, teknoloji: 8.4 },
    pros: ['Pratik ve geniş kabin', 'Olgun sürüş', 'Fiziksel tuşları koruyan kullanışlı arayüz'],
    cons: ['Fiyatına göre menzil ortalama', 'Hızlı şarj rakiplerin gerisinde'],
    summary: 'Skoda pratikliğini elektrikli kompakt SUV’a taşıyan mantıklı bir aile otomobili.',
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

const rankMap = new Map();
for (const cat of CATEGORIES) {
  withScores
    .filter((c) => c.category === cat.slug)
    .sort((a, b) => b.score - a.score)
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
