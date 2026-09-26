// The one rule for what counts as an email here, shared by the browser and the
// server so they can never disagree.
//
// Deliberately stricter than RFC 5322: plain ASCII, no quotes, no spaces, no
// comments, no IP literals. Real addresses fit; free text doesn't. That is also
// the prompt-injection defence: nothing that reads as an instruction to a model
// ("ignore previous…") can be written in this alphabet without spaces, and the
// email is the only thing we store.

export const EMAIL_MAX = 254;
const LOCAL_MAX = 64;

// local part: letters, digits and . _ % + - ; no leading, trailing or double dots.
// domain: labels of letters, digits and hyphens (not at the edges), TLD of 2–24 letters.
export const EMAIL_PATTERN =
  "[A-Za-z0-9_%+\\-]+(\\.[A-Za-z0-9_%+\\-]+)*@([A-Za-z0-9]([A-Za-z0-9\\-]{0,61}[A-Za-z0-9])?\\.)+[A-Za-z]{2,24}";

const EMAIL_RE = new RegExp(`^${EMAIL_PATTERN}$`);

export function parseEmail(raw: unknown): { email: string; normalized: string } | null {
  if (typeof raw !== 'string') return null;
  const email = raw.trim();
  if (email.length === 0 || email.length > EMAIL_MAX) return null;
  if (!EMAIL_RE.test(email)) return null;
  const [local, domain] = email.split('@');
  if (local.length > LOCAL_MAX) return null;
  return { email: `${local}@${domain.toLowerCase()}`, normalized: `${local.toLowerCase()}@${domain.toLowerCase()}` };
}
