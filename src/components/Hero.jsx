import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n.jsx';
import { playSafe, reducedMotion } from '../util.js';
import Video from './Video.jsx';

const STEPS = [['1', 'Buy paddy', 'from local farmers'], ['2', 'Parboil', 'soak & steam the grain'], ['3', 'Mill & polish', 'on modern machines'], ['4', 'Sort & pack', 'ready for kitchens & trade']];
const POINTS = ['Parboiled rice', 'Wholesale supply', 'Custom milling', '28 years in the rice field'];

export default function Hero() {
  const { tr } = useLang();
  const hero = useRef(null), vid = useRef(null), src = useRef(null);
  const [hasVideo, setHasVideo] = useState(true);

  /* hero footage: poster shows instantly, video plays over it (works on reload too); pauses when scrolled away */
  useEffect(() => {
    const v = vid.current, h = hero.current;
    if (!v) return;
    const go = () => playSafe(v);
    const drop = () => setHasVideo(false);
    const s = src.current;
    if (s) s.addEventListener('error', drop);
    v.addEventListener('error', drop);
    const onVis = () => { if (!document.hidden) go(); };
    const still = reducedMotion();
    if (still) { v.removeAttribute('autoplay'); v.pause(); }
    else { go(); v.addEventListener('canplay', go); addEventListener('load', go); document.addEventListener('visibilitychange', onVis); }
    const io = new IntersectionObserver((e) => {
      if (!v.isConnected) return;
      if (e[0].isIntersecting) { if (!reducedMotion()) go(); } else v.pause();
    });
    io.observe(h);
    return () => {
      if (s) s.removeEventListener('error', drop);
      v.removeEventListener('error', drop); v.removeEventListener('canplay', go);
      removeEventListener('load', go); document.removeEventListener('visibilitychange', onVis); io.disconnect();
    };
  }, [hasVideo]);

  return (
    <section className="hero vid" id="hero" ref={hero}>
      {hasVideo && (
        <Video ref={vid} className="hvid" id="hvid" loop autoPlay preload="auto" poster="assets/hero-poster.jpg" aria-hidden="true">
          <source ref={src} src="assets/hero.mp4" type="video/mp4" />
        </Video>
      )}
      <div className="hshade"></div>
      <div className="hg">
        <div className="hl">
          <span className="pill"><i></i>{tr('Sri Sai Ramana Parboiled Modern Rice Mill · SSR')}</span>
          <h1>{tr('Parboiled rice, ')}<em>{tr('milled fresh')}</em>{tr(' in Huzur Nagar.')}</h1>
          <p>{tr('We buy paddy from local farmers and turn it into clean, golden, nutritious rice — parboiled, milled, sorted and packed at our own modern mill.')}</p>
          <div className="hb"><a className="btn" href="#story-intro">{tr('See how we make it')}</a><a className="btn o" href="#visit">{tr('Visit the mill')}</a></div>
          <ul className="hw">{POINTS.map((p) => <li key={p}>{tr(p)}</li>)}</ul>
        </div>
      </div>
      <div className="hs4">
        {STEPS.map(([n, a, b]) => <div key={n}><b>{n}</b><span>{tr(a)}</span><small>{tr(b)}</small></div>)}
      </div>
    </section>
  );
}
