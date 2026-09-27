// Sends the welcome emails that could not go out when people joined (Resend
// down, or over its daily cap). Lists them by default; sends with --send.
// Run: node --env-file=.env scripts/send-welcomes.mts [--send]
import postgres from 'postgres';
import { Resend } from 'resend';
import { renderWelcome } from '../src/lib/welcome.ts';

const send = process.argv.includes('--send');
const { DATABASE_URL, RESEND_API_KEY, WAITLIST_FROM = 'Amble <rep@amble.fyi>', SITE_URL = 'https://amble.fyi' } = process.env;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (send && !RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set');

const sql = postgres(DATABASE_URL, { max: 1 });
const rows = await sql<{ id: number; email: string; locale: 'en' | 'es'; audience: 'candidate' | 'company'; created_at: Date }[]>`
  select id, email, locale, audience, created_at from waitlist
  where welcome_sent_at is null and confirmed_at is not null
  order by created_at
`;
console.log(`${rows.length} pending`);
for (const r of rows) console.log(`  ${r.created_at.toISOString()}  ${r.audience.padEnd(9)} ${r.locale}  ${r.email}`);

if (send) {
  const resend = new Resend(RESEND_API_KEY);
  const host = new URL(SITE_URL).host;
  let sent = 0;
  for (const r of rows) {
    const { subject, html, text } = renderWelcome(r.locale, r.audience);
    // Same key as the form, so a welcome that did go out is not sent twice.
    const key = `waitlist-welcome/${host}/${r.id}/${r.locale}`;
    const { error } = await resend.emails.send({ from: WAITLIST_FROM, to: [r.email], subject, html, text }, { idempotencyKey: key });
    if (error) {
      // Most likely the daily cap again: stop, and run it tomorrow.
      console.error(`stopped after ${sent}: ${error.name}: ${error.message}`);
      break;
    }
    await sql`update waitlist set welcome_sent_at = now(), updated_at = now() where id = ${r.id}`;
    sent++;
    await new Promise((resolve) => setTimeout(resolve, 600)); // under Resend's rate limit
  }
  console.log(`sent ${sent} of ${rows.length}`);
}
await sql.end();
