import { overallScore, slugify } from '../lib/scoring.js';

// ---------------------------------------------------------------------------
// KATEGORİLER
// Yeni kategori eklemek için bu listeye bir blok ekleyin.
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
    intro: 'Sürüş keyfi, kabin kalitesi ve pratikliği bir arada arayanlar için Avrupa’nın en rekabetçi sınıfı.',
  },
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
    slug: 'kucuk-suv',
    title: 'En İyi Küçük SUV’lar',
    short: 'Küçük SUV',
    intro: 'Hatchback boyutlarında, daha yüksek oturma pozisyonu sunan B-SUV’lar. Pazarın en hızlı büyüyen sınıfı.',
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
// ARAÇLAR
// - ratings: 8 başlığın her biri 0–10 arası, küsuratlı olabilir (ör. 8.7)
// - Genel puan ve sıralama OTOMATİK hesaplanır.
// - bodyType: 'sedan' | 'suv' | 'fastback'  (fotoğraf yoksa silüet için;
//   hatchbackler için 'fastback' kullanıldı)
// - image: isteğe bağlı, ör. '/cars/toyota-corolla-hybrid.png'
// - price: TAHMİNİ liste fiyatıdır (TL). Distribütör fiyat listelerinden
//   güncellemeniz önerilir.
// - specs değerleri üretici verilerine dayanan yaklaşık değerlerdir.
// ---------------------------------------------------------------------------
const RAW_CARS = [
  // =========================================================================
  // ŞEHİR HATCHBACK
  // =========================================================================
  {
    make: 'Renault', model: 'Clio', year: 2026, version: '1.0 TCe 90 Evolution',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1450000,
    specs: { motor: '1.0L turbo, 90 bg', hizlanma: '12,2 sn', tuketim: '5,4 L/100 km', bagaj: '391 L' },
    ratings: { surus: 7.6, guvenlik: 7.8, konfor: 7.5, tuketim: 8.4, malzeme: 7.3, tasarim: 8.2, fiyat: 8.6, teknoloji: 7.6 },
    pros: ['Sınıfının en geniş bagajlarından biri', 'Olgun ve dengeli yol tutuş', 'Geniş servis ağı ve kolay ikinci el'],
    cons: ['Arka koltuk diz mesafesi dar', 'Alt donanımlarda sert plastikler'],
    summary: 'Türkiye’de üretilen, fiyatı, bagajı ve sürüş dengesiyle şehir otomobili sınıfının en mantıklı tercihlerinden biri.',
  },
  {
    make: 'Toyota', model: 'Yaris Hybrid', year: 2026, version: '1.5 Hybrid 130 Dream',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1750000,
    specs: { motor: '1.5L tam hibrit, 130 bg', hizlanma: '9,7 sn', tuketim: '3,9 L/100 km', bagaj: '286 L' },
    ratings: { surus: 7.7, guvenlik: 9.0, konfor: 7.2, tuketim: 9.8, malzeme: 7.2, tasarim: 7.8, fiyat: 7.6, teknoloji: 7.6 },
    pros: ['Şehir içinde rakipsiz yakıt tüketimi', 'Güçlü standart güvenlik paketi', 'Toyota hibrit dayanıklılığı'],
    cons: ['Küçük bagaj ve dar arka koltuk', 'Rakiplerine göre yüksek fiyat'],
    summary: 'Şehirde neredeyse elektrikli kadar ekonomik; alan ister misin, tüketim mi sorusunda tüketimi seçenlerin otomobili.',
  },
  {
    make: 'Hyundai', model: 'i20', year: 2026, version: '1.0 T-GDI 100 Elite DCT',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1480000,
    specs: { motor: '1.0L turbo, 100 bg', hizlanma: '11,7 sn', tuketim: '5,3 L/100 km', bagaj: '352 L' },
    ratings: { surus: 7.4, guvenlik: 7.6, konfor: 7.6, tuketim: 8.3, malzeme: 7.2, tasarim: 8.0, fiyat: 8.4, teknoloji: 8.0 },
    pros: ['İzmit’te üretim, iyi fiyat/donanım dengesi', 'Geniş iç hacim', 'Dijital gösterge ve zengin donanım'],
    cons: ['Direksiyon hissi zayıf', 'Kabin malzemeleri sade'],
    summary: 'Yerli üretimin fiyat avantajını geniş kabin ve bol donanımla birleştiren, dengeli bir şehir otomobili.',
  },
  {
    make: 'Peugeot', model: '208', year: 2026, version: '1.2 PureTech 100 Allure EAT8',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1600000,
    specs: { motor: '1.2L turbo, 100 bg', hizlanma: '10,8 sn', tuketim: '5,6 L/100 km', bagaj: '311 L' },
    ratings: { surus: 8.0, guvenlik: 7.4, konfor: 7.8, tuketim: 8.0, malzeme: 7.8, tasarim: 9.0, fiyat: 7.4, teknoloji: 8.0 },
    pros: ['Sınıfının en şık tasarımlarından biri', 'Çevik ve eğlenceli sürüş', '3D i-Cockpit gösterge'],
    cons: ['Küçük direksiyon bazı sürücülerde göstergeyi kapatıyor', 'Arka yaşam alanı sınırlı'],
    summary: 'Tasarımı ve sürüş keyfiyle öne çıkan, kendini premium hissettiren bir şehir otomobili.',
  },
  {
    make: 'Volkswagen', model: 'Polo', year: 2026, version: '1.0 TSI 95 Life DSG',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1700000,
    specs: { motor: '1.0L turbo, 95 bg', hizlanma: '10,8 sn', tuketim: '5,2 L/100 km', bagaj: '351 L' },
    ratings: { surus: 7.9, guvenlik: 8.0, konfor: 8.0, tuketim: 8.3, malzeme: 7.8, tasarim: 7.4, fiyat: 7.2, teknoloji: 7.8 },
    pros: ['Sınıfının üstünde yol konforu', 'Olgun, sessiz kabin', 'Yüksek ikinci el değeri'],
    cons: ['Fiyatı rakiplerden belirgin yüksek', 'Dokunmatik tuşlar kullanışsız'],
    summary: 'Bir üst sınıfın olgunluğunu şehir otomobiline taşıyan model; bedeli ise fiyat etiketine yansıyor.',
  },
  {
    make: 'Opel', model: 'Corsa', year: 2026, version: '1.2 Turbo 100 GS AT8',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1550000,
    specs: { motor: '1.2L turbo, 100 bg', hizlanma: '10,5 sn', tuketim: '5,5 L/100 km', bagaj: '309 L' },
    ratings: { surus: 7.8, guvenlik: 7.4, konfor: 7.6, tuketim: 8.1, malzeme: 7.3, tasarim: 7.8, fiyat: 7.7, teknoloji: 7.6 },
    pros: ['Klasik ve kullanışlı gösterge düzeni', 'Canlı motor ve iyi şanzıman', 'Rahat ön koltuklar'],
    cons: ['Arka koltuk ve bagaj ortalama', 'Kabinde sert plastikler'],
    summary: '208 ile aynı altyapıyı daha sade ve kolay alışılır bir kabinle sunan, dengeli bir seçenek.',
  },
  {
    make: 'Skoda', model: 'Fabia', year: 2026, version: '1.0 TSI 95 Premium',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1500000,
    specs: { motor: '1.0L turbo, 95 bg', hizlanma: '10,6 sn', tuketim: '5,1 L/100 km', bagaj: '380 L' },
    ratings: { surus: 7.6, guvenlik: 8.0, konfor: 7.9, tuketim: 8.4, malzeme: 7.4, tasarim: 7.2, fiyat: 8.2, teknoloji: 7.4 },
    pros: ['Sınıfının en geniş kabinlerinden biri', '380 litrelik bagaj', 'Akıllı pratik çözümler'],
    cons: ['Tasarımı sönük', 'Otomatik şanzıman seçeneği pahalı'],
    summary: 'Polo’nun altyapısını daha fazla alan ve daha iyi fiyatla sunan, akılla seçilecek şehir otomobili.',
  },
  {
    make: 'Dacia', model: 'Sandero', year: 2026, version: '1.0 TCe 90 Expression',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1150000,
    specs: { motor: '1.0L turbo, 90 bg', hizlanma: '12,2 sn', tuketim: '5,4 L/100 km', bagaj: '328 L' },
    ratings: { surus: 6.9, guvenlik: 6.0, konfor: 7.2, tuketim: 8.2, malzeme: 6.0, tasarim: 7.0, fiyat: 9.4, teknoloji: 6.6 },
    pros: ['Piyasanın en uygun fiyatlı sıfır otomobillerinden', 'Geniş kabin', 'Basit ve ucuz bakım'],
    cons: ['Euro NCAP’te düşük yıldız', 'Ucuz kabin malzemeleri'],
    summary: 'Az parayla çok otomobil. Beklentisi temel ihtiyaçlar olanlar için fiyatına göre rakipsiz.',
  },
  {
    make: 'Fiat', model: 'Egea Hatchback', year: 2026, version: '1.4 Fire 95 Easy',
    category: 'sehir-hatchback', bodyType: 'fastback', price: 1150000,
    specs: { motor: '1.4L atmosferik, 95 bg', hizlanma: '12,3 sn', tuketim: '6,4 L/100 km', bagaj: '440 L' },
    ratings: { surus: 6.6, guvenlik: 6.2, konfor: 7.0, tuketim: 7.0, malzeme: 6.2, tasarim: 6.6, fiyat: 8.8, teknoloji: 6.4 },
    pros: ['Yerli üretim, uygun fiyat', 'Geniş bagaj', 'Parça ve servis çok kolay'],
    cons: ['Eskimiş platform ve teknoloji', 'Düşük Euro NCAP puanı'],
    summary: 'Artık yaşını belli etse de fiyatı, geniş bagajı ve kolay servisiyle hâlâ çok satan bir hatchback.',
  },

  // =========================================================================
  // KOMPAKT HATCHBACK
  // =========================================================================
  {
    make: 'Volkswagen', model: 'Golf', year: 2026, version: '1.5 eTSI 150 Style DSG',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2600000,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '8,5 sn', tuketim: '5,4 L/100 km', bagaj: '381 L' },
    ratings: { surus: 8.7, guvenlik: 8.8, konfor: 8.6, tuketim: 8.2, malzeme: 8.0, tasarim: 7.8, fiyat: 7.0, teknoloji: 8.3 },
    pros: ['Sınıfının referans sürüş dengesi', 'Güçlü ve verimli motor', 'Makyajla gelen fiziksel tuşlar ve daha iyi ekran'],
    cons: ['Fiyatı yüksek', 'Bagaj rakiplerin gerisinde'],
    summary: 'Kompakt sınıfın ölçü birimi olmaya devam ediyor; her konuda iyi, hiçbir konuda zayıf değil.',
  },
  {
    make: 'Peugeot', model: '308', year: 2026, version: '1.2 Hybrid 145 GT e-DCS6',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2450000,
    specs: { motor: '1.2L turbo hafif hibrit, 145 bg', hizlanma: '8,8 sn', tuketim: '5,1 L/100 km', bagaj: '412 L' },
    ratings: { surus: 8.2, guvenlik: 8.0, konfor: 8.0, tuketim: 8.5, malzeme: 8.3, tasarim: 9.0, fiyat: 7.2, teknoloji: 8.3 },
    pros: ['Sınıfın en etkileyici iç ve dış tasarımı', 'Kaliteli kabin', 'Hafif hibritle düşük tüketim'],
    cons: ['i-Cockpit düzeni herkese uymuyor', 'Arka koltuk başüstü dar'],
    summary: 'Tasarım ve kabin kalitesiyle Golf’e en güçlü meydan okuma; şıklığa önem verenlerin favorisi.',
  },
  {
    make: 'Opel', model: 'Astra', year: 2026, version: '1.2 Turbo 130 GS AT8',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2300000,
    specs: { motor: '1.2L turbo, 130 bg', hizlanma: '9,7 sn', tuketim: '5,6 L/100 km', bagaj: '422 L' },
    ratings: { surus: 8.0, guvenlik: 7.8, konfor: 8.1, tuketim: 8.0, malzeme: 7.8, tasarim: 8.4, fiyat: 7.6, teknoloji: 8.0 },
    pros: ['AGR sertifikalı çok rahat koltuklar', 'Fiziksel tuşları koruyan net kabin', 'Geniş bagaj'],
    cons: ['Arka görüş sınırlı', 'Süspansiyon kötü yolda sertleşebiliyor'],
    summary: '308’in altyapısını daha sade ve kullanışlı bir kabinle birleştiren, mantıklı bir kompakt.',
  },
  {
    make: 'Seat', model: 'Leon', year: 2026, version: '1.5 eTSI 150 FR DSG',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2350000,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '8,4 sn', tuketim: '5,4 L/100 km', bagaj: '380 L' },
    ratings: { surus: 8.6, guvenlik: 8.6, konfor: 7.9, tuketim: 8.2, malzeme: 7.6, tasarim: 8.2, fiyat: 7.8, teknoloji: 8.0 },
    pros: ['Golf altyapısı daha sportif ayarla', 'Daha uygun fiyat', 'Keskin direksiyon'],
    cons: ['FR süspansiyonu sert', 'Malzemeler Golf’ün gerisinde'],
    summary: 'Golf’ün mekaniğini daha genç bir karakter ve daha iyi fiyatla sunan, sürüş odaklı kompakt.',
  },
  {
    make: 'Skoda', model: 'Scala', year: 2026, version: '1.0 TSI 115 Elite DSG',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 1950000,
    specs: { motor: '1.0L turbo, 115 bg', hizlanma: '9,8 sn', tuketim: '5,2 L/100 km', bagaj: '467 L' },
    ratings: { surus: 7.6, guvenlik: 8.4, konfor: 8.0, tuketim: 8.4, malzeme: 7.5, tasarim: 7.3, fiyat: 8.3, teknoloji: 7.7 },
    pros: ['467 litre ile dev bagaj', 'Geniş arka koltuk', 'Uygun fiyat'],
    cons: ['Sürüş karakteri sıradan', 'Tasarımı dikkat çekmiyor'],
    summary: 'Kompakt fiyatına neredeyse aile otomobili alanı sunan, sessiz ama çok mantıklı bir seçenek.',
  },
  {
    make: 'Honda', model: 'Civic e:HEV', year: 2026, version: '2.0 e:HEV 184 Executive',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2750000,
    specs: { motor: '2.0L tam hibrit, 184 bg', hizlanma: '7,8 sn', tuketim: '4,7 L/100 km', bagaj: '410 L' },
    ratings: { surus: 8.8, guvenlik: 8.4, konfor: 8.2, tuketim: 9.2, malzeme: 8.0, tasarim: 8.0, fiyat: 6.8, teknoloji: 7.6 },
    pros: ['Güçlü ve çok verimli hibrit sistem', 'Sınıfının en iyi şasilerinden biri', 'Sağlam işçilik'],
    cons: ['Tek donanım ve yüksek fiyat', 'Multimedya sistemi rakiplerin gerisinde'],
    summary: 'Hibrit verimliliğini gerçek bir sürücü şasisiyle birleştiren nadir otomobillerden; fiyatı ise cesaret istiyor.',
  },
  {
    make: 'Toyota', model: 'Corolla Hatchback', year: 2026, version: '1.8 Hybrid 140 Flame',
    category: 'kompakt-hatchback', bodyType: 'fastback', price: 2100000,
    specs: { motor: '1.8L tam hibrit, 140 bg', hizlanma: '9,2 sn', tuketim: '4,4 L/100 km', bagaj: '361 L' },
    ratings: { surus: 7.9, guvenlik: 8.8, konfor: 8.0, tuketim: 9.5, malzeme: 7.8, tasarim: 8.0, fiyat: 7.8, teknoloji: 7.6 },
    pros: ['Çok düşük tüketim', 'Yüksek güvenilirlik', 'Sessiz şehir içi sürüş'],
    cons: ['Küçük bagaj', 'Arka koltuk dar'],
    summary: 'Sedan kardeşinin verimliliğini daha kompakt ve biraz daha sportif bir gövdeyle sunuyor.',
  },

  // =========================================================================
  // KOMPAKT SEDAN
  // =========================================================================
  {
    make: 'Toyota', model: 'Corolla Hybrid', year: 2026, version: '1.8 Hybrid Dream e-CVT',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 1950000,
    specs: { motor: '1.8L tam hibrit, 140 bg', hizlanma: '9,3 sn', tuketim: '4,5 L/100 km', bagaj: '471 L' },
    ratings: { surus: 7.8, guvenlik: 9.0, konfor: 8.2, tuketim: 9.6, malzeme: 8.0, tasarim: 7.9, fiyat: 8.6, teknoloji: 7.5 },
    pros: ['Şehir içinde rakipsiz yakıt ekonomisi', 'Kanıtlanmış mekanik dayanıklılık', 'Standart Toyota Safety Sense'],
    cons: ['Ani gaz tepkilerinde yükselen motor sesi (e-CVT)', 'Sade multimedya arayüzü'],
    summary: 'Kompakt sedan sınıfının verimlilik lideri. Dayanıklılığı ve düşük işletme giderleriyle aileler için en güvenli tercihlerden biri.',
  },
  {
    make: 'Fiat', model: 'Egea Sedan', year: 2026, version: '1.5 Hybrid 130 Lounge DCT',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 1450000,
    specs: { motor: '1.5L turbo hafif hibrit, 130 bg', hizlanma: '10,2 sn', tuketim: '5,6 L/100 km', bagaj: '520 L' },
    ratings: { surus: 6.9, guvenlik: 6.2, konfor: 7.3, tuketim: 7.9, malzeme: 6.4, tasarim: 6.8, fiyat: 8.8, teknoloji: 6.9 },
    pros: ['520 litrelik dev bagaj', 'Yerli üretim, uygun fiyat', 'Hafif hibritle daha iyi tüketim'],
    cons: ['Eskimiş platform ve güvenlik', 'Sade kabin'],
    summary: 'Türkiye’nin en tanıdık sedanı; geniş bagaj ve ulaşılabilir fiyatla hâlâ en mantıklı giriş kapısı.',
  },
  {
    make: 'Renault', model: 'Taliant', year: 2026, version: '1.0 TCe 90 Touch X-Tronic',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 1350000,
    specs: { motor: '1.0L turbo, 90 bg', hizlanma: '12,5 sn', tuketim: '5,8 L/100 km', bagaj: '628 L' },
    ratings: { surus: 6.8, guvenlik: 6.0, konfor: 7.3, tuketim: 8.0, malzeme: 6.2, tasarim: 6.9, fiyat: 8.9, teknoloji: 6.8 },
    pros: ['628 litre ile sınıfının en büyük bagajı', 'Uygun fiyat', 'Geniş arka koltuk'],
    cons: ['Güvenlik donanımı ve NCAP sonucu zayıf', 'Ucuz malzemeler'],
    summary: 'Az bütçeyle en fazla alanı arayanlar için; kalite beklentisini düşük tutmak şartıyla.',
  },
  {
    make: 'Honda', model: 'Civic Sedan', year: 2026, version: '1.5 VTEC Turbo 182 Executive+',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 2450000,
    specs: { motor: '1.5L turbo, 182 bg', hizlanma: '8,2 sn', tuketim: '6,5 L/100 km', bagaj: '495 L' },
    ratings: { surus: 8.8, guvenlik: 8.5, konfor: 8.3, tuketim: 7.4, malzeme: 8.1, tasarim: 8.2, fiyat: 7.2, teknoloji: 7.8 },
    pros: ['Sınıfının en iyi sürüş keyfi', 'Güçlü motor', 'Yüksek güvenilirlik ve ikinci el değeri'],
    cons: ['Rakiplerine göre yüksek fiyat', 'Tüketim hibritlerin gerisinde'],
    summary: 'Sedan pratikliğini gerçek sürüş keyfiyle birleştiren, Türkiye’de yıllardır sevilen bir tercih.',
  },
  {
    make: 'Hyundai', model: 'Elantra', year: 2026, version: '1.6 MPI 123 Elite IVT',
    category: 'kompakt-sedan', bodyType: 'sedan', price: 1850000,
    specs: { motor: '1.6L atmosferik, 123 bg', hizlanma: '10,6 sn', tuketim: '6,6 L/100 km', bagaj: '474 L' },
    ratings: { surus: 7.3, guvenlik: 8.2, konfor: 8.0, tuketim: 7.3, malzeme: 7.5, tasarim: 8.3, fiyat: 8.0, teknoloji: 8.4 },
    pros: ['Cesur ve dikkat çekici tasarım', 'Çift ekranlı modern kokpit', 'Geniş arka koltuk'],
    cons: ['Motor performansı sınırlı', 'Yüksek hızda yol sesi'],
    summary: 'Teknolojisi ve tasarımıyla sınıfının üstünde görünen, konfor odaklı bir sedan.',
  },
  {
    make: 'Skoda', model: 'Octavia', year: 2026, version: '1.5 eTSI 150 Prestige DSG',
    category: 'kompakt-sedan', bodyType: 'fastback', price: 2500000,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '8,5 sn', tuketim: '5,3 L/100 km', bagaj: '600 L' },
    ratings: { surus: 8.3, guvenlik: 8.9, konfor: 8.6, tuketim: 8.3, malzeme: 8.0, tasarim: 7.8, fiyat: 7.9, teknoloji: 8.2 },
    pros: ['600 litrelik bagaj ve üst sınıf alan', 'Olgun sürüş ve konfor', 'Güçlü, verimli motor'],
    cons: ['Üst donanımlarda fiyat hızla artıyor', 'Tasarımı muhafazakâr'],
    summary: 'Kompakt fiyatına orta sınıf sedan alanı. Aileler için sınıfının en dengeli paketlerinden biri.',
  },
  {
    make: 'Citroën', model: 'C4 X', year: 2026, version: '1.2 Hybrid 136 Max e-DCS6',
    category: 'kompakt-sedan', bodyType: 'fastback', price: 1900000,
    specs: { motor: '1.2L turbo hafif hibrit, 136 bg', hizlanma: '9,5 sn', tuketim: '5,2 L/100 km', bagaj: '510 L' },
    ratings: { surus: 7.4, guvenlik: 7.4, konfor: 8.8, tuketim: 8.4, malzeme: 7.2, tasarim: 8.0, fiyat: 7.9, teknoloji: 7.5 },
    pros: ['Sınıfının en yumuşak süspansiyonu', 'Rahat Advanced Comfort koltuklar', 'Geniş bagaj'],
    cons: ['Yol tutuşu sportif değil', 'Arka görüş sınırlı'],
    summary: 'Konforu her şeyin önüne koyanlar için tasarlanmış, farklı görünümlü bir sedan-crossover karışımı.',
  },
  {
    make: 'Peugeot', model: '408', year: 2026, version: '1.2 Hybrid 145 GT e-DCS6',
    category: 'kompakt-sedan', bodyType: 'fastback', price: 2550000,
    specs: { motor: '1.2L turbo hafif hibrit, 145 bg', hizlanma: '9,1 sn', tuketim: '5,3 L/100 km', bagaj: '536 L' },
    ratings: { surus: 8.1, guvenlik: 8.0, konfor: 8.2, tuketim: 8.4, malzeme: 8.3, tasarim: 9.3, fiyat: 7.2, teknoloji: 8.2 },
    pros: ['Yolda en çok dikkat çeken tasarımlardan', 'Kaliteli kabin', 'Geniş bagaj'],
    cons: ['Fiyatı yüksek', 'Arka başüstü mesafesi sınırlı'],
    summary: 'Tasarımıyla sınıf kalıplarını kıran fastback; 308’in kalitesini daha fazla alanla sunuyor.',
  },

  // =========================================================================
  // PREMIUM SEDAN
  // =========================================================================
  {
    make: 'BMW', model: '3 Serisi', year: 2026, version: '320i M Sport',
    category: 'premium-sedan', bodyType: 'sedan', price: 4300000,
    specs: { motor: '2.0L turbo, 170 bg', hizlanma: '7,4 sn', tuketim: '6,4 L/100 km', bagaj: '480 L' },
    ratings: { surus: 9.5, guvenlik: 8.9, konfor: 8.4, tuketim: 7.7, malzeme: 8.8, tasarim: 8.5, fiyat: 7.2, teknoloji: 8.8 },
    pros: ['Sınıfının en iyi sürüş dinamikleri', 'Mükemmel şanzıman ve direksiyon', 'Kavisli ekran ve iDrive'],
    cons: ['M Sport süspansiyon kötü yolda sert', 'Opsiyonlar fiyatı hızla yükseltiyor'],
    summary: 'Sürücü odaklı premium sedanın hâlâ referansı. Direksiyon başında olmayı sevenler için ilk tercih.',
  },
  {
    make: 'Mercedes-Benz', model: 'C Serisi', year: 2026, version: 'C 200 AMG',
    category: 'premium-sedan', bodyType: 'sedan', price: 4600000,
    specs: { motor: '1.5L turbo hafif hibrit, 204 bg', hizlanma: '7,3 sn', tuketim: '6,6 L/100 km', bagaj: '455 L' },
    ratings: { surus: 8.4, guvenlik: 9.2, konfor: 8.8, tuketim: 7.6, malzeme: 8.9, tasarim: 9.0, fiyat: 6.9, teknoloji: 9.1 },
    pros: ['Mini S-Serisi etkisi yaratan kabin', 'Çok iyi yol konforu', 'Gelişmiş sürüş destek sistemleri'],
    cons: ['Dokunmatik direksiyon tuşları', 'Yüksek fiyat'],
    summary: 'Kabin atmosferi ve konforuyla sınıfının en lüks hissettireni; sürüşte BMW kadar keskin değil.',
  },
  {
    make: 'Audi', model: 'A5 Sedan', year: 2026, version: '2.0 TFSI 150 S line',
    category: 'premium-sedan', bodyType: 'fastback', price: 4400000,
    specs: { motor: '2.0L turbo, 150 bg', hizlanma: '9,0 sn', tuketim: '6,4 L/100 km', bagaj: '445 L' },
    ratings: { surus: 8.5, guvenlik: 8.9, konfor: 8.6, tuketim: 7.8, malzeme: 8.8, tasarim: 8.4, fiyat: 7.0, teknoloji: 9.0 },
    pros: ['Yeni nesil dijital kokpit ve yolcu ekranı', 'Çok iyi ses yalıtımı', 'Yüksek işçilik kalitesi'],
    cons: ['Giriş motoru ağır gövdeye zayıf kalıyor', 'Ekranların çokluğu dikkat dağıtabiliyor'],
    summary: 'A4’ün yerini alan yeni model; teknolojide sınıfının öncüsü, sürüşte olgun ve sessiz.',
  },
  {
    make: 'Alfa Romeo', model: 'Giulia', year: 2026, version: '2.0 Turbo 280 Veloce Q4',
    category: 'premium-sedan', bodyType: 'sedan', price: 5200000,
    specs: { motor: '2.0L turbo, 280 bg', hizlanma: '5,2 sn', tuketim: '7,8 L/100 km', bagaj: '480 L' },
    ratings: { surus: 9.6, guvenlik: 8.2, konfor: 7.8, tuketim: 6.8, malzeme: 7.6, tasarim: 9.3, fiyat: 6.8, teknoloji: 7.0 },
    pros: ['Sınıfının en keskin direksiyonu', 'Zamansız İtalyan tasarımı', 'Güçlü performans'],
    cons: ['Eski multimedya', 'Zayıf ikinci el değeri'],
    summary: 'Kalpten alınan bir otomobil: teknoloji eksiklerini sürüş karakteri ve tasarımıyla fazlasıyla telafi ediyor.',
  },
  {
    make: 'Toyota', model: 'Camry', year: 2026, version: '2.5 Hybrid 230 Passion',
    category: 'premium-sedan', bodyType: 'sedan', price: 3300000,
    specs: { motor: '2.5L tam hibrit, 230 bg', hizlanma: '8,3 sn', tuketim: '4,9 L/100 km', bagaj: '524 L' },
    ratings: { surus: 7.8, guvenlik: 9.0, konfor: 8.9, tuketim: 9.3, malzeme: 8.0, tasarim: 8.0, fiyat: 8.2, teknoloji: 7.8 },
    pros: ['Büyük sedan için çok düşük tüketim', 'Limuzin gibi geniş arka koltuk', 'Sessiz ve rahat'],
    cons: ['Sürüşü heyecan vermiyor', 'Premium marka prestiji yok'],
    summary: 'Premium markaların fiyatının çok altında, onlarla yarışan konfor ve verimlilik sunan akıllı bir tercih.',
  },
  {
    make: 'BMW', model: '5 Serisi', year: 2026, version: '520i M Sport',
    category: 'premium-sedan', bodyType: 'sedan', price: 6500000,
    specs: { motor: '2.0L turbo hafif hibrit, 208 bg', hizlanma: '7,5 sn', tuketim: '6,6 L/100 km', bagaj: '520 L' },
    ratings: { surus: 9.2, guvenlik: 9.3, konfor: 9.1, tuketim: 7.8, malzeme: 9.1, tasarim: 8.2, fiyat: 6.6, teknoloji: 9.3 },
    pros: ['Konfor ve sürüş dengesi mükemmel', 'Geniş ve sessiz kabin', 'Üst düzey teknoloji'],
    cons: ['Çok yüksek fiyat', 'Tasarımı tartışmalı'],
    summary: 'İş sınıfı sedanın en eksiksiz örneklerinden; uzun yolda da virajda da rakiplerinden bir adım önde.',
  },
  {
    make: 'Mercedes-Benz', model: 'E Serisi', year: 2026, version: 'E 180 AMG',
    category: 'premium-sedan', bodyType: 'sedan', price: 6800000,
    specs: { motor: '1.5L turbo hafif hibrit, 170 bg', hizlanma: '8,6 sn', tuketim: '6,7 L/100 km', bagaj: '540 L' },
    ratings: { surus: 8.4, guvenlik: 9.5, konfor: 9.4, tuketim: 7.6, malzeme: 9.3, tasarim: 8.8, fiyat: 6.3, teknoloji: 9.5 },
    pros: ['Sınıfının en konforlu sürüşü', 'MBUX Superscreen ve üst düzey teknoloji', 'Çok yüksek güvenlik'],
    cons: ['Giriş motoru ağır gövdede zorlanıyor', 'Fiyatı çok yüksek'],
    summary: 'Konfor ve teknolojinin zirvesi; sürüş keyfinden çok huzurlu seyahat arayanlar için.',
  },

  // =========================================================================
  // KÜÇÜK SUV
  // =========================================================================
  {
    make: 'Renault', model: 'Captur', year: 2026, version: '1.3 TCe 140 Techno EDC',
    category: 'kucuk-suv', bodyType: 'suv', price: 1900000,
    specs: { motor: '1.3L turbo hafif hibrit, 140 bg', hizlanma: '9,9 sn', tuketim: '5,9 L/100 km', bagaj: '484 L' },
    ratings: { surus: 7.6, guvenlik: 8.0, konfor: 7.9, tuketim: 7.9, malzeme: 7.6, tasarim: 8.0, fiyat: 8.0, teknoloji: 8.3 },
    pros: ['Kayar arka koltukla esnek bagaj', 'Google tabanlı multimedya', 'Makyajla modernleşen tasarım'],
    cons: ['EDC şanzıman düşük hızda sarsıntılı olabiliyor', 'Arka orta koltuk dar'],
    summary: 'Pratikliği ve teknolojisiyle sınıfının en dengeli küçük SUV’larından biri.',
  },
  {
    make: 'Peugeot', model: '2008', year: 2026, version: '1.2 Hybrid 145 GT e-DCS6',
    category: 'kucuk-suv', bodyType: 'suv', price: 2100000,
    specs: { motor: '1.2L turbo hafif hibrit, 145 bg', hizlanma: '9,2 sn', tuketim: '5,3 L/100 km', bagaj: '434 L' },
    ratings: { surus: 7.9, guvenlik: 7.6, konfor: 7.9, tuketim: 8.3, malzeme: 8.0, tasarim: 8.9, fiyat: 7.2, teknoloji: 8.1 },
    pros: ['Sınıfının en premium görünen kabini', 'Hafif hibritle iyi tüketim', 'Çevik sürüş'],
    cons: ['Fiyatı yüksek', 'Arka koltuk rakiplerden dar'],
    summary: 'Görünüşü ve kabin kalitesiyle öne çıkan, kendini bir üst sınıf gibi hissettiren küçük SUV.',
  },
  {
    make: 'Toyota', model: 'Yaris Cross', year: 2026, version: '1.5 Hybrid 130 Passion X-Pack',
    category: 'kucuk-suv', bodyType: 'suv', price: 2000000,
    specs: { motor: '1.5L tam hibrit, 130 bg', hizlanma: '10,2 sn', tuketim: '4,4 L/100 km', bagaj: '397 L' },
    ratings: { surus: 7.5, guvenlik: 8.8, konfor: 7.4, tuketim: 9.6, malzeme: 7.2, tasarim: 7.9, fiyat: 7.8, teknoloji: 7.8 },
    pros: ['Sınıfının en düşük tüketimi', 'Toyota güvenilirliği', 'Güçlü güvenlik paketi'],
    cons: ['Kabin malzemeleri sade', 'Hızlanmada motor sesi yükseliyor'],
    summary: 'Yakıt masrafını en aza indirmek isteyen küçük SUV alıcıları için en rasyonel seçim.',
  },
  {
    make: 'Hyundai', model: 'Bayon', year: 2026, version: '1.0 T-GDI 100 Elite DCT',
    category: 'kucuk-suv', bodyType: 'suv', price: 1650000,
    specs: { motor: '1.0L turbo, 100 bg', hizlanma: '11,7 sn', tuketim: '5,5 L/100 km', bagaj: '411 L' },
    ratings: { surus: 7.2, guvenlik: 7.4, konfor: 7.6, tuketim: 8.1, malzeme: 7.1, tasarim: 7.5, fiyat: 8.5, teknoloji: 7.9 },
    pros: ['İzmit’te üretim, uygun fiyat', 'Geniş bagaj', 'Zengin donanım'],
    cons: ['Motor gücü sınırlı', 'Gerçek bir SUV duruşu yok'],
    summary: 'i20 altyapısını daha yüksek duruş ve bagajla sunan, bütçe dostu bir küçük SUV.',
  },
  {
    make: 'Volkswagen', model: 'T-Cross', year: 2026, version: '1.0 TSI 115 Style DSG',
    category: 'kucuk-suv', bodyType: 'suv', price: 2000000,
    specs: { motor: '1.0L turbo, 115 bg', hizlanma: '10,2 sn', tuketim: '5,6 L/100 km', bagaj: '455 L' },
    ratings: { surus: 7.8, guvenlik: 8.3, konfor: 8.0, tuketim: 8.1, malzeme: 7.5, tasarim: 7.4, fiyat: 7.3, teknoloji: 7.8 },
    pros: ['Olgun ve sessiz sürüş', 'Kayar arka koltuk', 'Güçlü ikinci el değeri'],
    cons: ['Fiyatına göre sert plastikler', 'Tasarımı sade'],
    summary: 'Polo’nun olgunluğunu yüksek oturma pozisyonuyla birleştiren, güvenli bir tercih.',
  },
  {
    make: 'Ford', model: 'Puma', year: 2026, version: '1.0 EcoBoost Hybrid 155 ST-Line X',
    category: 'kucuk-suv', bodyType: 'suv', price: 2050000,
    specs: { motor: '1.0L turbo hafif hibrit, 155 bg', hizlanma: '8,9 sn', tuketim: '5,6 L/100 km', bagaj: '456 L' },
    ratings: { surus: 8.8, guvenlik: 7.9, konfor: 7.5, tuketim: 8.0, malzeme: 7.4, tasarim: 8.2, fiyat: 7.5, teknoloji: 8.0 },
    pros: ['Sınıfının en eğlenceli sürüşü', 'Bagaj altındaki MegaBox', 'Güçlü motor'],
    cons: ['Sert süspansiyon', 'Arka yaşam alanı dar'],
    summary: 'Küçük SUV sınıfında sürüş keyfi arayanların ilk durağı; pratiklikte de şaşırtıcı derecede iyi.',
  },
  {
    make: 'Skoda', model: 'Kamiq', year: 2026, version: '1.0 TSI 115 Elite DSG',
    category: 'kucuk-suv', bodyType: 'suv', price: 1850000,
    specs: { motor: '1.0L turbo, 115 bg', hizlanma: '10,2 sn', tuketim: '5,5 L/100 km', bagaj: '400 L' },
    ratings: { surus: 7.7, guvenlik: 8.3, konfor: 8.1, tuketim: 8.2, malzeme: 7.5, tasarim: 7.3, fiyat: 8.1, teknoloji: 7.7 },
    pros: ['Geniş arka koltuk', 'Konforlu süspansiyon', 'Fiyat/donanım dengesi iyi'],
    cons: ['Tasarımı sıradan', 'Sürüşte heyecan yok'],
    summary: 'T-Cross’un mekaniğini daha fazla alan ve daha iyi fiyatla sunan, mantıklı küçük SUV.',
  },
  {
    make: 'Fiat', model: '600', year: 2026, version: '1.2 Hybrid 100 La Prima e-DCT',
    category: 'kucuk-suv', bodyType: 'suv', price: 1850000,
    specs: { motor: '1.2L turbo hafif hibrit, 100 bg', hizlanma: '10,9 sn', tuketim: '5,2 L/100 km', bagaj: '385 L' },
    ratings: { surus: 7.3, guvenlik: 7.0, konfor: 7.6, tuketim: 8.3, malzeme: 7.0, tasarim: 8.6, fiyat: 7.6, teknoloji: 7.6 },
    pros: ['Sevimli ve karakterli tasarım', 'Hafif hibritle düşük tüketim', 'Şehirde kolay kullanım'],
    cons: ['Arka koltuk dar', 'Kabinde sert malzemeler'],
    summary: 'Retro tasarımıyla sınıfın en renkli üyelerinden; mantıktan çok duyguyla alınan bir küçük SUV.',
  },
  {
    make: 'Hyundai', model: 'Kona', year: 2026, version: '1.6 Hybrid 141 Elite',
    category: 'kucuk-suv', bodyType: 'suv', price: 2300000,
    specs: { motor: '1.6L tam hibrit, 141 bg', hizlanma: '11,2 sn', tuketim: '4,8 L/100 km', bagaj: '466 L' },
    ratings: { surus: 7.6, guvenlik: 8.6, konfor: 8.2, tuketim: 9.0, malzeme: 7.8, tasarim: 8.4, fiyat: 7.2, teknoloji: 8.6 },
    pros: ['Geniş kabin ve bagaj', 'Çift ekranlı modern kokpit', 'Düşük tüketim'],
    cons: ['Fiyatı üst sınıfa yakın', 'Tasarım herkese hitap etmiyor'],
    summary: 'Yeni neslinde büyüyen Kona, küçük SUV ile aile SUV’u arasında iyi bir köprü kuruyor.',
  },

  // =========================================================================
  // AİLE SUV
  // =========================================================================
  {
    make: 'Dacia', model: 'Duster', year: 2026, version: '1.2 TCe 130 Hybrid Journey',
    category: 'aile-suv', bodyType: 'suv', price: 1750000,
    specs: { motor: '1.2L turbo hafif hibrit, 130 bg', hizlanma: '10,1 sn', tuketim: '5,6 L/100 km', bagaj: '472 L' },
    ratings: { surus: 7.4, guvenlik: 6.8, konfor: 7.6, tuketim: 8.0, malzeme: 6.8, tasarim: 8.0, fiyat: 9.2, teknoloji: 7.2 },
    pros: ['Fiyatına göre inanılmaz değer', 'Sağlam ve iddialı duruş', '4x4 seçeneği'],
    cons: ['Ucuz kabin malzemeleri', 'Güvenlik puanı rakiplerin gerisinde'],
    summary: 'Yeni neslinde çok olgunlaşan Duster, aile SUV’una en uygun fiyatlı giriş biletini sunuyor.',
  },
  {
    make: 'Peugeot', model: '3008', year: 2026, version: '1.2 Hybrid 145 GT e-DCS6',
    category: 'aile-suv', bodyType: 'suv', price: 2900000,
    specs: { motor: '1.2L turbo hafif hibrit, 145 bg', hizlanma: '10,2 sn', tuketim: '5,6 L/100 km', bagaj: '520 L' },
    ratings: { surus: 8.0, guvenlik: 8.3, konfor: 8.2, tuketim: 8.0, malzeme: 8.4, tasarim: 9.2, fiyat: 7.0, teknoloji: 8.8 },
    pros: ['21 inçlik panoramik kavisli ekran', 'Çarpıcı fastback tasarım', 'Kaliteli kabin'],
    cons: ['Motor ağır gövdede zorlanabiliyor', 'Fiyatı yüksek'],
    summary: 'Tasarım ve teknolojide sınıfının en iddialısı; göz alıcı bir aile SUV’u arayanlar için.',
  },
  {
    make: 'Volkswagen', model: 'Tiguan', year: 2026, version: '1.5 eTSI 150 Elegance DSG',
    category: 'aile-suv', bodyType: 'suv', price: 3300000,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '9,1 sn', tuketim: '6,0 L/100 km', bagaj: '652 L' },
    ratings: { surus: 8.4, guvenlik: 8.9, konfor: 8.7, tuketim: 7.9, malzeme: 8.3, tasarim: 8.0, fiyat: 6.8, teknoloji: 8.6 },
    pros: ['652 litrelik bagaj', 'DCC süspansiyonla üstün konfor', 'Olgun, sessiz sürüş'],
    cons: ['Fiyatı sınıfının üst sınırında', 'Bazı fonksiyonlar menülere gömülü'],
    summary: 'Konfor, alan ve kaliteyi en dengeli şekilde birleştiren aile SUV’larından; bedeli ise yüksek.',
  },
  {
    make: 'Toyota', model: 'C-HR', year: 2026, version: '1.8 Hybrid 140 Passion',
    category: 'aile-suv', bodyType: 'suv', price: 2450000,
    specs: { motor: '1.8L tam hibrit, 140 bg', hizlanma: '9,9 sn', tuketim: '4,8 L/100 km', bagaj: '388 L' },
    ratings: { surus: 8.0, guvenlik: 8.8, konfor: 7.9, tuketim: 9.2, malzeme: 8.0, tasarim: 8.8, fiyat: 7.6, teknoloji: 8.0 },
    pros: ['Çok düşük tüketim', 'Keskin ve modern tasarım', 'Toyota güvenilirliği'],
    cons: ['Küçük bagaj', 'Arka koltuk ve görüş sınırlı'],
    summary: 'Aileden çok çiftlere uygun; tasarım ve verimlilikte güçlü, pratiklikte sınıfının gerisinde.',
  },
  {
    make: 'Toyota', model: 'RAV4', year: 2026, version: '2.5 Hybrid 218 Passion',
    category: 'aile-suv', bodyType: 'suv', price: 3400000,
    specs: { motor: '2.5L tam hibrit, 218 bg', hizlanma: '8,4 sn', tuketim: '5,6 L/100 km', bagaj: '580 L' },
    ratings: { surus: 7.9, guvenlik: 9.0, konfor: 8.2, tuketim: 8.8, malzeme: 7.8, tasarim: 7.8, fiyat: 7.5, teknoloji: 8.0 },
    pros: ['Güçlü ve verimli hibrit', 'Geniş kabin ve bagaj', 'Uzun ömürlü mekanik'],
    cons: ['Kabin malzemeleri fiyatının gerisinde', 'Hızlanmada motor sesi'],
    summary: 'Güvenilirlik ve verimliliği büyük SUV alanıyla birleştiren, yılların test ettiği bir aile otomobili.',
  },
  {
    make: 'Hyundai', model: 'Tucson', year: 2026, version: '1.6 T-GDI Hybrid 215 Elite Plus',
    category: 'aile-suv', bodyType: 'suv', price: 3000000,
    specs: { motor: '1.6L turbo tam hibrit, 215 bg', hizlanma: '8,0 sn', tuketim: '5,6 L/100 km', bagaj: '616 L' },
    ratings: { surus: 7.9, guvenlik: 8.7, konfor: 8.5, tuketim: 8.5, malzeme: 8.0, tasarim: 8.6, fiyat: 7.6, teknoloji: 8.7 },
    pros: ['Güçlü hibrit ve düşük tüketim', 'Geniş bagaj', 'Zengin teknoloji ve donanım'],
    cons: ['Direksiyon hissi zayıf', 'Arka görüş sınırlı'],
    summary: 'Donanım, tasarım ve hibrit verimliliğini iyi fiyatla sunan, sınıfının en dengeli paketlerinden.',
  },
  {
    make: 'Kia', model: 'Sportage', year: 2026, version: '1.6 T-GDI Hybrid 215 Prestige',
    category: 'aile-suv', bodyType: 'suv', price: 3050000,
    specs: { motor: '1.6L turbo tam hibrit, 215 bg', hizlanma: '8,0 sn', tuketim: '5,6 L/100 km', bagaj: '587 L' },
    ratings: { surus: 8.0, guvenlik: 8.7, konfor: 8.4, tuketim: 8.5, malzeme: 8.1, tasarim: 8.4, fiyat: 7.5, teknoloji: 8.7 },
    pros: ['Kavisli çift ekran', 'Geniş arka koltuk', 'Uzun garanti'],
    cons: ['Sert yollarda sarsıntı hissi', 'Dokunmatik çift fonksiyonlu panel kafa karıştırıcı'],
    summary: 'Tucson’un kuzeni; biraz daha sportif ayarı ve kaliteli kabiniyle eşit derecede güçlü bir aday.',
  },
  {
    make: 'Nissan', model: 'Qashqai', year: 2026, version: '1.5 e-Power 190 Tekna',
    category: 'aile-suv', bodyType: 'suv', price: 2850000,
    specs: { motor: '1.5L seri hibrit (e-Power), 190 bg', hizlanma: '7,9 sn', tuketim: '5,3 L/100 km', bagaj: '504 L' },
    ratings: { surus: 7.8, guvenlik: 8.6, konfor: 8.3, tuketim: 8.5, malzeme: 8.0, tasarim: 8.0, fiyat: 7.3, teknoloji: 8.3 },
    pros: ['Elektrikli gibi sessiz, akıcı hızlanma', 'Rahat süspansiyon', 'Kaliteli kabin'],
    cons: ['Otoyolda tüketim artıyor', 'Fiyatı yükseldi'],
    summary: 'Crossover sınıfını başlatan modelin son hali; e-Power sistemiyle şehirde çok keyifli.',
  },
  {
    make: 'Chery', model: 'Tiggo 7', year: 2026, version: '1.5 Super Hybrid Prestige',
    category: 'aile-suv', bodyType: 'suv', price: 2200000,
    specs: { motor: '1.5L turbo şarj edilebilir hibrit, 279 bg sistem', hizlanma: '8,5 sn', tuketim: '4,5 L/100 km (şarjlı karma)', bagaj: '500 L' },
    ratings: { surus: 7.0, guvenlik: 8.2, konfor: 7.9, tuketim: 8.6, malzeme: 7.6, tasarim: 7.8, fiyat: 8.8, teknoloji: 8.4 },
    pros: ['Fiyatına göre çok zengin donanım', 'Şarjlı hibritle düşük şehir içi tüketim', 'Geniş kabin'],
    cons: ['Sürüş dinamikleri Avrupalı rakiplerin gerisinde', 'Uzun vadeli ikinci el değeri belirsiz'],
    summary: 'Az paraya çok donanım isteyenler için güçlü bir alternatif; marka güveni zamanla oturacak.',
  },
  {
    make: 'Skoda', model: 'Kodiaq', year: 2026, version: '1.5 eTSI 150 Prestige 7 koltuk',
    category: 'aile-suv', bodyType: 'suv', price: 3400000,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '9,7 sn', tuketim: '6,1 L/100 km', bagaj: '845 L (5 koltuk)' },
    ratings: { surus: 8.1, guvenlik: 8.9, konfor: 8.8, tuketim: 7.8, malzeme: 8.3, tasarim: 7.9, fiyat: 7.6, teknoloji: 8.5 },
    pros: ['7 koltuk seçeneği ve dev bagaj', 'Çok konforlu, sessiz sürüş', 'Pratik detaylar'],
    cons: ['Motor dolu araçta zorlanabiliyor', 'Büyük boyutlar şehirde zorlayıcı'],
    summary: 'Kalabalık aileler için sınıfının en mantıklı seçeneği; alan ve konforda neredeyse rakipsiz.',
  },
  {
    make: 'Renault', model: 'Austral', year: 2026, version: '1.2 E-Tech Full Hybrid 200 Iconic',
    category: 'aile-suv', bodyType: 'suv', price: 3000000,
    specs: { motor: '1.2L turbo tam hibrit, 200 bg', hizlanma: '8,4 sn', tuketim: '4,8 L/100 km', bagaj: '555 L' },
    ratings: { surus: 8.2, guvenlik: 8.6, konfor: 8.2, tuketim: 8.9, malzeme: 8.0, tasarim: 8.0, fiyat: 7.2, teknoloji: 8.7 },
    pros: ['4Control arka aks yönlendirme', 'Çok verimli tam hibrit', 'OpenR ekran ve Google hizmetleri'],
    cons: ['Hibrit sistem düşük hızda sarsıntılı olabiliyor', 'Fiyat/donanım dengesi zayıflıyor'],
    summary: 'Teknoloji ve verimlilikte iddialı, çevik ve konforlu bir aile SUV’u.',
  },
  {
    make: 'Cupra', model: 'Formentor', year: 2026, version: '1.5 eTSI 150 DSG',
    category: 'aile-suv', bodyType: 'suv', price: 2900000,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '8,9 sn', tuketim: '5,9 L/100 km', bagaj: '450 L' },
    ratings: { surus: 8.9, guvenlik: 8.6, konfor: 7.6, tuketim: 7.9, malzeme: 7.9, tasarim: 9.1, fiyat: 7.2, teknoloji: 8.2 },
    pros: ['Sınıfının en sportif sürüşü', 'Göz alıcı tasarım', 'Alçak, otomobil gibi oturma'],
    cons: ['Sert süspansiyon', 'Aile için bagaj ve arka alan ortalama'],
    summary: 'SUV olmaktan çok yükseltilmiş bir hot-hatch; aile ihtiyacından çok sürüş keyfi arayanlar için.',
  },

  // =========================================================================
  // PREMIUM SUV
  // =========================================================================
  {
    make: 'BMW', model: 'X1', year: 2026, version: 'sDrive20i M Sport',
    category: 'premium-suv', bodyType: 'suv', price: 3900000,
    specs: { motor: '1.5L turbo hafif hibrit, 170 bg', hizlanma: '8,4 sn', tuketim: '6,4 L/100 km', bagaj: '540 L' },
    ratings: { surus: 8.6, guvenlik: 9.0, konfor: 8.4, tuketim: 7.9, malzeme: 8.6, tasarim: 8.3, fiyat: 7.2, teknoloji: 8.9 },
    pros: ['Pratik ve geniş kabin', 'Keskin direksiyon', 'Kavisli ekran'],
    cons: ['Fiziksel tuş neredeyse yok', 'M Sport süspansiyon sert'],
    summary: 'Premium SUV dünyasına en mantıklı giriş kapılarından; hem pratik hem sürüşte BMW karakteri taşıyor.',
  },
  {
    make: 'Mercedes-Benz', model: 'GLA', year: 2026, version: 'GLA 200 AMG',
    category: 'premium-suv', bodyType: 'suv', price: 3800000,
    specs: { motor: '1.3L turbo hafif hibrit, 163 bg', hizlanma: '8,7 sn', tuketim: '6,3 L/100 km', bagaj: '435 L' },
    ratings: { surus: 7.9, guvenlik: 8.9, konfor: 8.1, tuketim: 7.9, malzeme: 8.4, tasarim: 8.2, fiyat: 6.9, teknoloji: 8.5 },
    pros: ['Şık kabin atmosferi', 'Mercedes prestiji', 'Güçlü güvenlik sistemleri'],
    cons: ['Rakiplerine göre küçük bagaj', 'Fiyatına göre sade donanım'],
    summary: 'Mercedes kabin deneyimini kompakt boyutlarda sunuyor; pratiklikte X1’in gerisinde.',
  },
  {
    make: 'Audi', model: 'Q3', year: 2026, version: '1.5 TFSI 150 S line',
    category: 'premium-suv', bodyType: 'suv', price: 3700000,
    specs: { motor: '1.5L turbo hafif hibrit, 150 bg', hizlanma: '9,2 sn', tuketim: '6,2 L/100 km', bagaj: '488 L' },
    ratings: { surus: 8.2, guvenlik: 8.8, konfor: 8.4, tuketim: 8.0, malzeme: 8.6, tasarim: 8.5, fiyat: 7.1, teknoloji: 8.7 },
    pros: ['Yeni nesil Matrix LED farlar', 'Kaliteli, sessiz kabin', 'Kayar arka koltuk'],
    cons: ['Opsiyonlar pahalı', 'Giriş motoru sınırlı'],
    summary: 'Yeni neslinde teknoloji ve kalite çıtasını yükselten, dengeli bir premium kompakt SUV.',
  },
  {
    make: 'Volvo', model: 'XC40', year: 2026, version: 'B4 Plus',
    category: 'premium-suv', bodyType: 'suv', price: 3600000,
    specs: { motor: '2.0L turbo hafif hibrit, 197 bg', hizlanma: '8,5 sn', tuketim: '7,0 L/100 km', bagaj: '443 L' },
    ratings: { surus: 7.8, guvenlik: 9.3, konfor: 8.4, tuketim: 7.3, malzeme: 8.4, tasarim: 8.6, fiyat: 7.3, teknoloji: 8.5 },
    pros: ['Üst düzey güvenlik', 'İskandinav tasarım ve rahat koltuklar', 'Google tabanlı multimedya'],
    cons: ['Tüketim rakiplerden yüksek', 'Sürüş dinamikleri sıradan'],
    summary: 'Güvenlik ve tasarıma öncelik verenler için sıcak ve karakterli bir premium SUV.',
  },
  {
    make: 'BMW', model: 'X3', year: 2026, version: '20 xDrive M Sport',
    category: 'premium-suv', bodyType: 'suv', price: 5800000,
    specs: { motor: '2.0L turbo hafif hibrit, 208 bg', hizlanma: '7,8 sn', tuketim: '7,1 L/100 km', bagaj: '570 L' },
    ratings: { surus: 9.0, guvenlik: 9.2, konfor: 8.7, tuketim: 7.5, malzeme: 8.8, tasarim: 8.0, fiyat: 6.7, teknoloji: 9.0 },
    pros: ['Sınıfının en iyi sürüşü', 'Geniş ve kaliteli kabin', 'xDrive standart'],
    cons: ['Tasarımı tartışmalı', 'Yüksek fiyat'],
    summary: 'Orta boy premium SUV’da sürüş keyfinin referansı; pratiklikten de ödün vermiyor.',
  },
  {
    make: 'Mercedes-Benz', model: 'GLC', year: 2026, version: 'GLC 220 d 4MATIC AMG',
    category: 'premium-suv', bodyType: 'suv', price: 6300000,
    specs: { motor: '2.0L turbodizel hafif hibrit, 197 bg', hizlanma: '8,0 sn', tuketim: '5,8 L/100 km', bagaj: '620 L' },
    ratings: { surus: 8.4, guvenlik: 9.4, konfor: 9.1, tuketim: 8.2, malzeme: 9.0, tasarim: 8.7, fiyat: 6.4, teknoloji: 9.2 },
    pros: ['Sınıfının en konforlu sürüşü', 'Lüks kabin', 'Verimli dizel motor'],
    cons: ['Çok yüksek fiyat', 'Dokunmatik kontroller'],
    summary: 'Konfor ve lüks hissinde sınıfın lideri; uzun yolda en huzurlu premium SUV.',
  },
  {
    make: 'Audi', model: 'Q5', year: 2026, version: '2.0 TFSI 204 quattro S line',
    category: 'premium-suv', bodyType: 'suv', price: 5900000,
    specs: { motor: '2.0L turbo hafif hibrit, 204 bg', hizlanma: '7,6 sn', tuketim: '7,4 L/100 km', bagaj: '520 L' },
    ratings: { surus: 8.5, guvenlik: 9.1, konfor: 8.8, tuketim: 7.4, malzeme: 9.0, tasarim: 8.5, fiyat: 6.6, teknoloji: 9.1 },
    pros: ['Yeni dijital kokpit ve yolcu ekranı', 'Mükemmel işçilik', 'quattro güvenliği'],
    cons: ['Tüketim yüksek', 'Opsiyon fiyatları'],
    summary: 'Yeni neslinde teknoloji odaklı; kalite ve sessizlikte sınıfının en iyilerinden.',
  },
  {
    make: 'Volvo', model: 'XC60', year: 2026, version: 'B5 AWD Ultra',
    category: 'premium-suv', bodyType: 'suv', price: 5700000,
    specs: { motor: '2.0L turbo hafif hibrit, 250 bg', hizlanma: '6,9 sn', tuketim: '7,6 L/100 km', bagaj: '483 L' },
    ratings: { surus: 7.9, guvenlik: 9.5, konfor: 8.9, tuketim: 7.2, malzeme: 8.9, tasarim: 8.8, fiyat: 6.8, teknoloji: 8.6 },
    pros: ['Sınıfının en güvenli otomobillerinden', 'Zarif, zamansız tasarım', 'Çok rahat koltuklar'],
    cons: ['Tüketim yüksek', 'Sürüş dinamikleri Alman rakiplerin gerisinde'],
    summary: 'Güvenlik ve huzur arayan aileler için premium SUV’ların en insancıl olanı.',
  },
  {
    make: 'Lexus', model: 'NX', year: 2026, version: '350h Executive',
    category: 'premium-suv', bodyType: 'suv', price: 5200000,
    specs: { motor: '2.5L tam hibrit, 244 bg', hizlanma: '7,7 sn', tuketim: '5,8 L/100 km', bagaj: '520 L' },
    ratings: { surus: 7.8, guvenlik: 9.1, konfor: 8.7, tuketim: 8.8, malzeme: 9.0, tasarim: 8.5, fiyat: 7.2, teknoloji: 8.4 },
    pros: ['Premium sınıfta en düşük tüketimlerden', 'Kusursuz işçilik', 'Yüksek güvenilirlik'],
    cons: ['Sürüş keyfi sınırlı', 'e-CVT hızlanmada gürültülü'],
    summary: 'Alman rakiplere sessiz, verimli ve bakımı kolay bir alternatif; işçilikte hiçbirinden geri değil.',
  },

  // =========================================================================
  // ELEKTRİKLİ
  // =========================================================================
  {
    make: 'Togg', model: 'T10X', year: 2026, version: 'V2 RWD Uzun Menzil',
    category: 'elektrikli', bodyType: 'suv', price: 2200000,
    specs: { motor: '218 bg, 88,5 kWh batarya, ~523 km WLTP', hizlanma: '7,4 sn', tuketim: '17,8 kWh/100 km', bagaj: '441 L' },
    ratings: { surus: 7.8, guvenlik: 8.9, konfor: 8.2, tuketim: 7.6, malzeme: 7.8, tasarim: 8.5, fiyat: 8.5, teknoloji: 8.8 },
    pros: ['Fiyatına göre uzun menzil', 'Geniş ekranlı teknoloji odaklı kabin', 'Euro NCAP 5 yıldız'],
    cons: ['Hızlı şarj gücü rakiplerin gerisinde', 'Bazı yazılım özellikleri hâlâ olgunlaşıyor'],
    summary: 'Türkiye’nin en çok satan elektriklilerinden; menzil, donanım ve fiyat dengesi çok güçlü.',
  },
  {
    make: 'Togg', model: 'T10F', year: 2026, version: 'V2 RWD Uzun Menzil',
    category: 'elektrikli', bodyType: 'sedan', price: 2300000,
    specs: { motor: '218 bg, 88,5 kWh batarya, ~600 km WLTP', hizlanma: '7,0 sn', tuketim: '15,5 kWh/100 km', bagaj: '470 L' },
    ratings: { surus: 8.0, guvenlik: 8.8, konfor: 8.3, tuketim: 8.3, malzeme: 7.9, tasarim: 8.4, fiyat: 8.3, teknoloji: 8.9 },
    pros: ['Aerodinamik gövdeyle uzun menzil', 'Zengin standart donanım', 'Yaygın yerli servis'],
    cons: ['Yazılım güncellemelerine bağımlı özellikler', 'Arka başüstü sınırlı'],
    summary: 'T10X’in teknolojisini daha verimli bir sedan gövdeyle sunan, menzil odaklı yerli seçenek.',
  },
  {
    make: 'Tesla', model: 'Model Y', year: 2026, version: 'Long Range RWD',
    category: 'elektrikli', bodyType: 'suv', price: 2600000,
    specs: { motor: 'Tek motor, ~600 km WLTP', hizlanma: '5,6 sn', tuketim: '15,0 kWh/100 km', bagaj: '854 L (ön+arka)' },
    ratings: { surus: 8.2, guvenlik: 9.2, konfor: 8.0, tuketim: 9.2, malzeme: 7.8, tasarim: 8.2, fiyat: 8.2, teknoloji: 9.4 },
    pros: ['Sınıfının en iyi verimliliği', 'Supercharger ağı', 'Dev bagaj hacmi'],
    cons: ['Neredeyse tüm kontroller ekranda', 'Sert yol tepkileri'],
    summary: 'Verimlilik, şarj altyapısı ve yazılımda hâlâ ölçü birimi; kabin sadeliği herkese göre değil.',
  },
  {
    make: 'Tesla', model: 'Model 3', year: 2026, version: 'Long Range RWD',
    category: 'elektrikli', bodyType: 'sedan', price: 2400000,
    specs: { motor: 'Tek motor, ~700 km WLTP', hizlanma: '5,2 sn', tuketim: '13,5 kWh/100 km', bagaj: '682 L (ön+arka)' },
    ratings: { surus: 8.7, guvenlik: 9.1, konfor: 8.4, tuketim: 9.6, malzeme: 8.0, tasarim: 8.3, fiyat: 8.3, teknoloji: 9.4 },
    pros: ['Piyasanın en verimli elektriklilerinden', 'Çok uzun menzil', 'Çevik ve hızlı'],
    cons: ['Sinyal kolu olmayan direksiyon alışkanlık istiyor', 'Minimalist kabin'],
    summary: 'Elektrikli sedanın referansı; menzil ve verimlilikte neredeyse rakipsiz.',
  },
  {
    make: 'BYD', model: 'Atto 3', year: 2026, version: 'Design',
    category: 'elektrikli', bodyType: 'suv', price: 1750000,
    specs: { motor: '204 bg, 60,5 kWh, ~420 km WLTP', hizlanma: '7,3 sn', tuketim: '16,0 kWh/100 km', bagaj: '440 L' },
    ratings: { surus: 7.2, guvenlik: 8.8, konfor: 7.8, tuketim: 8.0, malzeme: 7.4, tasarim: 7.5, fiyat: 8.6, teknoloji: 8.2 },
    pros: ['Uygun fiyat', 'Blade batarya güvenliği', 'Zengin standart donanım'],
    cons: ['Sıra dışı iç tasarım herkese uymuyor', 'Şarj hızı ortalama'],
    summary: 'Uygun fiyatlı elektrikli SUV arayanlar için eksiksiz ve güvenilir bir paket.',
  },
  {
    make: 'BYD', model: 'Seal', year: 2026, version: 'Excellence AWD',
    category: 'elektrikli', bodyType: 'sedan', price: 2700000,
    specs: { motor: '530 bg çift motor, 82,5 kWh, ~520 km WLTP', hizlanma: '3,8 sn', tuketim: '17,0 kWh/100 km', bagaj: '400 L + 53 L ön' },
    ratings: { surus: 8.4, guvenlik: 9.0, konfor: 8.4, tuketim: 8.0, malzeme: 8.2, tasarim: 8.6, fiyat: 8.4, teknoloji: 8.6 },
    pros: ['Süper otomobil hızlanması', 'Kaliteli kabin', 'Fiyatına göre çok güçlü paket'],
    cons: ['Yazılım arayüzü karmaşık', 'Bagaj sınıf ortalamasının altında'],
    summary: 'Model 3’e en güçlü rakiplerden; performans ve kalitede şaşırtıcı derecede iddialı.',
  },
  {
    make: 'Volkswagen', model: 'ID.4', year: 2026, version: 'Pro',
    category: 'elektrikli', bodyType: 'suv', price: 2500000,
    specs: { motor: '286 bg, 77 kWh, ~550 km WLTP', hizlanma: '6,7 sn', tuketim: '16,5 kWh/100 km', bagaj: '543 L' },
    ratings: { surus: 7.8, guvenlik: 9.0, konfor: 8.6, tuketim: 8.2, malzeme: 7.6, tasarim: 7.6, fiyat: 7.5, teknoloji: 8.0 },
    pros: ['Konforlu, sessiz sürüş', 'Geniş kabin ve bagaj', 'Yazılım güncellemeleriyle iyileşen arayüz'],
    cons: ['Kabin malzemeleri VW standardının altında', 'Dokunmatik tuşlar'],
    summary: 'Aileler için olgun ve rahat bir elektrikli SUV; heyecandan çok huzur sunuyor.',
  },
  {
    make: 'Hyundai', model: 'Ioniq 5', year: 2026, version: '84 kWh RWD Advance',
    category: 'elektrikli', bodyType: 'suv', price: 2900000,
    specs: { motor: '229 bg, 84 kWh, ~570 km WLTP', hizlanma: '7,5 sn', tuketim: '17,0 kWh/100 km', bagaj: '520 L' },
    ratings: { surus: 8.0, guvenlik: 9.1, konfor: 8.8, tuketim: 8.3, malzeme: 8.2, tasarim: 9.3, fiyat: 7.4, teknoloji: 9.0 },
    pros: ['800V altyapıyla çok hızlı şarj', 'İkonik retro-fütüristik tasarım', 'Lounge gibi geniş kabin'],
    cons: ['Arka cam sileceği yok (bazı versiyonlarda)', 'Fiyatı yüksek'],
    summary: 'Şarj hızı ve kabin ferahlığıyla elektrikli dünyanın en iyi aile otomobillerinden.',
  },
  {
    make: 'Kia', model: 'EV6', year: 2026, version: '84 kWh RWD GT-Line',
    category: 'elektrikli', bodyType: 'fastback', price: 3000000,
    specs: { motor: '229 bg, 84 kWh, ~580 km WLTP', hizlanma: '7,3 sn', tuketim: '16,8 kWh/100 km', bagaj: '480 L' },
    ratings: { surus: 8.6, guvenlik: 9.0, konfor: 8.3, tuketim: 8.4, malzeme: 8.2, tasarim: 9.0, fiyat: 7.3, teknoloji: 8.9 },
    pros: ['800V hızlı şarj', 'Sportif ve çevik sürüş', 'Etkileyici tasarım'],
    cons: ['Arka görüş sınırlı', 'Yüksek fiyat'],
    summary: 'Ioniq 5’in teknolojisini daha sportif bir karakterle sunan, sürücü odaklı elektrikli crossover.',
  },
  {
    make: 'MG', model: 'MG4', year: 2026, version: 'Luxury 64 kWh',
    category: 'elektrikli', bodyType: 'fastback', price: 1600000,
    specs: { motor: '204 bg, 64 kWh, ~435 km WLTP', hizlanma: '7,9 sn', tuketim: '16,0 kWh/100 km', bagaj: '363 L' },
    ratings: { surus: 8.4, guvenlik: 8.6, konfor: 7.6, tuketim: 8.3, malzeme: 6.9, tasarim: 7.8, fiyat: 8.9, teknoloji: 7.5 },
    pros: ['Arkadan itişli eğlenceli sürüş', 'Çok uygun fiyat', 'Sınıfına göre iyi menzil'],
    cons: ['Ucuz kabin malzemeleri', 'Yavaş ve basit multimedya'],
    summary: 'Uygun fiyatlı elektrikli hatchback’ler arasında sürüş keyfiyle öne çıkan, akıllı bir tercih.',
  },
  {
    make: 'Volvo', model: 'EX30', year: 2026, version: 'Single Motor Extended Range Plus',
    category: 'elektrikli', bodyType: 'suv', price: 2100000,
    specs: { motor: '272 bg, 69 kWh, ~475 km WLTP', hizlanma: '5,3 sn', tuketim: '16,9 kWh/100 km', bagaj: '318 L' },
    ratings: { surus: 8.2, guvenlik: 9.0, konfor: 7.6, tuketim: 8.2, malzeme: 8.2, tasarim: 9.0, fiyat: 8.0, teknoloji: 8.3 },
    pros: ['Premium markada ulaşılabilir fiyat', 'Çok hızlı', 'Şık ve sürdürülebilir kabin malzemeleri'],
    cons: ['Küçük bagaj ve arka koltuk', 'Tüm kontroller tek ekranda'],
    summary: 'Premium elektrikliye en uygun giriş; şehirde yaşayan çiftler için stilli ve hızlı bir seçenek.',
  },
  {
    make: 'Kia', model: 'EV3', year: 2026, version: '81,4 kWh GT-Line',
    category: 'elektrikli', bodyType: 'suv', price: 2350000,
    specs: { motor: '204 bg, 81,4 kWh, ~600 km WLTP', hizlanma: '7,9 sn', tuketim: '15,5 kWh/100 km', bagaj: '460 L' },
    ratings: { surus: 7.8, guvenlik: 8.9, konfor: 8.2, tuketim: 8.8, malzeme: 7.9, tasarim: 8.6, fiyat: 8.2, teknoloji: 8.7 },
    pros: ['Kompakt boyutlarda çok uzun menzil', 'Akıllı ve kullanışlı kabin', 'Geniş bagaj'],
    cons: ['Şarj hızı 800V kardeşlerinin gerisinde', 'Üst donanımlarda fiyat artıyor'],
    summary: 'Kompakt elektrikli SUV sınıfında menzil ve pratiklikte çıtayı yükselten, çok dengeli bir model.',
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
