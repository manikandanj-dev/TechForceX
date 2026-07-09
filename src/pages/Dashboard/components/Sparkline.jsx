import Box from '@mui/material/Box'

export function Sparkline({ values, color }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 120
      const y = 42 - ((value - min) / (max - min || 1)) * 32
      return `${x},${y}`
    })
    .join(' ')

  return (
    <Box component="svg" viewBox="0 0 120 48" sx={{ width: 120, height: 48 }} aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </Box>
  )
}

export default Sparkline
