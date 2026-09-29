import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeo } from '../lib/seo.js';

function setMeta(selector, attr, key, value) {
  let el = document.head.querySelector(selector);
  if (value == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(selector.startsWith('link') ? 'href' : 'content', value);
}

// Site içinde sayfa değiştikçe açıklama, kanonik adres ve paylaşım etiketlerini günceller.
// (Arama motorları ilk yüklemede zaten hazır HTML'deki etiketleri görür.)
export default function SeoSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getSeo(pathname);
    setMeta('meta[name="description"]', 'name', 'description', seo.description);
    setMeta('meta[name="robots"]', 'name', 'robots', seo.noindex ? 'noindex, follow' : null);
    setMeta('link[rel="canonical"]', 'rel', 'canonical', seo.canonical);
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonical);
  }, [pathname]);
  return null;
}
