import { createHash, randomBytes } from 'node:crypto';
import { db } from './db';
import type { Lang } from '../i18n/ui';

const TOKEN_TTL_DAYS = 7;
// A second submit of the same pending address resends the email, but not more
// often than this.
const RESEND_COOLDOWN_SECONDS = 120;
// Signups never confirmed are deleted after this (see the privacy page).
const UNCONFIRMED_RETENTION_DAYS = 30;

const hash = (token: string) => createHash('sha256').update(token).digest('hex');

export type JoinResult =
  | { kind: 'send'; token: string; id: number }
  | { kind: 'quiet' }; // already confirmed, or resent too recently

export type Audience = 'candidate' | 'company';

export async function join(email: string, normalized: string, locale: Lang, audience: Audience = 'candidate'): Promise<JoinResult> {
  const sql = db();
  await sql`
    delete from waitlist
    where confirmed_at is null
      and created_at < now() - make_interval(days => ${UNCONFIRMED_RETENTION_DAYS})
  `;
  const token = randomBytes(32).toString('base64url');
  const tokenHash = hash(token);

  // Insert, or refresh the token of a pending signup. Confirmed rows and rows
  // inside the cooldown are left untouched and return nothing.
  const rows = await sql<{ id: number }[]>`
    insert into waitlist (email, email_normalized, locale, audience, token_hash, token_expires_at, last_sent_at)
    values (${email}, ${normalized}, ${locale}, ${audience}, ${tokenHash},
            now() + make_interval(days => ${TOKEN_TTL_DAYS}), now())
    on conflict (email_normalized, audience) do update set
      locale = excluded.locale,
      token_hash = excluded.token_hash,
      token_expires_at = excluded.token_expires_at,
      last_sent_at = now(),
      updated_at = now()
    where waitlist.confirmed_at is null
      and waitlist.last_sent_at < now() - make_interval(secs => ${RESEND_COOLDOWN_SECONDS})
    returning id
  `;

  return rows.length ? { kind: 'send', token, id: rows[0].id } : { kind: 'quiet' };
}

export async function confirm(token: string): Promise<{ locale: Lang } | null> {
  const rows = await db()<{ locale: Lang }[]>`
    update waitlist set
      confirmed_at = coalesce(confirmed_at, now()),
      token_hash = null,
      token_expires_at = null,
      updated_at = now()
    where token_hash = ${hash(token)} and token_expires_at > now()
    returning locale
  `;
  return rows[0] ?? null;
}

// When the email could not be sent, let the next submit try again right away.
export async function releaseCooldown(id: number) {
  await db()`update waitlist set last_sent_at = 'epoch' where id = ${id}`;
}
