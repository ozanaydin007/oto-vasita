// Yayın öncesi: src/data/carDetails.js içindeki uzun incelemeleri araç başına ayrı
// dosyalara böler (src/data/details/<slug>.js). Böylece her inceleme yalnızca kendi
// sayfası açıldığında yüklenir ve ana paket küçük kalır. Hata olursa yayın durmaz;
// site, ayrıntıları tek parça hâlinde yüklemeye devam eder.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';

try {
  const { DETAILS } = await import('../src/data/carDetails.js');
  const dir = new URL('../src/data/details/', import.meta.url);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  let n = 0;
  for (const [slug, d] of Object.entries(DETAILS)) {
    writeFileSync(new URL(`${slug}.js`, dir), `export default ${JSON.stringify(d)};\n`);
    n++;
  }
  console.log(`✓ ${n} araç incelemesi ayrı parçalara bölündü.`);
} catch (err) {
  console.warn('! İncelemeler bölünemedi, tek parça kullanılacak:', err.message);
}
