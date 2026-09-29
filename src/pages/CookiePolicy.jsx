import { Link } from 'react-router-dom';
import LegalLayout from '../components/LegalLayout.jsx';
import useTitle from '../lib/useTitle.js';
import { LEGAL_UPDATED, SITE_NAME } from '../config.js';
import { openCookieSettings } from '../lib/consent.js';

export default function CookiePolicy() {
  useTitle('Çerez Politikası');
  return (
    <LegalLayout title="Çerez Politikası" updated={LEGAL_UPDATED}>
      <p>
        Çerezler, ziyaret ettiğiniz internet sitelerinin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Bu sayfa,{' '}
        {SITE_NAME}’nun çerezleri ve benzeri teknolojileri (tarayıcı depolaması gibi) hangi amaçlarla kullandığını açıklar.
      </p>

      <h2>Kullandığımız çerez türleri</h2>

      <h3>Zorunlu</h3>
      <p>
        Sitenin çalışması için gereklidir ve onayınıza bağlı değildir. Örneğin çerez tercihinizi hatırlamak için
        tarayıcınızda <code>otovaro-cerez-tercihi</code> adında bir kayıt tutulur. Bu kayıt yalnızca sizin
        tarayıcınızda saklanır ve bize gönderilmez.
      </p>

      <h3>Analitik (onayınıza bağlı)</h3>
      <p>
        Hangi sayfaların ne kadar okunduğunu ölçerek sitemizi geliştirmemize yardımcı olur. Yalnızca onay vermeniz
        hâlinde kullanılır.
      </p>

      <h3>Reklam (onayınıza bağlı)</h3>
      <p>
        Reklam ortaklarımızın (ör. Google AdSense) sitede reklam göstermesi, reklamların performansını ölçmesi ve
        ilgi alanlarınıza göre reklam sunabilmesi için kullanılır. Yalnızca onay vermeniz hâlinde yüklenir. Google’ın
        verileri nasıl kullandığı hakkında bilgi için{' '}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          Google’ın açıklamasına
        </a>{' '}
        bakabilirsiniz.
      </p>

      <h2>Üçüncü taraf içerikler</h2>
      <p>
        Araç fotoğrafları Wikimedia sunucularından, yazı tipleri Google Fonts’tan yüklenir. Bu içerikler
        yüklenirken tarayıcınız ilgili sunuculara bağlanır; ayrıntılar{' '}
        <Link to="/gizlilik">Gizlilik Politikası</Link>’nda yer almaktadır.
      </p>

      <h2>Tercihlerinizi yönetme</h2>
      <p>
        Onayınızı istediğiniz zaman{' '}
        <button type="button" onClick={openCookieSettings} className="text-link underline underline-offset-2">
          çerez tercihlerinizi açarak
        </button>{' '}
        verebilir veya geri alabilirsiniz. Ayrıca tarayıcınızın ayarlarından çerezleri silebilir veya
        engelleyebilirsiniz; bu durumda sitenin bazı özellikleri beklendiği gibi çalışmayabilir.
      </p>
    </LegalLayout>
  );
}
