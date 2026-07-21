import { motion } from 'framer-motion'
import { SEO } from '@components/SEO'
import { SEO_ROUTES } from '@/seo/seoConfig'
import { buildPersonSchema } from '@/seo/schemas/personSchema'
import { buildWebSiteSchema } from '@/seo/schemas/webSiteSchema'
import { buildOrganizationSchema } from '@/seo/schemas/organizationSchema'
import { buildFaqSchema } from '@/seo/schemas/faqSchema'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { alpha, useTheme } from '@mui/material/styles'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import SpeedIcon from '@mui/icons-material/Speed'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { GlassCard } from '@components/GlassCard'
import { AnimatedCounter } from '@components/AnimatedCounter'
import { MagneticButton } from '@components/MagneticButton'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { STATS, FEATURES } from '@utils/mockData'
import { PremiumHero } from './components/PremiumHero'

const FEATURE_ICONS = {
  AutoAwesome: AutoAwesomeIcon,
  Architecture: ArchitectureIcon,
  DesignServices: DesignServicesIcon,
  Speed: SpeedIcon,
}

/**
 * buildHomePageGraph()
 *
 * Combines four schema entities into a single JSON-LD @graph:
 *   1. Person       (Task 1) — who Manikandan J is
 *   2. WebSite      (Task 3) — the portfolio website identity
 *   3. Organization (Task 4) — the professional / freelance entity
 *   4. FAQPage      (Task 5) — Q&A pairs for Google FAQ Rich Results
 *
 * All four share one @context declared at @graph root level.
 * Cross-entity links use @id references — no data is repeated across nodes.
 * Produces exactly ONE <script type="application/ld+json"> on the homepage.
 *
 * @returns {Object} JSON-LD object with @context and @graph
 */
function buildHomePageGraph() {
  // Strip @context from individual nodes — @graph owns the single context.
  const { '@context': _c1, ...personNode } = buildPersonSchema()
  const { ...webSiteNode } = buildWebSiteSchema()      // already has no @context
  const { ...orgNode } = buildOrganizationSchema()     // already has no @context
  const { ...faqNode } = buildFaqSchema()              // already has no @context

  return {
    '@context': 'https://schema.org',
    '@graph': [personNode, webSiteNode, orgNode, faqNode],
  }
}

/**
 * Premium, animated landing page: hero with mouse parallax and a floating
 * gradient background, animated statistics, feature highlights in
 * glassmorphism cards, and a closing call-to-action.
 */
export function Home() {
  const theme = useTheme()

  const seo = SEO_ROUTES['/']

  return (
    <PageTransition>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogTitle={seo.ogTitle}
        ogDesc={seo.ogDesc}
        schema={buildHomePageGraph()}
      />
      <PremiumHero />

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
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              lineHeight: 1.7,
              mb: 6,
              textAlign: 'center',
              maxWidth: 640,
              mx: 'auto',
            }}
          >
            Practical strengths I bring to enterprise React.js and React Native delivery.
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
              Let&apos;s build reliable digital products
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Open to React.js, React Native, API integration, and payment-focused frontend work.
            </Typography>
            <MagneticButton
              component="a"
              href="mailto:manikandanj.dev@gmail.com"
              variant="contained"
              size="large"
            >
              Contact Me
            </MagneticButton>
          </GlassCard>
        </motion.div>
      </SectionContainer>
    </PageTransition>
  )
}

export default Home
