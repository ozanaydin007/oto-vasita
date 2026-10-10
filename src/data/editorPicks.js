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
        text: 'A4’ün yerini alan yeni nesil A5; quattro dört çekeri, ferah kabini ve ön yolcu ekranı gibi detaylarıyla premium sedan arayanların listesinde ilk sıralarda olmalı.',
      },
      {
        car: 'volvo-ex30-2026',
        text: 'Volvo’nun en küçük elektriklisi; kompakt boyutlarına rağmen güçlü motoru, İskandinav sadeliğindeki kabini ve güvenlik odaklı yapısıyla şehirli sürücüler için çok cazip.',
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
