import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, .cursor-hover'

/**
 * Custom animated dot + trailing ring cursor, shown only on devices with a
 * precise pointing device (desktop mice/trackpads — `(pointer: fine)`).
 * Skipped entirely on touch devices and when the user prefers reduced
 * motion. Position is driven by Framer Motion values updated directly from
 * a `mousemove` listener (no React state per pixel) so it doesn't cause
 * re-renders or hurt scroll/animation performance.
 */
export function CustomCursor() {
  const isPointerFine = useMediaQuery('(pointer: fine)')
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { stiffness: 280, damping: 28, mass: 0.4 })
  const ringY = useSpring(dotY, { stiffness: 280, damping: 28, mass: 0.4 })

  const enabled = isPointerFine && !prefersReducedMotion

  useEffect(() => {
    if (!enabled) return undefined

    const handleMouseMove = (event) => {
      dotX.set(event.clientX)
      dotY.set(event.clientY)
      if (!isVisible) setIsVisible(true)
    }
    const handleMouseOver = (event) => {
      setIsHovering(Boolean(event.target.closest?.(INTERACTIVE_SELECTOR)))
    }
    const handleMouseLeaveWindow = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.body.classList.add('custom-cursor-active')

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.body.classList.remove('custom-cursor-active')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  if (!enabled) return null

  return (
    <Box aria-hidden sx={{ display: { xs: 'none', md: 'block' } }}>
      <Box
        component={motion.div}
        style={{ translateX: dotX, translateY: dotY, opacity: isVisible ? 1 : 0 }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        sx={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          pointerEvents: 'none',
          zIndex: 2100,
        }}
      />
      <Box
        component={motion.div}
        style={{ translateX: ringX, translateY: ringY, opacity: isVisible ? 1 : 0 }}
        animate={{ scale: isHovering ? 1.6 : 1 }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 } }}
        sx={{
          position: 'fixed',
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid',
          borderColor: 'primary.main',
          pointerEvents: 'none',
          zIndex: 2100,
          transition: 'border-color 0.2s ease',
        }}
      />
    </Box>
  )
}

export default CustomCursor
