import { motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { SKILLS } from '@utils/mockData'

/**
 * Skills page showing a responsive grid of animated skill chips.
 */
export function Skills() {
  return (
    <PageTransition>
      <SectionContainer>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              Skills
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
              Frontend, state management, API, and delivery tools used across production React.js
              and React Native projects.
            </Typography>
          </motion.div>

          <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, bgcolor: 'background.paper' }}>
            <Grid container spacing={1.5}>
              {SKILLS.map((skill) => (
                <Grid key={skill}>
                  <motion.div variants={fadeInUp}>
                    <Chip label={skill} color="primary" variant="outlined" sx={{ px: 1 }} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>
      </SectionContainer>
    </PageTransition>
  )
}

export default Skills
