import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/cars.js';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="OtoVaro ana sayfa">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#1a1d23" />
        <path d="M7 21a9 9 0 1 1 18 0" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 21l5-6" stroke="#e8a317" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="21" r="2" fill="#fff" />
      </svg>
      <span className="font-display text-2xl font-extrabold tracking-tight">OtoVaro</span>
    </Link>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');

  useEffect(() => {
    if (location.pathname !== '/ara') setQ('');
  }, [location.pathname]);

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/ara?q=${encodeURIComponent(q.trim())}`);
  };

  const navClass = ({ isActive }) =>
    `whitespace-nowrap py-3 border-b-2 text-[15px] font-medium transition-colors ${
      isActive ? 'border-ink text-ink' : 'border-transparent text-ink-soft hover:text-ink'
    }`;

  return (
    <header className="bg-white border-b border-rule sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-6">
          <Logo />
          <form onSubmit={submit} role="search" className="flex-1 max-w-md relative">
            <label htmlFor="site-search" className="sr-only">Araç ara</label>
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              id="site-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Marka veya model ara"
              className="w-full bg-mist border border-transparent focus:border-rule focus:bg-white rounded-full pl-9 pr-4 py-2 text-sm outline-none transition"
            />
          </form>
        </div>
        <nav aria-label="Kategoriler" className="flex gap-6 overflow-x-auto -mb-px">
          <NavLink to="/" end className={navClass}>Sıralamalar</NavLink>
          <NavLink to="/araclar" className={navClass}>Tüm araçlar</NavLink>
          <NavLink to="/arac-bulucu" className={navClass}>Araç bulucu</NavLink>
          <NavLink to="/karsilastir" className={navClass}>Karşılaştır</NavLink>
          <NavLink to="/rehber" className={navClass}>Rehber</NavLink>
          {CATEGORIES.map((c) => (
            <NavLink key={c.slug} to={`/kategori/${c.slug}`} className={navClass}>
              {c.short}
            </NavLink>
          ))}
          <NavLink to="/puanlama" className={navClass}>Nasıl puanlıyoruz?</NavLink>
        </nav>
      </div>
    </header>
  );
}
