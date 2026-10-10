import { CRITERIA } from '../data/criteria.js';
import { formatScore, formatPrice } from './scoring.js';

// ---------------------------------------------------------------------------
// TAM İNCELEME ÜRETİCİ
// Her aracın puanlarından, teknik verilerinden ve kategorisinden okunabilir
// bir inceleme metni oluşturur. Puanı değiştirdiğinizde metin de kendiliğinden
// değişir.
//
// Kendi metninizi yazmak isterseniz cars.js içinde araca şu alanları ekleyin;
// yazdığınız alanlar otomatik metnin yerine geçer:
//   editorial: 'Editörün görüşü altındaki ek paragraf',
//   review: {
//     giris: '...', surus: '...', guvenlik: '...', konfor: '...', tuketim: '...',
//     malzeme: '...', tasarim: '...', fiyat: '...', teknoloji: '...',
//     guvenilirlik: '...', ikinciel: '...', sonuc: '...',
//   },
//   reviewExtra: { konfor: '...' },  // otomatik ya da yazılmış metnin SONUNA eklenir
// ---------------------------------------------------------------------------

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

// Aynı araç her zaman aynı cümleyi alır, farklı araçlar farklı cümleler alır.
const pick = (list, car, salt) => list[hash(car.slug + salt) % list.length];

function band(v) {
  if (v >= 9.3) return 'mukemmel';
  if (v >= 8.6) return 'cokiyi';
  if (v >= 7.8) return 'iyi';
  if (v >= 6.8) return 'orta';
  if (v >= 5.5) return 'zayif';
  return 'kotu';
}

const NAMES = {
  surus: 'sürüş',
  guvenlik: 'güvenlik',
  konfor: 'konfor',
  tuketim: 'tüketim',
  malzeme: 'malzeme kalitesi',
  tasarim: 'tasarım',
  fiyat: 'fiyat/değer',
  teknoloji: 'teknoloji',
  guvenilirlik: 'güvenilirlik',
  ikinciel: 'ikinci el değeri',
};

const AUDIENCE = {
  surus: 'direksiyon başında keyif arayanlar',
  guvenlik: 'güvenliği her şeyin önünde tutan aileler',
  konfor: 'uzun yolda yorulmak istemeyenler',
  tuketim: 'yakıt masrafını düşük tutmak isteyenler',
  malzeme: 'kabin kalitesine önem verenler',
  tasarim: 'yolda dikkat çekmek isteyenler',
  fiyat: 'bütçesini akıllıca kullanmak isteyenler',
  teknoloji: 'teknolojiyi seven sürücüler',
  guvenilirlik: 'uzun yıllar sorunsuz bir otomobil isteyenler',
  ikinciel: 'aracını birkaç yılda bir yenileyenler',
};

const WEAK_AUDIENCE = {
  surus: 'Sürüş keyfi arayanlar',
  guvenlik: 'Güvenliği birinci öncelik sayanlar',
  konfor: 'Konforu ön planda tutanlar',
  tuketim: 'Yakıt masrafına duyarlı olanlar',
  malzeme: 'Kabin kalitesine önem verenler',
  tasarim: 'Tasarıma önem verenler',
  fiyat: 'Bütçesi sıkı olanlar',
  teknoloji: 'Teknoloji meraklıları',
  guvenilirlik: 'Uzun vadeli dayanıklılık arayanlar',
  ikinciel: 'Aracını birkaç yılda bir değiştirenler',
};

const isEV = (car) => car.fuel === 'Elektrik';
const clean = (t) => t.replace(/\s+/g, ' ').replace(/\s([.,;])/g, '$1').trim();

// "2,9 sn" -> "2,9"
function seconds(car) {
  const m = car.specs?.hizlanma?.match(/(\d+(?:,\d+)?)/);
  return m ? m[1] : null;
}

function rangeKm(car) {
  const m = car.specs?.motor?.match(/~\s?(\d+)\s?km/);
  return m ? `Üreticinin açıkladığı menzil yaklaşık ${m[1]} km.` : '';
}

function powerSentence(car) {
  const hp = car.hp;
  if (hp == null) return '';
  if (hp >= 400) return 'Gaza her dokunuşunuzda sizi koltuğa yapıştıran bir güç var; açık konuşalım, bu his insanı gerçekten bağımlı yapıyor.';
  if (hp >= 200) return 'Motor her durumda güçlü hissettiriyor; sollamalar için hiç plan yapmanıza gerek kalmıyor.';
  if (hp >= 130) return 'Motoru günlük kullanımda fazlasıyla yeterli; ne şehirde ne otoyolda “keşke biraz daha güçlü olsaydı” diyorsunuz.';
  if (hp >= 100) return 'Motor şehirde yeterli, ama dolu bir araçla otoyolda sollama yaparken biraz planlı olmak gerekiyor.';
  return 'Motor bu gövde için zayıf kalıyor; özellikle yokuşlarda ve dolu araçla bunu belirgin biçimde hissediyorsunuz.';
}

// ---------------------------------------------------------------------------
// Başlık başlık cümleler
// ---------------------------------------------------------------------------
const TEXT = {
  surus: {
    mukemmel: [
      (c) => `Direksiyonu elinize aldığınız anda bunun sıradan bir otomobil olmadığını anlıyorsunuz. ${powerSentence(c)} Değerlendirmemize göre virajlardaki yol tutuşu kusursuza yakın; direksiyon başında geçen her dakika keyfe dönüşüyor.`,
      (c) => `Sürüş dinamikleri açısından değerlendirdiğimiz en iyi otomobiller arasında. Direksiyon her tepkiyi net biçimde iletiyor, şasi ise sınırları zorladığınızda bile sakinliğini koruyor. ${powerSentence(c)}`,
    ],
    cokiyi: [
      (c) => `Sürüşü gerçekten keyifli. Direksiyon hassas, gövde virajlarda dengeli. ${powerSentence(c)} Sırf keyif için bile yola çıkmak isteyeceğiniz otomobillerden.`,
      (c) => `Yol tutuşu ve direksiyon hissi sınıfının üst seviyesinde. ${powerSentence(c)} Virajlı bir yolda yüzünüzde bir gülümseme bırakmayı başarıyor.`,
    ],
    iyi: [
      (c) => `Sürüşü olgun ve güven verici. ${powerSentence(c)} Heyecan peşinde değilseniz her durumda sizi memnun edecek bir karakteri var.`,
      (c) => `Günlük kullanımda sürüş dengeli ve zahmetsiz. ${powerSentence(c)} Sportif bir otomobil değil ama ne istediğinizi iyi anlıyor.`,
    ],
    orta: [
      (c) => `Sürüş tarafında sıradan bir otomobil. ${powerSentence(c)} İşini görüyor ama direksiyon başında özel bir his yaşatmıyor.`,
      (c) => `Yol tutuşu yeterli, ancak direksiyon hissi zayıf ve gövde virajlarda belirgin biçimde yatıyor. ${powerSentence(c)}`,
    ],
    zayif: [
      (c) => `Sürüş bu otomobilin güçlü tarafı değil. ${powerSentence(c)} Virajlarda gövde kolayca yatıyor, direksiyon ise yol hakkında pek bilgi vermiyor.`,
      (c) => `Direksiyon belirsiz, süspansiyon ise kötü yollarda dengesini kaybediyor. ${powerSentence(c)}`,
    ],
    kotu: [
      (c) => `Günümüz trafiğinde sürmek gerçekten yorucu. ${powerSentence(c)} Frenlerden yol tutuşa kadar her şey dikkatli ve temkinli bir kullanım istiyor.`,
    ],
  },
  guvenlik: {
    mukemmel: [
      () => 'Güvenlik konusunda içiniz tamamen rahat olabilir. Sağlam gövde yapısı ve gelişmiş sürüş destek sistemleriyle listemizdeki en güvenli otomobiller arasında.',
      () => 'Aileniz için gönül rahatlığıyla önerebileceğimiz bir otomobil. Sürüş destek sistemleri doğal ve güven verici çalışıyor, gövde yapısı ise sınıfının en iyilerinden.',
    ],
    cokiyi: [
      () => 'Güvenlik seviyesi çok iyi. Sürüş destek sistemleri yerinde ve doğru zamanda devreye giriyor; yorucu değil, yardımcı oluyor.',
      () => 'Sağlam gövdesi ve kapsamlı güvenlik donanımıyla ailenizi emanet edebileceğiniz bir otomobil.',
    ],
    iyi: [
      () => 'Güvenlik donanımı sınıfı için yeterli seviyede; gövde sağlam, temel destek sistemleri sorunsuz çalışıyor.',
      () => 'Güvenlik tarafında eksik bir yanı yok; yeni nesil rakiplerin bazı gelişmiş sistemleri bulunmasa da temel koruma çok iyi.',
    ],
    orta: [
      () => 'Güvenlik tarafında ortalama bir tablo var. Temel donanımlar mevcut, ancak yeni nesil rakiplerin sunduğu destek sistemlerinin bir kısmı eksik.',
    ],
    zayif: [
      () => 'Güvenlik bu otomobilin en zayıf noktalarından. Donanımı ve çarpışma dayanımı günümüz standartlarının gerisinde kalıyor; aileniz için almadan önce iki kez düşünün.',
    ],
    kotu: [
      () => 'Açık konuşmak gerekirse güvenlik neredeyse yok denecek seviyede. Modern bir otomobilin sunduğu korumayı burada beklemeyin.',
    ],
  },
  konfor: {
    mukemmel: [
      () => 'Değerlendirmemize göre konforda listemizdeki en iyi araçlardan biri. Süspansiyon bozuk yolları sanki hiç yokmuş gibi siliyor, kabin ise otoyol hızlarında bile sessiz.',
      () => 'Uzun yolda saatlerce sürdükten sonra bile yorgunluk hissetmiyorsunuz. Koltuklar, süspansiyon ve ses yalıtımı kusursuza yakın.',
    ],
    cokiyi: [
      () => 'Konfor seviyesi sınıfının üzerinde. Süspansiyon yumuşak ama gevşek değil, koltuklar uzun yolda bile rahat.',
      () => 'Kabin sessiz, süspansiyon bozuk yolları başarıyla filtreliyor; uzun yol için çok iyi bir yol arkadaşı.',
    ],
    iyi: [
      () => 'Konfor günlük kullanım için gayet iyi. Süspansiyon dengeli, koltuklar destekleyici; yalnızca bozuk zeminlerde biraz sertleşiyor.',
      () => 'Kabin rahat ve yeterince sessiz; uzun yolda da sizi yormuyor.',
    ],
    orta: [
      () => 'Konfor ortalama seviyede. Kısa yollarda sorun yok ama uzun yolda yol ve rüzgâr sesi kendini hissettiriyor.',
      () => 'Süspansiyon ayarı sert tarafta; bozuk yollarda kabine sarsıntı taşınıyor, ses yalıtımı da ortalama.',
    ],
    zayif: [
      () => 'Konfor zayıf. Süspansiyon sert ve gürültülü, koltuklar uzun yolda yeterli destek vermiyor.',
    ],
    kotu: [
      () => 'Konfor adına söylenecek pek bir şey yok; her çukuru ve her rüzgâr sesini kabinde hissediyorsunuz.',
    ],
  },
  tuketim: {
    mukemmel: [
      (c) => isEV(c)
        ? 'Enerji verimliliği olağanüstü; şarj istasyonu aramak aklınıza bile gelmiyor. Menzil kaygısını bu kadar az yaşatan elektrikli az bulunur.'
        : 'Bu otomobili kullanırken yakıt almayı neredeyse unutuyorsunuz, o kadar az yakıyor. Sınıfı düşünüldüğünde tüketimi gerçekten etkileyici.',
      (c) => isEV(c)
        ? 'Sınıfının en verimli elektriklilerinden; günlük kullanımda menzil hesabı yapmanıza gerek kalmıyor.'
        : 'Deposunu doldurduktan sonra benzin istasyonlarının önünden umursamadan geçip gidiyorsunuz; işletme maliyeti en düşük otomobillerden biri.',
    ],
    cokiyi: [
      (c) => isEV(c)
        ? 'Enerji verimliliği çok iyi; şehir içi ve kısa yolculuklarda menzil hesabı yapmanızı gerektirmiyor.'
        : 'Tüketim konusunda cüzdanınızı yormuyor; karma kullanımda bile sınıfının en ekonomikleri arasında.',
      (c) => isEV(c)
        ? 'Verimliliği sınıfının üstünde; uzun yolda bile şarj molaları can sıkıcı olmuyor.'
        : 'Depo uzun süre dayanıyor; yakıt masrafını düşük tutmak isteyenleri memnun edecek bir otomobil.',
    ],
    iyi: [
      (c) => isEV(c)
        ? 'Verimlilik iyi seviyede; günlük kullanımda rahatça yetiyor, uzun yolda ise biraz planlama istiyor.'
        : 'Tüketimi makul; ne şaşırtıyor ne de dert oluyor.',
    ],
    orta: [
      (c) => isEV(c)
        ? 'Verimlilik ortalama; gerçek kullanımda menzil açıklanan değerin belirgin şekilde altına inebiliyor.'
        : c.hp >= 400
          ? 'Bu performansın bir bedeli var ve tüketimi göze almak gerekiyor; yine de gücüne göre şaşırtıcı derecede makul.'
          : 'Tüketimi ortalama; kabul edilebilir ama rakiplerin bir kısmı daha az yakıyor.',
    ],
    zayif: [
      (c) => isEV(c)
        ? 'Verimlilik bu otomobilin güçlü tarafı değil; hızlı sürüşte menzil gözle görülür biçimde eriyor.'
        : c.hp >= 400
          ? 'Bu performansın bedeli yakıt faturasında çıkıyor; hızlı sürüşte tüketim çok daha yükseğe çıkıyor.'
          : 'Yakıt tüketimi yüksek; özellikle şehir içinde benzin istasyonunu sık ziyaret ediyorsunuz.',
    ],
    kotu: [
      (c) => c.hp >= 400
        ? 'Tüketim tam bir süper otomobil tüketimi; ama bu otomobili alan birinin buna aldıracağını sanmıyoruz.'
        : 'Tüketim ciddi bir dezavantaj; her gün kullanmak cüzdanı yoruyor.',
    ],
  },
  malzeme: {
    mukemmel: [
      () => 'Kabine girdiğiniz anda kaliteyi hissediyorsunuz. Dokunduğunuz her yüzey özenle işlenmiş, montaj kalitesi kusursuz.',
      () => 'İşçilik öyle iyi ki kabindeki en küçük düğme bile özenle tasarlanmış hissi veriyor. Malzeme kalitesinde listemizdeki en iyiler arasında.',
    ],
    cokiyi: [
      () => 'Malzeme kalitesi sınıfının üst seviyesinde; yumuşak yüzeyler ve özenli montaj kabine premium bir hava katıyor.',
    ],
    iyi: [
      () => 'Kabin malzemeleri fiyatına göre tatmin edici. Göz hizasındaki yüzeyler kaliteli, alt panellerde ise sert plastikler var.',
    ],
    orta: [
      () => 'Malzeme kalitesi ortalama; sert plastikler kabinin büyük bölümünde kendini gösteriyor.',
    ],
    zayif: [
      () => 'Kabin malzemeleri ucuz hissettiriyor. Sert plastikler ve sıradan montaj kalitesi yüzünden zamanla gıcırtılar beklemek gerekiyor.',
    ],
    kotu: [
      () => 'Kabin kalitesi çok zayıf; yaşını ve maliyet odaklı üretimini her detayda belli ediyor.',
    ],
  },
  tasarim: {
    mukemmel: [
      () => 'Tasarımı nefes kesici. Park ettiğiniz her yerde başları kendine çeviriyor ve yıllar geçse de eskimeyecek bir çizgiye sahip.',
      () => 'Yolda gördüğümüz en güzel otomobillerden biri; her açıdan ayrı bir karakter gösteriyor.',
    ],
    cokiyi: [
      () => 'Tasarımı çok başarılı; hem dışarıdan dikkat çekiyor hem de kabin düzeni mantıklı ve şık.',
    ],
    iyi: [
      () => 'Tasarım dengeli ve modern; kimseyi rahatsız etmeyecek, ama çok da dikkat çekmeyecek.',
    ],
    orta: [
      () => 'Tasarımı sade. Kabin ergonomisi işini görüyor ama göz dolduran bir yanı yok.',
    ],
    zayif: [
      () => 'Tasarımı yaşını belli ediyor; hem dış çizgiler hem de kabin düzeni artık eski görünüyor.',
    ],
    kotu: [
      () => 'Tasarım ve ergonomi günümüz beklentilerinin çok gerisinde.',
    ],
  },
  fiyat: {
    mukemmel: [
      (c) => c.used
        ? 'İkinci el piyasasında sunduğu değer çok yüksek; aldığınız paranın karşılığını fazlasıyla veriyor.'
        : 'Fiyatına göre sunduğu donanım ve kalite olağanüstü; bu parayla daha fazlasını bulmak çok zor.',
    ],
    cokiyi: [
      (c) => c.used
        ? 'İkinci elde fiyat/değer dengesi çok iyi; sunduğu kaliteye göre makul bir bütçeyle sahip olunabiliyor.'
        : 'Fiyat/değer dengesi çok iyi; ödediğiniz paranın karşılığını alıyorsunuz.',
    ],
    iyi: [
      () => 'Fiyat/değer dengesi makul; ne ucuz ne de pahalı hissettiriyor.',
    ],
    orta: [
      () => 'Fiyat/değer dengesi ortalama. Aynı bütçeyle daha fazla donanım sunan rakipleri de incelemenizi öneririz.',
    ],
    zayif: [
      () => 'Fiyatına göre sunduğu paket zayıf; bu bütçeyle daha iyi seçenekler bulmak mümkün.',
    ],
    kotu: [
      () => 'Fiyatına göre sunduğu paket çok zayıf; bu parayla çok daha iyi otomobiller alınabiliyor.',
    ],
  },
  teknoloji: {
    mukemmel: [
      () => 'Teknoloji tarafında gerçek bir vitrin. Ekranlar hızlı ve net, bağlantı özellikleri eksiksiz; sürüş destek sistemleri de en güncel seviyede.',
    ],
    cokiyi: [
      () => 'Multimedya sistemi hızlı ve kullanışlı; dijital gösterge ve telefon bağlantısı gibi özelliklerle teknolojide sınıfının önünde.',
    ],
    iyi: [
      () => 'Teknoloji donanımı yeterli; multimedya ekranı temel ihtiyaçları karşılıyor, ancak arayüz en iyi rakipler kadar hızlı değil.',
    ],
    orta: [
      () => 'Teknoloji tarafı sade. Temel bağlantı özellikleri var ama ekranlar ve arayüz yaşını hissettiriyor.',
    ],
    zayif: [
      () => 'Teknoloji donanımı çok sınırlı; günümüz sürücüsünün alıştığı özelliklerin çoğu eksik.',
    ],
    kotu: [
      () => 'Teknoloji adına neredeyse hiçbir şey yok; radyo ve temel göstergelerle yetinmeniz gerekiyor.',
    ],
  },
  guvenilirlik: {
    mukemmel: [
      () => 'Güvenilirlik konusunda neredeyse efsane seviyesinde. Motor, şanzıman ve yürüyen aksamda bilinen kronik bir sorunu yok; düzenli bakımla yüz binlerce kilometreyi dert etmeden yapıyor.',
      () => 'Uzun vadede başınızı ağrıtmayacak otomobillerin başında geliyor. Servise neredeyse yalnızca periyodik bakım için gidiyorsunuz.',
    ],
    cokiyi: [
      () => 'Güvenilirlik çok iyi. Mekanik aksamı sağlam ve bilinen ciddi bir kronik sorunu yok; bakımları zamanında yapıldığında uzun yıllar sorunsuz kullanılıyor.',
    ],
    iyi: [
      () => 'Güvenilirlik genel olarak iyi. Büyük bir kronik sorunu yok, ancak bazı parçalar yüksek kilometrede ilgi isteyebiliyor; bakım geçmişi önemli.',
    ],
    orta: [
      () => 'Güvenilirlik ortalama. Kullanıcıların sık şikâyet ettiği bazı kronik noktalar var; almadan önce bakım kayıtlarını inceleyin ve ekspertizden geçirin.',
    ],
    zayif: [
      () => 'Güvenilirlik zayıf halkalardan biri. Motor, şanzıman veya elektronik tarafında bilinen kronik sorunlar var ve arıza masrafları yüksek olabiliyor.',
    ],
    kotu: [
      () => 'Güvenilirlik ciddi bir risk. Yaşı ve bilinen sorunları nedeniyle beklenmedik masraflara hazırlıklı olmak gerekiyor.',
    ],
  },
  ikinciel: {
    mukemmel: [
      () => 'İkinci elde tam bir altın. Değerini çok iyi koruyor, satışa çıkardığınızda kısa sürede alıcı buluyor ve piyasada temiz örnek bulmak zor değil.',
    ],
    cokiyi: [
      () => 'İkinci el piyasasında çok aranan bir model. Değer kaybı düşük, satmak istediğinizde uzun süre beklemiyorsunuz.',
    ],
    iyi: [
      () => 'İkinci el performansı iyi; değer kaybı makul ve alıcı bulmak zor değil.',
    ],
    orta: [
      () => 'İkinci el tarafı ortalama. Değer kaybı belirgin ve satışı rakiplerine göre biraz daha uzun sürebiliyor.',
    ],
    zayif: [
      () => 'İkinci elde zorlanan bir model. Hızlı değer kaybediyor, alıcı kitlesi dar ve temiz bir örnek bulmak kolay değil.',
    ],
    kotu: [
      () => 'İkinci el açısından çok zor bir tercih: temiz örnek bulmak neredeyse imkânsız, satmak da uzun sürebiliyor.',
    ],
  },
};

function sortedCriteria(car) {
  return CRITERIA.map((c) => ({ key: c.key, v: car.ratings[c.key] })).sort((a, b) => b.v - a.v);
}

function verdict(car) {
  const s = car.score;
  const name = `${car.make} ${car.model}`;
  if (s >= 9) return `Kısacası ${name}, kategorisinin zirvesinde ve bizi neredeyse hiçbir konuda hayal kırıklığına uğratmıyor. Bir arkadaşımız sorsa gözümüzü kırpmadan öneririz.`;
  if (s >= 8.3) return `Kısacası ${name}, sınıfının en iyileri arasında ve gönül rahatlığıyla önerebileceğimiz bir otomobil.`;
  if (s >= 7.5) return `Kısacası ${name}, güçlü yanları zayıf yanlarından ağır basan, mantıklı bir tercih. Bizce almadan önce eksilerinin sizin için ne kadar önemli olduğunu tartmanız yeterli.`;
  if (s >= 6.5) return `Kısacası ${name} belirli ihtiyaçlar için mantıklı olabilir; ama almadan önce rakiplerini de mutlaka test sürüşüyle deneyin.`;
  if (s >= 5.5) return `Kısacası ${name}, ancak bütçesi çok kısıtlı olanlara önerebileceğimiz bir otomobil.`;
  return `Kısacası ${name} günlük kullanım için önermediğimiz bir otomobil. Nostalji ya da çok düşük bütçe tek kriterinizse bir göz atılabilir.`;
}

// Editörün görüşü altındaki ek paragraf
export function buildEditorial(car) {
  if (car.editorial) return car.editorial;
  const [best, second] = sortedCriteria(car);
  const worst = sortedCriteria(car).at(-1);
  const parts = [];
  parts.push(
    best.v >= 7.5
      ? `Puan karnesinde en çok ${NAMES[best.key]} (${formatScore(best.v)}) ve ${NAMES[second.key]} (${formatScore(second.v)}) başlıklarında parlıyor.`
      : `Puan karnesinde görece en iyi olduğu başlıklar ${NAMES[best.key]} (${formatScore(best.v)}) ve ${NAMES[second.key]} (${formatScore(second.v)}); ancak hiçbirinde gerçekten parlamıyor.`
  );
  if (worst.v < best.v - 0.4) {
    parts.push(`En çok geliştirilmesi gereken başlık ise ${NAMES[worst.key]} (${formatScore(worst.v)}).`);
  } else {
    parts.push('Puanları birbirine çok yakın; belirgin bir zayıf halkası yok.');
  }
  if (car.year < 1990) {
    parts.push('Kimlere uygun? Günlük ulaşım aracı arayanlara değil, klasik otomobil tutkunlarına ve nostalji arayanlara.');
  } else if (car.score < 6.5) {
    parts.push('Kimlere uygun? Ancak çok düşük bütçeyle, yalnızca A noktasından B noktasına gitmek isteyenlere.');
  } else {
    parts.push(`Kimlere uygun? Özellikle ${AUDIENCE[best.key]} ve ${AUDIENCE[second.key]} için doğru bir tercih.`);
  }
  if (worst.v < 7 && worst.v < best.v - 0.4) {
    parts.push(`${WEAK_AUDIENCE[worst.key]} ise rakiplerine de göz atmalı.`);
  }
  return clean(parts.join(' '));
}

// Tam inceleme: giriş, 10 başlık ve sonuç
export function buildReview(car, category) {
  const o = car.review || {};
  const intro = [];
  intro.push(
    `${car.year} ${car.make} ${car.model}, ${car.version} donanımıyla ${category.title.toLocaleLowerCase('tr-TR')} listemizde ${car.rank}. sırada yer alıyor ve 10 başlığın ağırlıklı ortalamasında ${formatScore(car.score)} puan alıyor.`
  );
  intro.push('Bu inceleme; üretici verileri, bağımsız güvenlik testleri, kullanıcı deneyimleri ve ikinci el piyasası gibi kamuya açık bilgilere dayanan editoryal bir değerlendirmedir.');
  if (car.year < 1990) {
    intro.push('Bu bir klasik otomobil; puanlarımızı günümüz otomobilleriyle aynı ölçütlere göre verdik, bu yüzden nostaljik değerini puanlara ancak kısmen yansıtabildik.');
  } else if (car.used) {
    intro.push(`Bu bir ikinci el değerlendirmesi. Alırken bakım kayıtlarını, hasar geçmişini ve kilometreyi mutlaka kontrol edin; puanlarımız iyi durumdaki bir ${car.year} model örneği esas alıyor.`);
  } else if (car.price != null) {
    intro.push(`Türkiye’de ${formatPrice(car.price)} başlangıç fiyatıyla satılıyor.`);
  }

  const sections = CRITERIA.map((c) => {
    const v = car.ratings[c.key];
    const base = o[c.key] || pick(TEXT[c.key][band(v)], car, c.key)(car);
    const extra = car.reviewExtra?.[c.key];
    const text = extra ? `${base} ${extra}` : base;
    return { key: c.key, label: c.label, score: v, text: clean(text) };
  });

  return {
    intro: clean(o.giris || intro.join(' ')),
    sections,
    conclusion: clean(o.sonuc || verdict(car)),
  };
}
