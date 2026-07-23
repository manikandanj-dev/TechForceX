import { motion } from 'framer-motion'
import { SEO } from '@components/SEO'
import { getLocaleSeo } from '@/seo/seoLocales'
import { useLocale } from '@hooks/useLocale'
import { buildBreadcrumbSchema } from '@/seo/schemas/breadcrumbSchema'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded'
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded'
import CloudRoundedIcon from '@mui/icons-material/CloudRounded'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import CommitRoundedIcon from '@mui/icons-material/CommitRounded'
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { GlassCard } from '@components/GlassCard'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import profilePhoto from '@assets/Manikandan.jpeg'

const ACHIEVEMENTS = [
  {
    icon: WorkRoundedIcon,
    eyebrow: 'Professional Experience',
    title: '4.7+ Years Experience',
    description:
      'Building enterprise-grade React.js and React Native applications for production environments.',
  },
  {
    icon: RocketLaunchRoundedIcon,
    eyebrow: 'Projects',
    title: '15+ Projects Delivered',
    description:
      'Successfully developed and maintained web applications, mobile applications, payment platforms, and admin portals.',
  },
  {
    icon: PaymentRoundedIcon,
    eyebrow: 'Payments',
    title: 'Adyen Integration',
    description:
      'Implemented secure payment gateway integrations with REST APIs, payment workflows, and transaction handling.',
  },
  {
    icon: PhoneIphoneRoundedIcon,
    eyebrow: 'Cross Platform',
    title: 'Android & iOS',
    description:
      'Delivered React Native applications with production deployment, push notifications, deep linking, and performance optimization.',
  },
  {
    icon: BoltRoundedIcon,
    eyebrow: 'Performance',
    title: 'Optimized Applications',
    description:
      'Focused on reusable architecture, lazy loading, API optimization, code splitting, and responsive UI development.',
  },
  {
    icon: GroupsRoundedIcon,
    eyebrow: 'Team Collaboration',
    title: 'Agile Development',
    description:
      'Worked closely with product managers, designers, QA teams, and backend developers using Azure DevOps and Jira.',
  },
]

const EXPERTISE = [
  { icon: CodeRoundedIcon, label: 'React.js' },
  { icon: PhoneIphoneRoundedIcon, label: 'React Native' },
  { icon: DataObjectRoundedIcon, label: 'TypeScript' },
  { icon: CodeRoundedIcon, label: 'JavaScript' },
  { icon: PaletteRoundedIcon, label: 'Material UI' },
  { icon: CloudRoundedIcon, label: 'REST APIs' },
  { icon: PaymentRoundedIcon, label: 'Adyen Payments' },
  { icon: StorageRoundedIcon, label: 'Zustand' },
  { icon: AccountTreeRoundedIcon, label: 'Redux Toolkit' },
  { icon: CommitRoundedIcon, label: 'Git' },
  { icon: CloudQueueRoundedIcon, label: 'Azure DevOps' },
  { icon: BoltRoundedIcon, label: 'Performance Optimization' },
  { icon: DevicesRoundedIcon, label: 'Responsive UI' },
]

const FLOATING_BADGES = [
  { label: 'React.js', top: '-6%', left: '58%', duration: 6.5 },
  { label: 'React Native', top: '14%', left: '-14%', duration: 7.5 },
  { label: 'TypeScript', top: '58%', left: '-16%', duration: 7 },
  { label: 'Material UI', top: '82%', left: '54%', duration: 6 },
  { label: 'REST APIs', top: '38%', left: '86%', duration: 8 },
]

/**
 * Achievement-driven About page: profile with an animated glowing gradient
 * border and floating tech badges on the left, achievement cards + a core
 * expertise chip list on the right.
 */
export function About() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const prefersReducedMotion = usePrefersReducedMotion()
  const { locale } = useLocale()
  const seo = getLocaleSeo(locale, '/about')

  return (
    <PageTransition>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogTitle={seo.ogTitle}
        ogDesc={seo.ogDesc}
        schema={buildBreadcrumbSchema('/about')}
        lang={locale}
      />
      <SectionContainer>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              About Me
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 500, lineHeight: 1.7, maxWidth: 760, mb: { xs: 6, md: 8 } }}
            >
              Passionate Software Engineer building scalable web and cross-platform mobile
              applications with React.js and React Native, focused on clean architecture,
              performance, and exceptional user experience.
            </Typography>
          </motion.div>

          <Grid container spacing={{ xs: 8, md: 6 }} sx={{ alignItems: 'flex-start' }}>
            {/* Left: profile with glowing border + floating tech badges */}
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div variants={fadeInUp} style={{ position: 'sticky', top: 96 }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 320,
                    aspectRatio: '1 / 1',
                    mx: 'auto',
                  }}
                >
                  {/* Animated glowing gradient border */}
                  <Box
                    aria-hidden
                    component={motion.div}
                    animate={
                      prefersReducedMotion ? undefined : { rotate: 360, opacity: [0.7, 1, 0.7] }
                    }
                    transition={{
                      rotate: { duration: 14, repeat: Infinity, ease: 'linear' },
                      opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    sx={{
                      position: 'absolute',
                      inset: -8,
                      borderRadius: '50%',
                      background: `conic-gradient(from 0deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      filter: 'blur(6px)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '4px solid',
                      borderColor: theme.palette.background.default,
                      boxShadow: `0 24px 48px ${alpha(theme.palette.primary.main, 0.28)}`,
                    }}
                  >
                    <Box
                      component="img"
                      src={profilePhoto}
                      alt="Manikandan J"
                      decoding="async"
                      width={320}
                      height={320}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </Box>

                  {/* Floating technology badges */}
                  {FLOATING_BADGES.map((badge, index) => (
                    <Box
                      key={badge.label}
                      component={motion.div}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 1, scale: 1, y: [0, -12, 0] }
                      }
                      transition={{
                        opacity: { duration: 0.5, delay: 0.4 + index * 0.12 },
                        scale: { duration: 0.5, delay: 0.4 + index * 0.12 },
                        y: {
                          duration: badge.duration,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.35,
                        },
                      }}
                      sx={{
                        position: 'absolute',
                        top: badge.top,
                        left: badge.left,
                        zIndex: 2,
                      }}
                    >
                      <Chip
                        label={badge.label}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          bgcolor: alpha(theme.palette.background.paper, 0.85),
                          backdropFilter: 'blur(14px)',
                          border: '1px solid',
                          borderColor: 'divider',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.16)',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Right: achievement cards */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={3}>
                {ACHIEVEMENTS.map((achievement) => {
                  const AchievementIcon = achievement.icon
                  return (
                    <Grid key={achievement.title} size={{ xs: 12, sm: 6 }}>
                      <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                        <motion.div
                          whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                          style={{ height: '100%' }}
                        >
                          <GlassCard hoverLift={false} sx={{ height: '100%' }}>
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, isDark ? 0.35 : 0.16)}, ${alpha(theme.palette.secondary.main, isDark ? 0.3 : 0.14)})`,
                              }}
                            >
                              <AchievementIcon sx={{ color: 'primary.main', fontSize: 26 }} />
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 800,
                                letterSpacing: 0.8,
                                color: 'text.secondary',
                                textTransform: 'uppercase',
                              }}
                            >
                              {achievement.eyebrow}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5, mb: 1 }}>
                              {achievement.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ lineHeight: 1.7 }}
                            >
                              {achievement.description}
                            </Typography>
                          </GlassCard>
                        </motion.div>
                      </motion.div>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>

          {/* Core Expertise */}
          <motion.div variants={fadeInUp}>
            <Box sx={{ mt: { xs: 8, md: 10 } }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
                Core Expertise
              </Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
                {EXPERTISE.map((item) => {
                  const ExpertiseIcon = item.icon
                  return (
                    <Chip
                      key={item.label}
                      icon={<ExpertiseIcon />}
                      label={item.label}
                      variant="outlined"
                      sx={{
                        fontWeight: 700,
                        px: 0.5,
                        py: 2.5,
                        borderRadius: 3,
                        borderColor: alpha(theme.palette.text.primary, isDark ? 0.16 : 0.12),
                        '& .MuiChip-icon': { color: 'primary.main' },
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: alpha(theme.palette.primary.main, isDark ? 0.12 : 0.06),
                        },
                      }}
                    />
                  )
                })}
              </Stack>
            </Box>
          </motion.div>
        </motion.div>
      </SectionContainer>
    </PageTransition>
  )
}

export default About
