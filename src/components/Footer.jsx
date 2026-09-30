import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/cars.js';
import { openCookieSettings } from '../lib/consent.js';

const linkClass = 'text-ink-soft hover:text-link';

export default function Footer() {
  return (
    <footer className="bg-mist border-t border-rule mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <p className="font-display text-xl font-extrabold">OtoVaro</p>
          <p className="text-ink-soft mt-2 max-w-xs leading-relaxed">
            Türkiye pazarındaki otomobillerin 10 başlıkta puanlanan incelemeleri ve segment sıralamaları.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Sıralamalar</p>
          <ul className="space-y-1.5">
            <li><Link to="/araclar" className={linkClass}>Tüm araçlar</Link></li>
            <li><Link to="/rehber" className={linkClass}>Rehber</Link></li>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/kategori/${c.slug}`} className={linkClass}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">OtoVaro</p>
          <ul className="space-y-1.5">
            <li><Link to="/hakkinda" className={linkClass}>Hakkında</Link></li>
            <li><Link to="/puanlama" className={linkClass}>Nasıl puanlıyoruz?</Link></li>
            <li><Link to="/iletisim" className={linkClass}>İletişim</Link></li>
          </ul>
          <p className="text-muted mt-4 leading-relaxed">
            Fiyatlar bilgi amaçlıdır; güncel fiyat için yetkili satıcıya danışın.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Yasal</p>
          <ul className="space-y-1.5">
            <li><Link to="/gizlilik" className={linkClass}>Gizlilik Politikası ve KVKK</Link></li>
            <li><Link to="/cerez-politikasi" className={linkClass}>Çerez Politikası</Link></li>
            <li>
              <button type="button" onClick={openCookieSettings} className={`${linkClass} text-left`}>
                Çerez tercihleri
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-muted">© {new Date().getFullYear()} OtoVaro</p>
      </div>
    </footer>
  );
}
