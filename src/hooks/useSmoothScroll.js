import { useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Enables smooth, native browser scrolling for anchor jumps (e.g. the
 * "Skip to main content" link) across the whole app.
 *
 * This intentionally relies on the browser's own scrolling engine (CSS
 * `scroll-behavior: smooth`) rather than a JS scroll-hijacking library.
 * A previous version used the `lenis` library to animate scroll via its
 * own requestAnimationFrame loop, but that approach stalls indefinitely
 * whenever rAF is paused/throttled (backgrounded tab, low-power mode,
 * a mid-scroll tab switch, etc.), leaving the page stuck mid-scroll —
 * which is exactly the "scrolling doesn't work" symptom this replaces.
 * Native scrolling has no such failure mode and works reliably on touch
 * devices and trackpads out of the box.
 */
export function useSmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth'
  }, [prefersReducedMotion])
}

export default useSmoothScroll
