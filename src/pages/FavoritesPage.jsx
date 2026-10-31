import { Link } from 'react-router-dom';
import { getCar } from '../data/cars.js';
import { formatScore, priceLabel } from '../lib/scoring.js';
import { setFavorites, useFavorites } from '../lib/favorites.js';
import { comparePath, MAX_COMPARE } from '../lib/compare.js';
import useTitle from '../lib/useTitle.js';

// Ziyaretçinin favorilere eklediği araçlar (yalnızca kendi tarayıcısında saklanır)
export default function FavoritesPage() {
  useTitle('Favorilerim');
  const list = useFavorites();
  const cars = list.map(getCar).filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">Favorilerim</h1>
      <p className="text-ink-soft mt-3 leading-relaxed">
        Beğendiğiniz araçları inceleme sayfalarındaki “Favorilere ekle” düğmesiyle buraya kaydedebilirsiniz. Liste
        yalnızca bu tarayıcıda saklanır; hesap açmanıza gerek yoktur.
      </p>

      {cars.length === 0 ? (
        <div className="mt-8 border border-rule rounded-xl p-6">
          <p className="font-semibold">Henüz favori aracınız yok.</p>
          <p className="text-ink-soft mt-1">
            <Link to="/araclar" className="text-link hover:underline underline-offset-2">Tüm araçlara</Link> göz atın ya da{' '}
            <Link to="/arac-bulucu" className="text-link hover:underline underline-offset-2">araç bulucuyu</Link> deneyin.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {cars.length >= 2 && (
              <Link
                to={comparePath(cars.slice(0, MAX_COMPARE).map((c) => c.slug))}
                className="inline-flex items-center gap-2 bg-ink text-white font-semibold px-4 py-2 rounded-lg hover:bg-ink-soft"
              >
                {cars.length > MAX_COMPARE ? `İlk ${MAX_COMPARE} aracı karşılaştır` : 'Favorilerimi karşılaştır'}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setFavorites([])}
              className="text-sm text-muted hover:text-ink underline underline-offset-2"
            >
              Listeyi temizle
            </button>
          </div>
          <ul className="mt-6 divide-y divide-rule border-y border-rule">
            {cars.map((c) => (
              <li key={c.slug} className="py-4 flex items-center gap-4">
                <Link to={`/inceleme/${c.slug}`} className="flex-1 min-w-0 hover:text-link">
                  <span className="font-semibold block">{c.year} {c.make} {c.model}</span>
                  <span className="text-sm text-muted block truncate">{c.version} · {priceLabel(c)}</span>
                </Link>
                <span className="font-display font-bold text-xl">{formatScore(c.score)}</span>
                <button
                  type="button"
                  onClick={() => setFavorites(list.filter((s) => s !== c.slug))}
                  className="text-sm border border-rule rounded-lg px-3 py-1.5 hover:border-ink"
                  aria-label={`${c.make} ${c.model} favorilerden çıkar`}
                >
                  Çıkar
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
