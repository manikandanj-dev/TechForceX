import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import { alpha, useTheme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import { MagneticButton } from '@components/MagneticButton'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { HeroScene } from './HeroScene'

export function PremiumHero() {
  const theme = useTheme()

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: 'calc(100svh - 72px)', md: 'calc(100svh - 80px)' },
        overflow: 'hidden',
        display: 'grid',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.98)} 0%, ${alpha(
          theme.palette.primary.main,
          theme.palette.mode === 'dark' ? 0.16 : 0.1
        )} 48%, ${alpha(theme.palette.secondary.main, theme.palette.mode === 'dark' ? 0.14 : 0.08)} 100%)`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: theme.palette.mode === 'dark' ? 0.38 : 0.5,
          backgroundImage:
            'linear-gradient(rgba(127,127,127,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(127,127,127,0.11) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black, transparent 92%)',
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          minHeight: '100%',
          '& canvas': { display: 'block' },
        }}
      >
        <HeroScene />
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 5 },
          py: { xs: 8, md: 10 },
        }}
      >
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <Stack spacing={3} sx={{ maxWidth: { xs: 680, md: 760 } }}>
            <motion.div variants={fadeInUp}>
              <Chip
                icon={<ViewInArIcon />}
                label="Software Engineer | React JS & React Native Developer"
                sx={{
                  width: 'fit-content',
                  fontWeight: 800,
                  bgcolor: alpha(theme.palette.background.paper, 0.82),
                  backdropFilter: 'blur(14px)',
                  border: 1,
                  borderColor: 'divider',
                }}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography
                variant="h1"
                sx={{
                  maxWidth: 820,
                  textWrap: 'balance',
                  background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main} 58%, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Hi, I&apos;m Manikandan J
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 620, fontWeight: 400, lineHeight: 1.75 }}
              >
                Software Engineer specializing in React.js and React Native. With 4.7+ years of
                experience building scalable web and cross-platform mobile applications, I create
                modern UI, high-performance applications, reusable architecture, and exceptional
                user experiences.
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}
              >
                <MagneticButton
                  component={RouterLink}
                  to="/projects"
                  variant="contained"
                  size="large"
                >
                  View Projects
                </MagneticButton>
                <MagneticButton
                  component={RouterLink}
                  to="/contact"
                  variant="outlined"
                  size="large"
                >
                  Contact Me
                </MagneticButton>
              </Stack>
            </motion.div>
          </Stack>
        </motion.div>
      </Box>

      <Box
        component={motion.div}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        sx={{ position: 'absolute', left: '50%', bottom: 22, zIndex: 1, color: 'text.disabled' }}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 32 }} />
      </Box>
    </Box>
  )
}

export default PremiumHero
