// Shared motion setup for the scenes: GSAP plugins over the browser's own
// scroll. Readers set the pace: a scene never holds the wheel, and a fast
// scroll passes it by. With prefers-reduced-motion, chapters render their
// final state without pinning.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Styles that hide or dim things before they animate key off this class, so if
// this module never runs, nothing is left invisible.
if (!reducedMotion) document.documentElement.classList.add('motion');

// A pinned scene of `steps` beats. onStep gets the beat for the scroll position.
export function steppedScene(opts: { trigger: HTMLElement; pin: HTMLElement; steps: number; onStep: (step: number) => void }) {
  const { trigger, pin, steps, onStep } = opts;
  return ScrollTrigger.create({
    trigger,
    pin,
    start: 'top top',
    end: `+=${(steps - 1) * 100}%`,
    onUpdate: (self) => onStep(Math.round(self.progress * (steps - 1))),
  });
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
