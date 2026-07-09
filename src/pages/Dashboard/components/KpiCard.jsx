import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { Sparkline } from './Sparkline'

export function KpiCard({ metric, loading, variants }) {
  const Icon = metric.Icon

  return (
    <Paper
      component={motion.article}
      variants={variants}
      whileHover={{ y: -6 }}
      sx={{
        p: 2.5,
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `${metric.color}18`,
          clipPath: 'polygon(64% 0, 100% 0, 100% 58%, 80% 42%)',
        },
      }}
    >
      <Stack spacing={2} sx={{ position: 'relative' }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              color: metric.color,
              bgcolor: `${metric.color}1f`,
            }}
          >
            <Icon />
          </Box>
          {loading ? (
            <Skeleton width={70} />
          ) : (
            <Chip label={metric.delta} size="small" color="success" />
          )}
        </Stack>

        <Box>
          {loading ? (
            <>
              <Skeleton width="72%" height={30} />
              <Skeleton width="48%" />
            </>
          ) : (
            <>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                {metric.value}
              </Typography>
              <Typography color="text.secondary">{metric.label}</Typography>
            </>
          )}
        </Box>

        {loading ? (
          <Skeleton variant="rounded" height={48} />
        ) : (
          <Sparkline values={metric.sparkline} color={metric.color} />
        )}
      </Stack>
    </Paper>
  )
}

export default KpiCard
