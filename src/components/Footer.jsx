import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/cars.js';

export default function Footer() {
  return (
    <footer className="bg-mist border-t border-rule mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-xl font-extrabold">Oto Vasıta</p>
          <p className="text-ink-soft mt-2 max-w-xs leading-relaxed">
            Türkiye pazarındaki otomobillerin 8 başlıkta puanlanan incelemeleri ve segment sıralamaları.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Sıralamalar</p>
          <ul className="space-y-1.5">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/kategori/${c.slug}`} className="text-ink-soft hover:text-link">{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Hakkında</p>
          <ul className="space-y-1.5">
            <li><Link to="/puanlama" className="text-ink-soft hover:text-link">Nasıl puanlıyoruz?</Link></li>
          </ul>
          <p className="text-muted mt-4 leading-relaxed">
            Fiyatlar bilgi amaçlıdır; güncel fiyat için yetkili satıcıya danışın.
          </p>
        </div>
      </div>
      <div className="border-t border-rule">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-muted">© {new Date().getFullYear()} Oto Vasıta</p>
      </div>
    </footer>
  );
}
