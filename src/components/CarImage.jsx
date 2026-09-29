import { useId, useState, useEffect } from 'react';
import { useCarPhoto } from '../lib/wikiImage.js';

// Gövde tiplerine göre yandan silüetler (fotoğrafı bulunamayan araçlar için)
const BODIES = {
  sedan: {
    body: 'M30 130 C30 113 38 105 58 101 L128 93 C152 74 188 57 232 55 L290 55 C322 57 348 73 374 91 L424 97 C444 100 452 109 452 123 L452 134 C452 140 448 142 442 142 L400 142 A30 30 0 0 0 340 142 L140 142 A30 30 0 0 0 80 142 L38 142 C33 142 30 138 30 134 Z',
    windows: ['M148 94 C168 78 196 64 230 63 L262 63 L262 94 Z', 'M272 63 L290 63 C316 65 336 77 356 92 L272 94 Z'],
    wheelR: 25,
  },
  suv: {
    body: 'M28 126 C28 109 34 101 52 97 L112 89 C128 66 150 41 186 38 L332 38 C358 38 374 54 394 82 L430 90 C446 94 454 104 454 118 L454 134 C454 140 450 142 444 142 L402 142 A32 32 0 0 0 338 142 L142 142 A32 32 0 0 0 78 142 L36 142 C31 142 28 138 28 132 Z',
    windows: ['M128 88 C142 68 160 48 188 46 L252 46 L252 88 Z', 'M262 46 L328 46 C348 46 364 60 378 84 L262 88 Z'],
    wheelR: 27,
  },
  fastback: {
    body: 'M30 128 C30 112 38 104 58 100 L126 92 C152 71 190 54 230 53 L276 53 C322 57 382 82 426 97 C444 102 452 110 452 123 L452 134 C452 140 448 142 442 142 L400 142 A30 30 0 0 0 340 142 L140 142 A30 30 0 0 0 80 142 L38 142 C33 142 30 138 30 134 Z',
    windows: ['M146 92 C168 76 196 62 230 61 L258 61 L258 92 Z', 'M268 61 L280 61 C314 65 348 80 376 92 L268 93 Z'],
    wheelR: 25,
  },
};

function Wheel({ cx, r }) {
  return (
    <g>
      <circle cx={cx} cy={142} r={r} fill="#22252b" />
      <circle cx={cx} cy={142} r={r * 0.62} fill="#c9cdd3" />
      <circle cx={cx} cy={142} r={r * 0.5} fill="#9aa0a8" />
      <circle cx={cx} cy={142} r={r * 0.16} fill="#e9ebee" />
    </g>
  );
}

function Silhouette({ type = 'sedan', label }) {
  const raw = useId();
  const id = `g${raw.replace(/[^a-zA-Z0-9]/g, '')}`;
  const b = BODIES[type] || BODIES.sedan;
  return (
    <svg viewBox="0 0 480 170" className="w-full h-full" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b9bec5" />
          <stop offset="0.45" stopColor="#8b9199" />
          <stop offset="1" stopColor="#5d636b" />
        </linearGradient>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b4048" />
          <stop offset="1" stopColor="#1f2227" />
        </linearGradient>
      </defs>
      <ellipse cx="240" cy="160" rx="210" ry="7" fill="#000" opacity="0.12" />
      <path d={b.body} fill={`url(#${id}b)`} />
      {b.windows.map((d, i) => (
        <path key={i} d={d} fill={`url(#${id}w)`} />
      ))}
      <path d="M60 118 L440 118" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2" />
      <Wheel cx={110} r={b.wheelR} />
      <Wheel cx={370} r={b.wheelR} />
    </svg>
  );
}

function creditText(photo) {
  return `Fotoğraf: ${photo.author}${photo.license ? `, ${photo.license}` : ''} (Wikimedia Commons)`;
}

// Fotoğrafçı ve lisans bilgisi (Creative Commons lisansları bunu zorunlu tutar)
export function PhotoCredit({ car, className = '' }) {
  const photo = useCarPhoto(car);
  if (!photo || photo.own) return null;
  return (
    <p className={`text-xs text-muted leading-snug ${className}`}>
      Fotoğraf:{' '}
      <a href={photo.page} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-link">
        {photo.author}
      </a>
      {photo.license && (
        <>
          ,{' '}
          {photo.licenseUrl ? (
            <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline underline-offset-2 hover:text-link">
              {photo.license}
            </a>
          ) : (
            photo.license
          )}
        </>
      )}
      , Wikimedia Commons üzerinden. Görsel, incelenen versiyondan farklı bir donanım veya model yılına ait olabilir.
    </p>
  );
}

// Fotoğraf varsa fotoğrafı, yoksa (ya da yüklenemezse) gövde tipine uygun silüeti gösterir.
export default function CarImage({ car, className = '' }) {
  const label = `${car.year} ${car.make} ${car.model}`;
  const photo = useCarPhoto(car);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [photo?.src]);

  const showPhoto = photo && !failed;
  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      {showPhoto ? (
        <img
          src={photo.src}
          alt={label}
          title={photo.own ? undefined : creditText(photo)}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={photo.own ? 'max-h-full w-auto object-contain' : 'w-full h-full object-cover rounded-lg'}
        />
      ) : (
        <Silhouette type={car.bodyType} label={label} />
      )}
    </div>
  );
}
