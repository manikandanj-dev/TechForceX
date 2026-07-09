import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { ChatBubble } from './ChatBubble'
import { TypingIndicator } from './TypingIndicator'

export function MessageList({ bottomRef, isTyping, messages }) {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, md: 3 }, py: 3 }}>
      <Stack spacing={2.5}>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <span ref={bottomRef} />
      </Stack>
    </Box>
  )
}

export default MessageList
