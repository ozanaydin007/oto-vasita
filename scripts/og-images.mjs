// ---------------------------------------------------------------------------
// PAYLAŞIM GÖRSELLERİ (og:image)
// Yayın sırasında her inceleme, rehber ve model geçmişi sayfası için 1200×630
// boyutunda bir paylaşım görseli üretir (dist/og/...). WhatsApp, X, Telegram,
// Facebook gibi uygulamalar bağlantı paylaşıldığında bu görseli gösterir.
// Görsellerde fotoğraf yok: puan, radar grafiği ve başlıklar kullanılır.
// Bir hata olursa yayın durmaz; görsel üretimi atlanır.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'dist', 'og');
const require = createRequire(import.meta.url);
const W = 1200;
const H = 630;
const C = { ink: '#16181d', soft: '#3f4450', muted: '#6b7280', rule: '#e5e7eb', mist: '#f3f4f6', star: '#f5b301', green: '#15803d', red: '#b91c1c' };

function loadResvg() {
  try {
    return require('@resvg/resvg-js').Resvg;
  } catch {
    // ilk kez: geçici olarak kur (package.json değişmez)
  }
  try {
    execSync(
      'npm install --no-save --no-audit --no-fund --no-package-lock @resvg/resvg-js@2 @expo-google-fonts/barlow @expo-google-fonts/barlow-semi-condensed',
      { cwd: root, stdio: 'inherit', timeout: 240000 }
    );
    return require('@resvg/resvg-js').Resvg;
  } catch (err) {
    console.warn('! Paylaşım görselleri için gereken araç kurulamadı, görseller atlanıyor:', err.message);
    return null;
  }
}

function findFonts() {
  const files = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/^(Barlow_(400Regular|500Medium|600SemiBold)|BarlowSemiCondensed_(700Bold|800ExtraBold))\.ttf$/.test(e.name)) files.push(p);
    }
  };
  walk(path.join(root, 'node_modules', '@expo-google-fonts', 'barlow'));
  walk(path.join(root, 'node_modules', '@expo-google-fonts', 'barlow-semi-condensed'));
  return files;
}

const x = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmt = (n) => n.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// Basit satır kırma: yaklaşık karakter genişliğine göre
function wrap(text, size, maxWidth, maxLines, factor = 0.5) {
  const perLine = Math.max(8, Math.floor(maxWidth / (size * factor)));
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > perLine && cur) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[,.;:]?$/, '')}…`;
    return kept;
  }
  return lines;
}
const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : s);

function textLines(lines, { x0, y0, size, lh, family, weight, fill }) {
  return lines
    .map((l, i) => `<text x="${x0}" y="${y0 + i * lh}" font-family="${family}" font-weight="${weight}" font-size="${size}" fill="${fill}">${x(l)}</text>`)
    .join('');
}

function frame(inner, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect width="${W}" height="10" fill="${C.star}"/>
  <text x="60" y="78" font-family="Barlow Semi Condensed" font-weight="800" font-size="40" fill="${C.ink}">OtoVaro</text>
  ${label ? `<text x="${W - 60}" y="76" text-anchor="end" font-family="Barlow" font-weight="600" font-size="24" letter-spacing="2" fill="${C.muted}">${x(label)}</text>` : ''}
  <line x1="60" y1="102" x2="${W - 60}" y2="102" stroke="${C.rule}" stroke-width="2"/>
  ${inner}
  <text x="60" y="${H - 34}" font-family="Barlow" font-weight="500" font-size="22" fill="${C.muted}">otovaro.com</text>
</svg>`;
}

function radar(ratings, criteria, cx, cy, r) {
  const n = criteria.length;
  const pt = (i, v) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + Math.cos(a) * r * (v / 10), cy + Math.sin(a) * r * (v / 10)];
  };
  const ring = (v) => criteria.map((_, i) => pt(i, v).map((k) => k.toFixed(1)).join(',')).join(' ');
  const grid = [2.5, 5, 7.5, 10].map((v) => `<polygon points="${ring(v)}" fill="none" stroke="${C.rule}" stroke-width="2"/>`).join('');
  const spokes = criteria.map((_, i) => { const [a, b] = pt(i, 10); return `<line x1="${cx}" y1="${cy}" x2="${a.toFixed(1)}" y2="${b.toFixed(1)}" stroke="${C.rule}" stroke-width="2"/>`; }).join('');
  const poly = criteria.map((c, i) => pt(i, ratings[c.key] ?? 0).map((k) => k.toFixed(1)).join(',')).join(' ');
  const labels = criteria.map((c, i) => {
    const [a, b] = pt(i, 12.3);
    const anchor = Math.abs(a - cx) < 10 ? 'middle' : a > cx ? 'start' : 'end';
    return `<text x="${a.toFixed(1)}" y="${(b + 7).toFixed(1)}" text-anchor="${anchor}" font-family="Barlow" font-weight="500" font-size="18" fill="${C.muted}">${x(c.label.replace('Malzeme Kalitesi', 'Malzeme').replace('Fiyat / Değer', 'Fiyat/Değer'))}</text>`;
  }).join('');
  return `${grid}${spokes}<polygon points="${poly}" fill="${C.star}" fill-opacity="0.35" stroke="${C.star}" stroke-width="4" stroke-linejoin="round"/>${labels}`;
}

function carSvg(car, category, criteria) {
  const title = wrap(`${car.year} ${car.make} ${car.model}`, 62, 600, 2, 0.56);
  let y = 175;
  let inner = textLines(title, { x0: 60, y0: y, size: 62, lh: 66, family: 'Barlow Semi Condensed', weight: 800, fill: C.ink });
  y += (title.length - 1) * 66 + 44;
  inner += `<text x="60" y="${y}" font-family="Barlow" font-weight="500" font-size="26" fill="${C.soft}">${x(clip(car.version, 44))}</text>`;
  y += 70;
  // puan kutusu
  inner += `<rect x="60" y="${y - 50}" width="190" height="96" rx="14" fill="${C.ink}"/>
  <text x="155" y="${y + 14}" text-anchor="middle" font-family="Barlow Semi Condensed" font-weight="800" font-size="60" fill="#ffffff">${fmt(car.score)}<tspan font-size="28" fill="#c9ccd3" font-weight="700"> /10</tspan></text>`;
  if (category) {
    const rank = car.rank && car.rank <= 10 ? ` · ${car.rank}. sırada` : '';
    inner += textLines(wrap(`${category.title}${rank}`, 24, 330, 2), { x0: 274, y0: y - 6, size: 24, lh: 30, family: 'Barlow', weight: 600, fill: C.soft });
  }
  y += 92;
  const pro = car.pros?.[0];
  const con = car.cons?.[0];
  if (pro) inner += `<text x="60" y="${y}" font-family="Barlow" font-weight="600" font-size="26" fill="${C.green}">+ <tspan fill="${C.ink}" font-weight="500">${x(clip(pro, 40))}</tspan></text>`;
  if (con) inner += `<text x="60" y="${y + 40}" font-family="Barlow" font-weight="600" font-size="26" fill="${C.red}">− <tspan fill="${C.ink}" font-weight="500">${x(clip(con, 40))}</tspan></text>`;
  inner += radar(car.ratings, criteria, 905, 365, 165);
  return frame(inner, 'İNCELEME');
}

function articleSvg(label, titleText, sub, chips) {
  const title = wrap(titleText, 60, 1080, 3, 0.6);
  let inner = textLines(title, { x0: 60, y0: 190, size: 60, lh: 66, family: 'Barlow Semi Condensed', weight: 800, fill: C.ink });
  let y = 190 + (title.length - 1) * 66 + 60;
  if (sub) {
    const s = wrap(sub, 30, 1080, chips ? 2 : 3, 0.56);
    inner += textLines(s, { x0: 60, y0: y, size: 30, lh: 40, family: 'Barlow', weight: 500, fill: C.soft });
    y += s.length * 40 + 30;
  }
  if (chips?.length) {
    let cx = 60;
    for (const c of chips) {
      const w = c.length * 17 + 36;
      if (cx + w > W - 60) break;
      inner += `<rect x="${cx}" y="${y - 32}" width="${w}" height="48" rx="24" fill="${C.mist}"/><text x="${cx + w / 2}" y="${y}" text-anchor="middle" font-family="Barlow" font-weight="600" font-size="24" fill="${C.ink}">${x(c)}</text>`;
      cx += w + 12;
    }
  }
  return frame(inner, label);
}

function siteSvg() {
  const inner = `<text x="60" y="250" font-family="Barlow Semi Condensed" font-weight="800" font-size="84" fill="${C.ink}">Bağımsız otomobil</text>
  <text x="60" y="340" font-family="Barlow Semi Condensed" font-weight="800" font-size="84" fill="${C.ink}">incelemeleri</text>
  <text x="60" y="420" font-family="Barlow" font-weight="500" font-size="32" fill="${C.soft}">Türkiye pazarındaki otomobiller, 10 başlıkta puanlanmış</text>`;
  return frame(inner, '');
}

const Resvg = loadResvg();
if (!Resvg) process.exit(0);
try {
  const fonts = findFonts();
  if (!fonts.length) console.warn('! Barlow yazı tipi bulunamadı; sistem yazı tipleri kullanılacak.');
  const imp = (p) => import(pathToFileURL(path.join(root, p)).href);
  const { CARS, getCategory } = await imp('src/data/cars.js');
  const { CRITERIA } = await imp('src/data/criteria.js');
  const { GUIDES } = await imp('src/data/guides.js');
  const { MODELS } = await imp('src/data/models.js');
  fs.mkdirSync(outDir, { recursive: true });
  const render = (svg, file) => {
    const png = new Resvg(svg, {
      fitTo: { mode: 'width', value: W },
      font: { fontFiles: fonts, loadSystemFonts: fonts.length === 0, defaultFontFamily: 'Barlow' },
    }).render().asPng();
    fs.writeFileSync(path.join(outDir, file), png);
  };
  let n = 0;
  render(siteSvg(), 'site.png'); n++;
  for (const car of CARS) { render(carSvg(car, getCategory(car.category), CRITERIA), `inceleme-${car.slug}.png`); n++; }
  for (const g of GUIDES) { render(articleSvg('REHBER', g.title, g.subtitle), `rehber-${g.slug}.png`); n++; }
  for (const m of MODELS) { render(articleSvg('MODEL GEÇMİŞİ', m.title, m.subtitle, m.generations.map((g) => g.code)), `model-${m.slug}.png`); n++; }
  console.log(`✓ ${n} paylaşım görseli üretildi.`);
} catch (err) {
  console.warn('! Paylaşım görselleri üretilemedi, atlanıyor:', err.message);
}
