# ServerPulse

Live game server status for Minecraft, Rust, ARK, DayZ, CS2, Garry's Mod and more: online or offline, player count and version or map. Built with [Astro](https://astro.build).

Live site: https://jbweb1.github.io/Serverpulse

## Why I built it

To learn Astro and practise web performance and SEO on something gamers would use.

## How it works

- Pages are generated as static HTML at build time.
- The server list lives in `src/data/servers.js`.
- One small script, `src/scripts/status.js`, calls public APIs in the browser and fills in the cards: [mcsrvstat.us](https://mcsrvstat.us) for Minecraft (Java and Bedrock) and [BattleMetrics](https://www.battlemetrics.com/developers) for other games.
- The list of supported games lives in `src/data/games.js`. Any game BattleMetrics tracks can be added there by its BattleMetrics game id.
- No UI framework, no web fonts, no images apart from an SVG icon.
- SEO: unique titles and descriptions, canonical URLs, Open Graph tags, generated sitemap, robots.txt.

## Run it locally

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` deploys to GitHub Pages through `.github/workflows/deploy.yml`.
In the repo, set **Settings → Pages → Source** to **GitHub Actions** once.

If the repo is not named `Serverpulse`, change `base` in `astro.config.mjs` and the sitemap line in `public/robots.txt`.

## Project layout

```
src/
  components/ServerCard.astro   one server card
  data/games.js                 supported games and their API
  data/servers.js               servers shown on the home page
  layouts/Base.astro            page shell, meta tags, global styles
  pages/index.astro             status page
  pages/about.astro             how it's built
  scripts/status.js             live status lookup
```
