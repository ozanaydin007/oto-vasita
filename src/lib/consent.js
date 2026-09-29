import { ADSENSE_CLIENT } from '../config.js';

// ---------------------------------------------------------------------------
// ÇEREZ ONAYI (KVKK)
// Zorunlu olmayan hiçbir çerez/betik, ziyaretçi açıkça onay vermeden yüklenmez.
// Tercih, ziyaretçinin kendi tarayıcısında saklanır (localStorage).
// ---------------------------------------------------------------------------
const KEY = 'otovaro-cerez-tercihi';
const VERSION = 1;
const listeners = new Set();

export function getConsent() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data && data.v === VERSION ? data : null;
  } catch {
    return null;
  }
}

export function saveConsent({ analytics, ads }) {
  const data = { v: VERSION, analytics: !!analytics, ads: !!ads, date: new Date().toISOString() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Tarayıcı depolamaya izin vermiyorsa tercih yalnızca bu oturum için geçerli olur.
  }
  listeners.forEach((fn) => fn(data));
  applyConsent(data);
  return data;
}

export function onConsentChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Footer'daki "Çerez tercihleri" bağlantısı bu olayı tetikler.
export function openCookieSettings() {
  window.dispatchEvent(new Event('otovaro:cerez-ayarlari'));
}

let adsLoaded = false;

// Onaya göre üçüncü taraf betikleri yükler.
export function applyConsent(consent = getConsent()) {
  if (!consent) return;
  if (consent.ads && ADSENSE_CLIENT && !adsLoaded) {
    adsLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }
  // Reklam onayı sonradan geri çekilirse, yüklenmiş betiği temizlemek için sayfa yenilenmelidir.
}
