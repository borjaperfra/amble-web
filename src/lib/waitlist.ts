import { db } from './db';
import type { Lang } from '../i18n/ui';

// A second submit of an address whose welcome email failed tries again, but
// not more often than this.
const RETRY_COOLDOWN_SECONDS = 120;

export type JoinResult =
  | { kind: 'send'; id: number }
  | { kind: 'quiet' }; // already welcomed, or tried too recently

export type Audience = 'candidate' | 'company';

// Submitting the form is the consent: the row is confirmed at once, and the
// welcome email goes out once per address and list.
export async function join(email: string, normalized: string, locale: Lang, audience: Audience = 'candidate'): Promise<JoinResult> {
  const rows = await db()<{ id: number }[]>`
    insert into waitlist (email, email_normalized, locale, audience, confirmed_at, last_sent_at)
    values (${email}, ${normalized}, ${locale}, ${audience}, now(), now())
    on conflict (email_normalized, audience) do update set
      locale = excluded.locale,
      last_sent_at = now(),
      updated_at = now()
    where waitlist.welcome_sent_at is null
      and waitlist.last_sent_at < now() - make_interval(secs => ${RETRY_COOLDOWN_SECONDS})
    returning id
  `;
  return rows.length ? { kind: 'send', id: rows[0].id } : { kind: 'quiet' };
}

export async function markWelcomed(id: number) {
  await db()`update waitlist set welcome_sent_at = now(), confirmed_at = coalesce(confirmed_at, now()), updated_at = now() where id = ${id}`;
}

// When the email could not be sent, let the next submit try again right away.
export async function releaseCooldown(id: number) {
  await db()`update waitlist set last_sent_at = 'epoch' where id = ${id}`;
}
