import type { APIRoute } from 'astro';
import { bump, STAGES } from '../../lib/counts';
import type { Lang } from '../../i18n/ui';

export const prerender = false;

// Receives navigator.sendBeacon pings: "view:en" or "stage:es:learns".
// Anything else is dropped silently. Nothing about the visitor is read or kept.
const STAGE_SET = new Set<string>(STAGES);

export const POST: APIRoute = async ({ request }) => {
  const body = (await request.text().catch(() => '')).slice(0, 64);
  const [event, locale, stage = ''] = body.split(':');
  const lang = locale === 'es' ? 'es' : locale === 'en' ? 'en' : null;
  const valid = lang && ((event === 'view' && !stage) || (event === 'stage' && STAGE_SET.has(stage)));
  if (valid) await bump(event as 'view' | 'stage', lang as Lang, stage).catch(() => {});
  return new Response(null, { status: 204 });
};
