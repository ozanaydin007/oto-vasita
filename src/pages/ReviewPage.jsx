import { Link, useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { getCar, getCategory, carsInCategory } from '../data/cars.js';
import { CRITERIA } from '../data/criteria.js';
import { formatPrice, formatScore, scoreVerdict } from '../lib/scoring.js';
import CarImage from '../components/CarImage.jsx';
import StarRating from '../components/StarRating.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import NotFound from './NotFound.jsx';
import useTitle from '../lib/useTitle.js';

const SPEC_LABELS = [
  ['motor', 'Motor ve güç'],
  ['hizlanma', '0–100 km/s'],
  ['tuketim', 'Tüketim'],
  ['bagaj', 'Bagaj hacmi'],
];

function Scorecard({ car }) {
  return (
    <section aria-labelledby="h-karne" className="border border-rule rounded-xl overflow-hidden">
      <div className="bg-ink text-white px-5 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="h-karne" className="font-display text-2xl font-bold">Puan karnesi</h2>
          <p className="text-white/70 text-sm mt-0.5">8 başlığın ortalaması</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-display text-5xl font-extrabold tabular-nums leading-none">
            {formatScore(car.score)}
            <span className="text-xl text-white/60 font-semibold">/10</span>
          </span>
          <span className="font-display text-lg font-semibold text-star">{scoreVerdict(car.score)}</span>
        </div>
      </div>
      <ul className="divide-y divide-rule">
        {CRITERIA.map((c) => {
          const v = car.ratings[c.key];
          return (
            <li key={c.key} className="px-5 sm:px-6 py-3.5 grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(0,1fr)_auto_3.5rem] items-center gap-x-4 gap-y-1.5">
              <div className="min-w-0">
                <p className="font-semibold">{c.label}</p>
                <p className="text-xs text-muted">{c.hint}</p>
              </div>
              <span className="font-display text-xl font-bold tabular-nums text-right sm:order-last">{formatScore(v)}</span>
              <StarRating value={v} size={18} className="col-span-2 sm:col-span-1" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function ReviewPage() {
  const { slug } = useParams();
  const car = getCar(slug);
  useTitle(car ? `${car.year} ${car.make} ${car.model} incelemesi` : null);
  if (!car) return <NotFound />;

  const category = getCategory(car.category);
  const rivals = carsInCategory(car.category).filter((c) => c.slug !== car.slug);

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
      <nav aria-label="Konum" className="text-sm text-muted mb-4">
        <Link to="/" className="hover:text-link">Sıralamalar</Link>
        <span className="mx-1.5">/</span>
        <Link to={`/kategori/${category.slug}`} className="hover:text-link">{category.short}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-soft">{car.make} {car.model}</span>
      </nav>

      <header className="grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            {car.year} {car.make} {car.model}
          </h1>
          <p className="text-ink-soft mt-2 text-lg">{car.version}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <ScoreBadge score={car.score} size="md" />
            <StarRating value={car.score} size={20} />
          </div>
          <p className="mt-5 text-[15px]">
            <Link to={`/kategori/${category.slug}`} className="text-link hover:underline underline-offset-2">
              {category.title}
            </Link>{' '}
            listesinde <strong className="font-semibold">{car.rank}. sırada</strong>
          </p>
          <p className="mt-1 text-[15px]">
            Başlangıç fiyatı <strong className="font-semibold">{formatPrice(car.price)}</strong>
          </p>
        </div>
        <CarImage car={car} className="h-48 sm:h-64 bg-mist rounded-xl p-4 sm:p-8" />
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-start">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl font-bold mb-3">Editörün görüşü</h2>
            <p className="text-lg leading-relaxed text-ink-soft max-w-prose">{car.summary}</p>
          </section>

          <section className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold flex items-center gap-2 text-good mb-2">
                <ThumbsUp className="w-4 h-4" aria-hidden="true" /> Beğendiklerimiz
              </h3>
              <ul className="space-y-1.5 text-[15px] list-disc pl-5 marker:text-good">
                {car.pros.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2 text-bad mb-2">
                <ThumbsDown className="w-4 h-4" aria-hidden="true" /> Beğenmediklerimiz
              </h3>
              <ul className="space-y-1.5 text-[15px] list-disc pl-5 marker:text-bad">
                {car.cons.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">Teknik veriler</h2>
            <dl className="border-t border-rule">
              {SPEC_LABELS.map(([key, label]) =>
                car.specs?.[key] ? (
                  <div key={key} className="grid grid-cols-[10rem_1fr] gap-4 py-2.5 border-b border-rule text-[15px]">
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-medium">{car.specs[key]}</dd>
                  </div>
                ) : null
              )}
            </dl>
          </section>
        </div>

        <Scorecard car={car} />
      </div>

      {rivals.length > 0 && (
        <section className="mt-16" aria-labelledby="h-rivals">
          <h2 id="h-rivals" className="font-display text-2xl font-bold border-b border-rule pb-3">
            Aynı sınıftaki rakipler
          </h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {rivals.slice(0, 4).map((r) => (
              <li key={r.slug}>
                <Link to={`/inceleme/${r.slug}`} className="group block">
                  <CarImage car={r} className="h-24 mb-3" />
                  <p className="font-semibold group-hover:text-link">#{r.rank} {r.make} {r.model}</p>
                  <p className="text-sm text-muted tabular-nums">{formatScore(r.score)} / 10</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
