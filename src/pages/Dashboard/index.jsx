import { useEffect, useState } from 'react'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { ThemeToggleButton } from '@components/ThemeToggleButton'
import { ActivityTimeline } from './components/ActivityTimeline'
import { ChartPanel } from './components/ChartPanel'
import { PerformanceChart, RevenueChart, SegmentChart } from './components/DashboardCharts'
import { KpiCard } from './components/KpiCard'
import { DASHBOARD_ACTIONS, KPI_METRICS } from './data'

const pageVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 900)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <Box
      component={motion.div}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      sx={{
        minHeight: '100%',
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 },
        background:
          'radial-gradient(circle at 12% 16%, rgba(15, 159, 143, 0.16), transparent 28%), radial-gradient(circle at 88% 0%, rgba(236, 111, 69, 0.14), transparent 24%)',
      }}
    >
      <Stack spacing={3.5} sx={{ maxWidth: 1440, mx: 'auto' }}>
        <Paper
          component={motion.header}
          variants={itemVariants}
          sx={{ p: { xs: 2.5, md: 3.5 }, border: 1, borderColor: 'divider', overflow: 'hidden' }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2.5}
            sx={{ justifyContent: 'space-between' }}
          >
            <Stack spacing={1.4} sx={{ maxWidth: 760 }}>
              <Chip
                icon={<DashboardCustomizeIcon />}
                label="Executive analytics"
                sx={{ alignSelf: 'flex-start', fontWeight: 700 }}
              />
              <Typography variant="h3" sx={{ fontWeight: 900 }}>
                Premium growth dashboard
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: { md: '1.05rem' } }}>
                Revenue, customer momentum, and platform performance in one responsive command
                center.
              </Typography>
            </Stack>
            <Stack spacing={1.2} sx={{ alignItems: { xs: 'stretch', sm: 'flex-end' } }}>
              <Stack
                direction="row"
                spacing={1.2}
                sx={{
                  alignItems: 'center',
                  justifyContent: { xs: 'space-between', sm: 'flex-end' },
                }}
              >
                <ThemeToggleButton />
                <Button variant="contained" startIcon={<AutoGraphIcon />}>
                  Export snapshot
                </Button>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: 'wrap', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}
              >
                {DASHBOARD_ACTIONS.map((action) => {
                  const Icon = action.Icon
                  return (
                    <Chip
                      key={action.label}
                      icon={<Icon fontSize="small" />}
                      label={`${action.label}: ${action.value}`}
                      variant="outlined"
                    />
                  )
                })}
              </Stack>
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={2.5}>
          {KPI_METRICS.map((metric) => (
            <Grid key={metric.label} size={{ xs: 12, sm: 6, lg: 3 }}>
              <KpiCard metric={metric} loading={loading} variants={itemVariants} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <ChartPanel
              title="Revenue momentum"
              subtitle="Bookings and realized revenue"
              loading={loading}
              variants={itemVariants}
            >
              <RevenueChart />
            </ChartPanel>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <ChartPanel
              title="User segments"
              subtitle="Active users by plan"
              loading={loading}
              variants={itemVariants}
            >
              <SegmentChart />
            </ChartPanel>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <ChartPanel
              title="Performance"
              subtitle="Service health index"
              loading={loading}
              variants={itemVariants}
            >
              <PerformanceChart />
            </ChartPanel>
          </Grid>
        </Grid>

        <ActivityTimeline loading={loading} variants={itemVariants} />
      </Stack>
    </Box>
  )
}
