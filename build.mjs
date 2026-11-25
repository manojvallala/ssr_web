// Copies only the files the live website needs into ./dist
// Run:  node build.mjs
import { cpSync, rmSync, mkdirSync, writeFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'dist';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const files = ['index.html', 'assets/hero.mp4', 'assets/hero-poster.jpg', 'assets/CREDITS.txt', 'assets/ICONS-LICENSE.txt'];
const dirs = ['assets/story', 'assets/logo', 'assets/pics/web', 'assets/loader'];

for (const f of files) {
  if (!existsSync(f)) { console.warn('missing, skipped:', f); continue; }
  mkdirSync(join(OUT, f, '..'), { recursive: true });
  cpSync(f, join(OUT, f));
}
for (const d of dirs) {
  if (!existsSync(d)) { console.warn('missing, skipped:', d); continue; }
  cpSync(d, join(OUT, d), { recursive: true });
}

writeFileSync(join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\n');

let total = 0, count = 0;
(function walk(p) {
  for (const e of readdirSync(p, { withFileTypes: true })) {
    const q = join(p, e.name);
    if (e.isDirectory()) walk(q); else { total += statSync(q).size; count++; }
  }
})(OUT);
console.log(`dist ready: ${count} files, ${(total / 1048576).toFixed(1)} MB`);
