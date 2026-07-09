import AddIcon from '@mui/icons-material/Add'
import ForumIcon from '@mui/icons-material/Forum'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { CHAT_THREADS } from '../data'

export function ChatSidebar({ activeThreadId, onSelectThread, sx }) {
  return (
    <Paper
      component="aside"
      sx={{
        width: { xs: '100%', md: 320 },
        minHeight: { md: 'calc(100vh - 146px)' },
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Stack spacing={2} sx={{ p: 2, height: '100%' }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <ForumIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Chats
            </Typography>
          </Stack>
          <Tooltip title="New chat">
            <IconButton color="primary" aria-label="new chat">
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <TextField
          size="small"
          placeholder="Search conversations"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Button variant="contained" startIcon={<AddIcon />} fullWidth>
          Start new chat
        </Button>

        <Divider />

        <List sx={{ p: 0, overflowY: 'auto' }}>
          {CHAT_THREADS.map((thread) => (
            <ListItemButton
              key={thread.id}
              selected={thread.id === activeThreadId}
              onClick={() => onSelectThread(thread.id)}
              sx={{ borderRadius: 2, mb: 1, alignItems: 'flex-start' }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 750 }} noWrap>
                    {thread.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {thread.updatedAt}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {thread.preview}
                </Typography>
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Paper>
  )
}

export default ChatSidebar
