import { CARS, CATEGORIES, getCar, getCategory } from '../data/cars.js';
import { SITE_URL, SITE_NAME } from '../config.js';
import { GUIDES, getGuide } from '../data/guides.js';
import { POPULAR_COMPARISONS } from '../data/comparisons.js';

// ---------------------------------------------------------------------------
// ARAMA MOTORU (SEO) BİLGİLERİ
// Her sayfanın başlığı, açıklaması, kanonik adresi ve yapılandırılmış verisi.
// Hem yayın öncesi HTML üretiminde (prerender) hem de tarayıcıda kullanılır.
// ---------------------------------------------------------------------------
const DEFAULT_TITLE = `${SITE_NAME} — Otomobil İncelemeleri ve Sıralamaları`;
const DEFAULT_DESC = `${SITE_NAME}: Türkiye pazarındaki otomobillerin 10 başlıkta puanlanan incelemeleri, segment sıralamaları, güvenilirlik ve ikinci el değerlendirmeleri.`;

const titled = (t) => `${t} | ${SITE_NAME}`;

function clip(text, max = 158) {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

const fmt = (n) => n.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const STATIC = {
  '/': { title: DEFAULT_TITLE, description: DEFAULT_DESC },
  '/araclar': {
    title: titled('Tüm araçlar'),
    description: `İncelediğimiz ${CARS.length} otomobilin tamamı: marka, yakıt, vites, fiyat, model yılı ve puana göre filtreleyin, istediğiniz ölçüte göre sıralayın.`,
  },
  '/puanlama': {
    title: titled('Nasıl puanlıyoruz?'),
    description: 'Otomobilleri sürüşten güvenilirliğe, ikinci el değerinden teknolojiye 10 başlıkta nasıl puanladığımızı öğrenin.',
  },
  '/karsilastir': {
    title: titled('Otomobil karşılaştır'),
    description: 'Otomobilleri puanları, teknik verileri, menzilleri, artıları ve eksileriyle yan yana karşılaştırın. En fazla 3 aracı aynı anda kıyaslayın.',
  },
  '/arac-bulucu': {
    title: titled('Araç bulucu: Bana uygun aracı bul'),
    description: 'Bütçenize, kullanımınıza ve önceliklerinize göre adım adım sorularla size en uygun otomobili bulun. Sonuçlar uyum yüzdesiyle sıralanır.',
  },
  '/editorun-secimi': {
    title: titled('Editörün seçimi'),
    description: 'Her hafta öne çıkardığımız üç otomobil ve onları neden seçtiğimiz: OtoVaro editörünün haftalık seçimleri.',
  },
  '/rehber': {
    title: titled('Rehber'),
    description: 'Otomobil seçerken işinize yarayacak listeler, karşılaştırmalar ve pratik bilgiler: en az yakan otomobiller ve daha fazlası.',
  },
  '/hakkinda': {
    title: titled('Hakkında'),
    description: `${SITE_NAME} nedir, otomobilleri nasıl değerlendiriyor ve bağımsızlığını nasıl koruyor?`,
  },
  '/iletisim': {
    title: titled('İletişim'),
    description: `${SITE_NAME} ile iletişime geçin: hata bildirimi, öneriler, reklam ve iş birliği talepleri.`,
  },
  '/gizlilik': {
    title: titled('Gizlilik Politikası ve KVKK Aydınlatma Metni'),
    description: `${SITE_NAME} kişisel verileri nasıl işler? 6698 sayılı KVKK kapsamında aydınlatma metni ve haklarınız.`,
  },
  '/cerez-politikasi': {
    title: titled('Çerez Politikası'),
    description: `${SITE_NAME} hangi çerezleri, hangi amaçla kullanır ve tercihlerinizi nasıl yönetebilirsiniz?`,
  },
  '/ara': { title: titled('Arama'), description: DEFAULT_DESC, noindex: true },
};

function reviewSeo(car) {
  const category = getCategory(car.category);
  const title = titled(`${car.year} ${car.make} ${car.model} incelemesi`);
  const description = clip(
    `${car.year} ${car.make} ${car.model} ${car.version} incelemesi: 10 başlıkta ${fmt(car.score)}/10 puan. ${car.summary}`
  );
  const url = `${SITE_URL}/inceleme/${car.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      name: `${car.year} ${car.make} ${car.model} incelemesi`,
      url,
      reviewBody: car.summary,
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      itemReviewed: {
        '@type': 'Car',
        name: `${car.year} ${car.make} ${car.model} ${car.version}`,
        brand: { '@type': 'Brand', name: car.make },
        model: car.model,
        vehicleModelDate: String(car.year),
      },
      reviewRating: { '@type': 'Rating', ratingValue: car.score, bestRating: 10, worstRating: 0 },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Sıralamalar', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: category.short, item: `${SITE_URL}/kategori/${category.slug}` },
        { '@type': 'ListItem', position: 3, name: `${car.make} ${car.model}`, item: url },
      ],
    },
  ];
  return { title, description, jsonLd, type: 'article' };
}

function compareCars(pair) {
  return [...new Set(pair.split('-vs-'))].map((x) => getCar(x)).filter(Boolean).slice(0, 3);
}

function guideSeo(g) {
  const url = `${SITE_URL}/rehber/${g.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.title,
      description: g.description,
      datePublished: g.date,
      dateModified: g.date,
      inLanguage: 'tr-TR',
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
  ];
  if (g.items?.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: g.title,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: g.items
        .map((it, i) => {
          const car = getCar(it.car);
          return car
            ? { '@type': 'ListItem', position: i + 1, name: `${car.year} ${car.make} ${car.model}`, url: `${SITE_URL}/inceleme/${car.slug}` }
            : null;
        })
        .filter(Boolean),
    });
  }
  return { title: titled(g.title), description: clip(g.description), jsonLd, type: 'article' };
}

export function getSeo(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  let seo;
  let m;
  if (STATIC[path]) {
    seo = { ...STATIC[path] };
  } else if ((m = path.match(/^\/inceleme\/([^/]+)$/)) && getCar(m[1])) {
    seo = reviewSeo(getCar(m[1]));
  } else if ((m = path.match(/^\/karsilastir\/([^/]+)$/)) && compareCars(m[1]).length >= 2) {
    const cars = compareCars(m[1]);
    const names = cars.map((c) => `${c.make} ${c.model}`).join(' vs ');
    seo = {
      title: titled(`${names} karşılaştırması`),
      description: clip(
        `${cars.map((c) => `${c.year} ${c.make} ${c.model} (${fmt(c.score)}/10)`).join(' ile ')} karşılaştırması: 10 başlıkta puanlar, teknik veriler, artılar ve eksiler. Hangisini almalı?`
      ),
    };
  } else if ((m = path.match(/^\/rehber\/([^/]+)$/)) && getGuide(m[1])) {
    seo = guideSeo(getGuide(m[1]));
  } else if ((m = path.match(/^\/kategori\/([^/]+)$/)) && getCategory(m[1])) {
    const c = getCategory(m[1]);
    seo = { title: titled(c.title), description: clip(`${c.intro} ${SITE_NAME} ${c.short} sıralaması.`) };
  } else {
    return { title: titled('Sayfa bulunamadı'), description: DEFAULT_DESC, noindex: true, canonical: null, notFound: true };
  }
  if (path === '/') {
    seo.jsonLd = [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/`, inLanguage: 'tr-TR' },
    ];
  }
  return { type: 'website', ...seo, canonical: `${SITE_URL}${path === '/' ? '/' : path}` };
}

// Yayın öncesi HTML olarak üretilecek tüm adresler
export function allRoutes() {
  return [
    '/',
    '/araclar',
    '/puanlama',
    '/hakkinda',
    '/iletisim',
    '/gizlilik',
    '/cerez-politikasi',
    '/ara',
    '/arac-bulucu',
    '/editorun-secimi',
    '/karsilastir',
    ...POPULAR_COMPARISONS.map((p) => `/karsilastir/${p.join('-vs-')}`),
    '/rehber',
    ...GUIDES.map((g) => `/rehber/${g.slug}`),
    ...CATEGORIES.map((c) => `/kategori/${c.slug}`),
    ...CARS.map((c) => `/inceleme/${c.slug}`),
  ];
}
