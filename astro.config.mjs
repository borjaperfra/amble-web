// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';

// Pages are prerendered; only the waitlist endpoint runs on the server (Railway).
export default defineConfig({
  site: 'https://amble.fyi',
  adapter: node({ mode: 'middleware' }),
  integrations: [mdx()],
  // Railway's proxy terminates TLS. Trust its X-Forwarded-Proto/Host for our
  // domain only, so the request URL is https://amble.fyi and Astro's origin
  // check accepts the form's own posts.
  security: { allowedDomains: [{ hostname: 'amble.fyi', protocol: 'https' }] },
  // Small site, one stylesheet per page: inline it and skip the render-blocking request.
  build: { inlineStylesheets: 'always' },
  // Pre-bundle the motion libraries at dev start, so a later install doesn't
  // leave the dev server serving stale dependency URLs.
  vite: {
    optimizeDeps: { include: ['gsap', 'gsap/ScrollTrigger', 'gsap/Flip', 'lenis', 'simple-icons'] },
  },
  env: {
    schema: {
      DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),
      // Without it, confirmation links are logged instead of emailed (local dev).
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      WAITLIST_FROM: envField.string({ context: 'server', access: 'secret', default: 'Amble <rep@amble.fyi>' }),
      SITE_URL: envField.string({ context: 'server', access: 'secret', default: 'https://amble.fyi' }),
      // "launch": the public site is only the hero and the form (plus privacy).
      // Read at build time, so pages are prerendered for the mode.
      SITE_MODE: envField.enum({ context: 'server', access: 'public', values: ['full', 'launch'], default: 'full' }),
    },
  },
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
      subsets: ['latin'],
    },
    {
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      provider: fontProviders.google(),
      weights: [400, 500],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
  ],
});
