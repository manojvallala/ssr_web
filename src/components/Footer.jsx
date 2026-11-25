import { MAPS_URL, PHONE_TEL, PHONE_TEXT } from '../data/config.js';
import { useLang } from '../i18n.jsx';
import { Icon } from './Icons.jsx';
import { MailLink } from './Visit.jsx';

const WA_FOOT = 'https://wa.me/919963083339?text=Hello%20SSR%20Rice%20Mill%2C%20I%20found%20your%20website%20and%20have%20an%20enquiry.%20Please%20get%20in%20touch%20with%20me.';

export default function Footer() {
  const { tr, ta, wa, lang } = useLang();
  return (
    <footer>
      <div className="fg">
        <div>
          <div className="flock"><img src="assets/logo/ssr-mark-light.png" width="410" height="215" alt={ta('Sri Sai Ramana Parboiled Modern Rice Mill (SSR)')} loading="lazy" /></div>
          <h4 style={{ display: 'none' }}>{tr('SSR Rice Mill')}</h4>
          <p style={{ maxWidth: '380px' }}>{tr('Premium parboiled rice milled with care for everyday meals and special moments. Grain you can trust, straight from the mill.')}</p>
          <p className="fct">
            <a href={'tel:' + PHONE_TEL}><Icon name="phone" />{' ' + PHONE_TEXT}</a><br />
            <MailLink place="foot" lang={lang} /><br />
            <a className="wa" href={wa(WA_FOOT)} target="_blank" rel="noopener" aria-label={ta('Chat with us on WhatsApp (opens in a new tab)')}><Icon name="whatsapp" />{tr(' Chat on WhatsApp')}</a>
          </p>
        </div>
        <div>
          <h4>{tr('Quick links')}</h4>
          <a href="#shop">{tr('Our rice')}</a><a href="#about">{tr('About us')}</a><a href="#faq">{tr('FAQ')}</a>
          <a href={wa(WA_FOOT)} target="_blank" rel="noopener" aria-label={ta('Contact us on WhatsApp (opens in a new tab)')}>{tr('Contact')}</a>
        </div>
        <div>
          <h4>{tr('Explore')}</h4>
          <a href="#story-intro">{tr('Our story')}</a><a href="#faq">{tr('FAQ')}</a><a target="_blank" rel="noopener" href={MAPS_URL}>{tr('Directions')}</a>
        </div>
      </div>
      <div className="fb">{tr('© 2026 Sri Sai Ramana Parboiled Modern Rice Mill. All rights reserved. Crafted with ')}<Icon name="heart" style={{ color: '#e3b04b', fill: 'currentColor', width: '1em', height: '1em' }} />{tr(' in Huzur Nagar, Telangana')}</div>
    </footer>
  );
}
