// Her araç bu 10 başlıkta 0–10 arası (küsuratlı) puanlanır.
// weight: başlığın genel puandaki ağırlığı. Genel puan = ağırlıklı ortalama.
// Ağırlıkları değiştirirseniz tüm genel puanlar ve sıralamalar kendiliğinden güncellenir.
// Bir başlığın adını değiştirmek için sadece "label" ve "hint" alanını düzenleyin.
// "key" alanını değiştirirseniz cars.js içindeki ratings anahtarlarını da değiştirmeniz gerekir.
export const CRITERIA = [
  { key: 'surus', label: 'Sürüş', weight: 1.3, hint: 'Yol tutuş, direksiyon hissi, performans' },
  { key: 'guvenlik', label: 'Güvenlik', weight: 1.2, hint: 'Euro NCAP sonucu, sürüş destek sistemleri' },
  { key: 'konfor', label: 'Konfor', weight: 1.3, hint: 'Süspansiyon, koltuklar, ses yalıtımı' },
  { key: 'tuketim', label: 'Tüketim', weight: 0.7, hint: 'Gerçek kullanımda yakıt veya enerji tüketimi' },
  { key: 'malzeme', label: 'Malzeme Kalitesi', weight: 1.2, hint: 'İşçilik, kabin malzemeleri, montaj kalitesi' },
  { key: 'tasarim', label: 'Tasarım', weight: 1.0, hint: 'Dış ve iç tasarım, ergonomi' },
  { key: 'fiyat', label: 'Fiyat / Değer', weight: 0.6, hint: 'Fiyatına göre sunduğu donanım ve kalite' },
  { key: 'teknoloji', label: 'Teknoloji', weight: 1.1, hint: 'Multimedya, bağlantı, dijital özellikler' },
  { key: 'guvenilirlik', label: 'Güvenilirlik', weight: 1.0, hint: 'Kronik sorunlar; motor, şanzıman, şasi ve yürüyen aksamın uzun vadeli dayanıklılığı' },
  { key: 'ikinciel', label: 'İkinci El', weight: 0.6, hint: 'Temiz örnek bulma kolaylığı, değer kaybı ve ne kadar hızlı satıldığı' },
];
