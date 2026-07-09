/**
 * Configuration for the Memory Match mini game: difficulty presets and
 * the emoji set used as card faces (no external image assets needed).
 */

export const CARD_ICONS = [
  '🍎',
  '🍌',
  '🍇',
  '🍉',
  '🍒',
  '🍋',
  '🥝',
  '🍓',
  '🍑',
  '🍍',
  '🥥',
  '🍐',
  '🥑',
  '🍆',
  '🌽',
  '🍄',
  '🍕',
  '🍔',
]

export const DIFFICULTIES = {
  easy: { label: 'Easy', pairs: 6, columns: 4 },
  medium: { label: 'Medium', pairs: 8, columns: 4 },
  hard: { label: 'Hard', pairs: 12, columns: 6 },
}

export const DIFFICULTY_ORDER = ['easy', 'medium', 'hard']
