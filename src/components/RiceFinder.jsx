import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { DISH, PICK, RICE, TEX, UI } from '../data/content.js';
import { WA_NUMBER } from '../data/config.js';
import { useLang } from '../i18n.jsx';
import { dec, reducedMotion } from '../util.js';
import { Icon } from './Icons.jsx';

/* Rice finder: two questions -> one recommended variety (texts and picks in data/content.js).
   Like the original, the whole box is drawn fresh on every choice (the result card's entrance animation replays),
   and focus goes back to the option that was clicked. */
export default function RiceFinder() {
  const { lang } = useLang();
  const [dish, setDish] = useState(null), [tex, setTex] = useState(null);
  const [ver, setVer] = useState(0);
  const box = useRef(null), focusNext = useRef(null);
  const u = UI[lang];

  useLayoutEffect(() => {
    const sel = focusNext.current; focusNext.current = null;
    if (sel) { const f = box.current.querySelector(sel); if (f) f.focus({ preventScroll: true }); }
  }, [ver]);

  const pick = (q, v) => {
    if (q === 'dish') setDish(v); else setTex(v);
    focusNext.current = `.fnd-o[data-q="${q}"][data-v="${v}"]`;
    setVer((x) => x + 1);
  };
  const reset = () => { setDish(null); setTex(null); focusNext.current = '.fnd-o'; setVer((x) => x + 1); };
  const see = (li) => {
    const el = document.querySelectorAll('#shop .vars li')[li];
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
    document.querySelectorAll('#shop .vars li.hl').forEach((x) => x.classList.remove('hl'));
    el.classList.add('hl'); setTimeout(() => el.classList.remove('hl'), 3200);
  };

  const opts = (list, q, on, off) => list.map((o) => (
    <button key={o[0]} type="button" className="fnd-o" data-q={q} data-v={o[0]} aria-pressed={on === o[0]} disabled={off} onClick={() => pick(q, o[0])}>
      {dec(lang === 'te' ? o[2] : o[1])}
    </button>
  ));

  let result;
  if (!dish || !tex) result = <p className="fnd-wait">{dec(u.wait)}</p>;
  else {
    const r = RICE[PICK[dish + '-' + tex] || PICK[dish]];
    const wa = `https://wa.me/${WA_NUMBER}?text=` + encodeURIComponent(u.msg(r.name));
    result = (
      <div className="fnd-card">
        <div><span className="fnd-k">{dec(u.rec)}</span><h3>{r.name}</h3><p>{dec(r[lang])}</p></div>
        <div className="fnd-act">
          <a className="fnd-wa" href={wa} target="_blank" rel="noopener"><Icon name="whatsapp" />{' ' + dec(u.wa)}</a>
          <button type="button" className="fnd-see" data-li={r.li} onClick={() => see(r.li)}>{dec(u.see) + ' '}<Icon name="arrow-right" /></button>
          <button type="button" className="fnd-reset" onClick={reset}>{'↺ ' + dec(u.reset)}</button>
        </div>
      </div>
    );
  }

  return (
    <section id="finder" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="fnd rvl" id="fnd" ref={box}>
          <Fragment key={lang + ver}>
            <span className="abrand">{dec(u.kicker)}</span><h2>{dec(u.title)}</h2><p className="fnd-sub">{dec(u.sub)}</p>
            <div className="fnd-q"><p className="fnd-l" id="fnd-l1">{dec(u.q1)}</p><div className="fnd-opts" role="group" aria-labelledby="fnd-l1">{opts(DISH, 'dish', dish, false)}</div></div>
            <div className={dish ? 'fnd-q' : 'fnd-q off'}><p className="fnd-l" id="fnd-l2">{dec(u.q2)}</p><div className="fnd-opts" role="group" aria-labelledby="fnd-l2">{opts(TEX, 'tex', tex, !dish)}</div></div>
            <div className="fnd-res" aria-live="polite">{result}</div>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
