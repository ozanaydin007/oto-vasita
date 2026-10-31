import { toggleFavorite, useFavorites } from '../lib/favorites.js';

// İnceleme sayfasında ve araç listelerinde "Favorilere ekle" düğmesi
export default function FavoriteToggle({ car, compact = false }) {
  const list = useFavorites();
  const selected = list.includes(car.slug);
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(car.slug)}
      aria-pressed={selected}
      title={selected ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      className={`inline-flex items-center gap-1.5 rounded-lg border font-semibold transition-colors ${
        compact ? 'text-xs px-2.5 py-1.5' : 'text-sm px-4 py-2'
      } ${selected ? 'bg-ink text-white border-ink' : 'border-ink text-ink hover:bg-mist'}`}
    >
      <span aria-hidden="true" className={selected ? 'text-red-400' : ''}>{selected ? '♥' : '♡'}</span>
      {compact ? (selected ? 'Favoride' : 'Favori') : selected ? 'Favorilerde' : 'Favorilere ekle'}
    </button>
  );
}
