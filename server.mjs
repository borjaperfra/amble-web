// Production server: compression, static files, then Astro for the rest.
//
// Pages are prerendered into dist/client; only /api/waitlist runs on the
// server. Hashed assets under /_astro are cached for a year; HTML is always
// revalidated so a deploy is visible at once.
import { fileURLToPath } from 'node:url';
import express from 'express';
import compression from 'compression';
import { handler as astro } from './dist/server/entry.mjs';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true); // Railway sits in front; clientAddress comes from X-Forwarded-For
app.use(compression());

// Launch mode: the public site is only the landing, the privacy page and the
// waitlist. Every other page goes back to the landing in its language.
if (process.env.SITE_MODE === 'launch') {
  const open = new Set(['/', '/es', '/privacy', '/es/privacy', '/joined', '/es/joined', '/404']);
  app.use((req, res, next) => {
    const path = req.path.replace(/\/+$/, '') || '/';
    const isPage = !path.startsWith('/_astro') && !path.startsWith('/api/') && !/\.(?!html$)[a-z0-9]+$/i.test(path);
    if (!isPage || open.has(path)) return next();
    res.redirect(302, path === '/es' || path.startsWith('/es/') ? '/es/' : '/');
  });
}

app.use(
  '/_astro',
  express.static('dist/client/_astro', { immutable: true, maxAge: '1y', fallthrough: false }),
);
app.use(
  express.static('dist/client', {
    maxAge: '1h',
    setHeaders(res, path) {
      if (path.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
    },
  }),
);
app.use(astro);

// Anything left is not a page: the prerendered 404, eye and all.
const notFound = fileURLToPath(new URL('./dist/client/404.html', import.meta.url));
app.use((req, res) => res.status(404).sendFile(notFound));

const port = Number(process.env.PORT ?? 4321);
const host = process.env.HOST ?? '0.0.0.0';
app.listen(port, host, () => console.log(`amble-web on http://${host}:${port}`));
