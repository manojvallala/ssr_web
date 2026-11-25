import { useLang } from '../i18n.jsx';
import { Icon } from './Icons.jsx';

const VARIETIES = ['JSR Kolam Steam Rice', 'JSR Kolam Old Raw Rice', 'HMT Steam', 'Jeera Rice', 'BPT Sona Masuri Steam Rice'];
const SSR_PACKS = [
  ['pack-hmt-red.webp', 'SSR HMT Rice pack', 'HMT Rice', 'Premium Quality · Tasty, Traditional, Classic'],
  ['pack-black.webp', 'SSR JSR Lachkari Wada Kolam Rice black pack', 'Lachkari Wada Kolam Rice', 'Premium “Sizzer” Quality'],
  ['pack-pink.webp', 'SSR JSR Lachkari Wada Kolam Rice pink pack', 'Lachkari Wada Kolam Rice', 'Premium Quality · Pink pack'],
  ['pack-wada-kolam.webp', 'SSR Wada Kolam Rice pack', 'Wada Kolam Rice', 'Tasty · Traditional · Classic'],
];
const APLUS_PACKS = [['pack-a-plus.webp', 'A+ JSR Sizer Lachkari Kolam Rice pack', 'A+ Lachkari Kolam Rice', 'JSR Sizer Lachkari Kolam Rice · Premium Quality']];

function Pack({ p }) {
  const { tr, ta } = useLang();
  return (
    <article className="pk rvl">
      <div className="im"><img src={`assets/pics/web/${p[0]}`} alt={ta(p[1])} loading="lazy" /></div>
      <h3>{tr(p[2])}</h3><p>{tr(p[3])}</p>
    </article>
  );
}

export default function Varieties() {
  const { tr, ta } = useLang();
  return (
    <section id="shop" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh rvl"><span className="abrand">{tr('Our two brands · SSR & A+')}</span><h2>{tr('Our rice varieties')}</h2><p>{tr('Parboiled, milled and packed at our own mill in Huzur Nagar — under two brands.')}</p></div>
        <ol className="vars rvl" aria-label={ta('Varieties we make')}>
          {VARIETIES.map((v) => <li key={v}>{tr(v)}</li>)}
        </ol>
        <div className="brands">
          <div className="bgrp ssr">
            <div className="bhead rvl"><h3>SSR</h3><span>{tr('Tasty · Traditional · Classic')}</span></div>
            <div className="packs">{SSR_PACKS.map((p) => <Pack key={p[0]} p={p} />)}</div>
          </div>
          <div className="bgrp aplus">
            <div className="bhead rvl"><h3>A+</h3><span>{tr('Premium Quality')}</span></div>
            <div className="packs">{APLUS_PACKS.map((p) => <Pack key={p[0]} p={p} />)}</div>
          </div>
        </div>
        <p className="packnote rvl">{tr('Ask at the mill for pack sizes and the full range. ')}<a href="#visit">{tr('Contact us ')}<Icon name="arrow-right" /></a></p>
      </div>
    </section>
  );
}
