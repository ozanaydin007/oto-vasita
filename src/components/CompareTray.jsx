import { Link, useLocation } from 'react-router-dom';
import { getCar } from '../data/cars.js';
import { comparePath, setCompare, toggleCompare, useCompare, carName } from '../lib/compare.js';

// Ekranın altında, karşılaştırmaya eklenen araçları gösteren çubuk
export default function CompareTray() {
  const list = useCompare();
  const { pathname } = useLocation();
  if (list.length === 0 || pathname.startsWith('/karsilastir')) return null;
  const cars = list.map(getCar).filter(Boolean);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3">
      <div className="max-w-4xl mx-auto bg-white border border-rule rounded-xl shadow-lg px-4 py-3 flex flex-wrap items-center gap-3">
        <span className="font-semibold text-sm">Karşılaştır ({cars.length}/3):</span>
        {cars.map((c) => (
          <span key={c.slug} className="inline-flex items-center gap-1 bg-mist rounded-full pl-3 pr-1.5 py-1 text-sm">
            {carName(c)}
            <button type="button" onClick={() => toggleCompare(c.slug)} aria-label={`${carName(c)} karşılaştırmadan çıkar`} className="px-1 text-muted hover:text-ink">
              ×
            </button>
          </span>
        ))}
        <span className="flex-1" />
        <button type="button" onClick={() => setCompare([])} className="text-sm text-muted hover:text-ink">
          Temizle
        </button>
        {cars.length >= 2 ? (
          <Link to={comparePath(list)} className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-ink-soft">
            Karşılaştır
          </Link>
        ) : (
          <span className="text-sm text-muted">Bir araç daha seçin</span>
        )}
      </div>
    </div>
  );
}
