import { motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { EXPERIENCE } from '@utils/mockData'

/**
 * Experience page rendering a vertical timeline of roles.
 */
export function Experience() {
  return (
    <PageTransition>
      <SectionContainer>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              Experience
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Enterprise product experience across React.js, React Native, payments, APIs, and
              responsive application delivery.
            </Typography>
          </motion.div>

          <Timeline position="right" sx={{ px: 0 }}>
            {EXPERIENCE.map((exp, index) => (
              <TimelineItem key={exp.id}>
                <TimelineOppositeContent sx={{ display: { xs: 'none', sm: 'block' }, flex: 0.3 }}>
                  <Typography color="text.secondary">{exp.period}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index < EXPERIENCE.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ pb: 4 }}>
                  <motion.div variants={fadeInUp}>
                    <Typography variant="h6">{exp.role}</Typography>
                    <Typography
                      variant="subtitle2"
                      color="primary.main"
                      sx={{ display: { xs: 'block', sm: 'none' }, mb: 0.5 }}
                    >
                      {exp.period}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      {exp.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.description}
                    </Typography>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </SectionContainer>
    </PageTransition>
  )
}

export default Experience
