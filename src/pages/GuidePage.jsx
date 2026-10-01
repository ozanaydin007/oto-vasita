import { Link, useParams } from 'react-router-dom';
import { getGuide } from '../data/guides.js';
import { getCar } from '../data/cars.js';
import { formatScore, priceLabel } from '../lib/scoring.js';
import CarImage, { PhotoCredit } from '../components/CarImage.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import NotFound from './NotFound.jsx';
import useTitle from '../lib/useTitle.js';

// Listeli rehberlerde her aracın altında gösterilebilecek kutucuklar.
// guides.js içinde rehbere stats: ['bagaj', 'guvenlik', ...] ekleyerek seçilir.
const score = (key) => (car) => `${formatScore(car.ratings[key])} / 10`;
const STATS = {
  tuketimSpec: { label: 'Katalog tüketimi', value: (car) => car.specs.tuketim },
  tuketimPuan: { label: 'Tüketim puanı', value: score('tuketim') },
  yakit: { label: 'Yakıt', value: (car) => car.fuel },
  bagaj: { label: 'Bagaj', value: (car) => car.specs.bagaj },
  guvenlik: { label: 'Güvenlik puanı', value: score('guvenlik') },
  konfor: { label: 'Konfor puanı', value: score('konfor') },
  guvenilirlik: { label: 'Güvenilirlik puanı', value: score('guvenilirlik') },
  ikinciel: { label: 'İkinci el puanı', value: score('ikinciel') },
  fiyat: { label: 'Liste fiyatı', value: (car) => priceLabel(car) },
};

export default function GuidePage() {
  const { slug } = useParams();
  const guide = getGuide(slug);
  useTitle(guide?.title);
  if (!guide) return <NotFound />;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
      <nav aria-label="Konum" className="text-sm text-muted mb-4">
        <Link to="/rehber" className="hover:text-link">Rehber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-soft">{guide.title}</span>
      </nav>
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">{guide.title}</h1>
      <p className="text-xl text-ink-soft mt-3 leading-relaxed">{guide.subtitle}</p>
      <p className="text-sm text-muted mt-3">
        <time dateTime={guide.date}>{guide.dateLabel}</time>
      </p>

      <div className="mt-8 space-y-4 text-[17px] leading-relaxed">
        {guide.intro.map((p) => <p key={p}>{p}</p>)}
      </div>

      {guide.method && (
        <aside className="mt-6 bg-mist rounded-xl p-5 text-[15px] leading-relaxed text-ink-soft">
          <p className="font-semibold text-ink mb-1">Nasıl sıraladık?</p>
          <p>{guide.method}</p>
        </aside>
      )}

      {guide.items?.length > 0 && (
        <ol className="mt-10 space-y-12">
          {guide.items.map((item, i) => {
            const car = getCar(item.car);
            if (!car) return null;
            return (
              <li key={item.car}>
                <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                  <span className="tabular-nums">{i + 1}.</span>{' '}
                  <Link to={`/inceleme/${car.slug}`} className="hover:text-link">
                    {car.year} {car.make} {car.model}
                  </Link>
                </h2>
                <p className="text-muted mt-1">{car.version}</p>
                <figure className="mt-4">
                  <CarImage car={car} className="h-56 sm:h-72 bg-mist rounded-xl" />
                  <figcaption><PhotoCredit car={car} className="mt-2" /></figcaption>
                </figure>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  {(guide.stats || ['tuketimSpec', 'tuketimPuan', 'yakit']).map((key) => {
                    const st = STATS[key];
                    return st ? (
                      <div key={key} className="bg-mist rounded-lg p-3">
                        <dt className="text-muted">{st.label}</dt>
                        <dd className="font-semibold mt-0.5 tabular-nums">{st.value(car)}</dd>
                      </div>
                    ) : null;
                  })}
                </dl>
                <p className="mt-4 text-[17px] leading-relaxed">{item.text}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[15px]">
                  <ScoreBadge score={car.score} />
                  <span className="text-muted">genel puan</span>
                  <Link to={`/inceleme/${car.slug}`} className="text-link hover:underline underline-offset-2">
                    İncelemenin tamamını oku
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {guide.sections?.map((s) => (
        <section key={s.title} className="mt-12">
          <h2 className="font-display text-2xl font-bold">{s.title}</h2>
          {s.paragraphs?.map((p) => <p key={p} className="mt-3 text-[17px] leading-relaxed">{p}</p>)}
          {s.list && (
            <ul className="mt-3 list-disc pl-6 space-y-1.5 text-[17px] leading-relaxed">
              {s.list.map((li) => <li key={li}>{li}</li>)}
            </ul>
          )}
          {s.cars?.length > 0 && (
            <p className="mt-4 text-[15px] text-ink-soft">
              <span className="font-semibold text-ink">Sitemizdeki ilgili incelemeler: </span>
              {s.cars
                .map((slug) => getCar(slug))
                .filter(Boolean)
                .map((car, i, arr) => (
                  <span key={car.slug}>
                    <Link to={`/inceleme/${car.slug}`} className="text-link hover:underline underline-offset-2">
                      {car.year} {car.make} {car.model}
                    </Link>
                    {i < arr.length - 1 ? ', ' : ''}
                  </span>
                ))}
            </p>
          )}
        </section>
      ))}
    </article>
  );
}
