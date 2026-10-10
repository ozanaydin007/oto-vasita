import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES, CARS, carsInCategory, getCar } from '../data/cars.js';
import { EDITOR_PICKS } from '../data/editorPicks.js';
import MiniRadar from '../components/MiniRadar.jsx';
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
  const picks = EDITOR_PICKS.items.map((p) => ({ ...p, car: getCar(p.car) })).filter((p) => p.car);
  if (picks.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4" aria-labelledby="h-secim">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-3">
        <h2 id="h-secim" className="font-display text-3xl font-extrabold tracking-tight">Editörün seçimi</h2>
        <span className="text-sm text-muted">{EDITOR_PICKS.week}</span>
      </div>
      <ul className="mt-6 grid gap-6 md:grid-cols-3">
        {picks.map(({ car, text }) => (
          <li key={car.slug} className="border border-rule rounded-xl overflow-hidden flex flex-col">
            <Link to={`/inceleme/${car.slug}`} tabIndex={-1} aria-hidden="true">
              <CarImage car={car} className="h-44 bg-mist" />
            </Link>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold leading-tight">
                  <Link to={`/inceleme/${car.slug}`} className="hover:text-link">
                    {car.year} {car.make} {car.model}
                  </Link>
                </h3>
                <MiniRadar car={car} size={52} />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft flex-1">“{text}”</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <ScoreBadge score={car.score} />
                <Link to={`/inceleme/${car.slug}`} className="text-link hover:underline underline-offset-2 text-[15px] inline-flex items-center gap-0.5">
                  İncelemeyi oku <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
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
