import { Fragment } from 'react';
import { ANNOUNCE, ANNOUNCE_TE } from '../data/content.js';
import { useLang } from '../i18n.jsx';
import { dec } from '../util.js';

/* one item: plain text, or text with an <a href="...">...</a> link inside (e.g. tap-to-call) */
function Item({ html }) {
  const m = html.match(/^(.*?)<a href="([^"]+)">(.*?)<\/a>(.*)$/);
  if (!m) return dec(html);
  return <>{dec(m[1])}<a href={m[2]}>{dec(m[3])}</a>{m[4] ? dec(m[4]) : null}</>;
}

export default function AnnounceBar() {
  const { te } = useLang();
  const items = te ? ANNOUNCE_TE : ANNOUNCE;
  return (
    <div className="ann" id="ann">
      {items.map((it, i) => (
        <Fragment key={i}>{i > 0 && <span>|</span>}<Item html={it} /></Fragment>
      ))}
    </div>
  );
}
