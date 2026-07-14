import { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded'
import { alpha, useTheme } from '@mui/material/styles'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { GlassCard } from '@components/GlassCard'
import { GradientBackground } from '@components/GradientBackground'
import { ImageGallery } from '@components/ImageGallery'
import { ProjectCard } from '@components/ProjectCard'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { PROJECTS } from '@utils/mockData'

const FEATURED_PROJECT_ID = 'epass24'

/** Display order requested for the redesigned hierarchy (featured first). */
const DISPLAY_ORDER = ['epass24', 'parkia-pay', 'logicvalley-website', 'kmtoll', 'mnps']
const ORDERED_PROJECTS = DISPLAY_ORDER.map((id) =>
  PROJECTS.find((project) => project.id === id)
).filter(Boolean)

const FILTERS = [
  'All',
  'React.js',
  'React Native',
  'Payments',
  'Enterprise',
  'Admin Portal',
  'Mobile',
  'Production',
  'API Integration',
]

function searchableText(project) {
  return `${project.title} ${project.description} ${project.category} ${project.tags.join(' ')}`.toLowerCase()
}

function matchesFilter(project, filter) {
  if (filter === 'All') return true
  const text = searchableText(project)
  return filter
    .toLowerCase()
    .split(' ')
    .every((word) => text.includes(word) || text.includes(word.replace(/s$/, '')))
}

/**
 * Full-width hero card for the single featured project: large split-layout
 * screenshot, summary, tech badges, quick facts, and CTA buttons. Built
 * specifically for the redesigned Projects hierarchy (not the reused
 * generic ProjectCard).
 */
function FeaturedProjectCard({ project }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const prefersReducedMotion = usePrefersReducedMotion()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const handleImageLoad = useCallback(() => setImageLoaded(true), [])
  const galleryImages = project.images?.length ? project.images : [project.image]

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Soft glow behind the featured card */}
      <Box
        aria-hidden
        component={motion.div}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          inset: '-8%',
          zIndex: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, isDark ? 0.32 : 0.22)}, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      <motion.div
        whileHover={
          prefersReducedMotion
            ? undefined
            : { y: -8, boxShadow: `0 32px 64px ${alpha(theme.palette.primary.main, 0.32)}` }
        }
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Box
          sx={{
            borderRadius: '24px',
            p: '1.5px',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.6)}, ${alpha(theme.palette.secondary.main, 0.45)})`,
          }}
        >
          <GlassCard
            hoverLift={false}
            sx={{
              p: 0,
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              minHeight: { xs: 'auto', md: 500 },
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
                width: { xs: '100%', md: '52%' },
                minHeight: { xs: 260, md: 'auto' },
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
                width={800}
                height={600}
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
              <Chip
                label="Featured Project"
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  fontWeight: 700,
                  color: '#fff',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
                <ZoomInRoundedIcon sx={{ color: '#fff', fontSize: 40 }} />
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: '100%', md: '48%' },
                p: { xs: 3, md: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: 1.2 }}
              >
                {project.category}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                {project.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
                {project.description}
              </Typography>

              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {project.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" sx={{ fontWeight: 600 }} />
                ))}
              </Stack>

              <Stack direction="row" sx={{ gap: 3, mb: 4, flexWrap: 'wrap' }}>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                  <CategoryRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {project.category}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                  <CalendarTodayRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
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
    </Box>
  )
}

/**
 * Premium enterprise-style Projects showcase: searchable/filterable toolbar,
 * a single full-width featured project, and a responsive 2-column grid for
 * the rest.
 */
export function Projects() {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return ORDERED_PROJECTS.filter((project) => {
      const matchesQuery = !query || searchableText(project).includes(query)
      return matchesFilter(project, selectedFilter) && matchesQuery
    })
  }, [searchQuery, selectedFilter])

  const featuredProject = filteredProjects.find((project) => project.id === FEATURED_PROJECT_ID)
  const gridProjects = filteredProjects.filter((project) => project.id !== FEATURED_PROJECT_ID)

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <PageTransition>
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

        <SectionContainer
          maxWidth={false}
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1400,
            mx: 'auto',
            py: { xs: 8, md: 15 },
          }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={fadeInUp}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Featured Projects
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: 500, lineHeight: 1.7, maxWidth: 820, mb: { xs: 6, md: 8 } }}
              >
                A collection of enterprise web and mobile applications I&apos;ve built using
                React.js, React Native, Material UI, REST APIs, Adyen Payments, and scalable
                frontend architecture.
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Stack spacing={2.5} sx={{ mb: { xs: 6, md: 8 } }}>
                <TextField
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search projects..."
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="disabled" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.25 }}>
                  {FILTERS.map((filter) => {
                    const isSelected = selectedFilter === filter
                    return (
                      <Chip
                        key={filter}
                        label={filter}
                        onClick={() => handleFilterChange(filter)}
                        variant={isSelected ? 'filled' : 'outlined'}
                        sx={{
                          fontWeight: 700,
                          ...(isSelected
                            ? {
                                color: '#fff',
                                border: 'none',
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              }
                            : { borderColor: 'divider' }),
                        }}
                      />
                    )
                  })}
                </Stack>
              </Stack>
            </motion.div>
          </motion.div>

          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${selectedFilter}-${searchQuery}`}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {featuredProject && (
                <motion.div variants={fadeInUp} style={{ marginBottom: 32 }}>
                  <FeaturedProjectCard project={featuredProject} />
                </motion.div>
              )}

              <Grid container spacing={4}>
                {gridProjects.map((project) => (
                  <Grid key={project.id} size={{ xs: 12, sm: 6 }}>
                    <ProjectCard project={project} />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <SearchOffIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No projects found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try a different search term or category.
                </Typography>
              </Box>
            </motion.div>
          )}
        </SectionContainer>
      </Box>
    </PageTransition>
  )
}

export default Projects
