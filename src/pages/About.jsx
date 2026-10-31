import { Link } from 'react-router-dom';
import LegalLayout from '../components/LegalLayout.jsx';
import useTitle from '../lib/useTitle.js';
import { CARS, CATEGORIES } from '../data/cars.js';
import { SITE_NAME } from '../config.js';

export default function About() {
  useTitle('Hakkında');
  return (
    <LegalLayout title="Hakkında">
      <p>
        <strong>{SITE_NAME}</strong>, Türkiye pazarındaki otomobilleri tek bir soruya cevap vermek için değerlendiriyor:
        “Bu araba, bu parayla, bana uygun mu?” Şu anda {CATEGORIES.length} kategoride {CARS.length} aracın
        incelemesi ve sıralaması sitemizde yer alıyor.
      </p>

      <h2>Biz kimiz?</h2>
      <p>
        Otomobillere ilgimiz aslında çocukluktan itibaren başladı. Çocukken oyuncak araba koleksiyonları yapan
        insanlardık. Sonradan bu tutku, arabaları incelemeye ve analiz etmeye dönüştü. Sitemize kendi
        kullandığımız ve yakın çevremizin kullandığı arabaları eklemeye çalışıyoruz.
      </p>
      <p>
        Siteyi de ilk başta kendi incelemelerimiz bir yerde dursun, kaybolmasın diye kurmuştuk; ancak sonradan
        buralara kadar gelmeyi başardık. İncelemelerimiz, kendi kullandığımız ve yakın çevremizin kullandığı
        otomobillerdeki deneyimlerimize ve kapsamlı araştırmalarımıza dayanıyor.
      </p>
      <p>
        <strong>Kurucu ve editör:</strong> Ozan Ege Aydın
      </p>

      <h2>Nasıl değerlendiriyoruz?</h2>
      <p>
        Her aracı sürüşten güvenlik ve konfora, tüketimden malzeme kalitesine, güvenilirlikten ikinci el değerine
        kadar 10 başlıkta, 10 üzerinden puanlıyoruz. Genel puan bu başlıkların ağırlıklı ortalaması; kategori sıralamaları da
        genel puana göre otomatik oluşuyor. Ayrıntılar için{' '}
        <Link to="/puanlama">Nasıl puanlıyoruz?</Link> sayfasına bakabilirsiniz.
      </p>
      <p>
        Araçları Türkiye’de satılan versiyonlarıyla ele alıyoruz. Örneğin vergi nedeniyle ülkemize özel küçük hacimli
        motorlarla sunulan modelleri, yurt dışı versiyonlarıyla değil, burada satılan hâlleriyle değerlendiriyoruz.
      </p>

      <h2>Bağımsızlık ilkemiz</h2>
      <ul>
        <li>Puanlar ve sıralamalar satın alınamaz; reklam verenler, markalar veya bayiler puanlarımızı etkileyemez.</li>
        <li>Sitede reklam veya iş birliği içeren her içerik açıkça “Reklam” ya da “İş birliği” olarak işaretlenir.</li>
        <li>Satış ortaklığı (affiliate) bağlantıları kullandığımızda bunu bağlantının yanında belirtiriz.</li>
      </ul>

      <h2>Fiyatlar ve fotoğraflar</h2>
      <p>
        Sıfır araç fiyatları, belirtilen tarihteki tavsiye edilen liste fiyatlarıdır ve bilgi amaçlıdır; güncel fiyat
        ve kampanyalar için yetkili satıcıya danışın. Araç fotoğrafları, fotoğrafçıları ve lisansları her inceleme
        sayfasında belirtilerek Wikimedia Commons’taki serbest lisanslı görsellerden kullanılmaktadır.
      </p>

      <h2>Bize ulaşın</h2>
      <p>
        Bir hata mı gördünüz ya da incelenmesini istediğiniz bir araç mı var?{' '}
        <Link to="/iletisim">İletişim</Link> sayfasından bize yazabilirsiniz.
      </p>
    </LegalLayout>
  );
}
