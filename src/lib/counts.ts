import { db } from './db';
import type { Lang } from '../i18n/ui';

// The home's stages: v2's three (knows, listens, tells), v1's six kept for older counts.
export const STAGES = ['knows', 'reads', 'asks', 'checks', 'learns', 'listens', 'tells', 'yours', 'turn', 'finale', 'company'] as const;
export type CountEvent = 'view' | 'stage' | 'join';

export async function bump(event: CountEvent, locale: Lang, stage = '') {
  await db()`
    insert into site_counts (day, event, stage, locale, n)
    values (current_date, ${event}, ${stage}, ${locale}, 1)
    on conflict (day, event, stage, locale) do update set n = site_counts.n + 1
  `;
}
