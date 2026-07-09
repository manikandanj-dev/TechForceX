import { motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import { Link as RouterLink } from 'react-router-dom'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { BLOG_POSTS } from '@utils/mockData'
import { formatDate } from '@utils/helpers'

/**
 * Blog listing page.
 */
export function Blog() {
  return (
    <PageTransition>
      <SectionContainer>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              Blog
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
              Notes on scalable frontend engineering, React Native delivery, API integration, and
              production application quality.
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {BLOG_POSTS.map((post) => (
              <Grid key={post.id} size={{ xs: 12, md: 6 }}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardActionArea component={RouterLink} to="/blog" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="overline" color="primary.main">
                          {formatDate(post.date)}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {post.excerpt}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </SectionContainer>
    </PageTransition>
  )
}

export default Blog
