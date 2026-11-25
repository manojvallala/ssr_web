import { useEffect, useRef } from 'react';
import { GALLERY_SECONDS } from '../data/config.js';
import { useLang } from '../i18n.jsx';

/* mill photos: free-licence stock stand-ins (see /assets/CREDITS.txt); replace with photos of the real mill.
   pan: tall pictures pan top -> bottom instead of zooming, so nothing is left out */
const PICS = [
  ['mill-drying-yard.jpg', 'Workers raking paddy to dry in the yard of a rice mill'],
  ['mill-paddy-sacks.jpg', 'Farmers beside a heap of paddy and stacked sacks'],
  ['mill-silos-elevator.jpg', 'Grain silos and an elevator tower on a mill building'],
  ['mill-grain-facility.jpg', 'Grain silos and elevator tower under a blue sky'],
  ['mill-machinery-hall.jpg', 'Inside a large mill hall with machinery'],
  ['mill-workers-baskets.jpg', 'Workers carrying baskets inside a mill'],
  ['brand-farmer.jpg', 'Rooted in hard work, delivered with quality: a farmer with fresh paddy and the SSR rice range', true],
  ['brand-family-of-packs.jpg', 'Cultivating generations of taste: the full SSR rice range'],
  ['brand-natures-finest.jpg', "Nature's finest, perfected for you"],
  ['brand-goodness.jpg', 'Every grain filled with goodness'],
  ['brand-family-table.jpg', 'Share moments that matter, one warm bowl at a time'],
  ['brand-pure.jpg', 'From our paddy, purest on your plate'],
  ['brand-hmt-kitchen.jpg', 'Every grain, a taste of tradition: SSR HMT Rice'],
  ['brand-tradition.jpg', 'A tradition of taste'],
  ['brand-roots.jpg', "Nurture your roots, taste the soil's best"],
  ['brand-perfect-grain.jpg', 'Choose the perfect grain for every occasion'],
  ['brand-harvest-happiness.jpg', 'Taste tradition, harvest happiness'],
];
const DUR = Math.max(3, GALLERY_SECONDS) * 1000;
/* a different drift for each picture so it feels like camera movement */
const ORG = [['30%', '35%'], ['70%', '40%'], ['50%', '75%'], ['25%', '65%'], ['75%', '25%'], ['50%', '30%']];

/* SSR in pictures: plays like a film. Each picture drifts slowly for GALLERY_SECONDS, then fades to the next, looping.
   Previous/next arrows (and swipe on phones, arrow keys) let visitors move themselves; autoplay carries on from there. */
export default function Gallery() {
  const { tr, ta } = useLang();
  const gal = useRef(null), stage = useRef(null), api = useRef({});

  useEffect(() => {
    const g = gal.current, st = stage.current, sl = [...st.querySelectorAll('.gsl')], N = sl.length;
    if (!N) return;
    const load = (i) => { const f = sl[(i % N + N) % N], im = f.querySelector('img'), s = im.dataset.src; if (!s) return; im.src = s; delete im.dataset.src; };
    const run = (f) => { f.classList.remove('run'); void f.offsetWidth; f.classList.add('run'); };
    let cur = 0, t = 0, last = 0, near = false, vis = false, started = false, raf = 0;
    const later = [];
    const go = (i) => {
      i = (i + N) % N; if (i === cur) return;
      const prev = sl[cur]; cur = i; t = 0; load(i); load(i + 1); load(i - 1);
      sl.forEach((f, j) => f.classList.toggle('on', j === i)); run(sl[i]);
      /* reset the previous picture's drift once it has faded out */
      later.push(setTimeout(() => { if (prev !== sl[cur]) prev.classList.remove('run'); }, 1800));
    };
    const playing = () => vis && !document.hidden;
    const state = () => st.classList.toggle('paused', !playing());
    const tick = (now) => {
      const dt = last ? Math.min(now - last, 100) : 0; last = now;
      if (playing()) { t += dt; if (t >= DUR) go(cur + 1); }
      raf = requestAnimationFrame(tick);
    };
    api.current = { prev: () => go(cur - 1), next: () => go(cur + 1) };
    const onKey = (e) => { if (e.key === 'ArrowLeft') go(cur - 1); else if (e.key === 'ArrowRight') go(cur + 1); };
    let sx = null, sy = 0;
    const onDown = (e) => { if (e.target.closest('button')) return; sx = e.clientX; sy = e.clientY; };
    const onUp = (e) => { if (sx === null) return; const dx = e.clientX - sx, dy = e.clientY - sy; sx = null; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? cur + 1 : cur - 1); };
    const onCancel = () => { sx = null; };
    st.addEventListener('keydown', onKey); st.addEventListener('pointerdown', onDown); st.addEventListener('pointerup', onUp); st.addEventListener('pointercancel', onCancel);
    /* load the first pictures a little before the section scrolls into view */
    const io1 = new IntersectionObserver((e) => { if (e[0].isIntersecting && !near) { near = true; load(0); load(1); } }, { rootMargin: '800px 0px' });
    io1.observe(g);
    /* play only while the slideshow is on screen; it picks up where it left off */
    const io2 = new IntersectionObserver((e) => { vis = e[0].isIntersecting; if (vis && !started) { started = true; load(0); load(1); run(sl[0]); } state(); }, { threshold: 0.3 });
    io2.observe(st);
    document.addEventListener('visibilitychange', state);
    state(); raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf); later.forEach(clearTimeout); io1.disconnect(); io2.disconnect();
      document.removeEventListener('visibilitychange', state);
      st.removeEventListener('keydown', onKey); st.removeEventListener('pointerdown', onDown); st.removeEventListener('pointerup', onUp); st.removeEventListener('pointercancel', onCancel);
    };
  }, []);

  return (
    <section id="gallery" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh rvl"><h2>{tr('SSR in pictures')}</h2><p>{tr('Rooted in hard work, delivered with quality.')}</p></div>
        <div className="gshow rvl" id="gal" ref={gal} role="region" aria-roledescription="slideshow" aria-label={ta('SSR in pictures')}>
          <div className="gst" ref={stage}>
            {PICS.map(([file, alt, pan], i) => (
              <figure key={file} className={i === 0 ? 'gsl on' : 'gsl'}
                style={{ '--ox': ORG[i % ORG.length][0], '--oy': ORG[i % ORG.length][1], '--gd': DUR / 1000 + 2 + 's', '--gp': DUR / 1000 + 's' }}>
                <img className={pan ? 'pan' : undefined} data-src={`assets/pics/web/${file}`} alt={ta(alt)} decoding="async" />
              </figure>
            ))}
            <button className="gnv pv" type="button" aria-label={ta('Previous picture')} onClick={() => api.current.prev()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg></button>
            <button className="gnv nx" type="button" aria-label={ta('Next picture')} onClick={() => api.current.next()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg></button>
          </div>
        </div>
      </div>
    </section>
  );
}
