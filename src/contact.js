import { MAIL } from './data/content.js';
import { EMAIL } from './data/config.js';
import { IS_MOBILE } from './util.js';

/* Email links. Phones: the phone's mail app (Gmail on Android). Laptops: Gmail compose in a new tab,
   with To, Subject and message filled in. Texts per place and language are in data/content.js (MAIL). */
const enc = (s) => encodeURIComponent(s.replace(/\n/g, '\r\n'));

export function mailHref(place, lang) {
  const [s, b] = MAIL[place][lang];
  if (IS_MOBILE) return { href: 'mailto:' + EMAIL + '?subject=' + enc(s) + '&body=' + enc(b), target: undefined, rel: undefined };
  return {
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(EMAIL) + '&su=' + encodeURIComponent(s) + '&body=' + encodeURIComponent(b),
    target: '_blank', rel: 'noopener',
  };
}
