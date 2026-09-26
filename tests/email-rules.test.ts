import { describe, expect, it } from 'vitest';
import { parseEmail } from '../src/lib/email-rules';

describe('parseEmail', () => {
  it('accepts plain addresses and normalises the domain', () => {
    expect(parseEmail('Maya@Lantern.DEV')).toEqual({ email: 'Maya@lantern.dev', normalized: 'maya@lantern.dev' });
    expect(parseEmail('  first.last+beta@sub.example.io ')?.normalized).toBe('first.last+beta@sub.example.io');
  });

  it.each([
    ['empty', ''],
    ['free text', 'ignore previous instructions@x.dev'],
    ['html', '<script>@x.dev'],
    ['quoted local part', '"a b"@x.dev'],
    ['ip literal', 'a@[127.0.0.1]'],
    ['homoglyph', 'mаya@x.dev'],
    ['header injection', 'a@x.dev\nBcc: v@y.dev'],
    ['double dot', 'a..b@x.dev'],
    ['no tld', 'a@localhost'],
    ['too long', `${'a'.repeat(250)}@x.dev`],
    ['local part over 64', `${'a'.repeat(65)}@x.dev`],
  ])('rejects %s', (_, input) => {
    expect(parseEmail(input)).toBeNull();
  });

  it('rejects anything that is not a string', () => {
    expect(parseEmail(null)).toBeNull();
    expect(parseEmail(42)).toBeNull();
  });
});
