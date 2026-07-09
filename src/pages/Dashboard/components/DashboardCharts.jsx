import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { PERFORMANCE_DATA, REVENUE_DATA, USER_SEGMENTS } from '../data'

export function RevenueChart() {
  const max = Math.max(...REVENUE_DATA.map((point) => point.value))

  return (
    <Stack direction="row" spacing={1.2} sx={{ alignItems: 'end', minHeight: 260 }}>
      {REVENUE_DATA.map((point) => (
        <Stack key={point.label} spacing={1} sx={{ alignItems: 'center', flex: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ alignItems: 'end', height: 210, width: '100%' }}
          >
            <Box
              component={motion.div}
              initial={{ height: 0 }}
              animate={{ height: `${(point.value / max) * 100}%` }}
              transition={{ duration: 0.8 }}
              sx={{ flex: 1, borderRadius: '8px 8px 2px 2px', bgcolor: '#0f9f8f' }}
            />
            <Box
              component={motion.div}
              initial={{ height: 0 }}
              animate={{ height: `${(point.secondary / max) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.08 }}
              sx={{ flex: 1, borderRadius: '8px 8px 2px 2px', bgcolor: '#ec6f45' }}
            />
          </Stack>
          <Typography variant="caption" color="text.secondary">
            {point.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export function SegmentChart() {
  return (
    <Stack spacing={2.2} sx={{ minHeight: 260, justifyContent: 'center' }}>
      {USER_SEGMENTS.map((segment, index) => (
        <Box key={segment.label}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.75 }}>
            <Typography sx={{ fontWeight: 700 }}>{segment.label}</Typography>
            <Typography color="text.secondary">{segment.value}K</Typography>
          </Stack>
          <Box sx={{ height: 12, borderRadius: 999, bgcolor: 'action.hover', overflow: 'hidden' }}>
            <Box
              component={motion.div}
              initial={{ width: 0 }}
              animate={{ width: `${segment.value}%` }}
              transition={{ duration: 0.75, delay: index * 0.08 }}
              sx={{ height: 1, borderRadius: 999, bgcolor: segment.color }}
            />
          </Box>
        </Box>
      ))}
    </Stack>
  )
}

export function PerformanceChart() {
  return (
    <Grid container spacing={2} sx={{ minHeight: 260, alignItems: 'center' }}>
      {PERFORMANCE_DATA.map((metric, index) => (
        <Grid key={metric.label} size={{ xs: 6 }}>
          <Box
            component={motion.div}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <Box
              sx={{
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: `conic-gradient(#3d7eff ${metric.value * 3.6}deg, rgba(125,125,125,0.18) 0deg)`,
              }}
            >
              <Box
                sx={{
                  width: '72%',
                  aspectRatio: '1 / 1',
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'background.paper',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {metric.value}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {metric.label}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
