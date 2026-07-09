import Box from '@mui/material/Box'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

const blobs = [
  {
    top: '-10%',
    left: '-8%',
    size: 420,
    colors: 'primary.main',
    duration: 22,
  },
  {
    top: '10%',
    right: '-12%',
    size: 380,
    colors: 'secondary.main',
    duration: 26,
  },
  {
    bottom: '-15%',
    left: '20%',
    size: 460,
    colors: 'primary.light',
    duration: 30,
  },
]

/**
 * Soft, slowly-drifting blurred gradient blobs used behind hero/feature
 * sections to create a premium "floating gradient" ambience.
 * Purely decorative: pointer events are disabled.
 */
export function GradientBackground() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 40, -30, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            filter: 'blur(90px)',
            opacity: 0.35,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              bgcolor: blob.colors,
            }}
          />
        </motion.div>
      ))}
    </Box>
  )
}

export default GradientBackground
