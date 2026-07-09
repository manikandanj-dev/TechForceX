import { useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { motion } from 'framer-motion'
import { scaleIn } from '@animations/variants'

const STATUS = {
  IDLE: 'idle',
  WAITING: 'waiting',
  READY: 'ready',
  TOO_SOON: 'too-soon',
  RESULT: 'result',
}

/**
 * Simple reaction-time mini game: click as soon as the box turns green.
 */
export function ReactionGame() {
  const [status, setStatus] = useState(STATUS.IDLE)
  const [reactionTime, setReactionTime] = useState(null)
  const timeoutRef = useRef(null)
  const startTimeRef = useRef(0)

  const start = useCallback(() => {
    setStatus(STATUS.WAITING)
    setReactionTime(null)
    const delay = 1000 + Math.random() * 2000
    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = performance.now()
      setStatus(STATUS.READY)
    }, delay)
  }, [])

  const handleClick = () => {
    if (status === STATUS.WAITING) {
      clearTimeout(timeoutRef.current)
      setStatus(STATUS.TOO_SOON)
      return
    }
    if (status === STATUS.READY) {
      const elapsed = Math.round(performance.now() - startTimeRef.current)
      setReactionTime(elapsed)
      setStatus(STATUS.RESULT)
    }
  }

  const colors = {
    [STATUS.IDLE]: 'grey.700',
    [STATUS.WAITING]: 'error.main',
    [STATUS.READY]: 'success.main',
    [STATUS.TOO_SOON]: 'warning.main',
    [STATUS.RESULT]: 'primary.main',
  }

  const messages = {
    [STATUS.IDLE]: 'Press Start, then click the box when it turns green.',
    [STATUS.WAITING]: 'Wait for green…',
    [STATUS.READY]: 'Click now!',
    [STATUS.TOO_SOON]: 'Too soon! Try again.',
    [STATUS.RESULT]: `Your reaction time: ${reactionTime} ms`,
  }

  return (
    <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reaction Speed Test
      </Typography>

      <motion.div variants={scaleIn} initial="hidden" animate="visible">
        <Box
          onClick={handleClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleClick()
            }
          }}
          role="button"
          tabIndex={0}
          aria-live="polite"
          sx={{
            height: 180,
            borderRadius: 3,
            bgcolor: colors[status],
            color: 'common.white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: status === STATUS.IDLE ? 'default' : 'pointer',
            userSelect: 'none',
            transition: 'background-color 0.2s ease',
            mb: 3,
            px: 2,
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'common.white',
              outlineOffset: 2,
            },
          }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            {messages[status]}
          </Typography>
        </Box>
      </motion.div>

      <Button variant="contained" onClick={start}>
        {status === STATUS.IDLE ? 'Start' : 'Restart'}
      </Button>
    </Paper>
  )
}

export default ReactionGame
