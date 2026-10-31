import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';
import { getCar, getCategory, carsInCategory } from '../data/cars.js';
import { CRITERIA } from '../data/criteria.js';
import { formatScore, priceLabel, scoreVerdict } from '../lib/scoring.js';
import CarImage, { PhotoCredit } from '../components/CarImage.jsx';
import CompareToggle from '../components/CompareToggle.jsx';
import RadarChart from '../components/RadarChart.jsx';
import { useCarDetails } from '../lib/details.js';
import { guidesForCar } from '../data/guides.js';
import { POPULAR_COMPARISONS } from '../data/comparisons.js';
import { comparePath } from '../lib/compare.js';
import StarRating from '../components/StarRating.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import NotFound from './NotFound.jsx';
import useTitle from '../lib/useTitle.js';

const SPEC_LABELS = [
  ['motor', 'Motor ve güç'],
  ['tork', 'Maksimum tork'],
  ['gucAgirlik', 'Güç/ağırlık'],
  ['cekis', 'Çekiş sistemi'],
  ['hizlanma', '0–100 km/s'],
  ['azami', 'Azami sürat'],
  ['tuketim', 'Tüketim'],
  ['depo', 'Yakıt deposu'],
  ['agirlik', 'Boş ağırlık'],
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
      <div className="px-4 pt-5 pb-2 border-b border-rule">
        <RadarChart cars={[car]} />
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

// Tam inceleme tek, akıcı bir metin olarak gösterilir.
// Araçta longReview (elle yazılmış uzun inceleme) varsa doğrudan o kullanılır;
// yoksa başlıklar birbiriyle ilgili konulara göre paragraflarda birleştirilir.
const PARAGRAPH_GROUPS = [
  ['surus', 'tuketim'],
  ['konfor', 'malzeme', 'tasarim'],
  ['teknoloji', 'guvenlik'],
  ['guvenilirlik', 'ikinciel', 'fiyat'],
];

function reviewParagraphs(car) {
  // Yalnızca elle yazılmış içerik gösterilir; puanlardan üretilen otomatik
  // cümleler kullanılmaz (bu bilgiler zaten puan karnesinde var).
  if (Array.isArray(car.longReview) && car.longReview.length) return car.longReview;
  const own = (k) => [car.review?.[k], car.reviewExtra?.[k]].filter(Boolean).join(' ');
  return [
    car.review?.giris,
    ...PARAGRAPH_GROUPS.map((g) => g.map(own).filter(Boolean).join(' ')),
    car.review?.sonuc,
  ].filter(Boolean);
}

function FullReview({ car }) {
  // İnceleme metni sayfanın ana içeriği olduğu için doğrudan açık gösterilir
  return (
    <section className="mt-8" aria-labelledby="h-inceleme">
      <h2 id="h-inceleme" className="font-display text-2xl font-bold">İnceleme</h2>
      <div id="tam-inceleme" className="mt-4 border-l-2 border-star pl-5 sm:pl-6 space-y-5 max-w-prose">
        {reviewParagraphs(car).map((t, i) => (
          <p key={i} className="text-[17px] leading-relaxed">{t}</p>
        ))}
        {car.longReview && (
          <p className="text-sm text-muted pt-2 border-t border-rule">
            Bu inceleme, OtoVaro editörlerinin kullanım deneyimlerine ve araştırmalarına dayanır.{' '}
            <Link to="/hakkinda" className="text-link hover:underline underline-offset-2">Biz kimiz?</Link>
          </p>
        )}
      </div>
    </section>
  );
}

// Aracın geçtiği rehberler ve hazır karşılaştırmalar (okuyucu ve Google için iç bağlantılar)
function RelatedLinks({ car }) {
  const guides = guidesForCar(car.slug);
  const comps = POPULAR_COMPARISONS.filter((p) => p.includes(car.slug) && p.every((x) => getCar(x)))
    .map((p) => p.map(getCar));
  if (!guides.length && !comps.length) return null;
  return (
    <section className="mt-16" aria-labelledby="h-ilgili">
      <h2 id="h-ilgili" className="font-display text-2xl font-bold border-b border-rule pb-3">
        {car.make} {car.model} ile ilgili yazılar
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link to={`/rehber/${g.slug}`} className="block border border-rule rounded-lg px-4 py-3 hover:border-ink hover:bg-mist">
              <span className="text-xs text-muted">Rehber</span>
              <span className="block font-medium leading-snug">{g.title}</span>
            </Link>
          </li>
        ))}
        {comps.map((cars) => (
          <li key={cars.map((c) => c.slug).join()}>
            <Link to={`/karsilastir/${cars.map((c) => c.slug).join('-vs-')}`} className="block border border-rule rounded-lg px-4 py-3 hover:border-ink hover:bg-mist">
              <span className="text-xs text-muted">Karşılaştırma</span>
              <span className="block font-medium leading-snug">{cars.map((c) => `${c.make} ${c.model}`).join(' vs ')}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ReviewPage() {
  const { slug } = useParams();
  const base = getCar(slug);
  // Uzun inceleme ve SSS ayrı yüklenir (ana paket hafif kalsın)
  const details = useCarDetails(base ? slug : null);
  const car = base && details ? { ...base, ...details } : base;
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
          {/* Sıralama yalnızca kategorisinin ilk 10'undaki araçlarda gösterilir */}
          {car.rank <= 10 && (
            <p className="mt-5 text-[15px]">
              <Link to={`/kategori/${category.slug}`} className="text-link hover:underline underline-offset-2">
                {category.title}
              </Link>{' '}
              listesinde <strong className="font-semibold">{car.rank}. sırada</strong>
            </p>
          )}
          <p className={`${car.rank <= 10 ? 'mt-1' : 'mt-5'} text-[15px]`}>
            {car.price != null ? (
              <>Başlangıç fiyatı <strong className="font-semibold">{priceLabel(car)}</strong></>
            ) : (
              <span className="text-muted">{priceLabel(car)}</span>
            )}
          </p>
        </div>
        <figure>
          <CarImage car={car} className="h-56 sm:h-72 bg-mist rounded-xl" priority />
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
            {/* Tam inceleme yalnızca kişisel notu olan araçlarda gösterilir */}
            {(car.longReview || car.review || car.reviewExtra) && <FullReview car={car} />}
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
            <p className="mt-3 text-xs text-muted leading-snug">
              Teknik veriler üretici kataloglarına dayanan yaklaşık değerlerdir; versiyona, donanıma ve model yılına göre farklılık gösterebilir.
            </p>
          </section>
        </div>

        <Scorecard car={car} />
      </div>

      {car.faq?.length > 0 && (
        <section className="mt-16 max-w-3xl" aria-labelledby="h-sss">
          <h2 id="h-sss" className="font-display text-2xl font-bold border-b border-rule pb-3">
            {car.make} {car.model} hakkında sık sorulan sorular
          </h2>
          <dl className="mt-2 divide-y divide-rule">
            {car.faq.map(({ q, a }) => (
              <div key={q} className="py-4">
                <dt className="font-semibold text-[17px]">{q}</dt>
                <dd className="mt-1.5 text-[16px] leading-relaxed text-ink-soft">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <RelatedLinks car={car} />

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
