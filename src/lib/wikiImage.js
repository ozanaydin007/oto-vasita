import { useEffect, useState } from 'react';

// ---------------------------------------------------------------------------
// Wikipedia / Wikimedia Commons'tan araç fotoğrafı yükleyici
// 1) en.wikipedia.org: makalenin ana fotoğrafının dosya adı (yalnızca serbest lisans)
// 2) commons.wikimedia.org: küçültülmüş adres + fotoğrafçı + lisans bilgisi
// İstekler toplu yapılır (50'şerli) ve tarayıcı oturumu boyunca önbelleğe alınır.
// ---------------------------------------------------------------------------
const WIKI_API = 'https://en.wikipedia.org/w/api.php';
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const THUMB_WIDTH = 960;
const CHUNK = 50;

const cache = new Map(); // key -> Promise<info|null>
let queue = []; // { key, title, file, resolve }
let timer = null;

const stripHtml = (html = '') => {
  const s = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
};

const chunks = (arr, n) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

async function getJSON(base, params) {
  const url = `${base}?${new URLSearchParams({ format: 'json', formatversion: '2', origin: '*', ...params })}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Makale adı -> Commons dosya adı
async function pageImages(titles) {
  const out = new Map();
  for (const group of chunks(titles, CHUNK)) {
    const data = await getJSON(WIKI_API, {
      action: 'query',
      prop: 'pageimages',
      piprop: 'name',
      pilicense: 'free',
      redirects: '1',
      titles: group.join('|'),
    });
    const q = data.query || {};
    const alias = new Map();
    for (const n of q.normalized || []) alias.set(n.from, n.to);
    for (const r of q.redirects || []) alias.set(r.from, r.to);
    const resolve = (t) => {
      let cur = t;
      for (let i = 0; i < 4 && alias.has(cur); i++) cur = alias.get(cur);
      return cur;
    };
    const byTitle = new Map((q.pages || []).map((p) => [p.title, p.pageimage]));
    for (const t of group) {
      const file = byTitle.get(resolve(t));
      if (file) out.set(t, file);
    }
  }
  return out;
}

// Commons dosya adı -> { src, author, license, licenseUrl, page }
async function fileInfo(files) {
  const out = new Map();
  for (const group of chunks(files, CHUNK)) {
    const data = await getJSON(COMMONS_API, {
      action: 'query',
      prop: 'imageinfo',
      iiprop: 'url|extmetadata',
      iiurlwidth: String(THUMB_WIDTH),
      iiextmetadatafilter: 'Artist|LicenseShortName|LicenseUrl',
      titles: group.map((f) => `File:${f}`).join('|'),
    });
    const q = data.query || {};
    const alias = new Map((q.normalized || []).map((n) => [n.to, n.from]));
    for (const p of q.pages || []) {
      const ii = p.imageinfo?.[0];
      if (!ii) continue;
      const m = ii.extmetadata || {};
      const requested = (alias.get(p.title) || p.title).replace(/^File:/, '');
      out.set(requested.replace(/ /g, '_'), {
        src: ii.thumburl || ii.url,
        page: ii.descriptionurl,
        author: stripHtml(m.Artist?.value) || 'Bilinmiyor',
        license: m.LicenseShortName?.value || '',
        licenseUrl: m.LicenseUrl?.value || '',
      });
    }
  }
  return out;
}

async function flush() {
  const batch = queue;
  queue = [];
  timer = null;
  try {
    const needTitles = [...new Set(batch.filter((b) => !b.file).map((b) => b.title))];
    const titleToFile = needTitles.length ? await pageImages(needTitles) : new Map();
    const fileOf = (b) => (b.file || titleToFile.get(b.title) || '').replace(/ /g, '_');
    const files = [...new Set(batch.map(fileOf).filter(Boolean))];
    const info = files.length ? await fileInfo(files) : new Map();
    for (const b of batch) b.resolve(info.get(fileOf(b)) || null);
  } catch {
    for (const b of batch) b.resolve(null);
  }
}

function load(title, file) {
  const key = file ? `f:${file}` : `t:${title}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      new Promise((resolve) => {
        queue.push({ key, title, file, resolve });
        if (!timer) timer = setTimeout(flush, 30);
      })
    );
  }
  return cache.get(key);
}

// Bir araç için fotoğraf bilgisi. Kendi fotoğrafı (image) varsa onu kullanır.
export function useCarPhoto(car) {
  const own = car.image ? { src: car.image, own: true } : null;
  const title = car.wiki;
  const file = car.wikiFile;
  const [photo, setPhoto] = useState(own);

  useEffect(() => {
    if (car.image) {
      setPhoto({ src: car.image, own: true });
      return undefined;
    }
    if (!title && !file) {
      setPhoto(null);
      return undefined;
    }
    let alive = true;
    setPhoto(null);
    load(title, file).then((p) => alive && setPhoto(p));
    return () => {
      alive = false;
    };
  }, [car.image, title, file]);

  return photo;
}
