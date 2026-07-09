/**
 * Small, generic helper functions used across the app.
 */

/**
 * Capitalizes the first letter of a string.
 * @param {string} value
 */
export function capitalize(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * Formats a date into a readable string, e.g. "Jul 9, 2026".
 * @param {string | number | Date} date
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Basic email format validation.
 * @param {string} email
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Formats a duration in seconds as `m:ss`, e.g. 75 -> "1:15".
 * @param {number} totalSeconds
 */
export function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
