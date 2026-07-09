import { create } from 'zustand'

/**
 * @typedef {Object} UiStoreState
 * @property {boolean} isDrawerOpen
 * @property {() => void} openDrawer
 * @property {() => void} closeDrawer
 * @property {() => void} toggleDrawer
 */

/**
 * Global store for UI state such as the mobile navigation drawer.
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<UiStoreState>>}
 */
export const useUiStore = create((set) => ({
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}))
