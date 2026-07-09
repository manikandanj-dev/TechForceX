import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * @typedef {Object} ThemeStoreState
 * @property {'light'|'dark'} mode
 * @property {() => void} toggleMode
 * @property {(mode: 'light'|'dark') => void} setMode
 */

/**
 * Global store for the color mode (light/dark) of the app.
 * Persisted to localStorage so the preference survives reloads.
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<ThemeStoreState>>}
 */
export const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: 'light',
      toggleMode: () => set({ mode: get().mode === 'light' ? 'dark' : 'light' }),
      setMode: (mode) => set({ mode }),
    }),
    { name: 'theme-storage' }
  )
)
