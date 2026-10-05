import { MAX_COMPARE, toggleCompare, useCompare } from '../lib/compare.js';

// İnceleme sayfasında ve araç listelerinde "Karşılaştır" seçimi
export default function CompareToggle({ car, compact = false }) {
  const list = useCompare();
  const selected = list.includes(car.slug);
  const full = !selected && list.length >= MAX_COMPARE;
  const label = selected ? 'Karşılaştırmada' : full ? 'En fazla 3 araç' : 'Karşılaştır';
  return (
    <button
      type="button"
      onClick={() => toggleCompare(car.slug)}
      disabled={full}
      aria-pressed={selected}
      className={`inline-flex items-center gap-1.5 rounded-lg border font-semibold transition-colors disabled:opacity-50 ${
        compact ? 'text-xs px-2.5 py-1.5' : 'text-sm px-4 py-2'
      } ${selected ? 'bg-ink text-white border-ink' : 'border-ink text-ink hover:bg-mist'}`}
    >
      <span aria-hidden="true">{selected ? '✓' : '+'}</span>
      {label}
    </button>
  );
}
