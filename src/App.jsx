import React, { useState, useMemo } from 'react';
import { 
  Search, Scale, ThumbsUp, Fuel, Timer, Zap, Users, ShieldAlert, 
  Award, Star, TrendingUp, Grid, ListChecks, ArrowRight, GaugeCircle, X, Check, Car, Sparkles, Filter
} from 'lucide-react';

// --- PROFESYONEL VE TAM ARŞİV (34 ARAÇ) ---
const carsData = [
  {
    id: 1, make: "Renault", model: "Megane Sedan", year: 2024, version: "1.3 TCe Icon EDC", category: "Sedan", price: 1540000,
    accentColor: "from-blue-600 to-indigo-800",
    details: { segment: "C Segmenti / Sedan", motor: "1.3 TCe 4 Silindir Turbo", güç: "140 bg", tork: "260 Nm", "0-100": "9.0 sn", "yakıt": "5.9 L/100km", bagaj: "503 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Canlı motor-EDC şanzıman uyumu", "503 litrelik geniş yükleme hacmi", "Sınıf standartlarında yumuşak süspansiyon"], eksi: ["Otoyol süratlerinde rüzgar yalıtımı zayıf", "Arka baş mesafesi uzun boylular için kısıtlı", "Orta konsolda sert plastik oranı"] },
    scores: { performans: 8.4, konfor: 8.1, tasarim: 7.8, verimlilik: 8.2, pratiklik: 8.9, teknoloji: 7.2, guvenlik: 7.6, fiyat_performans: 8.8 },
    summary: "Türkiye filo ve aile pazarının omurgası. 1.3 TCe motoru sınıf standartlarının üzerinde canlılık sunarken, geniş bagajı aile kullanımını karşılıyor."
  },
  {
    id: 2, make: "Fiat", model: "Egea Sedan", year: 2024, version: "1.6 MultiJet Lounge DCT", category: "Sedan", price: 1310000,
    accentColor: "from-emerald-700 to-teal-900",
    details: { segment: "C Segmenti / Sedan", motor: "1.6 MultiJet Turbo Dizel", güç: "130 bg", tork: "320 Nm", "0-100": "9.8 sn", "yakıt": "4.3 L/100km", bagaj: "520 L", güvenlik: "Euro NCAP 3 Yıldız", artı: ["Çok düşük yakıt sarfiyatı ve yüksek çekiş", "Türkiye geneli en ucuz parça ve servis", "Devasa bagaj hacmi"], eksi: ["Düşük kabin yalıtımı ve trim sesleri", "Güncel testlerde düşük güvenlik puanı", "Viraj dengesi zayıf"] },
    scores: { performans: 7.7, konfor: 6.9, tasarim: 6.8, verimlilik: 9.4, pratiklik: 9.3, teknoloji: 6.5, guvenlik: 5.9, fiyat_performans: 9.7 },
    summary: "Fiyat/performans ve işletme maliyetinde Türkiye lideri. Yüksek torklu dizel ünitesi çok ekonomik ancak sürüş dinamikleri ve güvenlik çağın gerisinde."
  },
  {
    id: 3, make: "Toyota", model: "Corolla", year: 2024, version: "1.8 Hybrid Dream e-CVT", category: "Sedan", price: 1650000,
    accentColor: "from-sky-700 to-blue-900",
    details: { segment: "C Segmenti / Sedan", motor: "1.8L Self-Charging Hybrid", güç: "140 bg", tork: "185 Nm", "0-100": "9.3 sn", "yakıt": "4.5 L/100km", bagaj: "471 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Şehir içi trafikte rakipsiz yakıt tasarrufu", "Efsanevi mekanik ömür ve dayanıklılık", "Standart Toyota Safety Sense paketi"], eksi: ["Ani gaz tepkilerinde e-CVT motor bağırması", "Multimedya yazılımının basitliği", "Sınırlı arka diz mesafesi"] },
    scores: { performans: 8.1, konfor: 8.4, tasarim: 7.9, verimlilik: 9.6, pratiklik: 8.4, teknoloji: 8.2, guvenlik: 9.3, fiyat_performans: 8.7 },
    summary: "Şehir içi kullanımında yakıt cimrisi ve sorunsuzluğun simgesi. 5. nesil hibrit motor sessiz sürüş sağlarken ani hızlanmalarda e-CVT bağırması sürüyor."
  },
  {
    id: 4, make: "BMW", model: "3 Serisi", year: 2024, version: "320i M Sport (G20 LCI)", category: "Sedan", price: 3450000,
    accentColor: "from-blue-900 to-slate-900",
    details: { segment: "D Segmenti / Premium Sedan", motor: "1.6 Turbo Benzin (B48)", güç: "170 bg", tork: "250 Nm", "0-100": "7.7 sn", "yakıt": "7.1 L/100km", bagaj: "480 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Sınıfının en keskin yol tutuşu ve 50:50 denge", "Kavisli iDrive 8 ekran mimarisi", "Yüksek malzeme işçiliği"], eksi: ["M Sport sert süspansiyon", "Dar şaft tüneli nedeniyle 5 kişilik oturum zor", "Pahalı opsiyonlar"] },
    scores: { performans: 9.2, konfor: 8.6, tasarim: 9.4, verimlilik: 7.2, pratiklik: 7.9, teknoloji: 9.4, guvenlik: 9.2, fiyat_performans: 7.8 },
    summary: "D segmenti spor sedan tahtının sahibi. Keskin direksiyon tepkileri ve kusursuz ZF 8 ileri şanzımanıyla gerçek sürüş keyfi arayanların tercihi."
  },
  {
    id: 5, make: "BMW", model: "i7", year: 2024, version: "xDrive60 Excellence", category: "Elektrikli", price: 8900000,
    accentColor: "from-violet-900 to-slate-950",
    details: { segment: "F Segmenti / Ultra Lüks EV Sedan", motor: "Çift Elektrik Motoru (AWD)", güç: "544 bg", tork: "745 Nm", "0-100": "4.7 sn", "yakıt": "19.6 kWh/100km", bagaj: "500 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["31.3 inç 8K sinema ekranı", "Kusursuz kabin sessizliği", "Havalı süspansiyonla uçan halı hissi"], eksi: ["Aşırı devasa gövde ile şehir içi manevra zorluğu", "Kutuplu ön ızgara tasarımı", "2.7 tonluk ağırlık"] },
    scores: { performans: 9.5, konfor: 9.9, tasarim: 9.1, verimlilik: 8.3, pratiklik: 8.2, teknoloji: 9.9, guvenlik: 9.7, fiyat_performans: 6.8 },
    summary: "Elektrikli lüksün zirvesi. Arka koltuk yolcularına sinema salonu konforu sunarken, yüksek torku ve havalı süspansiyonuyla büyüleyici bir deneyim yaşatıyor."
  },
  {
    id: 6, make: "Volkswagen", model: "Golf", year: 2024, version: "1.5 eTSI Style DSG", category: "Hatchback", price: 1890000,
    accentColor: "from-slate-700 to-slate-900",
    details: { segment: "C Segmenti / Hatchback", motor: "1.5 eTSI Mild Hybrid", güç: "150 bg", tork: "250 Nm", "0-100": "8.5 sn", "yakıt": "5.4 L/100km", bagaj: "381 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Homojen ve dengeli sürüş hissi", "Başarılı aerodinamik ve akustik yalıtım", "eTSI yelken modu ile düşük tüketim"], eksi: ["Fiziksel tuş yoksunluğu ve karmaşık klima menüsü", "Aydınlatmasız klima kaydırma çubukları", "Yüksek etiket fiyatı"] },
    scores: { performans: 8.6, konfor: 8.7, tasarim: 8.2, verimlilik: 8.8, pratiklik: 8.3, teknoloji: 8.1, guvenlik: 9.1, fiyat_performans: 7.9 },
    summary: "Kompakt sınıfın referans noktası. Dengeli şasisi ve akıcı DSG şanzımanıyla her yola uygun bir paket sunuyor."
  },
  {
    id: 7, make: "Audi", model: "A3 Sedan", year: 2024, version: "35 TFSI Advanced S-Tronic", category: "Sedan", price: 2320000,
    accentColor: "from-neutral-800 to-stone-950",
    details: { segment: "C Premium / Sedan", motor: "1.5 TFSI MHEV", güç: "150 bg", tork: "250 Nm", "0-100": "8.4 sn", "yakıt": "5.6 L/100km", bagaj: "425 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Audi Virtual Cockpit kalitesi", "Şık ve dinamik omuz çizgisi", "Üst sınıf ses yalıtımı"], eksi: ["Kapı altlarında sert plastik kullanımı", "Dar arka cam görüş alanı", "Pahalı opsiyon listesi"] },
    scores: { performans: 8.5, konfor: 8.8, tasarim: 9.1, verimlilik: 8.4, pratiklik: 7.9, teknoloji: 9.0, guvenlik: 9.2, fiyat_performans: 7.7 },
    summary: "Kompakt sınıfta premium işçilik ve kusursuz dijital kadran deneyimi. Şık hatları ve dengeli sürüşüyle prestijli bir şehir otomobili."
  },
  {
    id: 8, make: "Mercedes-Benz", model: "C-Serisi", year: 2024, version: "C200 4MATIC AMG", category: "Sedan", price: 3850000,
    accentColor: "from-zinc-800 to-slate-950",
    details: { segment: "D Segmenti / Premium Sedan", motor: "1.5 Turbo + EQ Boost", güç: "204 bg", tork: "300 Nm", "0-100": "7.3 sn", "yakıt": "6.9 L/100km", bagaj: "455 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["S-Serisi esintili dev dikey MBUX ekran", "Olağanüstü kabin ambiyansı", "4MATIC dört çeker yol tutuş güveni"], eksi: ["AMG süspansiyon bozuk yolda sert", "Konsolun alt bölümlerinde tıkırtı riski", "Yüksek yakıt tüketimi"] },
    scores: { performans: 8.8, konfor: 8.9, tasarim: 9.5, verimlilik: 7.4, pratiklik: 7.8, teknoloji: 9.6, guvenlik: 9.4, fiyat_performans: 7.4 },
    summary: "Küçük S-Serisi unvanını hak eden devrimsel iç mekan. MBUX arayüzü ve gece ambiyans aydınlatması rakipsiz görsel şölen sunuyor."
  },
  {
    id: 9, make: "Peugeot", model: "408", year: 2024, version: "1.2 PureTech GT EAT8", category: "SUV", price: 1980000,
    accentColor: "from-cyan-900 to-slate-900",
    details: { segment: "C Segmenti / Fastback Crossover", motor: "1.2 PureTech 3 Silindir Turbo", güç: "130 bg", tork: "230 Nm", "0-100": "10.4 sn", "yakıt": "6.0 L/100km", bagaj: "536 L", güvenlik: "Euro NCAP 4 Yıldız", artı: ["Göz alıcı fastback crossover silüeti", "Fütüristik 3D i-Cockpit", "Geniş bagaj ve arka diz mesafesi"], eksi: ["Gövdeye göre 1.2 motor performans sınırında", "Alçak tavan nedeniyle arka görüş kısıtlı", "Kompakt direksiyon kadranı perdeleyebiliyor"] },
    scores: { performans: 7.4, konfor: 8.4, tasarim: 9.6, verimlilik: 8.0, pratiklik: 8.8, teknoloji: 8.7, guvenlik: 7.9, fiyat_performans: 8.2 },
    summary: "Geleneksel sedan ve SUV kalıplarını kıran iddialı tasarım ikonu. Yolda tüm bakışları üzerine çeken tasarımı ve geniş bagajıyla çok çekici."
  },
  {
    id: 10, make: "Hyundai", model: "Tucson", year: 2024, version: "1.6 CRDi Prime Plus DCT", category: "SUV", price: 2150000,
    accentColor: "from-teal-800 to-slate-900",
    details: { segment: "C-SUV", motor: "1.6 CRDi Dizel", güç: "136 bg", tork: "320 Nm", "0-100": "11.4 sn", "yakıt": "5.6 L/100km", bagaj: "598 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Parametrik gizli LED ön farlar", "Devasa bagaj ve arka bacak mesafesi", "Zengin donanım listesi"], eksi: ["Dizel motorun ilk hızlanması hantal", "Piyano siyahı yüzeyler çizilmeye açık", "Yumuşak şasi virajda gövde salınımı yapıyor"] },
    scores: { performans: 7.6, konfor: 8.6, tasarim: 9.0, verimlilik: 8.1, pratiklik: 9.4, teknoloji: 8.6, guvenlik: 8.9, fiyat_performans: 8.4 },
    summary: "Cesur parametrik tasarımı ve ferah kabiniyle ailelerin gözdesi. C-SUV liginde en pratik ve konforlu yükleme alanı sunan modellerden biri."
  },
  {
    id: 11, make: "Kia", model: "Sportage", year: 2024, version: "1.6 T-GDI Prestige DCT", category: "SUV", price: 2280000,
    accentColor: "from-emerald-900 to-slate-900",
    details: { segment: "C-SUV", motor: "1.6 T-GDI Turbo Benzin", güç: "150 bg", tork: "250 Nm", "0-100": "9.6 sn", "yakıt": "6.8 L/100km", bagaj: "591 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Kavisli çift ekran konsol mimarisi", "Yumuşak sürüş ve iyi yalıtım", "Geniş arka yaşam alanı"], eksi: ["Şehir içinde yüksek benzin sarfiyatı", "Geri görüş kamerasının netliği ortalama", "Sert yan plastikler"] },
    scores: { performans: 8.2, konfor: 8.7, tasarim: 8.8, verimlilik: 7.3, pratiklik: 9.3, teknoloji: 8.9, guvenlik: 9.0, fiyat_performans: 8.3 },
    summary: "Avangart tasarımı ve premium kavisli ekranlarıyla modern bir aile SUV'u. Yüksek konfor düzeyi sunarken tüketim değerleri sakin sürüş istiyor."
  },
  {
    id: 12, make: "Tesla", model: "Model Y", year: 2024, version: "Long Range AWD", category: "Elektrikli", price: 3150000,
    accentColor: "from-red-950 to-neutral-900",
    details: { segment: "D-SUV / Tam Elektrikli", motor: "Çift Elektrik Motoru", güç: "514 bg", tork: "493 Nm", "0-100": "5.0 sn", "yakıt": "16.9 kWh/100km", bagaj: "854 L (Toplam)", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Muazzam batarya verimliliği ve Supercharger ağı", "İnanılmaz bagaj ve depolama alanı", "Dünyanın en gelişmiş aktif güvenlik sistemi"], eksi: ["Geleneksel düğmelerin olmaması", "Sert süspansiyon yapısı", "Montaj aralığı ve boya kusurları"] },
    scores: { performans: 9.4, konfor: 7.9, tasarim: 8.2, verimlilik: 9.8, pratiklik: 9.9, teknoloji: 9.8, guvenlik: 9.9, fiyat_performans: 8.9 },
    summary: "Dünyanın en çok satan elektrikli aracı. Muazzam iç hacmi, Supercharger şarj altyapısı ve akıllı yazılımıyla elektrikli mobiliteyi baştan yazıyor."
  },
  {
    id: 13, make: "Volvo", model: "XC40", year: 2024, version: "B4 AWD Ultimate", category: "SUV", price: 2950000,
    accentColor: "from-sky-900 to-slate-950",
    details: { segment: "C-SUV / Premium", motor: "2.0 Turbo Benzin Mild Hybrid", güç: "197 bg", tork: "300 Nm", "0-100": "7.6 sn", "yakıt": "7.2 L/100km", bagaj: "452 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["İskandinav iç mimarisi ve sarsılmaz güvenlik", "Dahili Google Asistan işletim sistemi", "Kristal vites topuzu ve koltuk konforu"], eksi: ["Geniş rakiplere göre orta boy bagaj", "180 km/s fabrika hız limiti", "Şehir içi tüketim yüksek"] },
    scores: { performans: 8.5, konfor: 9.1, tasarim: 8.9, verimlilik: 7.5, pratiklik: 8.2, teknoloji: 8.9, guvenlik: 9.9, fiyat_performans: 8.0 },
    summary: "İskandinav zarafeti ve sarsılmaz güvenlik aurası. Google entegre sistemi ve kaliteli kabin materyalleriyle dingin bir seyahat sunuyor."
  },
  {
    id: 14, make: "Cupra", model: "Formentor", year: 2024, version: "1.5 TSI VZ-Line DSG", category: "SUV", price: 2190000,
    accentColor: "from-amber-950 to-slate-900",
    details: { segment: "Crossover / Coupe-SUV", motor: "1.5 TSI Turbo Benzin", güç: "150 bg", tork: "250 Nm", "0-100": "8.9 sn", "yakıt": "6.6 L/100km", bagaj: "450 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Saldırgan bakır detaylı coupe tasarımı", "Dinamik viraj kabiliyeti ve net direksiyon", "Çanak tipi spor koltuklar"], eksi: ["Klima kontrolünde aydınlatmasız panel", "Bozuk yollarda lastik sesi", "Dar arka cam görüşü"] },
    scores: { performans: 8.5, konfor: 8.1, tasarim: 9.7, verimlilik: 7.9, pratiklik: 8.1, teknoloji: 8.6, guvenlik: 9.1, fiyat_performans: 8.5 },
    summary: "Asi ruhlu, bakır detaylı tasarım şaheseri. Bir SUV'dan çok yükseltilmiş bir spor hatchback gibi hissettiren çevik sürüş dinamiklerine sahip."
  },
  {
    id: 15, make: "Skoda", model: "Octavia", year: 2024, version: "1.5 e-TEC Premium DSG", category: "Sedan", price: 1850000,
    accentColor: "from-emerald-950 to-slate-900",
    details: { segment: "C Segmenti / Liftback", motor: "1.5 TSI Mild Hybrid", güç: "150 bg", tork: "250 Nm", "0-100": "8.5 sn", "yakıt": "5.3 L/100km", bagaj: "600 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Sınıf sınırlarını aşan 600L liftback bagaj", "D segmenti düzeyinde arka diz mesafesi", "Akılcı Simply Clever çözümleri"], eksi: ["Yumuşak süspansiyon dalgalı yolda salınım yapıyor", "Multimedya açılış hızı bazen yavaş", "Sade kalan konsol çizgileri"] },
    scores: { performans: 8.4, konfor: 8.8, tasarim: 8.4, verimlilik: 8.9, pratiklik: 10, teknoloji: 8.5, guvenlik: 9.1, fiyat_performans: 9.1 },
    summary: "Pratiklik ve akılcılığın dünya şampiyonu. Liftback bagaj kapağı ve saray gibi arka yaşam alanıyla C segmentinin en mantıklı aile otomobili."
  },
  {
    id: 16, make: "Dacia", model: "Duster", year: 2024, version: "1.2 TCe 130 bg Extreme 4x4", category: "SUV", price: 1580000,
    accentColor: "from-stone-800 to-amber-950",
    details: { segment: "B-SUV / Macera & Arazi", motor: "1.2 Turbo Benzin 48V", güç: "130 bg", tork: "230 Nm", "0-100": "10.2 sn", "yakıt": "6.0 L/100km", bagaj: "472 L", güvenlik: "Euro NCAP 3 Yıldız", artı: ["Sınıfının en yetenekli mekanik 4x4 arazi kabiliyeti", "Yenilenen kaslı ve köşeli tasarım", "Yıkanabilir dayanıklı iç döşemeler"], eksi: ["Otoyolda rüzgar sesi yalıtımı zayıf", "Gelişmiş güvenlik asistanları sınırlı", "Sert plastik paneller"] },
    scores: { performans: 7.7, konfor: 7.2, tasarim: 8.6, verimlilik: 8.3, pratiklik: 9.0, teknoloji: 7.3, guvenlik: 6.2, fiyat_performans: 9.4 },
    summary: "Yeni nesliyle gerçek bir macera ikonuna dönüştü. Uygun fiyata gerçek arazi yeteneği arayan kampçılar ve doğa tutkunları için eşsiz."
  },
  {
    id: 17, make: "Honda", model: "Civic Sedan", year: 2024, version: "1.5 VTEC Turbo Elegance CVT", category: "Sedan", price: 1940000,
    accentColor: "from-rose-950 to-slate-900",
    details: { segment: "C Segmenti / Sedan", motor: "1.5 VTEC Turbo Benzin", güç: "182 bg", tork: "240 Nm", "0-100": "8.1 sn", "yakıt": "6.7 L/100km", bagaj: "512 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["182 beygirin kesintisiz ivmelenmesi", "Bal peteği retro havalandırma tasarımı", "Mükemmel yol tutuş ve gövde dengesi"], eksi: ["CVT şanzımanın motor sesini uzatması", "Bagaj kapağı iç kollarının açıkta olması", "Düşük hızlarda lastik gürültüsü"] },
    scores: { performans: 8.8, konfor: 8.3, tasarim: 8.7, verimlilik: 7.8, pratiklik: 8.7, teknoloji: 8.4, guvenlik: 9.2, fiyat_performans: 8.3 },
    summary: "182 beygirlik güçlü VTEC motoru ve yere basan dengeli şasisiyle sürüşü heyecanlı, kabini son derece şık bir Japon sedanı."
  },
  {
    id: 18, make: "Nissan", model: "Qashqai", year: 2024, version: "1.5 e-POWER Designpack", category: "SUV", price: 2240000,
    accentColor: "from-blue-950 to-slate-900",
    details: { segment: "C-SUV", motor: "1.5 Benzin Jeneratör + EV Motor", güç: "190 bg", tork: "330 Nm", "0-100": "7.9 sn", "yakıt": "5.3 L/100km", bagaj: "504 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Şarja gerek duymayan elektrikli sürüş hissi", "330 Nm anlık elektrik torku", "Yüksek kabin malzeme kalitesi"], eksi: ["Otoyol yüksek hızında motor devri yükselmesi", "Ortalama bagaj hacmi", "Sert ayarlanan süspansiyonlar"] },
    scores: { performans: 8.7, konfor: 8.6, tasarim: 8.7, verimlilik: 8.8, pratiklik: 8.6, teknoloji: 8.9, guvenlik: 9.3, fiyat_performans: 8.4 },
    summary: "Yenilikçi e-POWER teknolojisi sayesinde tekerlekleri sadece elektrik motoru döndürüyor; priz aramadan elektrikli sürüş konforu yaşatıyor."
  },
  {
    id: 19, make: "Ford", model: "Focus", year: 2024, version: "1.0 EcoBoost Titanium Stil Otomatik", category: "Hatchback", price: 1720000,
    accentColor: "from-blue-800 to-indigo-950",
    details: { segment: "C Segmenti / Hatchback", motor: "1.0 EcoBoost Hibrit", güç: "125 bg", tork: "170 Nm", "0-100": "10.2 sn", "yakıt": "5.5 L/100km", bagaj: "392 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Sınıfının en hisli direksiyonu ve gövde kontrolü", "Devasa 13.2 inç SYNC 4 multimedya ekranı", "Dengeli bağımsız süspansiyon"], eksi: ["3 silindirli motorun kalkıştaki titreşimi", "Geri viteste kamera gecikmesi", "Arka yolcu saklama gözlerinin darlığı"] },
    scores: { performans: 8.2, konfor: 8.4, tasarim: 8.3, verimlilik: 8.5, pratiklik: 8.1, teknoloji: 8.8, guvenlik: 9.0, fiyat_performans: 8.4 },
    summary: "Virajlı yolları sevenlerin bir numarası. Focus şasisinin direksiyon hissi ve yol tutuş dengesi sınıfının zirvesinde kalmaya devam ediyor."
  },
  {
    id: 20, make: "Opel", model: "Astra", year: 2024, version: "1.2 Turbo GS AT8", category: "Hatchback", price: 1790000,
    accentColor: "from-amber-800 to-yellow-950",
    details: { segment: "C Segmenti / Hatchback", motor: "1.2 Turbo PureTech", güç: "130 bg", tork: "230 Nm", "0-100": "9.7 sn", "yakıt": "5.8 L/100km", bagaj: "422 L", güvenlik: "Euro NCAP 4 Yıldız", artı: ["Cesur Opel Vizor ön tasarım dili", "AGR sertifikalı ergonomik koltuklar", "Saf ve modern Pure Panel kokpiti"], eksi: ["Arka diz mesafesi ortalama", "EAT8 şanzımanın ara hızlanma gecikmesi", "Kabin alt kısımlarındaki sert plastik"] },
    scores: { performans: 8.1, konfor: 8.5, tasarim: 9.0, verimlilik: 8.3, pratiklik: 8.4, teknoloji: 8.7, guvenlik: 8.3, fiyat_performans: 8.2 },
    summary: "Alman sadeliği ve AGR koltuk konforu. Opel Vizor tasarımıyla fütüristik bir hava yakalayan Astra, uzun yolda bel ağrıtmayan koltuklarıyla öne çıkıyor."
  },
  {
    id: 21, make: "Chery", model: "Tiggo 8 Pro", year: 2024, version: "1.6 TGDI Exceptional DCT", category: "SUV", price: 1840000,
    accentColor: "from-slate-800 to-purple-950",
    details: { segment: "D-SUV / 7 Kişilik", motor: "1.6 TGDI Turbo Benzin", güç: "183 bg", tork: "275 Nm", "0-100": "9.1 sn", "yakıt": "8.1 L/100km", bagaj: "889 L", güvenlik: "C-NCAP 5 Yıldız", artı: ["Bu fiyata lüks 7 kişilik oturma düzeni", "Gırtlak dolusu donanım ve soğutmalı koltuklar", "Geniş ve ferah yaşam hacmi"], eksi: ["Yüksek yakıt sarfiyatı", "Yumuşak süspansiyonun virajda yatması", "Sürüş asistanlarının aşırı hassas uyarı sesleri"] },
    scores: { performans: 8.4, konfor: 8.6, tasarim: 8.5, verimlilik: 6.7, pratiklik: 9.7, teknoloji: 8.9, guvenlik: 8.0, fiyat_performans: 9.3 },
    summary: "Donanım ve hacim canavarı. 7 kişilik oturma kapasitesini zengin konfor donanımlarıyla bu fiyata sunması Türk kullanıcısında karşılık buluyor."
  },
  {
    id: 22, make: "Togg", model: "T10X", year: 2024, version: "V2 RWD Uzun Menzil", category: "Elektrikli", price: 1823000,
    accentColor: "from-teal-900 to-sky-950",
    details: { segment: "C-SUV / Tam Elektrikli", motor: "Arkadan İtişli Elektrik Motoru", güç: "218 bg", tork: "350 Nm", "0-100": "7.8 sn", "yakıt": "16.9 kWh/100km", bagaj: "441 L", güvenlik: "Euro NCAP Sürecinde", artı: ["Uçtan uca uzanan dev dijital kokpit", "Geniş diz mesafesi ve düz taban", "Yerli ekosistem entegrasyonu"], eksi: ["Yazılım güncellemelerinde zaman zaman yaşanan kilitlenmeler", "Bagaj hacmi gövde boyutuna göre mütevazı", "Hızlı şarjda ısınma yönetimi"] },
    scores: { performans: 8.6, konfor: 8.7, tasarim: 8.9, verimlilik: 8.4, pratiklik: 8.5, teknoloji: 9.2, guvenlik: 8.6, fiyat_performans: 9.0 },
    summary: "Türkiye'nin yerli akıllı cihazı. Uçtan uca uzanan dev ekranı ve geniş kabiniyle modern çağın tüm bağlantılı araç özelliklerini barındırıyor."
  },
  {
    id: 23, make: "BYD", model: "Seal", year: 2024, version: "AWD Excellence", category: "Elektrikli", price: 2390000,
    accentColor: "from-blue-900 to-cyan-950",
    details: { segment: "D Segmenti / Spor EV Sedan", motor: "Çift Elektrik Motoru", güç: "530 bg", tork: "670 Nm", "0-100": "3.8 sn", "yakıt": "18.2 kWh/100km", bagaj: "400 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["3.8 saniyelik süperspor ivmelenmesi", "Dönen 15.6 inç dev multimedya ekranı", "Blade Batarya'nın yüksek yangın güvenliği"], eksi: ["Arka bagaj kapağının dar yükleme ağzı", "Otoyol hızlarında direksiyon hissi yapay", "Multimedya çevirilerinde eksiklikler"] },
    scores: { performans: 9.7, konfor: 8.8, tasarim: 9.3, verimlilik: 8.6, pratiklik: 7.7, teknoloji: 9.2, guvenlik: 9.6, fiyat_performans: 9.2 },
    summary: "530 beygirlik elektrikli fırtına. Dayanıklı Blade Batarya mimarisi ve lüks kabin detaylarıyla Tesla Model 3'ün en dişli global rakibi."
  },
  {
    id: 24, make: "Seat", model: "Leon", year: 2024, version: "1.5 eTSI FR DSG", category: "Hatchback", price: 1680000,
    accentColor: "from-rose-900 to-slate-900",
    details: { segment: "C Segmenti / Hatchback", motor: "1.5 eTSI Mild Hybrid", güç: "150 bg", tork: "250 Nm", "0-100": "8.5 sn", "yakıt": "5.5 L/100km", bagaj: "380 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Boydan boya uzanan coast-to-coast LED şerit", "Genç ve dinamik FR sürüş karakteri", "Verimli ve canlı motor"], eksi: ["Bozuk zeminde lastik yuvarlanma sesi", "Klima ayarlarının ekrana gömülü olması", "Opsiyonsuz donanımda sert plastikler"] },
    scores: { performans: 8.5, konfor: 8.1, tasarim: 9.0, verimlilik: 8.6, pratiklik: 8.0, teknoloji: 8.4, guvenlik: 9.0, fiyat_performans: 8.5 },
    summary: "Akdeniz ateşi ve sportif gençlik enerjisi. Keskin çizgileri, boydan boya uzanan LED stopları ve canlı motoruyla sürüşten keyif aldırıyor."
  },
  {
    id: 25, make: "Suzuki", model: "Jimny", year: 2024, version: "1.5 AllGrip GLX Otomatik", category: "SUV", price: 1720000,
    accentColor: "from-lime-900 to-slate-900",
    details: { segment: "Mini 4x4 / Gerçek Arazi", motor: "1.5 Atmosferik 4 Silindir", güç: "102 bg", tork: "130 Nm", "0-100": "12.8 sn", "yakıt": "7.5 L/100km", bagaj: "85 L", güvenlik: "Euro NCAP 3 Yıldız", artı: ["Merdiven şasi ve arazi şanzımanıyla gerçek 4x4", "Sempatik retro kutu tasarımı", "Dar patikalarda efsanevi manevra"], eksi: ["Otoyol hızlarında ciddi rüzgar gürültüsü", "Bagaj hacmi neredeyse yok", "Asfaltta virajlarda gövde salınımı"] },
    scores: { performans: 6.8, konfor: 6.0, tasarim: 9.5, verimlilik: 7.0, pratiklik: 5.5, teknoloji: 6.6, guvenlik: 6.0, fiyat_performans: 8.1 },
    summary: "Şehrin en sempatik dev arazi cücesi. Asfaltta konfor aramayan, hafta sonu dağ bayır tırmanmak isteyen gerçek off-road aşıklarının oyuncağı."
  },
  {
    id: 26, make: "MG", model: "MG4", year: 2024, version: "Comfort 64 kWh", category: "Elektrikli", price: 1450000,
    accentColor: "from-orange-900 to-slate-900",
    details: { segment: "C Segmenti / Elektrikli Hatchback", motor: "Arkadan İtişli Elektrik Motoru", güç: "204 bg", tork: "250 Nm", "0-100": "7.9 sn", "yakıt": "16.0 kWh/100km", bagaj: "363 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["50:50 ağırlık dağılımı ve arkadan itiş sürüş keyfi", "Fiyatına göre mükemmel menzil/batarya oranı", "Keskin ön burun ve tavan spoyleri"], eksi: ["Multimedya yazılımının yavaşlığı", "Kabin içinde ucuz plastik detaylar", "Bagaj kapağının ağır olması"] },
    scores: { performans: 8.7, konfor: 8.0, tasarim: 8.6, verimlilik: 9.1, pratiklik: 8.0, teknoloji: 7.9, guvenlik: 9.1, fiyat_performans: 9.5 },
    summary: "Elektrikli araç dünyasının fiyat/performans kralı. 50:50 ağırlık dengesi ve arkadan itişi sayesinde virajlarda beklenmedik bir çeviklik sergiliyor."
  },
  {
    id: 27, make: "Alfa Romeo", model: "Tonale", year: 2024, version: "1.5 VGT MHEV Ti", category: "SUV", price: 2450000,
    accentColor: "from-red-900 to-neutral-950",
    details: { segment: "C-SUV / Premium Sportif", motor: "1.5 Turbo Değişken Geometri", güç: "160 bg", tork: "240 Nm", "0-100": "8.8 sn", "yakıt": "6.3 L/100km", bagaj: "500 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Kusursuz İtalyan Trilobo ön tasarımı", "Sınıfının en direkt ve keskin direksiyon kutusu", "Brembo frenler ve spor süspansiyon"], eksi: ["Hibrit sistemin vites geçişlerindeki tereddüdü", "Arka yolcu cam açıklığı dar", "Bozuk zeminde süspansiyon sertliği"] },
    scores: { performans: 8.4, konfor: 8.2, tasarim: 9.8, verimlilik: 8.0, pratiklik: 8.3, teknoloji: 8.7, guvenlik: 9.2, fiyat_performans: 7.9 },
    summary: "İtalyan tutkusu ve saf estetik. En ufak direksiyon hareketine anında cevap veren şasisiyle sıradan SUV'lardan ayrılan karakteristik bir model."
  },
  {
    id: 28, make: "Land Rover", model: "Defender", year: 2024, version: "110 D300 X-Dynamic SE", category: "SUV", price: 9200000,
    accentColor: "from-stone-900 to-amber-950",
    details: { segment: "Büyük Lüks Arazi SUV", motor: "3.0 Sıralı 6 Çift Turbo Dizel", güç: "300 bg", tork: "650 Nm", "0-100": "7.0 sn", "yakıt": "8.9 L/100km", bagaj: "857 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Durdurulamaz Terrain Response 2 arazi sistemi", "90 cm derinliğe kadar sudan geçebilme", "Lüks ve sağlam kabin mimarisi"], eksi: ["Çok yüksek fiyat ve MTV dilimi", "Şehir içi dar otoparklarda zorlu boyutlar", "Yüksek ağırlık"] },
    scores: { performans: 9.2, konfor: 9.3, tasarim: 9.8, verimlilik: 7.0, pratiklik: 9.8, teknoloji: 9.3, guvenlik: 9.5, fiyat_performans: 6.9 },
    summary: "Yol bittiğinde onun dünyası başlar. Lüks bir limuzin kadar konforlu asfalt sürüşünü, dünyanın en zorlu arazi koşullarını dize getiren yetenekle birleştiriyor."
  },
  {
    id: 29, make: "Porsche", model: "Taycan", year: 2024, version: "4S Performance Plus", category: "Elektrikli", price: 7900000,
    accentColor: "from-zinc-900 to-slate-950",
    details: { segment: "E Segmenti / Süperspor EV", motor: "Çift Elektrik Motoru 800V Mimari", güç: "544 bg", tork: "650 Nm", "0-100": "3.7 sn", "yakıt": "20.4 kWh/100km", bagaj: "407 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Elektrikli dünyada benzersiz Porsche sürüş hissi", "800V mimari ile 18 dakikada şarj", "Kusursuz viraj kabiliyeti ve tutuş"], eksi: ["Arka koltuk diz/baş alanı dar", "Opsiyon listesi astronomik", "Düşük hızlarda süspansiyon gergin"] },
    scores: { performans: 9.9, konfor: 8.8, tasarim: 9.9, verimlilik: 8.2, pratiklik: 7.3, teknoloji: 9.6, guvenlik: 9.6, fiyat_performans: 7.1 },
    summary: "Elektrikli çağın safkan spor otomobili. 800 voltluk mimarisiyle rekor sürede şarj olurken, virajlarda bir elektrikli değil gerçek bir Porsche gibi davranıyor."
  },
  {
    id: 30, make: "Cupra", model: "Leon", year: 2024, version: "1.5 eTSI 150 bg DSG", category: "Hatchback", price: 1840000,
    accentColor: "from-stone-900 to-amber-900",
    details: { segment: "C Segmenti / Sportif Hatchback", motor: "1.5 eTSI Mild Hybrid", güç: "150 bg", tork: "250 Nm", "0-100": "8.5 sn", "yakıt": "5.6 L/100km", bagaj: "380 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Bakır logolu agresif ön tampon", "Kusursuz yanal destekli çanak koltuklar", "Canlı ve tasarruflu motor"], eksi: ["Sert süspansiyon ayarı", "İç mekanda aydınlatmasız dokunmatik düğmeler", "Bozuk yollarda lastik sesi"] },
    scores: { performans: 8.6, konfor: 8.0, tasarim: 9.4, verimlilik: 8.5, pratiklik: 8.1, teknoloji: 8.6, guvenlik: 9.0, fiyat_performans: 8.4 },
    summary: "Hot-hatch genlerini günlük hayata taşıyan tasarım harikası. Bakır detayları ve dinamik şasi ayarlarıyla standart kompakt modellerden ayrışıyor."
  },
  {
    id: 31, make: "BMW", model: "M3 Sedan", year: 2024, version: "Competition M xDrive", category: "Sedan", price: 9800000,
    accentColor: "from-blue-950 to-red-950",
    details: { segment: "D Segmenti / Süperspor Sedan", motor: "3.0 Sıralı 6 TwinPower Turbo (S58)", güç: "510 bg", tork: "650 Nm", "0-100": "3.5 sn", "yakıt": "10.1 L/100km", bagaj: "480 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Pist canavarı S58 motor ve 510 beygir", "M xDrive ile 2WD arkadan itiş modu", "Karbon çanak koltuklar"], eksi: ["Günlük kullanım için aşırı sert", "Yüksek tüketim ve lastik masrafı", "Büyük dikey böbrek ızgara"] },
    scores: { performans: 10, konfor: 7.5, tasarim: 9.6, verimlilik: 5.8, pratiklik: 7.9, teknoloji: 9.6, guvenlik: 9.4, fiyat_performans: 7.3 },
    summary: "Asfaltı yırtan süperspor sedan efsanesi. 4 kapılı bir aile arabası gövdesinde pist rekorları kıran vahşi bir güç makinesi."
  },
  {
    id: 32, make: "Audi", model: "A4 Sedan", year: 2024, version: "40 TDI Quattro S-Line", category: "Sedan", price: 3600000,
    accentColor: "from-neutral-900 to-stone-900",
    details: { segment: "D Segmenti / Premium Sedan", motor: "2.0 TDI Dizel", güç: "204 bg", tork: "400 Nm", "0-100": "6.9 sn", "yakıt": "5.4 L/100km", bagaj: "460 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Mekanik Quattro dört çeker güveni", "Kusursuz otoyol stabilitesi ve akustik yalıtım", "Düşük uzun yol tüketimi"], eksi: ["Kabin mimarisi rakiplerine göre yaşını hissettiriyor", "Dönüş çapı geniş", "Arka şaft tüneli yüksek"] },
    scores: { performans: 8.9, konfor: 9.2, tasarim: 8.8, verimlilik: 8.7, pratiklik: 8.1, teknoloji: 8.7, guvenlik: 9.3, fiyat_performans: 7.8 },
    summary: "Otoyol fatihi. 204 beygirlik torklu dizel ünitesi ve Quattro çekiş sistemiyle yağmur, kar dinlemeden kilometreleri sessizce yutan bir uzun yol klasiği."
  },
  {
    id: 33, make: "Mercedes-Benz", model: "E-Serisi", year: 2024, version: "E180 Exclusive", category: "Sedan", price: 5400000,
    accentColor: "from-slate-900 to-indigo-950",
    details: { segment: "E Segmenti / Executive Sedan", motor: "1.5 Turbo Benzin + EQ Boost", güç: "170 bg", tork: "250 Nm", "0-100": "8.9 sn", "yakıt": "6.7 L/100km", bagaj: "540 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Superscreen ön yolcu ekranı", "Hava yastıklı süspansiyon ile kusursuz konfor", "Sınıfının en iyi ses yalıtımı"], eksi: ["1.5 motor ağır gövdede sakin hızlanıyor", "Dokunmatik direksiyon tuşları bazen tepkisiz", "Yüksek başlangıç fiyatı"] },
    scores: { performans: 8.2, konfor: 9.8, tasarim: 9.5, verimlilik: 7.7, pratiklik: 8.8, teknoloji: 9.8, guvenlik: 9.8, fiyat_performans: 7.5 },
    summary: "İş dünyasının zirve tercihi. Superscreen teknolojisi, yıldızlı arka stopları ve uçan halı süspansiyonuyla gerçek bir lüks makamı."
  },
  {
    id: 34, make: "Renault", model: "Clio", year: 2024, version: "1.0 TCe Evolution X-Tronic", category: "Hatchback", price: 1080000,
    accentColor: "from-blue-700 to-slate-900",
    details: { segment: "B Segmenti / Hatchback", motor: "1.0 TCe Turbo Benzin", güç: "90 bg", tork: "142 Nm", "0-100": "12.2 sn", "yakıt": "5.8 L/100km", bagaj: "391 L", güvenlik: "Euro NCAP 5 Yıldız", artı: ["Sınıf rekoru 391L bagaj", "Yenilenen sportif ön ışık imzası", "Şehir içinde yumuşak ve pratik sürüş"], eksi: ["X-Tronic şanzımanın ani hızlanma gecikmesi", "Arka diz mesafesi dar", "Yüksek süratte kabin gürültüsü"] },
    scores: { performans: 7.2, konfor: 7.8, tasarim: 8.6, verimlilik: 8.5, pratiklik: 8.6, teknoloji: 7.8, guvenlik: 8.8, fiyat_performans: 9.3 },
    summary: "Şehir hayatının en pratik ve şık yardımcısı. B segmenti rekoru kıran bagajı ve kompakt boyutlarıyla şehir trafiğinde zahmetsiz kullanım sunuyor."
  }
];

// --- HESAPLAMALAR ---
const getOverallScore = (scores) => {
  const vals = Object.values(scores);
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
};

const getScoreColor = (score) => {
  if (score >= 9.0) return "text-emerald-500 bg-emerald-50 border-emerald-200";
  if (score >= 8.0) return "text-sky-600 bg-sky-50 border-sky-200";
  if (score >= 7.0) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-rose-600 bg-rose-50 border-rose-200";
};

const scoreCategories = [
  { id: 'performans', label: 'Performans & Sürüş', icon: Timer },
  { id: 'konfor', label: 'Konfor & Yalıtım', icon: Users },
  { id: 'tasarim', label: 'Tasarım & Kalite', icon: Award },
  { id: 'verimlilik', label: 'Verimlilik & Tüketim', icon: Fuel },
  { id: 'pratiklik', label: 'Pratiklik & Bagaj', icon: Grid },
  { id: 'teknoloji', label: 'Teknoloji & Multimedya', icon: Zap },
  { id: 'guvenlik', label: 'Güvenlik & Asistanlar', icon: ShieldAlert },
  { id: 'fiyat_performans', label: 'Fiyat & Performans', icon: Scale },
];

const formatPrice = (p) => {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(p);
};

// --- STÜDYO ARAÇ ROZETİ (KIRILMAYAN ÖZEL VEKTÖR VE TASARIM ALANI) ---
const CarVisualBanner = ({ make, model, category, accentColor }) => (
  <div className={`relative h-36 bg-gradient-to-br ${accentColor} p-4 flex flex-col justify-between overflow-hidden select-none`}>
    {/* Arka plan dekoratif desenler */}
    <div className="absolute -right-6 -bottom-6 opacity-10 text-white pointer-events-none">
      <Car className="w-40 h-40" />
    </div>
    <div className="absolute top-0 right-0 left-0 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 pointer-events-none" />

    <div className="relative z-10 flex items-center justify-between">
      <span className="text-[10px] font-black uppercase tracking-widest text-white/70 bg-black/30 px-2 py-0.5 rounded backdrop-blur-xs">
        {category}
      </span>
      <span className="text-[10px] font-bold text-white/50 tracking-wider">OTOVASITA TEST ARŞİVİ</span>
    </div>

    <div className="relative z-10 flex items-end justify-between">
      <div>
        <p className="text-white/60 text-xs font-semibold tracking-wider uppercase">{make}</p>
        <p className="text-white text-xl font-black tracking-tight drop-shadow-sm">{model}</p>
      </div>
      <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
        <Car className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

// --- MODAL DETAY KAPAK ---
const ModalVisualBanner = ({ make, model, category, accentColor, year, version, price }) => (
  <div className={`relative h-48 sm:h-56 bg-gradient-to-br ${accentColor} p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none`}>
    <div className="absolute -right-8 -bottom-8 opacity-15 text-white pointer-events-none">
      <Car className="w-64 h-64" />
    </div>
    
    <div className="relative z-10">
      <span className="text-xs font-bold uppercase tracking-wider text-sky-300 bg-black/40 px-2.5 py-1 rounded">
        {category} • RESMİ EDİTORYAL TESTİ
      </span>
    </div>

    <div className="relative z-10">
      <p className="text-white/70 text-sm font-semibold uppercase tracking-wider">{make}</p>
      <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{model}</h2>
      <p className="text-slate-200 text-xs sm:text-sm mt-1">
        {year} • {version} • <strong className="text-white font-extrabold">{formatPrice(price)}</strong>
      </p>
    </div>
  </div>
);

// --- ANA BİLEŞENLER ---

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');
  const [selectedCar, setSelectedCar] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const categories = ['Hepsi', 'Sedan', 'SUV', 'Hatchback', 'Elektrikli'];

  const filteredCars = useMemo(() => {
    return carsData.filter(car => {
      const matchesSearch = 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.version.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Hepsi' || car.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleCompare = (car) => {
    if (compareList.some(c => c.id === car.id)) {
      setCompareList(prev => prev.filter(c => c.id !== car.id));
    } else {
      if (compareList.length >= 4) {
        alert("En fazla 4 aracı aynı anda karşılaştırabilirsiniz.");
        return;
      }
      setCompareList(prev => [...prev, car]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white">
      
      {/* ÜST BAR (NAVBAR) */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedCategory('Hepsi'); setSearchTerm(''); }}>
            <div className="bg-sky-500 text-slate-950 p-1.5 rounded-lg font-black">
              <GaugeCircle className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black tracking-tight text-white">OTOVASITA</span>
              <span className="text-xs font-bold text-sky-400">ANALİZ</span>
            </div>
          </div>

          <div className="flex-1 max-w-md relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="34 model arasında ara (örn: 320i, Megane, Egea)..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition"
            />
          </div>

          <button 
            onClick={() => setShowCompareModal(true)}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 px-3.5 py-1.5 rounded-xl font-bold text-xs transition shadow-lg shadow-sky-500/10">
            <Scale className="w-4 h-4" />
            <span>Kıyaslama</span>
            <span className="bg-slate-950 text-white px-1.5 py-0.2 rounded-full text-[10px]">
              {compareList.length}
            </span>
          </button>
        </div>
      </header>

      {/* HERO & FİLTRELER */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2.5 py-1 rounded-full text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Bağımsız Otomobil İnceleme Veritabanı
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Tarafsız Puanlar, Somut Karşılaştırmalar.
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Her araç aynı 8 disiplinde ölçüldü; sübjektif yorumlardan uzak, editoryal veriler ve Türkiye şartlarına özel analizler.
              </p>
            </div>

            {/* Arama Inputu (Mobil İçin) */}
            <div className="sm:hidden relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Araç veya marka ara..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Segment Filtreleme Butonları */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Gövde:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-sky-500 text-slate-950 font-black' 
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ARAÇ LİSTESİ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Gösterilen: <span className="text-sky-400">{filteredCars.length}</span> Araç
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCars.map((car) => {
            const overallScore = getOverallScore(car.scores);
            const isCompared = compareList.some(c => c.id === car.id);

            return (
              <div 
                key={car.id} 
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col transition duration-200 group">
                
                {/* Asla Bozulmayan Modern Kart Görseli */}
                <CarVisualBanner 
                  make={car.make} 
                  model={car.model} 
                  category={car.category} 
                  accentColor={car.accentColor} 
                />

                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-black text-white text-base leading-tight group-hover:text-sky-400 transition">
                          {car.make} {car.model}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{car.version}</p>
                      </div>
                      
                      {/* Skor Rozeti */}
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-base font-black text-sky-400 leading-none">
                          {overallScore}
                        </span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">/10 SKOR</span>
                      </div>
                    </div>

                    {/* Teknik Özet Kutuları */}
                    <div className="grid grid-cols-3 gap-1.5 mt-3 py-2 border-y border-slate-800/80 text-[11px] text-slate-300 text-center">
                      <div className="bg-slate-950/60 rounded p-1">
                        <span className="text-[9px] text-slate-500 block uppercase">Güç</span>
                        <strong className="font-semibold text-slate-200">{car.details.güç}</strong>
                      </div>
                      <div className="bg-slate-950/60 rounded p-1">
                        <span className="text-[9px] text-slate-500 block uppercase">0-100</span>
                        <strong className="font-semibold text-slate-200">{car.details["0-100"]}</strong>
                      </div>
                      <div className="bg-slate-950/60 rounded p-1">
                        <span className="text-[9px] text-slate-500 block uppercase">Tüketim</span>
                        <strong className="font-semibold text-slate-200">{car.details.yakıt.split(' ')[0]}</strong>
                      </div>
                    </div>

                    {/* Fiyat Bilgisi */}
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Liste Fiyatı</span>
                      <span className="text-sm font-black text-white">{formatPrice(car.price)}</span>
                    </div>
                  </div>

                  {/* Butonlar */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button 
                      onClick={() => setSelectedCar(car)}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2 rounded-xl transition text-center">
                      İncele & Analiz
                    </button>
                    <button 
                      onClick={() => toggleCompare(car)}
                      className={`p-2 rounded-xl border text-xs font-bold transition ${
                        isCompared 
                          ? 'bg-sky-500/20 border-sky-500 text-sky-400' 
                          : 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                      title="Karşılaştırma listesine ekle">
                      <Scale className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p className="font-bold text-slate-400">OTOVASITA ANALİZ PORTALI • 2026</p>
        <p className="mt-1">Tüm veriler bağımsız teknik test ve editoryal değerlendirmelere dayanmaktadır.</p>
      </footer>

      {/* DETAY MODAL */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 p-4 sm:p-6 overflow-y-auto flex justify-center items-start">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-6">
            
            {/* Modal Kapak */}
            <div className="relative">
              <ModalVisualBanner 
                make={selectedCar.make}
                model={selectedCar.model}
                category={selectedCar.category}
                accentColor={selectedCar.accentColor}
                year={selectedCar.year}
                version={selectedCar.version}
                price={selectedCar.price}
              />
              <button 
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal İçerik */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Editoryal Yorum */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1 flex items-center gap-1.5">
                  <ListChecks className="w-4 h-4" /> Editoryal Değerlendirme
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedCar.summary}</p>
              </div>

              {/* 8 Kategori Puan Tablosu */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-sky-400" /> Kategori Puanları (10 Üzerinden)
                  </h4>
                  <span className="text-xs font-black text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded-full border border-sky-800">
                    Genel Ortalama: {getOverallScore(selectedCar.scores)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {scoreCategories.map(cat => {
                    const score = selectedCar.scores[cat.id];
                    return (
                      <div key={cat.id} className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <cat.icon className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-xs font-medium text-slate-300 truncate">{cat.label}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-sky-400 h-1.5 rounded-full" style={{ width: `${score * 10}%` }}></div>
                          </div>
                          <span className="text-xs font-black text-white w-6 text-right">{score.toFixed(1)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Artılar ve Eksiler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-950/20 border border-emerald-800/40 p-4 rounded-2xl">
                  <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                    <ThumbsUp className="w-4 h-4" /> Güçlü Yönleri (Artılar)
                  </h5>
                  <ul className="space-y-1.5">
                    {selectedCar.details.artı.map((item, idx) => (
                      <li key={idx} className="text-xs text-emerald-200/90 flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-950/20 border border-rose-800/40 p-4 rounded-2xl">
                  <h5 className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-2">
                    <ShieldAlert className="w-4 h-4" /> Zayıf Yönleri (Eksiler)
                  </h5>
                  <ul className="space-y-1.5">
                    {selectedCar.details.eksi.map((item, idx) => (
                      <li key={idx} className="text-xs text-rose-200/90 flex items-start gap-1.5">
                        <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Teknik Özellikler Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Fabrika Teknik Verileri</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { l: "Motor", v: selectedCar.details.motor },
                    { l: "Güç", v: selectedCar.details.güç },
                    { l: "Tork", v: selectedCar.details.tork },
                    { l: "0-100 km/s", v: selectedCar.details["0-100"] },
                    { l: "Yakıt / Tüketim", v: selectedCar.details.yakıt },
                    { l: "Bagaj", v: selectedCar.details.bagaj },
                    { l: "Segment", v: selectedCar.details.segment },
                    { l: "Güvenlik", v: selectedCar.details.güvenlik },
                  ].map((spec, i) => (
                    <div key={i} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">{spec.l}</span>
                      <strong className="text-xs text-white mt-0.5 block leading-tight font-semibold">{spec.v}</strong>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* KARŞILAŞTIRMA MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 p-4 sm:p-6 overflow-y-auto flex justify-center items-start">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl shadow-2xl p-6 my-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Araç Karşılaştırma Tablosu ({compareList.length}/4)</h3>
              </div>
              <button onClick={() => setShowCompareModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {compareList.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs">
                Kıyaslamak için kartlardaki terazi (<Scale className="w-3.5 h-3.5 inline" />) butonuna basarak araç ekleyin.
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-3 bg-slate-950/60 w-36">Kriter</th>
                      {compareList.map(c => (
                        <th key={c.id} className="p-3 min-w-[180px] bg-slate-900">
                          <div className="flex justify-between items-start gap-1">
                            <div>
                              <p className="font-black text-white text-sm">{c.make} {c.model}</p>
                              <p className="text-[10px] text-slate-400">{c.version}</p>
                            </div>
                            <button onClick={() => toggleCompare(c)} className="text-rose-400 hover:text-rose-300">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-3 font-bold bg-slate-950/40 text-slate-400">Genel Skor</td>
                      {compareList.map(c => (
                        <td key={c.id} className="p-3 font-black text-sky-400 text-sm">
                          {getOverallScore(c.scores)} / 10
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-950/40 text-slate-400">Fiyat</td>
                      {compareList.map(c => (
                        <td key={c.id} className="p-3 font-extrabold text-white">{formatPrice(c.price)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-950/40 text-slate-400">Motor & Güç</td>
                      {compareList.map(c => (
                        <td key={c.id} className="p-3">{c.details.güç} • {c.details.tork}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-950/40 text-slate-400">0-100 Hızlanma</td>
                      {compareList.map(c => (
                        <td key={c.id} className="p-3">{c.details["0-100"]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-950/40 text-slate-400">Yakıt / Tüketim</td>
                      {compareList.map(c => (
                        <td key={c.id} className="p-3">{c.details.yakıt}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-950/40 text-slate-400">Bagaj Hacmi</td>
                      {compareList.map(c => (
                        <td key={c.id} className="p-3">{c.details.bagaj}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-950/40 text-slate-400">Performans Puanı</td>
                      {compareList.map(c => (
                        <td key={c.id} className="p-3 font-semibold text-white">{c.scores.performans}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-950/40 text-slate-400">Konfor Puanı</td>
                      {compareList.map(c => (
                        <td key={c.id} className="p-3 font-semibold text-white">{c.scores.konfor}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-950/40 text-slate-400">Fiyat/Performans</td>
                      {compareList.map(c => (
                        <td key={c.id} className="p-3 font-semibold text-white">{c.scores.fiyat_performans}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
