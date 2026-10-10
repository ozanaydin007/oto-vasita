import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CarImage from './CarImage.jsx';
import ScoreBadge from './ScoreBadge.jsx';
import RadarChart from './RadarChart.jsx';

// Editörün seçimi kartı: fotoğraf, editör cümlesi, okunabilir radar grafiği
export default function EditorPickCard({ car, text }) {
  return (
    <li className="border border-rule rounded-xl overflow-hidden flex flex-col">
      <Link to={`/inceleme/${car.slug}`} tabIndex={-1} aria-hidden="true">
        <CarImage car={car} className="h-44 bg-mist" />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold leading-tight">
          <Link to={`/inceleme/${car.slug}`} className="hover:text-link">
            {car.year} {car.make} {car.model}
          </Link>
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">“{text}”</p>
        <div className="mt-3 -mx-2 flex-1">
          <RadarChart cars={[car]} />
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <ScoreBadge score={car.score} />
          <Link to={`/inceleme/${car.slug}`} className="text-link hover:underline underline-offset-2 text-[15px] inline-flex items-center gap-0.5">
            İncelemeyi oku <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </li>
  );
}
