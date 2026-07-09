import { memo, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { motion } from 'framer-motion'
import { GlassCard } from '@components/GlassCard'
import { fadeInUp } from '@animations/variants'

/**
 * A single project preview card: lazy-loaded cover image (with a skeleton
 * shown until it loads), tags, and a hover lift. Clicking the card opens
 * the project's modal preview via `onSelect`. Wrapped in `memo` since it's
 * rendered in a list and its props (`project`, `onSelect`) are stable
 * between re-renders of the parent grid.
 * @param {{ project: import('@types').Project, onSelect: (project: import('@types').Project) => void }} props
 */
function ProjectCardComponent({ project, onSelect }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const handleSelect = useCallback(() => onSelect(project), [onSelect, project])
  const handleImageLoad = useCallback(() => setImageLoaded(true), [])

  return (
    <motion.div variants={fadeInUp} layout style={{ height: '100%' }}>
      <GlassCard
        hoverLift
        onClick={handleSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') handleSelect()
        }}
        sx={{ p: 0, overflow: 'hidden', cursor: 'pointer', height: '100%' }}
      >
        <Box sx={{ position: 'relative', width: '100%', pt: '62.5%', overflow: 'hidden' }}>
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />
          )}
          <Box
            component={motion.img}
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width={640}
            height={400}
            onLoad={handleImageLoad}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 1.05 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.06 }}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Chip
            label={project.category}
            size="small"
            color="primary"
            sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 600 }}
          />
        </Box>

        <Box sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.description}
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {project.tags.slice(0, 3).map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>
        </Box>
      </GlassCard>
    </motion.div>
  )
}

export const ProjectCard = memo(ProjectCardComponent)

export default ProjectCard
