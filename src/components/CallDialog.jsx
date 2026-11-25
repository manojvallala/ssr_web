import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CALL_T } from '../data/content.js';
import { PHONE_SHOW, PHONE_TEL, WA_NUMBER } from '../data/config.js';
import { useLang } from '../i18n.jsx';
import { dec, IS_MOBILE } from '../util.js';
import { Icon } from './Icons.jsx';

function copyText(s) {
  const legacy = () => {
    const i = document.createElement('textarea'); i.value = s; i.setAttribute('readonly', ''); i.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(i); i.select(); try { document.execCommand('copy'); } catch (e) { /* ignore */ } i.remove();
  };
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(s).catch(legacy);
  return Promise.resolve(legacy());
}

/* Phone numbers. Phones: tel: links open the dialler as normal. Laptops: clicking any phone number opens this
   panel instead (copy number, WhatsApp, or call with an app such as Phone Link / FaceTime). Built on first use. */
export default function CallDialog() {
  const { lang } = useLang();
  const t = CALL_T[lang];
  const [built, setBuilt] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [on, setOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const box = useRef(null), opener = useRef(null), hideT = useRef(0), copyT = useRef(0), wantFocus = useRef(false);

  const open = useCallback((a) => {
    clearTimeout(hideT.current); opener.current = a;
    setBuilt(true); setHidden(false); wantFocus.current = true;
    document.documentElement.classList.add('cdlg-on');
    requestAnimationFrame(() => setOn(true));
  }, []);

  const close = useCallback(() => {
    setOn(false);
    document.documentElement.classList.remove('cdlg-on');
    hideT.current = setTimeout(() => setHidden(true), 200);
    if (opener.current) opener.current.focus({ preventScroll: true });
  }, []);

  /* laptop: intercept clicks on any tel: link outside the panel */
  useEffect(() => {
    if (IS_MOBILE) return;
    const onClick = (e) => {
      const a = e.target.closest('a[href^="tel:"]');
      if (!a || a.closest('.cdlg')) return;
      e.preventDefault(); open(a);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);

  useLayoutEffect(() => {
    if (!hidden && wantFocus.current && box.current) { wantFocus.current = false; box.current.querySelector('.cdlg-copy').focus(); }
  }, [hidden, built]);

  if (!built) return null;
  const visibleOpen = !hidden;

  const onKey = (e) => {
    if (e.key === 'Escape') { if (visibleOpen) close(); }
    if (e.key === 'Tab') {
      const f = [...box.current.querySelectorAll('button,a[href]')], i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  };
  const onCopy = () => copyText(PHONE_SHOW).then(() => {
    setCopied(true); clearTimeout(copyT.current); copyT.current = setTimeout(() => setCopied(false), 2200);
  });

  return createPortal(
    <div className={on ? 'cdlg on' : 'cdlg'} hidden={hidden} role="dialog" aria-modal="true" aria-labelledby="cdlg-t" ref={box} onKeyDown={onKey}
      onClick={(e) => { if (e.target.closest('[data-close]') && visibleOpen) close(); }}>
      <div className="cdlg-bg" data-close="" aria-label={t.close}></div>
      <div className="cdlg-box">
        <button type="button" className="cdlg-x" data-close="" aria-label={t.close}>×</button>
        <span className="cdlg-ic"><Icon name="phone" /></span>
        <h3 id="cdlg-t">{dec(t.title)}</h3>
        <a className="cdlg-num" href={'tel:' + PHONE_TEL}>{PHONE_SHOW}</a>
        <p className="cdlg-note">{dec(t.note)}</p>
        <div className="cdlg-act">
          <button type="button" className={copied ? 'cdlg-copy ok' : 'cdlg-copy'} onClick={onCopy}><Icon name="check" /><span>{copied ? t.copied : t.copy}</span></button>
          <a className="cdlg-wa" target="_blank" rel="noopener" href={`https://wa.me/${WA_NUMBER}?text=` + encodeURIComponent(t.msg)}><Icon name="whatsapp" /><span>{t.wa}</span></a>
          <a className="cdlg-app" href={'tel:' + PHONE_TEL}><Icon name="phone" /><span>{t.app}</span></a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
