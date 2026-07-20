import { motion } from 'framer-motion'
import { SEO } from '@components/SEO'
import { SEO_ROUTES } from '@/seo/seoConfig'
import { memo } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import useMediaQuery from '@mui/material/useMediaQuery'
import { alpha, useTheme } from '@mui/material/styles'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded'
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { GlassCard } from '@components/GlassCard'
import { GradientBackground } from '@components/GradientBackground'
import { AnimatedCounter } from '@components/AnimatedCounter'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

const SUMMARY_STATS = [
  { icon: WorkRoundedIcon, kind: 'counter', value: 4, suffix: '.7+', label: 'Years Experience' },
  {
    icon: RocketLaunchRoundedIcon,
    kind: 'counter',
    value: 15,
    suffix: '+',
    label: 'Projects Delivered',
  },
  { icon: PhoneIphoneRoundedIcon, kind: 'text', value: 'Web + Android + iOS', label: 'Platforms' },
  { icon: PaymentRoundedIcon, kind: 'text', value: 'Payment Systems', label: 'Specialization' },
]

const TIMELINE = [
  {
    id: 'logicvalley-technologies',
    role: 'Software Engineer',
    company: 'LogicValley Technologies Pvt Ltd',
    period: '2022 – Present',
    description:
      'Building enterprise React.js applications and cross-platform React Native apps with scalable architecture, REST API integrations, and secure payment gateway workflows.',
    technologies: [
      'React.js',
      'React Native',
      'TypeScript',
      'Material UI',
      'REST APIs',
      'Adyen',
      'Azure DevOps',
    ],
    responsibilities: [
      'Developed enterprise React.js applications',
      'Built cross-platform React Native applications',
      'Integrated REST APIs',
      'Implemented Adyen payment gateway',
      'Created reusable component architecture',
      'Performance optimization',
      'Code reviews',
    ],
    achievements: [
      'Successfully delivered multiple production applications.',
      'Improved application performance.',
      'Created reusable frontend architecture.',
      'Collaborated with cross-functional Agile teams.',
    ],
    projects: ['EPASS24', 'ParkiaPay', 'LogicValley Website', 'KMTOLL', 'MNPS'],
    techStack: [
      'React.js',
      'React Native',
      'Material UI',
      'TypeScript',
      'JavaScript',
      'REST APIs',
      'Axios',
      'Redux',
      'Zustand',
      'Git',
      'Azure DevOps',
      'Jira',
    ],
  },
]

/**
 * Animated summary stat card: numeric counter or short text value with an
 * icon that rotates slightly on hover, in a glassmorphism surface.
 */
const SummaryStatCard = memo(function SummaryStatCard({ stat }) {
  const StatIcon = stat.icon
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ height: '100%' }}
    >
      <GlassCard hoverLift={false} sx={{ textAlign: 'center', height: '100%' }}>
        <Box
          component={motion.div}
          whileHover={prefersReducedMotion ? undefined : { rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          sx={{ display: 'inline-flex' }}
        >
          <StatIcon sx={{ color: 'primary.main', fontSize: 32, mb: 1 }} />
        </Box>
        {stat.kind === 'counter' ? (
          <AnimatedCounter value={stat.value} suffix={stat.suffix} variant="h5" sx={{ mb: 0.5 }} />
        ) : (
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, lineHeight: 1.3 }}>
            {stat.value}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {stat.label}
        </Typography>
      </GlassCard>
    </motion.div>
  )
})

/**
 * Bulleted list rendered as semantic `ul`/`li` for accessibility, each
 * item prefixed with an icon.
 */
function IconList({ items, icon: ItemIcon, iconColor }) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {items.map((item) => (
        <Stack
          key={item}
          component="li"
          direction="row"
          sx={{ alignItems: 'flex-start', gap: 1, mb: 1.25 }}
        >
          <ItemIcon sx={{ fontSize: 18, color: iconColor, mt: '2px', flexShrink: 0 }} />
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {item}
          </Typography>
        </Stack>
      ))}
    </Box>
  )
}

/**
 * Premium glassmorphism experience card: company logo placeholder, role,
 * technology tags, responsibilities/achievements, projects worked, and the
 * full technology stack.
 */
function ExperienceCard({ exp }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <Box
      sx={{
        borderRadius: '24px',
        p: '1.5px',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.55)}, ${alpha(theme.palette.secondary.main, 0.4)})`,
      }}
    >
      <GlassCard
        hoverLift={false}
        sx={{
          borderRadius: '24px',
          transition: 'backdrop-filter 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            boxShadow: `0 24px 48px ${alpha(theme.palette.primary.main, 0.22)}`,
          },
        }}
      >
        <Stack direction="row" sx={{ alignItems: 'center', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
          <Box
            component={motion.div}
            whileHover={prefersReducedMotion ? undefined : { rotate: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            aria-hidden
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, isDark ? 0.35 : 0.16)}, ${alpha(theme.palette.secondary.main, isDark ? 0.3 : 0.14)})`,
            }}
          >
            <ApartmentRoundedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: 200 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {exp.role}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {exp.company}
            </Typography>
          </Box>
          <Chip
            label={exp.period}
            size="small"
            sx={{
              fontWeight: 700,
              color: '#fff',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          />
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2.5 }}>
          {exp.description}
        </Typography>

        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {exp.technologies.map((tech) => (
            <motion.div
              key={tech}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <Chip
                label={tech}
                size="small"
                sx={{
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.primary.main, isDark ? 0.16 : 0.08),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                }}
              />
            </motion.div>
          ))}
        </Stack>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' }}
            >
              Responsibilities
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              <IconList
                items={exp.responsibilities}
                icon={FiberManualRecordRoundedIcon}
                iconColor="primary.main"
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' }}
            >
              Achievements
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              <IconList
                items={exp.achievements}
                icon={TaskAltRoundedIcon}
                iconColor="success.main"
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, mb: 1.5 }}>
            <FolderRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' }}
            >
              Projects Worked
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {exp.projects.map((project) => (
              <motion.div
                key={project}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <Chip
                  label={project}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  sx={{ fontWeight: 700 }}
                />
              </motion.div>
            ))}
          </Stack>
        </Box>

        <Box sx={{ pt: 2.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
              display: 'block',
              mb: 1.5,
            }}
          >
            Technology Stack
          </Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {exp.techStack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  borderColor: alpha(theme.palette.text.primary, isDark ? 0.2 : 0.14),
                }}
              />
            ))}
          </Stack>
        </Box>
      </GlassCard>
    </Box>
  )
}

/**
 * A single alternating row of the timeline: the experience card on one
 * side (left/right on desktop, always full-width on mobile), a glowing
 * animated dot in the center rail.
 */
function TimelineRow({ exp, index, isDesktop }) {
  const isEven = index % 2 === 0
  const prefersReducedMotion = usePrefersReducedMotion()

  const dot = (
    <Box
      component={motion.div}
      animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      sx={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        boxShadow: (theme) => `0 0 0 6px ${alpha(theme.palette.primary.main, 0.18)}`,
      }}
    />
  )

  if (!isDesktop) {
    return (
      <Box sx={{ position: 'relative', pl: 6 }}>
        <Box sx={{ position: 'absolute', left: '13px', top: 6 }}>{dot}</Box>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <ExperienceCard exp={exp} />
        </motion.div>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: isEven ? 'row' : 'row-reverse',
      }}
    >
      <Box sx={{ width: '46%' }}>
        <motion.div
          variants={
            isEven
              ? {
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                }
              : {
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                }
          }
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <ExperienceCard exp={exp} />
        </motion.div>
      </Box>
      <Box sx={{ width: '8%', display: 'flex', justifyContent: 'center', pt: 3 }}>{dot}</Box>
      <Box sx={{ width: '46%' }} />
    </Box>
  )
}

/**
 * Premium, achievement-driven Experience section: animated summary stats,
 * a center-line timeline that alternates left/right on desktop (single
 * column on mobile), and a rich glassmorphism experience card covering
 * responsibilities, achievements, projects, and full technology stack.
 */
export function Experience() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const prefersReducedMotion = usePrefersReducedMotion()

  const seo = SEO_ROUTES['/experience']

  return (
    <PageTransition>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogTitle={seo.ogTitle}
        ogDesc={seo.ogDesc}
      />
      <Box component="section" sx={{ position: 'relative', overflow: 'hidden' }}>
        <GradientBackground />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: theme.palette.mode === 'dark' ? 0.3 : 0.4,
            backgroundImage:
              'linear-gradient(rgba(127,127,127,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(127,127,127,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, black, transparent 88%)',
          }}
        />

        <SectionContainer sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={fadeInUp}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Professional Experience
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: 500, lineHeight: 1.7, maxWidth: 820, mb: { xs: 6, md: 8 } }}
              >
                4.7+ years of experience building enterprise web applications, cross-platform mobile
                applications, payment platforms, and scalable frontend architectures.
              </Typography>
            </motion.div>

            <Grid container spacing={3} sx={{ mb: { xs: 8, md: 10 } }}>
              {SUMMARY_STATS.map((stat) => (
                <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
                  <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                    <SummaryStatCard stat={stat} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          <Box component="ol" sx={{ position: 'relative', listStyle: 'none', m: 0, p: 0 }}>
            <Box
              aria-hidden
              component={motion.div}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 3,
                borderRadius: 2,
                transformOrigin: 'top',
                left: { xs: 20, md: '50%' },
                transform: { md: 'translateX(-50%)' },
                background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: prefersReducedMotion
                  ? 'none'
                  : `0 0 16px ${alpha(theme.palette.primary.main, 0.5)}`,
              }}
            />

            <Stack component="li" spacing={{ xs: 6, md: 8 }} sx={{ position: 'relative' }}>
              {TIMELINE.map((exp, index) => (
                <TimelineRow key={exp.id} exp={exp} index={index} isDesktop={isDesktop} />
              ))}
            </Stack>
          </Box>
        </SectionContainer>
      </Box>
    </PageTransition>
  )
}

export default Experience
