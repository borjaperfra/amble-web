import { describe, expect, it } from 'vitest';
import { allow } from '../src/lib/rate-limit';

describe('allow', () => {
  it('lets five requests through per key, then stops', () => {
    const key = `test-${Math.random()}`;
    const results = Array.from({ length: 7 }, () => allow(key));
    expect(results).toEqual([true, true, true, true, true, false, false]);
  });

  it('counts keys separately', () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    for (let i = 0; i < 5; i++) allow(a);
    expect(allow(a)).toBe(false);
    expect(allow(b)).toBe(true);
  });
});
