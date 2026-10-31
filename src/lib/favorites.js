import { useEffect, useState } from 'react';
import { getCar } from '../data/cars.js';

// ---------------------------------------------------------------------------
// FAVORİLER (izleme listesi)
// Ziyaretçinin beğendiği araçlar yalnızca kendi tarayıcısında tutulur;
// hesap gerekmez, hiçbir veri sunucuya gönderilmez.
// ---------------------------------------------------------------------------
const KEY = 'otovaro-favoriler';
const listeners = new Set();

export function getFavorites() {
  try {
    const list = JSON.parse(window.localStorage.getItem(KEY) || '[]');
    return Array.isArray(list) ? list.filter((s) => getCar(s)) : [];
  } catch {
    return [];
  }
}

export function setFavorites(list) {
  const clean = [...new Set(list)].filter((s) => getCar(s));
  try {
    window.localStorage.setItem(KEY, JSON.stringify(clean));
  } catch {
    // depolama kapalıysa yalnızca bu sayfa için geçerli olur
  }
  listeners.forEach((fn) => fn(clean));
  return clean;
}

export function toggleFavorite(slug) {
  const list = getFavorites();
  return setFavorites(list.includes(slug) ? list.filter((s) => s !== slug) : [slug, ...list]);
}

export function useFavorites() {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(getFavorites());
    const fn = () => setList(getFavorites());
    listeners.add(fn);
    window.addEventListener('storage', fn);
    return () => {
      listeners.delete(fn);
      window.removeEventListener('storage', fn);
    };
  }, []);
  return list;
}
