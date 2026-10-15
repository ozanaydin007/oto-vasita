// Yayın öncesi: tüm araçların Wikimedia fotoğraflarını çözer ve src/data/photos.js'e yazar.
// Böylece fotoğraflar hazır HTML'de yer alır (Google görebilir) ve ziyaretçinin tarayıcısı
// Wikipedia'ya ayrıca istek atmaz. Bir hata olursa yayın durmaz; mevcut dosya korunur.
import { writeFileSync } from 'node:fs';

try {
  const { CARS } = await import('../src/data/cars.js');
  const { resolveAllPhotos } = await import('../src/lib/wikiImage.js');
  const photos = await resolveAllPhotos(CARS);
  const n = Object.keys(photos).length;
  if (n < CARS.length * 0.5) throw new Error(`yalnızca ${n} fotoğraf çözülebildi`);
  const body =
    '// Otomatik üretildi: scripts/fetch-photos.mjs. Elle düzenlemeyin.\n' +
    `export const PHOTOS = ${JSON.stringify(photos, null, 0)};\n`;
  writeFileSync(new URL('../src/data/photos.js', import.meta.url), body);
  console.log(`✓ ${n}/${CARS.length} araç fotoğrafı yayına hazırlandı.`);
} catch (err) {
  console.warn('! Fotoğraflar önceden çözülemedi, tarayıcıda yüklenmeye devam edecek:', err.message);
}
