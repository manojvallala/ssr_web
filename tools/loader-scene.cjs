// Loading-screen scene generator: draws the animated farmer + paddy-field scene as one SVG.
// Edit, then run:  node tools/loader-scene.cjs > scene.svg  and paste the <svg class="ldr-scene">...</svg> into index.html (replacing the old one).
// Realistic loading scene v2 (SVG + SMIL). node scene2.cjs > scene.svg
// viewBox 1600x900; ground (bund top) y=770; farmer walks in place at x=800 while the world scrolls left.
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const r = (a, b) => a + (b - a) * rnd();
const f = (n) => Math.round(n * 10) / 10;
const W = 1600, STEP = 1.15, GROUND_SPEED = 205;
const dur = (sp) => f(W / sp) + 's';
const sp = (n) => Array(n).fill('.42 0 .58 1').join(';');
function wave(base, parts, bottom) {
  let d = ''; for (let x = 0; x <= W; x += 16) { let y = base; for (const [a, k, ph] of parts) y += a * Math.sin((2 * Math.PI * k * x) / W + ph); d += (x ? 'L' : 'M') + x + ' ' + f(y); }
  return d + `L${W} ${bottom}L0 ${bottom}Z`;
}
function layer(id, content, speed, attrs = '') {
  return `<g ${attrs}><g><animateTransform attributeName="transform" type="translate" from="0 0" to="-${W} 0" dur="${dur(speed)}" repeatCount="indefinite"/><g id="${id}">${content}</g><use href="#${id}" x="${W}"/></g></g>`;
}

/* ================= DEFS ================= */
const defs = `
<linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#aec7d2"/><stop offset=".28" stop-color="#d9dcd0"/><stop offset=".5" stop-color="#f2dcb6"/><stop offset=".64" stop-color="#f6c98a"/><stop offset="1" stop-color="#f0b066"/></linearGradient>
<radialGradient id="gBloom"><stop offset="0" stop-color="#fffdf2"/><stop offset=".08" stop-color="#fff4cf" stop-opacity=".95"/><stop offset=".25" stop-color="#ffdf96" stop-opacity=".55"/><stop offset=".6" stop-color="#ffc66b" stop-opacity=".16"/><stop offset="1" stop-color="#ffb84d" stop-opacity="0"/></radialGradient>
<radialGradient id="gSun"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#fff7dc"/><stop offset="1" stop-color="#ffe7a6"/></radialGradient>
<linearGradient id="gRay" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff2c4" stop-opacity=".0"/><stop offset=".5" stop-color="#fff2c4" stop-opacity=".55"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></linearGradient>
<radialGradient id="gPuff" cx=".5" cy=".55"><stop offset="0" stop-color="#fffaf0" stop-opacity=".95"/><stop offset=".55" stop-color="#fbeedb" stop-opacity=".75"/><stop offset="1" stop-color="#f6dcc0" stop-opacity="0"/></radialGradient>
<radialGradient id="gPuffLit" cx=".62" cy=".38"><stop offset="0" stop-color="#fff6dd" stop-opacity="1"/><stop offset=".5" stop-color="#ffe2b0" stop-opacity=".7"/><stop offset="1" stop-color="#f7c992" stop-opacity="0"/></radialGradient>
<linearGradient id="gHill1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b3bcb4"/><stop offset=".7" stop-color="#d9d3c0"/><stop offset="1" stop-color="#ecd9b6"/></linearGradient>
<linearGradient id="gHill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#97a693"/><stop offset=".75" stop-color="#c7c7ad"/><stop offset="1" stop-color="#e2d2ad"/></linearGradient>
<linearGradient id="gMist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe9c8" stop-opacity="0"/><stop offset=".55" stop-color="#fbe9c8" stop-opacity=".75"/><stop offset="1" stop-color="#fbe9c8" stop-opacity="0"/></linearGradient>
<linearGradient id="gCanopy" x1="0" y1="1" x2=".6" y2="0"><stop offset="0" stop-color="#3f5a3a"/><stop offset=".6" stop-color="#5d7a4b"/><stop offset="1" stop-color="#9aa86a"/></linearGradient>
<linearGradient id="gFieldFar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8c98a"/><stop offset=".4" stop-color="#a8bb6a"/><stop offset="1" stop-color="#7fa548"/></linearGradient>
<linearGradient id="gFieldNear" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f9c3e"/><stop offset="1" stop-color="#3f7029"/></linearGradient>
<linearGradient id="gWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8dfb0"/><stop offset="1" stop-color="#e9c48a"/></linearGradient>
<linearGradient id="gBund" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b08a5a"/><stop offset=".25" stop-color="#94704a"/><stop offset="1" stop-color="#5f4429"/></linearGradient>
<linearGradient id="gSkin" gradientUnits="userSpaceOnUse" x1="-16" y1="0" x2="26" y2="0"><stop offset="0" stop-color="#5a341f"/><stop offset=".55" stop-color="#83502f"/><stop offset=".85" stop-color="#9c643d"/><stop offset="1" stop-color="#c88a56"/></linearGradient>
<linearGradient id="gSkinFar" gradientUnits="userSpaceOnUse" x1="-16" y1="0" x2="14" y2="0"><stop offset="0" stop-color="#4a2a18"/><stop offset="1" stop-color="#6e4227"/></linearGradient><linearGradient id="gSkinArm" gradientUnits="userSpaceOnUse" x1="26" y1="0" x2="60" y2="0"><stop offset="0" stop-color="#6a3d23"/><stop offset=".6" stop-color="#8c5634"/><stop offset="1" stop-color="#c08250"/></linearGradient>
<linearGradient id="gShirt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfc3a8"/><stop offset=".45" stop-color="#ece4d2"/><stop offset=".85" stop-color="#fbf6ea"/><stop offset="1" stop-color="#fff3d6"/></linearGradient>
<linearGradient id="gLungiShade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset=".6" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#ffd38a" stop-opacity=".18"/></linearGradient>
<linearGradient id="gSack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset=".45" stop-color="#f2ede2"/><stop offset=".85" stop-color="#d6cfbf"/><stop offset="1" stop-color="#bfb6a3"/></linearGradient>
<linearGradient id="gSackSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".16"/><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#fff2d0" stop-opacity="0"/><stop offset="1" stop-color="#fff2d0" stop-opacity=".35"/></linearGradient>
<pattern id="pWeave" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 1.5H3M1.5 0V3" stroke="#8f8673" stroke-width=".45"/></pattern>
<pattern id="pCheck" width="13" height="13" patternUnits="userSpaceOnUse"><rect width="13" height="13" fill="#2b5e3f"/><path d="M0 6.5H13M6.5 0V13" stroke="#467f5a" stroke-width="2.6"/><path d="M0 2H13M2 0V13" stroke="#20492f" stroke-width="1"/><path d="M0 10.5H13" stroke="#c9a24a" stroke-width=".7" opacity=".7"/></pattern>
<pattern id="pGamcha" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#b23a2e"/><path d="M0 4H8M4 0V8" stroke="#e7c35a" stroke-width="1.1"/></pattern>
<filter id="fBlur1" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.2"/></filter>
<filter id="fBlur4" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
<filter id="fShadow" x="-30%" y="-200%" width="160%" height="500%"><feGaussianBlur stdDeviation="5"/></filter>
<radialGradient id="gShadow"><stop offset="0" stop-color="#2a1a0c" stop-opacity=".42"/><stop offset=".6" stop-color="#2a1a0c" stop-opacity=".18"/><stop offset="1" stop-color="#2a1a0c" stop-opacity="0"/></radialGradient><radialGradient id="gDust"><stop offset="0" stop-color="#c9a97a" stop-opacity=".9"/><stop offset="1" stop-color="#c9a97a" stop-opacity="0"/></radialGradient><radialGradient id="gMote"><stop offset="0" stop-color="#fff6d8" stop-opacity=".9"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient>
<radialGradient id="gVig" cx=".5" cy=".45" r=".8"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#3b2408" stop-opacity=".22"/></radialGradient>
<linearGradient id="gGrade" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd59a" stop-opacity="0"/><stop offset=".55" stop-color="#ffc874" stop-opacity=".12"/><stop offset="1" stop-color="#8a5a20" stop-opacity=".1"/></linearGradient>
`;

/* ---------- paddy clumps (several species of tuft, each with its own sway) ---------- */
function clump(id, { blades = 9, h = 40, spread = 18, cols = ['#4b7f2e', '#69a03e', '#8dbb52'], sway = 3, w = 1.8, heads = 0, still = false, begin = null }) {
  let s = ''; for (let i = 0; i < blades; i++) {
    const t = i / (blades - 1) - 0.5, tipx = t * spread * 2 + r(-4, 4), tipy = -h * r(0.7, 1.05), cx = t * spread * 0.6, cy = tipy * 0.55;
    s += `<path d="M${f(t * 4)} 0Q${f(cx)} ${f(cy)} ${f(tipx)} ${f(tipy)}" stroke="${cols[i % cols.length]}" stroke-width="${f(w * r(0.8, 1.2))}"/>`;
  }
  let g = '';
  for (let k = 0; k < heads; k++) { const x0 = r(-spread * 0.6, spread * 0.6), y0 = -h * r(0.75, 1), dx = (x0 >= 0 ? 1 : -1) * r(6, 10);
    s += `<path d="M${f(x0 * 0.3)} 0Q${f(x0 * 0.5)} ${f(y0 * 0.6)} ${f(x0)} ${f(y0)}Q${f(x0 + dx * 0.6)} ${f(y0 - 6)} ${f(x0 + dx)} ${f(y0 + 8)}" stroke="#b69a45" stroke-width="1.2"/>`;
    for (let i = 0; i < 6; i++) { const tt = i / 5, x = x0 + dx * tt, y = y0 + (tt * tt * 10) - 2 * Math.sin(tt * 3); g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="1.9" ry="1.1" transform="rotate(${f(dx > 0 ? 40 + 45 * tt : -40 - 45 * tt)} ${f(x)} ${f(y)})"/>`; } }
  const swayAnim = still ? '' : `<animateTransform attributeName="transform" type="rotate" values="${-sway * 0.7} 0 0;${sway * 0.7} 0 0;${-sway * 0.7} 0 0" dur="${begin === null ? f(r(2.6, 3.8)) : 3.2}s"${begin === null ? '' : ` begin="${begin}s"`} repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/>`;
  return `<symbol id="${id}" overflow="visible"><g>${swayAnim}<g fill="none" stroke-linecap="round">${s}</g><g fill="#e0b54e">${g}</g></g></symbol>`;
}
function softClump(id, sway) {
  let s = ''; for (let i = 0; i < 9; i++) { const t = i / 8 - 0.5, tipx = t * 40 + r(-6, 6), tipy = -48 * r(0.7, 1.05);
    s += `<path d="M${f(t * 4)} 0Q${f(t * 12)} ${f(tipy * 0.55)} ${f(tipx)} ${f(tipy)}" stroke="${['#4f7f2f', '#6f9a3a', '#93ad48'][i % 3]}" stroke-width="7" stroke-opacity=".28"/>`;
    s += `<path d="M${f(t * 4)} 0Q${f(t * 12)} ${f(tipy * 0.55)} ${f(tipx)} ${f(tipy)}" stroke="${['#5d8c36', '#7fa640', '#a5b951'][i % 3]}" stroke-width="3.2" stroke-opacity=".35"/>`; }
  const g = '';
  return `<symbol id="${id}" overflow="visible"><g><animateTransform attributeName="transform" type="rotate" values="${-sway} 0 0;${sway} 0 0;${-sway} 0 0" dur="${f(r(3, 4))}s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/><g fill="none" stroke-linecap="round">${s}</g>${g}</g></symbol>`;
}
const WAVES = 8; let waveSyms = ''; for (let k = 0; k < WAVES; k++) { const b = f(-k * 0.4); waveSyms += clump('wC' + k, { blades: 12, h: 46, spread: 20, cols: ['#3a6c25', '#5a9233', '#79ab45', '#a2c35e'], sway: 3.6, w: 2.2, begin: b }) + clump('wG' + k, { blades: 11, h: 48, spread: 20, cols: ['#6f8f33', '#8aa63e', '#a8b552'], sway: 3, w: 2, heads: 4, begin: b }); }
const symbols = waveSyms + softClump('cF1', 1.6) + softClump('cF2', 2) + 
  clump('cC', { blades: 12, h: 46, spread: 20, cols: ['#3a6c25', '#5a9233', '#79ab45', '#a2c35e'], sway: 3.2, w: 2.2 }) +
  clump('cG', { blades: 11, h: 48, spread: 20, cols: ['#6f8f33', '#8aa63e', '#a8b552'], sway: 2.6, w: 2, heads: 4 });

/* ================= SKY ================= */
let rays = ''; for (let i = 0; i < 9; i++) { const a = -150 + i * 30 + r(-6, 6); rays += `<path d="M0 0L900 -36L900 36Z" fill="url(#gRay)" opacity="${f(r(0.12, 0.26))}" transform="rotate(${f(a)})"/>`; }
const sun = `<g transform="translate(985 378)">
 <g>${rays}</g>
 <circle r="420" fill="url(#gBloom)"/><circle r="40" fill="url(#gSun)"/><circle r="40" fill="#fff" opacity=".6" filter="url(#fBlur4)"/></g>`;
const cloud = (x, y, s, lit) => {
  let e = ''; for (let i = 0; i < 5; i++) e += `<ellipse cx="${f(r(-90, 90))}" cy="${f(r(-14, 6))}" rx="${f(r(55, 115))}" ry="${f(r(10, 19))}" fill="url(#gPuff)"/>`;
  e += `<ellipse cx="${f(r(-20, 20))}" cy="10" rx="${f(r(110, 150))}" ry="7" fill="url(#gPuffLit)"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})" opacity="${lit ? '.8' : '.65'}">${e}</g>`;
};
let clouds = ''; for (let i = 0; i < 6; i++) clouds += cloud(140 + i * 270 + r(-50, 50), r(110, 260), r(0.8, 1.5), i % 2 === 0);
let streaks = ''; for (let i = 0; i < 5; i++) streaks += `<ellipse cx="${f(150 + i * 330 + r(-40, 40))}" cy="${f(r(440, 500))}" rx="${f(r(120, 220))}" ry="${f(r(4, 8))}" fill="#fff1d4" opacity="${f(r(0.35, 0.6))}"/>`;
const bird = (x, y, s, d, delay) => `<g transform="translate(${x} ${y}) scale(${s})"><g><animateTransform attributeName="transform" type="translate" values="0 0;560 -40" dur="${d}s" begin="${delay}s" repeatCount="indefinite"/><g><animateTransform attributeName="transform" type="scale" values="1 1;1 .2;1 1" dur=".5s" repeatCount="indefinite"/><path d="M-11 0Q-6 -6 -1 -1L0 0L1 -1Q6 -6 11 0" fill="none" stroke="#3d3a30" stroke-width="1.8" stroke-linecap="round"/></g></g></g>`;
const birds = bird(470, 340, 1, 17, -3) + bird(505, 322, 0.8, 19, -8) + bird(440, 356, 0.7, 16, -12);

/* ================= LIFE ================= */
function egret(x, y, s, flip, peck) {
  const headAnim = peck ? `<animateTransform attributeName="transform" type="rotate" values="0 7 -30;0 7 -30;58 7 -30;58 7 -30;0 7 -30" keyTimes="0;.55;.65;.85;1" dur="${f(r(4, 6))}s" begin="${f(-r(0, 5))}s" repeatCount="indefinite"/>` : '';
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})"><path d="M-1 0L1 -14M4 0L4 -14" stroke="#2f2a25" stroke-width="1.1"/>
  <path d="M-12 -18Q-4 -25 7 -21Q11 -18 6 -14Q-4 -12 -12 -18Z" fill="#fbfaf4"/><path d="M-12 -18Q-4 -14 6 -14" stroke="#d8d4c7" stroke-width="1" fill="none"/>
  <g>${headAnim}<path d="M6 -20Q12 -27 8 -33Q5 -38 9 -41" stroke="#fbfaf4" stroke-width="3.2" fill="none" stroke-linecap="round"/><circle cx="10" cy="-42" r="2.6" fill="#fbfaf4"/><path d="M12 -42L20 -40" stroke="#e3ac35" stroke-width="1.5" stroke-linecap="round"/></g></g>`;
}
const flyingEgret = `<g transform="translate(260 300)"><g><animateTransform attributeName="transform" type="translate" values="0 0;900 -70" dur="24s" begin="-6s" repeatCount="indefinite"/>
  <ellipse cx="0" cy="0" rx="13" ry="3.6" fill="#fbfaf4"/><path d="M12 -1Q18 -4 22 -2" stroke="#fbfaf4" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M22 -2L28 -1" stroke="#e3ac35" stroke-width="1.3"/><path d="M-12 0L-24 3M-12 1L-23 6" stroke="#2f2a25" stroke-width="1"/>
  <g><animateTransform attributeName="transform" type="scale" values="1 1;1 -.55;1 1" dur="1.1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/><path d="M-6 0Q-2 -22 12 -26Q6 -10 6 0Z" fill="#f4f1e8"/></g></g></g>`;
function worker(x, y, s, flip) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})"><g><animateTransform attributeName="transform" type="rotate" values="0 0 -18;6 0 -18;0 0 -18" dur="${f(r(1.6, 2.4))}s" begin="${f(-r(0, 2))}s" repeatCount="indefinite"/>
  <path d="M-4 0L-3 -18M4 0L3 -18" stroke="#5a3a24" stroke-width="3"/><path d="M-6 -16Q4 -30 18 -28Q20 -22 14 -18Q2 -14 -6 -16Z" fill="${rnd() < 0.5 ? '#e9e2d0' : '#c9544a'}"/>
  <circle cx="20" cy="-27" r="4.5" fill="#5a3a24"/><path d="M15 -31Q20 -35 25 -31" stroke="#e8d9a8" stroke-width="3" fill="none"/><path d="M12 -22L18 -10" stroke="#5a3a24" stroke-width="2.4"/></g></g>`;
}
function smoke(x, y) {
  let s = ''; for (let i = 0; i < 4; i++) s += `<circle cx="${x}" cy="${y}" r="5" fill="#ece6dc" opacity="0"><animate attributeName="opacity" values="0;.55;0" dur="5s" begin="${-i * 1.25}s" repeatCount="indefinite"/><animate attributeName="r" values="4;14" dur="5s" begin="${-i * 1.25}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 0;-28 -58" dur="5s" begin="${-i * 1.25}s" repeatCount="indefinite"/></circle>`;
  return s;
}

/* ================= LAND ================= */
function treeRound(x, y, s) {
  const pts = []; while (pts.length < 13) { const cx = r(-30, 30), cy = -46 + r(-20, 16); if ((cx / 32) ** 2 + ((cy + 46) / 24) ** 2 < 1) pts.push([cx, cy, r(8, 14)]); }
  const c = (dx, dy, k, fill, op) => pts.map(([cx, cy, rr]) => `<circle cx="${f(cx + dx)}" cy="${f(cy + dy)}" r="${f(rr * k)}"/>`).join('');
  const lit = pts.filter(([cx, cy]) => cx > -8 && cy < -44).map(([cx, cy, rr]) => `<circle cx="${f(cx + 2)}" cy="${f(cy - 2)}" r="${f(rr * 0.62)}"/>`).join('');
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><ellipse cx="2" cy="1" rx="26" ry="3" fill="#2d2a1c" opacity=".18"/>
  <path d="M-3 0Q-4 -20 -2 -34L3 -34Q2 -18 4 0Z" fill="#3b3226"/><path d="M-1 -26Q-10 -34 -16 -40M1 -28Q8 -36 14 -42" stroke="#3b3226" stroke-width="2" fill="none"/>
  <g fill="#34502e">${c(-2, 4, 1)}</g><g fill="#56744a">${c(0, 0, 0.92)}</g><g fill="#8ea463" opacity=".85">${lit}</g></g>`;
}
function palm(x, y, s) {
  let fr = ''; for (let i = 0; i < 9; i++) { const a = -170 + i * 20 + r(-6, 6), rad = (a * Math.PI) / 180, L = r(34, 46); const ex = Math.cos(rad) * L, ey = Math.sin(rad) * L * 0.75 + 12; fr += `<path d="M0 -92Q${f(ex * 0.5)} ${f(-92 + ey * 0.2 - 12)} ${f(ex)} ${f(-92 + ey)}" stroke="${i % 2 ? '#4f6a3e' : '#6b8549'}" stroke-width="${f(r(3, 5))}" fill="none" stroke-linecap="round"/>`; }
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><path d="M-2.5 0Q-6 -50 -1 -92L2.5 -92Q-1 -50 3 0Z" fill="#4a3d2c"/>${fr}<circle cx="0" cy="-91" r="5" fill="#3b4a2c"/></g>`;
}
function hut(x, y, s) {
  return `${smoke(f(x + 8 * s), f(y - 28 * s))}<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><rect x="-20" y="-18" width="40" height="18" fill="#e9dcc2"/><rect x="-20" y="-18" width="14" height="18" fill="#cdbd9f"/><path d="M-25 -17L0 -31L25 -17Z" fill="#9b5a3a"/><path d="M-25 -17L0 -31L0 -24L-20 -14Z" fill="#7d4630"/><rect x="4" y="-10" width="7" height="10" fill="#5a4636"/></g>`;
}
let trees = ''; { let x = 30; while (x < W - 40) { const k = rnd(); trees += k < 0.38 ? palm(x, 604, r(0.6, 0.95)) : k < 0.9 ? treeRound(x, 604, r(0.7, 1.15)) : hut(x, 604, r(0.8, 1)); x += r(45, 120); } }
let poles = ''; for (let x = 100; x < W; x += 400) poles += `<path d="M${x} 604V548M${x - 8} 552H${x + 8}" stroke="#5f5648" stroke-width="2"/>`;
poles += `<path d="M100 552Q300 562 500 552Q700 562 900 552Q1100 562 1300 552Q1500 562 1700 552" stroke="#5f5648" stroke-width=".8" fill="none" opacity=".7"/>`;
// far field rows in perspective (spacing grows toward the viewer)
let workers = ''; for (const [x, y, sc] of [[230, 646, 0.32], [262, 650, 0.34], [298, 644, 0.31], [1120, 652, 0.36], [1158, 648, 0.33]]) workers += worker(x, y, sc, rnd() < 0.5);
let farRows = ''; { let y = 608, gap = 3; while (y < 676) { farRows += `<path d="M0 ${f(y)}H${W}" stroke="${rnd() < 0.5 ? '#d9cf8e' : '#94b45c'}" stroke-width="${f(gap * 0.35)}" opacity=".7"/>`; y += gap; gap *= 1.12; } }
// mid field: water rows reflecting the sky + clump rows growing with depth
// dense rows of young paddy (ragged blade tips) over water that reflects the sunrise; rows get taller and further apart toward you
const ROWS = [[680, 8, 0], [690, 10.5, 1], [702, 13, 2], [716, 16, 3], [733, 20, 4], [754, 24, 5]];
let rowGrads = ''; const TIP = ['#c9cf8a', '#bcca78', '#acc466', '#9cbd58', '#8db64d', '#7fae44'], BASE = ['#8fa860', '#7f9f52', '#6f9748', '#5f8d3e', '#527f35', '#46732d'];
for (let i = 0; i < 6; i++) rowGrads += `<linearGradient id="gRow${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${TIP[i]}"/><stop offset=".55" stop-color="${BASE[i]}"/><stop offset="1" stop-color="${BASE[i]}"/></linearGradient>`;
let mid = `<rect y="672" width="${W}" height="100" fill="url(#gWater)"/><rect y="672" width="${W}" height="100" fill="#8fae5c" opacity=".62"/>`;
for (const [y, h, i] of ROWS) {
  const st = 3.4 + i * 0.7, R0 = Math.round; let d = `M0 ${y}`;
  for (let x = 0; x < W; x += st * r(0.7, 1.3)) { const clumpy = 0.8 + 0.2 * Math.sin(x * 0.045 + i * 1.7); d += `L${R0(Math.max(0, Math.min(W, x + r(-st, st))))} ${R0(y - h * clumpy * r(0.55, 1))}L${R0(Math.min(W, x + st * r(0.3, 0.7)))} ${R0(y - h * r(0.2, 0.45))}`; }
  let tall = ''; for (let x = r(0, 20); x < W; x += r(14, 30)) { const tx = x + r(-6, 6), th = h * r(1.1, 1.5); tall += `M${R0(x)} ${y}q${R0((tx - x) * 0.3)} ${R0(-th * 0.6)} ${R0(tx - x)} ${R0(-th)}`; }
  mid += `<path d="${d}L${W} ${y}Z" fill="url(#gRow${i})"/><path d="${tall}" stroke="${TIP[i]}" stroke-width="${f(0.8 + i * 0.2)}" fill="none" stroke-linecap="round"/><path d="M0 ${y + 0.6}H${W}" stroke="#3f6a2a" stroke-width="${f(0.6 + i * 0.15)}" opacity=".35"/>`;
}
// bund: earth with grass fringe, pebbles, cracks
let bund = `<path d="${wave(765, [[1.5, 4, 0.5]], 808)}" fill="url(#gBund)"/><path d="${wave(765, [[1.5, 4, 0.5]], 771)}" fill="#a2875a" opacity=".6"/><path d="${wave(773, [[1.2, 4, 0.5]], 783)}" fill="#c9a979" opacity=".35"/><path d="${wave(801, [[1.5, 4, 0.5]], 808)}" fill="#3e2a17" opacity=".35"/>`;
for (let x = 6; x < W - 6; x += r(7, 14)) { const h = r(5, 13); bund += `<path d="M${f(x)} ${f(766 + r(-1, 1))}q${f(r(-2, 2))} ${f(-h * 0.6)} ${f(r(-4, 4))} ${f(-h)}" stroke="${rnd() < 0.5 ? '#6f8f3a' : '#8aa548'}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`; }
for (let x = 10; x < W - 10; x += r(10, 18)) bund += `<path d="M${f(x)} ${f(806 + r(-1, 1))}q${f(r(-2, 2))} -6 ${f(r(-3, 3))} -11" stroke="#557c2e" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
for (let i = 0; i < 70; i++) { const x = r(10, W - 10), y = r(774, 800); bund += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r(1.5, 4.5))}" ry="${f(r(1, 2.2))}" fill="${rnd() < 0.5 ? '#6a4e31' : '#c4a678'}" opacity=".6"/>`; }
for (let i = 0; i < 14; i++) { const x = r(20, W - 40), y = r(780, 798); bund += `<path d="M${f(x)} ${f(y)}l${f(r(6, 12))} ${f(r(-2, 2))}l${f(r(4, 9))} ${f(r(-2, 3))}" stroke="#4f3822" stroke-width=".9" fill="none" opacity=".5"/>`; }
// near field: water + big clumps
let near = `<rect y="806" width="${W}" height="94" fill="url(#gFieldNear)"/><rect y="806" width="${W}" height="10" fill="url(#gWater)" opacity=".55"/>`;
{ const rows = [[840, .95, 60], [866, 1.25, 72], [898, 1.65, 88]]; for (const [y, sc, gap] of rows) { near += `<rect y="${y - 3}" width="${W}" height="${f(4 + sc * 2)}" fill="url(#gWater)" opacity=".7"/>`; for (let x = r(0, gap); x < W - 20; x += gap * r(0.85, 1.15)) near += `<use href="#${rnd() < 0.3 ? 'wG' : 'wC'}${Math.floor((x / W) * WAVES * 2) % WAVES}" transform="translate(${f(x)} ${y}) scale(${f(sc * r(0.9, 1.15))})"/>`; } }
// water glints that twinkle
for (let i = 0; i < 12; i++) { const y = [840, 866, 898][i % 3] - 1, x = r(20, W - 40); near += `<ellipse cx="${f(x)}" cy="${y}" rx="${f(r(5, 11))}" ry="1.2" fill="#fffbe8" opacity="0"><animate attributeName="opacity" values="0;.9;0" dur="${f(r(1.6, 2.8))}s" begin="${f(-r(0, 3))}s" repeatCount="indefinite"/></ellipse>`; }
// out-of-focus foreground
let front = ''; for (let x = 80; x < W - 80; x += r(180, 300)) front += `<use href="#${rnd() < 0.5 ? 'cF1' : 'cF2'}" transform="translate(${f(x)} 930) scale(${f(r(3.2, 4))})"/>`;
// sunlit motes
let motes = ''; for (let i = 0; i < 7; i++) { const x = r(300, 1400), y = r(250, 720), d = f(r(9, 16)); motes += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r(1.5, 3.5))}" fill="url(#gMote)" opacity="0"><animate attributeName="opacity" values="0;.9;0" dur="${d}s" begin="${f(-r(0, 16))}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 0;${f(r(-80, -30))} ${f(r(-60, -20))}" dur="${d}s" begin="${f(-r(0, 16))}s" repeatCount="indefinite"/></circle>`; }

/* ================= FARMER ================= */
// local coords: feet on ground (0,0), facing right. hip (0,-150), knee (0,-78), ankle (1,-11)
const KT = '0;.25;.5;.66;.86;1';
const animRot = (vals, px, py, begin) => `<animateTransform attributeName="transform" type="rotate" values="${vals.map((v) => `${v} ${px} ${py}`).join(';')}" keyTimes="${KT}" calcMode="spline" keySplines="${sp(5)}" dur="${STEP}s" begin="${begin}s" repeatCount="indefinite"/>`;
function leg(near, begin) {
  const skin = near ? 'url(#gSkin)' : 'url(#gSkinFar)', dark = near ? '#4e2d1a' : '#3c2214', sole = near ? '#2f2a27' : '#24201d', strap = near ? '#3f6fa8' : '#2f5480';
  return `<g>${animRot([-25, -6, 22, 8, -20, -25], 0, -150, begin)}
  <path d="M-13 -156Q0 -160 13 -155Q12 -118 10 -80Q8 -70 0 -69Q-9 -70 -11 -80Q-15 -120 -13 -156Z" fill="${skin}"/><circle cx="0" cy="-78" r="10.6" fill="${skin}"/>
  <g>${animRot([6, 10, 16, 58, 24, 6], 0, -78, begin)}
   <path d="M-10 -86Q0 -92 10 -85Q11 -77 8 -70Q5 -40 5 -16Q1 -10 -4 -14Q-6 -38 -12 -56Q-16 -72 -10 -86Z" fill="${skin}"/>
   <path d="M5 -70Q8 -50 5 -18" stroke="${near ? '#c28654' : '#5a3520'}" stroke-width="1.4" fill="none" opacity=".6"/>
   <path d="M-11 -62Q-8 -50 -6 -30" stroke="${dark}" stroke-width="1.2" fill="none" opacity=".5"/>
   <g>${animRot([7, -4, -8, -51, -9, 7], 1, -11, begin)}
    <path d="M-7 -16Q-9 -6 -7 -2L18 -2Q25 -3 25 -6Q23 -9 15 -11Q6 -13 4 -17Z" fill="${skin}"/>
    <path d="M17 -6Q20 -9 24 -7M13 -9Q15 -11 18 -10" stroke="${dark}" stroke-width=".9" fill="none" opacity=".6"/>
    <path d="M-9 -2.2Q8 -3.4 26 -2.8Q28 -1 26 .6L-8 .8Q-10 -.6 -9 -2.2Z" fill="${sole}"/>
    <path d="M14 -2.6Q9 -9 5 -12M14 -2.6Q17 -8 19 -9" stroke="${strap}" stroke-width="1.6" fill="none"/></g>
  </g></g>`;
}
const farArm = `<g>${animRot([-20, 0, 18, 6, -14, -20], -9, -229, 0)}
  <path d="M-21 -236Q-9 -243 1 -233L-1 -204Q-10 -199 -20 -205Z" fill="#cbbfa3"/>
  <path d="M-18 -207Q-10 -210 -3 -206L-4 -196Q-10 -192 -17 -196Z" fill="url(#gSkinFar)"/>
  <g>${animRot([-26, -8, -6, -10, -22, -26], -10, -200, 0)}
   <path d="M-17 -202Q-10 -206 -3 -201Q-2 -184 -4 -164Q-9 -159 -14 -163Q-19 -183 -17 -202Z" fill="url(#gSkinFar)"/>
   <path d="M-15 -165Q-8 -168 -3 -163Q-1 -152 -6 -147Q-13 -146 -16 -152Z" fill="#4a2a18"/></g></g>`;
const lungi = `<g transform="translate(0 -172)"><g><animateTransform attributeName="transform" type="skewX" values="5;-5;5" keyTimes="0;.5;1" calcMode="spline" keySplines="${sp(2)}" dur="${STEP / 2}s" begin="-.1s" repeatCount="indefinite"/>
  <path d="M-28 0Q0 -6 28 1L33 66Q5 76 -31 68Z" fill="url(#pCheck)"/>
  <path d="M-28 0Q0 -6 28 1L33 66Q5 76 -31 68Z" fill="url(#gLungiShade)"/>
  <path d="M14 3Q20 26 15 54M-6 5Q-10 30 -13 62M4 4Q5 30 2 66" stroke="#163d26" stroke-width="2.2" fill="none" opacity=".45"/>
  <path d="M-31 68Q5 76 33 66L33 61Q5 71 -31 63Z" fill="#d8b153"/><path d="M-31 63Q5 71 33 61" stroke="#8f6c25" stroke-width=".8" fill="none"/>
  <path d="M-28 0Q0 -6 28 1L28 8Q0 2 -28 7Z" fill="#1f4a30"/><path d="M14 2Q20 10 16 22Q12 12 10 3Z" fill="#244f35"/></g></g>`;
const torso = `<g>
  <path d="M-27 -243Q-3 -254 23 -241Q32 -205 29 -164Q12 -156 0 -158Q-15 -156 -29 -163Q-35 -206 -27 -243Z" fill="url(#gShirt)"/><path d="M-27 -243Q-31 -220 -29 -200" stroke="#a99b7c" stroke-width="2" fill="none" opacity=".35"/>
  <path d="M-12 -226Q-17 -196 -14 -168M3 -230Q0 -200 2 -166M16 -228Q21 -198 19 -166" stroke="#b9ab8c" stroke-width="1.6" fill="none" opacity=".55"/>
  <path d="M-25 -210Q-14 -204 -4 -208M-27 -186Q-15 -180 -2 -184" stroke="#b9ab8c" stroke-width="1.3" fill="none" opacity=".45"/>
  <path d="M27 -230Q32 -200 29 -166" stroke="#fff6dc" stroke-width="2.4" fill="none" opacity=".9"/>
  <path d="M5 -246L13 -226L21 -242" fill="#83502f" stroke="#c9bb9c" stroke-width="2"/><path d="M13 -226L13 -168" stroke="#d3c6a8" stroke-width="1.2"/>
  <circle cx="13" cy="-214" r="1.2" fill="#a99b7c"/><circle cx="13" cy="-198" r="1.2" fill="#a99b7c"/><circle cx="13" cy="-182" r="1.2" fill="#a99b7c"/>
  <path d="M-4 -222h12v12q-6 3 -12 0Z" fill="none" stroke="#c4b799" stroke-width="1.3"/>
  <path d="M8 -243Q17 -236 24 -239L22 -224Q13 -222 6 -229Z" fill="#8f8065" opacity=".3"/>
  <path d="M-29 -190Q-26 -175 -27 -164Q-14 -158 -2 -159" stroke="#8f8065" stroke-width="3" fill="none" opacity=".22"/></g>`;
const head = `<g>
  <path d="M-5 -253Q2 -256 9 -252L11 -236Q2 -232 -6 -236Z" fill="#6a3e24"/>
  <path d="M-16 -270Q-17 -292 3 -294Q16 -294 20 -284Q21 -279 20 -276Q22 -272 25 -267Q26 -264 22 -263Q23 -261 21 -259Q22 -256 20 -254Q19 -250 12 -249Q3 -247 -6 -252Q-15 -258 -16 -270Z" fill="url(#gSkin)"/>
  <path d="M25 -267Q26 -264 22 -263" stroke="#5a341f" stroke-width="1" fill="none"/>
  <path d="M-16 -272Q-17 -293 3 -295Q14 -295 18 -288Q8 -287 0 -283Q-6 -276 -10 -266Q-12 -259 -14 -262Q-17 -266 -16 -272Z" fill="#1a120c"/>
  <path d="M-6 -277Q-2 -280 -1 -270Q-1 -262 -5 -261Q-9 -263 -8 -270Q-8 -275 -6 -277Z" fill="#7a4628"/><path d="M-5 -273Q-3 -270 -4 -265" stroke="#4a2a18" stroke-width="1" fill="none"/>
  <path d="M9 -276Q13 -279 17 -276Q13 -273 9 -276Z" fill="#efe3d0"/><circle cx="14" cy="-276" r="1.7" fill="#1a120c"/><path d="M8 -277Q13 -281 18 -277" stroke="#1a120c" stroke-width="1" fill="none"/>
  <path d="M7 -282Q13 -285 19 -282" stroke="#1a120c" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M15 -265Q12 -268 13 -271" stroke="#5a341f" stroke-width="1" fill="none" opacity=".7"/>
  <path d="M12 -262Q18 -266 24 -262Q22 -258 17 -259Q14 -259 12 -262Z" fill="#1a120c"/>
  <path d="M15 -256Q19 -255 21 -256" stroke="#5a2e1c" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M20 -283Q22 -276 24 -268Q26 -264 23 -263M21 -258Q21 -253 18 -251" stroke="#e8a874" stroke-width="1.1" fill="none" opacity=".8"/>
  <path d="M-19 -293Q3 -305 26 -294Q28 -288 24 -286Q3 -292 -18 -286Q-22 -289 -19 -293Z" fill="url(#pGamcha)"/>
  <path d="M-19 -293Q3 -305 26 -294Q28 -288 24 -286Q3 -292 -18 -286Q-22 -289 -19 -293Z" fill="#000" opacity=".12"/>
  <path d="M-15 -290Q3 -298 22 -291" stroke="#7a2219" stroke-width="1.2" fill="none" opacity=".7"/>
  <path d="M-18 -294Q3 -304 25 -295Q24 -290 22 -289Q3 -296 -16 -289Z" fill="#000" opacity=".22"/>
  <ellipse cx="12" cy="-266" rx="4.5" ry="3.2" fill="#d99a60" opacity=".35"/><path d="M-7 -253Q3 -247 13 -249" stroke="#4a2a18" stroke-width="2" fill="none" opacity=".3"/>
  <path d="M-15 -268Q-13 -258 -6 -253" stroke="#3e2314" stroke-width="2.4" fill="none" opacity=".35"/></g>`;
const SACK = 'M-78 -362Q-40 -373 2 -371Q44 -373 80 -362Q86 -364 88 -360Q86 -356 84 -352Q92 -330 84 -306Q87 -301 86 -297Q82 -296 78 -298Q42 -286 2 -289Q-38 -286 -76 -298Q-81 -296 -85 -297Q-86 -301 -82 -306Q-90 -330 -82 -354Q-85 -358 -84 -362Q-81 -365 -78 -362Z';
const sack = `<g><animateTransform attributeName="transform" type="translate" values="0 -2.4;0 1.6;0 -2.4" keyTimes="0;.5;1" calcMode="spline" keySplines="${sp(2)}" dur="${STEP / 2}s" begin="-.18s" repeatCount="indefinite"/><g><animateTransform attributeName="transform" type="rotate" values="-1.4 2 -294;1.1 2 -294;-1.4 2 -294" keyTimes="0;.5;1" calcMode="spline" keySplines="${sp(2)}" dur="${STEP / 2}s" begin="-.14s" repeatCount="indefinite"/>
  <path d="${SACK}" fill="url(#gSack)"/>
  <path d="${SACK}" fill="url(#pWeave)" opacity=".07"/>
  <path d="M-70 -335Q2 -326 78 -336" stroke="#245a39" stroke-width="6" fill="none" opacity=".92"/><path d="M-72 -326Q2 -317 80 -327" stroke="#d8ab3e" stroke-width="2.8" fill="none" opacity=".9"/>
  <image href="assets/logo/ssr-mark.png" x="-31" y="-368" width="62" height="32.5" transform="rotate(-1 0 -352)" opacity=".95"/>
  <text x="1" y="-311" text-anchor="middle" font-family="Jost,sans-serif" font-size="6.6" font-weight="600" letter-spacing="1" fill="#1f3d2b" opacity=".85">PREMIUM RICE</text>
  <path d="M-22 -291Q-12 -306 -16 -320M22 -291Q14 -306 18 -320M-4 -290Q2 -300 8 -290" stroke="#958b75" stroke-width="1.3" fill="none" opacity=".5"/>
  <path d="M-60 -296Q-52 -318 -58 -344M58 -297Q66 -318 60 -344" stroke="#a69d89" stroke-width="1.2" fill="none" opacity=".35"/>
  <path d="${SACK}" fill="url(#gSackSide)"/>
  <path d="M-80 -357Q-88 -330 -80 -303" stroke="#ada38c" stroke-width="1.3" stroke-dasharray="2.6 2.4" fill="none"/>
  <path d="M84 -352Q92 -330 84 -306" stroke="#fff0cc" stroke-width="2" fill="none" opacity=".85"/>
  <path d="M-78 -362Q-40 -373 2 -371Q44 -373 80 -362" stroke="#fffaf0" stroke-width="1.6" fill="none" opacity=".8"/></g></g>`;
const nearArm = `<g>
  <path d="M40 -255Q42 -276 44 -296L56 -299Q57 -276 54 -251Z" fill="url(#gSkinArm)"/>
  <path d="M27 -252Q36 -262 46 -261Q55 -258 54 -249Q44 -244 33 -237Z" fill="url(#gSkinArm)"/>
  <path d="M33 -254Q41 -259 48 -258" stroke="#c28654" stroke-width="1.2" fill="none" opacity=".7"/><path d="M45 -264Q47 -280 48 -294" stroke="#4e2d1a" stroke-width="1.1" fill="none" opacity=".5"/>
  <path d="M55 -297Q57 -276 54 -252" stroke="#e4a26c" stroke-width="1.1" fill="none" opacity=".8"/>
  <path d="M13 -244Q21 -250 30 -250L33 -238Q22 -233 13 -235Z" fill="#f3ecdc"/><path d="M30 -250L33 -238" stroke="#cfc2a4" stroke-width="2"/>
  <path d="M41 -301Q43 -313 53 -312Q61 -309 60 -300Q57 -294 47 -295Z" fill="url(#gSkinArm)"/>
  <path d="M47 -310Q52 -313 58 -309M45 -305Q51 -308 58 -304M45 -300Q51 -302 57 -299" stroke="#4e2d1a" stroke-width=".9" fill="none" opacity=".6"/>
  <path d="M41 -301Q38 -306 41 -310Q44 -310 45 -306" fill="#7a4628"/></g>`;
const puff = (begin) => `<g opacity="0"><animate attributeName="opacity" values="0;.5;0" keyTimes="0;.15;1" dur=".8s" begin="${begin}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="60 -3;-110 -18" dur=".8s" begin="${begin}s" repeatCount="indefinite"/>
  <g fill="url(#gDust)"><circle r="9"/><circle cx="-11" cy="-4" r="8"/><circle cx="8" cy="-7" r="6"/></g></g>`;
const farmer = `<g transform="translate(800 772) scale(1.14)">
 <ellipse cx="6" cy="1" rx="62" ry="8" fill="url(#gShadow)"><animate attributeName="rx" values="58;68;58;68;58" keyTimes="0;.25;.5;.75;1" dur="${STEP}s" repeatCount="indefinite"/></ellipse>
 ${puff(0)}${puff(STEP / 2)}
 <g><animateTransform attributeName="transform" type="translate" values="0 11;0 0;0 11;0 0;0 11" keyTimes="0;.25;.5;.75;1" calcMode="spline" keySplines="${sp(4)}" dur="${STEP}s" repeatCount="indefinite"/>
  ${farArm}${leg(false, -STEP / 2)}${leg(true, 0)}${lungi}
  <g transform="rotate(-2 0 -160)"><g><animateTransform attributeName="transform" type="rotate" values="-1.3 0 -165;1.3 0 -165;-1.3 0 -165" keyTimes="0;.5;1" calcMode="spline" keySplines="${sp(2)}" dur="${STEP}s" repeatCount="indefinite"/>${torso}<g><animateTransform attributeName="transform" type="rotate" values="1 2 -250;-1.2 2 -250;1 2 -250" keyTimes="0;.5;1" calcMode="spline" keySplines="${sp(2)}" dur="${STEP / 2}s" repeatCount="indefinite"/>${head}${sack}</g>${nearArm}</g></g>
 </g></g>`;

/* ================= ASSEMBLE ================= */
// Two layers: a still background (painted once) and the animated scene on top (transparent where the sky shows).
// The warm colour grade and vignette are plain CSS on .ldr::after so they are never repainted.
const svgOpen = (cls) => `<svg class="${cls}" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">`;
const still = `${svgOpen('ldr-sky')}<defs>${defs}</defs><rect width="1600" height="900" fill="url(#gSky)"/>${sun}${streaks}</svg>`;
const moving = `${svgOpen('ldr-scene')}<defs>${rowGrads}${symbols}</defs>
${layer('lCloud', clouds, 10)}
${birds}${flyingEgret}
${layer('lHill1', `<path d="${wave(540, [[16, 2, 0.4], [8, 5, 1.3], [3, 11, 2]], 900)}" fill="url(#gHill1)"/>`, 6)}
${layer('lHill2', `<path d="${wave(570, [[11, 3, 2.1], [6, 7, 0.2], [2, 15, 1]], 900)}" fill="url(#gHill2)"/>`, 14)}
<rect y="560" width="1600" height="70" fill="url(#gMist)"/>
${layer('lTrees', trees + poles, 30, 'opacity=".92"')}
${layer('lFarField', `<rect y="604" width="${W}" height="300" fill="url(#gFieldFar)"/>${farRows}${workers}`, 55)}
${layer('lMid', `<rect y="676" width="${W}" height="100" fill="#86b04c"/>${mid}${egret(420, 704, 0.62, false, true)}${egret(470, 700, 0.55, true, false)}${egret(1290, 724, 0.72, false, true)}`, 110)}
${layer('lBund', bund, GROUND_SPEED)}
${layer('lNear', near, 290)}
${farmer}
${layer('lFront', front, 520)}
${motes}
</svg>`;
process.stdout.write((still + moving).replace(/\n\s*/g, ''));
