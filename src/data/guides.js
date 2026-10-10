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
    stats: ['tuketimSpec', 'tuketimPuan', 'yakit'],
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
  {
    slug: 'kronik-sorunu-bilinen-motorlar',
    title: 'Almadan Önce Bilin: Kronik Sorunu Bilinen Motorlar',
    subtitle: 'PureTech kayışından BMW zincirlerine, DPF’den LPG dönüşümüne kadar ikinci el alırken dikkat etmeniz gereken motorlar',
    description:
      'İkinci el otomobil almadan önce bilmeniz gereken kronik motor sorunları: 1.2 PureTech kayışı, 1.5 eTSI 48V aküsü, BMW N13, N20, N47 ve N54, 2.0 TDI PD, dizel DPF ve LPG dönüşümlü atmosferik motorlar.',
    date: '2026-10-01',
    dateLabel: '1 Ekim 2026',
    intro: [
      'Bir otomobilin ikinci el fiyatı cazip görünebilir; ama yanlış motoru seçerseniz o fiyat avantajı ilk büyük tamirde buharlaşır. Bu rehberde, Türkiye’de ikinci el piyasasında sık karşılaşılan ve kronik sorunlarıyla bilinen motorları bir araya getirdik.',
      'Bu motorlara sahip her otomobil arızalı demek değildir. Bakımı zamanında yapılmış, geçmişi belli bir örnek yıllarca sorunsuz kullanılabilir. Amacımız sizi korkutmak değil, neye bakmanız gerektiğini bilerek pazarlığa oturmanızı sağlamak.',
    ],
    sections: [
      {
        title: '1. 1.2 PureTech (Peugeot, Citroën, Opel): yağ içinde çalışan triger kayışı',
        paragraphs: [
          'Stellantis’in 1.2 litrelik üç silindirli turbo PureTech motoru performansıyla çok beğeniliyor; ancak triger kayışı motor yağının içinde çalışıyor. Zamanla kayış dağılıp parçacıklar yağ emiş süzgecini tıkayabiliyor; bu da yağ basıncı kaybına ve en kötü durumda motor hasarına yol açabiliyor. Yüksek yağ tüketimi de bu motorun bilinen sorunları arasında.',
          'Bizim önerimiz kayışı üreticinin önerdiği aralığı beklemeden, yaklaşık 50 bin kilometrede bir, hatta daha kısa sürede değiştirmek. Yeni nesil 1.2 Hybrid (136/145 bg) versiyonlarda kayış yerine zincir kullanılıyor.',
        ],
        list: [
          'Kayış değişim faturasını mutlaka isteyin; faturası olmayan aracı değiştirilmemiş kabul edin.',
          'Ekspertizde yağ basıncı uyarısı ve kayış durumu kontrol ettirilmeli.',
          'Yağ seviyesi iki bakım arasında belirgin şekilde düşüyorsa dikkat edin.',
        ],
        cars: ['opel-corsa-2020', 'peugeot-208-2023', 'peugeot-2008-2021'],
      },
      {
        title: '2. VW Grubu 1.5 eTSI: 48V akü, DQ200 ve kalkışta sarma',
        paragraphs: [
          'Golf, Leon, Octavia ve A3 gibi modellerde kullanılan 1.5 eTSI hafif hibrit motor güçlü ve verimli; ancak üç bilinen sorunu var. Hafif hibrit sistemin 48V aküsünde arızalar görülebiliyor, kompakt modellerde eşleştiği kuru kavramalı DQ200 şanzıman ve vites kolu kronik sorunlar arasında. Ayrıca düşük devirlerdeki tork karakteristiği nedeniyle düz yolda kalkışta bile sarma yaşanabiliyor.',
          'Bu arızaların kalıcı bir çözümü pek yok ve ne zaman ortaya çıkacakları belirsiz. Tiguan, Kodiaq gibi büyük modellerde ise daha dayanıklı DQ381 şanzıman kullanılıyor.',
        ],
        list: [
          'Garantisi devam eden bir örnek ya da uzatılmış garanti tercih edin.',
          'Test sürüşünde trafikte dur-kalk yapıp kalkış karakterini mutlaka deneyin.',
          'Servis kayıtlarında 48V akü veya şanzıman işlemi olup olmadığına bakın.',
        ],
        cars: ['volkswagen-golf-2026', 'cupra-leon-2024', 'audi-a3-sportback-2024', 'seat-leon-2021'],
      },
      {
        title: '3. BMW N13 (1.6 turbo benzin): zincir ve soğuk çalıştırma sesleri',
        paragraphs: [
          'Yaklaşık 2011–2016 yılları arasında 1 Serisi (F20) ve 3 Serisi (F30) gibi modellerin 1.6 litrelik benzinli versiyonlarında kullanılan N13 motorun en bilinen sorunu triger zinciri ve zincir gerdirme/kızak parçaları. Soğuk çalıştırmada birkaç saniyelik metalik zincir sesi en önemli işaret. Yağ kaçakları ve yüksek basınç yakıt pompası da dikkat edilmesi gereken noktalar arasında.',
        ],
        list: [
          'Aracı motor soğukken çalıştırın ve ilk saniyelerdeki sesi dinleyin.',
          'Zincir setinin değiştirilip değiştirilmediğini servis kayıtlarından sorun.',
          'Yağ değişim aralığı uzatılmış (15–20 bin km üstü) araçlarda risk artıyor.',
        ],
        cars: ['bmw-3-serisi-2013'],
      },
      {
        title: '4. BMW N20 (2.0 turbo benzin): zincir kızakları',
        paragraphs: [
          'Yaklaşık 2011–2016 arasında 320i, 328i, 520i, X1 ve X3 gibi pek çok BMW’de kullanılan N20, güçlü ve keyifli bir motor; ancak triger zincirinin plastik kızakları zamanla aşınabiliyor. Zincir sesi ihmal edilirse zincir atlayabilir ve motor ciddi hasar görebilir. Zincir motorun arka tarafında olduğu için tamir işçiliği de yüksek.',
        ],
        list: [
          'Soğuk çalıştırmada ve rölantide motorun arka tarafından gelen metalik sese dikkat edin.',
          'Zincir seti güncellenmiş parçalarla değiştirildiyse bu büyük bir artı.',
          'Kısa yağ değişim aralığı bu motorun ömrünü uzatıyor.',
        ],
        cars: ['bmw-3-serisi-2012', 'bmw-5-serisi-2012'],
      },
      {
        title: '5. BMW N47 (2.0 dizel): kopan triger zinciri',
        paragraphs: [
          'Yaklaşık 2007–2014 yılları arasında 118d, 120d, 318d, 320d, 520d ve X3 20d gibi modellerde kullanılan N47 dizel motorun en büyük sorunu triger zincirinin uzaması ve kopması. Zincir motorun arkasında, şanzıman tarafında olduğu için tamiri çok sıkıntılı: çoğu durumda motorun indirilmesi gerekiyor ve masraf ciddi boyutlara ulaşabiliyor. Zincir koparsa motor büyük hasar görebiliyor.',
        ],
        list: [
          'Rölantide ve düşük devirde motorun arkasından gelen tıkırtı ve sürtünme sesi en önemli uyarı işaretidir.',
          'Zincir değişimi yapılmış örnekler ciddi bir avantaj; faturasını mutlaka isteyin.',
          'Ekspertizde zincir sesi için kulak verilmesini özellikle isteyin.',
        ],
      },
      {
        title: '6. BMW N54 (3.0 çift turbo benzin): yakıt pompası ve enjektörler',
        paragraphs: [
          '335i, 135i ve 535i gibi modellerde kullanılan çift turbolu N54, yüksek güç potansiyeliyle efsaneleşmiş bir motor. Ancak yüksek basınçlı yakıt pompası (HPFP) ve piezo enjektör arızaları en bilinen sorunları. Pompa arızasında motor güç kaybeder ve arıza moduna geçebilir; enjektör kaçakları tekleme ve sarsıntıya yol açar. Turbo atık kapısı (wastegate) sesleri ve su pompası da dikkat edilmesi gereken noktalar.',
        ],
        list: [
          'Soğuk çalıştırmada ve ilk kalkışta tekleme veya sarsıntı olup olmadığına bakın.',
          'Pompa ve enjektörlerin güncel revizyonlarla değiştirilip değiştirilmediğini sorun.',
          'Yazılımla güç artırılmış örneklerde motor ve turbo durumunu ayrıca kontrol ettirin.',
        ],
      },
      {
        title: '7. VW 2.0 TDI PD (2005–2008, BKP kodlu): enjektörler ve yağ pompası mili',
        paragraphs: [
          'Özellikle Passat B6 gibi modellerde kullanılan pompa-enjektörlü (PD) 2.0 TDI motorlarda iki bilinen sorun öne çıkıyor. Birincisi pompa-enjektör ünitelerinin arızalanması; tekleme, zor çalışma ve duman bu sorunun işaretleri. İkincisi ve daha tehlikelisi, yağ pompasını döndüren altıgen milin aşınması. Mil aşındığında yağ basıncı aniden düşebiliyor ve motor kısa sürede ciddi hasar görebiliyor.',
        ],
        list: [
          'Yağ pompası tahrik milinin güncellenmiş parçayla değiştirilip değiştirilmediğini sorun.',
          'Yağ basıncı uyarı ışığı hiç yandıysa aracı almadan önce iki kez düşünün.',
          'Enjektör değişim geçmişi olan araçlar daha güvenli bir tercih.',
        ],
      },
      {
        title: '8. Dizel motorlarda DPF (partikül filtresi)',
        paragraphs: [
          'Modern dizellerin neredeyse tamamında bulunan DPF, egzozdaki is partiküllerini tutar ve belirli aralıklarla yakarak kendini temizler. Bu temizlik (rejenerasyon) için motorun bir süre yüksek sıcaklıkta çalışması gerekir. Araç ağırlıklı olarak kısa mesafeli şehir içi kullanımda kalırsa DPF tıkanabilir; temizlik veya değişim masrafı çıkabilir.',
          'Şehir içinde günde birkaç kilometre kullanacaksanız dizel yerine benzinli ya da hibrit bir otomobil çok daha mantıklı olabilir.',
        ],
        list: [
          'Gösterge panelinde DPF uyarısı olup olmadığına ve ekspertizde DPF doluluk değerine bakın.',
          'DPF’si iptal edilmiş araçlardan uzak durun; muayeneden geçemeyebilir.',
          'Düzenli uzun yol yapılan dizeller DPF açısından çok daha sağlıklıdır.',
        ],
        cars: ['bmw-1-serisi-2016', 'volvo-v40-2015', 'opel-corsa-2021', 'mercedes-benz-c-serisi-2015'],
      },
      {
        title: '9. LPG dönüşümlü atmosferik motorlar (1.6 MPI / VVT)',
        paragraphs: [
          'Türkiye’de yakıt masrafını düşürmenin en yaygın yolu LPG dönüşümü. 1.6 MPI ve VVT gibi atmosferik motorlar LPG’ye genel olarak uygun olsa da, LPG benzine göre daha yüksek sıcaklıkta yandığı ve yağlayıcı etkisi olmadığı için en büyük risk supaplar ve supap yuvaları. Zamanla supap boşluklarında değişim, kompresyon kaybı ve supap yanması görülebiliyor.',
          'Kaliteli bir LPG kiti, doğru ayar ve düzenli supap ayarı bu riskleri büyük ölçüde azaltıyor. Fabrika çıkışlı LPG’li modellerde (ör. Dacia Eco-G) motor bu kullanım için baştan tasarlandığı için risk daha düşük.',
        ],
        list: [
          'Ekspertizde kompresyon testi yaptırın; silindirler arasında büyük fark kötü bir işaret.',
          'LPG kitinin markası, montaj tarihi ve ruhsata işlenip işlenmediğini kontrol edin.',
          'Supap ayarı ve LPG bakım faturası olan araçları tercih edin.',
        ],
        cars: ['hyundai-accent-era-2008', 'hyundai-getz-2009', 'dacia-logan-2026'],
      },
      {
        title: 'Son söz',
        paragraphs: [
          'Hangi otomobili alırsanız alın, bağımsız bir ekspertiz raporu, eksiksiz servis geçmişi ve tramer kaydı en büyük güvenceniz. Bu rehberdeki motorlara sahip bir otomobili düşünüyorsanız, ilgili kronik sorunların giderilip giderilmediğini belgelerle sorgulamak hem sizi büyük masraflardan korur hem de pazarlıkta elinizi güçlendirir.',
        ],
      },
    ],
  },
  {
    slug: 'aileler-icin-en-iyi-10-suv',
    stats: ['bagaj', 'guvenlik', 'konfor'],
    title: 'Aileler İçin En İyi 10 SUV',
    subtitle: 'Güvenlik, konfor, bagaj hacmi ve uzun vadeli maliyetler açısından ailelere en uygun SUV’lar',
    description:
      'Aileler için en iyi 10 SUV: güvenlik, konfor, bagaj hacmi, güvenilirlik ve işletme maliyetlerine göre Türkiye’de bulabileceğiniz en iyi aile SUV’larını sıraladık. 7 koltuklu seçenekler dahil.',
    date: '2026-10-01',
    dateLabel: '1 Ekim 2026',
    intro: [
      'Aile için otomobil seçerken öncelikler değişir: çocuk koltuklarının rahatça sığdığı bir arka koltuk, tatil bavullarını yutan bir bagaj, uzun yolda kimseyi yormayan bir konfor ve elbette en üst seviyede güvenlik. Bu rehberde aile SUV’ları arasından bu ihtiyaçları en iyi karşılayan 10 modeli seçtik.',
      'Listede hem sıfır hem de ikinci elde bulabileceğiniz modeller var. Kalabalık aileler için 7 koltuk seçeneği sunan modelleri ayrıca belirttik.',
    ],
    method:
      'Sıralamayı genel puandan farklı, ailelere özel bir hesapla yaptık. Güvenlik ve konfor puanlarına en yüksek ağırlığı verdik; bunları bagaj hacmi, güvenilirlik, fiyat/değer, tüketim ve ikinci el puanlarıyla birleştirdik. Bu yüzden listedeki sıra, sitemizdeki genel puan sırasından farklı olabilir. Aynı modelin farklı yıllarını tek bir sırada değerlendirdik.',
    items: [
      { car: 'toyota-rav4-2022', text: 'Listenin zirvesinde RAV4 Hybrid var. Geniş kabini, 580 litrelik bagajı ve büyük gövdesine rağmen düşük tüketimiyle aile bütçesini koruyor. Toyota’nın hibrit sistemi yıllarca dert çıkarmadan çalıştığı için “aileyi yolda bırakmayan otomobil” tanımına en çok yakışan model. İkinci elde de değerini çok iyi koruyor.' },
      { car: 'kia-sportage-2023', text: 'Hibrit Sportage güçlü motoru, geniş arka koltuğu ve uzun garantisiyle ailelerin gözdesi. Kavisli çift ekranlı kabini çocuklardan büyüklere herkesin hoşuna gidiyor. Güvenlik donanımı da sınıfının en kapsamlılarından.' },
      { car: 'honda-cr-v-2020', text: 'CR-V, pratikliğin ve dayanıklılığın SUV hâli. Arka kapıları neredeyse dik açıyla açılıyor; çocuk koltuğu takmak ve çocukları yerleştirmek bu sayede çok kolay. Dört çeker ve Honda güvenilirliği uzun yıllar sorunsuz kullanım vaat ediyor.' },
      { car: 'hyundai-tucson-2026', text: 'Tucson 620 litrelik bagajı, zengin donanımı ve cesur tasarımıyla ailelere çok şey sunuyor. Arka yolcular için ayrı klima çıkışları ve USB girişleri uzun yolculukları kolaylaştırıyor. Fiyat/donanım dengesi de sınıfının en iyilerinden.' },
      { car: 'kia-sorento-2022', text: 'Kalabalık aileler için listenin en mantıklı seçeneklerinden biri. 7 koltuklu Sorento, hibrit motoru sayesinde büyük gövdesine göre makul yakıyor; geniş kabini ve zengin donanımıyla uzun yollarda gerçek bir aile otobüsü konforu sunuyor.' },
      { car: 'skoda-kodiaq-2026', text: 'Kodiaq alanda neredeyse rakipsiz: 5 koltuklu hâlde 845 litreye varan bagajı ve 7 koltuk seçeneğiyle kalabalık ailelerin yükünü rahatça taşıyor. Sessiz kabini ve konforlu süspansiyonu uzun yolları kısaltıyor. Skoda’nın şemsiye, buz kazıyıcı gibi akıllı detayları da günlük hayatı kolaylaştırıyor.' },
      { car: 'mercedes-benz-glb-2020', text: 'Premium bir aile SUV’u arıyorsanız GLB çok mantıklı bir tercih. Kutu gibi gövdesi sayesinde kabini sınıfına göre çok geniş; 7 koltuk seçeneği de sunuyor. Mercedes’in güvenlik sistemleri ve MBUX teknolojisi ailenin her üyesine hitap ediyor.' },
      { car: 'volkswagen-tiguan-2026', text: 'Yeni Tiguan sessiz kabini, 652 litrelik bagajı ve olgun sürüşüyle uzun yolların en rahat SUV’larından. Fiyatı yüksek olsa da ikinci elde değerini çok iyi koruması bu farkı bir ölçüde telafi ediyor.' },
      { car: 'citroen-c5-aircross-2022', text: 'Konforu her şeyin önüne koyan aileler için C5 Aircross’un süspansiyonu sınıfının en yumuşağı. Arkadaki üç ayrı kayar ve katlanır koltuk, üç çocuk koltuğunu yan yana takmak isteyen aileler için büyük avantaj. Ekonomik dizel motoruyla uzun yolda da cebi yormuyor.' },
      { car: 'peugeot-5008-2024', text: 'Yeni 5008, 7 koltuğu ve 5 koltuklu hâlde 900 litreyi aşan dev bagajıyla listenin en geniş SUV’larından. Etkileyici panoramik ekranlı kabini de ailenin teknoloji meraklılarını memnun edecek. Motoru dolu araçta biraz zorlansa da alan arayan kalabalık aileler için çok güçlü bir seçenek.' },
    ],
    sections: [
      {
        title: 'Aile SUV’u alırken nelere dikkat etmeli?',
        list: [
          'Çocuk koltuğu kullanacaksanız ISOFIX bağlantılarının sayısına ve arka kapıların açılma açısına bakın.',
          'Bagaj hacmini katalogdan değil, kendi bebek arabanızı ve bavullarınızı koyarak test edin.',
          '7 koltuk gerçekten gerekli mi düşünün; üçüncü sıra çoğu modelde yalnızca çocuklar için uygun.',
          'Euro NCAP sonuçlarına ve özellikle çocuk yolcu koruma puanına göz atın.',
          'Yıllık kilometrenizi hesaplayın: şehir içi ağırlıklı kullanımda hibrit, uzun yolda dizel daha ekonomik olabilir.',
        ],
      },
      {
        title: 'Bütçeniz daha yüksekse',
        paragraphs: [
          'Premium segmente bakıyorsanız Volvo XC90 üst düzey güvenliği ve 7 koltuklu zarif kabiniyle, BMW X5 ise sürüş keyfi ve konforuyla ailelere hitap eden güçlü alternatifler.',
        ],
        cars: ['volvo-xc90-2023', 'bmw-x5-2020'],
      },
    ],
  },
  {
    slug: 'ilk-otomobil-icin-en-ucuz-10-secenek',
    stats: ['fiyat', 'guvenlik', 'guvenilirlik'],
    title: 'İlk Otomobil İçin En Ucuz 10 Seçenek',
    subtitle: 'Sıfır kilometre otomobiller arasında en uygun fiyatlı 10 model ve ilk otomobil alırken bilmeniz gerekenler',
    description:
      'İlk otomobil için en ucuz 10 seçenek: Türkiye’de satılan en uygun fiyatlı sıfır otomobilleri liste fiyatına göre sıraladık; güvenlik, güvenilirlik ve ikinci el değerleriyle birlikte değerlendirdik.',
    date: '2026-10-01',
    dateLabel: '1 Ekim 2026',
    intro: [
      'İlk otomobil heyecan verici ama bütçe genellikle sınırlı. Bu rehberde Türkiye’de satılan en uygun fiyatlı sıfır otomobilleri liste fiyatına göre, ucuzdan pahalıya sıraladık. Her birinin güvenlik, güvenilirlik ve ikinci el durumunu da belirttik; çünkü ilk otomobilde yalnızca satın alma fiyatı değil, birkaç yıl sonra ne kadara satabileceğiniz de önemli.',
      'Elektrikli modeller bu listeye dahil değil. Fiyatlar Eylül 2026 tavsiye edilen anahtar teslim liste fiyatlarıdır; güncel fiyat ve kampanyalar için yetkili satıcıya danışın.',
    ],
    method:
      'Sıralama yalnızca liste fiyatına göre yapıldı: en ucuz model ilk sırada. Bu yüzden en ucuz olan her zaman en iyi seçenek olmayabilir; her aracın açıklamasında güçlü ve zayıf yönlerini dürüstçe belirttik.',
    items: [
      { car: 'dacia-sandero-2026', text: 'Türkiye’nin en uygun fiyatlı sıfır otomobillerinden Sandero, geniş kabini ve ucuz bakımıyla ilk otomobil için mantıklı bir başlangıç. Yalnız dürüst olmak gerekirse güvenlik puanı listedeki rakiplerinin gerisinde; bu konuyu önemsiyorsanız birkaç basamak yukarıya bakmanızı öneririz.' },
      { car: 'dacia-logan-2026', text: 'Sedan isteyenler için en ucuz seçeneklerden Logan, fabrika çıkışlı LPG’li versiyonuyla yakıt masrafını da en aza indiriyor. Geniş bagajı pratik; ancak Sandero gibi güvenlik donanımı sınırlı.' },
      { car: 'renault-clio-2026', text: 'Bize göre bu listenin en dengeli seçeneği Clio. Bursa üretimi, şık tasarımı, geniş bagajı ve yüksek güvenlik seviyesiyle fiyatının çok üzerinde bir paket sunuyor. İkinci elde de çok hızlı satılıyor; ilk otomobil için gönül rahatlığıyla önerebiliriz.' },
      { car: 'opel-corsa-2026', text: 'Hafif hibrit motoruyla hem canlı hem ekonomik Corsa, sürmeyi seven gençler için güzel bir seçenek. Klasik ve kolay anlaşılır gösterge düzeni de yeni sürücülerin işini kolaylaştırıyor.' },
      { car: 'seat-ibiza-2026', text: 'Volkswagen altyapısını genç bir karakterle sunan Ibiza, güçlü motoru ve keyifli yol tutuşuyla dinamik bir ilk otomobil. Güvenlik seviyesi de sınıfının iyilerinden.' },
      { car: 'skoda-fabia-2026', text: 'Fabia mantığın otomobili: sınıfının en geniş kabinlerinden biri, 380 litrelik bagaj, iyi güvenlik ve sorunsuz mekanik. Gösterişli değil ama ilk otomobil için çok güvenli bir tercih.' },
      { car: 'skoda-scala-2026', text: 'Scala, şehir otomobili fiyatına neredeyse bir aile otomobili alanı sunuyor. Daha büyük bir otomobil isteyen ama bütçesi kısıtlı olanlar için listenin en akıllıca seçeneklerinden; güvenlik puanı da listenin en yükseklerinden.' },
      { car: 'fiat-egea-cross-2026', text: 'Crossover görünümü, dizel motoru ve otomatik şanzımanı bu fiyata sunan Egea Cross, ikinci elde de çok kolay satılıyor. Ancak eskimiş platformu nedeniyle güvenlik tarafında rakiplerinin gerisinde kalıyor.' },
      { car: 'hyundai-i20-2026', text: 'İzmit üretimi i20, geniş kabini, zengin donanımı ve güçlü ikinci el talebiyle ilk otomobil için çok mantıklı. Hyundai’nin uzun garantisi ve güvenilir mekaniği de ekstra bir güvence.' },
      { car: 'kia-ceed-2026', text: 'Listeyi Ceed tamamlıyor: bir üst sınıf kompakt hatchback’i şehir otomobili fiyatına yakın bir bütçeyle almak mümkün. Güçlü motoru, olgun sürüşü ve uzun garantisiyle büyümek isteyen ilk otomobil sahipleri için ideal.' },
    ],
    sections: [
      {
        title: 'İkinci elde daha ucuz alternatifler',
        paragraphs: [
          'Bütçeniz sıfır bir otomobile yetmiyorsa ikinci el piyasasında ilk otomobil için çok mantıklı seçenekler var. Yakıt cimrisi Opel Corsa 1.5 dizel, sorunsuz Toyota Yaris Hybrid, pratik Honda Jazz ve ekonomik Renault Clio dizel bunların başında geliyor.',
        ],
        cars: ['opel-corsa-2021', 'toyota-yaris-hybrid-2022', 'honda-jazz-2019', 'renault-clio-2016', 'volkswagen-polo-2020'],
      },
      {
        title: 'İlk otomobil alırken bilmeniz gerekenler',
        list: [
          'Genç ve yeni ehliyetli sürücüler için kasko ve trafik sigortası primleri yüksek olabilir; teklifi otomobili almadan önce alın.',
          'Motor hacmi ve araç değeri yıllık MTV tutarını doğrudan etkiliyor; satın almadan önce hesaplayın.',
          'İkinci el alıyorsanız bağımsız ekspertiz, tramer kaydı ve servis geçmişi olmazsa olmaz.',
          'Bakım ve parça fiyatları yaygın markalarda çok daha uygun; ilk otomobilde bu büyük avantaj.',
          'Birkaç yıl sonra satacağınızı düşünerek ikinci el değerini koruyan modelleri tercih edin.',
        ],
      },
    ],
  },
  {
    slug: 'elektrikli-otomobil-almadan-once-bilinmesi-gerekenler',
    title: 'Elektrikli Otomobil Almadan Önce Bilinmesi Gerekenler',
    subtitle: 'Menzil, şarj, ÖTV avantajı, ikinci el değeri ve batarya sağlığı: elektrikliye geçmeden önce aklınızda olması gereken her şey',
    description:
      'Elektrikli otomobil almadan önce bilmeniz gerekenler: gerçek menzil ile katalog menzili farkı, AC ve DC şarj, evde şarj imkânı, ÖTV avantajı, ikinci el değer kaybı ve batarya sağlığı.',
    date: '2026-10-03',
    dateLabel: '3 Ekim 2026',
    intro: [
      'Elektrikli otomobiller Türkiye’de her yıl daha fazla satılıyor. Sessiz ve akıcı sürüşleri, düşük kilometre başı maliyetleri ve ÖTV avantajıyla gerçekten cazipler. Ancak içten yanmalı bir otomobilden elektrikliye geçmek, yalnızca yakıt türünü değiştirmek değil; kullanım alışkanlıklarınızı da değiştirmek anlamına geliyor.',
      'Bu rehberde, elektrikli bir otomobil almadan önce dikkat etmeniz gereken konuları bir araya getirdik. Amacımız sizi vazgeçirmek değil, doğru elektrikliyi doğru beklentiyle almanızı sağlamak.',
    ],
    sections: [
      {
        title: '1. Menzil: katalog değeri her zaman gerçek değildir',
        paragraphs: [
          'Elektrikli otomobillerin menzili WLTP adı verilen standart bir test döngüsüyle ölçülüyor. Bu değer otomobilleri birbiriyle karşılaştırmak için faydalı, ama gerçek kullanımda menzil çoğu zaman katalog değerinin altında kalıyor. Bu nedenle otomobil seçerken katalogdaki rakamın yaklaşık yüzde 15–25 altını gerçekçi bir günlük menzil olarak düşünmek en sağlıklısı.',
          'Kendi deneyimimizden bir örnek: Mercedes EQS’nin katalogda 705 km olarak verilen menzili, dikkatli bir sürüşle bizi yollarda yaklaşık 650 km’ye kadar taşıdı. Bu, sınıfının en iyi sonuçlarından biri; çoğu otomobilde fark bundan daha büyük oluyor.',
        ],
        list: [
          'Hız: 120 km/s üzerindeki otoyol hızlarında tüketim hızla artıyor. Özellikle köşeli tasarımlı SUV’larda menzil kaybı çok daha belirgin.',
          'Kış: Soğuk havada batarya verimi düşüyor ve kabin ısıtması enerji tüketiyor. Kışın menzil yaz aylarına göre belirgin şekilde azalabiliyor.',
          'Klima ve ısıtma: Isı pompası (heat pump) bulunan otomobiller kışın çok daha verimli; satın alırken bu donanımı mutlaka sorgulayın.',
          'Sürüş tarzı: Sert hızlanmalar menzili eritir; akıcı sürüş ve rejeneratif frenlemeyi doğru kullanmak menzili belirgin şekilde uzatır.',
          'Lastik ve jant: Büyük jantlar ve sportif lastikler şık görünse de menzili düşürebiliyor.',
        ],
        cars: ['mercedes-benz-eqs-2022', 'volvo-ex40-2024', 'hyundai-ioniq-6-2024'],
      },
      {
        title: '2. Şarj: AC ile DC arasındaki fark',
        paragraphs: [
          'Elektrikli otomobil iki şekilde şarj edilir. AC (alternatif akım) şarj, evde ve iş yerlerindeki yavaş şarj cihazlarında kullanılır; otomobilin içindeki şarj ünitesi akımı dönüştürdüğü için hızı genellikle 7–22 kW arasında sınırlıdır. Bir gecede bataryanın büyük kısmını doldurmak için idealdir.',
          'DC (doğru akım) hızlı şarj ise yol kenarındaki hızlı şarj istasyonlarında kullanılır ve 50 kW’tan 300 kW’ın üzerine kadar çıkabilir. Uzun yolda molalarda kullanılır. Burada otomobilin kabul edebildiği en yüksek şarj gücü belirleyicidir: 800V mimariye sahip otomobiller çok daha hızlı şarj olabiliyor. Örneğin Audi A6 e-tron hızlı şarjda yaklaşık 21 dakikada bataryasının büyük kısmını doldurabiliyor.',
          'Önemli bir detay: Hızlı şarj, bataryanın yaklaşık yüzde 80’ine kadar hızlı ilerler, sonrasında bataryayı korumak için yavaşlar. Bu yüzden uzun yolda yüzde 10–80 arasında şarj etmek en verimli yöntemdir. Katalogdaki şarj süreleri de genellikle bu aralık için verilir.',
        ],
        list: [
          'Otomobilin AC şarj gücünü (ör. 11 kW) ve en yüksek DC şarj gücünü (ör. 150 kW) mutlaka karşılaştırın.',
          'Uzun yol yapacağınız güzergâhlarda hızlı şarj istasyonu yoğunluğunu önceden kontrol edin; şarj ağlarının uygulamaları rota planlamada çok işe yarar.',
          'DC hızlı şarj, evde AC şarja göre kWh başına belirgin şekilde daha pahalıdır; sürekli hızlı şarjla kullanımda tasarruf azalır.',
        ],
        cars: ['audi-a6-e-tron-sportback-2025', 'hyundai-ioniq-5-2026', 'porsche-taycan-2026'],
      },
      {
        title: '3. Evde şarj imkânınız var mı?',
        paragraphs: [
          'Elektrikli otomobilin en büyük avantajı, “yakıt deposunu” her gece evde doldurabilmeniz. Müstakil bir evde ya da kendi otoparkınızda bir duvar tipi şarj ünitesi (wallbox) kurabiliyorsanız, elektrikli otomobil hem en ucuz hem de en konforlu hâline kavuşur: sabah her gün dolu bir bataryayla yola çıkarsınız.',
          'Apartmanda ya da sitede oturuyorsanız şarj ünitesi kurmak için yönetimin onayı, uygun bir otopark yeri ve elektrik altyapısı gerekebilir. Evde şarj imkânınız yoksa ve otomobili yalnızca halka açık hızlı şarj istasyonlarında şarj edecekseniz, hem maliyet avantajı azalır hem de günlük kullanım çok daha planlı hâle gelir.',
        ],
        list: [
          'Normal ev prizinden şarj mümkündür ama çok yavaştır; günlük kullanım için yetmeyebilir.',
          'Wallbox kurulumunu yetkili bir elektrikçiye yaptırın; elektrik tesisatınızın gücünü önceden kontrol ettirin.',
          'İş yerinizde şarj imkânı varsa bu da evde şarj kadar değerli bir avantajdır.',
        ],
      },
      {
        title: '4. ÖTV avantajı: lüks otomobillere daha uygun fiyatla ulaşmak',
        paragraphs: [
          'Türkiye’de elektrikli otomobillerin ÖTV oranları, benzer fiyat ve performanstaki içten yanmalı otomobillere göre çok daha düşük. Bunun en çarpıcı sonucu şu: içten yanmalı hâliyle çok pahalı olan premium ve lüks modellerin elektrikli versiyonları çok daha ulaşılabilir fiyatlara satılabiliyor. Örneğin elektrikli Porsche Macan, Porsche dünyasına girmenin en uygun yollarından biri hâline geldi; elektrikli Taycan da benzinli Porsche sedanlara göre çok daha uygun fiyatlı.',
          'ÖTV oranları otomobilin fiyatına ve elektrik motorunun gücüne göre kademeli olarak değişiyor. Bu yüzden bazı markalar Türkiye’ye daha düşük vergi diliminde kalan, gücü sınırlandırılmış versiyonlar getiriyor. Bu durum fiyatı düşürse de, kimi zaman otomobilin hak ettiğinden daha zayıf bir motorla gelmesine neden olabiliyor. Ayrıca vergi düzenlemeleri zaman zaman değişebildiği için güncel oranları satın almadan önce mutlaka kontrol edin.',
          'Elektrikli otomobillerin yıllık Motorlu Taşıtlar Vergisi (MTV) de benzer içten yanmalı otomobillere göre daha düşük; bu da uzun vadede ayrı bir tasarruf sağlıyor.',
        ],
        cars: ['porsche-macan-2026', 'porsche-taycan-2026', 'mercedes-benz-eqs-2022'],
      },
      {
        title: '5. İkinci el değer kaybı: içten yanmalılardan daha hızlı',
        paragraphs: [
          'Elektrikli otomobil almadan önce en çok düşünmeniz gereken konulardan biri ikinci el değeri. Elektrikli otomobiller, içten yanmalı otomobillere göre her yıl daha fazla değer kaybediyor ve bu fark yıllar geçtikçe büyüyor. Bunun birkaç nedeni var: batarya teknolojisi çok hızlı gelişiyor ve yeni modeller daha uzun menzil sunuyor; ikinci el alıcılar bataryanın durumundan emin olamıyor; üreticiler sıfır fiyatlarında sık sık indirim ve kampanya yapıyor; vergi düzenlemelerindeki değişiklikler de fiyatları doğrudan etkileyebiliyor.',
          'Bu durumun bir de diğer tarafı var: ikinci el elektrikli otomobil alacaksanız, değer kaybı sizin lehinize çalışıyor. Garantisi devam eden, batarya sağlığı raporu iyi olan temiz bir ikinci el örnek, sıfırına göre çok daha uygun fiyata premium bir elektrikliye sahip olmanın akıllıca bir yolu olabilir.',
        ],
      },
      {
        title: '6. Batarya sağlığı ve garanti',
        paragraphs: [
          'Bataryanın kapasitesi yıllar içinde yavaş yavaş azalır. Bu azalma çoğu otomobilde makul seviyelerde kalsa da, ikinci el alırken batarya sağlık durumunu (SoH) öğrenmek çok önemli. Üreticilerin çoğu bataryaya genellikle 8 yıl veya belirli bir kilometre için ayrı bir garanti veriyor; garanti şartlarını model bazında mutlaka kontrol edin.',
        ],
        list: [
          'İkinci el alırken yetkili servisten batarya sağlık raporu isteyin.',
          'Bataryayı günlük kullanımda yüzde 20–80 arasında tutmak ömrünü uzatır; yüzde 100’e uzun yolculuk öncesinde şarj edin.',
          'Sürekli DC hızlı şarj yerine mümkün olduğunca AC şarj tercih etmek bataryayı daha az yorar.',
          'Batarya garantisinin süresini ve devredilebilir olup olmadığını öğrenin.',
        ],
      },
      {
        title: '7. Bakım, lastik ve sigorta',
        paragraphs: [
          'Elektrikli otomobillerde motor yağı, triger kayışı, buji ya da egzoz yok; bu yüzden periyodik bakım masrafları genellikle daha düşük. Rejeneratif frenleme sayesinde fren balataları da daha uzun ömürlü oluyor.',
          'Öte yandan elektrikli otomobiller bataryaları nedeniyle daha ağır ve anlık torkları çok yüksek; bu da lastiklerin daha hızlı aşınmasına yol açabiliyor. Kasko primleri, batarya ve elektronik parçaların onarım maliyetleri nedeniyle bazı modellerde daha yüksek çıkabiliyor. Satın almadan önce kasko teklifi almanızı öneririz.',
        ],
      },
      {
        title: '8. Yazılım, servis ve günlük kullanım',
        paragraphs: [
          'Elektrikli otomobillerin çoğu internet üzerinden yazılım güncellemesi (OTA) alıyor; bu sayede zamanla yeni özellikler ekleniyor. Ancak yazılımın merkezde olduğu bu otomobillerde ekran donmaları, bağlantı kopmaları gibi sorunlar da yaşanabiliyor. Yetkili servis ağının yaygınlığı da önemli: Togg gibi yerli markalar bu konuda avantajlıyken, bazı markaların servis noktası sayısı sınırlı.',
          'Son olarak, bir elektrikli otomobilin sessizliği ve anında gelen torku içten yanmalı otomobillere alışkın sürücüleri çok şaşırtabiliyor. Satın almadan önce mutlaka uzun bir test sürüşü yapın; mümkünse otomobili birkaç gün kiralayıp kendi günlük rutininizde deneyin.',
        ],
        cars: ['togg-t10x-2026', 'tesla-model-y-2026', 'kia-ev3-2026'],
      },
      {
        title: 'Elektrikli otomobil size uygun mu? Kısa kontrol listesi',
        list: [
          'Evde veya iş yerinde düzenli şarj imkânınız var mı?',
          'Günlük ortalama kaç kilometre yapıyorsunuz ve otomobilin gerçek menzili (katalogdan yüzde 15–25 düşük) buna yetiyor mu?',
          'Sık uzun yol yapıyorsanız güzergâhınızda yeterli hızlı şarj istasyonu var mı?',
          'Otomobili kaç yıl kullanmayı düşünüyorsunuz? Kısa sürede satacaksanız değer kaybını hesaba katın.',
          'Batarya garantisi ne kadar süre ve kaç kilometre için geçerli?',
          'Kışın ısı pompası var mı?',
          'Kasko teklifi ve yıllık MTV tutarını içten yanmalı alternatifle karşılaştırdınız mı?',
        ],
      },
    ],
  },
  {
    slug: 'ikinci-elde-degerini-en-iyi-koruyan-otomobiller',
    stats: ['ikinciel', 'guvenilirlik', 'fiyat'],
    title: 'İkinci Elde Değerini En İyi Koruyan Otomobiller',
    subtitle: 'Satarken en az kaybettiren, en hızlı alıcı bulan otomobiller ve değeri artabilecek, üretimi bitmiş modeller',
    description:
      'İkinci elde değerini en iyi koruyan otomobiller: Türkiye piyasasında en hızlı satılan ve en az değer kaybeden modeller. Ayrıca üretimi bırakılmış ve değeri artma ihtimali olan otomobiller.',
    date: '2026-10-05',
    dateLabel: '5 Ekim 2026',
    intro: [
      'Bir otomobil alırken çoğumuz yalnızca bugünkü fiyata bakıyoruz; oysa otomobilin gerçek maliyetini belirleyen en büyük kalemlerden biri, birkaç yıl sonra satarken ne kadar kaybettiğiniz. İki otomobil aynı fiyata alınsa bile, birinin değer kaybı diğerinin yarısı kadar olabiliyor.',
      'Bu rehberde, ikinci el puanımıza göre Türkiye piyasasında değerini en iyi koruyan, temiz örneği kolay bulunan ve satışa koyduğunuzda hızlı alıcı bulan modelleri sıraladık. Aynı modelin farklı yıllarını tek bir sırada değerlendirdik.',
    ],
    method:
      'Sıralamada incelemelerimizdeki İkinci El puanını kullandık. Bu puan; Türkiye piyasasında değer kaybını, aracın ne kadar hızlı satıldığını ve temiz bir örneğin bulunabilirliğini birlikte değerlendiriyor.',
    items: [
      { car: 'toyota-corolla-hybrid-2026', text: 'Türkiye’de ikinci el denince akla gelen ilk isimlerden biri Corolla. Efsanevi güvenilirliği, düşük tüketimi ve geniş alıcı kitlesi sayesinde satışa koyduğunuz gün telefonunuz susmuyor. Hibrit versiyonlar akaryakıt fiyatları arttıkça daha da aranır hâle geliyor.' },
      { car: 'honda-civic-sedan-2026', text: 'Civic, Türkiye’nin en sevilen sedanlarından biri ve ikinci elde bunu çok net hissettiriyor. Hem sürüş keyfi arayan gençler hem de güvenilirlik arayan aileler tarafından aranması, değer kaybını sınıfının en düşüklerinden biri yapıyor.' },
      { car: 'fiat-egea-sedan-2026', text: 'Egea mükemmel bir otomobil değil; ama ikinci elde satması sabah simit almak kadar kolay. Her bütçeden alıcısı, ucuz parçası ve yaygın servisi sayesinde değerini şaşırtıcı derecede iyi koruyor.' },
      { car: 'toyota-hilux-2023', text: 'Hilux, kırılmaz ünüyle hem iş dünyasının hem de arazi tutkunlarının gözdesi. Yüksek kilometrelerde bile alıcı bulması ve değerini koruması, onu ikinci elde en güvenli yatırımlardan biri yapıyor.' },
      { car: 'bmw-3-serisi-2026', text: 'Premium segmentte değerini en iyi koruyan modellerin başında 3 Serisi geliyor. Türkiye’ye özel vergi avantajlı 1.6 motoru ve güçlü marka imajı, ikinci elde geniş bir alıcı kitlesi yaratıyor.' },
      { car: 'volkswagen-golf-2026', text: 'Golf, Türkiye’de neredeyse her zaman alıcısı olan bir model. Temiz ve bakımlı bir Golf’ü satmak çok kolay; değer kaybı da sınıfının ortalamasının belirgin şekilde altında.' },
      { car: 'volkswagen-passat-2020', text: 'Passat Türkiye’de bir statü sembolü olmaya devam ediyor. Geniş kabini, konforu ve güçlü marka algısı sayesinde ikinci elde çok aranıyor ve değerini sınıfının en iyi koruyan sedanlarından biri.' },
      { car: 'mercedes-benz-c-serisi-2026', text: 'C Serisi, premium sedan arayanların ilk durağı. Mercedes yıldızının ikinci el piyasasındaki gücü sayesinde hem kolay satılıyor hem de değerini iyi koruyor; temiz, bakımlı örnekler özellikle aranıyor.' },
      { car: 'renault-clio-2026', text: 'Listeyi Türkiye’nin en sevilen şehir otomobillerinden Clio tamamlıyor. Bursa üretimi, ucuz bakım ve her yaşa hitap eden yapısı sayesinde ikinci elde çok hızlı alıcı buluyor.' },
    ],
    sections: [
      {
        title: 'Üretimi bitmiş otomobiller: değeri korunabilir, hatta artabilir',
        paragraphs: [
          'İkinci el piyasasında ilginç bir durum var: bazı otomobillerin üretimi sona erdiğinde değerleri düşmek yerine korunabiliyor, hatta zamanla artabiliyor. Özellikle elektrifikasyonla birlikte atmosferik ve büyük hacimli motorlar, manuel şanzımanlar ve saf sürüş odaklı spor otomobiller giderek azalıyor. Yerine yenisi gelmeyen bu otomobiller, tutkunların ve koleksiyoncuların ilgisini çekiyor.',
          'Örneğin atmosferik V10 motoruyla Audi R8 ve Lamborghini Huracán, orta motorlu dört silindirli 718 Cayman, Jaguar’ın son saf spor otomobili F-Type ve 2023’te üretimi biten Audi TT bu açıdan dikkat çekici modeller. Elbette her üretimi biten otomobilin değeri artmıyor; bu potansiyeli taşıyanlar genellikle sınırlı sayıda üretilmiş, karakterli ve sürüş tutkunlarının sevdiği modeller.',
        ],
        list: [
          'Değeri korunabilecek bir örnek arıyorsanız düşük kilometreli, orijinal ve bakım geçmişi belgeli olanları tercih edin.',
          'Modifiye edilmiş veya boyalı parçaları çok olan örnekler bu potansiyeli büyük ölçüde kaybeder.',
          'Bu bir yatırım tavsiyesi değildir; piyasa koşulları değişebilir ve değer artışı garanti değildir.',
        ],
        cars: ['audi-r8-2023', 'lamborghini-huracan-evo-2021', 'porsche-718-cayman-2023', 'jaguar-f-type-2023', 'audi-tt-2007'],
      },
      {
        title: 'Değer kaybını azaltmanın yolları',
        list: [
          'Periyodik bakımları yetkili ya da güvenilir bir serviste yaptırın ve faturalarını saklayın.',
          'Hasar ve boya geçmişini olabildiğince temiz tutun; Türkiye’de tramer kaydı fiyatı doğrudan etkiliyor.',
          'Beyaz, gri, siyah gibi yaygın renkler ikinci elde daha kolay satılıyor.',
          'Yaygın motor ve donanım seçenekleri, nadir versiyonlara göre daha geniş alıcı kitlesine hitap ediyor.',
          'Elektrikli otomobillerin içten yanmalılara göre daha hızlı değer kaybettiğini unutmayın.',
        ],
      },
    ],
  },
  {
    slug: 'arkadan-itisli-ulasilabilir-otomobiller',
    stats: ['surus', 'guvenilirlik', 'ikinciel'],
    title: 'Arkadan İtişli, Ulaşılabilir Otomobiller',
    subtitle: 'Gerçek sürüş keyfini makul bütçelerle yaşatan, arkadan itişli 10 otomobil',
    description:
      'Arkadan itişli, ulaşılabilir otomobiller: BMW 1 Serisi, 3 Serisi, Mazda MX-5, Kia Stinger, Ford Mustang ve daha fazlası. Türkiye’de makul bütçeyle alınabilecek en keyifli arkadan itişli otomobiller.',
    date: '2026-10-05',
    dateLabel: '5 Ekim 2026',
    intro: [
      'Bugün satılan otomobillerin büyük çoğunluğu önden çekişli. Bu, alan ve maliyet açısından mantıklı; ama sürüş keyfi söz konusu olduğunda arkadan itişin yeri başka. Ön tekerlekler yalnızca yön verirken arka tekerleklerin gücü yere aktarması, direksiyona daha saf bir his, virajlarda daha dengeli bir gövde ve gaz pedalıyla otomobili yönlendirebilme keyfi sağlıyor.',
      'Bu rehberde, arkadan itişin keyfini makul bütçelerle, çoğunlukla ikinci el piyasasında yaşayabileceğiniz 10 otomobili topladık. Sıralamayı yaklaşık bütçeye göre, en ulaşılabilir olandan başlayarak yaptık.',
    ],
    method:
      'Listedeki otomobillerin hepsi arkadan itişli. Sıralama bir başarı sıralaması değil; ikinci el piyasasındaki yaklaşık bütçeye göre, en ulaşılabilir olandan başlayarak düzenlendi.',
    items: [
      { car: 'bmw-1-serisi-2016', text: 'Arkadan itişe en uygun fiyatlı giriş kapılarından biri. Kompakt sınıfta neredeyse herkes önden çekişliyken 1 Serisi direksiyonda o dengeli BMW hissini veriyor. Ekonomik dizel motoru günlük kullanımı da kolaylaştırıyor; yalnız DPF ve F kasa BMW’lerdeki iç plastik erimesine dikkat etmek gerekiyor.' },
      { car: 'bmw-2-serisi-coupe-2015', text: '218i Coupé, arkadan itişi şık bir coupé gövdesiyle sunuyor. Motoru ekonomik ve yeterli; asıl keyif şasinin dengesinden geliyor. İkinci elde mantıklı bütçelerle bulunabiliyor.' },
      { car: 'mazda-mx-5-2016', text: 'Arkadan itişin en saf hâli: hafif bir roadster, mükemmel bir manuel şanzıman ve açık tavan. Gücü yüksek değil ama ihtiyacı da yok; MX-5 her virajı bir eğlenceye dönüştürüyor. Güvenilirliği de bonus.' },
      { car: 'bmw-3-serisi-2013', text: 'F30 kasa 320i, arkadan itişli bir sedanın pratikliğini makul bir bütçeyle sunuyor. Ekonomik 1.6 motor günlük kullanımda yeterli; şasi ise sınıfının hâlâ en keyiflilerinden. Bakım geçmişi belli örnekleri tercih edin.' },
      { car: 'mercedes-benz-c-serisi-2015', text: 'Arkadan itişin keyfini konforla birleştirmek isteyenler için C 200 d çok mantıklı. Sportif olmaktan çok rahat bir otomobil; ama arkadan itişli şasinin dengesi uzun yolda da kendini hissettiriyor. Üstelik çok az yakıyor.' },
      { car: 'bmw-3-serisi-2012', text: '328i, performans arayanların arkadan itişli favorisi. 245 beygirlik motoru zaten çok güçlü, potansiyeli bunun da üzerinde. Düşük kilometreli ve bakımlı örneklerden ilerlemek şart.' },
      { car: 'bmw-3-serisi-2019', text: 'G20 kasa 320i, bizim deneyimimize göre ufak modifikasyonlarla bir M otomobilinin seviyesine yaklaşabiliyor; üstelik yarı fiyatına. Standart hâliyle bile sınıfının en keyifli sedanlarından ve bakımı yapıldığında kronik sorunları yok denecek kadar az.' },
      { car: 'kia-stinger-2019', text: 'Stinger, arkadan itişli bir gran turismoyu Avrupalı rakiplerinden çok daha uygun bir bütçeyle sunuyor. Karizmatik tasarımı, güçlü motoru ve geniş bagajıyla hem günlük kullanılabilir hem de keyifli.' },
      { car: 'ford-mustang-2018', text: 'Muscle car ruhunu arkadan itişle birlikte yaşamak isteyenler için Mustang. 2.3 EcoBoost motor şaşırtıcı derecede güçlü; ikonik tasarımı ise her yerde başları çeviriyor.' },
      { car: 'bmw-z4-2020', text: 'Listenin en pahalılarından ama ne olduğunu sorarsanız: çok ama çok başarılı. Rijit kasası, hafif gövdesi, 258 beygirlik motoru ve ZF’nin 8 ileri şanzımanıyla Z4 hem roadster keyfi hem de modern teknoloji sunuyor; yanlama ve drift işlerinde de son derece başarılı.' },
    ],
    sections: [
      {
        title: 'Elektrikli arkadan itişliler',
        paragraphs: [
          'Arkadan itiş yalnızca içten yanmalı otomobillere özgü değil. Birçok elektrikli otomobilin tek motorlu versiyonu arkadan itişli; anlık tork sayesinde bu otomobiller hem çevik hem de çok keyifli. Cupra Born, arkadan itişli Tesla Model Y ve BMW i4 bu açıdan dikkat çekici seçenekler.',
        ],
        cars: ['cupra-born-2023', 'tesla-model-y-2023', 'bmw-i4-2023'],
      },
      {
        title: 'Arkadan itişli otomobil alırken bilmeniz gerekenler',
        list: [
          'Arkadan itişli otomobiller kar ve buzda önden çekişlilere göre daha dikkatli kullanım ister; kış lastiği çok önemli.',
          'Elektronik denge sistemini (ESP) tamamen kapatmak yalnızca kapalı alanlarda ve pistte mantıklıdır.',
          'Arka lastikler daha hızlı aşınabilir; lastik bütçesini hesaba katın.',
          'İkinci el alırken diferansiyel, arka süspansiyon ve şanzıman geçmişini kontrol ettirin; drift amaçlı kullanılmış örneklerden uzak durun.',
        ],
      },
    ],
  },
  {
    slug: 'en-guvenilir-otomobiller',
    stats: ['guvenilirlik', 'ikinciel', 'yakit'],
    title: 'En Güvenilir Otomobiller',
    subtitle: 'Uzun yıllar sorunsuz kullanılabilecek, kronik sorunu az ve bakımı kolay otomobiller',
    description:
      'En güvenilir otomobiller: kronik sorunları az, uzun vadede dayanıklı ve bakımı kolay modeller. Toyota, Lexus, Honda, Mazda, Porsche, Suzuki ve Kia’dan güvenilirlik puanı en yüksek otomobiller.',
    date: '2026-10-05',
    dateLabel: '5 Ekim 2026',
    intro: [
      'Bir otomobilin ne kadar güvenilir olduğu, ilk yıllarda değil, garanti bittikten sonra ortaya çıkar. Kronik bir şanzıman ya da motor sorunu, satın alırken kazandığınız her şeyi tek bir faturada geri alabilir. Bu yüzden güvenilirlik, özellikle otomobilini uzun yıllar kullanmayı düşünenler için en önemli kriterlerden biri.',
      'Bu rehberde, güvenilirlik puanımıza göre en sorunsuz otomobilleri seçtik. Toyota ve grubundaki Lexus’un güvenilirlikteki üstünlüğü bir sır değil; ama listeyi tek markadan ibaret bırakmak yerine, farklı markalardan güvenle önerebileceğimiz modelleri de dahil ettik.',
    ],
    method:
      'Sıralamada incelemelerimizdeki Güvenilirlik puanını kullandık. Bu puan; bilinen kronik sorunları, motor, şanzıman, şasi ve yürüyen aksamın uzun vadeli dayanıklılığını değerlendiriyor. Listeyi çeşitlendirmek için aynı markadan en fazla iki model aldık; Lexus’u Toyota’dan ayrı bir marka olarak değerlendirdik.',
    items: [
      { car: 'lexus-es-2022', text: 'Lexus, güvenilirlik araştırmalarında yıllardır en üst sıralarda yer alıyor ve ES 300h bunun en iyi örneklerinden. Toyota’nın kanıtlanmış hibrit sistemi, kusursuz işçilikle birleşince ortaya hem lüks hem de neredeyse dert çıkarmayan bir sedan çıkıyor.' },
      { car: 'toyota-hilux-2023', text: '“Kırılmaz” ünü boşuna değil. Hilux, zorlu koşullarda yüz binlerce kilometre çalışacak şekilde tasarlanmış basit ve sağlam bir mekaniğe sahip. Yüksek kilometreli örnekler bile güvenle alınabiliyor.' },
      { car: 'toyota-corolla-hybrid-2026', text: 'Corolla Hybrid için “bakımını yap, gerisini unut” demek abartı olmaz. Toyota’nın hibrit sistemi dünyanın dört bir yanında taksi filolarında yüz binlerce kilometre yapıyor ve hâlâ şaşırtacak kadar az sorun çıkarıyor.' },
      { car: 'honda-cr-v-2020', text: 'Honda’nın güvenilirliği Toyota’yla yarışıyor. CR-V, geniş kabini ve dört çekeriyle uzun yıllar sorunsuz kullanılabilecek bir aile SUV’u. Düzenli bakımla yüksek kilometrelere rahatlıkla ulaşıyor.' },
      { car: 'mazda-mx-5-2016', text: 'Bir spor otomobilin güvenilir olabileceğinin en güzel kanıtı. MX-5’in basit atmosferik motoru ve manuel şanzımanı neredeyse hiç sorun çıkarmıyor; düşük bakım maliyetiyle uzun yıllar keyif veriyor.' },
      { car: 'honda-hr-v-2023', text: 'HR-V’nin e:HEV hibrit sistemi, Honda’nın güvenilirlik geleneğini sürdürüyor. Basit ve dayanıklı yapısıyla şehir içinde yıllarca sorunsuz kullanılabilecek bir C-SUV.' },
      { car: 'mazda-cx-5-2023', text: 'Mazda, turbo ve karmaşık şanzımanlar yerine atmosferik motor ve klasik tam otomatik şanzımanı tercih ederek güvenilirlikte fark yaratıyor. CX-5 bu felsefenin bir aile SUV’undaki en iyi örneği.' },
      { car: 'porsche-911-carrera-s-2022', text: 'Bir süper spor otomobilin güvenilirlik listesinde yer alması şaşırtıcı gelebilir; ama 911, kalitesi ve sağlam mühendisliğiyle günlük kullanımda bile şaşırtıcı derecede sorunsuz. Bakımları pahalı olsa da kronik sorunları oldukça az.' },
      { car: 'suzuki-swift-2026', text: 'Basitliğin gücü: Swift’in hafif yapısı ve sade mekaniği, uzun vadede çok az sorun çıkarıyor. Ucuz bakım ve parça maliyetiyle güvenilir bir ilk otomobil arayanlar için çok mantıklı.' },
      { car: 'kia-niro-2023', text: 'Kia’nın uzun garantisi, markanın kendi ürünlerine olan güveninin bir göstergesi. Niro’nun hibrit sistemi hem verimli hem de dayanıklı; listeyi tamamlayan güçlü bir aile seçeneği.' },
    ],
    sections: [
      {
        title: 'Güvenilir bir otomobili nasıl anlarsınız?',
        list: [
          'Yeni ve karmaşık teknolojiler yerine kanıtlanmış motor ve şanzımanları tercih edin.',
          'Atmosferik motorlar ve klasik tam otomatik şanzımanlar, uzun vadede genellikle turbo motorlar ve kuru kavramalı çift kavramalı şanzımanlardan daha az sorun çıkarır.',
          'Satın almadan önce o modelin bilinen kronik sorunlarını araştırın; “Kronik Sorunu Bilinen Motorlar” rehberimiz bu konuda yardımcı olabilir.',
          'En güvenilir otomobil bile bakımı ihmal edilirse sorun çıkarır; servis geçmişi en az model kadar önemlidir.',
        ],
      },
    ],
  },
  {
    slug: 'ikinci-el-arac-alirken-kontrol-listesi',
    title: 'İkinci El Araç Alırken Kontrol Listesi',
    subtitle: 'Tramer, ekspertiz, kilometre, kronik sorunlar ve test sürüşü: ikinci el otomobil alırken adım adım nelere bakmalısınız?',
    description:
      'İkinci el araç alırken kontrol listesi: tramer ve hasar kaydı sorgulama, ekspertiz, kilometre kontrolü, borç ve haciz sorgusu, kronik sorunlar, test sürüşü ve noterde güvenli satış.',
    date: '2026-10-10',
    dateLabel: '10 Ekim 2026',
    intro: [
      'İkinci el otomobil almak, doğru yapıldığında sıfır bir otomobile göre ciddi tasarruf sağlıyor. Ama yanlış bir seçim; boyası gizlenmiş bir hasar, düşürülmüş bir kilometre ya da kronik bir şanzıman sorunu yüzünden kısa sürede büyük bir masrafa dönüşebiliyor.',
      'Bu rehberde, ilanı ilk gördüğünüz andan noterde imzaya kadar hangi adımları atmanız gerektiğini sırasıyla topladık. Listeyi telefonunuza kaydedip otomobile bakmaya giderken yanınızda götürebilirsiniz.',
    ],
    sections: [
      {
        title: '1. Önce modeli araştırın, sonra ilana bakın',
        paragraphs: [
          'İkinci el alırken en büyük hata, önce ilana âşık olup modeli sonra araştırmak. Hangi modeli almak istediğinizi belirledikten sonra o modelin, hatta o motor ve şanzıman kombinasyonunun bilinen zayıf noktalarını öğrenin. Aynı modelin bir motoru çok sağlamken diğeri sorunlu olabiliyor.',
        ],
        list: [
          'Motorun ve şanzımanın tam adını öğrenin (ör. 1.2 PureTech, 1.5 eTSI, DQ200 DSG, N13).',
          'O kombinasyonun bilinen kronik sorunlarını ve hangi kilometrede ortaya çıktığını araştırın.',
          'Değişmesi gereken periyodik parçaların (triger kayışı, DPF, çift kütleli volan) yaklaşık maliyetini öğrenin.',
          'Aynı model ve kilometredeki ilanların ortalama fiyatını not alın; çok ucuz ilan genellikle bir şey saklıyor.',
        ],
      },
      {
        title: '2. Tramer ve hasar kaydını sorgulayın',
        paragraphs: [
          'Türkiye’de sigorta şirketlerinin ödediği hasarlar kayıt altında tutuluyor ve bu kayıtlar, Sigorta Bilgi ve Gözetim Merkezi (SBM) ile e-Devlet üzerinden sorgulanabiliyor. Satıcıdan plaka ya da şasi numarasını isteyip sorguyu otomobile bakmaya gitmeden önce yapın.',
          'Tramer kaydı tek başına her şeyi anlatmaz: Sigortaya yansıtılmadan, cepten yaptırılan onarımlar kayıtta görünmez. Bu yüzden düşük ya da sıfır tramer kaydı, ekspertizi atlamak için bir sebep değildir. Tersine, kayıttaki tutar ile ekspertizde görülen boya ve değişenlerin birbiriyle uyumlu olması önemlidir.',
        ],
      },
      {
        title: '3. Kilometreyi ve geçmişi doğrulayın',
        list: [
          'e-Devlet’teki araç muayene bilgilerinden, her muayenede kaydedilen kilometreleri kontrol edin. Kilometrenin bir muayeneden diğerine düşmesi büyük bir uyarı işaretidir.',
          'Yetkili servis kayıtlarını isteyin; servis kayıtlarındaki kilometreler de tutarlı olmalı.',
          'Direksiyon, vites topuzu, pedallar ve sürücü koltuğundaki aşınma ile kilometrenin uyumlu olup olmadığına bakın.',
          'İki anahtar, kullanım kılavuzu ve bakım faturaları gibi detaylar, otomobile iyi bakıldığının işaretidir.',
        ],
      },
      {
        title: '4. Borç, haciz ve rehin kontrolü',
        paragraphs: [
          'Otomobilin üzerinde vergi borcu, trafik cezası, haciz ya da rehin kaydı olup olmadığını satıştan önce mutlaka öğrenin. Haciz veya rehin kaydı olan bir otomobilin satışı sorun yaratabilir. Bu bilgileri satıcıdan e-Devlet çıktısı olarak isteyebilir, satışın yapılacağı noterde de kontrol ettirebilirsiniz.',
        ],
      },
      {
        title: '5. Bağımsız ekspertiz yaptırın',
        paragraphs: [
          'Ekspertiz, ikinci el alımında harcayacağınız en değerli paradır. Satıcının önerdiği değil, sizin seçtiğiniz bağımsız ve güvenilir bir ekspertize gidin. Raporu yalnızca okumakla kalmayın; mümkünse kontrol sırasında orada bulunun ve sorularınızı sorun.',
        ],
        list: [
          'Kaporta: Boyalı ve değişen parçalar, özellikle tavan, direkler ve şasi bölgesi.',
          'Motor: Yağ kaçağı, kompresyon, soğutma sistemi ve egzozdan gelen duman.',
          'Şanzıman: Vites geçişleri, kavrama ve çift kavramalı şanzımanlarda kalkış davranışı.',
          'Alt takım: Süspansiyon, burçlar, amortisörler ve fren sistemi.',
          'Elektronik: Arıza kodları (OBD), multimedya, kameralar, sensörler ve tüm düğmeler.',
          'Lastikler: Diş derinliği, üretim tarihi ve düzensiz aşınma (rot-balans sorununun işareti).',
        ],
      },
      {
        title: '6. Kronik sorunları özellikle kontrol ettirin',
        paragraphs: [
          'Ekspertizde genel kontrolün yanında, o modelin bilinen kronik sorunlarını ayrıca kontrol ettirin. Örneğin kuru kavramalı DSG’li araçlarda kalkış titremesi ve vites geçişleri, PureTech motorlarda triger kayışının değişim geçmişi, dizel araçlarda DPF’nin durumu, bazı BMW’lerde zamanlama zinciri sesi bu listenin başında geliyor. Her modelin kendine özgü zayıf noktalarını incelemelerimizdeki Beğenmediklerimiz bölümünde ve kronik sorunlar rehberimizde bulabilirsiniz.',
        ],
        cars: ['volkswagen-golf-2021', 'peugeot-408-2024', 'bmw-3-serisi-2013'],
      },
      {
        title: '7. Test sürüşünü acele etmeden yapın',
        list: [
          'Motoru mümkünse soğukken çalıştırın; ilk çalıştırmadaki sesler ve titreşimler çok şey anlatır.',
          'Şehir içi, dur-kalk ve otoyol hızlarını kapsayan en az 20–30 dakikalık bir sürüş yapın.',
          'Direksiyonu bıraktığınızda otomobilin bir tarafa çekip çekmediğine bakın.',
          'Sert frenlemede direksiyonda titreme ve otomobilde savrulma olmamalı.',
          'Bozuk yollarda süspansiyondan ve kabinden gelen sesleri dinleyin.',
          'Klima, ısıtma, camlar, multimedya ve kameralar dahil bütün donanımları tek tek deneyin.',
        ],
      },
      {
        title: '8. Pazarlık ve noterde güvenli satış',
        paragraphs: [
          'Ekspertiz raporunda çıkan her eksik, pazarlıkta elinizi güçlendirir. Yakın zamanda değişmesi gereken parçaların (lastik, fren, triger, DPF gibi) maliyetini hesaplayıp fiyattan düşülmesini isteyin.',
          'İkinci el otomobil satışı noterde yapılıyor. Büyük tutarları elden ya da satıcının hesabına önceden göndermek yerine, noterlerin sunduğu güvenli ödeme sistemini kullanmak; paranın, devir tamamlandığında satıcıya geçmesini sağlayarak sizi korur.',
        ],
      },
      {
        title: 'Kısa kontrol listesi',
        list: [
          'Modelin ve motorun kronik sorunlarını araştırdım.',
          'Tramer ve hasar kaydını sorguladım.',
          'Muayene kayıtlarından kilometreyi doğruladım.',
          'Borç, haciz ve rehin kaydını kontrol ettim.',
          'Bağımsız ekspertiz yaptırdım ve raporu okudum.',
          'Kronik sorunları ayrıca kontrol ettirdim.',
          'En az 20 dakikalık test sürüşü yaptım.',
          'Satışı noterde, güvenli ödeme sistemiyle yapacağım.',
        ],
      },
    ],
  },
];

export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug);
}
