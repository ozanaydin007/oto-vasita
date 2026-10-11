// ---------------------------------------------------------------------------
// EDİTÖRÜN SEÇİMİ
// Her hafta yeni bir blok EN ÜSTE eklenir. İlk blok "bu hafta" olarak ana
// sayfada gösterilir; tüm bloklar /editorun-secimi sayfasında listelenir.
// ---------------------------------------------------------------------------
export const EDITOR_WEEKS = [
  {
    week: '10 Ekim 2026 haftası',
    items: [
      {
        car: 'audi-a5-sedan-2026',
        text: 'Sürücünün göremediği yolcu ekranı, konforlu sürüşü ve her A5 gibi havalı tasarımıyla premium sedanlar arasında öne çıkıyor; tek sorum, A5’in sedan olması gerekip gerekmediği.',
      },
      {
        car: 'volvo-ex30-2026',
        text: 'Uyku modundan ön bagajdaki küçük desene kadar sürprizlerle dolu; baskın arkadan itiş karakteriyle sürmesi inanılmaz keyifli. Her hâliyle inanılmaz bir otomobil.',
      },
      {
        car: 'skoda-octavia-2026',
        text: 'Geniş bagajı, akıllı detayları ve ekonomik hafif hibrit motoruyla “tek otomobille her işi görürüm” diyen aileler için segmentin en mantıklı seçimlerinden.',
      },
    ],
  },
];

// Ana sayfadaki "bu hafta"
export const EDITOR_PICKS = EDITOR_WEEKS[0];
