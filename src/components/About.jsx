import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n.jsx';
import { playSafe, reducedMotion } from '../util.js';
import Video from './Video.jsx';

export default function About() {
  const { tr } = useLang();
  const sq = useRef(null), vid = useRef(null);
  const [hasVideo, setHasVideo] = useState(true);

  /* "Soaked. Steamed. Milled." clip: load when near the screen, play only while visible */
  useEffect(() => {
    const v = vid.current;
    if (!v || !v.dataset.src) return;
    const drop = () => setHasVideo(false);
    v.addEventListener('error', drop);
    const io = new IntersectionObserver((e) => {
      if (!v.isConnected) return;
      if (e[0].isIntersecting) { if (!v.getAttribute('src')) { v.src = v.dataset.src; v.load(); } if (!reducedMotion()) playSafe(v); }
      else v.pause();
    }, { rootMargin: '200px 0px' });
    io.observe(sq.current);
    return () => { v.removeEventListener('error', drop); io.disconnect(); };
  }, [hasVideo]);

  return (
    <section id="about">
      <div className="wrap story">
        <div className="rvl">
          <h2>{tr('Delivering freshness from our mill to your table')}</h2>
          <p>{tr('From the paddy fields of Telangana to homes across the region — every bag is parboiled, milled and sorted with care at Sri Sai Ramana Parboiled Modern Rice Mill, and delivered with love.')}</p>
          <p>{tr('With ')}<b>{tr('28 years of experience in the rice field')}</b>{tr(', our two brands, ')}<b>SSR</b>{tr(' and ')}<b>A+</b>{tr(', bring you tasty, traditional, classic rice.')}</p>
          <a className="btn o" href="#visit">{tr('Visit the mill')}</a>
        </div>
        <div className="sq rvl" ref={sq}>
          {hasVideo && <Video ref={vid} loop preload="none" aria-hidden="true" data-src="assets/story/07.mp4" />}
          <div>{tr('Soaked.')}<br />{tr('Steamed.')}<br />{tr('Milled.')}<small>{tr('The parboiled way')}</small></div>
        </div>
      </div>
    </section>
  );
}
