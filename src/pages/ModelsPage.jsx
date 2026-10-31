import { Link } from 'react-router-dom';
import { MODELS } from '../data/models.js';
import useTitle from '../lib/useTitle.js';

// Bütün model geçmişi sayfalarının listesi
export default function ModelsPage() {
  useTitle('Model geçmişleri');
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">Model geçmişleri</h1>
      <p className="text-xl text-ink-soft mt-3 leading-relaxed">
        Popüler modellerin bütün nesilleri, kasa kodları, öne çıkan özellikleri ve bilinen sorunları tek sayfada.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {MODELS.map((m) => (
          <li key={m.slug}>
            <Link to={`/model/${m.slug}`} className="block border border-rule rounded-xl p-5 hover:border-ink h-full">
              <span className="font-display text-2xl font-bold">{m.make} {m.name}</span>
              <span className="block text-sm text-muted mt-1">
                {m.generations.length} nesil · {m.generations[0].years.split('–')[0]}’ten bugüne
              </span>
              <span className="block text-sm mt-2 text-ink-soft">{m.generations.map((g) => g.code).join(' · ')}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
