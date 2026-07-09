import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { keyframes } from '@mui/material/styles'

const pulse = keyframes`
  0%, 80%, 100% { transform: scale(0.72); opacity: 0.45; }
  40% { transform: scale(1); opacity: 1; }
`

export function TypingIndicator() {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <Avatar sx={{ bgcolor: 'primary.main', width: 34, height: 34 }}>
        <AutoAwesomeIcon fontSize="small" />
      </Avatar>
      <Paper
        sx={{
          px: 2,
          py: 1.4,
          borderRadius: '18px 18px 18px 4px',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" spacing={0.7} aria-label="assistant is typing">
          {[0, 1, 2].map((dot) => (
            <Box
              key={dot}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                animation: `${pulse} 1.2s ease-in-out ${dot * 0.16}s infinite`,
              }}
            />
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}

export default TypingIndicator
