import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' })

export function ContributionSummary({ isLoading, summary }) {
  return (
    <Grid container spacing={2}>
      {(isLoading ? [0, 1, 2, 3, 4] : summary).map((item, index) => (
        <Grid key={isLoading ? index : item.label} size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <Paper sx={{ p: 2.2, height: '100%', border: 1, borderColor: 'divider' }}>
            {isLoading ? (
              <Stack spacing={1}>
                <Skeleton height={32} width="70%" />
                <Skeleton />
              </Stack>
            ) : (
              <Stack spacing={0.6}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  {typeof item.value === 'number' ? numberFormatter.format(item.value) : item.value}
                </Typography>
                <Typography sx={{ fontWeight: 750 }}>{item.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.helper}
                </Typography>
              </Stack>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default ContributionSummary
