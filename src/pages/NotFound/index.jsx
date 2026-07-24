import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { fadeInUp } from '@animations/variants'
import { SEO } from '@components/SEO'
import { getLocaleSeo } from '@/seo/seoLocales'
import { useLocale } from '@hooks/useLocale'

/**
 * Fallback page rendered for unmatched routes.
 */
export function NotFound() {
  const { locale } = useLocale()
  const seo = getLocaleSeo(locale, '/404')

  return (
    <PageTransition>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        noIndex={seo.noIndex}
        lang={locale}
      />
      <SectionContainer sx={{ textAlign: 'center', py: { xs: 12, md: 18 } }}>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Typography variant="h1" sx={{ mb: 2 }}>
            404
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </Typography>
          <Button component={RouterLink} to="/" variant="contained" size="large">
            Back to Home
          </Button>
        </motion.div>
      </SectionContainer>
    </PageTransition>
  )
}

export default NotFound
