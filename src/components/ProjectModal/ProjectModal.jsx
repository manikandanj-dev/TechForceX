import { forwardRef } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import { motion } from 'framer-motion'

const Transition = forwardRef(function Transition(props, ref) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {props.children}
    </motion.div>
  )
})

/**
 * Full detail preview for a project, opened from a `ProjectCard`.
 * Lazily code-split from the main Projects page (only loaded on demand).
 */
export function ProjectModal({ project, open, onClose }) {
  if (!project) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{ transition: Transition }}
      fullWidth
      maxWidth="sm"
    >
      <IconButton
        onClick={onClose}
        aria-label="close preview"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'background.paper' },
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        component="img"
        src={project.image}
        alt={project.title}
        decoding="async"
        width={640}
        height={420}
        sx={{ width: '100%', maxHeight: 280, objectFit: 'cover' }}
      />

      <DialogContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
          <Chip label={project.category} size="small" color="primary" />
          {project.year && (
            <Typography variant="caption" color="text.secondary">
              {project.year}
            </Typography>
          )}
        </Stack>

        <Typography variant="h5" sx={{ mb: 1.5 }}>
          {project.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
          {project.description}
        </Typography>

        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 3 }}>
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          {project.demoUrl && (
            <Button
              variant="contained"
              startIcon={<LaunchIcon />}
              href={project.demoUrl}
              target="_blank"
              rel="noopener"
              fullWidth
            >
              Live Demo
            </Button>
          )}
          {project.repoUrl && (
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href={project.repoUrl}
              target="_blank"
              rel="noopener"
              fullWidth
            >
              Source Code
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal
