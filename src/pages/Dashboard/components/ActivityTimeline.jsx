import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import BoltIcon from '@mui/icons-material/Bolt'
import { motion } from 'framer-motion'
import { ACTIVITY_ITEMS } from '../data'

export function ActivityTimeline({ loading, variants }) {
  return (
    <Paper
      component={motion.section}
      variants={variants}
      sx={{ p: { xs: 2, md: 3 }, border: 1, borderColor: 'divider' }}
    >
      <Stack spacing={2}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Recent activity
            </Typography>
            <Typography color="text.secondary">Signals from the last 24 hours</Typography>
          </Box>
          <BoltIcon color="warning" />
        </Stack>

        {loading ? (
          <Stack spacing={1.5}>
            {[0, 1, 2, 3].map((item) => (
              <Skeleton key={item} variant="rounded" height={62} />
            ))}
          </Stack>
        ) : (
          <Timeline
            sx={{ m: 0, p: 0, [`& .MuiTimelineItem-root:before`]: { flex: 0, padding: 0 } }}
          >
            {ACTIVITY_ITEMS.map((activity, index) => (
              <TimelineItem key={activity.title}>
                <TimelineSeparator>
                  <TimelineDot color={activity.color} />
                  {index < ACTIVITY_ITEMS.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ pb: 2.5 }}>
                  <Typography sx={{ fontWeight: 750 }}>{activity.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.meta}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </Stack>
    </Paper>
  )
}

export default ActivityTimeline
