import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DownloadIcon from '@mui/icons-material/Download'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import IntegrationInstructionsRoundedIcon from '@mui/icons-material/IntegrationInstructionsRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded'
import { alpha, useTheme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import { MagneticButton } from '@components/MagneticButton'
import { GlassCard } from '@components/GlassCard'
import { GradientBackground } from '@components/GradientBackground'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import profilePhoto from '@assets/ManikandanIfo.jpeg'

const HERO_STATS = [
  { icon: StarRoundedIcon, value: '4.7+', label: 'Years Experience' },
  { icon: RocketLaunchRoundedIcon, value: '15+', label: 'Projects Delivered' },
  { icon: PhoneIphoneRoundedIcon, value: 'Android & iOS', label: 'Production Apps' },
  { icon: PaymentRoundedIcon, value: 'Adyen', label: 'Payment Integration' },
]

const FLOATING_ICONS = [
  { icon: CodeRoundedIcon, top: '2%', left: '-8%', color: 'primary.main', duration: 6.5 },
  {
    icon: PhoneIphoneRoundedIcon,
    top: '68%',
    left: '-10%',
    color: 'secondary.main',
    duration: 7.5,
  },
  {
    icon: IntegrationInstructionsRoundedIcon,
    top: '80%',
    left: '70%',
    color: 'primary.main',
    duration: 7,
  },
  { icon: BoltRoundedIcon, top: '-4%', left: '66%', color: 'secondary.main', duration: 6 },
  { icon: DataObjectRoundedIcon, top: '38%', left: '92%', color: 'primary.main', duration: 8 },
]

/**
 * Premium two-column hero: content + CTAs on the left, a framed profile
 * photo with floating technology icons and glowing blurred accents on the
 * right. Fills the viewport height below the navbar.
 */
export function PremiumHero() {
  const theme = useTheme()
  const prefersReducedMotion = usePrefersReducedMotion()

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

      <GradientBackground />

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
        <Grid container spacing={{ xs: 8, md: 6 }} sx={{ alignItems: 'center' }}>
          {/* Left: content */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <Stack spacing={3} sx={{ maxWidth: 640 }}>
                <motion.div variants={fadeInUp}>
                  <Chip
                    label="🚀 Software Engineer | React.js | React Native Developer"
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
                  <Typography variant="h1" sx={{ textWrap: 'balance' }}>
                    Hi, I&apos;m{' '}
                    <Box
                      component="span"
                      sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Manikandan J
                    </Box>
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, lineHeight: 1.6, color: 'text.primary' }}
                  >
                    Building scalable React.js and React Native applications with clean
                    architecture, high performance, reusable components, and exceptional user
                    experience.
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8, fontWeight: 400 }}
                  >
                    Software Engineer with 4.7+ years of experience specializing in React.js and
                    React Native development. Experienced in enterprise web applications,
                    cross-platform mobile apps, REST API integration, Adyen payment gateway
                    integration, performance optimization, and modern UI development.
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
                      color="primary"
                      size="large"
                    >
                      View Projects
                    </MagneticButton>
                    <MagneticButton
                      component="a"
                      href="/resume.pdf"
                      download
                      target="_blank"
                      rel="noopener"
                      variant="contained"
                      color="secondary"
                      size="large"
                      startIcon={<DownloadIcon />}
                    >
                      Download Resume
                    </MagneticButton>
                    <MagneticButton
                      component="a"
                      href="mailto:manikandanj.dev@gmail.com"
                      variant="outlined"
                      color="primary"
                      size="large"
                    >
                      Contact Me
                    </MagneticButton>
                  </Stack>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Grid container spacing={2} sx={{ pt: 1 }}>
                    {HERO_STATS.map((stat) => {
                      const StatIcon = stat.icon
                      return (
                        <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
                          <motion.div
                            whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            style={{ height: '100%' }}
                          >
                            <GlassCard
                              hoverLift={false}
                              sx={{
                                textAlign: 'center',
                                height: '100%',
                                p: { xs: 2, md: 2.5 },
                              }}
                            >
                              <StatIcon sx={{ color: 'primary.main', fontSize: 26, mb: 0.5 }} />
                              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                                {stat.value}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: 'block', mt: 0.25 }}
                              >
                                {stat.label}
                              </Typography>
                            </GlassCard>
                          </motion.div>
                        </Grid>
                      )
                    })}
                  </Grid>
                </motion.div>
              </Stack>
            </motion.div>
          </Grid>

          {/* Right: profile illustration with floating tech icons */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 400,
                aspectRatio: '1 / 1',
                mx: 'auto',
              }}
            >
              {/* Glowing blurred circles behind the illustration */}
              <Box
                aria-hidden
                component={motion.div}
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                sx={{
                  position: 'absolute',
                  top: '-10%',
                  left: '-12%',
                  width: '65%',
                  height: '65%',
                  borderRadius: '50%',
                  bgcolor: alpha(
                    theme.palette.primary.main,
                    theme.palette.mode === 'dark' ? 0.4 : 0.32
                  ),
                  filter: 'blur(70px)',
                }}
              />
              <Box
                aria-hidden
                component={motion.div}
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                sx={{
                  position: 'absolute',
                  bottom: '-12%',
                  right: '-10%',
                  width: '60%',
                  height: '60%',
                  borderRadius: '50%',
                  bgcolor: alpha(
                    theme.palette.secondary.main,
                    theme.palette.mode === 'dark' ? 0.38 : 0.3
                  ),
                  filter: 'blur(70px)',
                }}
              />

              {/* Profile photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                style={{ position: 'relative', height: '100%' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: 6,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: alpha(
                      theme.palette.text.primary,
                      theme.palette.mode === 'dark' ? 0.14 : 0.08
                    ),
                    boxShadow: `0 30px 60px ${alpha(theme.palette.primary.main, 0.28)}`,
                  }}
                >
                  <Box
                    component="img"
                    src={profilePhoto}
                    alt="Manikandan J"
                    decoding="async"
                    width={640}
                    height={640}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </Box>
              </motion.div>

              {/* Floating technology icon badges */}
              {FLOATING_ICONS.map((item, index) => {
                const FloatIcon = item.icon
                return (
                  <Box
                    key={index}
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 1, scale: 1, y: [0, -14, 0] }
                    }
                    transition={{
                      opacity: { duration: 0.5, delay: 0.5 + index * 0.12 },
                      scale: { duration: 0.5, delay: 0.5 + index * 0.12 },
                      y: {
                        duration: item.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.4,
                      },
                    }}
                    sx={{
                      position: 'absolute',
                      top: item.top,
                      left: item.left,
                      zIndex: 2,
                      width: { xs: 44, md: 56 },
                      height: { xs: 44, md: 56 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.background.paper, 0.85),
                      backdropFilter: 'blur(14px)',
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.16)',
                    }}
                  >
                    <FloatIcon sx={{ color: item.color, fontSize: { xs: 22, md: 28 } }} />
                  </Box>
                )
              })}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        component={motion.div}
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: 22,
          zIndex: 1,
          color: 'text.disabled',
          transform: 'translateX(-50%)',
        }}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 32 }} />
      </Box>
    </Box>
  )
}

export default PremiumHero
