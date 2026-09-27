# Oto Vasıta

Otomobil inceleme ve puanlama sitesi. React + Vite + Tailwind CSS, Vercel üzerinde yayında.

## Yerelde çalıştırma

```bash
npm install
npm run dev
```

## Yeni araç eklemek

`src/data/cars.js` dosyasında `RAW_CARS` listesine yeni bir blok ekleyin:

```js
{
  make: 'Volkswagen', model: 'Golf', year: 2025, version: '1.5 eTSI Style DSG',
  category: 'kompakt-sedan', bodyType: 'fastback', price: 2100000,
  specs: { motor: '1.5 eTSI, 150 bg', hizlanma: '8,5 sn', tuketim: '5,4 L/100 km', bagaj: '381 L' },
  ratings: { surus: 8.7, guvenlik: 9.0, konfor: 8.5, tuketim: 8.6, malzeme: 8.4, tasarim: 8.1, fiyat: 7.8, teknoloji: 8.8 },
  pros: ['...'],
  cons: ['...'],
  summary: '...',
  image: '/cars/vw-golf.png', // isteğe bağlı
},
```

- Genel puan (8 başlığın ortalaması), kategori sırası ve sayfa adresi otomatik oluşur.
- Fotoğraflar `public/cars/` klasörüne konur. Fotoğraf yoksa gövde tipine göre silüet gösterilir.
- Puan başlıklarının adları `src/data/criteria.js` içindedir.

## Sayfalar

| Adres | İçerik |
| --- | --- |
| `/` | Kategori sıralamaları |
| `/kategori/:slug` | Bir kategorinin tam sıralaması |
| `/inceleme/:slug` | Araç incelemesi ve 8 başlıklı puan karnesi |
| `/ara?q=` | Arama sonuçları |
| `/puanlama` | Puanlama yöntemi |

`vercel.json`, bu adreslerin sayfa yenilendiğinde 404 vermemesini sağlar.
