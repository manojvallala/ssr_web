import { useState } from 'react';
import { useLang } from '../i18n.jsx';
import { Icon } from './Icons.jsx';

const NAV = [['#shop', 'Our rice'], ['#gallery', 'Gallery'], ['#story-intro', 'Our story'], ['#about', 'About'], ['#faq', 'FAQ'], ['#visit', 'Visit']];

/* EN | తెలుగు switch (header and phone menu) */
export function LangToggle({ extraClass = '', id }) {
  const { te, toggle } = useLang();
  return (
    <button className={'lng' + extraClass} id={id} type="button" aria-label="Language: English / తెలుగు" aria-pressed={te} onClick={toggle}>
      <span className="l-en" lang="en">EN</span><span className="l-te" lang="te">తెలుగు</span>
    </button>
  );
}

export default function Header() {
  const { tr, ta } = useLang();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <header>
        <div className="hd">
          <a className="logo" href="#top" aria-label={ta('Sri Sai Ramana Parboiled Modern Rice Mill (SSR) - home')}><img src="assets/logo/ssr-mark.png" width="410" height="215" alt="" /></a>
          <nav className="nv">{NAV.map(([h, l]) => <a key={h} href={h}>{tr(l)}</a>)}</nav>
          <div className="tools">
            <LangToggle id="lng" />
            <a className="cartb" href="#visit">{tr('Contact us')}</a>
            <button className="bg" id="bgb" aria-label={ta('Menu')} onClick={() => setMenu(true)}><Icon name="menu" className="ic ic-lg" /></button>
          </div>
        </div>
      </header>
      <div className={menu ? 'mnav on' : 'mnav'} id="mnav">
        <button id="mx" aria-label={ta('Close menu')} onClick={() => setMenu(false)}>×</button>
        {NAV.map(([h, l]) => <a key={h} href={h} onClick={() => setMenu(false)}>{tr(l)}</a>)}
        <LangToggle extraClass=" mlng" />
      </div>
    </>
  );
}
