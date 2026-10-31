// ---------------------------------------------------------------------------
// MODEL GEÇMİŞİ SAYFALARI (/model/:slug)
// Popüler modellerin bütün nesilleri, kasa kodları, öne çıkan özellikleri ve
// bilinen sorunları. cars: o nesle ait sitedeki incelemelerin adresleri.
// ---------------------------------------------------------------------------
export const MODELS = [
  {
    slug: 'bmw-3-serisi',
    make: 'BMW',
    name: '3 Serisi',
    title: 'BMW 3 Serisi nesilleri: E21’den G20’ye bütün kasalar',
    subtitle: '1975’ten bugüne yedi nesil, kasa kodları, her neslin öne çıkan özellikleri, bilinen sorunları ve hangisinin kime uygun olduğu',
    description:
      'BMW 3 Serisi’nin bütün nesilleri: E21, E30, E36, E46, E90, F30 ve G20 kasaların yılları, öne çıkan özellikleri, kronik sorunları ve ikinci el tavsiyeleri.',
    date: '2026-10-31',
    dateLabel: '31 Ekim 2026',
    intro: [
      '3 Serisi, 1975’ten bu yana üretiliyor ve BMW’nin tarihindeki en önemli model. Efsanevi 2002’nin yerini almak için tasarlanan ilk 3 Serisi’nden bu yana yedi nesil geçti; 2025’te model ellinci yılını kutladı. Bugün “sportif sedan” denince akla gelen ilk otomobillerden biri olmasının sebebi, her nesilde arkadan itişi ve sürücüye odaklı karakterini korumuş olması.',
      'BMW tutkunları nesilleri kasa kodlarıyla konuşur: “E30”, “F30”, “G20” gibi. Bu kodlardaki harfler, BMW’nin iç geliştirme sistemine dayanıyor. Eski nesillerdeki “E” harfi, Almanca “geliştirme” anlamına gelen Entwicklung kelimesinden geliyor; 2010’lardan sonra kodlar F ve G harfleriyle devam etti. Aşağıda her neslin yıllarını, öne çıkan özelliklerini ve bilinen sorunlarını bulabilirsiniz.',
    ],
    generations: [
      {
        code: 'E21',
        years: '1975–1983',
        title: 'İlk 3 Serisi',
        text: [
          'İlk 3 Serisi yalnızca iki kapılı bir sedan olarak sunuldu. Bugün bütün BMW’lerde gördüğümüz bir geleneği başlatan model oldu: Orta konsol ve göstergeler, sürücüye doğru hafifçe döndürülmüştü. Bu sürücü odaklı kokpit, BMW’nin tasarım imzalarından biri hâline geldi.',
          'İlk yıllarda yalnızca dört silindirli motorlarla sunulan E21’e, 1977’de altı silindirli motorlar eklendi. Bugün E21, klasik otomobil koleksiyoncularının ilgisini çeken, giderek nadirleşen bir model.',
        ],
      },
      {
        code: 'E30',
        years: '1982–1994',
        title: 'Efsanenin doğduğu kasa',
        text: [
          'E30, 3 Serisi’ni bir aileye dönüştürdü: dört kapılı sedan, Touring adı verilen station wagon ve açılır tavanlı Cabrio versiyonları bu nesilde geldi. Dört çekerli 325iX de bu nesilde sunuldu.',
          'E30’u efsane yapan model ise 1986’da tanıtılan ilk M3. BMW bu otomobili, Avrupa’daki tur otomobili yarışlarına katılabilmek için gereken sayıda yol otomobili üretme zorunluluğu nedeniyle geliştirdi. Pistlerde kazandığı sayısız şampiyonlukla M3, bugün otomobil tarihinin en değerli modellerinden biri. Normal E30’lar da Türkiye’de klasik otomobil meraklılarının ve drift tutkunlarının gözdesi.',
        ],
        highlights: ['İlk M3 (1986)', 'İlk Touring ve Cabrio', 'Dört çekerli 325iX'],
      },
      {
        code: 'E36',
        years: '1990–2000',
        title: 'Modernleşme',
        text: [
          'E36, E30’un köşeli çizgilerini bırakıp çok daha aerodinamik ve modern bir gövdeye geçti. Arka süspansiyonda kullanılan çok bağlantılı yapı, yol tutuşunu ve konforu belirgin şekilde iyileştirdi. Bu nesilde, kısa arka bölümüyle 3 Serisi Compact adlı bir hatchback versiyonu da sunuldu.',
        ],
        highlights: ['3 Serisi Compact (hatchback)', 'Altı silindirli M3'],
        issues: ['Plastik soğutma sistemi parçalarının (radyatör, su pompası, genleşme kabı) yaşla birlikte çatlaması'],
      },
      {
        code: 'E46',
        years: '1998–2006',
        title: 'En çok satan nesillerden biri',
        text: [
          'E46, 3 Serisi’nin en çok satan nesillerinden biri oldu. Zamansız tasarımı, kaliteli kabini ve dengeli sürüşüyle bugün bile birçok kişinin “en güzel 3 Serisi” olarak gördüğü nesil. Bu nesildeki M3, yüksek devirli atmosferik altı silindir motoruyla tüm zamanların en sevilen M3’lerinden biri olarak kabul ediliyor.',
        ],
        highlights: ['Atmosferik altı silindirli efsanevi M3', 'Zamansız tasarım'],
        issues: [
          'Arka şasi bağlantı noktalarında çatlama (özellikle güçlü versiyonlarda)',
          'Soğutma sistemi parçalarının yıpranması',
          'VANOS (değişken supap zamanlaması) arızaları',
        ],
      },
      {
        code: 'E90',
        years: '2005–2013',
        title: 'Turbo ve teknoloji dönemi',
        text: [
          'E90 nesliyle birlikte 3 Serisi’nde her gövdenin kendi kodu oldu: E90 sedan, E91 Touring, E92 Coupé ve E93 Cabrio. Bu nesilde patlak lastikle bir süre yola devam edebilen run-flat lastikler standart hâle geldi ve iDrive multimedya sistemi 3 Serisi’ne geldi.',
          '335i’deki çift turbolu altı silindir motor, turbo dönemini başlatan motorlardan biri oldu. E92 M3 ise 3 Serisi tarihindeki tek V8 motorlu M3 olarak ayrı bir yere sahip.',
        ],
        highlights: ['Tarihteki tek V8 motorlu M3', 'Çift turbolu 335i', 'Run-flat lastikler'],
        issues: ['335i’nin çift turbolu motorunda yüksek basınç yakıt pompası arızaları', 'Run-flat lastiklerin sert sürüşü'],
      },
      {
        code: 'F30',
        years: '2012–2019',
        title: 'Türkiye’de en çok sevilen kasa',
        text: [
          'F30 nesliyle birlikte coupé ve cabrio versiyonlar 3 Serisi’nden ayrılarak 4 Serisi adını aldı; 3 Serisi ailesine ise daha uzun ve pratik bir Gran Turismo (F34) versiyonu eklendi. ZF’nin 8 ileri otomatik şanzımanı ve turbo dört silindirli motorlar bu nesilde standart hâle geldi.',
          'F30, Türkiye’de en çok sevilen 3 Serisi kasası. Şık tasarımı, keyifli sürüşü ve geniş ikinci el piyasasıyla bugün hâlâ en çok aranan premium sedanlardan biri. Ama alırken motor seçimine çok dikkat etmek gerekiyor.',
        ],
        highlights: ['ZF 8 ileri otomatik', '3 Serisi Gran Turismo', 'Coupé’nin 4 Serisi’ne ayrılması'],
        issues: [
          '1.6 litrelik N13 motorda zamanlama zinciri ve yüksek basınç pompası sorunları',
          '2.0 turbo N20 motorun ilk üretim yıllarında zincir kılavuzu yıpranması',
          'Yoğun güneşte iç aksam plastiklerinde deformasyon',
        ],
        cars: ['bmw-3-serisi-2012', 'bmw-3-serisi-2013'],
      },
      {
        code: 'G20',
        years: '2019–günümüz',
        title: 'Bugünkü nesil',
        text: [
          'G20, 3 Serisi’ni teknoloji açısından bir üst sınıfa taşıdı: “Hey BMW” sesli asistanı, son metreleri ezberleyip geri geri kendi çıkaran manevra asistanı ve makyajla birlikte gelen tek parça kavisli ekran. Bu nesilde 3 Serisi tarihinde ilk kez station wagon gövdeli bir M3 Touring de üretildi.',
          'Türkiye’de G20, vergi avantajlı 1.6 litrelik motorla sunuluyor. Bu motor kâğıt üzerinde mütevazı görünse de G20’nin mükemmel şasisi ve 8 ileri şanzımanıyla birleşince keyifli bir sürüş sunuyor.',
        ],
        highlights: ['Kavisli ekran (makyajlı versiyon)', 'İlk M3 Touring', 'Türkiye’ye özel 1.6 motor'],
        issues: ['Soğutma sistemi bileşenlerinde erken yıpranma', 'Run-flat lastiklerin getirdiği sertlik'],
        cars: ['bmw-3-serisi-2019', 'bmw-3-serisi-2026'],
      },
    ],
    advice: [
      'Klasik bir otomobil ve hobi arıyorsanız E30 ve E46, bugün değeri giderek artan, en çok sevilen nesiller. Ama bu yaştaki otomobillerde pas, soğutma sistemi ve şasi kontrolü şart.',
      'Makul bir bütçeyle keyifli bir 3 Serisi arıyorsanız F30 en mantıklı nesil; yalnız motor seçimine ve bakım geçmişine çok dikkat edin. Bütçeniz elverirse N13 motorlu versiyonlar yerine N20 ya da daha yeni motorlu versiyonlara bakmanızı öneririz.',
      'Güncel teknoloji ve kafa rahatlığı istiyorsanız G20; özellikle makyajlı versiyon kabin ve teknoloji açısından bugünün beklentilerini fazlasıyla karşılıyor.',
    ],
  },
];

export const getModel = (slug) => MODELS.find((m) => m.slug === slug);

// Bir inceleme sayfasındaki aracın hangi modelin hangi nesline ait olduğunu bulur
export function modelForCar(carSlug) {
  for (const model of MODELS) {
    for (const gen of model.generations) {
      if (gen.cars?.includes(carSlug)) return { model, gen };
    }
  }
  return null;
}
