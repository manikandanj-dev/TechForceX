import { useCallback, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { motion } from 'framer-motion'
import { scaleIn } from '@animations/variants'

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

/**
 * Classic two-player Tic-Tac-Toe mini game.
 */
export function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const winner = useMemo(() => calculateWinner(board), [board])
  const isDraw = !winner && board.every((cell) => cell !== null)
  const isOver = Boolean(winner) || isDraw

  const handleCellClick = useCallback(
    (index) => {
      if (board[index] || winner) return
      const nextBoard = [...board]
      nextBoard[index] = xIsNext ? 'X' : 'O'
      setBoard(nextBoard)
      setXIsNext(!xIsNext)
    },
    [board, winner, xIsNext]
  )

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }, [])

  let statusText = `Next player: ${xIsNext ? 'X' : 'O'}`
  if (winner) statusText = `Winner: ${winner}`
  else if (isDraw) statusText = "It's a draw!"

  return (
    <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tic-Tac-Toe
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }} aria-live="polite">
        {statusText}
      </Typography>

      <Box
        role="grid"
        aria-label="Tic-Tac-Toe board"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          width: { xs: 240, sm: 280 },
          mx: 'auto',
          mb: 3,
        }}
      >
        {board.map((cell, index) => {
          const isPlayable = !cell && !isOver
          return (
            <motion.div
              key={index}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              style={{ aspectRatio: '1 / 1' }}
            >
              <Box
                onClick={() => handleCellClick(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handleCellClick(index)
                  }
                }}
                role="button"
                tabIndex={isPlayable ? 0 : -1}
                aria-label={cell ? `Cell ${index + 1}: ${cell}` : `Cell ${index + 1}: empty`}
                aria-disabled={!isPlayable}
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  cursor: isPlayable ? 'pointer' : 'default',
                  bgcolor: 'background.paper',
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: 2,
                  },
                }}
              >
                {cell}
              </Box>
            </motion.div>
          )
        })}
      </Box>

      <Button variant="contained" onClick={reset}>
        Reset Game
      </Button>
    </Paper>
  )
}

export default TicTacToe
