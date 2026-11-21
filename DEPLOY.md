# Deploying the SSR Rice Mill website

The site is plain HTML, CSS and JS with no framework. `node build.mjs` copies the needed files into `dist/`.
Pages: `index.html` (option picker), `v2-midnight-gold.html`, `v4-amoha-style.html`.

## Before you deploy
- [ ] In `v2-midnight-gold.html`, replace `WHATSAPP="91XXXXXXXXXX"` with the mill's real number (country code + number, no `+`).
- [ ] Add the phone number / email you want shown (ask Claude to add them).
- [ ] Videos total about 90 MB. Compress them if you can (see `assets/FOOTAGE-CHECKLIST.txt`) for faster loading on phones.
- [ ] Check the Pexels licence on each clip (`assets/CREDITS.txt`).
- [ ] Decide which design is final; then make it `index.html` so visitors land on it.

## Option A: Vercel
Command line (fastest):
```
cd ssr-rice-mill
npx vercel          # first run: log in, accept defaults (settings come from vercel.json)
npx vercel --prod   # publish to the production URL
```
Or from GitHub: push this folder to a repo, then vercel.com -> Add New -> Project -> Import. Leave the settings as they are (vercel.json sets build command `node build.mjs` and output `dist`).

Note: Vercel's free Hobby plan is for personal, non-commercial use. A business site should check Vercel's current terms or use a paid plan.

## Option B: Render (Static Site)
1. Push this folder to a GitHub repo.
2. render.com -> New -> Static Site -> pick the repo.
3. Build command: `node build.mjs`   Publish directory: `dist`   (render.yaml already says this.)
4. Create Static Site. Render gives you a `.onrender.com` address.

## Custom domain
Add the domain in the host's dashboard (Vercel: Project -> Settings -> Domains. Render: Settings -> Custom Domains) and set the DNS records it shows.

## Updating later
Edit the files, run `node build.mjs`, then deploy again (or push to GitHub for automatic deploys).
