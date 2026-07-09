import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { motion } from 'framer-motion'

export function ChartPanel({ title, subtitle, loading, variants, children }) {
  return (
    <Paper
      component={motion.section}
      variants={variants}
      sx={{ p: { xs: 2, md: 3 }, height: '100%', border: 1, borderColor: 'divider' }}
    >
      <Stack spacing={3} sx={{ height: '100%' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ justifyContent: 'space-between' }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>
            <Typography color="text.secondary">{subtitle}</Typography>
          </Box>
          <Button endIcon={<ArrowOutwardIcon />} size="small">
            View report
          </Button>
        </Stack>
        {loading ? <Skeleton variant="rounded" height={260} /> : children}
      </Stack>
    </Paper>
  )
}

export default ChartPanel
