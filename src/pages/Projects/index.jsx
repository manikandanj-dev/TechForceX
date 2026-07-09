import { lazy, Suspense, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Pagination from '@mui/material/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { ProjectCard } from '@components/ProjectCard'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { PROJECTS, PROJECT_CATEGORIES } from '@utils/mockData'

const ProjectModal = lazy(() => import('@components/ProjectModal'))

const PAGE_SIZE = 6
const ALL_CATEGORIES = ['All', ...PROJECT_CATEGORIES]

/**
 * Projects showcase: searchable, filterable, paginated grid of project
 * cards with a lazily-loaded modal preview.
 */
export function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return PROJECTS.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory

      const matchesQuery =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query))

      return matchesCategory && matchesQuery
    })
  }, [searchQuery, selectedCategory])

  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE))
  const paginatedProjects = filteredProjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setPage(1)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setPage(1)
  }

  const handlePageChange = (_event, value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageTransition>
      <SectionContainer>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              Projects
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              A selection of things I&apos;ve built.
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Stack spacing={2.5} sx={{ mb: 5 }}>
              <TextField
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search projects by name, tag, or description…"
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

              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {ALL_CATEGORIES.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => handleCategoryChange(category)}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    variant={selectedCategory === category ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 600 }}
                  />
                ))}
              </Stack>
            </Stack>
          </motion.div>
        </motion.div>

        {paginatedProjects.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchQuery}-${page}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Grid container spacing={3}>
                {paginatedProjects.map((project) => (
                  <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ProjectCard project={project} onSelect={setSelectedProject} />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
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

        {pageCount > 1 && (
          <Stack sx={{ alignItems: 'center', mt: 6 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Stack>
        )}
      </SectionContainer>

      <Suspense fallback={null}>
        <ProjectModal
          project={selectedProject}
          open={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      </Suspense>
    </PageTransition>
  )
}

export default Projects
