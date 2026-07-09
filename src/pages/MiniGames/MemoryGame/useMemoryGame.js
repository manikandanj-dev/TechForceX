import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMemoryGameStore } from '@store/memoryGameStore'
import { useSoundEffects } from '@hooks/useSoundEffects'
import { CARD_ICONS, DIFFICULTIES } from './constants'

/** Fisher-Yates shuffle (non-mutating). */
function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function createDeck(difficulty) {
  const { pairs } = DIFFICULTIES[difficulty]
  const icons = shuffle(CARD_ICONS).slice(0, pairs)
  return shuffle([...icons, ...icons]).map((icon, index) => ({
    id: `${difficulty}-${index}-${icon}`,
    icon,
    isFlipped: false,
    isMatched: false,
  }))
}

/**
 * @typedef {Object} MemoryCardState
 * @property {string} id
 * @property {string} icon
 * @property {boolean} isFlipped
 * @property {boolean} isMatched
 */

/**
 * @typedef {Object} MemoryGameApi
 * @property {'easy'|'medium'|'hard'} difficulty
 * @property {typeof DIFFICULTIES} difficulties
 * @property {number} columns
 * @property {MemoryCardState[]} cards
 * @property {number} moves
 * @property {number} matchedPairs
 * @property {number} totalPairs
 * @property {number} seconds
 * @property {'idle'|'playing'|'won'} status
 * @property {boolean} isChecking
 * @property {boolean} isNewBest
 * @property {boolean} soundEnabled
 * @property {{ moves: number, timeSeconds: number } | null} bestScore
 * @property {(index: number) => void} handleCardClick
 * @property {(nextDifficulty?: 'easy'|'medium'|'hard') => void} restart
 * @property {(nextDifficulty: 'easy'|'medium'|'hard') => void} setDifficulty
 * @property {() => void} toggleSound
 */

/**
 * Encapsulates all Memory Match game logic (deck creation/shuffling, flip
 * comparison, timer, moves, win detection, best-score persistence, and
 * sound effects) so the presentational components stay purely visual.
 * @param {'easy'|'medium'|'hard'} [initialDifficulty]
 * @returns {MemoryGameApi}
 */
export function useMemoryGame(initialDifficulty = 'medium') {
  const soundEnabled = useMemoryGameStore((state) => state.soundEnabled)
  const toggleSound = useMemoryGameStore((state) => state.toggleSound)
  const bestScores = useMemoryGameStore((state) => state.bestScores)
  const recordScore = useMemoryGameStore((state) => state.recordScore)
  const { playFlip, playMatch, playMismatch, playWin } = useSoundEffects(soundEnabled)

  const [difficulty, setDifficulty] = useState(initialDifficulty)
  const [cards, setCards] = useState(() => createDeck(initialDifficulty))
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [status, setStatus] = useState('idle') // idle | playing | won
  const [isChecking, setIsChecking] = useState(false)
  const [isNewBest, setIsNewBest] = useState(false)
  const pendingRef = useRef([])
  const cardsRef = useRef(cards)
  const secondsRef = useRef(0)
  const movesRef = useRef(0)
  const statusRef = useRef('idle')
  const lockRef = useRef(false)

  useEffect(() => {
    cardsRef.current = cards
  }, [cards])

  useEffect(() => {
    secondsRef.current = seconds
  }, [seconds])

  useEffect(() => {
    movesRef.current = moves
  }, [moves])

  useEffect(() => {
    statusRef.current = status
  }, [status])

  const totalPairs = DIFFICULTIES[difficulty].pairs
  const columns = DIFFICULTIES[difficulty].columns
  const matchedPairs = useMemo(() => cards.filter((c) => c.isMatched).length / 2, [cards])

  // Timer: ticks once per second while a round is in progress.
  useEffect(() => {
    if (status !== 'playing') return undefined
    const interval = setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => clearInterval(interval)
  }, [status])

  const restart = useCallback(
    (nextDifficulty = difficulty) => {
      pendingRef.current = []
      lockRef.current = false
      setDifficulty(nextDifficulty)
      setCards(createDeck(nextDifficulty))
      setMoves(0)
      setSeconds(0)
      setStatus('idle')
      setIsChecking(false)
      setIsNewBest(false)
    },
    [difficulty]
  )

  // Intentionally reads mutable state via refs (cardsRef/movesRef/statusRef)
  // rather than closing over `cards`/`moves`/`status` directly. This keeps
  // the function's identity stable across every card flip within a round,
  // so memoized <MemoryCard> instances only re-render the two cards that
  // actually changed instead of the whole board.
  const handleCardClick = useCallback(
    (index) => {
      if (lockRef.current || statusRef.current === 'won') return
      const card = cardsRef.current[index]
      if (!card || card.isFlipped || card.isMatched) return

      playFlip()
      if (statusRef.current === 'idle') setStatus('playing')

      setCards((prev) => prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c)))
      pendingRef.current = [...pendingRef.current, index]

      if (pendingRef.current.length === 2) {
        const [firstIndex, secondIndex] = pendingRef.current
        const finalMoves = movesRef.current + 1
        lockRef.current = true
        setIsChecking(true)
        setMoves(finalMoves)

        setTimeout(() => {
          const current = cardsRef.current
          const isMatch = current[firstIndex].icon === current[secondIndex].icon
          const nextCards = current.map((c, i) => {
            if (i !== firstIndex && i !== secondIndex) return c
            return isMatch ? { ...c, isMatched: true } : { ...c, isFlipped: false }
          })
          setCards(nextCards)

          if (isMatch) {
            playMatch()
            const nextMatchedPairs = nextCards.filter((c) => c.isMatched).length / 2
            if (nextMatchedPairs === totalPairs) {
              setStatus('won')
              setIsNewBest(
                recordScore(difficulty, { moves: finalMoves, timeSeconds: secondsRef.current })
              )
              playWin()
            }
          } else {
            playMismatch()
          }

          pendingRef.current = []
          lockRef.current = false
          setIsChecking(false)
        }, 700)
      }
    },
    [totalPairs, difficulty, recordScore, playFlip, playMatch, playMismatch, playWin]
  )

  return {
    difficulty,
    difficulties: DIFFICULTIES,
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
    bestScore: bestScores[difficulty],
    handleCardClick,
    restart,
    setDifficulty: (nextDifficulty) => restart(nextDifficulty),
    toggleSound,
  }
}

export default useMemoryGame
