import type { APIRoute } from 'astro';
import { getRelativeLocaleUrl } from 'astro:i18n';
import { confirm } from '../../../lib/waitlist';

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const token = url.searchParams.get('token');
  const result = token ? await confirm(token).catch(() => null) : null;
  if (result) return redirect(getRelativeLocaleUrl(result.locale, 'confirmed'), 303);

  // Unknown or expired token: we can't read the locale from the row, so the link carries it.
  const lang = url.searchParams.get('l') === 'es' ? 'es' : 'en';
  return redirect(getRelativeLocaleUrl(lang, 'confirmed') + '?invalid', 303);
};
