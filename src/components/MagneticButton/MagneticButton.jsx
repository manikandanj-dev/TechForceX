import { useRef } from 'react'
import Button from '@mui/material/Button'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const MotionButton = motion.create(Button)

/**
 * A CTA button that gently follows the cursor within its bounds ("magnetic"
 * hover effect), commonly seen on premium marketing sites.
 */
export function MagneticButton({ children, strength = 0.3, sx = {}, ...buttonProps }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMouseMove = (event) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    const relativeX = event.clientX - (bounds.left + bounds.width / 2)
    const relativeY = event.clientY - (bounds.top + bounds.height / 2)
    x.set(relativeX * strength)
    y.set(relativeY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionButton
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      sx={sx}
      {...buttonProps}
    >
      {children}
    </MotionButton>
  )
}

export default MagneticButton
