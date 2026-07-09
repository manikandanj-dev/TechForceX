import SendRoundedIcon from '@mui/icons-material/SendRounded'
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

export function ChatComposer({ canSend, draft, isTyping, onChange, onSend }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSend()
    }
  }

  return (
    <Paper
      sx={{ m: { xs: 1.5, md: 2.5 }, p: 1.2, border: 1, borderColor: 'divider', borderRadius: 3 }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-end' }}>
        <TextField
          multiline
          maxRows={5}
          fullWidth
          value={draft}
          placeholder="Message Copilot Studio..."
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          variant="standard"
          slotProps={{ input: { disableUnderline: true } }}
        />
        <Tooltip title={isTyping ? 'Assistant is responding' : 'Send message'}>
          <span>
            <IconButton
              color="primary"
              disabled={!canSend}
              onClick={() => onSend()}
              aria-label="send message"
            >
              {isTyping ? <StopCircleOutlinedIcon /> : <SendRoundedIcon />}
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ px: 0.5 }}>
        Supports Markdown, lists, inline code, and fenced code blocks.
      </Typography>
    </Paper>
  )
}

export default ChatComposer
