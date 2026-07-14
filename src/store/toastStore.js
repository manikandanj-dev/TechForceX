import { create } from 'zustand'

/**
 * @typedef {Object} ToastState
 * @property {{ key: number, message: string, severity: 'success'|'error'|'info'|'warning' } | null} toast
 * @property {(message: string, severity?: 'success'|'error'|'info'|'warning') => void} showToast
 * @property {() => void} clearToast
 */

/**
 * Global store for a single site-wide toast notification (copy-to-clipboard
 * confirmations, form submission results, etc). Kept as a lightweight
 * Zustand store — consistent with the rest of the app's global state — so
 * any component can trigger a toast without prop drilling or a context
 * provider.
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<ToastState>>}
 */
export const useToastStore = create((set) => ({
  toast: null,
  showToast: (message, severity = 'success') =>
    set({ toast: { key: Date.now(), message, severity } }),
  clearToast: () => set({ toast: null }),
}))

export default useToastStore
