// Refines option C: a calm, half-lidded eye that looks out for you.
// A brush stroke along a wide, flat arc (the lid), tapering at both ends,
// over an organic seed (the iris, the Rep). Run: node design/symbol-c.mjs
import { writeFileSync } from 'node:fs';

const f = (n) => n.toFixed(2);

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

function blob(cx, cy, r, harmonics, n = 40, rot = 0) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rot;
    let k = 1;
    for (const [amp, freq, phase] of harmonics) k += amp * Math.sin(freq * a + phase);
    pts.push([cx + r * k * Math.cos(a), cy + r * k * Math.sin(a)]);
  }
  return smoothClosed(pts);
}

// Lid: brush stroke on an ellipse arc. Width swells toward the brush's first
// third and dries out at both ends; the right end lifts off longer, as a hand would.
function lid({ cx, cy, rx, ry, start, sweep, wMax, wEndA, wEndB, n = 24 }) {
  const outer = [], inner = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = ((start + sweep * t) * Math.PI) / 180;
    const peak = 0.26;
    const w = t < peak
      ? wEndA + (wMax - wEndA) * Math.sin((t / peak) * (Math.PI / 2))
      : wEndB + (wMax - wEndB) * Math.pow(Math.cos(((t - peak) / (1 - peak)) * (Math.PI / 2)), 0.9);
    // normal of the ellipse at this angle
    const x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
    const nx = ry * Math.cos(a), ny = rx * Math.sin(a), len = Math.hypot(nx, ny);
    outer.push([x + (nx / len) * (w / 2), y + (ny / len) * (w / 2)]);
    inner.push([x - (nx / len) * (w / 2), y - (ny / len) * (w / 2)]);
  }
  const end = inner[inner.length - 1];
  return `${smoothOpen(outer)}L${f(end[0])} ${f(end[1])}${smoothOpen(inner.reverse()).replace(/^M[^C]+/, '')}Z`;
}

export const LID = lid({ cx: 24, cy: 31, rx: 18.5, ry: 15.5, start: 196, sweep: 150, wMax: 6, wEndA: 2.8, wEndB: 0.5 });
export const IRIS = blob(24.6, 27.4, 7.8, [[0.07, 2, 0.5], [0.035, 3, 2.2]], 16, 0.25);
// Favicon: thicker lid, slightly larger iris, for 16px.
export const LID_SMALL = lid({ cx: 24, cy: 31.5, rx: 19.5, ry: 16, start: 194, sweep: 154, wMax: 7.6, wEndA: 3.6, wEndB: 1.8 });
export const IRIS_SMALL = blob(24.4, 27.6, 8.8, [[0.06, 2, 0.5], [0.03, 3, 2.2]], 16, 0.25);

const INK = '#25251F', MOSS = '#52634F', PAPER = '#F4F1EA';
const mark = (size, dot = MOSS, ink = INK) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 48 48"><path d="${IRIS}" fill="${dot}"/><path d="${LID}" fill="${ink}"/></svg>`;

writeFileSync(
  new URL('./symbol-c-refined.html', import.meta.url),
  `<!doctype html><meta charset="utf-8"><title>Amble · símbolo C</title>
<link href="https://fonts.googleapis.com/css2?family=Inter&family=Newsreader:opsz@6..72&display=swap" rel="stylesheet">
<body style="margin:0;background:${PAPER};font-family:Inter;display:grid;place-items:center;min-height:100vh;gap:40px;padding:48px">
<div>${mark(220)}</div>
<div style="display:flex;gap:28px;align-items:end">${mark(64)}${mark(48)}${mark(32)}${mark(24)}<img src="../public/favicon.svg" width="16"></div>
<div style="display:flex;align-items:center;gap:10px;font:400 44px Newsreader">${mark(46)}amble</div>
<div style="display:flex;align-items:center;gap:10px;font:400 30px Newsreader;background:${MOSS};color:${PAPER};padding:16px 22px;border-radius:12px">${mark(30, PAPER, PAPER)}amble</div>
</body>`,
);

writeFileSync(
  new URL('../public/favicon.svg', import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="${PAPER}"/><path d="${IRIS_SMALL}" fill="${MOSS}"/><path d="${LID_SMALL}" fill="${INK}"/></svg>\n`,
);

console.log(JSON.stringify({ LID, IRIS }));
