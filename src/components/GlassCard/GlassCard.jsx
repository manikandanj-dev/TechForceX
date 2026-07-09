import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

/**
 * Glassmorphism surface: translucent, blurred background with a subtle
 * border highlight. Renders as a `motion.div` so callers can pass any
 * Framer Motion props (variants, whileHover, whileInView, etc.).
 */
export function GlassCard({ children, sx = {}, hoverLift = true, ...motionProps }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Box
      component={motion.div}
      whileHover={hoverLift ? { y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      sx={{
        position: 'relative',
        borderRadius: 4,
        border: '1px solid',
        borderColor: alpha(theme.palette.text.primary, isDark ? 0.12 : 0.08),
        backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.45 : 0.6),
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        p: { xs: 3, md: 4 },
        ...sx,
      }}
      {...motionProps}
    >
      {children}
    </Box>
  )
}

export default GlassCard
