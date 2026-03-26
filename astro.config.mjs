// @ts-check
// Build command for Netlify: npx tinacms build && astro build
// Local dev command: npx tinacms dev -c "astro dev"
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://insideai.in',
  integrations: [react(), tailwind(), mdx(), sitemap()],
});
