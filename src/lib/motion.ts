export const motion = {
  duration: {
    instant: 0.12,
    quick: 0.22,
    smooth: 0.48,
    cinematic: 0.8,
    review: 1.2,
  },
  ease: {
    outSoft: "power3.out",
    shelf: "expo.out",
    pop: "back.out(1.4)",
    calm: "power2.inOut",
  },
};

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
