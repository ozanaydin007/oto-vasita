import { Link } from 'react-router-dom';
import LegalLayout from '../components/LegalLayout.jsx';
import useTitle from '../lib/useTitle.js';
import { CONTACT_EMAIL, SITE_NAME } from '../config.js';

function Mail({ subject, children }) {
  return <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`}>{children}</a>;
}

export default function Contact() {
  useTitle('İletişim');
  return (
    <LegalLayout title="İletişim">
      <p>
        {SITE_NAME} ekibine her konuda e-postayla ulaşabilirsiniz:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}><strong>{CONTACT_EMAIL}</strong></a>
      </p>
      <p>Mesajınızı doğru kişiye iletebilmemiz için konu satırını aşağıdaki başlıklardan birine göre yazmanızı rica ederiz.</p>

      <h2>Hata bildirimi ve öneriler</h2>
      <p>
        Yanlış bir teknik veri, güncel olmayan bir fiyat ya da hatalı bir fotoğraf gördüyseniz veya incelenmesini
        istediğiniz bir araç varsa <Mail subject="Hata bildirimi / öneri">bize yazın</Mail>. Hangi sayfada olduğunu
        belirtirseniz daha hızlı düzeltebiliriz.
      </p>

      <h2>Reklam ve iş birliği</h2>
      <p>
        Reklam, sponsorluk ve iş birliği tekliflerinizi <Mail subject="Reklam ve iş birliği">bu adrese</Mail> iletebilirsiniz.
        Puanlarımız ve sıralamalarımız hiçbir iş birliğinin konusu olamaz; iş birliği içeren içerikler sitede açıkça
        işaretlenir.
      </p>

      <h2>Kişisel verilerle ilgili başvurular (KVKK)</h2>
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınızla ilgili başvurularınızı{' '}
        <Mail subject="KVKK başvurusu">KVKK başvurusu</Mail> konusuyla gönderebilirsiniz. Ayrıntılar için{' '}
        <Link to="/gizlilik">Gizlilik Politikası ve KVKK Aydınlatma Metni</Link>’ne bakabilirsiniz.
      </p>
    </LegalLayout>
  );
}
