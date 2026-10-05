import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { CARS, CATEGORIES, getCategory } from '../data/cars.js';
import { CRITERIA } from '../data/criteria.js';
import { formatScore, priceLabel } from '../lib/scoring.js';
import CarImage from '../components/CarImage.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import useTitle from '../lib/useTitle.js';
import CompareToggle from '../components/CompareToggle.jsx';

// ---------------------------------------------------------------------------
// Filtre ve sıralama tanımları
// Tüm filtreler adres çubuğunda tutulur; filtrelenmiş liste link olarak paylaşılabilir.
// ---------------------------------------------------------------------------
const BODY_LABELS = { sedan: 'Sedan', fastback: 'Hatchback / Fastback', suv: 'SUV' };
const FUEL_ORDER = ['Benzin', 'Dizel', 'Benzin + LPG', 'Hafif hibrit', 'Hibrit', 'Şarj edilebilir hibrit', 'Elektrik'];
const HP_STEPS = [100, 150, 200, 300, 400];
const SCORE_STEPS = [7, 7.5, 8, 8.5, 9];

const SORTS = [
  { key: 'puan', label: 'Genel puan (yüksekten)' },
  { key: 'puan-artan', label: 'Genel puan (düşükten)' },
  { key: 'fiyat', label: 'Fiyat (ucuzdan pahalıya)' },
  { key: 'fiyat-azalan', label: 'Fiyat (pahalıdan ucuza)' },
  { key: 'beygir', label: 'Motor gücü (güçlüden)' },
  { key: 'yil', label: 'Model yılı (yeniden eskiye)' },
  { key: 'menzil', label: 'Elektrikli menzil (uzundan)' },
  { key: 'marka', label: 'Marka ve model (A–Z)' },
  ...CRITERIA.map((c) => ({ key: `b-${c.key}`, label: `${c.label} puanı (yüksekten)` })),
];

const LIST_KEYS = ['kat', 'marka', 'durum', 'yakit', 'vites', 'kasa'];
const NUM_KEYS = ['fmin', 'fmax', 'ymin', 'ymax', 'bg', 'puan', 'bp'];

function readFilters(params) {
  const f = { q: params.get('q') || '', bk: params.get('bk') || 'surus', sirala: params.get('sirala') || 'puan' };
  for (const k of LIST_KEYS) f[k] = params.get(k) ? params.get(k).split(',') : [];
  for (const k of NUM_KEYS) {
    const v = params.get(k);
    f[k] = v !== null && v !== '' && !Number.isNaN(Number(v)) ? Number(v) : null;
  }
  return f;
}

const byTr = (a, b) => a.localeCompare(b, 'tr');
const carName = (c) => `${c.make} ${c.model}`;
const condition = (c) => (c.used ? 'ikinci-el' : 'sifir');

// skip: sayaçlar hesaplanırken ilgili grubun kendi filtresi yok sayılır
function matches(car, f, skip) {
  const q = f.q.trim().toLocaleLowerCase('tr-TR');
  if (q && !`${car.make} ${car.model} ${car.version} ${car.year}`.toLocaleLowerCase('tr-TR').includes(q)) return false;
  if (skip !== 'kat' && f.kat.length && !f.kat.includes(car.category)) return false;
  if (skip !== 'marka' && f.marka.length && !f.marka.includes(car.make)) return false;
  if (skip !== 'durum' && f.durum.length && !f.durum.includes(condition(car))) return false;
  if (skip !== 'yakit' && f.yakit.length && !f.yakit.includes(car.fuel)) return false;
  if (skip !== 'vites' && f.vites.length && !f.vites.includes(car.gearbox)) return false;
  if (skip !== 'kasa' && f.kasa.length && !f.kasa.includes(car.bodyType)) return false;
  if (f.fmin != null && (car.price == null || car.price < f.fmin)) return false;
  if (f.fmax != null && (car.price == null || car.price > f.fmax)) return false;
  if (f.ymin != null && car.year < f.ymin) return false;
  if (f.ymax != null && car.year > f.ymax) return false;
  if (f.bg != null && (car.hp == null || car.hp < f.bg)) return false;
  if (f.puan != null && car.score < f.puan) return false;
  if (f.bp != null && (car.ratings[f.bk] ?? 0) < f.bp) return false;
  return true;
}

function sortCars(list, key) {
  const out = [...list];
  const nullsLast = (a, b, get, dir) => {
    const x = get(a);
    const y = get(b);
    if (x == null && y == null) return 0;
    if (x == null) return 1;
    if (y == null) return -1;
    return dir * (x - y);
  };
  const tie = (a, b) => b.score - a.score || byTr(carName(a), carName(b));
  switch (key) {
    case 'puan-artan': return out.sort((a, b) => a.score - b.score || byTr(carName(a), carName(b)));
    case 'fiyat': return out.sort((a, b) => nullsLast(a, b, (c) => c.price, 1) || tie(a, b));
    case 'fiyat-azalan': return out.sort((a, b) => nullsLast(a, b, (c) => c.price, -1) || tie(a, b));
    case 'beygir': return out.sort((a, b) => nullsLast(a, b, (c) => c.hp, -1) || tie(a, b));
    case 'yil': return out.sort((a, b) => b.year - a.year || tie(a, b));
    case 'menzil': {
      const km = (c) => (c.fuel === 'Elektrik' || c.fuel === 'Şarj edilebilir hibrit') ? Number((c.specs?.menzil?.match(/~?(\d+)/) || [])[1]) || null : null;
      return out.sort((a, b) => nullsLast(a, b, km, -1) || tie(a, b));
    }
    case 'marka': return out.sort((a, b) => byTr(carName(a), carName(b)) || b.year - a.year);
    default:
      if (key.startsWith('b-')) {
        const k = key.slice(2);
        return out.sort((a, b) => (b.ratings[k] ?? 0) - (a.ratings[k] ?? 0) || tie(a, b));
      }
      return out.sort(tie);
  }
}

// ---------------------------------------------------------------------------
// Arayüz parçaları
// ---------------------------------------------------------------------------
function Group({ title, children }) {
  return (
    <fieldset className="py-4 border-b border-rule">
      <legend className="font-semibold text-[15px] mb-2">{title}</legend>
      {children}
    </fieldset>
  );
}

function CheckList({ options, selected, onToggle, scroll = false }) {
  return (
    <ul className={`space-y-1 ${scroll ? 'max-h-60 overflow-y-auto pr-1' : ''}`}>
      {options.map((o) => {
        const checked = selected.includes(o.value);
        const disabled = o.count === 0 && !checked;
        return (
          <li key={o.value}>
            <label className={`flex items-center gap-2.5 py-0.5 text-[15px] cursor-pointer ${disabled ? 'text-muted' : ''}`}>
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => onToggle(o.value)}
                className="w-4 h-4 accent-ink"
              />
              <span className="flex-1">{o.label}</span>
              <span className="text-xs text-muted tabular-nums">{o.count}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

const inputClass = 'w-full border border-rule rounded-md px-2.5 py-1.5 text-sm bg-white outline-none focus:border-ink';

function Tag({ children, tone = 'plain' }) {
  const tones = {
    plain: 'bg-mist text-ink-soft',
    used: 'border border-star text-ink',
  };
  return <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${tones[tone]}`}>{children}</span>;
}

function ResultRow({ car }) {
  return (
    <li className="py-5">
      <Link
        to={`/inceleme/${car.slug}`}
        className="group grid grid-cols-[88px_1fr] sm:grid-cols-[150px_1fr_auto] items-center gap-x-4 sm:gap-x-6 gap-y-3"
      >
        <CarImage car={car} className="h-14 sm:h-20" />
        <div className="min-w-0">
          <p className="font-semibold text-lg leading-snug group-hover:text-link">
            {car.year} {car.make} {car.model}
          </p>
          <p className="text-sm text-muted truncate">{car.version}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {car.used && <Tag tone="used">İkinci el</Tag>}
            <Tag>{getCategory(car.category)?.short}</Tag>
            <Tag>{car.fuel}</Tag>
            <Tag>{car.gearbox}</Tag>
            {car.hp != null && <Tag>{car.hp} bg</Tag>}
            {car.fuel === 'Elektrik' && car.specs?.menzil && <Tag>{car.specs.menzil.split(' (')[0]} menzil</Tag>}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 flex sm:flex-col items-center sm:items-end justify-between gap-2">
          <ScoreBadge score={car.score} size="md" />
          <span className={`text-sm tabular-nums ${car.price != null ? 'font-semibold' : 'text-muted'}`}>
            {priceLabel(car)}
          </span>
        </div>
      </Link>
      <div className="mt-2 flex justify-end">
        <CompareToggle car={car} compact />
      </div>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Sayfa
// ---------------------------------------------------------------------------
export default function AllCarsPage() {
  useTitle('Tüm araçlar');
  const [params, setParams] = useSearchParams();
  const [panelOpen, setPanelOpen] = useState(false);
  const f = readFilters(params);

  const update = (changes) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(changes)) {
      const empty = v == null || v === '' || (Array.isArray(v) && v.length === 0);
      if (empty) next.delete(k);
      else next.set(k, Array.isArray(v) ? v.join(',') : String(v));
    }
    setParams(next, { replace: true });
  };
  const toggle = (key, value) =>
    update({ [key]: f[key].includes(value) ? f[key].filter((x) => x !== value) : [...f[key], value] });
  const clearAll = () => setParams(f.sirala !== 'puan' ? { sirala: f.sirala } : {}, { replace: true });

  const count = (key, test) => CARS.filter((c) => matches(c, f, key) && test(c)).length;

  const options = useMemo(() => {
    const brands = [...new Set(CARS.map((c) => c.make))].sort(byTr);
    const fuels = FUEL_ORDER.filter((x) => CARS.some((c) => c.fuel === x));
    return { brands, fuels };
  }, []);

  const years = useMemo(() => [...new Set(CARS.map((c) => c.year))].sort((a, b) => b - a), []);
  const results = sortCars(CARS.filter((c) => matches(c, f)), f.sirala);

  // Etkin filtre etiketleri
  const chips = [];
  if (f.q) chips.push({ label: `“${f.q}”`, clear: { q: null } });
  f.kat.forEach((v) => chips.push({ label: getCategory(v)?.short || v, clear: { kat: f.kat.filter((x) => x !== v) } }));
  f.marka.forEach((v) => chips.push({ label: v, clear: { marka: f.marka.filter((x) => x !== v) } }));
  f.durum.forEach((v) => chips.push({ label: v === 'sifir' ? 'Sıfır' : 'İkinci el', clear: { durum: f.durum.filter((x) => x !== v) } }));
  f.yakit.forEach((v) => chips.push({ label: v, clear: { yakit: f.yakit.filter((x) => x !== v) } }));
  f.vites.forEach((v) => chips.push({ label: v, clear: { vites: f.vites.filter((x) => x !== v) } }));
  f.kasa.forEach((v) => chips.push({ label: BODY_LABELS[v], clear: { kasa: f.kasa.filter((x) => x !== v) } }));
  if (f.fmin != null) chips.push({ label: `En az ${f.fmin.toLocaleString('tr-TR')} TL`, clear: { fmin: null } });
  if (f.fmax != null) chips.push({ label: `En çok ${f.fmax.toLocaleString('tr-TR')} TL`, clear: { fmax: null } });
  if (f.ymin != null) chips.push({ label: `${f.ymin} ve sonrası`, clear: { ymin: null } });
  if (f.ymax != null) chips.push({ label: `${f.ymax} ve öncesi`, clear: { ymax: null } });
  if (f.bg != null) chips.push({ label: `${f.bg}+ bg`, clear: { bg: null } });
  if (f.puan != null) chips.push({ label: `Genel puan ${formatScore(f.puan)}+`, clear: { puan: null } });
  if (f.bp != null) {
    const c = CRITERIA.find((x) => x.key === f.bk);
    chips.push({ label: `${c?.label} ${formatScore(f.bp)}+`, clear: { bp: null, bk: null } });
  }

  const priceActive = f.fmin != null || f.fmax != null;

  const panel = (
    <div>
      <div className="pb-4 border-b border-rule">
        <label htmlFor="f-q" className="font-semibold text-[15px] block mb-2">Marka veya model</label>
        <input
          id="f-q"
          type="search"
          value={f.q}
          onChange={(e) => update({ q: e.target.value })}
          placeholder="Ör. Corolla, 320i"
          className={inputClass}
        />
      </div>

      <Group title="Durum">
        <CheckList
          options={[
            { value: 'sifir', label: 'Sıfır', count: count('durum', (c) => !c.used) },
            { value: 'ikinci-el', label: 'İkinci el', count: count('durum', (c) => c.used) },
          ]}
          selected={f.durum}
          onToggle={(v) => toggle('durum', v)}
        />
      </Group>

      <Group title="Kategori">
        <CheckList
          options={CATEGORIES.map((c) => ({ value: c.slug, label: c.short, count: count('kat', (x) => x.category === c.slug) }))}
          selected={f.kat}
          onToggle={(v) => toggle('kat', v)}
        />
      </Group>

      <Group title="Marka">
        <CheckList
          scroll
          options={options.brands.map((b) => ({ value: b, label: b, count: count('marka', (x) => x.make === b) }))}
          selected={f.marka}
          onToggle={(v) => toggle('marka', v)}
        />
      </Group>

      <Group title="Yakıt">
        <CheckList
          options={options.fuels.map((x) => ({ value: x, label: x, count: count('yakit', (c) => c.fuel === x) }))}
          selected={f.yakit}
          onToggle={(v) => toggle('yakit', v)}
        />
      </Group>

      <Group title="Vites">
        <CheckList
          options={['Otomatik', 'Manuel'].map((x) => ({ value: x, label: x, count: count('vites', (c) => c.gearbox === x) }))}
          selected={f.vites}
          onToggle={(v) => toggle('vites', v)}
        />
      </Group>

      <Group title="Kasa tipi">
        <CheckList
          options={Object.entries(BODY_LABELS).map(([k, label]) => ({ value: k, label, count: count('kasa', (c) => c.bodyType === k) }))}
          selected={f.kasa}
          onToggle={(v) => toggle('kasa', v)}
        />
      </Group>

      <Group title="Fiyat (TL)">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number" inputMode="numeric" min="0" step="100000" placeholder="En az" aria-label="En düşük fiyat"
            value={f.fmin ?? ''} onChange={(e) => update({ fmin: e.target.value })} className={inputClass}
          />
          <input
            type="number" inputMode="numeric" min="0" step="100000" placeholder="En çok" aria-label="En yüksek fiyat"
            value={f.fmax ?? ''} onChange={(e) => update({ fmax: e.target.value })} className={inputClass}
          />
        </div>
        {priceActive && <p className="text-xs text-muted mt-2">Fiyatı olmayan ikinci el araçlar bu filtrede gizlenir.</p>}
      </Group>

      <Group title="Model yılı">
        <div className="grid grid-cols-2 gap-2">
          <select aria-label="En eski model yılı" value={f.ymin ?? ''} onChange={(e) => update({ ymin: e.target.value })} className={inputClass}>
            <option value="">En eski</option>
            {[...years].reverse().map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <select aria-label="En yeni model yılı" value={f.ymax ?? ''} onChange={(e) => update({ ymax: e.target.value })} className={inputClass}>
            <option value="">En yeni</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </Group>

      <Group title="Motor gücü">
        <select aria-label="En düşük motor gücü" value={f.bg ?? ''} onChange={(e) => update({ bg: e.target.value })} className={inputClass}>
          <option value="">Hepsi</option>
          {HP_STEPS.map((h) => <option key={h} value={h}>{h} bg ve üzeri</option>)}
        </select>
      </Group>

      <Group title="Puan">
        <label className="block text-sm text-ink-soft mb-1" htmlFor="f-puan">Genel puan</label>
        <select id="f-puan" value={f.puan ?? ''} onChange={(e) => update({ puan: e.target.value })} className={inputClass}>
          <option value="">Hepsi</option>
          {SCORE_STEPS.map((s) => <option key={s} value={s}>{formatScore(s)} ve üzeri</option>)}
        </select>
        <p className="text-sm text-ink-soft mt-3 mb-1">Başlık puanı</p>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <select aria-label="Puan başlığı" value={f.bk} onChange={(e) => update({ bk: e.target.value })} className={inputClass}>
            {CRITERIA.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          <select aria-label="Başlık için en düşük puan" value={f.bp ?? ''} onChange={(e) => update({ bp: e.target.value })} className={inputClass}>
            <option value="">Hepsi</option>
            {SCORE_STEPS.map((s) => <option key={s} value={s}>{formatScore(s)}+</option>)}
          </select>
        </div>
      </Group>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">Tüm araçlar</h1>
      <p className="text-ink-soft mt-3 text-lg max-w-2xl leading-relaxed">
        İncelediğimiz {CARS.length} aracın tamamı. Filtrelerle daraltın, istediğiniz ölçüte göre sıralayın.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] items-start">
        <aside aria-label="Filtreler" className={`${panelOpen ? 'block' : 'hidden'} lg:block lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto lg:pr-2`}>
          {panel}
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            className="lg:hidden mt-4 w-full bg-ink text-white font-semibold py-2.5 rounded-lg"
          >
            {results.length} aracı göster
          </button>
        </aside>

        <section aria-labelledby="h-sonuc" className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-rule">
            <h2 id="h-sonuc" className="font-display text-2xl font-bold" aria-live="polite">
              {results.length} araç
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPanelOpen((o) => !o)}
                aria-expanded={panelOpen}
                className="lg:hidden inline-flex items-center gap-1.5 border border-rule rounded-md px-3 py-1.5 text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                Filtreler{chips.length > 0 ? ` (${chips.length})` : ''}
              </button>
              <label htmlFor="f-sirala" className="text-sm text-muted hidden sm:inline">Sırala</label>
              <select
                id="f-sirala"
                value={f.sirala}
                onChange={(e) => update({ sirala: e.target.value === 'puan' ? null : e.target.value })}
                className="border border-rule rounded-md px-2.5 py-1.5 text-sm bg-white outline-none focus:border-ink"
              >
                {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 py-3 border-b border-rule">
              {chips.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => update(c.clear)}
                  className="inline-flex items-center gap-1 bg-mist hover:bg-rule rounded-full pl-3 pr-2 py-1 text-sm"
                  aria-label={`${c.label} filtresini kaldır`}
                >
                  {c.label}
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              ))}
              <button type="button" onClick={clearAll} className="text-sm text-link hover:underline underline-offset-2 ml-1">
                Tümünü temizle
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="py-12">
              <p className="text-lg font-semibold">Bu filtrelere uyan araç yok.</p>
              <p className="text-ink-soft mt-1">Bazı filtreleri kaldırın ya da hepsini sıfırlayın.</p>
              <button type="button" onClick={clearAll} className="mt-4 bg-ink text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-ink-soft">
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-rule">
              {results.map((car) => <ResultRow key={car.slug} car={car} />)}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
