import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import PersonIcon from '@mui/icons-material/Person'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { MarkdownMessage } from './MarkdownMessage'

export function ChatBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <Stack
      component={motion.article}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      direction="row"
      spacing={1.5}
      sx={{ justifyContent: isUser ? 'flex-end' : 'flex-start' }}
    >
      {!isUser && (
        <Avatar sx={{ bgcolor: 'primary.main', width: 34, height: 34 }}>
          <AutoAwesomeIcon fontSize="small" />
        </Avatar>
      )}
      <Box sx={{ maxWidth: { xs: '86%', md: '74%' } }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mb: 0.5, textAlign: isUser ? 'right' : 'left' }}
        >
          {isUser ? 'You' : 'Copilot Studio'}
        </Typography>
        <Paper
          sx={{
            p: 2,
            border: 1,
            borderColor: isUser ? 'primary.main' : 'divider',
            bgcolor: isUser ? 'primary.main' : 'background.paper',
            color: isUser ? 'primary.contrastText' : 'text.primary',
            borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          }}
        >
          <MarkdownMessage content={message.content} />
        </Paper>
      </Box>
      {isUser && (
        <Avatar sx={{ bgcolor: 'secondary.main', width: 34, height: 34 }}>
          <PersonIcon fontSize="small" />
        </Avatar>
      )}
    </Stack>
  )
}

export default ChatBubble
