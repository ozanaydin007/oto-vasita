// Her araç bu 8 başlıkta 0–10 arası (küsuratlı) puanlanır.
// Bir başlığın adını değiştirmek için sadece "label" ve "hint" alanını düzenleyin.
// "key" alanını değiştirirseniz cars.js içindeki ratings anahtarlarını da değiştirmeniz gerekir.
export const CRITERIA = [
  { key: 'surus', label: 'Sürüş', hint: 'Yol tutuş, direksiyon hissi, performans' },
  { key: 'guvenlik', label: 'Güvenlik', hint: 'Euro NCAP sonucu, sürüş destek sistemleri' },
  { key: 'konfor', label: 'Konfor', hint: 'Süspansiyon, koltuklar, ses yalıtımı' },
  { key: 'tuketim', label: 'Tüketim', hint: 'Gerçek kullanımda yakıt veya enerji tüketimi' },
  { key: 'malzeme', label: 'Malzeme Kalitesi', hint: 'İşçilik, kabin malzemeleri, montaj kalitesi' },
  { key: 'tasarim', label: 'Tasarım', hint: 'Dış ve iç tasarım, ergonomi' },
  { key: 'fiyat', label: 'Fiyat / Değer', hint: 'Fiyatına göre sunduğu donanım ve kalite' },
  { key: 'teknoloji', label: 'Teknoloji', hint: 'Multimedya, bağlantı, dijital özellikler' },
];
