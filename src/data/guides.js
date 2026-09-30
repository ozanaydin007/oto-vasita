// ---------------------------------------------------------------------------
// REHBER YAZILARI
// Yeni bir rehber eklemek için GUIDES listesine bir blok ekleyin.
// - slug: adres (/rehber/<slug>)
// - items: listeli yazılarda sıralama; car = cars.js'teki aracın adresi (slug)
// - sections: serbest metin bölümleri (başlık + paragraflar)
// Yazılar da yayın sırasında hazır HTML olarak üretilir ve site haritasına eklenir.
// ---------------------------------------------------------------------------
export const GUIDES = [
  {
    slug: 'en-az-yakan-10-otomobil',
    title: 'En Az Yakan 10 Otomobil',
    subtitle: 'İçten yanmalı motorlu (benzinli, dizel ve hibrit) otomobiller arasında yakıt tüketiminde öne çıkanlar',
    description:
      'Türkiye’de bulabileceğiniz en az yakan 10 otomobil: dizel ve hibrit modeller arasında gerçek kullanım tüketimine göre sıraladık. Liste yalnızca içten yanmalı motorlu araçları kapsıyor.',
    date: '2026-09-30',
    dateLabel: '30 Eylül 2026',
    intro: [
      'Akaryakıt fiyatları her ay bütçeyi biraz daha zorlarken, otomobil seçerken en çok sorulan soru değişmiyor: “Hangisi daha az yakar?” Bu rehberde, sitemizde incelediğimiz otomobiller arasından yakıt tüketiminde en başarılı 10 modeli sıraladık.',
      'Liste yalnızca içten yanmalı motorlu otomobilleri, yani benzinli, dizel ve hibrit modelleri kapsıyor. Hibritler de sonuçta yakıt yakan bir motorla çalıştığı için listede yer alıyor. Tamamen elektrikli otomobiller ise yakıt değil elektrik tükettiği için bu karşılaştırmanın dışında tutuldu.',
    ],
    method:
      'Sıralamayı, incelemelerimizdeki tüketim puanına göre yaptık. Bu puan yalnızca katalog değerine değil, otomobilin şehir içi, otoyol ve karma kullanımda gerçekte ne kadar yaktığına dair değerlendirmemize dayanıyor. Katalog değerlerini her aracın yanında ayrıca belirttik. 2018 öncesi modellerin katalog değerleri eski NEDC ölçüm yöntemiyle, daha yeni modellerinki ise daha gerçekçi WLTP yöntemiyle belirlendiği için katalog rakamlarını birbiriyle doğrudan kıyaslamak yanıltıcı olabilir.',
    items: [
      {
        car: 'opel-corsa-2021',
        text: 'Listenin zirvesinde Opel Corsa’nın 1.5 dizel versiyonu var. 102 beygirlik motor, hafif gövdeyle birleşince hem şehir içinde hem uzun yolda depoyu neredeyse hiç boşaltmıyor. Bu otomobili kullanırken yakıt almayı gerçekten unutabiliyorsunuz. Manuel şanzıman ve sade Edition donanımı da tüketimi düşük tutmaya yardımcı oluyor. Çok kilometre yapan ve yakıt masrafını en aza indirmek isteyenler için ikinci el piyasasının en akıllı seçimlerinden.',
      },
      {
        car: 'toyota-yaris-hybrid-2022',
        text: 'Yaris Hybrid, şehir içinde zamanının büyük bölümünü elektrik motoruyla geçirerek benzinli bir şehir otomobilinin yarısı kadar yakabiliyor. Dur-kalk trafikte tüketimin düşmesi, onu özellikle büyük şehirlerde yaşayanlar için rakipsiz kılıyor. Toyota’nın hibrit sistemindeki dayanıklılığı da uzun vadede ekstra bir güvence.',
      },
      {
        car: 'toyota-yaris-cross-2023',
        text: 'Yaris’in hibrit sistemini daha yüksek bir SUV gövdesine taşıyan Yaris Cross, bu sınıfta tüketimi en düşük araçlardan. Daha büyük gövdesine rağmen tüketimde Yaris’ten çok az geride kalıyor. SUV isteyip yakıt masrafından ödün vermek istemeyenler için ideal.',
      },
      {
        car: 'toyota-corolla-hybrid-2026',
        text: 'Türkiye’nin en sevilen sedanlarından Corolla, 1.8 hibrit motoruyla kompakt sınıfın tüketim lideri. Geniş bagajı ve aile boyutlarına rağmen şehir içinde küçük bir otomobil kadar yakıyor. Aynı motoru kullanan Corolla Hatchback de tüketimde neredeyse aynı sonuçları veriyor.',
      },
      {
        car: 'renault-clio-e-tech-2023',
        text: 'Clio E-Tech, Renault’nun kendine özgü tam hibrit sistemiyle Toyota’ya en güçlü rakiplerden biri oldu. 145 beygirlik sistem hem canlı hem de şehir içinde çok ekonomik. Şık tasarımını düşük tüketimle birleştirmek isteyenler için güzel bir alternatif.',
      },
      {
        car: 'kia-niro-2023',
        text: 'Niro, hibrit sistemini klasik bir çift kavramalı şanzımanla birleştirdiği için hibritlerde sık görülen “uğultulu” hızlanma hissini yaşatmıyor. Geniş kabiniyle aileler için hem pratik hem de çok ekonomik bir seçenek.',
      },
      {
        car: 'toyota-c-hr-2021',
        text: 'Sakarya’da üretilen birinci nesil C-HR, cesur tasarımını 1.8 hibrit motorun düşük tüketimiyle birleştiriyor. Bagajı küçük olsa da, yakıt masrafı ve güvenilirlik konusunda ikinci elde en güvenli seçeneklerden biri.',
      },
      {
        car: 'mercedes-benz-c-serisi-2015',
        text: 'Listenin tek premium dizeli, Türkiye’ye özel 1.6 dizel motorlu C 200 d. Otoyol hızlarında son derece düşük tüketimi, Mercedes konforuyla birleştiriyor. İkinci elde premium bir sedan isteyip yakıt masrafını düşük tutmak isteyenler için akıllıca bir tercih.',
      },
      {
        car: 'lexus-es-2022',
        text: 'Büyük bir premium sedan için şaşırtıcı derecede az yakan ES 300h, 2.5 litrelik hibrit motoruyla şehir içinde bile makul tüketim değerlerinde kalıyor. Sessizliği ve konforuyla uzun yolların en rahat seçeneklerinden.',
      },
      {
        car: 'honda-hr-v-2023',
        text: 'HR-V’nin e:HEV hibrit sistemi, şehir içinde çoğunlukla elektrikli bir otomobil gibi çalışıyor ve tüketimi düşük tutuyor. Esnek Magic Seat koltukları ve Honda güvenilirliğiyle listeyi tamamlıyor.',
      },
    ],
    sections: [
      {
        title: 'Yakıt tüketimini düşürmenin 5 yolu',
        list: [
          'Lastik basınçlarını ayda bir kontrol edin; düşük basınç tüketimi belirgin şekilde artırır.',
          'Ani hızlanma ve sert frenlemelerden kaçının; trafiği önceden okuyarak akıcı sürün.',
          'Otoyolda hızınızı sabit tutun; 90 ile 120 km/s arasındaki fark tüketimde ciddi fark yaratır.',
          'Bagajda ve tavan portbagajında gereksiz yük taşımayın.',
          'Periyodik bakımları aksatmayın; kirli hava filtresi ve eski yağ tüketimi yükseltir.',
        ],
      },
      {
        title: 'Hangisini seçmeli?',
        paragraphs: [
          'Çok kilometre yapıyor ve ağırlıklı olarak otoyol kullanıyorsanız dizel motorlu Corsa veya C 200 d gibi modeller öne çıkıyor. Şehir içinde dur-kalk trafikte daha çok vakit geçiriyorsanız Toyota, Renault ve Honda’nın tam hibrit modelleri çok daha avantajlı.',
        ],
      },
    ],
  },
];

export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug);
}
