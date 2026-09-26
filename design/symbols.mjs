// Generates organic symbol candidates for Amble and a preview page.
import { writeFileSync } from 'node:fs';

const C = 24; // centre of the 48 grid
const f = (n) => n.toFixed(2);

// Closed smooth path through points (Catmull-Rom -> cubic Bézier).
function smoothClosed(pts) {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[(i - 1 + pts.length) % pts.length], p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length], p3 = pts[(i + 2) % pts.length];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + 'Z';
}

// Open smooth path (for outlines of a brush stroke we close it manually).
function smoothOpen(pts) {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

// A blob: radius modulated by a few low harmonics — reads as a pebble, not a circle.
function blob(cx, cy, r, harmonics, n = 36, rot = 0) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rot;
    let k = 1;
    for (const [amp, freq, phase] of harmonics) k += amp * Math.sin(freq * a + phase);
    pts.push([cx + r * k * Math.cos(a), cy + r * k * Math.sin(a)]);
  }
  return smoothClosed(pts);
}

// A brush stroke along an arc: width swells then tapers, radius drifts slightly.
function brushArc({ r, start, sweep, wMax, wStart, wEnd, drift = 0, wobble = [] , n = 60 }) {
  const outer = [], inner = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = ((start + sweep * t) * Math.PI) / 180;
    // swell early, long dry taper at the end, like a brush lifting off
    const w = t < 0.12 ? wStart + (wMax - wStart) * (t / 0.12) : wMax + (wEnd - wMax) * Math.pow((t - 0.12) / 0.88, 1.8);
    let rr = r + drift * t;
    for (const [amp, freq, phase] of wobble) rr += amp * Math.sin(freq * t * Math.PI * 2 + phase);
    outer.push([C + (rr + w / 2) * Math.cos(a), C + (rr + w / 2) * Math.sin(a)]);
    inner.push([C + (rr - w / 2) * Math.cos(a), C + (rr - w / 2) * Math.sin(a)]);
  }
  const endCap = inner[inner.length - 1];
  return `${smoothOpen(outer)}L${f(endCap[0])} ${f(endCap[1])}${smoothOpen(inner.reverse()).replace(/^M[^C]+/, '')}Z`;
}

const INK = '#25251F', MOSS = '#52634F', PAPER = '#F4F1EA';

const options = [
  {
    id: 'A',
    name: 'Ensō de pincel',
    note: 'El círculo abierto, pero trazado a pincel: engorda al empezar y se seca al levantarse. El punto es una semilla irregular, un poco fuera del centro.',
    svg: (dot = MOSS, ink = INK) => `
      <path d="${brushArc({ r: 16.5, start: -58, sweep: 318, wMax: 5.2, wStart: 2.6, wEnd: 0.6, drift: -1.2, wobble: [[0.35, 2, 0.4]] })}" fill="${ink}"/>
      <path d="${blob(24.6, 24.8, 6.2, [[0.06, 2, 0.6], [0.035, 3, 2.1]], 36, 0.3)}" fill="${dot}"/>`,
  },
  {
    id: 'B',
    name: 'Piedra y onda',
    note: 'Una piedra de río en agua quieta y una sola onda a su alrededor. La calma de algo que ya ha caído en su sitio, y la escucha como círculo que se abre.',
    svg: (dot = MOSS, ink = INK) => `
      <path d="${blob(24, 24, 18.2, [[0.035, 2, 1.1], [0.02, 3, 0.2]], 48)}" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="96 18" stroke-dashoffset="-6"/>
      <path d="${blob(24, 25, 9.4, [[0.1, 2, 0.4], [0.04, 3, 1.9]], 40, 0.2)}" fill="${dot}"/>`,
  },
  {
    id: 'C',
    name: 'Semilla sostenida',
    note: 'Una forma que acoge, como una mano ahuecada o una vaina, y dentro una semilla. Es la idea de que alguien cuida algo por ti, sin dibujar una mano.',
    svg: (dot = MOSS, ink = INK) => `
      <path d="${brushArc({ r: 15.5, start: 150, sweep: 250, wMax: 5.6, wStart: 3.4, wEnd: 1, drift: 0.6, wobble: [[0.4, 1, 1.2]] })}" fill="${ink}"/>
      <path d="${blob(25, 21.5, 6.4, [[0.12, 1, 2.4], [0.05, 2, 0.3]], 36, -0.6)}" fill="${dot}"/>`,
  },
  {
    id: 'D',
    name: 'Respiración',
    note: 'Dos anillos dibujados a mano que no llegan a coincidir, como la marca de una respiración. El punto dentro es el Rep: está vivo, pero sin prisa.',
    svg: (dot = MOSS, ink = INK) => `
      <path d="${blob(24, 24, 17.6, [[0.03, 2, 0.2], [0.018, 5, 1.4]], 60, 0)}" fill="none" stroke="${ink}" stroke-width="1.9"/>
      <path d="${blob(24.6, 23.4, 16.2, [[0.035, 2, 2.2], [0.02, 4, 0.5]], 60, 0.4)}" fill="none" stroke="${ink}" stroke-width="1.1" opacity=".45"/>
      <path d="${blob(24, 24.4, 6.6, [[0.07, 2, 1.1], [0.03, 3, 0.1]], 36)}" fill="${dot}"/>`,
  },
];

const mark = (o, size, dot, ink) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true">${o.svg(dot, ink)}</svg>`;

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Amble · símbolo</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet">
<style>
body{margin:0;background:${PAPER};color:${INK};font-family:Inter,sans-serif;padding:64px 24px}
h1{font:400 44px/1.05 Newsreader,serif;letter-spacing:-.02em;margin:0 auto 8px;max-width:1100px}
.sub{color:#67675F;max-width:1100px;margin:0 auto 56px}
.grid{display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));max-width:1100px;margin:0 auto}
.card{background:#FDFCF9;border:1px solid #E8E4DB;border-radius:16px;padding:32px 28px}
.hero{display:grid;place-items:center;height:180px}
.id{font-size:11px;font-weight:600;letter-spacing:.09em;color:#929187}
h2{font:400 24px Newsreader,serif;margin:6px 0 10px}
p{font-size:14px;line-height:1.55;color:#67675F;margin:0 0 24px}
.sizes{display:flex;align-items:end;gap:18px;padding:18px 0;border-top:1px solid #E8E4DB}
.lockup{display:flex;align-items:center;gap:8px;font:400 26px Newsreader,serif;padding-top:18px;border-top:1px solid #E8E4DB}
.inv{display:flex;align-items:center;gap:8px;margin-top:14px;background:${MOSS};color:${PAPER};border-radius:10px;padding:12px 14px;font:400 20px Newsreader,serif}
.now{opacity:.7}
</style></head><body>
<h1>Símbolo de Amble: cuatro direcciones orgánicas</h1>
<p class="sub">Cada una en grande, en tamaños de uso (48, 24 y 16 px, el favicon), junto al logotipo y sobre musgo. A la derecha, el actual para comparar.</p>
<div class="grid">
${options
  .map(
    (o) => `<section class="card">
  <div class="hero">${mark(o, 150)}</div>
  <div class="id">OPCIÓN ${o.id}</div><h2>${o.name}</h2><p>${o.note}</p>
  <div class="sizes">${mark(o, 48)}${mark(o, 24)}${mark(o, 16)}</div>
  <div class="lockup">${mark(o, 28)}amble</div>
  <div class="inv">${mark(o, 24, PAPER, PAPER)}amble</div>
</section>`,
  )
  .join('\n')}
<section class="card now">
  <div class="hero"><svg width="150" height="150" viewBox="0 0 48 48"><path d="M37.02 13.07A17 17 0 1 1 26.95 7.26" fill="none" stroke="${INK}" stroke-width="3.25" stroke-linecap="round"/><circle cx="24" cy="24" r="6.5" fill="${MOSS}"/></svg></div>
  <div class="id">ACTUAL</div><h2>Ensō geométrico</h2><p>Trazo uniforme y círculo perfecto. Limpio, pero demasiado de sistema.</p>
</section>
</div></body></html>`;

writeFileSync(new URL('./symbols.html', import.meta.url), html);
for (const o of options) {
  writeFileSync(new URL(`./symbol-${o.id}.svg`, import.meta.url), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${o.svg()}</svg>\n`);
}
console.log('ok');
