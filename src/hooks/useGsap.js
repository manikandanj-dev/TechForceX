import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Runs a GSAP animation callback within a scoped context and cleans it up
 * automatically when the component unmounts.
 * @param {(context: { ref: React.RefObject }) => void} animationCallback
 * @param {Array} deps
 */
export function useGsap(animationCallback, deps = []) {
  const scopeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationCallback({ ref: scopeRef })
    }, scopeRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scopeRef
}
