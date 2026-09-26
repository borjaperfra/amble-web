import { db } from './db';
import type { Lang } from '../i18n/ui';

export const STAGES = ['reads', 'asks', 'checks', 'learns', 'listens', 'tells', 'yours', 'turn', 'finale'] as const;
export type CountEvent = 'view' | 'stage' | 'join';

export async function bump(event: CountEvent, locale: Lang, stage = '') {
  await db()`
    insert into site_counts (day, event, stage, locale, n)
    values (current_date, ${event}, ${stage}, ${locale}, 1)
    on conflict (day, event, stage, locale) do update set n = site_counts.n + 1
  `;
}
