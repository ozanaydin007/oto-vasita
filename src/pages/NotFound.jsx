import { Link } from 'react-router-dom';
import useTitle from '../lib/useTitle.js';

export default function NotFound() {
  useTitle('Sayfa bulunamadı');
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <h1 className="font-display text-4xl font-extrabold">Bu sayfa bulunamadı</h1>
      <p className="text-ink-soft mt-3 text-lg">
        Bağlantı değişmiş ya da araç listeden kaldırılmış olabilir.
      </p>
      <Link to="/" className="inline-block mt-6 bg-ink text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-ink-soft">
        Sıralamalara dön
      </Link>
    </div>
  );
}
