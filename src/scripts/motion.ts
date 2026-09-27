// Shared motion setup for the home: GSAP plugins and Lenis smooth scrolling,
// wired together so ScrollTrigger reads Lenis's position.
//
// The scroll is deliberately heavy and slow (DESIGN_SYSTEM §28: nothing bounces).
// With prefers-reduced-motion there is no Lenis, and chapters render their
// final state without pinning.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, Flip);

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Styles that hide or dim things before they animate key off this class, so if
// this module never runs, nothing is left invisible.
if (!reducedMotion) document.documentElement.classList.add('motion');

let lenis: Lenis | undefined;

export function startSmoothScroll() {
  if (reducedMotion || lenis) return lenis;
  lenis = new Lenis({ lerp: 0.085, anchors: true, autoRaf: false, virtualScroll: gate });
  lenis.on('scroll', ScrollTrigger.update);
  lenis.on('scroll', holdAtEntry);
  window.addEventListener('keydown', onKey);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

// ---------- Stepped scenes: one gesture, one step ----------
//
// A pinned scene tells its story in steps. However hard you scroll, a gesture
// moves it one step: the rest of that gesture (a trackpad's inertia, a long
// flick) is swallowed until it ends. Coming in fast, the scene stops you at its
// first step (or its last, from below); one more gesture past the end lets go.

// hold: how long a step's own animations run after the glide ends; the next
// gesture waits for them.
type Stepped = { st: ScrollTrigger; steps: number; hold: (step: number) => number };
const scenes: Stepped[] = [];

const STEP_DURATION = 1.1; // seconds to glide from one step to the next
const QUIET_MS = 200; // a gap this long between events ends a gesture

let busy = false; // gliding to a step
let swallowing = false; // the gesture that moved a step (or was stopped) isn't over yet
let lastEvent = 0; // last swallowed event, to tell one gesture from the next
let lastAbs = 0; // last swallowed delta, to spot a fresh gesture under inertia
let touchTravel = 0;
let touchFired = false;
let prevY = 0;
let lastInput = -Infinity; // last wheel or touch event: holds only apply to gestures

const posOf = (s: Stepped, k: number) => s.st.start + ((s.st.end - s.st.start) * k) / (s.steps - 1);
const stepOf = (s: Stepped, y: number) => Math.round(((y - s.st.start) / (s.st.end - s.st.start)) * (s.steps - 1));

// The scene a move in this direction would play, if any. At the last step
// going down (or the first going up) there is none: the move leaves. A scene
// already half on screen counts as reached: its first step is showing, so the
// next gesture plays the second one instead of just settling the pin.
// That only holds for a gesture that starts there; one that merely passes
// through on its way in is stopped at the first step instead (holdAtEntry).
const APPROACH = 0.5; // of the viewport
function sceneFor(y: number, dir: number, from = y) {
  const near = window.innerHeight * APPROACH;
  const inside = (s: Stepped) => (dir > 0 ? y >= s.st.start - 2 && y < s.st.end - 2 : y > s.st.start + 2 && y <= s.st.end + 2);
  const approaching = (s: Stepped) =>
    dir > 0 ? from >= s.st.start - near && from < s.st.start && y < s.st.start : from <= s.st.end + near && from > s.st.end && y > s.st.end;
  return scenes.find((s) => inside(s) || approaching(s));
}
let lastAny = -Infinity; // last wheel event of any kind
let gestureFrom = 0; // where the current gesture started

function go(s: Stepped, y: number, dir: number) {
  const at = Math.min(s.steps - 1, Math.max(0, stepOf(s, y)));
  const next = Math.min(s.steps - 1, Math.max(0, at + dir));
  busy = true;
  swallowing = true;
  lastEvent = performance.now();
  lastAbs = Infinity; // only a pause starts the next gesture
  lenis?.scrollTo(posOf(s, next), {
    duration: STEP_DURATION,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    force: true,
    onComplete: () => {
      setTimeout(() => (busy = false), s.hold(next));
    },
  });
}

// Every wheel and touch event passes here before Lenis moves the page.
function gate({ deltaY, event }: { deltaX: number; deltaY: number; event: WheelEvent | TouchEvent }) {
  if (!lenis || event.ctrlKey) return true;
  lastInput = performance.now();
  const isTouch = event.type.startsWith('touch');
  if (event.type === 'touchstart') {
    touchTravel = 0;
    touchFired = false;
    return true;
  }
  if (event.type === 'touchend') return true;
  const dir = Math.sign(deltaY);
  if (!dir) return true;
  const now = performance.now();
  const abs = Math.abs(deltaY);
  if (!isTouch) {
    if (now - lastAny > QUIET_MS) gestureFrom = lenis.scroll;
    lastAny = now;
  } else if (touchTravel === 0) gestureFrom = lenis.scroll;

  // What's left of a gesture that already moved a step goes nowhere, even
  // past the scene's edge.
  if (swallowing && !isTouch) {
    const fresh = now - lastEvent > QUIET_MS || (abs > lastAbs * 2.5 && abs > 12);
    if (!fresh || busy) {
      lastEvent = now;
      lastAbs = abs;
      if (event.cancelable) event.preventDefault();
      return false;
    }
    swallowing = false;
  }

  const y = lenis.scroll;
  const s = busy ? scenes.find((sc) => y >= sc.st.start - 2 && y <= sc.st.end + 2) : sceneFor(y, dir, gestureFrom);
  if (!s) return true;

  if (event.cancelable) event.preventDefault();

  if (isTouch) {
    // A swipe is one gesture: it steps once, when it has travelled far enough.
    touchTravel += deltaY;
    if (!busy && !touchFired && Math.abs(touchTravel) > 36) {
      touchFired = true;
      go(s, y, Math.sign(touchTravel));
    }
    return false;
  }

  lastEvent = now;
  lastAbs = abs;
  if (!busy) go(s, y, dir);
  return false;
}

// Arriving with momentum: stop at the scene's first step (or last, from below).
// Only for gestures: a link or a jump goes where it was sent.
function holdAtEntry(l: Lenis) {
  const y = l.scroll;
  if (!busy && performance.now() - lastInput < 1200) {
    for (const s of scenes) {
      const edge = prevY < s.st.start && y > s.st.start ? s.st.start : prevY > s.st.end && y < s.st.end ? s.st.end : null;
      if (edge === null) continue;
      l.scrollTo(edge, { immediate: true, force: true });
      swallowing = true; // what's left of this gesture is swallowed
      lastEvent = performance.now();
      lastAbs = Infinity;
      prevY = edge;
      return;
    }
  }
  prevY = y;
}

const KEYS: Record<string, number> = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 };
function onKey(e: KeyboardEvent) {
  if (!lenis || e.altKey || e.ctrlKey || e.metaKey) return;
  if ((e.target as HTMLElement).closest?.('input, textarea, select, [contenteditable]')) return;
  const dir = e.key === ' ' && e.shiftKey ? -1 : KEYS[e.key];
  if (!dir) return;
  const s = sceneFor(lenis.scroll, dir);
  if (!s) return;
  e.preventDefault();
  if (!busy) go(s, lenis.scroll, dir);
}

// A pinned scene of `steps` beats. onStep gets the beat for the scroll position.
export function steppedScene(opts: {
  trigger: HTMLElement;
  pin: HTMLElement;
  steps: number;
  onStep: (step: number) => void;
  // ms each step's animations keep running once it's reached (default 1200)
  hold?: number | ((step: number) => number);
}) {
  const { trigger, pin, steps, onStep, hold = 1200 } = opts;
  const st = ScrollTrigger.create({
    trigger,
    pin,
    start: 'top top',
    end: `+=${(steps - 1) * 100}%`,
    onUpdate: (self) => onStep(Math.round(self.progress * (steps - 1))),
  });
  scenes.push({ st, steps, hold: typeof hold === 'function' ? hold : () => hold });
  return st;
}

// Statements marked [data-ink] ink themselves in, word by word, as they scroll by.
export function inkStatements() {
  if (reducedMotion) return;
  for (const statement of document.querySelectorAll<HTMLElement>('[data-ink]')) {
    gsap.to(statement.querySelectorAll('.word'), {
      opacity: 1,
      ease: 'none',
      stagger: 0.12,
      scrollTrigger: { trigger: statement, start: 'top 85%', end: 'bottom 62%', scrub: 0.6 },
    });
  }
}

export { gsap, ScrollTrigger, Flip };
