import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CARS, getCar } from '../data/cars.js';
import { CRITERIA } from '../data/criteria.js';
import { POPULAR_COMPARISONS } from '../data/comparisons.js';
import { formatScore, priceLabel } from '../lib/scoring.js';
import {
  MAX_COMPARE, SPEC_ROWS, bestIndexes, bestRating, carName, comparePath, compareVerdict, parsePair, setCompare,
} from '../lib/compare.js';
import CarImage from '../components/CarImage.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import RadarChart, { COMPARE_COLORS } from '../components/RadarChart.jsx';
import useTitle from '../lib/useTitle.js';

function CarPicker({ selected, onAdd }) {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const t = q.trim().toLocaleLowerCase('tr-TR');
    if (t.length < 2) return [];
    return CARS.filter(
      (c) => !selected.includes(c.slug) && `${c.make} ${c.model} ${c.version} ${c.year}`.toLocaleLowerCase('tr-TR').includes(t)
    ).slice(0, 8);
  }, [q, selected]);

  return (
    <div className="relative">
      <label htmlFor="k-ara" className="sr-only">Karşılaştırmaya araç ekle</label>
      <input
        id="k-ara"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Araç ekle: marka veya model yazın (ör. Corolla)"
        className="w-full border border-rule rounded-lg px-4 py-2.5 bg-white outline-none focus:border-ink"
      />
      {results.length > 0 && (
        <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border border-rule rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {results.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                onClick={() => {
                  onAdd(c.slug);
                  setQ('');
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-mist"
              >
                <span className="font-medium">{carName(c)}</span>
                <span className="text-sm text-muted ml-2">{c.version}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PopularList({ exclude }) {
  const items = POPULAR_COMPARISONS.filter((p) => p.join() !== exclude).map((p) => p.map(getCar).filter(Boolean)).filter((p) => p.length >= 2);
  return (
    <section className="mt-14" aria-labelledby="h-populer">
      <h2 id="h-populer" className="font-display text-2xl font-bold border-b border-rule pb-3">Popüler karşılaştırmalar</h2>
      <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((cars) => (
          <li key={cars.map((c) => c.slug).join()}>
            <Link to={comparePath(cars.map((c) => c.slug))} className="block border border-rule rounded-lg px-4 py-3 hover:border-ink hover:bg-mist">
              <span className="font-medium">{cars.map((c) => `${c.make} ${c.model}`).join(' vs ')}</span>
              <span className="block text-sm text-muted mt-0.5">{cars.map((c) => c.year).join(' / ')}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ComparePage() {
  const { pair } = useParams();
  const navigate = useNavigate();
  const slugs = parsePair(pair);
  const cars = slugs.map(getCar);
  useTitle(cars.length >= 2 ? `${cars.map((c) => `${c.make} ${c.model}`).join(' vs ')} karşılaştırması` : 'Otomobil karşılaştır');

  const go = (list) => {
    setCompare(list);
    navigate(list.length ? comparePath(list) : '/karsilastir');
  };
  const add = (slug) => go([...slugs, slug].slice(0, MAX_COMPARE));
  const remove = (slug) => go(slugs.filter((s) => s !== slug));

  // Masaüstünde: solda başlık sütunu + araç sütunları.
  // Mobilde: başlık satırın üstüne geçer, araçlar ekran genişliğine sığacak şekilde yan yana dizilir.
  const n = Math.max(cars.length, 1);
  const gridStyle = { '--n': n, '--cols': `minmax(8.5rem, 11rem) repeat(${n}, minmax(0, 1fr))` };
  const gridCls =
    'grid gap-x-3 sm:gap-x-4 [grid-template-columns:repeat(var(--n),minmax(0,1fr))] sm:[grid-template-columns:var(--cols)]';
  const labelCls = 'col-span-full sm:col-span-1';
  const verdict = compareVerdict(cars);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
        {cars.length >= 2 ? cars.map((c) => `${c.make} ${c.model}`).join(' vs ') : 'Otomobil karşılaştır'}
      </h1>
      <p className="text-ink-soft mt-3 text-lg max-w-2xl leading-relaxed">
        En fazla {MAX_COMPARE} aracı puanları, teknik verileri, artıları ve eksileriyle yan yana karşılaştırın.
      </p>

      <div className="mt-6 max-w-xl">
        {cars.length < MAX_COMPARE ? (
          <CarPicker selected={slugs} onAdd={add} />
        ) : (
          <p className="text-sm text-muted">En fazla {MAX_COMPARE} araç karşılaştırılabilir. Yeni araç eklemek için birini çıkarın.</p>
        )}
      </div>

      {cars.length === 0 && (
        <p className="mt-8 text-ink-soft">
          Karşılaştırmaya başlamak için yukarıdan bir araç seçin ya da inceleme sayfalarındaki <strong>Karşılaştır</strong> düğmesini kullanın.
        </p>
      )}

      {cars.length > 0 && (
        <div className="mt-8">
          <div>
            {/* Araç başlıkları */}
            <div className={`${gridCls} items-end pb-4 border-b border-rule`} style={gridStyle}>
              <div className="hidden sm:block" />
              {cars.map((c, i) => (
                <div key={c.slug}>
                  <CarImage car={c} className="h-20 sm:h-28 bg-mist rounded-lg" />
                  <div className="mt-3 flex items-start gap-2">
                    <span className="mt-1.5 w-3 h-3 rounded-full shrink-0" style={{ background: COMPARE_COLORS[i] }} aria-hidden="true" />
                    <div className="min-w-0">
                      <Link to={`/inceleme/${c.slug}`} className="text-sm sm:text-base font-semibold leading-snug hover:text-link">{carName(c)}</Link>
                      <p className="text-xs sm:text-sm text-muted truncate">{c.version}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <ScoreBadge score={c.score} size="md" />
                    <button type="button" onClick={() => remove(c.slug)} className="text-sm text-muted hover:text-ink">Çıkar</button>
                  </div>
                  <p className={`mt-2 text-sm ${c.price != null ? 'font-semibold' : 'text-muted'}`}>{priceLabel(c)}</p>
                </div>
              ))}
            </div>

            {cars.length >= 2 && (
              <>
                {/* Mobilde sayfa kayarken hangi sütunun hangi araç olduğu üstte görünür */}
                <div
                  className={`${gridCls} sm:hidden sticky top-28 z-10 bg-white/95 backdrop-blur border-b border-rule py-2 mt-2`}
                  style={gridStyle}
                >
                  {cars.map((c, i) => (
                    <div key={c.slug} className="flex items-center gap-1.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COMPARE_COLORS[i] }} aria-hidden="true" />
                      <span className="text-xs font-semibold truncate">{c.make} {c.model}</span>
                    </div>
                  ))}
                </div>
                {verdict && (
                  <section className="mt-8 bg-mist rounded-xl p-5 sm:p-6 max-w-4xl" aria-labelledby="h-hangisi">
                    <h2 id="h-hangisi" className="font-display text-2xl font-bold">Hangisini almalı?</h2>
                    <p className="mt-2 text-[17px] leading-relaxed">{verdict}</p>
                  </section>
                )}

                <section className="mt-10" aria-labelledby="h-radar">
                  <h2 id="h-radar" className="font-display text-2xl font-bold mb-2">Puan grafiği</h2>
                  <RadarChart cars={cars} />
                </section>

                <section className="mt-10" aria-labelledby="h-karne">
                  <h2 id="h-karne" className="font-display text-2xl font-bold border-b border-rule pb-3">Puan karnesi</h2>
                  {CRITERIA.map((cr) => {
                    const best = bestRating(cr.key, cars);
                    return (
                      <div key={cr.key} className={`${gridCls} gap-y-1 py-3 border-b border-rule items-center`} style={gridStyle}>
                        <div className={`${labelCls} font-semibold text-sm sm:text-base`}>{cr.label}</div>
                        {cars.map((c, i) => (
                          <div key={c.slug} className={`tabular-nums ${best.includes(i) ? 'font-bold text-good' : ''}`}>
                            {formatScore(c.ratings[cr.key])}
                            {best.includes(i) && <span className="ml-1 text-xs font-semibold">✓<span className="hidden sm:inline"> önde</span></span>}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                  <div className={`${gridCls} gap-y-1 py-3 border-b-2 border-ink items-center`} style={gridStyle}>
                    <div className={`${labelCls} font-display text-lg font-bold`}>Genel puan</div>
                    {cars.map((c) => <div key={c.slug} className="font-display text-lg font-bold tabular-nums">{formatScore(c.score)}</div>)}
                  </div>
                </section>

                <section className="mt-10" aria-labelledby="h-teknik">
                  <h2 id="h-teknik" className="font-display text-2xl font-bold border-b border-rule pb-3">Teknik veriler</h2>
                  {SPEC_ROWS.map((row) => {
                    const best = bestIndexes(row, cars);
                    return (
                      <div key={row.key} className={`${gridCls} gap-y-1 py-3 border-b border-rule items-start text-sm sm:text-[15px]`} style={gridStyle}>
                        <div className={`${labelCls} text-muted`}>{row.label}</div>
                        {cars.map((c, i) => (
                          <div key={c.slug} className={`break-words ${best.includes(i) ? 'font-bold text-good' : ''}`}>
                            {row.show(c, priceLabel)}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </section>

                <section className="mt-10" aria-labelledby="h-arti">
                  <h2 id="h-arti" className="font-display text-2xl font-bold border-b border-rule pb-3">Artılar ve eksiler</h2>
                  <div className={`${gridCls} gap-y-2 py-4`} style={gridStyle}>
                    <div className={`${labelCls} text-muted`}>Beğendiklerimiz</div>
                    {cars.map((c) => (
                      <ul key={c.slug} className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-[15px] marker:text-good">
                        {c.pros.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                    ))}
                  </div>
                  <div className={`${gridCls} gap-y-2 py-4 border-t border-rule`} style={gridStyle}>
                    <div className={`${labelCls} text-muted`}>Beğenmediklerimiz</div>
                    {cars.map((c) => (
                      <ul key={c.slug} className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-[15px] marker:text-bad">
                        {c.cons.length ? c.cons.map((p) => <li key={p}>{p}</li>) : <li className="list-none -ml-5 text-muted">Kayda değer bir eksik bulamadık.</li>}
                      </ul>
                    ))}
                  </div>
                </section>
              </>
            )}

            {cars.length === 1 && (
              <p className="mt-6 text-ink-soft">Karşılaştırmak için yukarıdan en az bir araç daha ekleyin.</p>
            )}
          </div>
        </div>
      )}

      <PopularList exclude={slugs.join()} />
    </div>
  );
}
