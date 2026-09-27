import { Link, useSearchParams } from 'react-router-dom';
import { searchCars, getCategory } from '../data/cars.js';
import CarImage from '../components/CarImage.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import useTitle from '../lib/useTitle.js';

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const results = searchCars(q);
  useTitle(q ? `“${q}” arama sonuçları` : 'Arama');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
        “{q}” için {results.length} sonuç
      </h1>
      {results.length === 0 ? (
        <p className="text-ink-soft mt-4">
          Bu aramayla eşleşen araç yok. Marka adını (ör. Toyota) veya model adını (ör. Corolla) deneyin ya da{' '}
          <Link to="/" className="text-link hover:underline">tüm sıralamalara</Link> göz atın.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-rule border-y border-rule">
          {results.map((car) => (
            <li key={car.slug}>
              <Link to={`/inceleme/${car.slug}`} className="group grid grid-cols-[96px_1fr_auto] sm:grid-cols-[160px_1fr_auto] items-center gap-4 sm:gap-6 py-4">
                <CarImage car={car} className="h-14 sm:h-20" />
                <div className="min-w-0">
                  <p className="font-semibold text-lg group-hover:text-link">{car.year} {car.make} {car.model}</p>
                  <p className="text-sm text-muted">{car.version}</p>
                  <p className="text-sm text-ink-soft mt-0.5">{getCategory(car.category)?.short} sıralamasında {car.rank}.</p>
                </div>
                <ScoreBadge score={car.score} size="md" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
