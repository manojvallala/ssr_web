// Premium loading screen: gold silhouette of a farmer carrying a rice sack on his head, walking along a fine horizon
// line past line-drawn paddy stalks. Prints one <svg class="ldr-walk">...</svg>.
// Edit, then run:  node tools/loader-walk.cjs  and paste the output into index.html (replacing the old <svg class="ldr-walk">).
let seed = 5; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const r = (a, b) => a + (b - a) * rnd();
const f = (n) => Math.round(n * 100) / 100;
const W = 520, GROUND = 112, STEP = 1.15, S = 0.27;          // box width, horizon y, seconds per stride cycle, figure scale
const sp = (n) => Array(n).fill('.42 0 .58 1').join(';');
const KT = '0;.25;.5;.66;.86;1';
const rot = (vals, px, py, begin = 0) => `<animateTransform attributeName="transform" type="rotate" values="${vals.map((v) => `${v} ${px} ${py}`).join(';')}" keyTimes="${KT}" calcMode="spline" keySplines="${sp(5)}" dur="${STEP}s" begin="${begin}s" repeatCount="indefinite"/>`;

/* paddy stalks drawn as fine gold lines; two copies scroll left at the walking speed */
function stalk(x, h) {
  const lean = r(-5, 5), top = GROUND - h, dir = rnd() < 0.5 ? -1 : 1;
  let d = `M${f(x)} ${GROUND}Q${f(x + lean * 0.3)} ${f(GROUND - h * 0.5)} ${f(x + lean)} ${f(top)}`;
  d += `Q${f(x + lean + dir * 6)} ${f(top - 2)} ${f(x + lean + dir * 9)} ${f(top + 8)}`;
  d += `M${f(x + lean * 0.2)} ${f(GROUND - h * 0.3)}q${f(-dir * 5)} ${f(-h * 0.2)} ${f(-dir * 9)} ${f(-h * 0.24)}`;
  let grains = ''; for (let i = 0; i < 4; i++) { const t = (i + 1) / 4; grains += `<ellipse cx="${f(x + lean + dir * (1 + t * 7.5))}" cy="${f(top - 0.5 + t * t * 8.5)}" rx="1" ry=".6"/>`; }
  return `<path d="${d}"/>${grains}`;
}
let stalks = ''; for (let x = 14; x < W - 14; x += r(26, 46)) stalks += stalk(x, r(16, 32));
const speed = 205 * S;                                    // matches the stride, so the feet don't slide
const tile = `<g><animateTransform attributeName="transform" type="translate" from="0 0" to="-${W} 0" dur="${f(W / speed)}s" repeatCount="indefinite"/><g id="lwS" fill="url(#lwGold)" stroke="url(#lwGold)" stroke-width=".7" stroke-linecap="round" opacity=".5"><g fill="none">${stalks.replace(/<ellipse[^>]*>/g, '')}</g>${(stalks.match(/<ellipse[^>]*>/g) || []).join('')}</g><use href="#lwS" x="${W}"/></g>`;

/* the walker (same rig as before, drawn as one gold silhouette); local coords: feet at 0,0, facing right */
function leg(begin, far) {
  return `<g opacity="${far ? 0.55 : 1}">${rot([-25, -6, 22, 8, -20, -25], 0, -150, begin)}
  <path d="M-13 -156Q0 -160 13 -155Q12 -118 10 -80Q8 -70 0 -69Q-9 -70 -11 -80Q-15 -120 -13 -156Z"/><circle cx="0" cy="-78" r="10.6"/>
  <g>${rot([6, 10, 16, 58, 24, 6], 0, -78, begin)}<path d="M-10 -86Q0 -92 10 -85Q11 -77 8 -70Q5 -40 5 -16Q1 -10 -4 -14Q-6 -38 -12 -56Q-16 -72 -10 -86Z"/>
   <g>${rot([7, -4, -8, -51, -9, 7], 1, -11, begin)}<path d="M-8 -16Q-10 -6 -8 0L24 0Q28 -2 25 -6Q14 -11 4 -17Z"/></g></g></g>`;
}
const farArm = `<g opacity=".55">${rot([-20, 0, 18, 6, -14, -20], -9, -229)}<path d="M-21 -236Q-9 -243 1 -233L-3 -200Q-10 -195 -18 -200Z"/>
  <g>${rot([-26, -8, -6, -10, -22, -26], -10, -200)}<path d="M-17 -202Q-10 -206 -3 -201Q-2 -184 -4 -164Q-9 -152 -12 -148Q-18 -150 -16 -164Q-19 -183 -17 -202Z"/></g></g>`;
const lungi = `<g transform="translate(0 -172)"><g><animateTransform attributeName="transform" type="skewX" values="5;-5;5" keyTimes="0;.5;1" calcMode="spline" keySplines="${sp(2)}" dur="${STEP / 2}s" begin="-.1s" repeatCount="indefinite"/><path d="M-28 0Q0 -6 28 1L33 66Q5 76 -31 68Z"/></g></g>`;
const upper = `<path d="M-27 -243Q-3 -254 23 -241Q32 -205 29 -164Q12 -156 0 -158Q-15 -156 -29 -163Q-35 -206 -27 -243Z"/>
  <path d="M-5 -253Q2 -256 9 -252L11 -236Q2 -232 -6 -236Z"/>
  <path d="M-16 -270Q-17 -292 3 -294Q16 -294 20 -284Q21 -279 20 -276Q22 -272 25 -267Q26 -264 22 -263Q23 -261 21 -259Q22 -256 20 -254Q19 -250 12 -249Q3 -247 -6 -252Q-15 -258 -16 -270Z"/>
  <path d="M-19 -293Q3 -305 26 -294Q28 -288 24 -286Q3 -292 -18 -286Q-22 -289 -19 -293Z"/>
  <g><animateTransform attributeName="transform" type="translate" values="0 -2.4;0 1.6;0 -2.4" keyTimes="0;.5;1" calcMode="spline" keySplines="${sp(2)}" dur="${STEP / 2}s" begin="-.18s" repeatCount="indefinite"/>
   <path d="M-78 -362Q-40 -373 2 -371Q44 -373 80 -362Q86 -364 88 -360Q86 -356 84 -352Q92 -330 84 -306Q87 -301 86 -297Q82 -296 78 -298Q42 -286 2 -289Q-38 -286 -76 -298Q-81 -296 -85 -297Q-86 -301 -82 -306Q-90 -330 -82 -354Q-85 -358 -84 -362Q-81 -365 -78 -362Z"/></g>
  <path d="M8 -245Q19 -253 32 -252L46 -261Q55 -258 54 -249L56 -299Q57 -312 52 -312Q43 -313 41 -301L44 -296L40 -255L36 -237Q22 -229 9 -232Z"/>`;
const walker = `<g transform="translate(${W / 2} ${GROUND}) scale(${S})">
 <ellipse cx="6" cy="2" rx="70" ry="7" fill="url(#lwShadow)"/>
 <g><animateTransform attributeName="transform" type="translate" values="0 11;0 0;0 11;0 0;0 11" keyTimes="0;.25;.5;.75;1" calcMode="spline" keySplines="${sp(4)}" dur="${STEP}s" repeatCount="indefinite"/>
  ${farArm}${leg(-STEP / 2, true)}${leg(0, false)}${lungi}<g transform="rotate(-2 0 -160)">${upper}</g>
 </g></g>`;

const svg = `<svg class="ldr-walk" viewBox="0 0 ${W} 126" aria-hidden="true" focusable="false"><defs>
<linearGradient id="lwGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4d892"/><stop offset=".55" stop-color="#d9b25a"/><stop offset="1" stop-color="#a9792a"/></linearGradient>
<linearGradient id="lwLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9b25a" stop-opacity="0"/><stop offset=".2" stop-color="#d9b25a" stop-opacity=".9"/><stop offset=".8" stop-color="#d9b25a" stop-opacity=".9"/><stop offset="1" stop-color="#d9b25a" stop-opacity="0"/></linearGradient>
<linearGradient id="lwFade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".18" stop-color="#fff"/><stop offset=".82" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="lwMask"><rect width="${W}" height="126" fill="url(#lwFade)"/></mask>
<radialGradient id="lwShadow"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
</defs>
<g mask="url(#lwMask)">${tile}</g>
<path d="M0 ${GROUND + 0.5}H${W}" stroke="url(#lwLine)" stroke-width="1"/>
<g fill="url(#lwGold)">${walker}</g>
</svg>`;
process.stdout.write(svg.replace(/\n\s*/g, ''));
