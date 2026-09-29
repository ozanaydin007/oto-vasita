import { CRITERIA } from '../data/criteria.js';
import StarRating from '../components/StarRating.jsx';
import useTitle from '../lib/useTitle.js';

export default function Methodology() {
  useTitle('Nasıl puanlıyoruz?');
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">Nasıl puanlıyoruz?</h1>
      <p className="text-lg text-ink-soft mt-4 leading-relaxed">
        Her aracı aşağıdaki 10 başlıkta 10 üzerinden puanlıyoruz. Puanlar küsuratlı olabilir; örneğin 8,7 puan
        8 tam ve bir de %70’i dolu yıldız olarak gösterilir. Genel puan bu on başlığın ortalamasıdır ve
        kategori sıralamaları genel puana göre otomatik oluşur.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <StarRating value={8.7} size={22} />
        <span className="font-display text-xl font-bold">8,7</span>
      </div>
      <dl className="mt-10 border-t border-rule">
        {CRITERIA.map((c) => (
          <div key={c.key} className="py-4 border-b border-rule grid sm:grid-cols-[12rem_1fr] gap-1 sm:gap-6">
            <dt className="font-display text-xl font-bold">{c.label}</dt>
            <dd className="text-ink-soft leading-relaxed">{c.hint}</dd>
          </div>
        ))}
      </dl>
      <h2 className="font-display text-2xl font-bold mt-10">Puanlar nereden geliyor?</h2>
      <p className="mt-3 text-ink-soft leading-relaxed">
        Puanlarımız, araçlarla kendi deneyimlerimizi üretici verileri, Euro NCAP gibi bağımsız güvenlik
        testleri, kullanıcı deneyimleri, bilinen kronik sorunlar ve Türkiye ikinci el piyasası bilgileriyle
        birleştiren editoryal değerlendirmelerdir. İnceleme metinleri de bu puanlara göre hazırlanır.
      </p>
      <p className="mt-6 text-ink-soft leading-relaxed">
        Güvenilirlik puanında aracın bilinen kronik sorunlarını, motor, şanzıman, şasi ve yürüyen aksamının uzun
        vadeli dayanıklılığını değerlendiriyoruz. İkinci el puanında ise Türkiye piyasasında temiz bir örneğin
        bulunabilirliğine, değer kaybına ve aracın ne kadar hızlı satıldığına bakıyoruz.
      </p>
    </div>
  );
}
