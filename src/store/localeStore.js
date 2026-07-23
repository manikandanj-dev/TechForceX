import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * @typedef {'en' | 'da'} Locale
 */

/**
 * @typedef {Object} LocaleStoreState
 * @property {Locale} locale   - Active locale: 'en' (English) or 'da' (Danish)
 * @property {(locale: Locale) => void} setLocale
 */

/**
 * Detects the browser's preferred language and maps it to a supported locale.
 * Falls back to 'en' for any language that is not Danish.
 *
 * @returns {Locale}
 */
function detectLocale() {
  const lang = typeof navigator !== 'undefined' ? navigator.language : 'en'
  return lang.startsWith('da') ? 'da' : 'en'
}

/**
 * Global store for the active locale.
 * Persisted to localStorage (key: 'locale-storage') — mirrors themeStore.js.
 *
 * Supported locales: 'en' (English), 'da' (Danish).
 *
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<LocaleStoreState>>}
 */
export const useLocaleStore = create(
  persist(
    (_set) => ({
      locale: detectLocale(),
      setLocale: (locale) => _set({ locale }),
    }),
    { name: 'locale-storage' }
  )
)
