import { describe, expect, it } from 'vitest';
import { OPEN, CLOSED, mix, lidPath, irisClipPath } from '../src/lib/eye';

describe('eye geometry', () => {
  it('samples open and closed lids at the same points, so they interpolate', () => {
    expect(OPEN.outer.length).toBe(CLOSED.outer.length);
    expect(OPEN.inner.length).toBe(CLOSED.inner.length);
  });

  it('mixes to the ends exactly', () => {
    expect(mix(OPEN, CLOSED, 0)).toEqual(OPEN);
    expect(mix(OPEN, CLOSED, 1)).toEqual(CLOSED);
  });

  it('closed, the lid covers the whole iris (iris bottom is y≈35.1)', () => {
    const centre = CLOSED.inner[Math.floor(CLOSED.inner.length / 2)];
    expect(centre[1]).toBeGreaterThan(35.1);
  });

  it('draws paths with the same commands at every step', () => {
    const count = (d: string) => d.replace(/[^MCLZ]/g, '');
    expect(count(lidPath(mix(OPEN, CLOSED, 0.37)))).toBe(count(lidPath(OPEN)));
    expect(count(irisClipPath(mix(OPEN, CLOSED, 0.8)))).toBe(count(irisClipPath(OPEN)));
  });
});
