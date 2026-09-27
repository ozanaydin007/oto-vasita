import React, { useState, useMemo } from 'react';
import { 
  Search, Scale, ThumbsUp, Fuel, Timer, Zap, Users, ShieldAlert, 
  Award, Star, TrendingUp, Grid, ListChecks, ArrowRight, GaugeCircle, X, ChevronRight
} from 'lucide-react';

// --- SEGMENT SIRALAMALARI VE DETAYLI ARAÇ LİSTESİ ---
const categoryRankings = [
  {
    id: "c-sedan",
    title: "En İyi Kompakt Sedanlar",
    englishTitle: "Best Compact Sedans",
    leadImage: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvczkzLXBtLTI1NDctMDQtMDEucG5n.png",
    cars: [
      {
        rank: 1, id: 1, make: "Toyota", model: "Corolla Hybrid", year: 2024, version: "1.8 Hybrid Dream e-CVT", price: 1650000,
        score: 9.2, motor: "1.8L Tam Hibrit 140 bg", hiz: "9.3 sn", yakit: "4.5 L/100km", bagaj: "471 L",
        artilar: ["Şehir içi rakipsiz yakıt ekonomisi", "Efsanevi mekanik sağlamlık", "Standart Toyota Safety Sense"],
        eksiler: ["Ani gaz tepkilerinde motor sesi (e-CVT)", "Basit multimedya arayüzü"],
        summary: "Kompakt sedan segmentinin tartismasiz verimlilik krali. Dayanıklılığı ve düşük işletme giderleriyle ailelerin en güvenli tercihi."
      },
      {
        rank: 2, id: 2, make: "Renault", model: "Megane Sedan", year: 2024, version: "1.3 TCe Icon EDC", price: 1540000,
        score: 8.8, motor: "1.3 Turbo 140 bg", hiz: "9.0 sn", yakit: "5.9 L/100km", bagaj: "503 L",
        artilar: ["Canlı motor-EDC şanzıman uyumu", "503 litrelik geniş yükleme hacmi", "Sürüş konforu"],
        eksiler: ["Otoyolda rüzgar yalıtımı zayıf", "Konsolda sert plastik oranı"],
        summary: "Geniş bagajı ve canlı turbo beslemeli motoruyla dengeli bir aile otomobili."
      },
      {
        rank: 3, id: 3, make: "Honda", model: "Civic Sedan", year: 2024, version: "1.5 VTEC Turbo Elegance", price: 1940000,
        score: 8.7, motor: "1.5 VTEC Turbo 182 bg", hiz: "8.1 sn", yakit: "6.7 L/100km", bagaj: "512 L",
        artilar: ["182 beygirlik güçlü ivmelenme", "Retro bal peteği kokpit", "Dengeli viraj dinamikleri"],
        eksiler: ["CVT şanzıman hissizliği", "Düşük hızda yol gürültüsü"],
        summary: "Güçlü performansı ve dinamik şasisiyle sürüş keyfini sedan pratikliğiyle birleştiren model."
      },
      {
        rank: 4, id: 4, make: "Skoda", model: "Octavia", year: 2024, version: "1.5 e-TEC Premium DSG", price: 1850000,
        score: 8.6, motor: "1.5 e-TEC 150 bg", hiz: "8.5 sn", yakit: "5.3 L/100km", bagaj: "600 L",
        artilar: ["Sınıf lideri 600 litrelik liftback bagaj", "D segmenti diz mesafesi", "Simply Clever çözümleri"],
        eksiler: ["Yumuşak şasinin virajda salınımı", "Multimedya açılış hızı"],
        summary: "Geniş aileler için liftback kapağının getirdiği devasa yükleme hacmiyle sınıfının en fonksiyonel aracı."
      },
      {
        rank: 5, id: 5, make: "Fiat", model: "Egea Sedan", year: 2024, version: "1.6 MultiJet Lounge", price: 1310000,
        score: 8.1, motor: "1.6 MultiJet Dizel 130 bg", hiz: "9.8 sn", yakit: "4.3 L/100km", bagaj: "520 L",
        artilar: ["Çok ekonomik tüketim ve yüksek tork", "Ucuz ve yaygın servis ağı", "Geniş bagaj"],
        eksiler: ["Düşük kabin ses yalıtımı", "Eski güvenlik mimarisi"],
        summary: "Satın alma ve yürütme maliyetinde Türkiye'nin en mantıklı fiyat/performans otomobili."
      }
    ]
  },
  {
    id: "d-sedan",
    title: "En İyi Premium Sedanlar",
    englishTitle: "Best Premium Compact & Midsize Sedans",
    leadImage: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvczkzLXBtLTI1NDctMDQtMDEucG5n.png",
    cars: [
      {
        rank: 1, id: 6, make: "BMW", model: "3 Serisi", year: 2024, version: "320i M Sport", price: 3450000,
        score: 9.5, motor: "1.6 Turbo 170 bg", hiz: "7.7 sn", yakit: "7.1 L/100km", bagaj: "480 L",
        artilar: ["50:50 kusursuz gövde dengesi", "Hızlı ve pürüzsüz ZF 8 ileri", "Kavisli çift ekran"],
        eksiler: ["M Sport sert süspansiyon", "Yüksek opsiyon maliyetleri"],
        summary: "Sürüş dinamikleri ve keskin yol tutuş konusunda segmentinin rakipsiz referans noktası."
      },
      {
        rank: 2, id: 7, make: "Mercedes-Benz", model: "C-Serisi", year: 2024, version: "C200 4MATIC AMG", price: 3850000,
        score: 9.3, motor: "1.5 EQ Boost 204 bg", hiz: "7.3 sn", yakit: "6.9 L/100km", bagaj: "455 L",
        artilar: ["S-Serisi düzeyinde dijital kabin", "4MATIC dört çeker tutuşu", "Gece kabin ambiyansı"],
        eksiler: ["AMG jantlarla bozuk yolda gerginlik", "Alt trim parçalarında sert plastik"],
        summary: "Teknoloji, lüks ambiyans ve dört çeker güvenliğini en prestijli formda sunuyor."
      },
      {
        rank: 3, id: 8, make: "Audi", model: "A4 Sedan", year: 2024, version: "40 TDI Quattro S-Line", price: 3600000,
        score: 9.0, motor: "2.0 TDI Dizel 204 bg", hiz: "6.9 sn", yakit: "5.4 L/100km", bagaj: "460 L",
        artilar: ["Kusursuz Quattro çekiş güveni", "Otoyolda fısıltı sessizliğinde yalıtım", "Düşük uzun yol tüketimi"],
        eksiler: ["Kabin tasarımı rakiplerine göre olgun kalıyor", "Yüksek şaft tüneli"],
        summary: "Otoyol seyahatlerinde sessizliği ve mekanik Quattro güveniyle kilometreleri eriten bir yol makinesi."
      },
      {
        rank: 4, id: 9, make: "Audi", model: "A3 Sedan", year: 2024, version: "35 TFSI Advanced", price: 2320000,
        score: 8.9, motor: "1.5 MHEV 150 bg", hiz: "8.4 sn", yakit: "5.6 L/100km", bagaj: "425 L",
        artilar: ["Audi Virtual Cockpit ergonomisi", "Kompakt premium şıklık", "Dengeli ve konforlu sürüş"],
        eksiler: ["Kapı alt panelleri sert", "Dar arka görüş açısı"],
        summary: "Şehir içinde çevik, uzun yolda olgun hissettiren kompakt lüks sedan."
      },
      {
        rank: 5, id: 10, make: "BMW", model: "M3 Sedan", year: 2024, version: "Competition M xDrive", price: 9800000,
        score: 9.8, motor: "3.0 Sıralı 6 TwinTurbo 510 bg", hiz: "3.5 sn", yakit: "10.1 L/100km", bagaj: "480 L",
        artilar: ["Pist canavarı S58 motor", "M xDrive ile 2WD arkadan itiş modu", "Olağanüstü fren performansı"],
        eksiler: ["Günlük şehir içi için çok sert", "Ağır yürütme maliyetleri"],
        summary: "Süperspor otomobil performansını 4 kapılı sedan karoserinde sunan mühendislik zirvesi."
      }
    ]
  },
  {
    id: "c-suv",
    title: "En İyi Kompakt & Aile SUV'ları",
    englishTitle: "Best Compact & Midsize Family SUVs",
    leadImage: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvczkzLXBtLTI1NDctMDQtMDEucG5n.png",
    cars: [
      {
        rank: 1, id: 11, make: "Hyundai", model: "Tucson", year: 2024, version: "1.6 CRDi Prime Plus", price: 2150000,
        score: 9.1, motor: "1.6 Dizel 136 bg", hiz: "11.4 sn", yakit: "5.6 L/100km", bagaj: "598 L",
        artilar: ["598 litrelik dev bagaj", "Parametrik gizli LED tasarım", "Zengin donanım paketi"],
        eksiler: ["Dizel motorun ilk hızlanması sakin", "Piyano siyahı parçalar"],
        summary: "Fütüristik ön ızgarası ve geniş aile hacmiyle sınıfının en mantıklı aile SUV'u."
      },
      {
        rank: 2, id: 12, make: "Kia", model: "Sportage", year: 2024, version: "1.6 T-GDI Prestige", price: 2280000,
        score: 9.0, motor: "1.6 Turbo Benzin 150 bg", hiz: "9.6 sn", yakit: "6.8 L/100km", bagaj: "591 L",
        artilar: ["Kavisli panaromik ekran", "Yumuşak sürüş ve konforlu koltuklar", "Geniş arka bacak alanı"],
        eksiler: ["Şehir içinde yakıt sarfiyatı", "Sert yan plastikler"],
        summary: "Modern kabin mimarisi ve yüksek konfor düzeyiyle öne çıkan bir aile aracı."
      },
      {
        rank: 3, id: 13, make: "Nissan", model: "Qashqai", year: 2024, version: "1.5 e-POWER", price: 2240000,
        score: 8.9, motor: "1.5 Benzin Jeneratör + Elektrik 190 bg", hiz: "7.9 sn", yakit: "5.3 L/100km", bagaj: "504 L",
        artilar: ["Şarja gerek duymayan elektrikli sürüş", "330 Nm anlık elektrik torku", "Yüksek kabin işçiliği"],
        eksiler: ["Yüksek hızda içe gelen motor sesi", "Ortalama bagaj hacmi"],
        summary: "Priz derdi olmadan elektrikli otomobilin sessizlik ve tork avantajını yaşatan yenilikçi SUV."
      },
      {
        rank: 4, id: 14, make: "Peugeot", model: "408", year: 2024, version: "1.2 PureTech GT", price: 1980000,
        score: 8.8, motor: "1.2 Turbo 130 bg", hiz: "10.4 sn", yakit: "6.0 L/100km", bagaj: "536 L",
        artilar: ["Göz alıcı Fastback-SUV formu", "3D i-Cockpit göstergesi", "Geniş bagaj kapağı"],
        eksiler: ["Gövdeye göre 1.2 motor sınırda", "Basık arka cam tavanı"],
        summary: "Geleneksel SUV kalıplarından sıkılanlar için şık fastback çizgileri sunan tasarım ikonu."
      },
      {
        rank: 5, id: 15, make: "Chery", model: "Tiggo 8 Pro", year: 2024, version: "1.6 TGDI Exceptional", price: 1840000,
        score: 8.5, motor: "1.6 TGDI 183 bg", hiz: "9.1 sn", yakit: "8.1 L/100km", bagaj: "889 L",
        artilar: ["7 kişilik geniş oturma alanı", "Eksiksiz lüks donanım", "Geniş yükleme alanı"],
        eksiler: ["Şehir içi yüksek tüketim", "Gövde salınımı"],
        summary: "Geniş aileler için 7 koltuk ve yüksek donanımı en ulaşılabilir fiyatla sunan model."
      }
    ]
  },
  {
    id: "ev-tech",
    title: "En İyi Elektrikli Otomobiller",
    englishTitle: "Best All-Electric Vehicles",
    leadImage: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvczkzLXBtLTI1NDctMDQtMDEucG5n.png",
    cars: [
      {
        rank: 1, id: 16, make: "Tesla", model: "Model Y", year: 2024, version: "Long Range AWD", price: 3150000,
        score: 9.7, motor: "Çift Motor AWD 514 bg", hiz: "5.0 sn", yakit: "16.9 kWh/100km", bagaj: "854 L",
        artilar: ["Muazzam batarya verimliliği ve menzil", "Supercharger şarj altyapısı", "Geniş çift bagaj"],
        eksiler: ["Geleneksel buton yokluğu", "Sert süspansiyon ayarı"],
        summary: "Elektrikli pazarın tartışmasız lideri. Geniş iç hacmi ve şarj ağıyla en sorunsuz EV deneyimi."
      },
      {
        rank: 2, id: 17, make: "Porsche", model: "Taycan", year: 2024, version: "4S Performance Plus", price: 7900000,
        score: 9.6, motor: "800V Çift Motor 544 bg", hiz: "3.7 sn", yakit: "20.4 kWh/100km", bagaj: "407 L",
        artilar: ["Gerçek bir spor otomobil dinamikleri", "800V ile rekor sürede şarj", "Kusursuz viraj tutuşu"],
        eksiler: ["Dar arka yaşam alanı", "Astronomik opsiyon fiyatları"],
        summary: "Elektrikli çağda safkan spor otomobil genlerini yaşatan mühendislik şaheseri."
      },
      {
        rank: 3, id: 18, make: "BMW", model: "i7", year: 2024, version: "xDrive60 Excellence", price: 8900000,
        score: 9.5, motor: "Çift Motor AWD 544 bg", hiz: "4.7 sn", yakit: "19.6 kWh/100km", bagaj: "500 L",
        artilar: ["31.3 inç 8K sinema ekranı", "Kusursuz kabin sessizliği", "Uçan halı havalı süspansiyon"],
        eksiler: ["Şehir içinde park zorluğu", "Kutuplu ön ızgara"],
        summary: "Arka koltuğunda sinema salonu konforu sunan elektrikli ultra-lüks makam aracı."
      },
      {
        rank: 4, id: 19, make: "BYD", model: "Seal", year: 2024, version: "AWD Excellence", price: 2390000,
        score: 9.3, motor: "Çift Motor AWD 530 bg", hiz: "3.8 sn", yakit: "18.2 kWh/100km", bagaj: "400 L",
        artilar: ["3.8 saniyelik süperspor hızlanması", "Yangına dayanıklı Blade Batarya", "Dönen multimedya"],
        eksiler: ["Bagaj kapağı açıklığı dar", "Yapay direksiyon hissi"],
        summary: "530 beygirlik muazzam gücü ve yüksek batarya güvenliğiyle dikkat çeken spor sedan."
      },
      {
        rank: 5, id: 20, make: "Togg", model: "T10X", year: 2024, version: "V2 RWD Uzun Menzil", price: 1823000,
        score: 8.9, motor: "Arkadan İtiş 218 bg", hiz: "7.8 sn", yakit: "16.9 kWh/100km", bagaj: "441 L",
        artilar: ["Uçtan uca uzanan dijital kokpit", "Geniş iç diz mesafesi", "Yerli ekosistem entegrasyonu"],
        eksiler: ["Yazılım güncellemelerinde nadir gecikmeler", "Orta boy bagaj"],
        summary: "Geniş ekranları ve ferah iç tasarımıyla yerli akıllı mobilite cihazı."
      }
    ]
  }
];

const formatPrice = (p) => {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(p);
};

export default function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Arama filtresi
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const query = searchTerm.toLowerCase();
    const results = [];
    categoryRankings.forEach(cat => {
      cat.cars.forEach(car => {
        if (
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.version.toLowerCase().includes(query)
        ) {
          results.push(car);
        }
      });
    });
    return results;
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* ÜST BİLGİ VE HEADER */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white/95 backdrop-blur-sm z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSearchTerm('')}>
            <GaugeCircle className="w-7 h-7 text-neutral-900" />
            <span className="text-xl font-black tracking-tight uppercase">OTO VASITA ANALİZ</span>
          </div>

          <div className="flex-1 max-w-sm relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Model ara (örn: Corolla, 3 Serisi, Tucson)..."
              className="w-full bg-neutral-100 border border-transparent focus:border-neutral-300 focus:bg-white rounded-full pl-9 pr-4 py-1.5 text-xs text-neutral-800 transition outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ANA İÇERİK */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        {/* ARAMA SONUÇLARI AÇIKSA */}
        {searchResults ? (
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
              <h2 className="text-lg font-bold">"{searchTerm}" İçin Bulunan Araçlar ({searchResults.length})</h2>
              <button onClick={() => setSearchTerm('')} className="text-xs text-blue-600 font-semibold hover:underline">
                Tüm Listeye Dön
              </button>
            </div>
            
            {searchResults.length === 0 ? (
              <p className="text-sm text-neutral-500 py-8">Aradığınız kriterlere uygun araç bulunamadı.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {searchResults.map(car => (
                  <div 
                    key={car.id} 
                    onClick={() => setSelectedCar(car)}
                    className="border border-neutral-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-base">{car.make} {car.model}</span>
                        <span className="text-xs font-black bg-neutral-900 text-white px-2 py-0.5 rounded">
                          {car.score} / 10
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500">{car.version}</p>
                      <p className="text-xs font-bold text-neutral-900 mt-3">{formatPrice(car.price)}</p>
                    </div>
                    <span className="text-xs text-blue-600 font-semibold mt-4 flex items-center gap-1">
                      İncelemeyi Oku <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* GÖRSELDEKİ CAR AND DRIVER TARZI 4 KOLONLU EDİTORYAL SIRALAMA */
          <div>
            <div className="mb-10 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                2026 Otomobil Sıralamaları & Test Karneleri
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 max-w-3xl leading-relaxed">
                Her segmentin en iyilerini bağımsız yol testleri, yakıt tüketim ölçümleri ve fiyat/fayda dengesine göre sıraladık.
              </p>
            </div>

            {/* 4 Kolonlu Grid Yapısı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categoryRankings.map((col) => (
                <div key={col.id} className="flex flex-col">
                  
                  {/* STÜDYO YANDAN PROFİL ARAÇ GÖRSELİ */}
                  <div className="h-32 flex items-center justify-center mb-4">
                    {/* Yandan stüdyo profili vektörel araba silüeti */}
                    <div className="w-full h-full flex flex-col items-center justify-center p-2 relative">
                      <svg viewBox="0 0 450 160" className="w-full h-auto drop-shadow-md text-neutral-800" fill="currentColor">
                        {/* Profesyonel Otomobil Yandan Görünüş Vektörü */}
                        <path d="M410 115 C410 110, 400 95, 380 90 L330 85 C310 85, 290 55, 250 50 L160 50 C130 50, 100 70, 80 88 L35 95 C25 98, 20 105, 20 115 L20 125 C20 128, 24 130, 30 130 L65 130 C65 110, 95 110, 95 130 L295 130 C295 110, 325 110, 325 130 L395 130 C405 130, 410 125, 410 115 Z" fill="#2b2d42" />
                        {/* Camlar */}
                        <path d="M165 57 L245 57 C275 62, 290 85, 305 85 L165 85 Z" fill="#8d99ae" opacity="0.6" />
                        <path d="M100 85 C115 70, 135 58, 155 57 L155 85 Z" fill="#8d99ae" opacity="0.6" />
                        {/* Tekerlekler */}
                        <circle cx="80" cy="128" r="22" fill="#111" />
                        <circle cx="80" cy="128" r="12" fill="#e5e5e5" />
                        <circle cx="310" cy="128" r="22" fill="#111" />
                        <circle cx="310" cy="128" r="12" fill="#e5e5e5" />
                        {/* Zemin Gölgesi */}
                        <ellipse cx="215" cy="148" rx="190" ry="6" fill="#000" opacity="0.15" />
                      </svg>
                    </div>
                  </div>

                  {/* KATEGORİ BAŞLIĞI */}
                  <h3 className="font-extrabold text-sm text-neutral-900 tracking-tight leading-snug mb-3">
                    {col.title}
                  </h3>

                  {/* #1 - #5 SIRALAMA LİSTESİ */}
                  <div className="space-y-2.5 flex-1">
                    {col.cars.map((car) => (
                      <div 
                        key={car.id} 
                        onClick={() => setSelectedCar(car)}
                        className="group flex items-baseline gap-2 cursor-pointer text-xs transition">
                        <span className="font-bold text-neutral-900 group-hover:text-blue-600 shrink-0">
                          #{car.rank}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-neutral-700 group-hover:text-blue-600 transition leading-snug">
                            {car.year} {car.make} {car.model}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SIRALAMA LİNKİ */}
                  <div className="mt-5 pt-3 border-t border-neutral-100">
                    <button 
                      onClick={() => setSelectedCar(col.cars[0])}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
                      {col.title.toLowerCase()} karnesini gör <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* DETAY VE TEST KARNESİ MODALI */}
      {selectedCar && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 p-4 sm:p-6 overflow-y-auto flex justify-center items-start">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative my-8 overflow-hidden border border-neutral-200">
            
            {/* Modal Üst Başlık */}
            <div className="p-6 border-b border-neutral-200 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  #{selectedCar.rank} Segment Sıralaması
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-1">
                  {selectedCar.make} {selectedCar.model}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {selectedCar.year} • {selectedCar.version} • <strong>{formatPrice(selectedCar.price)}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-2xl font-black text-neutral-900 leading-none block">
                    {selectedCar.score}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase">/10 SKOR</span>
                </div>
                <button 
                  onClick={() => setSelectedCar(null)}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 p-2 rounded-full transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Gövde */}
            <div className="p-6 space-y-6">
              
              {/* Editoryal Özet */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <h4 className="text-xs font-bold uppercase text-neutral-500 mb-1">Test Editörü Notu</h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{selectedCar.summary}</p>
              </div>

              {/* Teknik Ölçümler */}
              <div>
                <h4 className="text-xs font-bold uppercase text-neutral-400 mb-2">Resmi Ölçüm Verileri</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="border border-neutral-200 rounded-lg p-3">
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">Motor & Güç</span>
                    <strong className="text-neutral-900 mt-0.5 block">{selectedCar.motor}</strong>
                  </div>
                  <div className="border border-neutral-200 rounded-lg p-3">
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">0-100 Hızlanma</span>
                    <strong className="text-neutral-900 mt-0.5 block">{selectedCar.hiz}</strong>
                  </div>
                  <div className="border border-neutral-200 rounded-lg p-3">
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">Yakıt Tüketimi</span>
                    <strong className="text-neutral-900 mt-0.5 block">{selectedCar.yakit}</strong>
                  </div>
                  <div className="border border-neutral-200 rounded-lg p-3">
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">Bagaj Kapasitesi</span>
                    <strong className="text-neutral-900 mt-0.5 block">{selectedCar.bagaj}</strong>
                  </div>
                </div>
              </div>

              {/* Artılar ve Eksiler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
                  <h5 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" /> Artılar (Neden Alınır?)
                  </h5>
                  <ul className="space-y-1 text-xs text-emerald-950">
                    {selectedCar.artilar.map((a, i) => (
                      <li key={i} className="flex items-baseline gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-4">
                  <h5 className="text-xs font-bold text-rose-900 flex items-center gap-1.5 mb-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Eksiler (Nelere Dikkat Edilmeli?)
                  </h5>
                  <ul className="space-y-1 text-xs text-rose-950">
                    {selectedCar.eksiler.map((e, i) => (
                      <li key={i} className="flex items-baseline gap-1.5">
                        <span className="text-rose-500 font-bold">•</span> {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Alt Kapatma */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-end">
              <button 
                onClick={() => setSelectedCar(null)}
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-5 py-2 rounded-lg transition">
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 py-8 mt-16 text-center text-xs text-neutral-400">
        <p className="font-semibold text-neutral-600">OTO VASITA ANALİZ © 2026</p>
        <p className="mt-1">Car and Driver & Edmunds editoryal veri ve sıralama standartlarıyla hazırlanmıştır.</p>
      </footer>

    </div>
  );
}
