import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ragunathanbarasu.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
