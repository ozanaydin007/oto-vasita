import { CRITERIA } from '../data/criteria.js';

// Araç kartlarındaki küçük radar silueti: aracın 10 başlıktaki karakteri.
// Büyük radar grafiği gibi 5–10 aralığını kullanır.
export default function MiniRadar({ car, size = 36, className = '' }) {
  const n = CRITERIA.length;
  const c = 50;
  const R = 46;
  const pt = (i, v) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const t = (Math.min(10, Math.max(5, v)) - 5) / 5;
    return `${c + Math.cos(a) * R * t},${c + Math.sin(a) * R * t}`;
  };
  const outline = CRITERIA.map((_, i) => pt(i, 10)).join(' ');
  const shape = CRITERIA.map((cr, i) => pt(i, car.ratings[cr.key])).join(' ');
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      role="img"
      aria-label={`${car.make} ${car.model} puan dağılımı`}
    >
      <polygon points={outline} fill="none" stroke="#d6d9de" strokeWidth="4" strokeLinejoin="round" />
      <polygon points={shape} fill="#e8a317" fillOpacity="0.35" stroke="#1a1d23" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  );
}
