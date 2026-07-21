import { motion } from 'framer-motion'
import { SEO } from '@components/SEO'
import { SEO_ROUTES } from '@/seo/seoConfig'
import { buildBreadcrumbSchema } from '@/seo/schemas/breadcrumbSchema'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import WebRoundedIcon from '@mui/icons-material/WebRounded'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import ApiRoundedIcon from '@mui/icons-material/ApiRounded'
import HubRoundedIcon from '@mui/icons-material/HubRounded'
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded'
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded'
import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded'
import SchemaRoundedIcon from '@mui/icons-material/SchemaRounded'
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { GlassCard } from '@components/GlassCard'
import { GradientBackground } from '@components/GradientBackground'
import { AnimatedCounter } from '@components/AnimatedCounter'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

/** Accent hex palette used only within this section's cards/gradients. */
const ACCENTS = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#06B6D4',
  success: '#22C55E',
}

const LEVEL_PERCENT = {
  Expert: 100,
  Advanced: 80,
}

const SKILL_CATEGORIES = [
  {
    icon: WebRoundedIcon,
    title: 'Frontend Development',
    description: 'Building responsive, reusable, scalable web applications.',
    skills: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Material UI'],
    level: 'Expert',
    accent: ACCENTS.primary,
  },
  {
    icon: PhoneIphoneRoundedIcon,
    title: 'Mobile Development',
    description: 'Cross-platform mobile application development.',
    skills: [
      'React Native',
      'Android',
      'iOS',
      'Deep Linking',
      'Push Notifications',
      'App Store Deployment',
    ],
    level: 'Expert',
    accent: ACCENTS.secondary,
  },
  {
    icon: ApiRoundedIcon,
    title: 'API & Backend Integration',
    description: 'Connecting frontend applications with scalable backend services.',
    skills: [
      'REST APIs',
      'Axios',
      'Authentication',
      'JSON',
      'API Error Handling',
      'Adyen Payment Integration',
    ],
    level: 'Expert',
    accent: ACCENTS.accent,
  },
  {
    icon: HubRoundedIcon,
    title: 'State Management',
    description: 'Managing application state with scalable architecture.',
    skills: ['Zustand', 'Redux Toolkit', 'Context API', 'Custom Hooks'],
    level: 'Advanced',
    accent: ACCENTS.success,
  },
  {
    icon: HandymanRoundedIcon,
    title: 'Development Tools',
    description: 'Daily tools used throughout the software development lifecycle.',
    skills: [
      'Git',
      'GitHub',
      'Azure DevOps',
      'Jira',
      'Postman',
      'VS Code',
      'Figma',
      'GitHub Copilot',
      'ChatGPT',
    ],
    level: 'Expert',
    accent: ACCENTS.primary,
  },
  {
    icon: SpeedRoundedIcon,
    title: 'Performance & Best Practices',
    description: 'Building fast, scalable, maintainable applications.',
    skills: [
      'Reusable Components',
      'Lazy Loading',
      'Code Splitting',
      'Performance Optimization',
      'Responsive Design',
      'Clean Architecture',
      'Accessibility',
      'SEO Optimization',
    ],
    level: 'Expert',
    accent: ACCENTS.secondary,
  },
]

const EXPLORING = [
  { icon: PublicRoundedIcon, label: 'Next.js' },
  { icon: MemoryRoundedIcon, label: 'Node.js' },
  { icon: SchemaRoundedIcon, label: 'GraphQL' },
  { icon: ViewInArRoundedIcon, label: 'Docker' },
  { icon: AutorenewRoundedIcon, label: 'CI/CD' },
  { icon: AutoAwesomeRoundedIcon, label: 'AI Assisted Development' },
]

/**
 * Renders a 5-star row where the filled star count reflects `percent`
 * (100% -> 5 filled, 80% -> 4 filled, etc.).
 */
function StarRating({ percent, color }) {
  const filled = Math.round(percent / 20)
  return (
    <Stack direction="row" sx={{ gap: 0.25 }}>
      {Array.from({ length: 5 }).map((_, index) =>
        index < filled ? (
          <StarRoundedIcon key={index} sx={{ color, fontSize: 20 }} />
        ) : (
          <StarBorderRoundedIcon key={index} sx={{ color: 'text.disabled', fontSize: 20 }} />
        )
      )}
    </Stack>
  )
}

/**
 * Premium, interactive Skills page: six glassmorphism category cards with
 * gradient borders, floating icons, individually-animated technology
 * badges, and a fill-on-scroll experience bar, plus a "Currently Exploring"
 * showcase below.
 */
export function Skills() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const prefersReducedMotion = usePrefersReducedMotion()

  const seo = SEO_ROUTES['/skills']

  return (
    <PageTransition>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogTitle={seo.ogTitle}
        ogDesc={seo.ogDesc}
        schema={buildBreadcrumbSchema('/skills')}
      />
      <Box component="section" sx={{ position: 'relative', overflow: 'hidden' }}>
        <GradientBackground />
        <SectionContainer sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={fadeInUp}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Technical Skills
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: 500, lineHeight: 1.7, maxWidth: 760, mb: { xs: 6, md: 8 } }}
              >
                Technologies, frameworks, tools, and platforms I use to build scalable,
                production-ready web and mobile applications.
              </Typography>
            </motion.div>

            <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
              {SKILL_CATEGORIES.map((category) => {
                const CategoryIcon = category.icon
                const percent = LEVEL_PERCENT[category.level]

                return (
                  <Grid key={category.title} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                      <motion.div
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : {
                                y: -8,
                                boxShadow: `0 24px 48px ${alpha(category.accent, 0.32)}`,
                              }
                        }
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        style={{ height: '100%', borderRadius: 24 }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            borderRadius: '24px',
                            p: '1.5px',
                            background: `linear-gradient(135deg, ${alpha(category.accent, 0.7)}, ${alpha(category.accent, 0.05)})`,
                          }}
                        >
                          <GlassCard
                            hoverLift={false}
                            sx={{
                              height: '100%',
                              borderRadius: '24px',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <Box
                              component={motion.div}
                              animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
                              transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                                background: `linear-gradient(135deg, ${alpha(category.accent, isDark ? 0.35 : 0.18)}, ${alpha(category.accent, isDark ? 0.18 : 0.08)})`,
                              }}
                            >
                              <CategoryIcon sx={{ color: category.accent, fontSize: 32 }} />
                            </Box>

                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                              {category.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ lineHeight: 1.7, mb: 2.5 }}
                            >
                              {category.description}
                            </Typography>

                            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                              {category.skills.map((skill) => (
                                <motion.div
                                  key={skill}
                                  whileHover={
                                    prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }
                                  }
                                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                                >
                                  <Chip
                                    label={skill}
                                    size="small"
                                    sx={{
                                      fontWeight: 600,
                                      bgcolor: alpha(category.accent, isDark ? 0.16 : 0.08),
                                      color: 'text.primary',
                                      border: '1px solid',
                                      borderColor: alpha(category.accent, 0.3),
                                    }}
                                  />
                                </motion.div>
                              ))}
                            </Stack>

                            <Box sx={{ mt: 'auto' }}>
                              <Stack
                                direction="row"
                                sx={{
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  mb: 1,
                                }}
                              >
                                <StarRating percent={percent} color={category.accent} />
                                <Stack direction="row" sx={{ alignItems: 'baseline', gap: 0.75 }}>
                                  <AnimatedCounter
                                    value={percent}
                                    suffix="%"
                                    variant="caption"
                                    sx={{ fontWeight: 800, color: category.accent }}
                                  />
                                  <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 800, color: category.accent }}
                                  >
                                    {category.level}
                                  </Typography>
                                </Stack>
                              </Stack>
                              <Box
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: alpha(category.accent, isDark ? 0.18 : 0.12),
                                  overflow: 'hidden',
                                }}
                              >
                                <Box
                                  component={motion.div}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${percent}%` }}
                                  viewport={{ once: true, margin: '-50px' }}
                                  transition={{ duration: 1.2, ease: 'easeOut' }}
                                  sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    background: `linear-gradient(90deg, ${category.accent}, ${alpha(category.accent, 0.6)})`,
                                  }}
                                />
                              </Box>
                            </Box>
                          </GlassCard>
                        </Box>
                      </motion.div>
                    </motion.div>
                  </Grid>
                )
              })}
            </Grid>

            {/* Currently Exploring */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ mt: { xs: 8, md: 10 } }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
                  Currently Exploring
                </Typography>
                <Grid container spacing={2.5}>
                  {EXPLORING.map((item) => {
                    const ExploreIcon = item.icon
                    return (
                      <Grid key={item.label} size={{ xs: 6, sm: 4, md: 2 }}>
                        <motion.div
                          whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                          style={{ height: '100%' }}
                        >
                          <GlassCard
                            hoverLift={false}
                            sx={{
                              height: '100%',
                              textAlign: 'center',
                              p: { xs: 2, md: 2.5 },
                            }}
                          >
                            <ExploreIcon sx={{ color: 'primary.main', fontSize: 30, mb: 1 }} />
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 700, mb: 1, lineHeight: 1.3 }}
                            >
                              {item.label}
                            </Typography>
                            <Chip
                              label="Exploring"
                              size="small"
                              variant="outlined"
                              color="primary"
                              sx={{ fontWeight: 700 }}
                            />
                          </GlassCard>
                        </motion.div>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </motion.div>
          </motion.div>
        </SectionContainer>
      </Box>
    </PageTransition>
  )
}

export default Skills
