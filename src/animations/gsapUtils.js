import { gsap } from 'gsap'

/**
 * Fades and slides a set of elements into view with a stagger effect.
 * @param {string | Element | Element[]} targets
 * @param {gsap.TweenVars} [options]
 */
export function staggerReveal(targets, options = {}) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      ...options,
    }
  )
}

/**
 * Simple floating loop animation, useful for decorative elements.
 * @param {string | Element | Element[]} targets
 */
export function floatLoop(targets) {
  return gsap.to(targets, {
    y: -12,
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
}
