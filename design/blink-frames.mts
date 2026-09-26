// Renders the blink as a strip of frames: node design/blink-frames.mts
import { writeFileSync } from 'node:fs';
import { OPEN, CLOSED, mix, lidPath, irisClipPath } from '../src/lib/eye.ts';

const IRIS = JSON.parse((await import('node:fs')).readFileSync(new URL('./symbol-c.json', import.meta.url), 'utf8')).IRIS;
const frames = [0, 0.25, 0.5, 0.75, 1].map((k, i) => {
  const s = mix(OPEN, CLOSED, k);
  return `<figure><svg width="140" height="140" viewBox="0 0 48 48"><clipPath id="c${i}"><path d="${irisClipPath(s)}"/></clipPath><g clip-path="url(#c${i})"><path d="${IRIS}" fill="#52634F"/></g><path d="${lidPath(s)}" fill="#25251F"/></svg><figcaption>${k}</figcaption></figure>`;
});
writeFileSync(new URL('./blink-frames.html', import.meta.url), `<!doctype html><meta charset="utf-8"><body style="margin:0;padding:40px;background:#F4F1EA;display:flex;gap:24px;font:12px sans-serif;color:#67675F">${frames.join('')}</body>`);
console.log('ok');
