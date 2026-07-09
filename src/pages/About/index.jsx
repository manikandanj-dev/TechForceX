import { motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { fadeInUp, staggerContainer } from '@animations/variants'

/**
 * About page introducing the developer.
 */
export function About() {
  return (
    <PageTransition>
      <SectionContainer>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" sx={{ mb: 4 }}>
              About Me
            </Typography>
          </motion.div>

          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div variants={fadeInUp}>
                <Avatar
                  sx={{ width: { xs: 160, md: 220 }, height: { xs: 160, md: 220 }, mx: 'auto' }}
                  alt="Profile photo"
                />
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <motion.div variants={fadeInUp}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  I&apos;m a frontend engineer passionate about building interactive, animated, and
                  accessible web applications. I enjoy turning complex requirements into clean,
                  maintainable React architecture.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Outside of coding, I explore motion design, generative art, and mentor aspiring
                  developers transitioning into frontend engineering.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </SectionContainer>
    </PageTransition>
  )
}

export default About
