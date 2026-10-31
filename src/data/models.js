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
  {
    slug: "volkswagen-golf",
    make: "Volkswagen",
    name: "Golf",
    title: "Volkswagen Golf nesilleri: Golf 1’den Golf 8’e bütün kasalar",
    subtitle: "1974’ten bugüne sekiz nesil, her neslin öne çıkan özellikleri, bilinen sorunları ve hangisinin kime uygun olduğu",
    description: "Volkswagen Golf’ün bütün nesilleri: Golf 1’den Golf 8’e üretim yılları, öne çıkan özellikler, GTI ve R versiyonları, kronik sorunlar ve ikinci el tavsiyeleri.",
    intro: [
      "Golf, 1974’te efsanevi Vosvos’un (Beetle) yerini almak için tanıtıldı ve kısa sürede kompakt otomobil sınıfının ölçüsü hâline geldi. Elli yılda dünya genelinde 37 milyonu aşan satışıyla tarihin en çok satan otomobillerinden biri. Avrupa’da kompakt hatchback sınıfına bugün hâlâ “Golf sınıfı” deniyor.",
      "Golf nesilleri genellikle numaralarıyla anılıyor: Golf 1, Golf 2… Volkswagen’in iç kodlarında bu nesiller Mk1, Mk2 gibi isimlerle de geçiyor. Aşağıda her neslin yıllarını, öne çıkan özelliklerini ve bilinen sorunlarını bulabilirsiniz."
    ],
    generations: [
      {
        code: "Golf 1",
        years: "1974–1983",
        title: "Vosvos’un yerine",
        text: [
          "İtalyan tasarımcı Giorgetto Giugiaro’nun çizdiği köşeli Golf 1, Volkswagen’in motoru arkada, hava soğutmalı otomobillerden önden çekişli, su soğutmalı modern otomobillere geçişinin simgesi oldu. 1976’da tanıtılan Golf GTI ise “hot hatch” kavramını doğurdu."
        ],
        highlights: [
          "İlk GTI (1976)",
          "Giugiaro tasarımı"
        ]
      },
      {
        code: "Golf 2",
        years: "1983–1992",
        title: "Büyüyen ve olgunlaşan Golf",
        text: [
          "Golf 2 daha büyük, daha geniş ve daha konforlu bir otomobile dönüştü. Dört çekerli syncro versiyonu ve 16 supaplı GTI bu nesilde geldi. Sağlamlığıyla ün yapan Golf 2, bugün klasik otomobil meraklılarının gözdesi."
        ],
        highlights: [
          "Dört çekerli syncro",
          "GTI 16V"
        ]
      },
      {
        code: "Golf 3",
        years: "1991–1997",
        title: "Güvenlik ve dizel dönemi",
        text: [
          "Golf 3, 1992’de Avrupa’da Yılın Otomobili seçildi. Hava yastıkları ve daha sağlam bir gövdeyle güvenlik çıtasını yükseltti. Doğrudan enjeksiyonlu TDI dizel motor ve altı silindirli VR6 motor bu nesilde Golf’e geldi."
        ],
        highlights: [
          "Yılın Otomobili (1992)",
          "İlk TDI dizel",
          "VR6 motor"
        ]
      },
      {
        code: "Golf 4",
        years: "1997–2003",
        title: "Kalite sıçraması",
        text: [
          "Golf 4, kabin kalitesi ve işçilikte sınıfının çok üzerine çıktı; tamamen galvanizli gövdesi paslanmaya karşı çok dayanıklıydı. Bu nesildeki R32, “R” serisinin ilk modeli oldu ve dünyanın ilk seri üretim çift kavramalı şanzımanlı otomobillerinden biri olarak tarihe geçti."
        ],
        highlights: [
          "İlk R modeli (R32)",
          "Galvanizli gövde",
          "İlk çift kavramalı (DSG) şanzıman"
        ]
      },
      {
        code: "Golf 5",
        years: "2003–2008",
        title: "Yol tutuşunda yeni dönem",
        text: [
          "Golf 5’te arka süspansiyon çok bağlantılı bir yapıya geçti; bu da yol tutuşunu ve konforu belirgin şekilde iyileştirdi. GTI, bu nesilde turbo motoruyla eski parlaklığına kavuştu. Hem turbo hem kompresörlü küçük TSI motorlar da bu nesilde tanıtıldı."
        ],
        issues: [
          "1.4 TSI motorlarda zamanlama zinciri gerginliği sorunları"
        ]
      },
      {
        code: "Golf 6",
        years: "2008–2012",
        title: "Sessiz ve olgun",
        text: [
          "Golf 6, aslında Golf 5’in kapsamlı bir yenilemesiydi; daha sessiz bir kabin ve daha sade bir tasarım getirdi. Bu nesilde Türkiye’de 1.4 TSI ve 1.6 TDI motorlar ile DSG şanzıman çok yaygınlaştı."
        ],
        issues: [
          "1.4 TSI motorlarda zamanlama zinciri",
          "Kuru kavramalı yedi ileri DSG (DQ200) arızaları"
        ]
      },
      {
        code: "Golf 7",
        years: "2012–2019",
        title: "MQB altyapısı",
        text: [
          "Golf 7, Volkswagen grubunun bugün de kullanılan MQB altyapısına geçen ilk Golf oldu ve 2013’te Avrupa’da Yılın Otomobili seçildi. Daha hafif gövde, daha verimli motorlar ve makyajla gelen dijital gösterge paneli bu neslin öne çıkanları."
        ],
        highlights: [
          "Yılın Otomobili (2013)",
          "MQB altyapısı",
          "Dijital gösterge (makyajlı)"
        ],
        issues: [
          "Kuru kavramalı DSG (DQ200) arızaları"
        ]
      },
      {
        code: "Golf 8",
        years: "2019–günümüz",
        title: "Dijital Golf",
        text: [
          "Golf 8, fiziksel düğmelerin büyük kısmını dokunmatik yüzeylere taşıyarak dijitalleşti; hafif hibrit motorlar ve araçtan araca iletişim teknolojisi bu nesilde geldi. 2024’teki makyajla Golf’ün ellinci yılı kutlandı; daha büyük ekran ve aydınlatmalı kontroller geldi."
        ],
        highlights: [
          "Hafif hibrit (eTSI)",
          "Araçtan araca iletişim",
          "Makyajla gelen ışıklı logolar"
        ],
        issues: [
          "İlk yıllarda multimedya yazılımı sorunları",
          "Gece aydınlatması olmayan dokunmatik paneller (makyaj öncesi)",
          "eTSI motorlarda 48V akü"
        ],
        cars: [
          "volkswagen-golf-2021",
          "volkswagen-golf-gti-2022",
          "volkswagen-golf-r-2021",
          "volkswagen-golf-2026"
        ]
      }
    ],
    advice: [
      "Klasik bir otomobil arıyorsanız Golf 1 ve Golf 2’nin GTI versiyonları değeri giderek artan, aranan modeller.",
      "Makul bir bütçeyle sağlam bir ikinci el Golf arıyorsanız Golf 7 en mantıklı nesil; DSG’li versiyonlarda şanzımanın bakım geçmişini mutlaka kontrol edin.",
      "Güncel teknoloji istiyorsanız makyajlı Golf 8, ilk versiyonun yazılım sorunlarının büyük ölçüde giderildiği en olgun seçenek."
    ],
    date: "2026-10-31",
    dateLabel: "31 Ekim 2026"
  },
  {
    slug: "volkswagen-passat",
    make: "Volkswagen",
    name: "Passat",
    title: "Volkswagen Passat nesilleri: B1’den B9’a bütün kasalar",
    subtitle: "1973’ten bugüne dokuz nesil, kasa kodları, öne çıkan özellikler ve bilinen sorunlar",
    description: "Volkswagen Passat’ın bütün nesilleri: B1’den B9’a kasa kodları, üretim yılları, öne çıkan özellikler, kronik sorunlar ve ikinci el tavsiyeleri.",
    intro: [
      "Passat, 1973’ten bu yana üretiliyor ve Volkswagen’in en uzun soluklu modellerinden biri. Türkiye’de makam otomobili, aile sedanı ve statü sembolü olarak ayrı bir yere sahip; ikinci el piyasasının en hızlı satılan sedanlarından biri.",
      "Passat nesilleri “B” harfiyle başlayan kodlarla anılıyor: B5, B6, B8 gibi. Bu kodlar, Volkswagen grubunun orta sınıf altyapılarının sırasını gösteriyor."
    ],
    generations: [
      {
        code: "B1",
        years: "1973–1980",
        title: "İlk Passat",
        text: [
          "İlk Passat, Audi 80’in altyapısını kullanıyordu ve Giorgetto Giugiaro’nun dokunuşlarını taşıyan hızlı geri (fastback) gövdesiyle tanıtıldı. Volkswagen’in hava soğutmalı motorlardan su soğutmalı modern motorlara geçişinin ilk modellerinden biriydi."
        ]
      },
      {
        code: "B2",
        years: "1980–1988",
        title: "Sedan gövde",
        text: [
          "B2 neslinde Passat’ın sedan versiyonu Santana adıyla sunuldu. Santana, Çin’de yıllarca üretilerek orada bir efsaneye dönüştü."
        ]
      },
      {
        code: "B3 / B4",
        years: "1988–1997",
        title: "Izgarasız Passat",
        text: [
          "B3, ön tarafında ızgarası olmayan sıra dışı tasarımıyla hatırlanıyor; motor bu nesilde enine yerleştirildi. 1993’teki B4 yenilemesiyle Passat’a yeniden ızgara geldi."
        ]
      },
      {
        code: "B5",
        years: "1996–2005",
        title: "Audi A4 kardeşliği",
        text: [
          "B5, Audi A4 ile aynı altyapıyı paylaştı; motor yeniden boylamasına yerleştirildi ve 4MOTION dört çeker sistemi sunuldu. Kalite ve sessizlikte büyük bir sıçrama yaşandı."
        ],
        highlights: [
          "Audi A4 ile ortak altyapı",
          "4MOTION dört çeker"
        ]
      },
      {
        code: "B6",
        years: "2005–2010",
        title: "Golf altyapısına dönüş",
        text: [
          "B6 ile Passat yeniden enine motorlu altyapıya geçti. Daha geniş kabin ve modern motorlar getiren bu nesil, Türkiye’de çok yaygınlaştı."
        ],
        issues: [
          "Bazı dizel motorlarda enjektör ve turbo sorunları",
          "DSG şanzıman arızaları"
        ]
      },
      {
        code: "B7",
        years: "2010–2014",
        title: "Yenilenen B6",
        text: [
          "B7, aslında B6’nın kapsamlı bir yenilemesiydi; daha keskin bir tasarım ve güncellenen motorlarla geldi."
        ],
        issues: [
          "Kuru kavramalı DSG (DQ200) arızaları"
        ]
      },
      {
        code: "B8",
        years: "2014–2023",
        title: "Türkiye’nin makam otomobili",
        text: [
          "B8, MQB altyapısına geçti ve 2015’te Avrupa’da Yılın Otomobili seçildi. Dijital gösterge panelini sunan ilk Volkswagen oldu; makyajla Travel Assist sürüş destek sistemi ve IQ.LIGHT farlar geldi. Türkiye’de en çok sevilen Passat kasası."
        ],
        highlights: [
          "Yılın Otomobili (2015)",
          "Dijital gösterge",
          "Travel Assist (makyajlı)"
        ],
        issues: [
          "Kuru kavramalı DSG (DQ200) ve vites kolu sorunları"
        ],
        cars: [
          "volkswagen-passat-2016",
          "volkswagen-passat-2020"
        ]
      },
      {
        code: "B9",
        years: "2023–günümüz",
        title: "Yalnızca station wagon",
        text: [
          "B9 nesliyle Passat yalnızca station wagon (Variant) gövdeyle sunulmaya başladı; sedan görünümlü liftback rolünü Škoda Superb üstlendi. İki otomobil Slovakya’nın Bratislava şehrinde aynı fabrikada üretiliyor."
        ]
      }
    ],
    advice: [
      "Makul bir bütçeyle geniş ve konforlu bir aile sedanı arıyorsanız B8 en mantıklı Passat; DSG ve vites kolu geçmişini mutlaka kontrol edin.",
      "Daha eski nesillerde (B6, B7) dizel motorların bakım geçmişi ve şanzıman durumu, alım kararının en önemli belirleyicileri."
    ],
    date: "2026-10-31",
    dateLabel: "31 Ekim 2026"
  },
  {
    slug: "mercedes-benz-c-serisi",
    make: "Mercedes-Benz",
    name: "C Serisi",
    title: "Mercedes C Serisi nesilleri: 190’dan W206’ya bütün kasalar",
    subtitle: "Mercedes’in kompakt sedan geleneği: kasa kodları, öne çıkan özellikler, bilinen sorunlar ve ikinci el tavsiyeleri",
    description: "Mercedes-Benz C Serisi’nin bütün nesilleri: 190 (W201), W202, W203, W204, W205 ve W206 kasaların yılları, özellikleri, kronik sorunları ve ikinci el tavsiyeleri.",
    intro: [
      "C Serisi’nin hikâyesi, 1982’de tanıtılan ve “Bebek Benz” lakabıyla anılan 190 modeline uzanıyor. Mercedes’in ilk kompakt sedanı olan 190, markanın kalitesini daha geniş bir kitleye ulaştırdı. 1993’ten itibaren bu otomobil C Serisi adıyla üretilmeye devam etti.",
      "Mercedes nesilleri “W” harfiyle başlayan kasa kodlarıyla anılıyor: W204, W205 gibi. W harfi Almanca “Wagen”, yani otomobil kelimesinden geliyor. Station wagon versiyonlar S, coupé’ler C harfiyle kodlanıyor."
    ],
    generations: [
      {
        code: "W201 (190)",
        years: "1982–1993",
        title: "“Bebek Benz”",
        text: [
          "190, Mercedes’in ilk kompakt sedanıydı ve aşırı sağlam yapısıyla ün kazandı. Arka süspansiyonda kullanılan çok bağlantılı yapı, döneminde sınıfının en gelişmişiydi. 190E 2.3-16 ve Evolution versiyonları, Alman tur otomobili şampiyonasındaki başarılarıyla efsaneleşti."
        ],
        highlights: [
          "Çok bağlantılı arka süspansiyon",
          "DTM efsanesi 190E Evolution"
        ]
      },
      {
        code: "W202",
        years: "1993–2000",
        title: "İlk C Serisi",
        text: [
          "W202, C Serisi adını taşıyan ilk nesil oldu. Station wagon versiyonu da bu nesilde sunuldu. AMG’nin bu nesilde geliştirdiği C 36 AMG, Mercedes ile AMG arasındaki resmî iş birliğinin ilk ürünlerinden biriydi."
        ],
        issues: [
          "Gövdede paslanma"
        ]
      },
      {
        code: "W203",
        years: "2000–2007",
        title: "Yuvarlak hatlar",
        text: [
          "W203, Mercedes’in o dönemki yuvarlak tasarım dilini taşıyordu. Bu nesilde üç kapılı bir Sportcoupé versiyonu da üretildi."
        ],
        issues: [
          "Gövdede paslanma (özellikle ilk yıllarda)",
          "Elektronik arızalar"
        ]
      },
      {
        code: "W204",
        years: "2007–2014",
        title: "Güven veren dönüş",
        text: [
          "W204, kalitede ciddi bir toparlanma getirdi; Avantgarde donanımda ızgaranın ortasındaki büyük yıldız logosu ilk kez C Serisi’nde kullanıldı. C 63 AMG, atmosferik V8 motoruyla bu neslin en çok sevilen versiyonu oldu."
        ],
        issues: [
          "Kompresörlü motorlarda zamanlama zinciri ve gergi sorunları"
        ]
      },
      {
        code: "W205",
        years: "2014–2021",
        title: "“Küçük S Serisi”",
        text: [
          "W205, S Serisi’nden ilham alan zarif tasarımıyla “küçük S Serisi” olarak anıldı ve sınıfında havalı süspansiyon sunan ilk otomobil oldu. Makyajla EQ Boost hafif hibrit sistem ve dijital gösterge geldi. Türkiye’de en çok satan C Serisi nesillerinden biri."
        ],
        highlights: [
          "Sınıfında ilk havalı süspansiyon",
          "EQ Boost hafif hibrit (makyajlı)",
          "Biturbo V8’li C 63 AMG"
        ],
        issues: [
          "Uzun süreli kullanımda kabin trim sesleri"
        ],
        cars: [
          "mercedes-benz-c-serisi-2015",
          "mercedes-benz-c-serisi-2020",
          "mercedes-amg-c-63-s-2021"
        ]
      },
      {
        code: "W206",
        years: "2021–günümüz",
        title: "Dijital C Serisi",
        text: [
          "W206’da bütün motorlar hafif hibrit oldu; torpidoda dikey büyük ekran, parmak izi okuyucu ve opsiyonel arka aks yönlendirmesi geldi. Kabin, bir üst sınıfın lüksüne en çok yaklaşan C Serisi kabini."
        ],
        highlights: [
          "Dikey dokunmatik ekran",
          "Arka aks yönlendirmesi seçeneği",
          "Bütün motorlar hafif hibrit"
        ],
        issues: [
          "Ön takımdan gelen sesler",
          "Ekran donmaları ve yazılım sorunları"
        ],
        cars: [
          "mercedes-benz-c-serisi-2026"
        ]
      }
    ],
    advice: [
      "Klasik bir Mercedes arıyorsanız 190 (W201), sağlamlığı ve zamansız tasarımıyla en çok aranan modellerden.",
      "İkinci elde fiyat, konfor ve kalite dengesi açısından en mantıklı nesil W205; özellikle makyajlı versiyonlar daha modern bir kabin sunuyor.",
      "Güncel teknoloji ve lüks istiyorsanız W206; ön takım ve yazılım güncellemelerini garanti süresince takip etmek önemli."
    ],
    date: "2026-10-31",
    dateLabel: "31 Ekim 2026"
  },
  {
    slug: "mercedes-benz-e-serisi",
    make: "Mercedes-Benz",
    name: "E Serisi",
    title: "Mercedes E Serisi nesilleri: W124’ten W214’e bütün kasalar",
    subtitle: "Mercedes’in iş sedanı geleneği: kasa kodları, öne çıkan özellikler, bilinen sorunlar ve ikinci el tavsiyeleri",
    description: "Mercedes-Benz E Serisi’nin bütün nesilleri: W124, W210, W211, W212, W213 ve W214 kasaların yılları, özellikleri, kronik sorunları ve ikinci el tavsiyeleri.",
    intro: [
      "E Serisi, Mercedes’in kalbinde yer alan iş sedanı. Bu sınıfın kökleri çok daha eskiye uzansa da “E Serisi” adı ilk kez 1993’te, efsanevi W124 kasada kullanılmaya başlandı. Taksiden makam otomobiline kadar her rolde kendini kanıtlamış bir model.",
      "Türkiye’de E Serisi, hem prestij hem de dayanıklılık sembolü olarak görülüyor. Nesiller W harfiyle başlayan kasa kodlarıyla anılıyor."
    ],
    generations: [
      {
        code: "W124",
        years: "1984–1995",
        title: "Efsanevi dayanıklılık",
        text: [
          "W124, otomobil tarihinin en dayanıklı otomobillerinden biri olarak kabul ediliyor; yüz binlerce kilometre yapmış örnekleri hâlâ taksi olarak çalışıyor. E Serisi adı bu neslin makyajlı versiyonuyla, 1993’te kullanılmaya başlandı. Porsche’nin katkısıyla geliştirilen 500 E versiyonu bugün koleksiyonerlerin gözdesi."
        ],
        highlights: [
          "E Serisi adını alan ilk nesil (1993)",
          "Porsche katkılı 500 E"
        ]
      },
      {
        code: "W210",
        years: "1995–2002",
        title: "İkiz yuvarlak farlar",
        text: [
          "W210, ikiz yuvarlak farlarıyla Mercedes tasarımında yeni bir dönemi başlattı. Ancak bu nesil, maliyet düşürme dönemine denk geldiği için kalite sorunlarıyla da hatırlanıyor."
        ],
        issues: [
          "Gövdede ciddi paslanma"
        ]
      },
      {
        code: "W211",
        years: "2002–2009",
        title: "Elektronik dönemi",
        text: [
          "W211, havalı süspansiyon ve elektronik destekli fren sistemi gibi ileri teknolojiler getirdi. Ancak bu elektronik fren sistemi, ilk yıllarda yaşanan arızalar nedeniyle geniş çaplı geri çağırmalara konu oldu."
        ],
        issues: [
          "Elektronik fren sistemi (SBC) arızaları",
          "Elektronik sorunlar (ilk yıllarda)"
        ]
      },
      {
        code: "W212",
        years: "2009–2016",
        title: "Kalitede toparlanma",
        text: [
          "W212 ile E Serisi’nin kalite ünü yeniden sağlamlaştı. Makyajla birlikte dört farlı yüz yerini tek parça farlara bıraktı."
        ]
      },
      {
        code: "W213",
        years: "2016–2023",
        title: "Geniş ekranlar",
        text: [
          "W213, sürücünün önünden orta konsola uzanan geniş ekran düzeniyle S Serisi’nin teknolojisini E Serisi’ne taşıdı. Makyajla birlikte elin direksiyonda olup olmadığını algılayan dokunmatik direksiyon ve daha gelişmiş sürüş destek sistemleri geldi."
        ],
        highlights: [
          "Geniş çift ekran",
          "Gelişmiş yarı otonom sürüş destek sistemleri"
        ],
        issues: [
          "Uzun süreli kullanımda kabin trim sesleri"
        ],
        cars: [
          "mercedes-benz-e-serisi-2020"
        ]
      },
      {
        code: "W214",
        years: "2023–günümüz",
        title: "Superscreen dönemi",
        text: [
          "W214’te torpidoyu baştan sona kaplayan Superscreen, ön yolcu ekranı, ekranın üzerindeki kamera ve gelişmiş MBUX sistemi geldi. Türkiye’de vergi avantajlı 1.5 litrelik hafif hibrit motorla sunuluyor."
        ],
        highlights: [
          "Superscreen ve yolcu ekranı",
          "Burmester 4D ses sistemi seçeneği"
        ],
        cars: [
          "mercedes-benz-e-serisi-2026"
        ]
      }
    ],
    advice: [
      "Klasik ve ölümsüz bir Mercedes arıyorsanız W124; doğru bakılmış örnekler hâlâ yıllarca sorunsuz kullanılabiliyor.",
      "İkinci elde konfor ve teknoloji dengesi için W213 en mantıklı nesil.",
      "W210 ve W211 alırken paslanma ve elektronik sistemlerin durumunu bir uzmana mutlaka kontrol ettirin."
    ],
    date: "2026-10-31",
    dateLabel: "31 Ekim 2026"
  },
  {
    slug: "bmw-5-serisi",
    make: "BMW",
    name: "5 Serisi",
    title: "BMW 5 Serisi nesilleri: E12’den G60’a bütün kasalar",
    subtitle: "1972’den bugüne sekiz nesil, M5’in hikâyesi, öne çıkan özellikler ve bilinen sorunlar",
    description: "BMW 5 Serisi’nin bütün nesilleri: E12, E28, E34, E39, E60, F10, G30 ve G60 kasaların yılları, özellikleri, kronik sorunları ve ikinci el tavsiyeleri.",
    intro: [
      "5 Serisi, 1972’de tanıtıldı ve BMW’nin bugünkü rakamlı model isimlendirmesini başlatan ilk otomobil oldu. Adındaki 5, BMW’nin model yelpazesindeki konumunu gösteriyordu. O günden bu yana 5 Serisi, iş sedanı sınıfında konfor ile sürüş keyfini dengeleyen otomobilin tanımı oldu.",
      "1984’te tanıtılan ilk M5, “süper sedan” kavramının doğuşu sayılıyor. Aşağıda her neslin yıllarını, öne çıkan özelliklerini ve bilinen sorunlarını bulabilirsiniz."
    ],
    generations: [
      {
        code: "E12",
        years: "1972–1981",
        title: "İlk 5 Serisi",
        text: [
          "E12, BMW’nin rakamlı model isimlerini kullanan ilk otomobili oldu. Sürücüye dönük kokpit ve sportif karakter bu nesilden itibaren 5 Serisi’nin imzası hâline geldi."
        ]
      },
      {
        code: "E28",
        years: "1981–1988",
        title: "İlk M5",
        text: [
          "E28, 1984’te tanıtılan ilk M5 sayesinde tarihe geçti. Efsanevi M1 süper otomobilinden türetilen altı silindirli motoru, sıradan görünen bir sedanı dönemin en hızlı sedanlarından biri yapıyordu."
        ],
        highlights: [
          "İlk M5 (1984)"
        ]
      },
      {
        code: "E34",
        years: "1988–1996",
        title: "Touring ve V8",
        text: [
          "E34 ile 5 Serisi’ne ilk kez station wagon (Touring) versiyonu ve V8 motorlar geldi. Dört çekerli versiyonu da bu nesilde sunuldu."
        ],
        highlights: [
          "İlk 5 Serisi Touring",
          "V8 motorlar"
        ]
      },
      {
        code: "E39",
        years: "1995–2004",
        title: "Birçoklarına göre en iyi 5 Serisi",
        text: [
          "E39, zamansız tasarımı, mükemmel şasisi ve kaliteli kabiniyle birçok tutkunun gözünde tüm zamanların en iyi iş sedanı. V8 motorlu E39 M5, bugün en çok aranan modern klasiklerden biri."
        ],
        highlights: [
          "V8 motorlu efsanevi M5"
        ],
        issues: [
          "Soğutma sistemi parçalarının yaşla yıpranması"
        ]
      },
      {
        code: "E60",
        years: "2003–2010",
        title: "Cesur tasarım",
        text: [
          "E60, BMW’nin dönemin tasarım şefi Chris Bangle’ın cesur ve tartışmalı tasarım dilini taşıyordu. iDrive multimedya sistemi ve V10 motorlu M5 bu neslin öne çıkanları."
        ],
        highlights: [
          "V10 motorlu M5"
        ],
        issues: [
          "M5’in V10 motorunda kol yatağı aşınması",
          "Elektronik arızalar"
        ]
      },
      {
        code: "F10",
        years: "2010–2017",
        title: "En başarılı nesillerden",
        text: [
          "F10, 5 Serisi’nin en çok satan nesillerinden biri oldu. ZF’nin 8 ileri otomatik şanzımanı, ön cama yansıtmalı gösterge ve gece görüş kamerası gibi teknolojiler bu nesilde yaygınlaştı. Türkiye’de uzun yıllar makam otomobili olarak tercih edildi."
        ],
        highlights: [
          "ZF 8 ileri otomatik",
          "Ön cama yansıtmalı gösterge"
        ],
        issues: [
          "Bazı dizel motorlarda motorun arkasında yer alan zamanlama zincirinin uzaması"
        ],
        cars: [
          "bmw-5-serisi-2012"
        ]
      },
      {
        code: "G30",
        years: "2017–2023",
        title: "Teknoloji ve denge",
        text: [
          "G30, hareket kontrolü, otomobili dışarıdan park ettirebilen ekranlı anahtar ve gelişmiş sürüş destek sistemleri getirdi. Dört çekerli ilk M5 de bu nesilde (F90) üretildi. Türkiye’de vergi avantajlı 1.6 litrelik motorla sunuldu."
        ],
        highlights: [
          "Dört çekerli ilk M5",
          "Ekranlı anahtarla uzaktan park"
        ],
        cars: [
          "bmw-5-serisi-2021",
          "bmw-5-serisi-touring-2021",
          "bmw-m5-2020"
        ]
      },
      {
        code: "G60",
        years: "2023–günümüz",
        title: "Elektrikli i5 ile birlikte",
        text: [
          "G60 neslinde 5 Serisi ilk kez tamamen elektrikli bir versiyonla (i5) birlikte sunuldu. Kavisli ekran, ışıklı ızgara seçeneği ve gelişmiş otonom sürüş destek sistemleri bu neslin öne çıkanları."
        ],
        highlights: [
          "İlk elektrikli 5 Serisi (i5)",
          "Kavisli ekran"
        ],
        cars: [
          "bmw-5-serisi-2026"
        ]
      }
    ],
    advice: [
      "Modern bir klasik arıyorsanız E39, sürüş keyfi ve tasarımıyla en çok sevilen nesil; soğutma sistemi ve süspansiyonun durumunu kontrol ettirin.",
      "İkinci elde konfor ve teknoloji dengesi için F10 ve G30 en mantıklı nesiller; F10’da dizel motorların zamanlama zinciri geçmişine dikkat edin."
    ],
    date: "2026-10-31",
    dateLabel: "31 Ekim 2026"
  },
  {
    slug: "renault-clio",
    make: "Renault",
    name: "Clio",
    title: "Renault Clio nesilleri: Clio 1’den Clio 6’ya bütün kasalar",
    subtitle: "1990’dan bugüne altı nesil, Bursa üretimi, öne çıkan özellikler ve bilinen sorunlar",
    description: "Renault Clio’nun bütün nesilleri: Clio 1’den Clio 6’ya üretim yılları, Williams ve V6 gibi özel versiyonlar, kronik sorunlar ve ikinci el tavsiyeleri.",
    intro: [
      "Clio, 1990’da Renault 5’in yerini almak için tanıtıldı ve Avrupa’nın en çok satan otomobilleri arasında sürekli zirvede yer aldı. İki kez Avrupa’da Yılın Otomobili seçilen tek model olma özelliğine sahip.",
      "Türkiye için Clio’nun ayrı bir önemi var: Uzun yıllardır Bursa’daki Oyak Renault fabrikasında üretiliyor ve buradan Avrupa’ya ihraç ediliyor."
    ],
    generations: [
      {
        code: "Clio 1",
        years: "1990–1998",
        title: "Renault 5’in yerine",
        text: [
          "İlk Clio, 1991’de Avrupa’da Yılın Otomobili seçildi. Formula 1’deki Williams ortaklığından adını alan Clio Williams, bugün en çok aranan küçük hot hatch’lerden biri."
        ],
        highlights: [
          "Yılın Otomobili (1991)",
          "Clio Williams"
        ]
      },
      {
        code: "Clio 2",
        years: "1998–2012",
        title: "Uzun ömürlü nesil",
        text: [
          "Clio 2, çok uzun süre üretimde kaldı. Motoru arka koltukların yerine yerleştirilmiş, arkadan itişli Clio V6 bu neslin en sıra dışı versiyonu oldu. Sedan versiyonu Clio Symbol, Bursa’da üretilerek Türkiye’de çok yaygınlaştı."
        ],
        highlights: [
          "Ortadan motorlu Clio V6",
          "Bursa üretimi Clio Symbol"
        ]
      },
      {
        code: "Clio 3",
        years: "2005–2014",
        title: "İkinci Yılın Otomobili ödülü",
        text: [
          "Clio 3, 2006’da Avrupa’da Yılın Otomobili seçilerek Clio’ya ikinci ödülünü getirdi. Daha büyük ve daha güvenli gövdesiyle sınıfının çıtasını yükseltti."
        ],
        highlights: [
          "Yılın Otomobili (2006)"
        ]
      },
      {
        code: "Clio 4",
        years: "2012–2019",
        title: "Yeni tasarım dili",
        text: [
          "Clio 4, Renault’nun yeni tasarım dilinin ilk modeliydi; arka kapı kolları pencere çerçevesine gizlenerek otomobile coupé havası verildi. 1.5 dCi motoruyla Türkiye’de çok yaygınlaştı."
        ],
        highlights: [
          "Gizli arka kapı kolları"
        ],
        issues: [
          "1.5 dCi motorda bakım ihmal edildiğinde kuşinet sorunları"
        ],
        cars: [
          "renault-clio-2016"
        ]
      },
      {
        code: "Clio 5",
        years: "2019–2025",
        title: "Kalite sıçraması",
        text: [
          "Clio 5, kabin kalitesinde büyük bir sıçrama yaptı; Formula 1’den ilham alan E-Tech hibrit versiyonu bu nesilde geldi. Avrupa’nın en çok satan otomobilleri arasında zirveye yerleşti."
        ],
        highlights: [
          "E-Tech tam hibrit",
          "Yarı otonom sürüş destek sistemleri"
        ],
        issues: [
          "EDC şanzımanda düşük hızlarda sarsıntı"
        ],
        cars: [
          "renault-clio-2020",
          "renault-clio-2021",
          "renault-clio-e-tech-2023"
        ]
      },
      {
        code: "Clio 6",
        years: "2025–günümüz",
        title: "Bugünkü nesil",
        text: [
          "Yeni Clio, keskin ve iddialı tasarımı ve Google tabanlı multimedya sistemiyle geldi. Bursa’da üretilmeye devam ediyor."
        ],
        cars: [
          "renault-clio-2026"
        ]
      }
    ],
    advice: [
      "Ekonomik bir ikinci el arıyorsanız Clio 4’ün 1.5 dCi versiyonu çok düşük tüketim sunuyor; yağ bakım geçmişini mutlaka kontrol edin.",
      "Modern bir kabin ve güçlü bir motor arıyorsanız Clio 5, fiyat/performans açısından en mantıklı nesil."
    ],
    date: "2026-10-31",
    dateLabel: "31 Ekim 2026"
  },
  {
    slug: "skoda-octavia",
    make: "Škoda",
    name: "Octavia",
    title: "Škoda Octavia nesilleri: 1959’dan Octavia 4’e bütün kasalar",
    subtitle: "Škoda’nın en çok satan modelinin hikâyesi, öne çıkan özellikler, bilinen sorunlar ve ikinci el tavsiyeleri",
    description: "Škoda Octavia’nın bütün nesilleri: 1959’daki ilk Octavia’dan Octavia 4’e üretim yılları, RS versiyonları, kronik sorunlar ve ikinci el tavsiyeleri.",
    intro: [
      "Octavia adı ilk kez 1959’da kullanıldı ve Latince “sekizinci” anlamına geliyor; Škoda’nın İkinci Dünya Savaşı’ndan sonra ürettiği sekizinci model olmasından geliyor. Modern Octavia ise 1996’da, Škoda’nın Volkswagen grubuna katılmasından sonra yeniden doğdu ve markanın en çok satan modeli oldu.",
      "Octavia’nın başarısının sırrı, Volkswagen mekaniğini bir üst sınıfı aratmayan geniş bir kabin ve dev bir bagajla, daha uygun bir fiyata sunması."
    ],
    generations: [
      {
        code: "Octavia (1959)",
        years: "1959–1971",
        title: "İlk Octavia",
        text: [
          "İlk Octavia, savaş sonrası Çekoslovakya’sının önemli otomobillerinden biriydi. Ralli yarışlarındaki başarılarıyla Škoda’nın motor sporları geleneğinin temelini attı."
        ]
      },
      {
        code: "Octavia 1",
        years: "1996–2010",
        title: "Modern Octavia’nın doğuşu",
        text: [
          "Volkswagen grubunun Golf 4 ile paylaştığı altyapıyı kullanan ilk modern Octavia, Škoda’nın marka algısını tamamen değiştirdi. Uygun fiyatı ve dayanıklılığıyla çok uzun süre üretimde kaldı."
        ]
      },
      {
        code: "Octavia 2",
        years: "2004–2013",
        title: "RS ve büyüme",
        text: [
          "Octavia 2 daha büyük ve daha kaliteli bir otomobile dönüştü; sportif RS versiyonu bu nesilde geniş bir hayran kitlesi edindi."
        ],
        issues: [
          "1.4 TSI motorlarda zamanlama zinciri",
          "Kuru kavramalı DSG (DQ200) arızaları"
        ]
      },
      {
        code: "Octavia 3",
        years: "2013–2020",
        title: "MQB altyapısı",
        text: [
          "Octavia 3, MQB altyapısına geçerek hem hafifledi hem de büyüdü. Makyajla gelen ikiye bölünmüş ön farlar tartışmalı bulunsa da bu nesil Türkiye’de çok sevildi."
        ],
        issues: [
          "Kuru kavramalı DSG (DQ200) arızaları"
        ]
      },
      {
        code: "Octavia 4",
        years: "2020–günümüz",
        title: "Dijital Octavia",
        text: [
          "Octavia 4’te vites kolu yerini küçük bir seçiciye bıraktı, hafif hibrit motorlar ve büyük ekranlar geldi. 2024’teki makyajla daha büyük ekran ve yapay zekâ destekli sesli asistan Laura eklendi."
        ],
        highlights: [
          "Hafif hibrit motorlar",
          "Yapay zekâ destekli sesli asistan (makyajlı)"
        ],
        issues: [
          "İlk yıllarda yazılım sorunları",
          "eTSI motorlarda 48V akü"
        ],
        cars: [
          "skoda-octavia-2021",
          "skoda-octavia-2026"
        ]
      }
    ],
    advice: [
      "Geniş ve ekonomik bir aile otomobili arıyorsanız Octavia 3, ikinci elde fiyat ve alan dengesi açısından çok mantıklı; DSG’li versiyonlarda şanzıman geçmişine dikkat edin.",
      "Daha modern bir kabin istiyorsanız makyajlı Octavia 4, ilk versiyonun yazılım sorunlarının giderildiği en olgun seçenek."
    ],
    date: "2026-10-31",
    dateLabel: "31 Ekim 2026"
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
