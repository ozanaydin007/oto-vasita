import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QUESTIONS, findCars } from '../lib/finder.js';
import CarImage from '../components/CarImage.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import CompareToggle from '../components/CompareToggle.jsx';
import { priceLabel } from '../lib/scoring.js';
import useTitle from '../lib/useTitle.js';

export default function CarFinderPage() {
  useTitle('Araç bulucu: Bana uygun aracı bul');
  const [step, setStep] = useState(0); // 0: giriş, 1..n: sorular, n+1: sonuç
  const [answers, setAnswers] = useState({});
  const n = QUESTIONS.length;
  const q = QUESTIONS[step - 1];

  const choose = (value) => {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    setStep((s) => s + 1);
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };
  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  if (step === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">Bana uygun aracı bul</h1>
        <p className="text-ink-soft mt-4 text-lg leading-relaxed">
          Size {n} kısa soru soracağız: bütçeniz, kullanımınız ve sizin için neyin önemli olduğu. Cevaplarınıza göre
          incelediğimiz otomobiller arasından size en uygun olanları, uyum yüzdesiyle birlikte sıralayacağız.
        </p>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="mt-8 inline-flex items-center gap-1 bg-ink text-white font-semibold px-6 py-3 rounded-lg hover:bg-ink-soft"
        >
          Başlayalım <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
        <p className="mt-4 text-sm text-muted">Yaklaşık 2 dakika sürer. Cevaplarınız kaydedilmez.</p>
      </div>
    );
  }

  if (step > n) {
    const { results, relaxed } = findCars(answers);
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">Size uygun otomobiller</h1>
        <p className="text-ink-soft mt-3 text-lg leading-relaxed">
          Cevaplarınıza göre en uygun {results.length} otomobil. Uyum yüzdesi, sizin önemli dediğiniz başlıklardaki puanlarına göre hesaplandı.
        </p>
        {relaxed.length > 0 && (
          <p className="mt-4 bg-mist rounded-lg px-4 py-3 text-[15px]">
            Tüm kriterlerinize birebir uyan yeterli otomobil bulamadığımız için şu tercihleri esnettik: {relaxed.join(' · ')}
          </p>
        )}
        <ol className="mt-8 space-y-4">
          {results.map(({ car, percent, strengths }, i) => (
            <li key={car.slug} className="border border-rule rounded-xl p-4 sm:p-5">
              <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[160px_1fr_auto] gap-4 items-center">
                <Link to={`/inceleme/${car.slug}`} tabIndex={-1} aria-hidden="true">
                  <CarImage car={car} className="h-16 sm:h-24 bg-mist rounded-lg" />
                </Link>
                <div className="min-w-0">
                  <p className="text-sm text-muted">#{i + 1} · %{percent} uyum</p>
                  <h2 className="font-display text-xl font-bold leading-tight">
                    <Link to={`/inceleme/${car.slug}`} className="hover:text-link">{car.year} {car.make} {car.model}</Link>
                  </h2>
                  <p className="text-sm text-muted truncate">{car.version} · {priceLabel(car)}</p>
                  {strengths.length > 0 && (
                    <p className="mt-1.5 text-sm"><span className="text-good font-semibold">Sizin için güçlü yanları:</span> {strengths.join(', ')}</p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <ScoreBadge score={car.score} size="md" car={car} />
                  <CompareToggle car={car} compact />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => setStep(n)} className="inline-flex items-center gap-1 border border-ink font-semibold px-5 py-2.5 rounded-lg hover:bg-mist">
            <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Son cevabı değiştir
          </button>
          <button type="button" onClick={restart} className="bg-ink text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-ink-soft">
            Baştan başla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
      <p className="text-sm text-muted">Soru {step} / {n}</p>
      <div className="mt-2 h-2 bg-mist rounded-full overflow-hidden" aria-hidden="true">
        <div className="h-full bg-star transition-all" style={{ width: `${(step / n) * 100}%` }} />
      </div>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-8">{q.title}</h1>
      {q.hint && <p className="mt-2 text-muted">{q.hint}</p>}
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {q.options.map((o) => (
          <li key={o.value}>
            <button
              type="button"
              onClick={() => choose(o.value)}
              aria-pressed={answers[q.id] === o.value}
              className={`w-full text-left border rounded-xl px-5 py-4 font-semibold text-lg transition-colors ${
                answers[q.id] === o.value ? 'border-ink bg-ink text-white' : 'border-rule hover:border-ink hover:bg-mist'
              }`}
            >
              {o.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1 text-ink-soft hover:text-ink">
          <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Geri
        </button>
        {answers[q.id] != null && (
          <button type="button" onClick={() => setStep((s) => s + 1)} className="inline-flex items-center gap-1 text-link hover:underline">
            İleri <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
