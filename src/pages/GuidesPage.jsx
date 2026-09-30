import { Link } from 'react-router-dom';
import { GUIDES } from '../data/guides.js';
import useTitle from '../lib/useTitle.js';

export default function GuidesPage() {
  useTitle('Rehber');
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">Rehber</h1>
      <p className="text-ink-soft mt-3 text-lg leading-relaxed">
        Otomobil seçerken işinize yarayacak listeler, karşılaştırmalar ve pratik bilgiler.
      </p>
      <ul className="mt-8 border-t border-rule divide-y divide-rule">
        {GUIDES.map((g) => (
          <li key={g.slug} className="py-6">
            <Link to={`/rehber/${g.slug}`} className="group block">
              <h2 className="font-display text-2xl font-bold group-hover:text-link">{g.title}</h2>
              <p className="text-ink-soft mt-1.5 leading-relaxed">{g.subtitle}</p>
              <p className="text-sm text-muted mt-2">{g.dateLabel}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
