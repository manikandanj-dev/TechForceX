import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const palette = [
  '#0f9f8f',
  '#3d7eff',
  '#ec6f45',
  '#d89a12',
  '#7c5cff',
  '#16a34a',
  '#e11d48',
  '#0891b2',
]

export function LanguageStats({ isLoading, languages }) {
  return (
    <Paper sx={{ p: 3, height: '100%', border: 1, borderColor: 'divider' }}>
      <Stack spacing={2.2}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 850 }}>
            Language statistics
          </Typography>
          <Typography color="text.secondary">
            Aggregated from the top public repositories
          </Typography>
        </Box>

        {isLoading ? (
          [0, 1, 2, 3, 4].map((item) => <Skeleton key={item} variant="rounded" height={32} />)
        ) : languages.length ? (
          languages.map((item, index) => (
            <Box key={item.language}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.75 }}>
                <Typography sx={{ fontWeight: 750 }}>{item.language}</Typography>
                <Typography color="text.secondary">{item.percentage}%</Typography>
              </Stack>
              <Box
                sx={{ height: 12, borderRadius: 999, bgcolor: 'action.hover', overflow: 'hidden' }}
              >
                <Box
                  sx={{
                    width: `${item.percentage}%`,
                    height: 1,
                    bgcolor: palette[index % palette.length],
                    borderRadius: 999,
                  }}
                />
              </Box>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">
            No language data returned for the loaded repositories.
          </Typography>
        )}
      </Stack>
    </Paper>
  )
}

export default LanguageStats
