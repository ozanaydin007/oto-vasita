import React, { useState } from 'react';
import { Search, Scale, ThumbsUp, Fuel, Timer, Zap, Users, ShieldAlert, Award, Star, TrendingUp, Grid, ListChecks, ArrowLeft, ArrowRight, GaugeCircle } from 'lucide-react';

// --- VERİ MODELİ VE ARAÇLAR ---
const carsData = [
  {
    id: 1, make: "Renault", model: "Megane Sedan", year: 2024, version: "1.3 TCe Icon EDC", price: 1540000,
    imageUrl: "https://cdn.pixabay.com/photo/2021/11/05/20/19/car-6771960_1280.jpg", 
    details: { segment: "C Segmenti / Sedan", motor: "1332 cc, 4 Silindir, Benzinli", güç: "140 bg", tork: "260 Nm", "0-100": "9.0 saniye", "yakıt": "5.9 - 6.1 L/100km (Karma, WLTP)", bagaj: "503 Litre", güvenlik: "5 Yıldız (Euro NCAP - 2015 test yılı, güncel standartlarda daha düşük puan alabilir)", artı: ["Güçlü ve verimli motor-şanzıman uyumu", "Geniş bagaj hacmi", "Sürüş konforu", "Zengin Icon donanım seviyesi"], eksi: ["Yalıtım daha iyi olabilirdi (rüzgar sesi)", "Arka baş mesafesi uzun boylular için sınırlı", "Malzeme kalitesi bazı noktalarda sert plastik", "Eski teknolojiye sahip multimedya arayüzü (Icon donanımda bile)"] },
    scores: { performans: 8.7, konfor: 8.2, tasarim: 7.9, verimlilik: 8.5, pratiklik: 9.0, teknoloji: 6.8, guvenlik: 7.5, fiyat_performans: 8.9 },
    summary: "Türkiye yollarının vazgeçilmezi Megane, Icon donanımıyla C segmentinde konfor, pratiklik ve güçlü performans sunuyor. Özellikle 1.3 TCe motoru ve EDC şanzımanıyla sınıfının en iyi kombinasyonlarından birine sahip. Bagajı geniş, sürüşü rahat, ancak teknolojik ve yalıtım açısından rakiplerinin biraz gerisinde kalıyor."
  },
  {
    id: 2, make: "Fiat", model: "Egea Sedan", year: 2024, version: "1.6 MultiJet Lounge DCT", price: 1310000,
    imageUrl: "https://cdn.pixabay.com/photo/2021/11/05/20/19/car-6771960_1280.jpg", 
    details: { segment: "C Segmenti / Sedan (Fiyat Odaklı C)", motor: "1598 cc, 4 Silindir, Dizel", güç: "130 bg", tork: "320 Nm", "0-100": "9.8 saniye", "yakıt": "4.1 - 4.3 L/100km (Karma, NEDC)", bagaj: "520 Litre", güvenlik: "3 Yıldız (Euro NCAP - 2016 test yılı, güncel standartlarda daha düşük puan alabilir)", artı: ["Sınıfının en iyi fiyat/performans oranı", "Geniş iç mekan ve çok geniş bagaj", "Düşük yakıt tüketimi (özellikle dizel)", "Yaygın servis ağı ve uygun parça fiyatları"], eksi: ["Eskiye yüz tutan tasarım ve teknoloji", "Rakiplerine göre daha düşük malzeme kalitesi ve yalıtım", "Eski Euro NCAP güvenlik puanı (3 yıldız)", "Daha az konforlu süspansiyon yapısı"] },
    scores: { performans: 7.8, konfor: 7.0, tasarim: 6.9, verimlilik: 9.3, pratiklik: 9.5, teknoloji: 6.2, guvenlik: 6.0, fiyat_performans: 9.8 },
    summary: "Fiat Egea, Türkiye pazarının en çok tercih edilen modellerinden biri. Fiyat odaklı yapısıyla C segmentinde en erişilebilir seçenek. Geniş bagajı, düşük yakıt tüketimi ve yaygın servis ağı büyük avantaj. Ancak malzeme kalitesi, teknoloji ve güvenlik açısından modern rakiplerinin gerisinde."
  },
  {
    id: 3, make: "Toyota", model: "Corolla", year: 2024, version: "1.8 Hybrid Dream e-CVT", price: 1650000,
    imageUrl: "https://cdn.pixabay.com/photo/2021/11/05/20/19/car-6771960_1280.jpg", 
    details: { segment: "C Segmenti / Sedan", motor: "1798 cc, 4 Silindir, Hibrit", güç: "140 bg (Kombine)", tork: "Bilgi Yok (Motor: 142 Nm, Elektrik Motoru: Bilgi Yok)", "0-100": "9.3 saniye", "yakıt": "4.5 - 4.7 L/100km (Karma, WLTP)", bagaj: "471 Litre", güvenlik: "5 Yıldız (Euro NCAP - 2019 test yılı)", artı: ["Son derece düşük yakıt tüketimi (özellikle şehir içi)", "Sessiz ve pürüzsüz sürüş", "Gelişmiş güvenlik özellikleri (Toyota Safety Sense)", "Üstün Toyota dayanıklılığı"], eksi: ["e-CVT şanzımanın gürültülü yapısı (ani hızlanmalarda)", "Multimedya arayüzü rakiplerine göre daha yavaş", "Arka koltuklarda diz mesafesi sınırlı", "Bagaj hacmi hibrit bataryaları nedeniyle Megane ve Egea'ya göre daha küçük"] },
    scores: { performans: 8.2, konfor: 8.5, tasarim: 8.0, verimlilik: 9.6, pratiklik: 8.5, teknoloji: 8.8, guvenlik: 9.5, fiyat_performans: 8.7 },
    summary: "Toyota Corolla Hybrid, yakıt ekonomisi, dayanıklılık ve güvenlik denilince akla gelen ilk model. Şehir içinde rakipsiz yakıt tüketimi sunuyor ve Toyota Safety Sense ile üst düzey güvenlik sağlıyor. e-CVT şanzımanın gürültüsü ve multimedya sistemi eleştirilebilir, ancak genel paket olarak çok başarılı."
  },
  {
    id: 4, make: "BMW", model: "3 Serisi", year: 2024, version: "320i ED Sport Line", price: 3100000,
    imageUrl: "https://cdn.pixabay.com/photo/2021/11/05/20/19/car-6771960_1280.jpg", 
    details: { segment: "D Segmenti / Premium Sedan", motor: "1597 cc, 4 Silindir, Benzinli", güç: "170 bg", tork: "250 Nm", "0-100": "7.7 saniye", "yakıt": "6.8 - 7.3 L/100km (Karma, WLTP)", bagaj: "480 Litre", güvenlik: "5 Yıldız (Euro NCAP - 2019 test yılı)", artı: ["Üstün sürüş dinamikleri ve performans", "Yüksek malzeme kalitesi ve premium his", "Gelişmiş iDrive multimedya sistemi", "Şık ve sportif tasarım (Sport Line)"], eksi: ["Rakiplerine göre daha yüksek fiyat", "Opsiyonel özelliklerin pahalı olması", "Yüksek yakıt tüketimi (özellikle performanslı kullanımda)", "Arka koltuklarda orta yolcu için konforun sınırlı olması"] },
    scores: { performans: 9.5, konfor: 9.2, tasarim: 9.4, verimlilik: 7.0, pratiklik: 8.0, teknoloji: 9.5, guvenlik: 9.2, fiyat_performans: 7.5 },
    summary: "BMW 320i ED, D segmentinde premium hissi, sportifliği ve teknolojiyi bir arada arayanların favorisi. 1.6 litrelik motoruna rağmen güçlü performans sunuyor ve sürüş keyfiyle öne çıkıyor. Malzeme kalitesi, iDrive sistemi ve güvenlik özellikleri çok başarılı. Ancak fiyatı ve opsiyon listesi oldukça yüksek."
  },
  {
    id: 5, make: "BMW", model: "i7", year: 2024, version: "i7 M60 eDrive", price: 8500000,
    imageUrl: "https://cdn.pixabay.com/photo/2021/11/05/20/19/car-6771960_1280.jpg", 
    details: { segment: "F Segmenti / Ultra-Premium Elektrikli Sedan", motor: "Çift Elektrik Motoru (M60)", güç: "659 bg", tork: "1100 Nm (Launch Control ile)", "0-100": "3.7 saniye", "yakıt": "Elektrik (Menzil: 590 - 625 km WLTP)", bagaj: "500 Litre", güvenlik: "5 Yıldız (Euro NCAP - 2022 test yılı)", artı: ["Ultra-lüks iç mekan ve üstün konfor", "İnanılmaz performans ve tork (M60)", "Büyük M Arka Eğlence Sistemi", "En gelişmiş sürüş asistanları ve teknoloji"], eksi: ["Çok yüksek fiyat tagı", "Büyük boyutu nedeniyle şehir içinde park zorluğu", "Ağır yapısı (2.7 ton)", "Arka koltuklardaki bazı teknolojilerin karmaşık olması"] },
    scores: { performans: 9.8, konfor: 10, tasarim: 9.6, verimlilik: 9.0, pratiklik: 8.5, teknoloji: 10, guvenlik: 9.8, fiyat_performans: 6.5 },
    summary: "BMW i7 M60, elektrikli lüks sedan segmentinde sınırları zorlayan bir model. Ultra lüks iç mekanı, üstün konforu ve inanılmaz performansıyla F segmentinde yeni bir standart belirliyor. M Arka Eğlence Sistemi ve gelişmiş teknolojileriyle bir otomobilden çok daha fazlası. Ancak fiyatı ve boyutu dikkat çekiyor."
  }
];

// --- YARDIMCI FONKSİYONLAR ---
const getOverallScore = (scores) => {
  const values = Object.values(scores);
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
};

const getScoreColor = (score) => {
  if (score >= 9) return "bg-green-600";
  if (score >= 8) return "bg-green-500";
  if (score >= 7) return "bg-yellow-500";
  if (score >= 6) return "bg-orange-500";
  return "bg-red-600";
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

const formatPrice = (price) => {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(price);
};

// --- BİLEŞENLER ---

const Header = () => (
  <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
    <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <GaugeCircle className="text-sky-400 h-9 w-9" />
        <h1 className="text-3xl font-extrabold tracking-tighter">Oto<span className="text-sky-400">Vasıta</span><span className="font-light text-slate-400">Analiz</span></h1>
      </div>
      <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-full w-96 shadow-inner border border-slate-700">
        <Search className="text-slate-500 h-5 w-5 ml-2" />
        <input type="text" placeholder="Marka, model veya segment ara..." className="bg-transparent text-sm w-full focus:outline-none text-slate-200" />
      </div>
      <div className="flex items-center gap-3">
        <button className="text-sm font-medium text-slate-300 hover:text-white transition">İncelemeler</button>
        <button className="text-sm font-medium bg-sky-600 px-5 py-2.5 rounded-full hover:bg-sky-500 transition shadow-md">Karşılaştır</button>
      </div>
    </nav>
  </header>
);

const CarCard = ({ car, onViewDetail, onCompare }) => {
  const overallScore = getOverallScore(car.scores);
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col group">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 right-4 bg-slate-900/80 text-white px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-base font-bold">{overallScore}</span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col justify-between gap-3">
        <div>
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-xs font-medium text-sky-700 uppercase tracking-wider">{car.details.segment}</p>
              <h3 className="text-xl font-bold text-slate-950 mt-0.5 tracking-tight">{car.make} {car.model}</h3>
              <p className="text-sm text-slate-600 mt-1">{car.year} | {car.version}</p>
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-3 tracking-tight">{formatPrice(car.price)}</p>
        </div>

        <div className="flex gap-2.5 pt-3 border-t border-slate-100">
          <button onClick={() => onViewDetail(car)} className="flex-1 text-sm font-semibold bg-slate-100 text-slate-800 py-3 rounded-xl hover:bg-slate-200 transition">Detaylar</button>
          <button onClick={() => onCompare(car)} className="flex-1 text-sm font-semibold bg-sky-50 text-sky-700 py-3 rounded-xl hover:bg-sky-100 transition flex items-center justify-center gap-2">
            <Scale className="w-4 h-4" /> Karşılaştır
          </button>
        </div>
      </div>
    </div>
  );
};

const CarDetailModal = ({ car, onClose }) => {
  const overallScore = getOverallScore(car.scores);
  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] p-6 overflow-y-auto flex justify-center items-start">
      <div className="bg-white rounded-3xl w-full max-w-7xl shadow-2xl relative mt-10 mb-10 overflow-hidden">
        
        {/* Header - Görsel Küçültüldü */}
        <div className="relative h-80 bg-slate-900">
          <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover opacity-60" />
          <button onClick={onClose} className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md transition">
            <ArrowRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-8 left-10 text-white">
            <p className="text-sm font-medium text-sky-300 uppercase tracking-widest">{car.details.segment}</p>
            <h2 className="text-5xl font-extrabold tracking-tighter mt-1">{car.make} {car.model}</h2>
            <p className="text-xl text-slate-200 mt-2 font-light">{car.year} | {car.version} - <span className="font-bold text-white">{formatPrice(car.price)}</span></p>
          </div>
        </div>

        {/* Content - Yazılar ve Puanlar Düzenlendi */}
        <div className="p-10 grid grid-cols-3 gap-10">
          <div className="col-span-2 space-y-10">
            {/* Summary */}
            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                    <ListChecks className="w-7 h-7 text-sky-600"/>
                    <h4 className="text-xl font-bold text-slate-950">Editoryal Özet</h4>
                </div>
              <p className="text-slate-700 leading-relaxed">{car.summary}</p>
            </section>

            {/* Scores - İç içe geçme düzeltildi */}
            <section>
              <div className="flex items-center justify-between gap-4 mb-6">
                 <div className="flex items-center gap-3">
                    <TrendingUp className="w-7 h-7 text-sky-600"/>
                    <h4 className="text-2xl font-bold text-slate-950">Puan Tablosu</h4>
                 </div>
                 <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-lg">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-3xl font-black">{overallScore}</span>
                    <span className="text-sm text-slate-400">/ 10.0</span>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {scoreCategories.map(cat => {
                  const score = car.scores[cat.id];
                  return (
                    <div key={cat.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="bg-sky-100 text-sky-700 p-3 rounded-full flex-shrink-0">
                         <cat.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-base font-semibold text-slate-900">{cat.label}</span>
                           <span className={`text-white px-3 py-1 text-xs font-bold rounded-full ${getScoreColor(score)}`}>{score.toFixed(1)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 shadow-inner">
                          <div className={`${getScoreColor(score)} h-2.5 rounded-full`} style={{ width: `${score * 10}%` }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Pros & Cons */}
            <section className="grid grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center gap-3 mb-4 text-green-800">
                    <ThumbsUp className="w-6 h-6"/>
                    <h4 className="text-lg font-bold">Artılar</h4>
                </div>
                <ul className="space-y-2.5 list-disc list-inside text-sm text-green-950/90 leading-relaxed">
                  {car.details.artı.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3 mb-4 text-red-800">
                    <ShieldAlert className="w-6 h-6"/>
                    <h4 className="text-lg font-bold">Eksiler</h4>
                </div>
                <ul className="space-y-2.5 list-disc list-inside text-sm text-red-950/90 leading-relaxed">
                  {car.details.eksi.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </section>
          </div>

          {/* Technical Details Sidebar */}
          <aside className="space-y-6">
            <h4 className="text-xl font-bold text-slate-950 pb-3 border-b border-slate-200">Teknik Veriler</h4>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4 shadow-inner text-sm">
                {[
                    {label: "Segment", value: car.details.segment},
                    {label: "Motor", value: car.details.motor},
                    {label: "Güç", value: car.details.güç},
                    {label: "Tork", value: car.details.tork},
                    {label: "0-100 km/s", value: car.details["0-100"]},
                    {label: "Yakıt (L/100km)", value: car.details.yakıt},
                    {label: "Bagaj", value: car.details.bagaj},
                    {label: "Güvenlik (NCAP)", value: car.details.güvenlik},
                ].map(item => (
                    <div key={item.label} className="flex justify-between gap-3 pb-3 border-b border-slate-200 last:border-0 last:pb-0">
                        <span className="font-medium text-slate-600 flex-shrink-0">{item.label}</span>
                        <span className="font-semibold text-slate-900 text-right leading-tight">{item.value}</span>
                    </div>
                ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// --- ANA UYGULAMA BİLEŞENİ ---
const App = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCompare = (car) => {
    alert(`${car.make} ${car.model} karşılaştırma listesine eklendi! (Bu özellik yakında aktif olacak)`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <ListChecks className="text-sky-600 h-8 w-8" />
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tighter">Tüm Araç İncelemeleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carsData.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                onViewDetail={setSelectedCar}
                onCompare={handleCompare}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm font-light">
          &copy; 2024 OtoVasıtaAnaliz. Tüm hakları saklıdır. Yapay zeka destekli otomobil analiz platformu.
        </div>
      </footer>

      {selectedCar && <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </div>
  );
};

export default App;
