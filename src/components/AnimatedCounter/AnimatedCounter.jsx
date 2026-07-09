import { useEffect, useRef } from 'react'
import Typography from '@mui/material/Typography'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

/**
 * Animates a number counting up from 0 to `value` once it scrolls into
 * view, using a spring for a natural, decelerating motion.
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.5,
  variant = 'h3',
  sx = {},
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration, bounce: 0 })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`
      }
    })
    return unsubscribe
  }, [springValue, prefix, suffix])

  return (
    <Typography
      ref={ref}
      variant={variant}
      sx={{ fontWeight: 800, ...sx }}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}0{suffix}
    </Typography>
  )
}

export default AnimatedCounter
