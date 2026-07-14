import { useState } from 'react'
import Fab from '@mui/material/Fab'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

const SHOW_THRESHOLD = 400

/**
 * Floating "back to top" button that fades/scales in once the user has
 * scrolled past `SHOW_THRESHOLD`. Visibility is driven by
 * `useMotionValueEvent` on Framer Motion's scroll value (not a scroll
 * listener that calls `setState` on every pixel) — React only re-renders
 * when the boolean actually flips.
 */
export function BackToTop() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldShow = latest > SHOW_THRESHOLD
    setVisible((prev) => (prev === shouldShow ? prev : shouldShow))
  })

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1200 }}
        >
          <Fab
            color="primary"
            size="medium"
            onClick={handleClick}
            aria-label="Back to top"
            sx={{ boxShadow: '0 12px 32px rgba(0,0,0,0.28)' }}
          >
            <KeyboardArrowUpRoundedIcon />
          </Fab>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
