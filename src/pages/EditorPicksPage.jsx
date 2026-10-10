import { getCar } from '../data/cars.js';
import { EDITOR_WEEKS } from '../data/editorPicks.js';
import EditorPickCard from '../components/EditorPickCard.jsx';
import useTitle from '../lib/useTitle.js';

export default function EditorPicksPage() {
  useTitle('Editörün seçimi');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">Editörün seçimi</h1>
      <p className="text-ink-soft mt-3 text-lg leading-relaxed max-w-2xl">
        Her hafta öne çıkardığımız üç otomobil ve onları neden seçtiğimiz. En yeni hafta en üstte.
      </p>
      {EDITOR_WEEKS.map((w, i) => {
        const picks = w.items.map((p) => ({ ...p, car: getCar(p.car) })).filter((p) => p.car);
        return (
          <section key={w.week} className="mt-12" aria-labelledby={`h-hafta-${i}`}>
            <h2 id={`h-hafta-${i}`} className="font-display text-2xl font-bold border-b border-rule pb-3">
              {w.week}
              {i === 0 && <span className="ml-3 align-middle text-xs font-semibold bg-star text-ink rounded px-2 py-0.5">Bu hafta</span>}
            </h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {picks.map(({ car, text }) => <EditorPickCard key={car.slug} car={car} text={text} />)}
            </ul>
          </section>
        );
      })}
      {EDITOR_WEEKS.length === 1 && (
        <p className="mt-10 text-muted">Önceki haftaların seçimleri, yeni haftalar eklendikçe burada listelenecek.</p>
      )}
    </div>
  );
}
