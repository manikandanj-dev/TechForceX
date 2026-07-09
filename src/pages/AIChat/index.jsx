import { useState } from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { ThemeToggleButton } from '@components/ThemeToggleButton'
import { ChatComposer } from './components/ChatComposer'
import { ChatSidebar } from './components/ChatSidebar'
import { MessageList } from './components/MessageList'
import { SUGGESTED_PROMPTS } from './data'
import { useChatSession } from './hooks/useChatSession'

export default function AIChat() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [activeThreadId, setActiveThreadId] = useState('product-launch')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { bottomRef, canSend, draft, isTyping, messages, sendMessage, setDraft, stats } =
    useChatSession()

  const sidebar = (
    <ChatSidebar
      activeThreadId={activeThreadId}
      onSelectThread={(threadId) => {
        setActiveThreadId(threadId)
        setDrawerOpen(false)
      }}
    />
  )

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      sx={{
        minHeight: '100%',
        px: { xs: 1.5, md: 3 },
        py: { xs: 2, md: 3 },
        background:
          'linear-gradient(135deg, rgba(15, 159, 143, 0.10), transparent 32%), radial-gradient(circle at 92% 8%, rgba(236,111,69,0.13), transparent 24%)',
      }}
    >
      <Stack spacing={2.5} sx={{ maxWidth: 1500, mx: 'auto' }}>
        <Paper sx={{ p: { xs: 2, md: 2.5 }, border: 1, borderColor: 'divider' }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
          >
            <Stack direction="row" spacing={1.4} sx={{ alignItems: 'center' }}>
              {!isDesktop && (
                <IconButton aria-label="open chat history" onClick={() => setDrawerOpen(true)}>
                  <MenuOpenIcon />
                </IconButton>
              )}
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}
              >
                <AutoAwesomeIcon />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  Copilot Studio
                </Typography>
                <Typography color="text.secondary">
                  A focused AI chat workspace with Markdown and code rendering.
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              {stats.map((stat) => (
                <Chip key={stat.label} label={`${stat.label}: ${stat.value}`} variant="outlined" />
              ))}
              <ThemeToggleButton />
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={2.5}>
          {isDesktop && <Grid size={{ md: 4, lg: 3 }}>{sidebar}</Grid>}
          <Grid size={{ xs: 12, md: 8, lg: 9 }}>
            <Paper
              sx={{
                minHeight: { xs: 'calc(100vh - 210px)', md: 'calc(100vh - 146px)' },
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                borderColor: 'divider',
                overflow: 'hidden',
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{ p: 2, borderBottom: 1, borderColor: 'divider', flexWrap: 'wrap' }}
              >
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <Chip
                    key={prompt}
                    label={prompt}
                    onClick={() => sendMessage(prompt)}
                    disabled={isTyping}
                  />
                ))}
              </Stack>
              <MessageList bottomRef={bottomRef} isTyping={isTyping} messages={messages} />
              <ChatComposer
                canSend={canSend}
                draft={draft}
                isTyping={isTyping}
                onChange={setDraft}
                onSend={sendMessage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Stack>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 320, p: 1 }}>{sidebar}</Box>
      </Drawer>
    </Box>
  )
}
