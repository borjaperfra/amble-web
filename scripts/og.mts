// Generates the social cards (public/og-*.png: home and companies, EN and ES), 1200×630.
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

// Path data written by hand: opentype.js 2 sometimes hands back a NaN control
// point for Newsreader's outlines, which breaks the whole glyph. Such a point
// is put midway between the curve's ends.
function pathData(cmds: any[]) {
  const n = (v: number) => (Math.round(v * 100) / 100).toString();
  let px = 0, py = 0, out = '';
  for (const c of cmds) {
    const ok = (v: number) => Number.isFinite(v);
    if (c.type === 'M' || c.type === 'L') out += `${c.type}${n(c.x)} ${n(c.y)}`;
    else if (c.type === 'Q') {
      const x1 = ok(c.x1) ? c.x1 : (px + c.x) / 2, y1 = ok(c.y1) ? c.y1 : (py + c.y) / 2;
      out += `Q${n(x1)} ${n(y1)} ${n(c.x)} ${n(c.y)}`;
    } else if (c.type === 'C') {
      const x1 = ok(c.x1) ? c.x1 : px, y1 = ok(c.y1) ? c.y1 : py, x2 = ok(c.x2) ? c.x2 : c.x, y2 = ok(c.y2) ? c.y2 : c.y;
      out += `C${n(x1)} ${n(y1)} ${n(x2)} ${n(y2)} ${n(c.x)} ${n(c.y)}`;
    } else if (c.type === 'Z') out += 'Z';
    if ('x' in c) { px = c.x; py = c.y; }
  }
  return out;
}

// Laid out glyph by glyph, with kerning. opentype.js can't read one of
// Newsreader's substitution tables, so its own text layout is avoided.
function layout(f: opentype.Font, s: string, x: number, y: number, size: number) {
  const scale = size / f.unitsPerEm;
  const glyphs = [...s].map((ch) => f.charToGlyph(ch));
  let cx = x;
  const parts: string[] = [];
  glyphs.forEach((g, i) => {
    parts.push(pathData(g.getPath(cx, y, size).commands));
    cx += (g.advanceWidth ?? 0) * scale;
    // Some pairs come back NaN from the kerning table; skip those.
    const kern = i < glyphs.length - 1 ? f.getKerningValue(g, glyphs[i + 1]) : 0;
    if (Number.isFinite(kern)) cx += kern * scale;
  });
  return { d: parts.join(''), width: cx - x };
}
const text = (f: opentype.Font, s: string, x: number, y: number, size: number, fill: string) =>
  `<path d="${layout(f, s, x, y, size).d}" fill="${fill}"/>`;
const width = (f: opentype.Font, s: string, size: number) => layout(f, s, 0, 0, size).width;

const sansBold = font('inter/files/inter-latin-600-normal.woff');
const SURFACE = '#FBFAF6';
const BORDER = '#E4E0D5';
const WASH = '#E9EDE6';

// One card per page: a headline on the left, and on the right a sheet of the
// site's paper — the Rep listening, or the company's agent at work.
type Card = {
  file: string;
  lines: [string, string][]; // [roman, italic] per line; italic goes in moss
  sub: string;
  size: number;
  sheet: { eyeFlip?: boolean; label: string; items: string[]; forLabel: string; status: string };
};

const cards: Card[] = [
  {
    file: 'og-en.png',
    lines: [['I’m not looking.', ''], ['', 'Amble'], [' is.', '']],
    sub: 'Your professional Rep · Closed beta',
    size: 96,
    sheet: { label: 'YOUR REP', forLabel: 'Listening for', items: ['the right problem', 'more ownership', 'remote', 'the right number'], status: 'Listening' },
  },
  {
    file: 'og-es.png',
    lines: [['Yo no busco.', ''], ['', 'Amble'], [' sí.', '']],
    sub: 'Tu Rep profesional · Beta cerrada',
    size: 96,
    sheet: { label: 'TU REP', forLabel: 'Atento a', items: ['el problema adecuado', 'más responsabilidad', 'remoto', 'la cifra adecuada'], status: 'Escuchando' },
  },
  {
    file: 'og-companies-en.png',
    lines: [['An AI agent that', ''], ['sources, checks', ''], ['', 'and reaches candidates.']],
    sub: 'Amble for companies · Early access',
    size: 66,
    sheet: { eyeFlip: true, label: 'YOUR AGENT', forLabel: 'Looking for', items: ['Owns evaluation', 'Remote, Europe', 'Range set, private'], status: '2 ready to talk' },
  },
  {
    file: 'og-companies-es.png',
    lines: [['Un agente de IA que', ''], ['busca, comprueba', ''], ['', 'y contacta candidatos.']],
    sub: 'Amble para empresas · Acceso anticipado',
    size: 64,
    sheet: { eyeFlip: true, label: 'TU AGENTE', forLabel: 'Busca', items: ['Lleva la evaluación', 'Remoto, Europa', 'Rango privado'], status: '2 listas para hablar' },
  },
];

const eyeAt = (x: number, y: number, scale: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})${flip ? ' translate(-48 0)' : ''}"><path d="${IRIS}" fill="${MOSS}"/><path d="${lidPath(OPEN)}" fill="${INK}"/></g>`;

for (const c of cards) {
  // Headline, left.
  const lineH = c.size * 1.08;
  const top = 250 - ((c.lines.length - 3) * lineH) / 2;
  // An italic word followed by a roman tail line shares its line: "Amble" + " is.".
  const merged: string[] = [];
  c.lines.forEach(([roman, italic], i) => {
    const y = Math.round(top + i * lineH);
    if (italic && !roman && c.lines[i + 1] && c.lines[i + 1][0] && !c.lines[i + 1][1] && c.lines[i + 1][0].startsWith(' ')) {
      merged.push(text(serifItalic, italic, 96, y, c.size, MOSS_DARK));
      merged.push(text(serif, c.lines[i + 1][0], 96 + width(serifItalic, italic, c.size), y, c.size, INK));
    } else if (roman.startsWith(' ') && i > 0 && c.lines[i - 1][1] && !c.lines[i - 1][0]) {
      // drawn with the italic line above
    } else if (italic && !roman) {
      merged.push(text(serifItalic, italic, 96, y, c.size, MOSS_DARK));
    } else {
      merged.push(text(serif, roman, 96, y, c.size, INK));
    }
  });

  // The sheet, right: paper, a hairline, the items, a moss band.
  const sx = 792, sy = 150, sw = 312;
  const itemsY = sy + 150;
  const itemH = 36;
  const bandY = itemsY + c.sheet.items.length * itemH + 8;
  const sh = bandY - sy + 64;
  const sheet = `
  <g transform="rotate(1.2 ${sx + sw / 2} ${sy + sh / 2})">
    <rect x="${sx}" y="${sy + 14}" width="${sw}" height="${sh}" rx="18" fill="#25251F" opacity="0.06" filter="url(#blur)"/>
    <clipPath id="card"><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="18"/></clipPath>
    <g clip-path="url(#card)">
      <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" fill="${SURFACE}"/>
      <rect x="${sx}" y="${bandY}" width="${sw}" height="${sh}" fill="${WASH}"/>
      <rect x="${sx}" y="${bandY}" width="${sw}" height="1.5" fill="#C9D3C5"/>
    </g>
    <rect x="${sx + 0.75}" y="${sy + 0.75}" width="${sw - 1.5}" height="${sh - 1.5}" rx="17.5" fill="none" stroke="${BORDER}" stroke-width="1.5"/>
    ${eyeAt(sx + 28, sy + 22, 1.15, c.sheet.eyeFlip)}
    ${text(sansBold, c.sheet.label, sx + 96, sy + 58, 15, MUTED)}
    ${text(sans, c.sheet.forLabel, sx + 30, sy + 118, 17, MUTED)}
    ${c.sheet.items.map((it, i) => text(serifItalic, it, sx + 30, itemsY + i * itemH, 25, INK)).join('')}
    <circle cx="${sx + 38}" cy="${bandY + 32}" r="8" fill="${MOSS}"/>
    <circle cx="${sx + 38}" cy="${bandY + 32}" r="14" fill="none" stroke="${MOSS}" stroke-width="1.5" opacity="0.35"/>
    ${text(serif, c.sheet.status, sx + 62, bandY + 41, 27, MOSS_DARK)}
  </g>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="16"/></filter></defs>
  <rect width="1200" height="630" fill="${PAPER}"/>
  ${eyeAt(96, 62, 1.5)}
  ${text(serif, 'amble', 176, 110, 40, INK)}
  ${merged.join('')}
  ${text(sans, c.sub, 96, 560, 24, MUTED)}
  ${sheet}
</svg>`;
  if (process.env.OG_SVG) writeFileSync(`${process.env.OG_SVG}/${c.file}.svg`, svg);
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(new URL(`../public/${c.file}`, import.meta.url), png);
  console.log(c.file, png.length, 'bytes');
}

// The favicon's closed state, shown while the tab is in the background.
writeFileSync(
  new URL('../public/favicon-closed.svg', import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="${PAPER}"/><path d="${lidPath(CLOSED)}" fill="${INK}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" transform="translate(0 -6)"/></svg>
`,
);
console.log('favicon-closed.svg');
