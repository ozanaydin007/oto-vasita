// ---------------------------------------------------------------------------
// EDİTÖRÜN SEÇİMİ
// Her hafta yeni bir blok EN ÜSTE eklenir. İlk blok "bu hafta" olarak ana
// sayfada gösterilir; tüm bloklar /editorun-secimi sayfasında listelenir.
// ---------------------------------------------------------------------------
export const EDITOR_WEEKS = [
  {
    week: '19 Ekim 2026 haftası',
    items: [
      {
        car: 'bmw-ix3-2026',
        text: 'Yaklaşık 794 km menzili ve 21 dakikalık hızlı şarjıyla elektriklide menzil kaygısını neredeyse bitiren, dopdolu bir SUV; kesinlikle ciddi ciddi bakılması gereken bir otomobil.',
      },
      {
        car: 'cupra-formentor-2026',
        text: 'Agresif tasarımı ve keskin direksiyonuyla sınıfının en karakterli crossover’larından; sert arka süspansiyonunu ve ekran donmalarını bilerek alınmalı.',
      },
      {
        car: 'tesla-model-y-2026',
        text: 'Geçtiğimiz günlerde Elon Musk’ın SpaceX iticileriyle havalanabilen yeni Roadster’ı “uçan araba” olarak tanıtmasıyla markanın iddiasını bir kez daha görmüş olduk. Uçamayan arabalar arasında ise Model Y oldukça iyi bir seçim.',
      },
    ],
  },
  {
    week: '13 Ekim 2026 haftası',
    items: [
      {
        car: 'mercedes-benz-e-serisi-2026',
        text: 'Vergi avantajlı 1.5 motoruyla E-Serisi konforuna daha erişilebilir bir yoldan ulaşmanın yolu; Superscreen’i, yalıtımı ve süspansiyonuyla gerçek bir uzun yol otomobili. Yalnız performans beklentinizi düşük tutun.',
      },
      {
        car: 'bmw-3-serisi-2026',
        text: 'F30’a göre biraz daha “normal” bir otomobil olsa da arkadan itişi, net direksiyonu ve kusursuz şanzımanıyla sürüş keyfi arayanlar için sınıfının hâlâ en mantıklı sedanı.',
      },
      {
        car: 'mercedes-benz-c-serisi-2026',
        text: 'Mini S-Serisi etkisi yaratan kabini ve gece ayrı bir şov sunan ambiyansıyla sınıfının en lüks hissettiren sedanı; ön takım ve ekran sorunlarını bilerek alınmalı.',
      },
    ],
  },
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
