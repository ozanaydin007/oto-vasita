import { Link } from 'react-router-dom';
import LegalLayout from '../components/LegalLayout.jsx';
import useTitle from '../lib/useTitle.js';
import { CONTACT_EMAIL, DATA_CONTROLLER, DATA_CONTROLLER_ADDRESS, LEGAL_UPDATED, SITE_NAME, SITE_URL } from '../config.js';
import { openCookieSettings } from '../lib/consent.js';

export default function Privacy() {
  useTitle('Gizlilik Politikası ve KVKK Aydınlatma Metni');
  return (
    <LegalLayout title="Gizlilik Politikası ve KVKK Aydınlatma Metni" updated={LEGAL_UPDATED}>
      <p>
        Bu metin, {SITE_URL} adresinde yayınlanan {SITE_NAME} internet sitesini ziyaret ettiğinizde kişisel
        verilerinizin nasıl işlendiğini, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (“KVKK”) 10. maddesi
        uyarınca açıklamak amacıyla hazırlanmıştır.
      </p>

      <h2>1. Veri sorumlusu</h2>
      <p>
        Kişisel verileriniz, veri sorumlusu sıfatıyla <strong>{DATA_CONTROLLER}</strong> ({DATA_CONTROLLER_ADDRESS})
        tarafından işlenmektedir. İletişim: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>2. İşlenen kişisel veriler</h2>
      <p>Sitemizde üyelik, yorum veya form bulunmamaktadır. Ziyaretiniz sırasında yalnızca aşağıdaki veriler işlenebilir:</p>
      <ul>
        <li>
          <strong>İşlem güvenliği verileri:</strong> IP adresi, tarayıcı ve cihaz bilgileri, ziyaret tarihi ve saati,
          görüntülenen sayfa. Bu veriler, siteyi barındıran altyapı sağlayıcısı tarafından sitenin güvenli ve
          kesintisiz çalışması için otomatik olarak kaydedilir.
        </li>
        <li>
          <strong>Çerez ve benzeri teknolojilerle elde edilen veriler:</strong> Yalnızca onay vermeniz hâlinde, ziyaret
          istatistikleri ve reklam amacıyla kullanılan çerez tanımlayıcıları ve kullanım bilgileri.
        </li>
        <li>
          <strong>İletişim verileri:</strong> Bize e-posta gönderirseniz adınız, e-posta adresiniz ve mesajınızın içeriği.
        </li>
      </ul>

      <h2>3. İşleme amaçları ve hukuki sebepler</h2>
      <ul>
        <li>
          Sitenin çalışması, güvenliğinin sağlanması ve kötüye kullanımın önlenmesi: KVKK md. 5/2-f (veri
          sorumlusunun meşru menfaati) ve md. 5/2-ç (hukuki yükümlülük).
        </li>
        <li>
          Taleplerinize ve sorularınıza cevap verilmesi: KVKK md. 5/2-f (meşru menfaat).
        </li>
        <li>
          Ziyaret istatistiklerinin ölçülmesi ile reklam gösterilmesi ve ölçülmesi: KVKK md. 5/1 uyarınca{' '}
          <strong>açık rızanız</strong>. Rıza vermezseniz bu amaçlarla çerez kullanılmaz ve siteyi kullanmaya devam
          edebilirsiniz.
        </li>
      </ul>

      <h2>4. Üçüncü taraf hizmetler ve verilerin aktarılması</h2>
      <p>Sitemiz aşağıdaki hizmet sağlayıcılardan yararlanmaktadır. Bu hizmetler kullanılırken tarayıcınız ilgili sunuculara doğrudan bağlanır ve IP adresiniz bu sağlayıcılara iletilir:</p>
      <ul>
        <li><strong>Barındırma ve içerik dağıtımı:</strong> Cloudflare, Inc.</li>
        <li><strong>Araç fotoğrafları:</strong> Wikimedia Foundation (Wikipedia / Wikimedia Commons)</li>
        <li><strong>Yazı tipleri:</strong> Google LLC (Google Fonts)</li>
        <li><strong>Reklam (yalnızca onay verirseniz):</strong> Google LLC (Google AdSense)</li>
      </ul>
      <p>
        Bu sağlayıcıların sunucuları yurt dışında bulunabilir. Kişisel verileriniz, yurt dışına yalnızca KVKK’nın
        9. maddesinde öngörülen şartlara uygun olarak aktarılır. Bunun dışında kişisel verileriniz, yalnızca
        kanunen yetkili kamu kurum ve kuruluşlarının talebi hâlinde ve kanuni sınırlar içinde paylaşılır.
      </p>

      <h2>5. Toplama yöntemi</h2>
      <p>
        Kişisel verileriniz, siteyi ziyaret etmeniz sırasında elektronik ortamda otomatik yollarla ve bize e-posta
        göndermeniz hâlinde doğrudan sizden toplanır.
      </p>

      <h2>6. Saklama süresi</h2>
      <p>
        Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen süreler boyunca saklanır;
        sürenin sona ermesiyle silinir, yok edilir veya anonim hâle getirilir. Çerez tercihiniz kendi tarayıcınızda
        saklanır ve tarayıcı verilerinizi temizlediğinizde silinir.
      </p>

      <h2>7. Haklarınız (KVKK md. 11)</h2>
      <p>Veri sorumlusuna başvurarak;</p>
      <ul>
        <li>kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
        <li>işlenmişse buna ilişkin bilgi talep etme,</li>
        <li>işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
        <li>yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
        <li>eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
        <li>KVKK’da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
        <li>düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
        <li>münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
        <li>kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
      </ul>
      <p>
        haklarına sahipsiniz. Başvurularınızı <a href={`mailto:${CONTACT_EMAIL}?subject=KVKK%20ba%C5%9Fvurusu`}>{CONTACT_EMAIL}</a>{' '}
        adresine iletebilirsiniz. Başvurunuz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.
      </p>

      <h2>8. Çerezler</h2>
      <p>
        Hangi çerezleri kullandığımız ve tercihlerinizi nasıl yönetebileceğiniz{' '}
        <Link to="/cerez-politikasi">Çerez Politikası</Link>’nda açıklanmıştır. Tercihlerinizi istediğiniz zaman{' '}
        <button type="button" onClick={openCookieSettings} className="text-link underline underline-offset-2">
          buradan
        </button>{' '}
        değiştirebilirsiniz.
      </p>

      <h2>9. Değişiklikler</h2>
      <p>Bu metin gerektiğinde güncellenebilir. Güncel metin her zaman bu sayfada yayınlanır.</p>
    </LegalLayout>
  );
}
