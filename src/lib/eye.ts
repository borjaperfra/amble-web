// Geometry of the Amble eye's lid, open and closed, in the 48-unit viewBox.
//
// Both shapes are sampled at the same N points along the brush stroke, so any
// shape in between is a plain interpolation of numbers: that is how the eye
// blinks. The open lid is the brush arc of the symbol (see design/symbol-c.mjs);
// the closed lid is a thin lash line that sags below the iris.
//
// Used on the server (to render the open eye) and in the browser (to blink).

type Pt = [number, number];
export interface LidShape {
  outer: Pt[]; // the stroke's upper edge
  inner: Pt[]; // the stroke's lower edge, the one that meets the iris
}

const N = 24;

// Open: a brush stroke along an ellipse arc, heavy where it starts, dry where it lifts.
const OPEN_ARC = { cx: 24, cy: 31, rx: 18.5, ry: 15.5, start: 196, sweep: 150 };
const PEAK = 0.26;

function brushWidth(t: number, wMax: number, wStart: number, wEnd: number) {
  return t < PEAK
    ? wStart + (wMax - wStart) * Math.sin((t / PEAK) * (Math.PI / 2))
    : wEnd + (wMax - wEnd) * Math.pow(Math.cos(((t - PEAK) / (1 - PEAK)) * (Math.PI / 2)), 0.9);
}

function sampleOpen(): LidShape {
  const outer: Pt[] = [];
  const inner: Pt[] = [];
  const { cx, cy, rx, ry, start, sweep } = OPEN_ARC;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const a = ((start + sweep * t) * Math.PI) / 180;
    const w = brushWidth(t, 6, 2.8, 0.5);
    const x = cx + rx * Math.cos(a);
    const y = cy + ry * Math.sin(a);
    const nx = ry * Math.cos(a);
    const ny = rx * Math.sin(a);
    const len = Math.hypot(nx, ny);
    outer.push([x + (nx / len) * (w / 2), y + (ny / len) * (w / 2)]);
    inner.push([x - (nx / len) * (w / 2), y - (ny / len) * (w / 2)]);
  }
  return { outer, inner };
}

// Closed: a lash line across the same span, sagging to below the iris.
function sampleClosed(open: LidShape): LidShape {
  const outer: Pt[] = [];
  const inner: Pt[] = [];
  const x0 = (open.outer[0][0] + open.inner[0][0]) / 2;
  const x1 = (open.outer[N][0] + open.inner[N][0]) / 2;
  const half = (x1 - x0) / 2;
  const mid = (x0 + x1) / 2;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = x0 + (x1 - x0) * t;
    const u = (x - mid) / half;
    const y = 29.5 + 6.2 * (1 - u * u);
    const slope = (-2 * 6.2 * u) / half;
    const len = Math.hypot(slope, 1);
    const up: Pt = [slope / len, -1 / len];
    const w = brushWidth(t, 3.4, 1.6, 0.5);
    outer.push([x + up[0] * (w / 2), y + up[1] * (w / 2)]);
    inner.push([x - up[0] * (w / 2), y - up[1] * (w / 2)]);
  }
  return { outer, inner };
}

export const OPEN = sampleOpen();
export const CLOSED = sampleClosed(OPEN);

const f = (n: number) => n.toFixed(2);

// Catmull-Rom through the points, as cubic Béziers.
function smooth(pts: Pt[], move: boolean) {
  let d = move ? `M${f(pts[0][0])} ${f(pts[0][1])}` : '';
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(
      p2[1] - (p3[1] - p1[1]) / 6,
    )} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

export function lidPath(s: LidShape) {
  const back = [...s.inner].reverse();
  return `${smooth(s.outer, true)}L${f(back[0][0])} ${f(back[0][1])}${smooth(back, false)}Z`;
}

// Everything below the lid's lower edge: the iris is clipped to it, so a
// descending lid covers the iris from the top, as a real one does.
export function irisClipPath(s: LidShape) {
  const edge = s.inner;
  return `M-4 52 L-4 ${f(edge[0][1])} L${f(edge[0][0])} ${f(edge[0][1])}${smooth(edge, false)}L52 ${f(
    edge[N][1],
  )} L52 52 Z`;
}

export function mix(a: LidShape, b: LidShape, t: number): LidShape {
  const lerp = (p: Pt, q: Pt): Pt => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  return {
    outer: a.outer.map((p, i) => lerp(p, b.outer[i])),
    inner: a.inner.map((p, i) => lerp(p, b.inner[i])),
  };
}
