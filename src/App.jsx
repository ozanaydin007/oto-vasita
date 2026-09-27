import React, { useState, useMemo } from 'react';
import { 
  Car, 
  Search, 
  Sparkles, 
  Gauge, 
  ShieldCheck, 
  Armchair, 
  Fuel, 
  Gem, 
  Palette, 
  Cpu, 
  Coins, 
  ChevronRight, 
  Layers, 
  SlidersHorizontal, 
  CheckCircle2, 
  XCircle, 
  X, 
  Scale, 
  Star,
  Zap,
  Flame,
  Filter,
  Check
} from 'lucide-react';

const CRITERIA_META = [
  { key: 'Sürüş Dinamikleri', icon: Gauge, color: 'text-rose-400', bar: 'bg-rose-500' },
  { key: 'Güvenlik', icon: ShieldCheck, color: 'text-sky-400', bar: 'bg-sky-500' },
  { key: 'Konfor', icon: Armchair, color: 'text-indigo-400', bar: 'bg-indigo-500' },
  { key: 'Tüketim / Verimlilik', icon: Fuel, color: 'text-emerald-400', bar: 'bg-emerald-500' },
  { key: 'Malzeme Kalitesi', icon: Gem, color: 'text-amber-400', bar: 'bg-amber-500' },
  { key: 'Tasarım', icon: Palette, color: 'text-fuchsia-400', bar: 'bg-fuchsia-500' },
  { key: 'Teknoloji', icon: Cpu, color: 'text-teal-400', bar: 'bg-teal-500' },
  { key: 'Fiyat / Performans', icon: Coins, color: 'text-lime-400', bar: 'bg-lime-500' }
];

const CARS_DATABASE = [
  // --- KULLANICININ ÖZEL OLARAK İSTEDİĞİ MODELLER ---
  {
    id: 'bmw-i7-m60',
    name: 'BMW i7 M60 xDrive',
    brand: 'BMW',
    segment: 'Elektrikli / Lüks Sedan',
    bodyType: 'Sedan',
    year: 2025,
    fuel: 'Elektrik',
    badge: 'Ultra Lüks Amiral',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
    summary: 'Tavandan inen 31.3 inç 8K sinema ekranı, havalı süspansiyon ve 544 beygir gücündeki çift elektrik motoruyla geleceğin makam limuzini.',
    specs: { power: '544 PS / 745 Nm', acceleration: '4.7 sn', topSpeed: '240 km/s', transmission: 'Tek Vites Otomatik', consumption: '19.6 kWh/100km' },
    scores: { 'Sürüş Dinamikleri': 9.2, 'Güvenlik': 9.9, 'Konfor': 10.0, 'Tüketim / Verimlilik': 8.3, 'Malzeme Kalitesi': 10.0, 'Tasarım': 9.1, 'Teknoloji': 10.0, 'Fiyat / Performans': 6.8 },
    pros: ['Arka yaşam alanında 31.3 inçlik katlanır sinema ekranı', 'Dünyanın en sessiz ve titreşimsiz kabinlerinden biri', 'Yüksek ağırlığı hissettirmeyen arka aks yönlendirmesi'],
    cons: ['Çok yüksek fiyat etiketi ve devasa boyutlar', 'Tartışmalı devasa ön böbrek ızgara tasarımı']
  },
  {
    id: 'mercedes-c200d-amg',
    name: 'Mercedes-Benz C200d AMG (W206)',
    brand: 'Mercedes-Benz',
    segment: 'Sedan',
    bodyType: 'Sedan',
    year: 2024,
    fuel: 'Mild-Hybrid Dizel',
    badge: 'Premium Dizel İkonu',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200',
    summary: '2.0 litrelik OM654M dizel motorun elektrik desteğiyle birleşimi. Otoyolda 4.5 litrelik yakıt ekonomisi ve S-Serisi esintili dikey MBUX ekranı.',
    specs: { power: '163 + 20 PS / 380 Nm', acceleration: '7.7 sn', topSpeed: '230 km/s', transmission: '9G-TRONIC', consumption: '4.8 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 8.6, 'Güvenlik': 9.5, 'Konfor': 9.3, 'Tüketim / Verimlilik': 9.6, 'Malzeme Kalitesi': 9.2, 'Tasarım': 9.4, 'Teknoloji': 9.6, 'Fiyat / Performans': 7.9 },
    pros: ['Uzun yolda tek depoyla 1200 km üzeri menzil', 'Çok başarılı ses yalıtımı ve rüzgar direnci katsayısı', 'MBUX dikey ekran ve zengin ambiyans aydınlatması'],
    cons: ['Önceki nesillere kıyasla sertleşen AMG süspansiyon', 'Orta konsoldaki piyano siyahı kaplamalar toz ve çizik çekiyor']
  },
  {
    id: 'bmw-f30-320i-ed',
    name: 'BMW 320i EfficientDynamics (F30)',
    brand: 'BMW',
    segment: 'Sedan',
    bodyType: 'Sedan',
    year: 2016,
    fuel: 'Benzin',
    badge: 'Efsane Kasa (N13)',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200',
    summary: 'Türkiye otomotiv tarihinin en çok arzulanan efsanelerinden biri. 1.6 TwinPower Turbo N13 motor, ZF 8HP şanzıman ve saf arkadan itiş keyfi.',
    specs: { power: '170 PS / 250 Nm', acceleration: '7.6 sn', topSpeed: '230 km/s', transmission: '8 İleri ZF Otomatik', consumption: '6.8 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 9.4, 'Güvenlik': 8.9, 'Konfor': 8.5, 'Tüketim / Verimlilik': 8.2, 'Malzeme Kalitesi': 8.8, 'Tasarım': 9.6, 'Teknoloji': 8.0, 'Fiyat / Performans': 9.1 },
    pros: ['Safkan arkadan itiş sürüş zevki ve harika direksiyon hissi', 'ZF 8 ileri şanzımanın kusursuz vites geçişleri', 'Muazzam ikinci el talebi ve modifiye potansiyeli'],
    cons: ['Yaşlanan multimedya sistemi (NBT ekran)', 'N13 motorda soğutma suyu ve yağ kaçaklarına dikkat edilmeli']
  },
  {
    id: 'toyota-corolla-hybrid',
    name: 'Toyota Corolla 1.8 Hybrid Passion X-Pack',
    brand: 'Toyota',
    segment: 'Sedan',
    bodyType: 'Sedan',
    year: 2025,
    fuel: 'Tam Hibrit',
    badge: 'Dünya Klasiği',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=1200',
    summary: 'TNGA platformunun getirdiği bağımsız arka süspansiyon konforu ve 5. nesil kendi kendini şarj eden hibrit teknolojisiyle sorunsuzluğun simgesi.',
    specs: { power: '140 PS (Kombine)', acceleration: '9.3 sn', topSpeed: '180 km/s', transmission: 'e-CVT Otomatik', consumption: '4.3 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 8.1, 'Güvenlik': 9.6, 'Konfor': 8.9, 'Tüketim / Verimlilik': 9.8, 'Malzeme Kalitesi': 8.4, 'Tasarım': 8.6, 'Teknoloji': 8.7, 'Fiyat / Performans': 9.3 },
    pros: ['Şehir içinde 4.0 - 4.5 lt bandında rekor tüketim', 'Arka bağımsız süspansiyon ile çok konforlu sönümleme', 'Yıllar boyu arıza çıkarmayan hibrit mekaniği'],
    cons: ['Ani hızlanmalarda e-CVT şanzımanın motoru yüksek devirde tutması', 'Bagaj hacmi hibrit aküsü sebebiyle 471 litre']
  },
  {
    id: 'renault-megane-sedan',
    name: 'Renault Megane Sedan 1.3 TCe Icon',
    brand: 'Renault',
    segment: 'Sedan',
    bodyType: 'Sedan',
    year: 2024,
    fuel: 'Benzin',
    badge: 'Türkiye nin Sedanı',
    image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=1200',
    summary: 'C şeklinde LED far imzası, Mercedes ile ortak geliştirilen 1.3 TCe canlı turbo motoru ve devasa 550 litrelik bagajıyla ailelerin ilk tercihi.',
    specs: { power: '140 PS / 240 Nm', acceleration: '9.0 sn', topSpeed: '205 km/s', transmission: '7 İleri EDC Çift Kavrama', consumption: '5.9 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 8.0, 'Güvenlik': 8.8, 'Konfor': 8.6, 'Tüketim / Verimlilik': 8.7, 'Malzeme Kalitesi': 8.2, 'Tasarım': 8.9, 'Teknoloji': 8.3, 'Fiyat / Performans': 9.0 },
    pros: ['1.3 TCe motorun alt devirlerdeki atak performansı', '550 litrelik geniş ve derin bagaj hacmi', 'Yedek parça ve servis ağının yaygınlığı'],
    cons: ['Arka torsiyon çubuğu bozuk yollarda sekme yapabilir', 'R-Link multimedya arayüzü modern rakiplerin biraz gerisinde']
  },
  {
    id: 'fiat-egea-lounge',
    name: 'Fiat Egea 1.6 MultiJet Lounge',
    brand: 'Fiat',
    segment: 'Sedan',
    bodyType: 'Sedan',
    year: 2024,
    fuel: 'Dizel',
    badge: 'Satış Şampiyonu',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
    summary: 'Türkiye yollarının vazgeçilmezi. 320 Nm tork üreten güçlü MultiJet dizel motoru, uygun parça maliyeti ve Lounge donanımın dijital kadranı.',
    specs: { power: '130 PS / 320 Nm', acceleration: '9.6 sn', topSpeed: '200 km/s', transmission: '6 İleri DCT Otomatik', consumption: '4.7 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 7.6, 'Güvenlik': 7.9, 'Konfor': 7.9, 'Tüketim / Verimlilik': 9.5, 'Malzeme Kalitesi': 7.2, 'Tasarım': 7.9, 'Teknoloji': 7.8, 'Fiyat / Performans': 9.8 },
    pros: ['1.6 MultiJet dizelin çok güçlü ara hızlanmaları', 'Bakım, sigorta ve yedek parça maliyetlerinin çok ekonomik olması', '520 litrelik geniş bagaj ve ferah kabin'],
    cons: ['Yüksek hızlarda kabine sızan yol ve rüzgar sesi', 'Kapı içlerinde ve torpido altında sert plastik kullanımı']
  },
  {
    id: 'renault-symbol-dci',
    name: 'Renault Symbol 1.5 dCi Joy',
    brand: 'Renault',
    segment: 'Sedan / B-Segment',
    bodyType: 'Sedan',
    year: 2020,
    fuel: 'Dizel',
    badge: 'Tasarruf Efsanesi',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200',
    summary: 'Koklamayı andıran yakıt tüketimiyle bilinen K9K motor, yüksek yerden yükseklik ve her türlü zorlu Anadolu yoluna meydan okuyan sağlam alt takım.',
    specs: { power: '95 PS / 220 Nm', acceleration: '11.9 sn', topSpeed: '175 km/s', transmission: '5 İleri Manuel', consumption: '3.9 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 6.8, 'Güvenlik': 6.9, 'Konfor': 7.0, 'Tüketim / Verimlilik': 9.9, 'Malzeme Kalitesi': 6.3, 'Tasarım': 6.7, 'Teknoloji': 6.2, 'Fiyat / Performans': 9.7 },
    pros: ['Uzun yolda 3.5 - 4.0 lt ile Türkiye nin en cimri motoru', 'Bozuk köy ve stabilize yollara dayanıklı süspansiyon', '510 litrelik büyük bagaj kapasitesi'],
    cons: ['Hafif gövde sebebiyle yüksek hızda rüzgardan etkilenme', 'Çok sade ve sert plastik ağırlıklı kabin']
  },
  {
    id: 'vw-polo-style',
    name: 'Volkswagen Polo 1.0 TSI Style',
    brand: 'Volkswagen',
    segment: 'Hatchback',
    bodyType: 'Hatchback',
    year: 2024,
    fuel: 'Benzin',
    badge: 'Küçük Golf',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1200',
    summary: 'IQ.Light matrix LED farlar, dijital gösterge paneli ve Golf konforunu aratmayan yalıtımı ile B segmentinin en olgun ve kaliteli temsilcisi.',
    specs: { power: '110 PS / 200 Nm', acceleration: '10.2 sn', topSpeed: '195 km/s', transmission: '7 İleri DSG', consumption: '5.2 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 8.6, 'Güvenlik': 9.3, 'Konfor': 9.0, 'Tüketim / Verimlilik': 8.9, 'Malzeme Kalitesi': 8.9, 'Tasarım': 8.6, 'Teknoloji': 9.0, 'Fiyat / Performans': 8.4 },
    pros: ['Sınıfının en sessiz kabini ve üst segment sürüş olgunluğu', 'IQ.Light matrix farların gece aydınlatma başarısı', '351 litrelik kullanışlı ve derin bagaj'],
    cons: ['Fiyat etiketinin C segmenti araçlara yaklaşması', 'DSG şanzımanın yoğun trafikte ısınma hassasiyeti']
  },
  {
    id: 'opel-astra-gs',
    name: 'Opel Astra 1.2 Turbo GS Line',
    brand: 'Opel',
    segment: 'Hatchback',
    bodyType: 'Hatchback',
    year: 2025,
    fuel: 'Benzin',
    badge: 'Vizör Tasarım',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1200',
    summary: 'Opel Vizör siyah ön paneli, AGR onaylı ortopedik masajlı koltukları ve Pure Panel çift geniş ekranı ile sınıfının en cesur Alman hatchback modeli.',
    specs: { power: '130 PS / 230 Nm', acceleration: '9.7 sn', topSpeed: '210 km/s', transmission: '8 İleri EAT8 Otomatik', consumption: '5.6 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 8.6, 'Güvenlik': 9.1, 'Konfor': 8.8, 'Tüketim / Verimlilik': 8.6, 'Malzeme Kalitesi': 8.7, 'Tasarım': 9.5, 'Teknoloji': 9.0, 'Fiyat / Performans': 8.8 },
    pros: ['AGR sertifikalı ergonomik spor koltuklar', 'EAT8 tam otomatik tork konvertörlü şanzımanın pürüzsüzlüğü', 'Cesur ve fütüristik Opel Vizor ön ızgara'],
    cons: ['Arka diz mesafesi uzun boylular için ortalama', 'Piyano siyahı ön konsol kolay toz topluyor']
  },
  {
    id: 'opel-corsa-gs',
    name: 'Opel Corsa 1.2 Turbo GS',
    brand: 'Opel',
    segment: 'Hatchback',
    bodyType: 'Hatchback',
    year: 2024,
    fuel: 'Benzin',
    badge: 'Şehirli Çevik',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
    summary: 'Yenilenen Vizor ön yüzü, çift renkli tavanı, 8 ileri tork konvertörlü sorunsuz şanzımanı ve canlı turbo motoruyla dinamik şehir otomobili.',
    specs: { power: '100 PS / 205 Nm', acceleration: '10.8 sn', topSpeed: '192 km/s', transmission: '8 İleri Otomatik', consumption: '5.4 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 8.4, 'Güvenlik': 8.8, 'Konfor': 8.2, 'Tüketim / Verimlilik': 8.8, 'Malzeme Kalitesi': 8.1, 'Tasarım': 9.0, 'Teknoloji': 8.4, 'Fiyat / Performans': 8.9 },
    pros: ['8 ileri otomatik şanzımanın konforu ve dayanıklılığı', 'Şehir içi dar park yerlerinde kıvrak direksiyon turu', 'Sportif çift renkli gövde kombinasyonu'],
    cons: ['Arka kapı açısı dar, iniş binişler biraz kısıtlı', 'Arka süspansiyon kasis geçişlerinde tok fakat sert']
  },

  // --- ÖNCEKİ LÜKS VE PERFORMANS LİDERLERİ ---
  {
    id: 'porsche-taycan-turbo-s',
    name: 'Porsche Taycan Turbo S',
    brand: 'Porsche',
    segment: 'Elektrikli / Spor',
    bodyType: 'Sedan / GT',
    year: 2025,
    fuel: 'Elektrik',
    badge: 'Elektrik Şampiyonu',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1200',
    summary: 'Elektrikli mobilitede pist dinamiklerinin zirvesi. 800V mimarisi ve aktif süspansiyon geometrisiyle süper spor otomobilleri kıskandırıyor.',
    specs: { power: '761 PS / 1050 Nm', acceleration: '2.8 sn', topSpeed: '260 km/s', transmission: '2 İleri Otomatik', consumption: '21.5 kWh/100km' },
    scores: { 'Sürüş Dinamikleri': 9.9, 'Güvenlik': 9.6, 'Konfor': 9.1, 'Tüketim / Verimlilik': 8.6, 'Malzeme Kalitesi': 9.8, 'Tasarım': 9.9, 'Teknoloji': 9.8, 'Fiyat / Performans': 7.1 },
    pros: ['Kusursuz direksiyon hissi ve viraj dengesi', 'Pist koşullarında bile tekrarlanabilir roket hızlanma', '800V ultra hızlı şarj altyapısı'],
    cons: ['Opsiyon listesi ve vergi yükü çok yüksek', 'Arka koltuk baş mesafesi uzun boylular için kısıtlı']
  },
  {
    id: 'porsche-911-carrera-s',
    name: 'Porsche 911 Carrera S (992)',
    brand: 'Porsche',
    segment: 'Spor',
    bodyType: 'Coupe',
    year: 2024,
    fuel: 'Benzin',
    badge: 'Saf İkon',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    summary: 'Arka aksa yerleştirilen boxer 6 silindir motorun kusursuz harmonisi. Günlük kullanıma en uygun süper spor otomobil olma unvanını koruyor.',
    specs: { power: '450 PS / 530 Nm', acceleration: '3.5 sn', topSpeed: '308 km/s', transmission: '8 İleri PDK', consumption: '10.2 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 10.0, 'Güvenlik': 9.3, 'Konfor': 8.4, 'Tüketim / Verimlilik': 7.2, 'Malzeme Kalitesi': 9.7, 'Tasarım': 9.9, 'Teknoloji': 9.3, 'Fiyat / Performans': 7.6 },
    pros: ['Sektörün en iyi çift kavramalı şanzımanı PDK', 'Efsanevi boxer motor sesi ve keskin şasi', 'Yüksek ikinci el değeri'],
    cons: ['Dar arka koltuklar sadece çanta için', 'Kabin içi yol gürültüsü geniş lastiklerle artıyor']
  },
  {
    id: 'bmw-m3-competition',
    name: 'BMW M3 Competition xDrive (G80)',
    brand: 'BMW',
    segment: 'Spor',
    bodyType: 'Sedan',
    year: 2025,
    fuel: 'Benzin',
    badge: 'Pist Canavarı',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200',
    summary: '510 beygirlik S58 çift turbo motor ve arkaya ağırlık veren xDrive akıllı çekiş sistemi ile asfaltı yırtan süper sedan.',
    specs: { power: '510 PS / 650 Nm', acceleration: '3.5 sn', topSpeed: '290 km/s', transmission: '8 İleri M Steptronic', consumption: '10.1 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 9.8, 'Güvenlik': 9.4, 'Konfor': 7.9, 'Tüketim / Verimlilik': 6.8, 'Malzeme Kalitesi': 9.3, 'Tasarım': 9.2, 'Teknoloji': 9.6, 'Fiyat / Performans': 7.8 },
    pros: ['Patlayıcı turbo torku ve keskin ön aks tepkileri', 'Arkadan itiş moduna tek tuşla geçiş', 'Karbon çanak koltuklar muhteşem sarıyor'],
    cons: ['Oldukça sert süspansiyon şehir içinde yorabilir', 'Ön dikey böbrek ızgara tasarımı tartışmalı']
  },
  {
    id: 'audi-rs6-avant',
    name: 'Audi RS6 Avant Performance',
    brand: 'Audi',
    segment: 'Spor / Station',
    bodyType: 'Station Wagon',
    year: 2024,
    fuel: 'Mild-Hybrid Benzin',
    badge: 'Aile Roketi',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200',
    summary: '630 beygirlik çift turbolu V8 canavar, 565 litrelik dev bagajla birleşiyor. Ailenizle tatile giderken süper sporları sollayın.',
    specs: { power: '630 PS / 850 Nm', acceleration: '3.4 sn', topSpeed: '305 km/s', transmission: '8 İleri Tiptronic', consumption: '12.4 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 9.4, 'Güvenlik': 9.7, 'Konfor': 9.3, 'Tüketim / Verimlilik': 6.2, 'Malzeme Kalitesi': 9.8, 'Tasarım': 9.9, 'Teknoloji': 9.7, 'Fiyat / Performans': 7.4 },
    pros: ['Genişletilmiş gövde kitinin vahşi duruşu', 'Kusursuz Quattro dört çeker tutuşu', 'Lüks limuzin konforu ile süper otomobil performansı'],
    cons: ['Şehir içinde yüksek yakıt tüketimi', '2.1 tonu aşan boş ağırlık virajlarda hissediliyor']
  },
  {
    id: 'bmw-320i-msport',
    name: 'BMW 320i M Sport (G20)',
    brand: 'BMW',
    segment: 'Sedan',
    bodyType: 'Sedan',
    year: 2024,
    fuel: 'Benzin',
    badge: 'D-Segment Lideri',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
    summary: 'D segmentinin modern referans noktası. 50:50 ağırlık dengesi, kavisli ekranı ve sportif ZF şanzımanı.',
    specs: { power: '170 PS / 250 Nm', acceleration: '7.6 sn', topSpeed: '232 km/s', transmission: '8 İleri Steptronic', consumption: '6.7 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 9.1, 'Güvenlik': 9.3, 'Konfor': 8.6, 'Tüketim / Verimlilik': 7.9, 'Malzeme Kalitesi': 9.0, 'Tasarım': 9.2, 'Teknoloji': 9.0, 'Fiyat / Performans': 8.2 },
    pros: ['Mükemmel viraj dengesi ve şasi rijitliği', 'Pürüzsüz ve hızlı ZF şanzıman geçişleri', 'Kavisli çift ekranlı modern iDrive kokpiti'],
    cons: ['M Sport süspansiyon engebelerde sert gelebilir', 'Arka şaft tüneli bacak alanını daraltıyor']
  },
  {
    id: 'mercedes-e300d-4matic',
    name: 'Mercedes-Benz E300d 4MATIC Exclusive',
    brand: 'Mercedes-Benz',
    segment: 'Sedan',
    bodyType: 'Sedan',
    year: 2025,
    fuel: 'Mild-Hybrid Dizel',
    badge: 'Otoyol Hükümdarı',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200',
    summary: 'Superscreen ön konsol paneli, aerodinamik sessizlik ve 1200 km menzil sunan verimli dizel-hibrit motor ile kusursuz iş sedanı.',
    specs: { power: '265 + 23 PS / 550 Nm', acceleration: '6.3 sn', topSpeed: '250 km/s', transmission: '9G-TRONIC', consumption: '5.4 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 8.7, 'Güvenlik': 9.9, 'Konfor': 9.9, 'Tüketim / Verimlilik': 9.2, 'Malzeme Kalitesi': 9.8, 'Tasarım': 9.4, 'Teknoloji': 9.9, 'Fiyat / Performans': 8.0 },
    pros: ['Akıl almaz uzun yol konforu ve ses izolasyonu', 'Depoyu unutturan 5.4 lt dizel verimliliği', 'MBUX Superscreen teknolojisi'],
    cons: ['Yüksek satın alma maliyeti', 'Büyük boyutlar sebebiyle dar alanlarda dikkat gerektiriyor']
  },
  {
    id: 'vw-golf-rline',
    name: 'Volkswagen Golf 1.5 eTSI R-Line',
    brand: 'Volkswagen',
    segment: 'Hatchback',
    bodyType: 'Hatchback',
    year: 2024,
    fuel: 'Mild-Hybrid Benzin',
    badge: 'Kompakt Referans',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200',
    summary: '50 yıllık ikonik hatchback genleri. Güncellenen aydınlatmalı multimedya ekranı ve R-Line dinamik gövde kiti ile çok yönlü kullanım.',
    specs: { power: '150 PS / 250 Nm', acceleration: '8.5 sn', topSpeed: '224 km/s', transmission: '7 İleri DSG', consumption: '5.6 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 8.5, 'Güvenlik': 9.2, 'Konfor': 8.7, 'Tüketim / Verimlilik': 8.9, 'Malzeme Kalitesi': 8.5, 'Tasarım': 8.6, 'Teknoloji': 8.8, 'Fiyat / Performans': 8.7 },
    pros: ['Harika iç hacim ve ergonomik görüş açıları', 'Düşük yakıt tüketimi sunan silindir kapatma sistemi', 'Yumuşak ve dengeli süspansiyon ayarı'],
    cons: ['Direksiyondaki dokunmatik tuşlar bazen alışkanlık istiyor', 'Daha fazla fiziksel klima butonu olabilirdi']
  },
  {
    id: 'cupra-leon',
    name: 'Cupra Leon 1.5 eTSI',
    brand: 'Cupra',
    segment: 'Hatchback',
    bodyType: 'Hatchback',
    year: 2024,
    fuel: 'Mild-Hybrid Benzin',
    badge: 'Asi Tasarım',
    image: 'https://images.unsplash.com/photo-1621644782015-8178121dcbab?auto=format&fit=crop&q=80&w=1200',
    summary: 'Bakır detaylar, agresif ön ızgara ve sportif egzoz difüzörü ile standart hatchback platformunu heyecan verici bir sporcuya dönüştürüyor.',
    specs: { power: '150 PS / 250 Nm', acceleration: '8.7 sn', topSpeed: '214 km/s', transmission: '7 İleri DSG', consumption: '6.0 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 8.9, 'Güvenlik': 8.9, 'Konfor': 8.1, 'Tüketim / Verimlilik': 8.2, 'Malzeme Kalitesi': 8.4, 'Tasarım': 9.5, 'Teknoloji': 8.6, 'Fiyat / Performans': 8.8 },
    pros: ['Yolda bakışları üzerine çeken bakır detaylı tasarım', 'Standart hatchback modellere göre daha sert ve canlı şasi', 'Çok zengin standart donanım'],
    cons: ['Sert yaylar çukurlu yollarda hissettiriyor', 'Klima kontrolleri tamamen ekrana gömülü']
  },
  {
    id: 'tesla-model-y-lr',
    name: 'Tesla Model Y Long Range',
    brand: 'Tesla',
    segment: 'Elektrikli / SUV',
    bodyType: 'SUV',
    year: 2025,
    fuel: 'Elektrik',
    badge: 'Elektrik SUV Lideri',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200',
    summary: 'Dünyanın en çok satan SUV modeli. Çift motorlu AWD sistemi, dev cam tavanı ve 2100 litreye varan toplam saklama alanı.',
    specs: { power: '450 PS / Çift Motor', acceleration: '5.0 sn', topSpeed: '217 km/s', transmission: 'Tek Vites', consumption: '16.9 kWh/100km' },
    scores: { 'Sürüş Dinamikleri': 8.6, 'Güvenlik': 9.9, 'Konfor': 8.8, 'Tüketim / Verimlilik': 9.8, 'Malzeme Kalitesi': 8.4, 'Tasarım': 8.5, 'Teknoloji': 9.9, 'Fiyat / Performans': 9.2 },
    pros: ['Sınıfının en verimli batarya ve menzil yönetimi', 'Supercharger istasyon ekosistemi kolaylığı', 'Akıl almaz ön ve arka bagaj hacmi'],
    cons: ['Gösterge panelinin olmaması sadece orta ekrana baktırıyor', 'Büyük jantlarla süspansiyon biraz sert']
  },
  {
    id: 'volvo-xc60-b5',
    name: 'Volvo XC60 B5 AWD Plus',
    brand: 'Volvo',
    segment: 'SUV',
    bodyType: 'SUV',
    year: 2024,
    fuel: 'Mild-Hybrid Benzin',
    badge: 'Güvenlik Zirvesi',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
    summary: 'Ortopedik İskandinav koltukları, Bor çeliği kafesi ve dahili Google asistanı ile huzur ve güven dolu bir lüks SUV deneyimi.',
    specs: { power: '250 PS / 350 Nm', acceleration: '6.9 sn', topSpeed: '180 km/s (Limitli)', transmission: '8 İleri Geartronic', consumption: '7.6 lt/100km' },
    scores: { 'Sürüş Dinamikleri': 8.2, 'Güvenlik': 10.0, 'Konfor': 9.6, 'Tüketim / Verimlilik': 8.1, 'Malzeme Kalitesi': 9.4, 'Tasarım': 9.1, 'Teknoloji': 9.3, 'Fiyat / Performans': 8.4 },
    pros: ['Sektörün en güvenli gövde mimarisi ve otonom frenleme', 'Bowers & Wilkins ses sistemi mükemmel', 'Zarif, abartısız ve asil İskandinav stili'],
    cons: ['Maksimum hız 180 km/s ile limitli', 'Virajlarda gövde salınımı biraz fazla']
  }
];

const calculateAverage = (scores) => {
  const vals = Object.values(scores);
  const sum = vals.reduce((acc, curr) => acc + curr, 0);
  return (sum / vals.length).toFixed(1);
};

export default function App() {
  const [activeTab, setActiveTab] = useState('latest'); // 'latest' | 'all' | 'compare'
  const [selectedCarModal, setSelectedCarModal] = useState(null);

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('ALL');
  const [selectedFuel, setSelectedFuel] = useState('ALL');
  const [sortBy, setSortBy] = useState('score-desc');

  // Side-by-Side Comparator States
  const [compareCar1Id, setCompareCar1Id] = useState('bmw-f30-320i-ed');
  const [compareCar2Id, setCompareCar2Id] = useState('mercedes-c200d-amg');

  const segments = useMemo(() => ['ALL', 'Sedan', 'Hatchback', 'SUV', 'Spor', 'Elektrikli'], []);
  const fuels = useMemo(() => ['ALL', 'Benzin', 'Dizel', 'Mild-Hybrid Dizel', 'Tam Hibrit', 'Elektrik'], []);

  const filteredCars = useMemo(() => {
    return CARS_DATABASE.filter(car => {
      const matchSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (car.badge && car.badge.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchSegment = selectedSegment === 'ALL' || 
                           car.segment.toLowerCase().includes(selectedSegment.toLowerCase()) ||
                           car.bodyType.toLowerCase().includes(selectedSegment.toLowerCase());

      const matchFuel = selectedFuel === 'ALL' || car.fuel === selectedFuel;

      return matchSearch && matchSegment && matchFuel;
    }).sort((a, b) => {
      const scoreA = parseFloat(calculateAverage(a.scores));
      const scoreB = parseFloat(calculateAverage(b.scores));
      if (sortBy === 'score-desc') return scoreB - scoreA;
      if (sortBy === 'score-asc') return scoreA - scoreB;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'year-desc') return b.year - a.year;
      return 0;
    });
  }, [searchQuery, selectedSegment, selectedFuel, sortBy]);

  // Featured first 6 cars for showcase (showing the newly requested highlights)
  const latestCars = useMemo(() => CARS_DATABASE.slice(0, 6), []);

  const car1 = CARS_DATABASE.find(c => c.id === compareCar1Id) || CARS_DATABASE[0];
  const car2 = CARS_DATABASE.find(c => c.id === compareCar2Id) || CARS_DATABASE[1];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-rose-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/3 w-[800px] h-[500px] bg-rose-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[180px]" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('latest')}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 via-red-600 to-amber-700 flex items-center justify-center shadow-lg shadow-rose-600/20 border border-rose-500/30 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-white">OTO<span className="text-rose-500">KRİTİK</span></span>
                <span className="text-[10px] font-extrabold tracking-widest uppercase bg-rose-500/20 text-rose-400 border border-rose-500/40 px-2 py-0.5 rounded-md">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">8 Kriterli Bağımsız Test & İnceleme Otoritesi</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl shadow-xl">
            <button
              onClick={() => setActiveTab('latest')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'latest'
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>En Güncel İncelemeler</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Tüm Araçlar ({CARS_DATABASE.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'compare'
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">Karşılaştır</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

        {/* TAB 1: EN GÜNCEL İNCELEMELER */}
        {activeTab === 'latest' && (
          <div className="space-y-12">
            {/* Editorial Showcase Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0e121d] to-rose-950/40 border border-slate-800 p-8 sm:p-12 shadow-2xl">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold tracking-wide">
                  <Flame className="w-3.5 h-3.5 fill-rose-400" />
                  <span>Yeni Eklenen Türkiye & Dünya Favorileri Yayında</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Her Araca Tarafsız Bakış, <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-400 to-amber-400">
                    8 Başlıkta Küsuratlı Puanlar.
                  </span>
                </h1>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  İster efsanevi F30 320i ED, ister Türkiye'nin çok satanları Egea, Symbol, Corolla, Megane, Polo, Astra veya ultra lüks BMW i7... Her otomobil aynı bağımsız editöryal standartlarla test edildi.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveTab('all')} 
                    className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all shadow-lg shadow-rose-600/30 flex items-center space-x-2"
                  >
                    <span>Tüm Araçları Listele ({CARS_DATABASE.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      setCompareCar1Id('bmw-f30-320i-ed');
                      setCompareCar2Id('mercedes-c200d-amg');
                      setActiveTab('compare');
                    }} 
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center space-x-2"
                  >
                    <Scale className="w-4 h-4 text-rose-400" />
                    <span>F30 vs C200d Kıyaslaması</span>
                  </button>
                </div>
              </div>

              {/* 8 Evaluation Metrics Bar */}
              <div className="mt-10 pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {CRITERIA_META.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.key} className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl flex flex-col items-center justify-center space-y-1 text-center">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-[11px] font-bold text-slate-300 line-clamp-1">{item.key}</span>
                      <span className="text-[10px] text-slate-500 font-semibold">10 Üzerinden</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Cards */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-rose-500" />
                    Öne Çıkan Son İncelemeler
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">Son eklenen popüler sedan ve elektrikli amiral modeller</p>
                </div>
                <button 
                  onClick={() => setActiveTab('all')} 
                  className="text-xs sm:text-sm text-rose-400 hover:text-rose-300 font-bold flex items-center space-x-1"
                >
                  <span>Tüm Araçlar Sekmesine Git ({CARS_DATABASE.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestCars.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    onOpenModal={() => setSelectedCarModal(car)}
                    onCompare={() => {
                      setCompareCar1Id(car.id);
                      setActiveTab('compare');
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TÜM ARAÇLAR (ALL CARS WITH FULL DATA & SEARCH) */}
        {activeTab === 'all' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Tüm Araç İncelemeleri</h1>
                <p className="text-sm text-slate-400 mt-1">
                  En güncel incelemeler de dahil olmak üzere veritabanımızdaki {CARS_DATABASE.length} aracın tümü bu alandadır.
                </p>
              </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Search Bar */}
                <div className="relative md:col-span-6">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Araç adı, marka, motor ara... (Örn: Corolla, Egea, F30, Symbol, i7)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Fuel Filter */}
                <div className="md:col-span-3">
                  <select
                    value={selectedFuel}
                    onChange={(e) => setSelectedFuel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-rose-500 transition-colors"
                  >
                    <option value="ALL">Tüm Yakıt Tipleri</option>
                    {fuels.filter(f => f !== 'ALL').map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Order */}
                <div className="md:col-span-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-rose-500 transition-colors"
                  >
                    <option value="score-desc">Puan: En Yüksekten En Düşüğe</option>
                    <option value="score-asc">Puan: En Düşükten En Yükseğe</option>
                    <option value="name-asc">Model Adı (A - Z)</option>
                    <option value="year-desc">Model Yılı (Yeni - Eski)</option>
                  </select>
                </div>
              </div>

              {/* Segment Filtering Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80">
                <span className="text-xs text-slate-500 font-bold uppercase mr-2 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" /> Kasa / Segment:
                </span>
                {segments.map(seg => (
                  <button
                    key={seg}
                    onClick={() => setSelectedSegment(seg)}
                    className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                      selectedSegment === seg
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {seg === 'ALL' ? 'Tümü' : seg}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count & Reset */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Listelenen Model: <strong className="text-white font-bold">{filteredCars.length}</strong> / {CARS_DATABASE.length}</span>
              {(searchQuery || selectedSegment !== 'ALL' || selectedFuel !== 'ALL') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSegment('ALL');
                    setSelectedFuel('ALL');
                  }}
                  className="text-rose-400 hover:underline font-bold"
                >
                  Filtreleri Sıfırla
                </button>
              )}
            </div>

            {/* Catalog Grid */}
            {filteredCars.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-16 text-center space-y-3">
                <Car className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">Aramanıza uygun araç bulunamadı</h3>
                <p className="text-sm text-slate-400">Lütfen model adını kontrol edin veya filtreleri temizleyin.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onOpenModal={() => setSelectedCarModal(car)}
                    onCompare={() => {
                      setCompareCar1Id(car.id);
                      setActiveTab('compare');
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: KARŞILAŞTIRMA (SIDE-BY-SIDE COMPARATOR) */}
        {activeTab === 'compare' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">Otomobil Karşılaştırma</h1>
              <p className="text-sm text-slate-400 mt-1">
                Katalogdaki herhangi iki otomobili seçip 8 değerlendirme metriği ve teknik verilerini yan yana kıyaslayın.
              </p>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <div className="space-y-2">
                <label className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> 1. Araç Seçimi
                </label>
                <select
                  value={compareCar1Id}
                  onChange={(e) => setCompareCar1Id(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:border-rose-500 transition-colors"
                >
                  {CARS_DATABASE.map(c => (
                    <option key={c.id} value={c.id} disabled={c.id === compareCar2Id}>
                      {c.name} — ({calculateAverage(c.scores)} / 10)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> 2. Araç Seçimi
                </label>
                <select
                  value={compareCar2Id}
                  onChange={(e) => setCompareCar2Id(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:border-sky-500 transition-colors"
                >
                  {CARS_DATABASE.map(c => (
                    <option key={c.id} value={c.id} disabled={c.id === compareCar1Id}>
                      {c.name} — ({calculateAverage(c.scores)} / 10)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Top Cards Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { car: car1, color: 'text-rose-400', tag: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
                { car: car2, color: 'text-sky-400', tag: 'bg-sky-500/10 text-sky-400 border-sky-500/30' }
              ].map(({ car, color, tag }) => (
                <div key={car.id} className="bg-slate-900/70 border border-slate-800 rounded-3xl overflow-hidden p-6 space-y-4">
                  <div className="relative h-56 rounded-2xl overflow-hidden">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Genel Puan</div>
                      <div className={`text-2xl font-black ${color}`}>
                        {calculateAverage(car.scores)} <span className="text-xs text-slate-500">/ 10</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${tag}`}>
                      {car.segment} • {car.fuel}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-2">{car.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{car.summary}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 8 Kriter Karşılaştırma Çubukları */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-rose-500" />
                  <h3 className="text-lg font-black text-white">8 Ana Kriterde Birebir Puan Karşılaştırması</h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Kazanan kriter yeşil vurgu ile gösterilir</span>
              </div>

              <div className="space-y-4">
                {CRITERIA_META.map(item => {
                  const score1 = car1.scores[item.key];
                  const score2 = car2.scores[item.key];
                  const winner = score1 > score2 ? 1 : score2 > score1 ? 2 : 0;
                  const Icon = item.icon;

                  return (
                    <div key={item.key} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                        <span className={`flex items-center gap-1.5 ${winner === 1 ? 'text-emerald-400 font-black' : 'text-slate-300'}`}>
                          {score1.toFixed(1)} {winner === 1 && '🏆'}
                        </span>

                        <div className="flex items-center gap-2 text-slate-200">
                          <Icon className={`w-4 h-4 ${item.color}`} />
                          <span>{item.key}</span>
                        </div>

                        <span className={`flex items-center gap-1.5 ${winner === 2 ? 'text-emerald-400 font-black' : 'text-slate-300'}`}>
                          {winner === 2 && '🏆'} {score2.toFixed(1)}
                        </span>
                      </div>

                      {/* Opposing Progress Bar */}
                      <div className="grid grid-cols-2 gap-2 h-2.5">
                        <div className="bg-slate-800 rounded-l-full overflow-hidden flex justify-end">
                          <div
                            className={`h-full rounded-l-full transition-all duration-500 ${
                              winner === 1 ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${(score1 / 10) * 100}%` }}
                          />
                        </div>

                        <div className="bg-slate-800 rounded-r-full overflow-hidden">
                          <div
                            className={`h-full rounded-r-full transition-all duration-500 ${
                              winner === 2 ? 'bg-emerald-500' : 'bg-sky-500'
                            }`}
                            style={{ width: `${(score2 / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Specs Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-slate-800 bg-slate-950/50">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-rose-500" />
                  Teknik Veri Karşılaştırması
                </h3>
              </div>
              <div className="divide-y divide-slate-800 text-xs sm:text-sm">
                {[
                  { label: 'Motor & Güç', key1: car1.specs.power, key2: car2.specs.power },
                  { label: '0-100 km/s Hızlanma', key1: car1.specs.acceleration, key2: car2.specs.acceleration },
                  { label: 'Maksimum Hız', key1: car1.specs.topSpeed, key2: car2.specs.topSpeed },
                  { label: 'Şanzıman Mimarisi', key1: car1.specs.transmission, key2: car2.specs.transmission },
                  { label: 'Tüketim / Menzil', key1: car1.specs.consumption, key2: car2.specs.consumption },
                  { label: 'Yakıt Tipi', key1: car1.fuel, key2: car2.fuel }
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 p-4 hover:bg-slate-800/30 transition-colors">
                    <div className="font-bold text-slate-200 text-left">{row.key1}</div>
                    <div className="text-slate-400 font-medium text-center">{row.label}</div>
                    <div className="font-bold text-slate-200 text-right">{row.key2}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* DETAILED MODAL POPUP */}
      {selectedCarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCarModal(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-rose-600 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedCarModal.image}
                alt={selectedCarModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/15 px-3 py-1 rounded-md border border-rose-500/30">
                    {selectedCarModal.brand} • {selectedCarModal.segment}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
                    {selectedCarModal.name}
                  </h2>
                </div>

                <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center space-x-3 self-start sm:self-auto shadow-xl">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">OtoKritik Skoru</div>
                    <div className="text-2xl font-black text-rose-500">
                      {calculateAverage(selectedCarModal.scores)} <span className="text-xs text-slate-500 font-normal">/ 10</span>
                    </div>
                  </div>
                  <Star className="w-6 h-6 text-rose-500 fill-rose-500" />
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[calc(85vh-20rem)] overflow-y-auto">
              {/* Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Editör Notu</h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedCarModal.summary}
                </p>
              </div>

              {/* 8 Kriter Çubukları */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-rose-400" />
                  8 Temel Başlıkta Değerlendirme
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CRITERIA_META.map(item => {
                    const score = selectedCarModal.scores[item.key];
                    const Icon = item.icon;
                    return (
                      <div key={item.key} className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="flex items-center gap-2 text-slate-300">
                            <Icon className={`w-4 h-4 ${item.color}`} />
                            {item.key}
                          </span>
                          <span className="font-black text-white text-sm">
                            {score.toFixed(1)} <span className="text-[10px] text-slate-500 font-normal">/ 10</span>
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.bar}`}
                            style={{ width: `${(score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Specs */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-rose-400" />
                  Teknik Özellik Kartı
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Motor Gücü</span>
                    <span className="text-xs font-bold text-white">{selectedCarModal.specs.power}</span>
                  </div>
                  <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">0-100 km/s</span>
                    <span className="text-xs font-bold text-white">{selectedCarModal.specs.acceleration}</span>
                  </div>
                  <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Son Hız</span>
                    <span className="text-xs font-bold text-white">{selectedCarModal.specs.topSpeed}</span>
                  </div>
                  <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Şanzıman</span>
                    <span className="text-xs font-bold text-white">{selectedCarModal.specs.transmission}</span>
                  </div>
                  <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Tüketim</span>
                    <span className="text-xs font-bold text-white">{selectedCarModal.specs.consumption}</span>
                  </div>
                </div>
              </div>

              {/* Artılar ve Eksiler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    Artılar (Öne Çıkanlar)
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedCarModal.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <XCircle className="w-4 h-4" />
                    Eksiler (Zayıf Yönler)
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedCarModal.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer buttons */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setCompareCar1Id(selectedCarModal.id);
                    setSelectedCarModal(null);
                    setActiveTab('compare');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-2 transition-colors"
                >
                  <Scale className="w-4 h-4 text-rose-400" />
                  Bu Aracı Kıyaslamaya Al
                </button>
                <button
                  onClick={() => setSelectedCarModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-800/80 bg-[#07090e] py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Car className="w-5 h-5 text-rose-500" />
            <span className="font-black text-white text-base tracking-tight">OTOKRİTİK PRO</span>
          </div>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            İnceleme puanları bağımsız otomotiv editörleri tarafından belirlenmektedir. Puanlar değiştirilemez ve dış sponsorluklardan etkilenmez.
          </p>
          <div className="text-[11px] text-slate-600 pt-2">
            © 2026 OtoKritik Pro. Bağımsız Otomobil İnceleme ve Karşılaştırma Portalı.
          </div>
        </div>
      </footer>
    </div>
  );
}

function CarCard({ car, onOpenModal, onCompare }) {
  const avgScore = calculateAverage(car.scores);

  return (
    <div className="group bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-slate-700 hover:shadow-2xl hover:shadow-rose-600/10 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image & Badges */}
        <div className="relative w-full h-56 overflow-hidden">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Badge */}
          {car.badge && (
            <div className="absolute top-4 left-4 bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md">
              {car.badge}
            </div>
          )}

          {/* Rating */}
          <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-1.5">
            <Star className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-base font-black text-white">{avgScore}</span>
            <span className="text-[10px] text-slate-400 font-normal">/10</span>
          </div>

          {/* Bottom quick spec pills */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-300 font-semibold">
            <span className="bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-slate-800">
              {car.specs.power}
            </span>
            <span className="bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-slate-800">
              0-100: {car.specs.acceleration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-semibold">
              <span>{car.brand} • {car.year}</span>
              <span className="text-rose-400">{car.fuel}</span>
            </div>
            <h3 className="text-lg font-black text-white group-hover:text-rose-400 transition-colors line-clamp-1">
              {car.name}
            </h3>
            <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {car.summary}
            </p>
          </div>

          {/* 4 Score Badges Preview */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            {CRITERIA_META.slice(0, 4).map(meta => (
              <div key={meta.key} className="flex items-center justify-between text-[11px] bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
                <span className="text-slate-400 truncate max-w-[90px]">{meta.key.split('/')[0]}</span>
                <span className="font-bold text-slate-200">{car.scores[meta.key]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center gap-2 border-t border-slate-800/60">
        <button
          onClick={onOpenModal}
          className="flex-1 py-2.5 rounded-xl bg-rose-600/15 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <span>8 Puanı & İncelemeyi Gör</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onCompare}
          title="Karşılaştırmaya Ekle"
          className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <Scale className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
