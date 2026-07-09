import { useEffect, useState } from 'react'

/**
 * Tracks whether a CSS media query currently matches.
 * @param {string} query e.g. '(max-width: 600px)'
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const listener = (event) => setMatches(event.matches)

    mediaQueryList.addEventListener('change', listener)
    return () => mediaQueryList.removeEventListener('change', listener)
  }, [query])

  return matches
}
