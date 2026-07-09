import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

/**
 * Centered loading spinner used as a Suspense fallback.
 */
export function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loader
