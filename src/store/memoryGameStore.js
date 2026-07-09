import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * @typedef {Object} MemoryBestScore
 * @property {number} moves
 * @property {number} timeSeconds
 */

/**
 * @typedef {Object} MemoryGameStoreState
 * @property {boolean} soundEnabled
 * @property {{ easy: MemoryBestScore|null, medium: MemoryBestScore|null, hard: MemoryBestScore|null }} bestScores
 * @property {() => void} toggleSound
 * @property {(difficulty: 'easy'|'medium'|'hard', result: MemoryBestScore) => boolean} recordScore
 */

/**
 * Persisted best scores (fewest moves + fastest time) per difficulty for
 * the Memory Match mini game, plus a global sound-effects toggle.
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<MemoryGameStoreState>>}
 */
export const useMemoryGameStore = create(
  persist(
    (set, get) => ({
      soundEnabled: true,
      bestScores: {
        easy: null,
        medium: null,
        hard: null,
      },
      toggleSound: () => set({ soundEnabled: !get().soundEnabled }),
      /**
       * Records a completed round's result, keeping it only if it beats
       * the existing best (fewer moves, or equal moves but faster time).
       * @param {'easy'|'medium'|'hard'} difficulty
       * @param {{ moves: number, timeSeconds: number }} result
       * @returns {boolean} whether this was a new best score
       */
      recordScore: (difficulty, result) => {
        const current = get().bestScores[difficulty]
        const isBetter =
          !current ||
          result.moves < current.moves ||
          (result.moves === current.moves && result.timeSeconds < current.timeSeconds)

        if (isBetter) {
          set({
            bestScores: { ...get().bestScores, [difficulty]: result },
          })
        }
        return isBetter
      },
    }),
    { name: 'memory-game-storage' }
  )
)
