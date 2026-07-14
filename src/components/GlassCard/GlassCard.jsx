import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

/**
 * Glassmorphism surface: translucent, blurred background with a subtle
 * border highlight. Renders as a `motion.div` so callers can pass any
 * Framer Motion props (variants, whileHover, whileInView, etc.). Uses a
 * single `24px` border radius and a theme-tinted hover glow/blur increase
 * everywhere by default so every card across the site shares the same
 * premium look unless a caller explicitly overrides it via `sx`.
 */
export function GlassCard({ children, sx = {}, hoverLift = true, ...motionProps }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Box
      component={motion.div}
      whileHover={
        hoverLift
          ? { y: -6, boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.22)}` }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      sx={{
        position: 'relative',
        borderRadius: '24px',
        border: '1px solid',
        borderColor: alpha(theme.palette.text.primary, isDark ? 0.12 : 0.08),
        backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.45 : 0.6),
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease',
        p: { xs: 3, md: 4 },
        '&:hover': {
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
        },
        ...sx,
      }}
      {...motionProps}
    >
      {children}
    </Box>
  )
}

export default GlassCard
