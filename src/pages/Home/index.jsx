import { motion, useTransform } from 'framer-motion'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import SpeedIcon from '@mui/icons-material/Speed'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { GradientBackground } from '@components/GradientBackground'
import { GlassCard } from '@components/GlassCard'
import { AnimatedCounter } from '@components/AnimatedCounter'
import { MagneticButton } from '@components/MagneticButton'
import { useMouseParallax } from '@hooks/useMouseParallax'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { STATS, FEATURES } from '@utils/mockData'

const FEATURE_ICONS = {
  AutoAwesome: AutoAwesomeIcon,
  Architecture: ArchitectureIcon,
  DesignServices: DesignServicesIcon,
  Speed: SpeedIcon,
}

/**
 * Premium, animated landing page: hero with mouse parallax and a floating
 * gradient background, animated statistics, feature highlights in
 * glassmorphism cards, and a closing call-to-action.
 */
export function Home() {
  const theme = useTheme()
  const { x, y } = useMouseParallax(24)
  const orbAX = useTransform(x, (value) => value)
  const orbAY = useTransform(y, (value) => value)
  const orbBX = useTransform(x, (value) => -value * 1.4)
  const orbBY = useTransform(y, (value) => -value * 1.4)

  return (
    <PageTransition>
      {/* Hero */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <GradientBackground />

        <motion.div
          aria-hidden
          style={{
            x: orbAX,
            y: orbAY,
            position: 'absolute',
            top: '18%',
            left: '8%',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: alpha(theme.palette.primary.main, 0.5),
            filter: 'blur(6px)',
            zIndex: 0,
          }}
        />
        <motion.div
          aria-hidden
          style={{
            x: orbBX,
            y: orbBY,
            position: 'absolute',
            bottom: '15%',
            right: '10%',
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: alpha(theme.palette.secondary.main, 0.5),
            filter: 'blur(6px)',
            zIndex: 0,
          }}
        />

        <SectionContainer
          maxWidth="md"
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            py: { xs: 12, md: 20 },
          }}
        >
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp}>
              <Typography variant="overline" color="primary.main" fontWeight={700}>
                Welcome to my portfolio
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography
                variant="h1"
                sx={{
                  mt: 2,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                I build delightful, animated web experiences
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 5, fontWeight: 400 }}>
                React developer specializing in interactive UI, smooth motion design, and scalable
                frontend architecture.
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ justifyContent: 'center' }}
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
                  Get in Touch
                </MagneticButton>
              </Stack>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ marginTop: 64 }}
          >
            <KeyboardArrowDownIcon sx={{ fontSize: 32 }} color="disabled" />
          </motion.div>
        </SectionContainer>
      </Box>

      {/* Animated statistics */}
      <SectionContainer sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid container spacing={3}>
            {STATS.map((stat) => (
              <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <GlassCard sx={{ textAlign: 'center', height: '100%' }}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {stat.label}
                    </Typography>
                  </GlassCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </SectionContainer>

      {/* Feature highlights */}
      <SectionContainer sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Typography variant="h2" sx={{ mb: 1, textAlign: 'center' }}>
            Why work with me
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, textAlign: 'center' }}>
            The principles behind every project I ship.
          </Typography>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid container spacing={3}>
            {FEATURES.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon]
              return (
                <Grid key={feature.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                    <GlassCard sx={{ height: '100%' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 1.5,
                          borderRadius: 3,
                          mb: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.12),
                          color: 'primary.main',
                        }}
                      >
                        {Icon && <Icon fontSize="medium" />}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </GlassCard>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </motion.div>
      </SectionContainer>

      {/* Closing CTA */}
      <SectionContainer sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <GlassCard
            hoverLift={false}
            sx={{
              textAlign: 'center',
              py: { xs: 6, md: 8 },
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.16
              )}, ${alpha(theme.palette.secondary.main, 0.16)})`,
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Let&apos;s build something great
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Have an idea in mind? I&apos;d love to help bring it to life.
            </Typography>
            <MagneticButton component={RouterLink} to="/contact" variant="contained" size="large">
              Start a Project
            </MagneticButton>
          </GlassCard>
        </motion.div>
      </SectionContainer>
    </PageTransition>
  )
}

export default Home
