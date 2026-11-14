import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deployed to GitHub Pages at https://jbweb1.github.io/Serverpulse
// If you rename the repo, change `base` to match.
export default defineConfig({
  site: 'https://jbweb1.github.io',
  base: '/Serverpulse',
  integrations: [sitemap()],
});
