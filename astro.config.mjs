// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';

// Pages are prerendered; only the waitlist endpoint runs on the server (Railway).
export default defineConfig({
  site: 'https://amble.fyi',
  adapter: node({ mode: 'standalone' }),
  integrations: [mdx()],
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.google(),
      weights: [400, 500, 600],
      styles: ['normal'],
    },
    {
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      provider: fontProviders.google(),
      weights: [400, 500],
      styles: ['normal', 'italic'],
    },
  ],
});
