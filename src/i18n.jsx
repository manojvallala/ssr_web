import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { TE, TITLE_TE, WA_TE } from './data/content.js';

/* English / తెలుగు. The saved choice is applied to <html lang> by a tiny script in index.html before anything
   paints; React picks it up from there. Every text written in the page goes through tr(), which swaps it for its
   Telugu version from the TE table (keeping the text's surrounding spaces), exactly like the original page did. */

const TITLE_EN = document.title;
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const has = (k) => Object.prototype.hasOwnProperty.call(TE, k);

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => (document.documentElement.lang === 'te' ? 'te' : 'en'));

  // apply before paint so Telugu text never shows with English typography (html[lang=te] rules)
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'te' ? TITLE_TE : TITLE_EN;
  }, [lang]);

  const toggle = useCallback(() => {
    const next = document.documentElement.lang === 'te' ? 'en' : 'te';
    try { localStorage.setItem('ssr-lang', next); } catch (e) { /* storage blocked: still switch */ }
    setLang(next);
  }, []);

  const value = useMemo(() => {
    const te = lang === 'te';
    /** text swap: same text in English; Telugu from the table, keeping leading/trailing spaces */
    const tr = (s) => {
      if (!te) return s;
      const k = norm(s);
      if (!k || !has(k)) return s;
      return s.match(/^\s*/)[0] + TE[k] + s.match(/\s*$/)[0];
    };
    /** attribute swap (alt / aria-label): whole value */
    const ta = (s) => (te && TE[norm(s)] !== undefined ? TE[norm(s)] : s);
    /** WhatsApp link: Telugu message when available (built the same way as the original, via URL params) */
    const wa = (href) => {
      if (!te) return href;
      const u = new URL(href);
      const msg = u.searchParams.get('text');
      if (msg && WA_TE[msg]) u.searchParams.set('text', WA_TE[msg]);
      return u.toString();
    };
    return { lang, te, toggle, tr, ta, wa };
  }, [lang, toggle]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
