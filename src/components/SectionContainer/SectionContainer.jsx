import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

/**
 * Consistent responsive padding/max-width wrapper used by every page section.
 */
export function SectionContainer({ children, sx = {}, maxWidth = 'lg', ...rest }) {
  return (
    <Container maxWidth={maxWidth} {...rest}>
      <Box sx={{ py: { xs: 6, md: 10 }, ...sx }}>{children}</Box>
    </Container>
  )
}

export default SectionContainer
