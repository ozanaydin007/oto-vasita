// ---------------------------------------------------------------------------
// YAYIN ÖNCESİ HTML ÜRETİMİ (prerender)
// `npm run build` sırasında otomatik çalışır:
//   1) Her sayfa için hazır HTML üretir (arama motorları içeriği doğrudan görür)
//   2) Her sayfaya kendi başlık, açıklama, kanonik adres ve paylaşım etiketlerini ekler
//   3) sitemap.xml ve robots.txt dosyalarını oluşturur
// Çıktı: dist/  (Cloudflare Pages bu klasörü yayınlar)
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const { render } = await import(pathToFileURL(serverEntry).href);
const { getSeo, allRoutes } = await import(pathToFileURL(path.join(root, 'src/lib/seo.js')).href);
const { SITE_URL, SITE_NAME } = await import(pathToFileURL(path.join(root, 'src/config.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html içinde <div id="root"></div> bulunamadı.');
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function headTags(route, seo) {
  const tags = [
    `<meta name="description" content="${esc(seo.description)}" />`,
    seo.canonical ? `<link rel="canonical" href="${esc(seo.canonical)}" />` : '',
    seo.noindex ? '<meta name="robots" content="noindex, follow" />' : '',
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    '<meta property="og:locale" content="tr_TR" />',
    `<meta property="og:type" content="${seo.type || 'website'}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    seo.canonical ? `<meta property="og:url" content="${esc(seo.canonical)}" />` : '',
    '<meta name="twitter:card" content="summary" />',
    ...(seo.jsonLd || []).map(
      (d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`
    ),
    `<script>window.__PRERENDER_PATH__=${JSON.stringify(route)}</script>`,
  ];
  return tags.filter(Boolean).join('\n    ');
}

function page(route) {
  const seo = getSeo(route);
  const html = render(route);
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
    .replace(/\s*<meta name="description"[^>]*>/, '')
    .replace('</head>', `    ${headTags(route, seo)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

// "/" -> dist/index.html, "/araclar" -> dist/araclar.html, "/inceleme/x" -> dist/inceleme/x.html
// Cloudflare Pages, /araclar.html dosyasını /araclar adresinde sunar.
function fileFor(route) {
  return route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.slice(1)}.html`);
}

const routes = allRoutes();
let count = 0;
for (const route of routes) {
  const out = fileFor(route);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(route));
  count++;
}

// Site haritası (arama sonuçlarında gösterilmesini istemediğimiz sayfalar hariç)
const today = new Date().toISOString().slice(0, 10);
const indexable = routes.filter((r) => !getSeo(r).noindex);
const priority = (r) => (r === '/' ? '1.0' : r.startsWith('/kategori/') || r === '/araclar' ? '0.9' : r.startsWith('/inceleme/') || r.startsWith('/rehber') ? '0.8' : '0.3');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod><priority>${priority(r)}</priority></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /ara\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

console.log(`✓ ${count} sayfa HTML olarak üretildi, sitemap.xml (${indexable.length} adres) ve robots.txt yazıldı.`);
