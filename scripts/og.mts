// Generates the social cards (public/og-en.png, public/og-es.png), 1200×630.
// Text is converted to paths from the real fonts, so the PNG looks the same
// everywhere. Run: npm run og
import { readFileSync, writeFileSync } from 'node:fs';
import opentype from 'opentype.js';
import { Resvg } from '@resvg/resvg-js';
import { OPEN, CLOSED, lidPath } from '../src/lib/eye.ts';

const font = (file: string) => {
  const buf = readFileSync(new URL(`../node_modules/@fontsource/${file}`, import.meta.url));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const serif = font('newsreader/files/newsreader-latin-400-normal.woff');
const serifItalic = font('newsreader/files/newsreader-latin-400-italic.woff');
const sans = font('inter/files/inter-latin-500-normal.woff');

const IRIS = JSON.parse(readFileSync(new URL('../design/symbol-c.json', import.meta.url), 'utf8')).IRIS as string;

const PAPER = '#F4F1EA';
const INK = '#25251F';
const MOSS = '#52634F';
const MOSS_DARK = '#3F4D3D';
const MUTED = '#67675F';

// Laid out glyph by glyph, with kerning. opentype.js can't read one of
// Newsreader's substitution tables, so its own text layout is avoided.
function layout(f: opentype.Font, s: string, x: number, y: number, size: number) {
  const scale = size / f.unitsPerEm;
  const glyphs = [...s].map((ch) => f.charToGlyph(ch));
  let cx = x;
  const parts: string[] = [];
  glyphs.forEach((g, i) => {
    parts.push(g.getPath(cx, y, size).toPathData(2));
    cx += (g.advanceWidth ?? 0) * scale;
    if (i < glyphs.length - 1) cx += f.getKerningValue(g, glyphs[i + 1]) * scale;
  });
  return { d: parts.join(''), width: cx - x };
}
const text = (f: opentype.Font, s: string, x: number, y: number, size: number, fill: string) =>
  `<path d="${layout(f, s, x, y, size).d}" fill="${fill}"/>`;
const width = (f: opentype.Font, s: string, size: number) => layout(f, s, 0, 0, size).width;

const copy = {
  en: { line1: 'I’m not looking.', amble: 'Amble', is: ' is.', sub: 'Your professional Rep. Closed beta.' },
  es: { line1: 'Yo no busco.', amble: 'Amble', is: ' sí.', sub: 'Tu Rep profesional. Beta cerrada.' },
};

for (const [lang, c] of Object.entries(copy)) {
  const size = 104;
  const eye = `<g transform="translate(96 88) scale(2.4)"><path d="${IRIS}" fill="${MOSS}"/><path d="${lidPath(OPEN)}" fill="${INK}"/></g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  ${eye}
  ${text(serif, 'amble', 222, 164, 52, INK)}
  ${text(serif, c.line1, 96, 382, size, INK)}
  ${text(serifItalic, c.amble, 96, 486, size, MOSS_DARK)}
  ${text(serif, c.is, 96 + width(serifItalic, c.amble, size), 486, size, INK)}
  ${text(sans, c.sub, 96, 566, 26, MUTED)}
  <g transform="translate(790 176) scale(7.2)"><path d="${IRIS}" fill="${MOSS}"/><path d="${lidPath(OPEN)}" fill="${INK}"/></g>
</svg>`;
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(new URL(`../public/og-${lang}.png`, import.meta.url), png);
  console.log(`og-${lang}.png`, png.length, 'bytes');
}

// The favicon's closed state, shown while the tab is in the background.
writeFileSync(
  new URL('../public/favicon-closed.svg', import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="${PAPER}"/><path d="${lidPath(CLOSED)}" fill="${INK}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" transform="translate(0 -6)"/></svg>
`,
);
console.log('favicon-closed.svg');
