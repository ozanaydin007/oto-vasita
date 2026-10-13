import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CARS } from '../data/cars.js';
import { CRITERIA } from '../data/criteria.js';
import { estimatedValue, bodyGroup } from '../lib/finder.js';
import CarImage from './CarImage.jsx';
import ScoreBadge from './ScoreBadge.jsx';
import CompareToggle from './CompareToggle.jsx';
import { priceLabel } from '../lib/scoring.js';

// ---------------------------------------------------------------------------
// RADAR İLE ARAÇ BUL
// Kullanıcı 10 başlığın her birini 5 (önemsiz) ile 10 (çok önemli) arasında
// ayarlar. Başlangıç değeri 7,5: ölçeğin tam ortası, yani "nötr".
// Her başlığın ağırlığı = (değer − 5) / 2,5 → 5: 0 kat, 7,5: 1 kat, 10: 2 kat.
// ---------------------------------------------------------------------------
export const NEUTRAL = 7.5;
const MIN = 5;
const MAX = 10;

const SHORT = {
  surus: 'Sürüş', guvenlik: 'Güvenlik', konfor: 'Konfor', tuketim: 'Tüketim', malzeme: 'Malzeme',
  tasarim: 'Tasarım', fiyat: 'Fiyat/Değer', teknoloji: 'Teknoloji', guvenilirlik: 'Güvenilirlik', ikinciel: 'İkinci el',
};

const neutralValues = () => Object.fromEntries(CRITERIA.map((c) => [c.key, NEUTRAL]));

function matchCars(values, filters) {
  const w = Object.fromEntries(CRITERIA.map((c) => [c.key, (values[c.key] - MIN) / (NEUTRAL - MIN)]));
  const totalW = Object.values(w).reduce((a, b) => a + b, 0) || 1;
  const pool = CARS.filter((c) => {
    if (filters.durum === 'sifir' && c.used) return false;
    if (filters.durum === 'ikinci' && !c.used) return false;
    if (filters.butce && estimatedValue(c) > filters.butce) return false;
    if (filters.kasa && bodyGroup(c) !== filters.kasa) return false;
    return true;
  });
  const scored = pool.map((car) => {
    let s = 0;
    for (const c of CRITERIA) s += car.ratings[c.key] * w[c.key];
    return { car, match: s / totalW };
  });
  scored.sort((a, b) => b.match - a.match || b.car.score - a.car.score);
  const top = scored[0]?.match || 10;
  return scored.slice(0, 10).map((r) => ({ ...r, percent: Math.round(Math.min(99, (r.match / Math.max(top, 9.5)) * 97)) }));
}

function InteractiveRadar({ values, onChange, overlay }) {
  const svgRef = useRef(null);
  const [drag, setDrag] = useState(null);
  const cx = 200;
  const cy = 180;
  const R = 125;
  const n = CRITERIA.length;
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i, v) => {
    const t = (Math.min(MAX, Math.max(MIN, v)) - MIN) / (MAX - MIN);
    return [cx + Math.cos(angle(i)) * R * t, cy + Math.sin(angle(i)) * R * t];
  };
  const poly = (getV) => CRITERIA.map((c, i) => pt(i, getV(c.key)).join(',')).join(' ');

  const move = (e) => {
    if (drag == null || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scale = 400 / rect.width;
    const x = (e.clientX - rect.left) * scale - cx;
    const y = (e.clientY - rect.top) * scale - cy;
    const proj = x * Math.cos(angle(drag)) + y * Math.sin(angle(drag));
    const v = MIN + Math.max(0, Math.min(1, proj / R)) * (MAX - MIN);
    onChange(CRITERIA[drag].key, Math.round(v * 2) / 2);
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 370"
      className="w-full max-w-lg mx-auto touch-none select-none"
      onPointerMove={move}
      onPointerUp={() => setDrag(null)}
      onPointerLeave={() => setDrag(null)}
      role="img"
      aria-label="Ayarlanabilir puan grafiği"
    >
      {[6, 7, 8, 9, 10].map((v) => (
        <polygon key={v} points={poly(() => v)} fill="none" stroke="#d6d9de" strokeWidth="1" />
      ))}
      {CRITERIA.map((c, i) => {
        const [x, y] = pt(i, MAX);
        const [lx, ly] = [cx + Math.cos(angle(i)) * (R + 26), cy + Math.sin(angle(i)) * (R + 26)];
        return (
          <g key={c.key}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#d6d9de" strokeWidth="1" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#5b616b">{SHORT[c.key]}</text>
          </g>
        );
      })}
      {overlay && (
        <polygon points={poly((k) => overlay.ratings[k])} fill="#2563eb" fillOpacity="0.1" stroke="#2563eb" strokeWidth="2" strokeDasharray="5 4" />
      )}
      <polygon points={poly((k) => values[k])} fill="#e8a317" fillOpacity="0.25" stroke="#1a1d23" strokeWidth="2.5" strokeLinejoin="round" />
      {CRITERIA.map((c, i) => {
        const [x, y] = pt(i, values[c.key]);
        return (
          <circle
            key={c.key}
            cx={x}
            cy={y}
            r={drag === i ? 11 : 9}
            fill="#1a1d23"
            stroke="#fff"
            strokeWidth="2.5"
            className="cursor-grab"
            onPointerDown={(e) => {
              e.currentTarget.ownerSVGElement?.setPointerCapture?.(e.pointerId);
              setDrag(i);
            }}
          />
        );
      })}
    </svg>
  );
}

const Select = ({ label, value, onChange, options }) => (
  <label className="flex flex-col gap-1 text-sm">
    <span className="text-muted">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="border border-rule rounded-lg px-3 py-2 bg-white">
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  </label>
);

export default function RadarFinder({ onBack }) {
  const [values, setValues] = useState(neutralValues);
  const [durum, setDurum] = useState('');
  const [butce, setButce] = useState('');
  const [kasa, setKasa] = useState('');
  const setOne = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  const results = useMemo(
    () => matchCars(values, { durum, butce: butce ? Number(butce) : null, kasa }),
    [values, durum, butce, kasa]
  );
  const best = results[0]?.car;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
      <button type="button" onClick={onBack} className="text-sm text-link hover:underline">← Araç bulucuya dön</button>
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-3">Radar ile kendin ayarla</h1>
      <p className="text-ink-soft mt-3 text-lg leading-relaxed max-w-3xl">
        Sizin için önemli olan başlıkların noktalarını dışarı, önemsemediklerinizi içeri çekin. Ortadaki çizgi nötr; en
        dış halka “çok önemli”, en iç halka “önemsiz” demek. Sonuçlar siz ayarladıkça anında güncellenir.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <InteractiveRadar values={values} onChange={setOne} overlay={best} />
          {best && (
            <p className="text-sm text-muted text-center mt-1">
              Mavi kesikli çizgi: size en uygun otomobil olan {best.make} {best.model}
            </p>
          )}
          <div className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {CRITERIA.map((c) => (
              <label key={c.key} className="text-sm">
                <span className="flex justify-between"><span>{c.label}</span><span className="tabular-nums text-muted">{values[c.key].toFixed(1).replace('.', ',')}</span></span>
                <input
                  type="range" min={MIN} max={MAX} step="0.5" value={values[c.key]}
                  onChange={(e) => setOne(c.key, Number(e.target.value))}
                  className="w-full accent-ink"
                />
              </label>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Select label="Durum" value={durum} onChange={setDurum} options={[['', 'Fark etmez'], ['sifir', 'Sıfır'], ['ikinci', 'İkinci el']]} />
            <Select label="Bütçe" value={butce} onChange={setButce} options={[['', 'Fark etmez'], ['1000000', '1 milyon TL’ye kadar'], ['1500000', '1,5 milyon TL’ye kadar'], ['2500000', '2,5 milyon TL’ye kadar'], ['4000000', '4 milyon TL’ye kadar']]} />
            <Select label="Kasa" value={kasa} onChange={setKasa} options={[['', 'Fark etmez'], ['hatchback', 'Hatchback'], ['sedan', 'Sedan'], ['suv', 'SUV'], ['spor', 'Spor / coupé'], ['pickup', 'Pick-up / arazi']]} />
          </div>
          <button type="button" onClick={() => setValues(neutralValues())} className="mt-4 text-sm text-muted hover:text-ink">
            Ayarları sıfırla
          </button>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold border-b border-rule pb-3">Size en uygun otomobiller</h2>
          {results.length === 0 ? (
            <p className="mt-4 text-ink-soft">Bu filtrelere uyan otomobil bulunamadı; bütçeyi veya kasa tipini değiştirmeyi deneyin.</p>
          ) : (
            <ol className="mt-4 space-y-3">
              {results.map(({ car, percent }, i) => (
                <li key={car.slug} className="border border-rule rounded-xl p-3 grid grid-cols-[80px_1fr_auto] gap-3 items-center">
                  <Link to={`/inceleme/${car.slug}`} tabIndex={-1} aria-hidden="true">
                    <CarImage car={car} className="h-14 bg-mist rounded-lg" />
                  </Link>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">#{i + 1} · %{percent} uyum</p>
                    <Link to={`/inceleme/${car.slug}`} className="font-semibold leading-tight hover:text-link">{car.year} {car.make} {car.model}</Link>
                    <p className="text-xs text-muted truncate">{priceLabel(car)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <ScoreBadge score={car.score} car={car} />
                    <CompareToggle car={car} compact />
                  </div>
                </li>
              ))}
            </ol>
          )}
          <p className="mt-4 text-xs text-muted">İkinci el otomobillerde bütçe, yaşına ve sınıfına göre kaba bir piyasa değeri tahminiyle değerlendirilir.</p>
        </div>
      </div>
    </div>
  );
}
