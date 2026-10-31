// ---------------------------------------------------------------------------
// REHBER YAZILARI
// Yeni bir rehber eklemek için GUIDES listesine bir blok ekleyin.
// - slug: adres (/rehber/<slug>)
// - items: listeli yazılarda sıralama; car = cars.js'teki aracın adresi (slug)
// - sections: serbest metin bölümleri (başlık + paragraflar)
// Yazılar da yayın sırasında hazır HTML olarak üretilir ve site haritasına eklenir.
// ---------------------------------------------------------------------------
const GUIDE_LIST = [
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
  {
    slug: 'uzun-yol-icin-en-konforlu-otomobiller',
    stats: ['konfor', 'tuketim', 'guvenilirlik'],
    title: 'Uzun Yol İçin En Konforlu Otomobiller',
    subtitle: 'Saatlerce direksiyon başında olsanız bile sizi yormayan, sessiz, yumuşak ve uzun menzilli otomobiller',
    description:
      'Uzun yol için en konforlu otomobiller: Mercedes S Serisi, BMW i7, Mercedes EQS, Audi A8 L, Lexus ES, Škoda Superb ve daha fazlası. Süspansiyon, koltuk, ses yalıtımı ve menzile göre seçtik.',
    date: '2026-10-11',
    dateLabel: '11 Ekim 2026',
    intro: [
      'Uzun yolda bir otomobilin ne kadar hızlı olduğu değil, varış noktasında sizi ne kadar dinlenmiş bıraktığı önemlidir. Bozuk asfaltı silen bir süspansiyon, beli destekleyen koltuklar, rüzgar ve lastik sesini dışarıda bırakan bir kabin ve sık mola verdirmeyen bir menzil; 500 kilometrelik bir yolculuğu keyfe dönüştüren şeyler bunlar.',
      'Bu rehberde konfor puanımızı esas alarak uzun yol için en iyi otomobilleri seçtik. Süper spor otomobilleri, konfor puanları yüksek olsa bile listeye almadık; çünkü amacımız gerçekten uzun yolda yaşanacak bir otomobil önermek. Listenin sonunda daha ulaşılabilir bütçeler için de seçenekler var.',
    ],
    method:
      'Sıralamada incelemelerimizdeki Konfor puanını esas aldık; süspansiyon, koltuklar, ses yalıtımı ve uzun yol menzili gibi uzun yola özgü kriterleri de değerlendirdik. Aynı modelin farklı yıllarını tek sırada saydık.',
    items: [
      { car: 'mercedes-benz-s-serisi-2022', text: 'Uzun yol konforunun ölçü birimi. Yolu önceden tarayan aktif süspansiyonu kasisleri ve çukurları neredeyse tamamen siliyor, akustik camları ve yoğun ses yalıtımıyla kabin bir meditasyon odası kadar sessiz. Arkada oturanlar için de ön koltuktakiler kadar keyifli bir yolculuk sunan nadir otomobillerden.' },
      { car: 'bmw-i7-2024', text: 'Arka koltukta seyahat edenler için belki de dünyanın en iyi otomobillerinden. Yatak pozisyonuna gelen arka koltuk, havalı süspansiyon ve kütüphane sessizliğindeki kabin uzun bir yolculuğu uyuyarak geçirmeyi mümkün kılıyor. Arka aks yönlendirmesi de bu dev sedanı otoyolda bir ray üzerinde gidiyormuş gibi sakinleştiriyor.' },
      { car: 'mercedes-benz-eqs-2022', text: 'Elektrikli bir otomobilin uzun yolda en büyük sorunu menzil olur; EQS ise bu sorunu neredeyse ortadan kaldırıyor. Dikkatli bir sürüşle tek şarjla yaklaşık 650 kilometre gidebiliyor. Motor sesi olmadan, akıcı ve sessiz bir şekilde kilometreleri eritmek uzun yolda ayrı bir dinginlik veriyor.' },
      { car: 'audi-a8-l-2020', text: 'Uzatılmış şasisi sayesinde arka diz mesafesi devasa; quattro dört çeker ve havalı süspansiyonla her yol ve hava koşulunda aynı sakinlikte ilerliyor. İç mekânın işçiliği uzun yolda her detayı fark etmenize zaman tanıyor.' },
      { car: 'land-rover-range-rover-sport-2023', text: 'Yüksek oturma pozisyonu, yumuşak havalı süspansiyonu ve sessiz kabiniyle Range Rover Sport, bir SUV’dan bekleyebileceğiniz en lüks uzun yol deneyimini sunuyor. Asfalt bittiğinde bile konforu bırakmaması onu benzersiz kılıyor.' },
      { car: 'volvo-xc90-2023', text: 'Volvo’nun koltukları uzun yolda bel ve sırtı en iyi destekleyenlerden. Geniş ve aydınlık kabini, sakin sürüş karakteri ve üstün güvenlik donanımıyla özellikle aileyle yapılan uzun yolculuklar için çok mantıklı bir seçim.' },
      { car: 'audi-a7-sportback-2020', text: 'Konforu inanılmaz seviyede; ön ve arka diz mesafesi etkileyici. Düşük tüketimi sayesinde uzun yolda depo da uzun süre dayanıyor. Hem şık hem de yolculuğu keyfe dönüştüren bir gran turismo.' },
      { car: 'lexus-es-2022', text: 'Hibrit sistemiyle otoyolda bile düşük tüketen, son derece sessiz ve yumuşak bir sedan. Lexus’un efsanevi güvenilirliği de uzun yolda en önemli şeyi, yani kafa rahatlığını sağlıyor.' },
      { car: 'bmw-5-serisi-2026', text: 'Konforla sürüş keyfini en iyi dengeleyen iş sedanı. Uzun yolda sakin ve sessiz; ama virajlı bir dağ yoluna girdiğinizde BMW karakterini de hemen hissettiriyor. Gelişmiş sürüş destek sistemleri uzun otoyol yolculuklarında yorgunluğu belirgin şekilde azaltıyor.' },
      { car: 'skoda-superb-2020', text: 'Listenin fiyat/konfor şampiyonu. Superb çok ama çok konforlu; bozuk yollarda bile hiçbir sıkıntı yaşatmıyor ve kabine sarsıntı taşımıyor. Dev arka koltuğu ve bagajıyla uzun aile yolculuklarının ideal otomobili. Bu fiyat seviyesinde böyle bir konfor sunan başka bir otomobil bulmak gerçekten zor.' },
    ],
    sections: [
      {
        title: 'Daha ulaşılabilir bütçeler için konforlu seçenekler',
        paragraphs: [
          'Uzun yol konforu için mutlaka lüks bir otomobil almak gerekmiyor. Yeni nesil Škoda Superb, Superb’ün konfor geleneğini sürdürüyor. Citroën C5 Aircross, kademeli hidrolik destekli süspansiyonuyla “uçan halı” hissine yaklaşan bir yolculuk sunuyor; yalnız virajlarda gövdeyi fazla yatırdığını bilmek gerekiyor. Peugeot 408 ise masajlı koltuklarıyla uzun yolda sürücüyü şımartan detaylar sunuyor.',
        ],
        cars: ['skoda-superb-2026', 'citroen-c5-aircross-2022', 'peugeot-408-2024'],
      },
      {
        title: 'Uzun yol konforunu ne belirler?',
        list: [
          'Süspansiyon: Havalı ya da adaptif süspansiyonlar bozuk yolları çok daha iyi süzer. Büyük jant ve ince lastikler ise konforu düşürür.',
          'Koltuklar: Bel desteği, ayarlanabilir uyluk desteği ve masaj fonksiyonu uzun yolda yorgunluğu belirgin şekilde azaltır.',
          'Ses yalıtımı: Akustik camlar ve iyi kapı fitilleri rüzgar ve lastik sesini keser; sessiz bir kabin yorgunluğu doğrudan azaltır.',
          'Sürüş destek sistemleri: Adaptif hız sabitleyici ve şerit takip asistanı otoyolda sürücünün yükünü hafifletir.',
          'Menzil ve depo: Büyük yakıt deposu ya da uzun elektrikli menzil, mola sayısını ve planlama derdini azaltır.',
          'Arka koltuk: Ailece yolculuk yapıyorsanız arka diz mesafesi ve arka klima çıkışları en az ön koltuk kadar önemlidir.',
        ],
      },
    ],
  },
  {
    slug: 'en-iyi-hot-hatch-otomobiller',
    stats: ['surus', 'guvenilirlik', 'ikinciel'],
    title: 'En İyi Hot Hatch Otomobiller',
    subtitle: 'Hot hatch nedir, neden bu kadar sevilir ve Türkiye’de alınabilecek en keyifli hot hatch’ler hangileri?',
    description:
      'Hot hatch nedir? Honda Civic Type R, Volkswagen Golf R ve GTI, Audi S3, Hyundai i20 N, Polo GTI ve MINI Cooper S ile en iyi hot hatch otomobiller ve seçerken dikkat edilmesi gerekenler.',
    date: '2026-10-11',
    dateLabel: '11 Ekim 2026',
    intro: [
      'Hot hatch, en basit tanımıyla “güçlendirilmiş hatchback” demek. Üreticiler, gündelik kullanım için tasarlanmış pratik bir hatchback’i alıp ona çok daha güçlü bir motor, daha sert ve alçak bir süspansiyon, daha büyük frenler, daha keskin bir direksiyon ve sportif bir görünüm ekliyor. Ortaya çıkan otomobil; hafta içi işe, okula ya da markete giderken sıradan bir hatchback kadar kullanışlı, hafta sonu virajlı bir yolda ise gerçek bir spor otomobil kadar eğlenceli oluyor.',
      'Hot hatch’leri bu kadar sevilen yapan şey de tam olarak bu ikili karakter: dört kapı, kullanışlı bir bagaj ve arka koltuk ile adrenalin aynı otomobilde. Üstelik genellikle aynı performanstaki coupé ya da spor otomobillerden çok daha ulaşılabilir fiyatlarla. Bu rehberde, sürüş puanımızı ve kendi deneyimlerimizi esas alarak en iyi hot hatch’leri sıraladık.',
    ],
    method:
      'Sıralamada incelemelerimizdeki Sürüş puanını esas aldık; günlük kullanılabilirlik, güvenilirlik ve ikinci el değerini de değerlendirdik. Yalnızca hatchback gövdeli, performans odaklı versiyonları listeye aldık.',
    items: [
      { car: 'honda-civic-type-r-2023', text: 'Önden çekişli otomobillerin zirvesi. Dünyanın en iyi manuel şanzıman hislerinden birine, devir eşitleme sistemine ve 329 beygiri ön tekerleklere direksiyonu çekmeden aktaran bir ön aksa sahip. Pistte süper otomobilleri zorlarken günlük kullanımda da Honda güvenilirliğini koruyor. Hot hatch denince akla gelen ilk isim olmayı fazlasıyla hak ediyor.' },
      { car: 'volkswagen-golf-r-2021', text: 'Dört çekerin gücü ve her havada güvenle, Golf R hot hatch dünyasının en çok yönlüsü. Arka aksa gücü dağıtan sistemi ve drift modu sayesinde hem kontrollü hem de oyunbaz olabiliyor. Kışın bile her gün kullanabileceğiniz en hızlı hatchback’lerden biri.' },
      { car: 'audi-s3-sportback-2021', text: 'Kendi GPS ölçümlerimizde 0–100 km/s’yi sürekli 4,7–4,8 saniyede tamamladı. Quattro sayesinde bu performansı her kalkışta tekrar edebiliyor. Süspansiyonu sert ve iç mekânı A3 ile aynı; ama bu otomobil zaten performansı için alınıyor ve o konuda fazlasıyla tatmin ediyor.' },
      { car: 'volkswagen-golf-gti-2022', text: 'Hot hatch kavramının babası. GTI, sürüş keyfiyle günlük konfor arasındaki dengeyi kırk yılı aşkın süredir en iyi kuran otomobil. Ekose desenli koltukları ve dengeli karakteriyle her gün kullanılacak bir hot hatch arayanlar için en mantıklı seçimlerden.' },
      { car: 'hyundai-i20-n-2022', text: 'Spor egzoz sesi inanılmaz; ses değişimleri sürüşün her anında gülümsetiyor. Sürüş için ciddi bir AR-GE yapıldığı virajlarda hemen anlaşılıyor. İç mekânı normal i20’yi andırsa da fiyatı da i20’ye yakın olduğu için bu bir sorun değil. Fiyat başına keyifte listenin şampiyonu.' },
      { car: 'volkswagen-polo-gti-2023', text: 'GTI ruhunu daha küçük ve daha ulaşılabilir bir gövdeye taşıyor. Güçlü motoru, olgun sürüşü ve ekose koltuklarıyla hem şehirde hem de virajlı yollarda keyifli; sert olmadan sportif bir karakter arayanlara hitap ediyor.' },
      { car: 'mini-cooper-s-2018', text: 'Go-kart gibi keskin sürüşüyle MINI, hot hatch dünyasının en karakterlisi. Küçük boyutları, güçlü 2.0 motoru ve premium kabiniyle şehirde de virajda da çok eğlenceli. Bagajı küçük ve süspansiyonu sert; ama bu otomobili alan biri bunları zaten göze almış oluyor.' },
    ],
    sections: [
      {
        title: 'Elektrikli bir hot hatch: MG4 XPOWER',
        paragraphs: [
          'Elektrikli dünyada da hot hatch ruhu yaşıyor. MG4 XPOWER, iki elektrik motoru ve dört çekeriyle düz yolda gerçekten çok hızlı; gaz hissi süper ve tam bir şaka makinesi. Bu performansın bedeli biraz menzil ve ortalama bir direksiyon hissi; ama süper otomobil hızlanmasını bir hatchback fiyatına yaşamak isteyenler için eşsiz bir seçenek.',
        ],
        cars: ['mg-mg4-xpower-2024'],
      },
      {
        title: 'Hot hatch alırken nelere dikkat etmeli?',
        list: [
          'Sert süspansiyon: Hot hatch’lerin çoğu konforu performansa feda eder. Bozuk yollarda günlük kullanımı mutlaka test sürüşünde deneyin.',
          'Lastik ve fren maliyetleri: Yüksek performanslı lastikler ve büyük frenler daha hızlı aşınır ve daha pahalıdır.',
          'Sigorta ve vergiler: Güçlü motorlar Türkiye’de daha yüksek ÖTV, MTV ve kasko anlamına gelir.',
          'İkinci elde geçmiş: Pist ya da yazılım (chip tuning) geçmişi olan örneklerde şanzıman, debriyaj ve motor daha çok yıpranmış olabilir; bakım kayıtlarını ve ekspertizi mutlaka kontrol edin.',
          'Manuel mi otomatik mi: Manuel şanzımanlar daha saf bir sürüş hissi verir; çift kavramalı otomatikler ise daha hızlıdır ve trafikte daha rahattır.',
        ],
      },
    ],
  },
  {
    slug: 'porsche-dili-model-isimleri-ne-anlama-geliyor',
    title: 'Porsche Dili: 4, 4S, GTS, Turbo S, GT3, GT3 RS, Weissach ve PDK Ne Anlama Geliyor?',
    subtitle: 'Porsche’nin model isimlerindeki harf ve kısaltmaları tek tek açıklıyoruz; hangi versiyonun ne sunduğunu ve kime uygun olduğunu anlatıyoruz',
    description:
      'Porsche model isimleri ne anlama geliyor? Carrera, 4, S, 4S, T, GTS, Turbo, Turbo S, GT3, GT3 RS, Weissach Paketi, PDK, E-Hybrid ve Performance Battery Plus kısaltmalarının anlamı.',
    date: '2026-10-13',
    dateLabel: '13 Ekim 2026',
    intro: [
      'Porsche’nin model isimleri ilk bakışta bir şifre gibi görünür: 911 Carrera 4S, Taycan 4S Performance Battery Plus, 911 GT3 RS Weissach Paketi… Ama bu isimlerin her harfi belirli bir anlam taşıyor ve otomobilin karakterini, gücünü, çekiş sistemini ya da odak noktasını doğrudan anlatıyor.',
      'Bu rehberde Porsche dilini çözüyoruz. Bir Porsche ilanına ya da fiyat listesine baktığınızda hangi versiyonun ne sunduğunu artık tek bakışta anlayabileceksiniz.',
    ],
    sections: [
      {
        title: 'Carrera: 911’in temel versiyonu',
        paragraphs: [
          'Carrera adı, Porsche’nin 1950’lerde Meksika’daki efsanevi Carrera Panamericana yarışında elde ettiği başarılardan geliyor. Bugün 911 ailesinin temel versiyonunu ifade ediyor. “911 Carrera” dendiğinde arkadan itişli, ailenin giriş seviyesindeki modeli anlaşılır. Giriş seviyesi olması sizi yanıltmasın: temel bir Carrera bile çok güçlü ve son derece yetenekli bir spor otomobil.',
        ],
      },
      {
        title: '4: Dört çeker',
        paragraphs: [
          'İsimdeki “4” rakamı dört çekeri ifade ediyor. 911 Carrera 4, Taycan 4 gibi modellerde güç dört tekerleğe birden aktarılıyor. Dört çeker; ıslak ve kaygan zeminde çok daha fazla güven, kalkışta daha iyi çekiş ve her havada kullanılabilirlik sağlıyor. Arkadan itişli versiyonlar ise biraz daha hafif ve sürüş karakteri olarak daha oyunbaz.',
        ],
      },
      {
        title: 'S ve 4S: Daha güçlü',
        paragraphs: [
          '“S” harfi, aynı modelin daha güçlü versiyonunu gösteriyor. 911 Carrera S, temel Carrera’dan daha fazla beygire, daha güçlü frenlere ve daha zengin donanıma sahip. “4S” ise bu güçlü versiyonun dört çekerli hâli: hem daha fazla güç hem de dört çekerin güveni. Günlük kullanım ve performans arasında en dengeli versiyonlardan biri olduğu için en çok tercih edilenler arasında.',
        ],
        cars: ['porsche-911-carrera-s-2022', 'porsche-macan-2021'],
      },
      {
        title: 'T: Touring, saf sürüş odaklı',
        paragraphs: [
          '“T” versiyonları, Touring’in kısaltması. Genellikle temel motoru kullanır ama daha hafif tutulur, daha kısa vites oranlarına ve sürüşe odaklı bir donanıma sahiptir. Gösterişten çok sürüş hissini önemseyen, saf bir Porsche deneyimi arayanlar için tasarlanmıştır.',
        ],
      },
      {
        title: 'GTS: Gran Turismo Sport',
        paragraphs: [
          'GTS, Gran Turismo Sport’un kısaltması ve S ile Turbo arasında konumlanıyor. S’ten daha güçlü bir motor, sportif süspansiyon, daha agresif bir görünüm ve sportif donanımlar standart olarak geliyor. Birçok Porsche tutkunu GTS’i, gündelik kullanılabilirlik ile performans arasındaki en tatlı nokta olarak görür.',
        ],
      },
      {
        title: 'Turbo ve Turbo S: Zirvedeki yol otomobilleri',
        paragraphs: [
          'Turbo ve Turbo S, Porsche’nin her model ailesindeki en güçlü ve en lüks yol versiyonları. 911 Turbo S, dört çeker, aktif aerodinamik ve olağanüstü hızlanmasıyla her gün kullanılabilen bir süper otomobil. Turbo S, Turbo’nun daha da güçlü ve daha donanımlı hâli.',
          'İlginç bir detay: Taycan ve elektrikli Macan gibi elektrikli Porsche’lerde de “Turbo” ve “Turbo S” isimleri kullanılıyor; oysa bu otomobillerde turbo yok. Burada isim, artık bir teknolojiyi değil, ailenin en güçlü versiyonunu ifade ediyor.',
        ],
        cars: ['porsche-911-turbo-s-2022'],
      },
      {
        title: 'GT3: Pistten yola',
        paragraphs: [
          'GT3, Porsche’nin motor sporları birimi tarafından geliştirilen, piste odaklı bir 911. Yüksek devirli atmosferik motoru, büyük arka kanadı, sert süspansiyonu ve keskin direksiyonuyla bir yarış otomobilinin yola çıkabilen hâli gibi. Sınırlı üretim ve atmosferik motorların giderek azalması nedeniyle ikinci el piyasasında değerini olağanüstü koruyor.',
        ],
        cars: ['porsche-911-gt3-2023'],
      },
      {
        title: 'GT3 RS: Rennsport, en uç hâli',
        paragraphs: [
          'RS, Almanca “Rennsport”, yani “yarış sporu” anlamına geliyor. GT3 RS, GT3’ün daha da uç noktaya taşınmış hâli: çok daha agresif aerodinamik paketi, devasa kanadı, daha fazla yere basma kuvveti ve daha hafif yapısıyla tamamen pist performansına odaklanıyor. Günlük kullanımdan çok pist günleri için tasarlanmış bir otomobil.',
        ],
      },
      {
        title: 'Weissach Paketi: Daha hafif, daha hızlı',
        paragraphs: [
          'Weissach, Porsche’nin Almanya’daki araştırma ve geliştirme merkezinin adı. Weissach Paketi; karbon fiber parçalar, hafif jantlar ve çeşitli hafifletme detaylarıyla otomobilin ağırlığını azaltan bir opsiyon paketi. Genellikle GT3 RS, 718 Spyder RS ve bazı özel modellerde sunuluyor. Biraz daha hafiflik ve pistte biraz daha iyi tur süreleri için oldukça ciddi bir ek ücret ödeniyor.',
        ],
      },
      {
        title: 'PDK: Porsche’nin çift kavramalı şanzımanı',
        paragraphs: [
          'PDK, Almanca “Porsche Doppelkupplung”, yani “Porsche çift kavrama” anlamına geliyor. Bir sonraki vitesi önceden hazırlayan çift kavramalı yapısı sayesinde vites geçişleri milisaniyeler içinde, neredeyse kesintisiz gerçekleşiyor. Hem günlük kullanımda konforlu bir otomatik gibi davranıyor hem de pistte manuel şanzımandan daha hızlı tur süreleri sağlıyor. Bazı modellerde manuel şanzıman da tercih edilebiliyor.',
        ],
        cars: ['porsche-718-cayman-2023'],
      },
      {
        title: 'E-Hybrid ve Performance Battery Plus',
        paragraphs: [
          'E-Hybrid, Cayenne ve Panamera gibi modellerde kullanılan şarj edilebilir hibrit versiyonları ifade ediyor; benzinli motora bir elektrik motoru ve şarj edilebilir bir batarya eşlik ediyor.',
          'Performance Battery Plus ise elektrikli Taycan’da sunulan daha büyük batarya seçeneği. Örneğin “Taycan 4S Performance Battery Plus”, dört çekerli ve güçlü 4S versiyonunun daha büyük bataryalı, dolayısıyla daha uzun menzilli ve biraz daha güçlü hâli anlamına geliyor.',
        ],
        cars: ['porsche-taycan-2022', 'porsche-taycan-2026'],
      },
      {
        title: 'Kısa sözlük',
        list: [
          'Carrera: 911’in temel, arkadan itişli versiyonu',
          '4: Dört çeker',
          'S / 4S: Daha güçlü versiyon / daha güçlü ve dört çekerli versiyon',
          'T: Touring; hafif ve saf sürüş odaklı',
          'GTS: Gran Turismo Sport; S ile Turbo arasında, sportif donanımlı',
          'Turbo / Turbo S: Ailenin en güçlü ve en lüks yol versiyonları (elektriklilerde de kullanılıyor)',
          'GT3: Piste odaklı, atmosferik motorlu 911',
          'GT3 RS: Rennsport; GT3’ün en uç, aerodinamik odaklı hâli',
          'Weissach Paketi: Karbon ve hafif parçalarla ağırlık azaltma paketi',
          'PDK: Porsche’nin çift kavramalı otomatik şanzımanı',
          'E-Hybrid: Şarj edilebilir hibrit',
          'Performance Battery Plus: Taycan’da daha büyük batarya seçeneği',
        ],
      },
    ],
  },
  {
    slug: '1-milyon-tlye-alinabilecek-en-iyi-ikinci-el-otomobiller',
    stats: ['tuketimPuan', 'guvenilirlik', 'ikinciel'],
    title: '1 Milyon TL’ye Alınabilecek En İyi İkinci El Otomobiller',
    subtitle: 'Yaklaşık 1 milyon TL bütçeyle alınabilecek, ekonomik, güvenilir ve keyifli ikinci el otomobiller',
    description:
      '1 milyon TL’ye alınabilecek en iyi ikinci el otomobiller: Renault Clio, Megane Sedan, Toyota Corolla, Ford Focus, Opel Corsa, Fiat Egea, BMW 320i, Seat Ibiza, Honda Jazz ve VW Jetta.',
    date: '2026-10-13',
    dateLabel: '13 Ekim 2026',
    intro: [
      '1 milyon TL, bugün sıfır bir otomobil için yeterli bir bütçe değil; ama ikinci el piyasasında hâlâ çok mantıklı seçenekler sunuyor. Doğru modeli ve doğru örneği seçtiğinizde, düşük tüketimli, güvenilir ve satarken de kolay alıcı bulan bir otomobile sahip olabilirsiniz.',
      'Bu rehberde, yaklaşık 1 milyon TL bütçeyle bulunabilecek en iyi ikinci el otomobilleri seçtik. Listede şehir otomobillerinden aile sedanlarına, hatta arkadan itişli bir BMW’ye kadar farklı ihtiyaçlara uygun seçenekler var. Fiyatlar kilometreye, hasar kaydına ve donanıma göre değişiyor; listeyi Ekim 2026 ilan piyasasını göz önünde bulundurarak hazırladık.',
    ],
    method:
      'Listeyi incelemelerimizdeki genel puanlara, güvenilirlik ve ikinci el puanlarına ve kendi kullanım deneyimlerimize göre hazırladık. Fiyatlar ilan piyasasına göre yaklaşık değerlerdir ve hızla değişebilir.',
    items: [
      { car: 'renault-clio-2020', text: 'Bu bütçede bizim favorimiz. 1.3 TCe motoru nefes kesen bir performans sunuyor; hafif kasası sayesinde kendinden güçlü bazı otomobillerden bile daha hızlı hissettiriyor. Otomatik şanzımanı, modern kabini ve kolay satılmasıyla fiyat/performans açısından rakipsiz.' },
      { car: 'renault-megane-sedan-2018', text: 'Düşük dizel tüketimi, geniş bagajı ve otomatik şanzımanıyla bu bütçenin en mantıklı aile sedanlarından. Bursa üretimi olduğu için parçası ucuz ve kolay bulunuyor. Almadan önce EDC şanzımanın ve DPF’nin durumunu kontrol ettirin.' },
      { car: 'toyota-corolla-2017', text: 'Sorunsuzluk denince akla gelen ilk isim. Düzenli bakımla çok uzun süre kullanılabiliyor ve ikinci elde çok kolay satılıyor. Hızlanmada sesli ve biraz güçsüz hissettirse de kafa rahatlığı isteyenler için en güvenli seçim.' },
      { car: 'ford-focus-sedan-2016', text: 'Bu bütçede yol tutuşu en keyifli sedanlardan biri. 1.5 TDCi motoru uzun yolda çok az yakıyor. Süspansiyonu sert; ikinci el alırken DPF, turbo ve Powershift şanzımanın geçmişini mutlaka kontrol ettirin.' },
      { car: 'opel-corsa-2021', text: 'Kendi ilk otomobilim olarak üç yılda 65 bin kilometre kullandım: tüketimi insanüstü, direksiyonu yumuşak ve tamamen bütçe dostu. Manuel şanzımanı ve sade kabini bir eksi; ama ekonomi sizin için her şeyden önemliyse rakibi yok.' },
      { car: 'fiat-egea-sedan-2018', text: 'Türkiye’nin en yaygın aile sedanlarından biri olmasının bir sebebi var: çok düşük tüketim, dev bagaj ve satması sabah simit almak kadar kolay. Performansı atak değil ve kabini sade; ama ucuz bakımıyla cüzdanı en az yoran seçeneklerden.' },
      { car: 'bmw-3-serisi-2013', text: 'Bu bütçeyle arkadan itişli bir BMW’ye ulaşmanın yolu. Zamanının önünde tasarımı ve sürüş keyfiyle çok cazip; ama dikkat: N13 motor kronik sorunlarıyla biliniyor. Bakım geçmişi belli olmayan örneklerden uzak durun ve bütçeniz elverirse N20 motorlu versiyonlara bakın.' },
      { car: 'seat-ibiza-2020', text: 'Keyifli sürüşü, canlı 1.0 TSI motoru ve hızlı DSG şanzımanıyla genç sürücüler için çok eğlenceli bir şehir otomobili. FR donanımın sportif görünümü de cabası. DSG’nin bakım geçmişine dikkat edin.' },
      { car: 'honda-jazz-2019', text: 'Honda güvenilirliği ve sinema koltuğu gibi kalkan “sihirli” arka koltuklarıyla küçük boyutlarına rağmen inanılmaz pratik. Sorunsuz ve uzun ömürlü bir şehir otomobili arayanlar için çok mantıklı.' },
      { car: 'volkswagen-jetta-2017', text: 'Geniş kabini, büyük bagajı, düşük dizel tüketimi ve otomatik şanzımanıyla Passat’a bütçe yetmeyenler için olgun bir alternatif. DSG şanzımanın ve dizel emisyon sisteminin durumunu kontrol ettirmek şart.' },
    ],
    sections: [
      {
        title: 'Bu bütçede ikinci el alırken dikkat edilmesi gerekenler',
        list: [
          'Kilometre ve yaş dengesini gözetin: Çok düşük fiyatlı ilanlar genellikle yüksek kilometre, ağır hasar ya da gizli bir sorun saklar.',
          'Dizel otomobillerde DPF’nin, çift kavramalı otomatiklerde (DSG, EDC, Powershift) şanzımanın bakım geçmişi kritik.',
          'Tramer kaydını sorgulayın ve bağımsız ekspertiz yaptırmadan karar vermeyin.',
          'Yakın zamanda değişmesi gereken parçaları (triger, lastik, fren, debriyaj) pazarlıkta fiyattan düşün.',
          'Adım adım kontrol listesi için “İkinci El Araç Alırken Kontrol Listesi” rehberimize göz atabilirsiniz.',
        ],
      },
    ],
  },
  {
    slug: 'lastik-secimi-rehberi',
    title: 'Lastik Seçiminin Önemi: Hangi Yolda Hangi Lastik Kullanılmalı?',
    subtitle: 'Yaz, kış, dört mevsim, run-flat, performans ve arazi lastikleri: farkları, avantajları ve hangi kullanıcıya uygun oldukları',
    description:
      'Lastik seçimi rehberi: yaz lastiği, kış (kar) lastiği, dört mevsim lastik, run-flat, performans, arazi ve elektrikli araç lastikleri arasındaki farklar; lastik ölçüsü ve etiket okuma, diş derinliği ve üretim tarihi.',
    date: '2026-10-14',
    dateLabel: '14 Ekim 2026',
    intro: [
      'Otomobilinizin yolla temas eden tek parçası lastikleri. Toplamda bir kartpostal büyüklüğündeki dört temas yüzeyi; frenlemeden viraj tutuşuna, yakıt tüketiminden kabin sessizliğine kadar her şeyi doğrudan etkiliyor. En gelişmiş güvenlik sistemleri bile ancak lastiğin sağladığı tutunma kadar etkili olabiliyor.',
      'Bu rehberde lastik türlerini, hangi koşulda hangisinin kullanılması gerektiğini ve lastik alırken dikkat etmeniz gereken detayları anlatıyoruz.',
    ],
    sections: [
      {
        title: '1. Yaz lastiği',
        paragraphs: [
          'Yaz lastikleri, hava sıcaklığı yaklaşık 7°C’nin üzerindeyken en iyi performansı veren lastiklerdir. Daha sert bir hamura ve daha az diş yarığına sahip oldukları için kuru ve ıslak asfaltta kısa fren mesafesi, keskin direksiyon tepkisi ve düşük yuvarlanma direnci sunarlar.',
          'Soğuk havada ise hamurları sertleşir ve tutunmaları belirgin şekilde azalır; karda ve buzda kesinlikle güvenli değildir. Kışları ılık geçen bölgelerde yıl boyu kullanılabilirler, ama soğuk iklimlerde mutlaka kış lastiğiyle birlikte kullanılmalıdırlar.',
        ],
      },
      {
        title: '2. Kış (kar) lastiği',
        paragraphs: [
          'Kış lastikleri, 7°C’nin altındaki sıcaklıklarda yumuşak kalan özel bir hamura ve karı, çamuru tutan derin diş yapısına sahiptir. Lastik yüzeyindeki çok sayıda ince kanal (lamel), karda ve ıslak soğuk zeminde tutunmayı artırır. Kışın, yaz lastiğine göre fren mesafesini ciddi şekilde kısaltırlar.',
          'Yan yüzeyindeki dağ ve kar tanesi sembolü (3PMSF), lastiğin kış koşullarında test edilip onaylandığını gösterir. Yalnızca “M+S” (çamur ve kar) ibaresi tek başına gerçek bir kış lastiği olduğu anlamına gelmez. Türkiye’de kış lastiği ticari araçlar için belirli tarihler arasında zorunlu; özel otomobiller için zorunlu olmasa da soğuk ve karlı bölgelerde şiddetle öneriliyor. Güncel kuralları her sezon kontrol etmekte fayda var.',
        ],
      },
      {
        title: '3. Dört mevsim lastik',
        paragraphs: [
          'Dört mevsim lastikler, yaz ve kış lastiklerinin özelliklerini tek bir lastikte birleştirmeye çalışır. Ilıman iklimde yaşayan, karla nadiren karşılaşan ve lastik değiştirme zahmetine girmek istemeyen sürücüler için pratik bir çözümdür. 3PMSF sembolü taşıyan modeller hafif kış koşullarında da yasal ve güvenlidir.',
          'Bedeli ise her iki uçta da uzman lastiklerin gerisinde kalmaktır: sıcak yazlarda yaz lastiği kadar keskin değil, sert kışlarda da kış lastiği kadar güvenli değildir. Şehir içinde yaşayan ve kışı ılık geçen bölgelerdeki sürücüler için en mantıklı seçenek olabilir.',
        ],
      },
      {
        title: '4. Run-flat (patlamaya dayanıklı) lastikler',
        paragraphs: [
          'Run-flat lastikler, güçlendirilmiş yan duvarları sayesinde hava kaybettiklerinde bile otomobilin belirli bir mesafeyi (genellikle yaklaşık 80 km’yi, 80 km/s’nin altındaki hızlarla) gitmesine izin verir. Böylece yol kenarında lastik değiştirmek zorunda kalmazsınız ve otomobilde stepneye gerek kalmaz. BMW başta olmak üzere bazı markalar run-flat lastikleri standart olarak kullanıyor.',
          'Dezavantajı konfor. Sert yan duvarları nedeniyle bozuk yollarda ve çukurlarda kabine daha fazla darbe iletirler; incelemelerimizde BMW 3 Serisi’nde bunu ayrıca belirtmiştik. Ayrıca normal lastiklere göre daha pahalıdırlar ve her lastikçide tamir edilemeyebilirler. Run-flat lastikler yalnızca lastik basınç izleme sistemi olan otomobillerde kullanılmalıdır.',
        ],
        cars: ['bmw-3-serisi-2026'],
      },
      {
        title: '5. Performans (UHP) lastikleri',
        paragraphs: [
          'Ultra yüksek performans lastikleri, spor otomobiller ve güçlü sedanlar için tasarlanır. Çok yumuşak hamurları ve geniş temas yüzeyleriyle kuru zeminde olağanüstü tutunma ve keskin direksiyon tepkisi sağlarlar. Ancak daha hızlı aşınırlar, daha gürültülüdürler ve fiyatları yüksektir. Hot hatch ya da spor otomobil kullanıyorsanız, otomobilin performansından gerçekten yararlanabilmek için bu lastikler önemlidir.',
        ],
        cars: ['honda-civic-type-r-2023', 'porsche-911-gt3-2023'],
      },
      {
        title: '6. Arazi lastikleri (A/T ve M/T)',
        paragraphs: [
          'Pick-up ve arazi araçları için iki ana tür vardır. A/T (All Terrain) lastikler hem asfaltta hem de toprak, çakıl gibi zeminlerde dengeli bir performans sunar; çoğu kullanıcı için en mantıklı seçimdir. M/T (Mud Terrain) lastikler ise çok derin ve iri dişleriyle çamurda ve zorlu arazide üstündür, ama asfaltta gürültülü ve daha az konforludur.',
        ],
        cars: ['toyota-hilux-2023', 'ford-ranger-2023'],
      },
      {
        title: '7. Elektrikli otomobil lastikleri',
        paragraphs: [
          'Elektrikli otomobiller, ağır bataryaları ve anlık torkları nedeniyle lastikleri daha hızlı aşındırabilir. Elektrikli araçlar için geliştirilen lastikler daha yüksek yük taşıma kapasitesine, düşük yuvarlanma direncine (menzili artırmak için) ve motor sesi olmadığından daha belirgin duyulan yol gürültüsünü azaltmak için ses sönümleyici iç yapılara sahiptir. Elektrikli bir otomobilde yanlış lastik seçimi menzili gözle görülür şekilde düşürebilir.',
        ],
      },
      {
        title: 'Lastik ölçüsünü ve etiketini okumak',
        paragraphs: [
          'Lastiğin yan yüzeyindeki “205/55 R16 91V” gibi bir ifadede 205 lastiğin milimetre cinsinden genişliğini, 55 yan duvar yüksekliğinin genişliğe oranını (yüzde), R radyal yapıyı, 16 jant çapını (inç), 91 yük endeksini ve V hız sembolünü gösterir. Yeni lastik alırken otomobilinizin kullanım kılavuzunda belirtilen ölçü, yük endeksi ve hız sembolüne uymanız gerekir.',
          'Lastik etiketi ise üç önemli bilgi verir: yakıt verimliliği (yuvarlanma direnci), ıslak zeminde fren performansı ve dışarıya yayılan gürültü seviyesi. Özellikle ıslak zemin sınıfı güvenlik açısından en önemli değerdir.',
        ],
      },
      {
        title: 'Lastik alırken ve kullanırken kontrol listesi',
        list: [
          'Üretim tarihi: Yan yüzeydeki dört haneli DOT kodunun ilk iki hanesi haftayı, son iki hanesi yılı gösterir (ör. 3825 → 2025’in 38. haftası). Çok uzun süre depoda beklemiş lastiklerden kaçının.',
          'Diş derinliği: Yasal alt sınır 1,6 mm’dir; ama güvenlik açısından yaz lastiklerini 3 mm, kış lastiklerini 4 mm civarında değiştirmek önerilir.',
          'Yaş: Dişi bitmese bile lastik hamuru zamanla sertleşir; 6–10 yaşındaki lastiklerin durumunu bir uzmana kontrol ettirin.',
          'Basınç: Ayda bir ve uzun yol öncesinde lastik basıncını soğukken kontrol edin. Düşük basınç hem tüketimi artırır hem de lastiği hızlı aşındırır.',
          'Rot-balans: Düzensiz aşınma, direksiyonun bir tarafa çekmesi ya da titreme varsa rot-balans ayarı yaptırın.',
          'Dört lastik aynı olmalı: Özellikle dört çekerli otomobillerde farklı marka, model ya da aşınmadaki lastikler çekiş sistemine zarar verebilir.',
          'İkinci el lastikten kaçının: Geçmişini bilmediğiniz bir lastik, içten hasarlı olabilir.',
        ],
      },
      {
        title: 'Hangi sürücüye hangi lastik?',
        list: [
          'Kışı ılık geçen bir şehirde yaşıyor ve çoğunlukla şehir içinde kullanıyorsanız: Kaliteli bir dört mevsim lastik.',
          'Kışı soğuk ve karlı bir bölgede yaşıyorsanız: Yaz ve kış lastiği olarak iki ayrı takım.',
          'Spor otomobil ya da hot hatch kullanıyorsanız: Yazın performans (UHP) lastiği, kışın kaliteli bir kış lastiği.',
          'Elektrikli otomobil kullanıyorsanız: Elektrikli araçlara uygun, düşük yuvarlanma dirençli ve sessiz lastikler.',
          'Sık sık arazi ve toprak yola giriyorsanız: A/T arazi lastikleri.',
        ],
      },
    ],
  },
  {
    slug: 'kisa-hazirlik-kontrol-listesi',
    title: 'Kışa Hazırlık: Akü, Antifriz, Lastik ve Silecek Kontrol Listesi',
    subtitle: 'Soğuk havalar gelmeden otomobilinizde kontrol etmeniz gereken her şey; benzinli, dizel ve elektrikli otomobiller için pratik öneriler',
    description:
      'Kışa hazırlık rehberi: akü kontrolü, antifriz oranı, kış lastiği ve lastik basıncı, silecek ve cam suyu, farlar, dizel ve elektrikli otomobillerde kış önlemleri ve otomobilde bulundurulması gereken kış kiti.',
    date: '2026-10-31',
    dateLabel: '31 Ekim 2026',
    intro: [
      'Kış, otomobiller için yılın en zorlu dönemi. Soğuk hava aküyü zayıflatıyor, lastiklerin tutunmasını azaltıyor, motor yağını koyulaştırıyor ve küçük ihmalleri büyük arızalara dönüştürebiliyor. Üstelik kışın yaşanan arızalar genellikle en kötü anda, bir sabah işe yetişmeye çalışırken ya da karlı bir yolda ortaya çıkıyor.',
      'İyi haber şu: Kışın yaşanan arızaların büyük çoğunluğu, soğuklar başlamadan yapılacak birkaç basit kontrolle önlenebiliyor. Bu rehberde, otomobilinizi kışa hazırlarken nelere bakmanız gerektiğini adım adım anlatıyoruz.',
    ],
    sections: [
      {
        title: '1. Akü: kışın en sık arızalanan parça',
        paragraphs: [
          'Soğuk hava, akünün içindeki kimyasal tepkimeleri yavaşlatıyor ve kullanılabilir kapasitesini belirgin şekilde düşürüyor. Aynı anda motoru çalıştırmak için gereken güç artıyor; çünkü soğukta koyulaşan motor yağı motorun dönmesini zorlaştırıyor. Bu yüzden yaz boyunca sorunsuz çalışan yaşlı bir akü, ilk soğuk sabahta pes edebiliyor.',
          'Akünüz dört–beş yaşın üzerindeyse ya da son zamanlarda marş yaparken motor ağır dönüyorsa, kış başlamadan bir servise ya da akü bayisine test ettirin. Test birkaç dakika sürüyor ve genellikle ücretsiz. Start-stop sistemli otomobillerde AGM ya da EFB tipi özel aküler kullanıldığını unutmayın; akü değiştirirken aynı tipte akü takılmalı.',
        ],
      },
      {
        title: '2. Antifriz: motorun donmaya karşı kalkanı',
        paragraphs: [
          'Antifriz, motorun soğutma suyunun donmasını engelliyor. Donan soğutma suyu genleşerek motor bloğunu, radyatörü ve hortumları çatlatabilir; bu da çok pahalı bir onarım demek. Antifriz aynı zamanda soğutma sistemini paslanmaya karşı da koruyor.',
          'Servislerde birkaç saniyede yapılan bir ölçümle antifrizin kaç dereceye kadar koruduğu kontrol edilebiliyor. Türkiye’nin soğuk bölgelerinde en az eksi 35 dereceye kadar koruma önerilir. Antifriz eklerken otomobilinizin üreticisinin önerdiği türü kullanın; farklı türleri karıştırmak, soğutma sisteminde tortuya yol açabilir.',
        ],
      },
      {
        title: '3. Lastikler: yolla tek bağlantınız',
        paragraphs: [
          'Hava sıcaklığı yaklaşık 7 derecenin altına düştüğünde yaz lastiklerinin hamuru sertleşiyor ve tutunması azalıyor. Bu yüzden soğuk ve karlı bölgelerde yaşıyorsanız kış lastiğine geçmek en önemli güvenlik önlemi. Ayrıntılı bilgi için Lastik Seçiminin Önemi rehberimize bakabilirsiniz.',
          'Kış lastiği kullanmasanız bile lastik basıncını kontrol etmeyi unutmayın: Hava soğudukça lastiklerin içindeki hava büzülüyor ve basınç düşüyor. Düşük basınç hem tutunmayı azaltıyor hem de tüketimi artırıyor. Diş derinliğini de kontrol edin; karlı ve ıslak yollarda yeterli diş derinliği hayati önem taşıyor.',
        ],
      },
      {
        title: '4. Silecekler, cam suyu ve farlar: görmek ve görünmek',
        paragraphs: [
          'Kış, günlerin kısaldığı ve görüşün en çok zorlaştığı dönem. Sertleşmiş ya da çatlamış silecek lastikleri camı temizlemek yerine çizgi bırakıyor; silecek değiştirmek ucuz ve basit bir iş. Cam suyu deposuna mutlaka donmaya karşı katkılı kış cam suyu koyun; sade su donarak hem depoyu hem de pompayı bozabilir.',
          'Farların ve stop lambalarının çalıştığını kontrol edin; sisli ve karlı havada görünür olmak, görmek kadar önemli. Sararmış ve matlaşmış far camları da gece görüşü ciddi şekilde azaltıyor; basit bir far parlatma işlemiyle düzeltilebiliyor.',
        ],
      },
      {
        title: '5. Dizel ve elektrikli otomobiller için özel önlemler',
        paragraphs: [
          'Dizel yakıt çok soğuk havalarda içindeki parafinin donması nedeniyle jelleşebiliyor ve yakıt filtresini tıkayabiliyor. İstasyonlarda kış aylarında satılan dizel yakıt buna karşı katkılı oluyor; ama çok soğuk bölgelerde yakıt filtresinin zamanında değiştirilmiş olması da önemli. Kısa mesafelerde kullanılan dizellerde dizel partikül filtresinin kışın daha kolay tıkanabileceğini de unutmayın.',
          'Elektrikli otomobillerde soğuk hava menzili belirgin şekilde düşürüyor; çünkü hem batarya soğukta daha az verimli çalışıyor hem de kabini ısıtmak enerji harcıyor. Otomobil şarja bağlıyken kabini ve bataryayı önceden ısıtmak, menzil kaybını önemli ölçüde azaltıyor. Isı pompası olan otomobiller, kışın kabini çok daha az enerjiyle ısıtabiliyor.',
        ],
        cars: ['tesla-model-y-2026', 'kia-ev6-2026'],
      },
      {
        title: '6. Dört çeker kışın neye yarar, neye yaramaz?',
        paragraphs: [
          'Dört çeker, karlı ve buzlu yollarda kalkışta ve tırmanışta büyük avantaj sağlıyor. Ama otomobilin frenlemesini ve virajda tutunmasını iyileştirmiyor; bunları belirleyen asıl şey lastikler. Yaz lastikli dört çekerli bir otomobil, kış lastikli önden çekişli bir otomobilden daha geç durabilir. Bu yüzden dört çekerli bir otomobil kullanıyor olsanız bile kış lastiği hâlâ en önemli önlem.',
        ],
        cars: ['subaru-forester-2023', 'volkswagen-golf-r-2021'],
      },
      {
        title: 'Otomobilde bulundurulması gereken kış kiti',
        list: [
          'Buz kazıyıcı ve kar fırçası',
          'Kalın bir battaniye, eldiven ve yedek bere',
          'Akü takviye kablosu ya da taşınabilir akü takviye cihazı',
          'Kar zinciri (dağlık ve karlı bölgelerde yolculuk yapacaksanız) ve önceden bir kez takma denemesi',
          'El feneri ve yedek pil',
          'Küçük bir kürek ve kayan tekerleklerin altına koymak için kum ya da kedi kumu',
          'Su, uzun süre bozulmayan atıştırmalıklar ve telefon şarj kablosu',
          'Yansıtıcı yelek ve reflektör üçgeni',
        ],
      },
      {
        title: 'Kışın sürüş için kısa hatırlatmalar',
        list: [
          'Takip mesafenizi artırın; karlı ve buzlu yolda fren mesafesi birkaç katına çıkabiliyor.',
          'Ani gaz, ani fren ve ani direksiyon hareketlerinden kaçının; her şeyi yumuşak ve kademeli yapın.',
          'Köprüler ve gölgede kalan yollar, havanın görece ılık olduğu günlerde bile buzlanabilir.',
          'Yola çıkmadan önce camları ve tavanı kardan tamamen temizleyin; tavandaki kar frenlemede ön cama kayarak görüşü kapatabilir.',
          'Uzun yolculuklardan önce yol ve hava durumunu kontrol edin, yakıtınızı ya da şarjınızı yüksek tutun.',
        ],
      },
    ],
  },
];

// En yeni rehber en üstte (aynı tarihtekilerde sonradan eklenen önce)
export const GUIDES = GUIDE_LIST.map((g, i) => ({ g, i }))
  .sort((a, b) => b.g.date.localeCompare(a.g.date) || b.i - a.i)
  .map(({ g }) => g);

// Bir aracın geçtiği rehberler (inceleme sayfasındaki "ilgili yazılar" için)
export function guidesForCar(slug) {
  return GUIDES.filter(
    (g) => (g.items || []).some((it) => it.car === slug) || (g.sections || []).some((s) => (s.cars || []).includes(slug))
  );
}

export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug);
}
