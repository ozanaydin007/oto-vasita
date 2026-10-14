import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES, CARS, carsInCategory, getCar } from '../data/cars.js';
import { EDITOR_WEEKS } from '../data/editorPicks.js';
import EditorPickCard from '../components/EditorPickCard.jsx';
import { CRITERIA } from '../data/criteria.js';
import { formatScore } from '../lib/scoring.js';
import CarImage from '../components/CarImage.jsx';
import StarRating from '../components/StarRating.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import useTitle from '../lib/useTitle.js';

function RankingColumn({ category }) {
  const cars = carsInCategory(category.slug).slice(0, 5);
  if (cars.length === 0) return null;
  return (
    <section className="flex flex-col" aria-labelledby={`h-${category.slug}`}>
      <Link to={`/inceleme/${cars[0].slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <CarImage car={cars[0]} className="h-36 mb-5" />
      </Link>
      <h2 id={`h-${category.slug}`} className="font-display text-xl font-bold leading-tight mb-3">
        {category.title}
      </h2>
      <ol className="space-y-2.5 flex-1">
        {cars.map((car) => (
          <li key={car.slug} className="flex items-baseline gap-2 text-[15px]">
            <span className="font-display font-bold w-6 shrink-0 tabular-nums">#{car.rank}</span>
            <Link to={`/inceleme/${car.slug}`} className="flex-1 min-w-0 hover:text-link hover:underline underline-offset-2">
              {car.year} {car.make} {car.model}
            </Link>
            <span className="text-sm text-muted tabular-nums">{formatScore(car.score)}</span>
          </li>
        ))}
      </ol>
      <Link
        to={`/kategori/${category.slug}`}
        className="mt-5 inline-flex items-center gap-0.5 text-link hover:text-link-dark hover:underline underline-offset-2 text-[15px]"
      >
        {category.short} sıralamasının tamamı <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

function EditorPicks() {
  // 0 = bu hafta; sol ok daha eski haftalara, sağ ok yeniye götürür
  const [index, setIndex] = useState(0);
  const weeks = EDITOR_WEEKS.map((w) => ({
    ...w,
    picks: w.items.map((p) => ({ ...p, car: getCar(p.car) })).filter((p) => p.car),
  })).filter((w) => w.picks.length);
  if (weeks.length === 0) return null;
  const canOlder = index < weeks.length - 1;
  const canNewer = index > 0;
  const arrow =
    'w-10 h-10 rounded-full border border-rule inline-flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:border-ink enabled:hover:bg-mist';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4" aria-labelledby="h-secim">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule pb-3">
        <h2 id="h-secim" className="font-display text-3xl font-extrabold tracking-tight">Editörün seçimi</h2>
        <div className="flex items-center gap-3">
          <button type="button" className={arrow} onClick={() => setIndex((i) => i + 1)} disabled={!canOlder} aria-label="Önceki haftanın seçimleri">
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <span className="text-sm text-muted min-w-[9.5rem] text-center" aria-live="polite">
            {weeks[index].week}
            {index === 0 && <span className="ml-1.5 text-xs font-semibold bg-star text-ink rounded px-1.5 py-0.5">Bu hafta</span>}
          </span>
          <button type="button" className={arrow} onClick={() => setIndex((i) => i - 1)} disabled={!canNewer} aria-label="Sonraki haftanın seçimleri">
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mt-6 overflow-hidden">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {weeks.map((w, i) => (
            <div key={w.week} className="min-w-full" aria-hidden={i !== index} inert={i !== index || undefined}>
              <ul className="grid gap-6 md:grid-cols-3">
                {w.picks.map(({ car, text }) => <EditorPickCard key={car.slug} car={car} text={text} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Ana sayfada araç bulucu ve karşılaştırmayı öne çıkaran kartlar
function ToolCards() {
  const card = 'flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-rule rounded-xl p-5 sm:p-6 bg-mist';
  const btn = 'shrink-0 inline-flex items-center gap-1 bg-ink text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-ink-soft';
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-4" aria-label="Araç bulucu ve karşılaştırma">
      <div className="grid gap-4 md:grid-cols-2">
        <div className={card}>
          <div>
            <h2 className="font-display text-xl font-bold">Araç bulucu</h2>
            <p className="mt-1 text-ink-soft leading-relaxed">
              İstediğiniz aracı bulmanıza yardımcı olalım. Birkaç soruyu cevaplayın ya da radarımızı kendiniz ayarlayın.
            </p>
          </div>
          <Link to="/arac-bulucu" className={btn}>
            Aracımı bul <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        <div className={card}>
          <div>
            <h2 className="font-display text-xl font-bold">Araç karşılaştırma</h2>
            <p className="mt-1 text-ink-soft leading-relaxed">
              Aklınızdaki otomobilleri yan yana koyun; puanları, teknik verileri ve artı-eksileri tek ekranda görün.
            </p>
          </div>
          <Link to="/karsilastir" className={btn}>
            Karşılaştır <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useTitle(null);
  const top = [...CARS].sort((a, b) => b.score - a.score).slice(0, 6);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-4">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
          2026 otomobil sıralamaları
        </h1>
        <p className="text-ink-soft mt-3 max-w-2xl text-lg leading-relaxed">
          Her aracı sürüşten ikinci el değerine 10 başlıkta, 10 üzerinden puanlıyoruz. Sıralamalar bu puanların ağırlıklı ortalamasına göre belirleniyor.
        </p>
      </div>

      <ToolCards />

      <EditorPicks />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
        {CATEGORIES.map((c) => (
          <RankingColumn key={c.slug} category={c} />
        ))}
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10" aria-labelledby="h-top">
        <h2 id="h-top" className="font-display text-3xl font-extrabold tracking-tight border-b border-rule pb-3">
          En yüksek puanı alanlar
        </h2>
        <ul className="divide-y divide-rule">
          {top.map((car) => (
            <li key={car.slug}>
              <Link to={`/inceleme/${car.slug}`} className="group grid grid-cols-[88px_1fr_auto] sm:grid-cols-[140px_1fr_auto] items-center gap-4 sm:gap-6 py-4">
                <CarImage car={car} className="h-12 sm:h-16" />
                <div className="min-w-0">
                  <p className="font-semibold text-lg group-hover:text-link">{car.year} {car.make} {car.model}</p>
                  <p className="text-sm text-muted truncate">{car.version}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <ScoreBadge score={car.score} car={car} />
                  <StarRating value={car.score} size={12} className="hidden sm:inline-flex" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-mist rounded-xl p-6 sm:p-8 grid gap-6 lg:grid-cols-[1fr_2fr] items-start">
          <div>
            <h2 className="font-display text-2xl font-bold">10 başlık, 10 yıldız</h2>
            <p className="text-ink-soft mt-2 leading-relaxed">
              Her başlık 10 üzerinden, gerektiğinde küsuratlı puanlanır. Genel puan, on başlığın ağırlıklı ortalamasıdır.
            </p>
            <Link to="/puanlama" className="inline-flex items-center gap-0.5 mt-3 text-link hover:underline underline-offset-2">
              Puanlama yöntemini oku <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-3">
            {CRITERIA.map((c) => (
              <li key={c.key} className="font-medium">{c.label}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
