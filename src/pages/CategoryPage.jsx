import { Link, useParams } from 'react-router-dom';
import { getCategory, carsInCategory } from '../data/cars.js';
import { priceLabel } from '../lib/scoring.js';
import CarImage from '../components/CarImage.jsx';
import StarRating from '../components/StarRating.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import NotFound from './NotFound.jsx';
import useTitle from '../lib/useTitle.js';

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategory(slug);
  useTitle(category?.title);
  if (!category) return <NotFound />;
  const cars = carsInCategory(slug);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
      <nav aria-label="Konum" className="text-sm text-muted mb-4">
        <Link to="/" className="hover:text-link">Sıralamalar</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-soft">{category.short}</span>
      </nav>
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">{category.title}</h1>
      <p className="text-ink-soft mt-3 text-lg max-w-2xl leading-relaxed">{category.intro}</p>
      <p className="mt-3 text-[15px]">
        <Link to={`/araclar?kat=${category.slug}`} className="text-link hover:underline underline-offset-2">
          Bu kategoriyi filtrele ve farklı ölçütlere göre sırala
        </Link>
      </p>

      <ol className="mt-10 border-t border-rule">
        {cars.map((car) => (
          <li key={car.slug} className="border-b border-rule py-8 grid gap-5 sm:grid-cols-[3rem_220px_1fr] sm:gap-8 items-start">
            <span className="font-display text-4xl font-extrabold tabular-nums leading-none">#{car.rank}</span>
            <Link to={`/inceleme/${car.slug}`} tabIndex={-1} aria-hidden="true">
              <CarImage car={car} className="h-28" />
            </Link>
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold leading-tight">
                    <Link to={`/inceleme/${car.slug}`} className="hover:text-link">
                      {car.year} {car.make} {car.model}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted mt-0.5">
                    {car.version}
                    {car.used && <span className="ml-2 inline-block text-xs font-medium text-ink border border-star rounded px-1.5 py-px align-middle">İkinci el</span>}
                  </p>
                </div>
                <ScoreBadge score={car.score} size="md" car={car} />
              </div>
              <StarRating value={car.score} size={15} className="mt-3" />
              <p className="text-ink-soft mt-3 leading-relaxed max-w-prose">{car.summary}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                {car.price != null ? (
                  <span>Başlangıç fiyatı <strong className="font-semibold">{priceLabel(car)}</strong></span>
                ) : (
                  <span className="text-muted">{priceLabel(car)}</span>
                )}
                <Link to={`/inceleme/${car.slug}`} className="text-link hover:underline underline-offset-2">İncelemeyi oku</Link>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
