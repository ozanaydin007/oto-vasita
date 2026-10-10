import { formatScore } from '../lib/scoring.js';
import MiniRadar from './MiniRadar.jsx';

const sizes = {
  sm: 'text-sm px-1.5 py-0.5 rounded',
  md: 'text-lg px-2.5 py-1 rounded-md',
  lg: 'text-4xl px-4 py-2 rounded-lg',
};

export default function ScoreBadge({ score, size = 'sm', car }) {
  const badge = (
    <span className={`inline-flex items-baseline gap-1 bg-ink text-white font-display font-bold leading-none tabular-nums ${sizes[size]}`}>
      {formatScore(score)}
      <span className="text-[0.55em] font-semibold text-white/60">/10</span>
    </span>
  );
  if (!car) return badge;
  // Puan rozetinin yanında aracın radar silueti (OtoVaro imzası)
  return (
    <span className="inline-flex items-center gap-2">
      <MiniRadar car={car} size={size === 'sm' ? 30 : 40} />
      {badge}
    </span>
  );
}
