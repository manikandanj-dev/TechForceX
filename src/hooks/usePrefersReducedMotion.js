import { useEffect, useState } from 'react'

/**
 * Tracks the user's `prefers-reduced-motion` OS/browser setting so
 * decorative or continuous animations can be toned down or skipped for
 * users who have requested reduced motion.
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)')
    const listener = (event) => setPrefersReducedMotion(event.matches)

    mediaQueryList.addEventListener('change', listener)
    return () => mediaQueryList.removeEventListener('change', listener)
  }, [])

  return prefersReducedMotion
}

export default usePrefersReducedMotion
