/* decode the few HTML entities used in the content data */
const ENT = { '&mdash;': '—', '&amp;': '&', '&middot;': '·', '&rsquo;': '’', '&hellip;': '…', '&ldquo;': '“', '&rdquo;': '”', '&times;': '×', '&#8634;': '↺' };
export const dec = (s) => s.replace(/&[#a-z0-9]+;/g, (m) => (m in ENT ? ENT[m] : m));

export const reducedMotion = () => window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;

/* phones and tablets: the number opens the dialler, email opens the phone's mail app */
const ua = navigator.userAgent;
export const IS_MOBILE = /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua));

/* swallow autoplay rejections */
export const playSafe = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
