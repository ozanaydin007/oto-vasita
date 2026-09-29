import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, saveConsent, applyConsent } from '../lib/consent.js';

function Toggle({ id, label, hint, checked, onChange, disabled = false }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-rule last:border-b-0">
      <div>
        <label htmlFor={id} className="font-semibold text-[15px]">{label}</label>
        <p className="text-sm text-ink-soft mt-0.5 leading-snug">{hint}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 w-5 h-5 accent-ink shrink-0"
      />
    </div>
  );
}

// Sayfanın altında açılan çerez onay paneli.
// "Kabul et" ve "Reddet" aynı görünürlükte sunulur; önceden işaretli seçenek yoktur.
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const current = getConsent();
    if (current) {
      applyConsent(current);
    } else {
      setOpen(true);
    }
    const reopen = () => {
      const c = getConsent();
      setAnalytics(!!c?.analytics);
      setAds(!!c?.ads);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener('otovaro:cerez-ayarlari', reopen);
    return () => window.removeEventListener('otovaro:cerez-ayarlari', reopen);
  }, []);

  if (!open) return null;

  const done = (choice) => {
    saveConsent(choice);
    setOpen(false);
    setDetails(false);
  };

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cerez-baslik" className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="max-w-3xl mx-auto bg-white border border-rule rounded-xl shadow-lg p-5 sm:p-6">
        <h2 id="cerez-baslik" className="font-display text-xl font-bold">Çerez tercihleriniz</h2>
        <p className="text-[15px] text-ink-soft mt-2 leading-relaxed">
          Sitenin çalışması için gerekli olanlar dışında, ziyaret istatistikleri ve reklam için çerez kullanmak
          istiyoruz. Bu çerezler yalnızca onay verirseniz kullanılır. Tercihinizi istediğiniz zaman sayfanın
          altındaki “Çerez tercihleri” bağlantısından değiştirebilirsiniz. Ayrıntılar için{' '}
          <Link to="/cerez-politikasi" className="text-link underline underline-offset-2">Çerez Politikası</Link> ve{' '}
          <Link to="/gizlilik" className="text-link underline underline-offset-2">Gizlilik ve KVKK Aydınlatma Metni</Link>.
        </p>

        {details && (
          <div className="mt-4 border border-rule rounded-lg px-4">
            <Toggle id="c-zorunlu" label="Zorunlu" hint="Sitenin çalışması ve çerez tercihinizin hatırlanması için gereklidir; kapatılamaz." checked disabled />
            <Toggle id="c-analitik" label="Analitik" hint="Hangi sayfaların okunduğunu anonim olarak ölçmemize yardımcı olur." checked={analytics} onChange={setAnalytics} />
            <Toggle id="c-reklam" label="Reklam" hint="Reklam ortaklarımızın (ör. Google) reklam göstermek ve ölçmek için çerez kullanmasına izin verir." checked={ads} onChange={setAds} />
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => done({ analytics: true, ads: true })} className="flex-1 min-w-[9rem] bg-ink text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-ink-soft">
            Tümünü kabul et
          </button>
          <button type="button" onClick={() => done({ analytics: false, ads: false })} className="flex-1 min-w-[9rem] bg-ink text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-ink-soft">
            Tümünü reddet
          </button>
          {details ? (
            <button type="button" onClick={() => done({ analytics, ads })} className="flex-1 min-w-[9rem] border border-ink font-semibold px-4 py-2.5 rounded-lg hover:bg-mist">
              Seçimimi kaydet
            </button>
          ) : (
            <button type="button" onClick={() => setDetails(true)} className="flex-1 min-w-[9rem] border border-ink font-semibold px-4 py-2.5 rounded-lg hover:bg-mist">
              Tercihleri yönet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
