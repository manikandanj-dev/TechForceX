import { memo } from 'react'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

/**
 * A single flippable memory card: shows a themed back pattern until
 * flipped, then reveals its emoji face. Matched cards get a subtle glow
 * and settle into a "solved" state. Wrapped in `memo` so unaffected cards
 * don't re-render when only one or two other cards change each turn.
 * @param {{
 *   card: import('./useMemoryGame').MemoryCardState,
 *   onClick: (index: number) => void,
 *   index: number,
 *   disabled: boolean,
 * }} props
 */
function MemoryCardComponent({ card, onClick, index, disabled }) {
  const theme = useTheme()
  const isRevealed = card.isFlipped || card.isMatched
  const isInteractive = !isRevealed && !disabled

  const handleActivate = () => {
    if (isInteractive) onClick(index)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleActivate()
    }
  }

  const label = card.isMatched
    ? `Card matched: ${card.icon}`
    : card.isFlipped
      ? `Card revealed: ${card.icon}`
      : 'Hidden card'

  return (
    <Box sx={{ perspective: 800, width: '100%', aspectRatio: '1 / 1' }}>
      <Box
        component={motion.div}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={isInteractive ? 0 : -1}
        aria-label={label}
        aria-disabled={!isInteractive}
        aria-pressed={isRevealed}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        whileHover={isInteractive ? { scale: 1.04 } : undefined}
        whileTap={isInteractive ? { scale: 0.96 } : undefined}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          cursor: isInteractive ? 'pointer' : 'default',
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
        }}
      >
        {/* Back face (hidden state) */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2.5,
            backfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
          }}
        >
          <Box
            sx={{
              width: '40%',
              height: '40%',
              borderRadius: '50%',
              border: '2px solid',
              borderColor: alpha('#fff', 0.6),
            }}
          />
        </Box>

        {/* Front face (revealed icon) */}
        <Box
          component={motion.div}
          animate={
            card.isMatched
              ? { scale: [1, 1.08, 1], opacity: [1, 1, 0.85] }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.4 }}
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' },
            borderRadius: 2.5,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            bgcolor: card.isMatched ? alpha(theme.palette.success.main, 0.16) : 'background.paper',
            border: '1px solid',
            borderColor: card.isMatched ? alpha(theme.palette.success.main, 0.4) : 'divider',
          }}
        >
          <span aria-hidden="true">{card.icon}</span>
        </Box>
      </Box>
    </Box>
  )
}

/**
 * Memoized export: skips re-rendering cards whose `card` object reference
 * and `disabled` flag haven't changed, which is the common case since only
 * the two flipped cards' props change on any given turn.
 */
export const MemoryCard = memo(MemoryCardComponent)

export default MemoryCard
