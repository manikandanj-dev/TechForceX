import { memo } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import TimerIcon from '@mui/icons-material/Timer'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { motion } from 'framer-motion'
import { alpha, useTheme } from '@mui/material/styles'
import { GlassCard } from '@components/GlassCard'
import { formatDuration } from '@utils/helpers'
import { useMemoryGame } from './useMemoryGame'
import { MemoryCard } from './MemoryCard'

const StatBox = memo(function StatBox({ icon, label, value }) {
  return (
    <Box sx={{ textAlign: 'center', minWidth: 84 }}>
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', justifyContent: 'center' }}>
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </Stack>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  )
})

/**
 * Memory Match mini game: flip cards to find matching pairs, tracked
 * against a move counter and timer, with persisted best scores and
 * generated sound effects.
 */
export function MemoryGame() {
  const theme = useTheme()
  const {
    difficulty,
    difficulties,
    columns,
    cards,
    moves,
    matchedPairs,
    totalPairs,
    seconds,
    status,
    isChecking,
    isNewBest,
    soundEnabled,
    bestScore,
    handleCardClick,
    restart,
    setDifficulty,
    toggleSound,
  } = useMemoryGame('medium')

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between', mb: 3 }}
      >
        <ToggleButtonGroup
          value={difficulty}
          exclusive
          size="small"
          onChange={(_event, value) => value && setDifficulty(value)}
        >
          {Object.entries(difficulties).map(([key, config]) => (
            <ToggleButton key={key} value={key}>
              {config.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Tooltip title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}>
            <IconButton onClick={toggleSound} size="small">
              {soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
          </Tooltip>
          <Button
            startIcon={<RefreshIcon />}
            variant="outlined"
            size="small"
            onClick={() => restart()}
          >
            Restart
          </Button>
        </Stack>
      </Stack>

      <GlassCard hoverLift={false} sx={{ mb: 3, py: 2 }}>
        <Stack direction="row" spacing={{ xs: 2, sm: 4 }} sx={{ justifyContent: 'space-around' }}>
          <StatBox
            icon={<TouchAppIcon fontSize="small" color="primary" />}
            label="Moves"
            value={moves}
          />
          <StatBox
            icon={<TimerIcon fontSize="small" color="primary" />}
            label="Time"
            value={formatDuration(seconds)}
          />
          <StatBox
            icon={<EmojiEventsIcon fontSize="small" color="primary" />}
            label="Best"
            value={
              bestScore ? `${bestScore.moves} / ${formatDuration(bestScore.timeSeconds)}` : '—'
            }
          />
          <StatBox label="Pairs" value={`${matchedPairs}/${totalPairs}`} />
        </Stack>
      </GlassCard>

      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          {cards.map((card, index) => (
            <MemoryCard
              key={card.id}
              card={card}
              index={index}
              disabled={isChecking}
              onClick={handleCardClick}
            />
          ))}
        </Box>

        <Typography
          aria-live="polite"
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
          }}
        >
          {status === 'won'
            ? `You won in ${moves} moves and ${formatDuration(seconds)}${isNewBest ? '. New best score!' : '.'}`
            : `${matchedPairs} of ${totalPairs} pairs found.`}
        </Typography>

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            bgcolor: alpha(theme.palette.background.default, 0.85),
            backdropFilter: 'blur(6px)',
            opacity: status === 'won' ? 1 : 0,
            pointerEvents: status === 'won' ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          {status === 'won' && (
            <Box
              component={motion.div}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              sx={{ textAlign: 'center', p: 3 }}
            >
              <Typography variant="h4" sx={{ mb: 1 }}>
                🎉 You won!
              </Typography>
              {isNewBest && (
                <Typography
                  variant="subtitle1"
                  color="primary.main"
                  sx={{ mb: 1, fontWeight: 700 }}
                >
                  New Best Score!
                </Typography>
              )}
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {moves} moves · {formatDuration(seconds)}
              </Typography>
              <Button variant="contained" size="large" onClick={() => restart()}>
                Play Again
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default MemoryGame
