import { memo, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded'
import { alpha, useTheme } from '@mui/material/styles'
import { GlassCard } from '@components/GlassCard'
import { ImageGallery } from '@components/ImageGallery'
import { fadeInUp } from '@animations/variants'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

/**
 * Premium glassmorphism project preview card: gradient border, a
 * lazy-loaded cover image with a slow hover zoom, a gradient category
 * badge, a clamped summary, individually hover-animated technology chips,
 * and a quick-facts row (category + year). Clicking the image opens an
 * animated full-screen gallery. Wrapped in `memo` since it's rendered in a
 * list and its props are stable between re-renders of the parent grid.
 * @param {{ project: import('@types').Project }} props
 */
function ProjectCardComponent({ project }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const prefersReducedMotion = usePrefersReducedMotion()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const handleImageLoad = useCallback(() => setImageLoaded(true), [])
  const galleryImages = project.images?.length ? project.images : [project.image]

  return (
    <motion.div variants={fadeInUp} layout style={{ height: '100%' }}>
      <motion.div
        whileHover={
          prefersReducedMotion
            ? undefined
            : { y: -8, boxShadow: `0 24px 48px ${alpha(theme.palette.primary.main, 0.28)}` }
        }
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ height: '100%' }}
      >
        <Box
          sx={{
            height: '100%',
            borderRadius: '24px',
            p: '1.5px',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.55)}, ${alpha(theme.palette.secondary.main, 0.4)})`,
          }}
        >
          <GlassCard
            hoverLift={false}
            sx={{
              height: '100%',
              p: 0,
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'backdrop-filter 0.3s ease',
              '&:hover': {
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
              },
            }}
          >
            <Box
              component="button"
              type="button"
              onClick={() => setGalleryOpen(true)}
              aria-label={`View image gallery for ${project.title}`}
              sx={{
                position: 'relative',
                width: '100%',
                pt: '62.5%',
                overflow: 'hidden',
                p: 0,
                border: 0,
                cursor: 'pointer',
                display: 'block',
                '&:hover .gallery-hint': { opacity: 1 },
              }}
            >
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
                whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                className="gallery-hint"
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha('#000', 0.35),
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                }}
              >
                <ZoomInRoundedIcon sx={{ color: '#fff', fontSize: 34 }} />
              </Box>
              <Chip
                label={project.category}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  fontWeight: 700,
                  color: '#fff',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              />
            </Box>

            <Box
              sx={{
                p: { xs: 2.5, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                {project.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  lineHeight: 1.7,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {project.description}
              </Typography>

              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                {project.tags.slice(0, 3).map((tag) => (
                  <motion.div
                    key={tag}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <Chip
                      label={tag}
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

              <Stack
                direction="row"
                sx={{
                  gap: 2.5,
                  mt: 'auto',
                  pt: 1.5,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                  <CategoryRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {project.category}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                  <CalendarTodayRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {project.year}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </GlassCard>
        </Box>
      </motion.div>

      <ImageGallery
        open={galleryOpen}
        images={galleryImages}
        title={project.title}
        onClose={() => setGalleryOpen(false)}
      />
    </motion.div>
  )
}

export const ProjectCard = memo(ProjectCardComponent)

export default ProjectCard
