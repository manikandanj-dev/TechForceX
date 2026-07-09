import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Tracks the pointer position relative to the viewport center and exposes
 * smoothed motion values (`-1..1` range) suitable for parallax transforms,
 * e.g. `style={{ x: useTransform(x, [-1, 1], [-20, 20]) }}`. Stays at rest
 * (0, 0) when the user prefers reduced motion.
 * @param {number} [strength]
 */
export function useMouseParallax(strength = 1) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 60, damping: 15, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 60, damping: 15, mass: 0.5 })

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const handleMouseMove = (event) => {
      const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2
      const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2
      x.set(normalizedX * strength)
      y.set(normalizedY * strength)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y, strength, prefersReducedMotion])

  return { x: springX, y: springY }
}

export default useMouseParallax
