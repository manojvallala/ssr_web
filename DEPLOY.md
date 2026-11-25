# SSR Rice Mill website

A React app built with Vite. One page (the Paddy to Plate site) in English and Telugu.

## Work on it locally
Needs Node.js 18 or newer.
```
cd ssr-rice-mill
npm install        # first time only
npm run dev        # live preview at http://localhost:5173 (reloads as you edit)
npm run build      # production build into dist/
npm run preview    # serve the production build at http://localhost:5173
```

## Where things are
| What | Where |
|---|---|
| Loading screen (shows before the app loads) | `index.html` |
| All page styles | `src/styles.css` |
| Each section of the page | `src/components/` (Header, Hero, Story, RiceFinder, Gallery, Faq, Visit, Footer, ...) |
| Slideshow seconds, video speed, phone, email, map | `src/data/config.js` |
| Texts: announcement bar, FAQs, story chapters, rice finder, emails, call panel, all Telugu translations | `src/data/content.js` |
| Photos, videos, logo, favicon (served as `/assets/...`) | `public/assets/` |
| Original photos and old logo set (not published) | `assets/` |

## Before you deploy
- [ ] Videos total about 90 MB. Compress them if you can (see `assets/FOOTAGE-CHECKLIST.txt`) for faster loading on phones.
- [ ] Check the Pexels licence on each clip (`public/assets/CREDITS.txt`).
- [ ] Have a native Telugu speaker proofread the Telugu texts in `src/data/content.js`.

## Option A: Vercel
Command line (fastest):
```
cd ssr-rice-mill
npx vercel          # first run: log in, accept defaults (settings come from vercel.json)
npx vercel --prod   # publish to the production URL
```
Or from GitHub: push this folder to a repo, then vercel.com -> Add New -> Project -> Import. Leave the settings as they are (vercel.json sets install `npm ci`, build `npm run build` and output `dist`).

Note: Vercel's free Hobby plan is for personal, non-commercial use. A business site should check Vercel's current terms or use a paid plan.

## Option B: Render (Static Site)
1. Push this folder to a GitHub repo.
2. render.com -> New -> Static Site -> pick the repo.
3. Build command: `npm ci && npm run build`   Publish directory: `dist`   (render.yaml already says this.)
4. Create Static Site. Render gives you a `.onrender.com` address.

## Custom domain
Add the domain in the host's dashboard (Vercel: Project -> Settings -> Domains. Render: Settings -> Custom Domains) and set the DNS records it shows.

## Updating later
Edit the files, check with `npm run dev`, then deploy again (or push to GitHub for automatic deploys).
