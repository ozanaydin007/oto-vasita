import { Link, useParams } from 'react-router-dom';
import { getGuide } from '../data/guides.js';
import { getCar } from '../data/cars.js';
import { formatScore } from '../lib/scoring.js';
import CarImage, { PhotoCredit } from '../components/CarImage.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import NotFound from './NotFound.jsx';
import useTitle from '../lib/useTitle.js';

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
                  <div className="bg-mist rounded-lg p-3">
                    <dt className="text-muted">Katalog tüketimi</dt>
                    <dd className="font-semibold mt-0.5">{car.specs.tuketim}</dd>
                  </div>
                  <div className="bg-mist rounded-lg p-3">
                    <dt className="text-muted">Tüketim puanı</dt>
                    <dd className="font-semibold mt-0.5 tabular-nums">{formatScore(car.ratings.tuketim)} / 10</dd>
                  </div>
                  <div className="bg-mist rounded-lg p-3">
                    <dt className="text-muted">Yakıt</dt>
                    <dd className="font-semibold mt-0.5">{car.fuel}</dd>
                  </div>
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
        </section>
      ))}
    </article>
  );
}
