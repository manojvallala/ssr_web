import { useRef, useState } from 'react';
import { FAQS, FAQS_TE } from '../data/content.js';
import { useLang } from '../i18n.jsx';

function Item({ q, a }) {
  const [open, setOpen] = useState(false), [max, setMax] = useState(undefined);
  const body = useRef(null);
  const toggle = () => { const o = !open; setOpen(o); setMax(o ? body.current.scrollHeight + 'px' : 0); };
  return (
    <div className={open ? 'q open' : 'q'}>
      <button aria-expanded={open} onClick={toggle}>{q}<i>+</i></button>
      <div ref={body} style={max === undefined ? undefined : { maxHeight: max }}><p>{a}</p></div>
    </div>
  );
}

export default function Faq() {
  const { tr, te, lang } = useLang();
  const list = te ? FAQS_TE : FAQS;
  return (
    <section id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh rvl"><h2>{tr('Frequently asked questions')}</h2><p>{tr('Everything you need to know about our rice and deliveries.')}</p></div>
        {/* switching language redraws the list closed, like the original */}
        <div className="faq rvl" id="faqs">{list.map((f, i) => <Item key={lang + i} q={f[0]} a={f[1]} />)}</div>
      </div>
    </section>
  );
}
