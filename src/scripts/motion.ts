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

let lenis: Lenis | undefined;

export function startSmoothScroll() {
  if (reducedMotion || lenis) return lenis;
  lenis = new Lenis({ lerp: 0.085, anchors: true, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export { gsap, ScrollTrigger, Flip };
