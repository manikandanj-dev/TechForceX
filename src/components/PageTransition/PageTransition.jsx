import { motion } from 'framer-motion'
import { pageTransition, fadeIn } from '@animations/variants'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

/**
 * Wraps a page's content with a consistent enter/exit animation. Falls
 * back to a plain fade (no vertical motion) when the user prefers reduced
 * motion.
 */
export function PageTransition({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
