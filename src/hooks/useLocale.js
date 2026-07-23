import { useLocaleStore } from '@store/localeStore'

/**
 * useLocale()
 *
 * Custom hook to consume the active locale and setLocale function.
 *
 * @returns {{ locale: 'en' | 'da', setLocale: (locale: 'en' | 'da') => void }}
 */
export function useLocale() {
  const locale = useLocaleStore((state) => state.locale)
  const setLocale = useLocaleStore((state) => state.setLocale)
  return { locale, setLocale }
}
