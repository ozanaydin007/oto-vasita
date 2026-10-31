import { Link, useParams } from 'react-router-dom';
import { getModel, MODELS } from '../data/models.js';
import { getCar } from '../data/cars.js';
import { formatScore } from '../lib/scoring.js';
import NotFound from './NotFound.jsx';
import useTitle from '../lib/useTitle.js';

// Model geçmişi: bir modelin bütün nesilleri zaman çizelgesi hâlinde
export default function ModelPage() {
  const { slug } = useParams();
  const model = getModel(slug);
  useTitle(model?.title);
  if (!model) return <NotFound />;
  const others = MODELS.filter((m) => m.slug !== model.slug);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
      <nav aria-label="Konum" className="text-sm text-muted mb-4">
        <Link to="/modeller" className="hover:text-link">Model geçmişleri</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-soft">{model.make} {model.name}</span>
      </nav>
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">{model.title}</h1>
      <p className="text-xl text-ink-soft mt-3 leading-relaxed">{model.subtitle}</p>
      <p className="text-sm text-muted mt-3">
        <time dateTime={model.date}>{model.dateLabel}</time>
      </p>

      <div className="mt-8 space-y-4 text-[17px] leading-relaxed">
        {model.intro.map((p) => <p key={p}>{p}</p>)}
      </div>

      {/* Kısa özet: bütün kasalar tek satırda */}
      <div className="mt-8 flex flex-wrap gap-2" aria-label="Nesiller">
        {model.generations.map((g) => (
          <a key={g.code} href={`#${g.code.toLowerCase()}`} className="text-sm font-semibold border border-rule rounded-full px-3 py-1 hover:border-ink">
            {g.code} <span className="text-muted font-normal">{g.years}</span>
          </a>
        ))}
      </div>

      <ol className="mt-10 relative border-l-2 border-rule ml-2 space-y-12">
        {model.generations.map((g) => (
          <li key={g.code} id={g.code.toLowerCase()} className="pl-6 sm:pl-8 relative scroll-mt-24">
            <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-star border-2 border-white" aria-hidden="true" />
            <p className="text-sm font-semibold text-muted">{g.years}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight mt-0.5">
              {g.code} <span className="text-ink-soft font-semibold">· {g.title}</span>
            </h2>
            <div className="mt-3 space-y-3 text-[17px] leading-relaxed">
              {g.text.map((p) => <p key={p}>{p}</p>)}
            </div>
            {g.highlights?.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold">Öne çıkanlar</p>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {g.highlights.map((h) => (
                    <li key={h} className="text-sm bg-mist rounded-md px-2.5 py-1">{h}</li>
                  ))}
                </ul>
              </div>
            )}
            {g.issues?.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold">Bilinen sorunlar</p>
                <ul className="mt-1 list-disc pl-5 text-[15px] text-ink-soft space-y-1">
                  {g.issues.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            )}
            {g.cars?.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold">Bu nesille ilgili incelemelerimiz</p>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {g.cars.map(getCar).filter(Boolean).map((c) => (
                    <li key={c.slug}>
                      <Link to={`/inceleme/${c.slug}`} className="flex items-center justify-between gap-3 border border-rule rounded-lg px-3 py-2 hover:border-ink">
                        <span>
                          <span className="font-semibold">{c.year} {c.make} {c.model}</span>
                          <span className="block text-sm text-muted">{c.version}</span>
                        </span>
                        <span className="font-display font-bold text-lg">{formatScore(c.score)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ol>

      {model.advice?.length > 0 && (
        <section className="mt-14" aria-labelledby="h-tavsiye">
          <h2 id="h-tavsiye" className="font-display text-2xl font-bold">Hangi nesil kime uygun?</h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed">
            {model.advice.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>
      )}

      <p className="mt-10 text-sm text-muted border-t border-rule pt-4">
        Üretim yılları, pazara ve gövde tipine göre birkaç ay farklılık gösterebilir. Bilinen sorunlar, her otomobilde
        görüleceği anlamına gelmez; ikinci el alırken bakım geçmişini ve ekspertiz sonuçlarını mutlaka değerlendirin.
      </p>

      {others.length > 0 && (
        <section className="mt-12" aria-labelledby="h-diger">
          <h2 id="h-diger" className="font-display text-xl font-bold">Diğer model geçmişleri</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((m) => (
              <li key={m.slug}>
                <Link to={`/model/${m.slug}`} className="text-link hover:underline underline-offset-2">{m.make} {m.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
