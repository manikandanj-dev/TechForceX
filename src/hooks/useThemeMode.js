import { useThemeStore } from '@store/themeStore'

/**
 * Convenience hook exposing the current color mode and a toggle function.
 * @returns {{ mode: 'light' | 'dark', toggleMode: () => void }}
 */
export function useThemeMode() {
  const mode = useThemeStore((state) => state.mode)
  const toggleMode = useThemeStore((state) => state.toggleMode)
  return { mode, toggleMode }
}
