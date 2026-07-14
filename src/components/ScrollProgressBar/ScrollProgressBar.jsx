import Box from '@mui/material/Box'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useTheme } from '@mui/material/styles'

/**
 * Thin fixed bar at the very top of the viewport that fills left-to-right
 * as the user scrolls the page. Driven entirely by Framer Motion's
 * `useScroll`/`useSpring` (a passive scroll listener + transform updates),
 * so it never triggers a React re-render and has effectively zero
 * performance cost.
 */
export function ScrollProgressBar() {
  const theme = useTheme()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: (t) => t.zIndex.appBar + 1,
        transformOrigin: '0%',
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
      component={motion.div}
      style={{ scaleX }}
    />
  )
}

export default ScrollProgressBar
