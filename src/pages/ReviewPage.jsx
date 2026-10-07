import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';
import { getCar, getCategory, carsInCategory } from '../data/cars.js';
import { CRITERIA } from '../data/criteria.js';
import { formatScore, priceLabel, scoreVerdict } from '../lib/scoring.js';
import { buildEditorial, buildReview } from '../lib/review.js';
import CarImage, { PhotoCredit } from '../components/CarImage.jsx';
import CompareToggle from '../components/CompareToggle.jsx';
import { comparePath } from '../lib/compare.js';
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
          <p className="text-white/70 text-sm mt-0.5">10 başlığın ağırlıklı ortalaması</p>
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

function FullReview({ car, category }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [car.slug]);
  const review = buildReview(car, category);

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="tam-inceleme"
        className="inline-flex items-center gap-2 bg-ink text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-ink-soft"
      >
        {open ? 'Tam incelemeyi gizle' : 'Tam incelemeyi oku'}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div id="tam-inceleme" className="mt-6 border-l-2 border-star pl-5 sm:pl-6 space-y-6 max-w-prose">
          <p className="text-[17px] leading-relaxed">{review.intro}</p>
          {review.sections.map((s) => (
            <section key={s.key}>
              <h3 className="font-display text-xl font-bold flex items-baseline justify-between gap-4">
                {s.label}
                <span className="text-base font-semibold tabular-nums text-ink-soft">{formatScore(s.score)} / 10</span>
              </h3>
              <p className="mt-1.5 text-[17px] leading-relaxed text-ink-soft">{s.text}</p>
            </section>
          ))}
          <section>
            <h3 className="font-display text-xl font-bold">Sonuç</h3>
            <p className="mt-1.5 text-[17px] leading-relaxed">{review.conclusion}</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default function ReviewPage() {
  const { slug } = useParams();
  const car = getCar(slug);
  useTitle(car ? `${car.year} ${car.make} ${car.model} incelemesi` : null);
  if (!car) return <NotFound />;

  const category = getCategory(car.category);
  const rivals = carsInCategory(car.category).filter((c) => c.slug !== car.slug);
  const extraSpecs = [
    ['Model yılı', car.year],
    ['Yakıt', car.fuel],
    ['Vites', car.gearbox],
  ].filter(([, v]) => v);

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
          {car.used && (
            <p className="mt-3 inline-block text-sm font-medium border border-star rounded px-2 py-0.5">
              İkinci el değerlendirmesi
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <ScoreBadge score={car.score} size="md" />
            <StarRating value={car.score} size={20} />
          </div>
          <div className="mt-4">
            <CompareToggle car={car} />
          </div>
          <p className="mt-5 text-[15px]">
            <Link to={`/kategori/${category.slug}`} className="text-link hover:underline underline-offset-2">
              {category.title}
            </Link>{' '}
            listesinde <strong className="font-semibold">{car.rank}. sırada</strong>
          </p>
          <p className="mt-1 text-[15px]">
            {car.price != null ? (
              <>Başlangıç fiyatı <strong className="font-semibold">{priceLabel(car)}</strong></>
            ) : (
              <span className="text-muted">{priceLabel(car)}</span>
            )}
          </p>
        </div>
        <figure>
          <CarImage car={car} className="h-56 sm:h-72 bg-mist rounded-xl" />
          <figcaption>
            <PhotoCredit car={car} className="mt-2" />
          </figcaption>
        </figure>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-start">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl font-bold mb-3">Editörün görüşü</h2>
            <p className="text-lg leading-relaxed max-w-prose">{car.summary}</p>
            <p className="text-lg leading-relaxed text-ink-soft max-w-prose mt-4">{buildEditorial(car)}</p>
            <FullReview car={car} category={category} />
          </section>

          <section className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold flex items-center gap-2 text-good mb-2">
                <ThumbsUp className="w-4 h-4" aria-hidden="true" /> Beğendiklerimiz
              </h3>
              {car.pros.length > 0 ? (
                <ul className="space-y-1.5 text-[15px] list-disc pl-5 marker:text-good">
                  {car.pros.map((p) => <li key={p}>{p}</li>)}
                </ul>
              ) : (
                <p className="text-[15px] text-muted">Öne çıkan bir artısını bulamadık.</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2 text-bad mb-2">
                <ThumbsDown className="w-4 h-4" aria-hidden="true" /> Beğenmediklerimiz
              </h3>
              {car.cons.length > 0 ? (
                <ul className="space-y-1.5 text-[15px] list-disc pl-5 marker:text-bad">
                  {car.cons.map((p) => <li key={p}>{p}</li>)}
                </ul>
              ) : (
                <p className="text-[15px] text-muted">Kayda değer bir eksiğini bulamadık.</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-3">Teknik veriler</h2>
            <dl className="border-t border-rule">
              {extraSpecs.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[10rem_1fr] gap-4 py-2.5 border-b border-rule text-[15px]">
                  <dt className="text-muted">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
              {car.specs?.menzil && (
                <div className="grid grid-cols-[10rem_1fr] gap-4 py-2.5 border-b border-rule text-[15px]">
                  <dt className="text-muted">{car.fuel === 'Elektrik' ? 'Menzil' : 'Elektrikli menzil'}</dt>
                  <dd className="font-medium">{car.specs.menzil}</dd>
                </div>
              )}
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
                  <p className="font-semibold group-hover:text-link">#{r.rank} {r.year} {r.make} {r.model}</p>
                  <p className="text-sm text-muted tabular-nums">{formatScore(r.score)} / 10</p>
                </Link>
                <Link to={comparePath([car.slug, r.slug])} className="mt-1 inline-block text-sm text-link hover:underline underline-offset-2">
                  Karşılaştır
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
