import { formatScore } from '../lib/scoring.js';

const STAR = 'M12 2.6l2.84 6.02 6.6.78-4.88 4.52 1.3 6.52L12 17.18 6.14 20.44l1.3-6.52L2.56 9.4l6.6-.78z';

function Star({ size, fill }) {
  return (
    <span className="relative inline-block shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} className="absolute inset-0 text-star-empty" fill="currentColor" aria-hidden="true">
        <path d={STAR} />
      </svg>
      {fill > 0 && (
        <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
          <svg viewBox="0 0 24 24" width={size} height={size} className="text-star" fill="currentColor" aria-hidden="true">
            <path d={STAR} />
          </svg>
        </span>
      )}
    </span>
  );
}

// 10 yıldızlık gösterim. 8.7 puan = 8 dolu yıldız + %70'i dolu 9. yıldız.
export default function StarRating({ value, max = 10, size = 16, className = '' }) {
  const v = Math.max(0, Math.min(max, value ?? 0));
  return (
    <span
      className={`inline-flex items-center gap-px ${className}`}
      role="img"
      aria-label={`${max} üzerinden ${formatScore(v)}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} size={size} fill={Math.max(0, Math.min(1, v - i))} />
      ))}
    </span>
  );
}
