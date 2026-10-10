import { CRITERIA } from '../data/criteria.js';

export const COMPARE_COLORS = ['#1a1d23', '#e8a317', '#2563eb'];

const SHORT = {
  surus: 'Sürüş',
  guvenlik: 'Güvenlik',
  konfor: 'Konfor',
  tuketim: 'Tüketim',
  malzeme: 'Malzeme',
  tasarim: 'Tasarım',
  fiyat: 'Fiyat/Değer',
  teknoloji: 'Teknoloji',
  guvenilirlik: 'Güvenilirlik',
  ikinciel: 'İkinci el',
};

// Puanlar 5–10 aralığında çizilir; böylece küçük farklar da görünür.
const MIN = 5;
const MAX = 10;

export default function RadarChart({ cars }) {
  const cx = 200;
  const cy = 175;
  const R = 120;
  const n = CRITERIA.length;
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const point = (i, v) => {
    const t = (Math.min(MAX, Math.max(MIN, v)) - MIN) / (MAX - MIN);
    return [cx + Math.cos(angle(i)) * R * t, cy + Math.sin(angle(i)) * R * t];
  };
  const ring = (v) => CRITERIA.map((_, i) => point(i, v).join(',')).join(' ');

  return (
    <figure>
      <svg viewBox="0 0 400 350" className="w-full max-w-md mx-auto" role="img" aria-label="Puan grafiği">
        {[6, 7, 8, 9, 10].map((v) => (
          <polygon key={v} points={ring(v)} fill="none" stroke="#d6d9de" strokeWidth="1" />
        ))}
        {CRITERIA.map((c, i) => {
          const [x, y] = point(i, MAX);
          const [lx, ly] = [cx + Math.cos(angle(i)) * (R + 24), cy + Math.sin(angle(i)) * (R + 24)];
          return (
            <g key={c.key}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="#d6d9de" strokeWidth="1" />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#5b616b">
                {SHORT[c.key] || c.label}
              </text>
            </g>
          );
        })}
        {cars.map((car, ci) => (
          <polygon
            key={car.slug}
            points={CRITERIA.map((c, i) => point(i, car.ratings[c.key]).join(',')).join(' ')}
            fill={COMPARE_COLORS[ci]}
            fillOpacity="0.12"
            stroke={COMPARE_COLORS[ci]}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <figcaption className="text-xs text-muted text-center mt-1">Grafik, farkları daha net göstermek için 5–10 aralığını kullanır.</figcaption>
    </figure>
  );
}
