import { useCallback, useEffect, useRef, useState } from 'react';
import { CH, CH_TE } from '../data/content.js';
import { useLang } from '../i18n.jsx';
import { dec, playSafe } from '../util.js';
import { Icon } from './Icons.jsx';
import Video from './Video.jsx';

/* The SSR story: real-footage chapters, driven by scroll. Clip for chapter N = /assets/story/NN.mp4 (texts in data/content.js) */
const N = CH.length;
const pad = (i) => String(i + 1).padStart(2, '0');
const label = (s) => s.replace(/&[a-z]+;/g, ' ');

export default function Story() {
  const { te, tr } = useLang();
  const track = useRef(null), bar = useRef(null), vids = useRef([]);
  const cur = useRef(-1), timers = useRef([]);
  const [active, setActive] = useState(-1);   // chapter whose clip/dot is on
  const [shown, setShown] = useState(-1);     // chapter whose text is shown (changes after the fade)
  const [out, setOut] = useState(false);

  const load = (v) => {
    if (!v || v.dataset.l) return;
    v.dataset.l = 1;
    v.addEventListener('canplay', () => v.classList.add('ok'), { once: true });
    v.addEventListener('error', () => v.classList.add('bad'));
    v.src = v.dataset.src; v.load();
  };

  const show = useCallback((i) => {
    if (i === cur.current) return;
    const first = cur.current < 0;
    cur.current = i;
    setActive(i);
    vids.current.forEach((v, j) => {
      if (!v) return;
      if (Math.abs(j - i) <= 1) load(v);
      if (j === i) playSafe(v); else v.pause();
    });
    const put = () => { setShown(i); setOut(false); };
    if (first) put();
    else { setOut(true); timers.current.push(setTimeout(put, 260)); }
  }, []);

  useEffect(() => {
    const t = track.current;
    const upd = () => {
      const r = t.getBoundingClientRect(), tot = r.height - innerHeight, p = Math.min(1, Math.max(0, -r.top / tot));
      show(Math.min(N - 1, Math.floor(p * N * 0.999)));
      bar.current.style.width = p * 100 + '%';
    };
    addEventListener('resize', upd); addEventListener('scroll', upd, { passive: true }); upd();
    return () => { removeEventListener('resize', upd); removeEventListener('scroll', upd); timers.current.forEach(clearTimeout); };
  }, [show]);

  const jump = (i) => {
    const t = track.current, tot = t.offsetHeight - innerHeight, y = t.getBoundingClientRect().top + scrollY + (i + 0.5) / N * tot;
    scrollTo({ top: y, behavior: 'smooth' });
  };

  const list = te ? CH_TE : CH;
  const c = shown >= 0 ? list[shown] : null;
  return (
    <section className="sstory" id="story" style={{ padding: 0 }}>
      <div id="track" ref={track} style={{ height: N * 75 + 100 + 'vh' }}>
        <div className="stage">
          <div className={out ? 'sl out' : 'sl'} id="sl">
            <div className="snum" id="sn">{c ? pad(shown) : '01'}</div>
            <span className="sk" id="sk">{c ? (te ? 'అధ్యాయం ' + pad(shown) + ' / ' + N : 'Chapter ' + pad(shown) + ' of ' + N) : ''}</span>
            <h2 id="stt">{c ? dec(c[0]) : ''}</h2>
            <p id="sb">{c ? dec(c[1]) : ''}</p>
            <div className="chips" id="sch">{c ? c[2].map((x, k) => <span key={k}>{dec(x)}</span>) : null}</div>
            <a className="glass" id="sbtn" href="#shop" style={{ display: shown === N - 1 ? 'inline-flex' : 'none' }}>{tr('Shop the rice ')}<Icon name="arrow-right" /></a>
          </div>
          <div className="sr">
            <div id="scenes">
              {CH.map((ch, i) => (
                <div className={i === active ? 'sc2 on' : 'sc2'} key={i}>
                  <Video ref={(el) => { vids.current[i] = el; }} loop preload="none" aria-label={label(list[i][0])} data-src={`assets/story/${pad(i)}.mp4`} />
                </div>
              ))}
            </div>
            <div className="pr" id="pr">
              {CH.map((ch, i) => (
                <button key={i} className={i === active ? 'on' : undefined} aria-label={(te ? 'అధ్యాయం ' : 'Chapter ') + (i + 1)} data-i={i} onClick={() => jump(i)}></button>
              ))}
            </div>
          </div>
          <div className="sbar"><i id="sbar" ref={bar}></i></div>
        </div>
      </div>
    </section>
  );
}
