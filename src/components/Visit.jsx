import { EMAIL, MAP_EMBED, MAPS_URL, PHONE_TEL, PHONE_TEXT } from '../data/config.js';
import { useLang } from '../i18n.jsx';
import { mailHref } from '../contact.js';
import { Icon } from './Icons.jsx';

export const WA_VISIT = 'https://wa.me/919963083339?text=Hello%20SSR%20Rice%20Mill%2C%20I%20would%20like%20to%20know%20about%20your%20rice%20varieties%2C%20prices%20and%20availability.%20Please%20share%20the%20details.';

/* email link: Gmail compose in a new tab on laptops, the phone's mail app on phones */
export function MailLink({ place, lang }) {
  const m = mailHref(place, lang);
  return <a data-mail={place} href={m.href} target={m.target} rel={m.rel}><Icon name="mail" />{' ' + EMAIL}</a>;
}

export default function Visit() {
  const { tr, ta, wa, lang } = useLang();
  return (
    <section id="visit" style={{ paddingTop: 0 }}>
      <div className="wrap visit rvl">
        <div className="vc">
          <h2>{tr('Visit the mill')}</h2>
          <address>{tr('Sri Sai Ramana Parboiled Modern Rice Mill')}<br />{tr('Miryalaguda – Kodad Rd,')}<br />{tr('Opposite HP Petrol Bunk,')}<br />{tr('Huzur Nagar, Telangana 508204')}</address>
          <p className="ct">
            <a href={'tel:' + PHONE_TEL}><Icon name="phone" />{' ' + PHONE_TEXT}</a>
            <MailLink place="visit" lang={lang} />
            <a className="wa" href={wa(WA_VISIT)} target="_blank" rel="noopener" aria-label={ta('Chat with us on WhatsApp (opens in a new tab)')}><Icon name="whatsapp" />{tr(' Chat on WhatsApp')}</a>
          </p>
          <div><a className="btn" target="_blank" rel="noopener" href={MAPS_URL}>{tr('Get directions ')}<Icon name="arrow-up-right" /></a></div>
        </div>
        <div className="mp"><iframe title="Map to SSR Rice Mill" loading="lazy" src={MAP_EMBED}></iframe></div>
      </div>
    </section>
  );
}
