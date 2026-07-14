import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { SITE_NAME } from '@utils/constants'

const letterVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.5, ease: 'easeOut' },
  }),
}

/**
 * Full-screen animated preloader shown briefly on the initial app load.
 * Calls `onFinished` after a short delay so the parent can unmount it
 * (letting the exit animation play via AnimatePresence). Pointer events
 * are disabled the moment the timer elapses, independent of whether the
 * exit animation itself has a chance to run (e.g. a backgrounded tab
 * pausing rAF), so the overlay can never get stuck blocking clicks.
 */
export function LoadingScreen({ onFinished, minDuration = 1600 }) {
  const theme = useTheme()
  const letters = SITE_NAME.split('')
  const [isFinishing, setIsFinishing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinishing(true)
      onFinished?.()
    }, minDuration)
    return () => clearTimeout(timer)
  }, [onFinished, minDuration])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isFinishing ? 'none' : 'auto',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'background.default',
        }}
      />

      <Box sx={{ position: 'relative', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          {letters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              custom={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography
                component="span"
                variant="h4"
                sx={{
                  fontWeight: 800,
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {letter}
              </Typography>
            </motion.span>
          ))}
        </Box>

        <Box
          sx={{
            width: 160,
            height: 3,
            mx: 'auto',
            borderRadius: 999,
            bgcolor: 'action.hover',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '50%',
              height: '100%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          />
        </Box>
      </Box>
    </motion.div>
  )
}

export default LoadingScreen
