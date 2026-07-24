import { useState, useMemo } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { queryClient } from '@services/queryClient'
import { getTheme } from '@theme'
import { useThemeMode } from '@hooks/useThemeMode'
import { useSmoothScroll } from '@hooks/useSmoothScroll'
import { AppRoutes } from '@routes'
import { LoadingScreen } from '@components/LoadingScreen'

/**
 * Root application component: wires up React Query, the MUI theme
 * (driven by the Zustand theme store), smooth scrolling, an initial
 * loading screen, and the router.
 */
function App() {
  const { mode } = useThemeMode()
  const theme = useMemo(() => getTheme(mode), [mode])
  const [isLoading, setIsLoading] = useState(true)

  useSmoothScroll()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnimatePresence>
          {isLoading && <LoadingScreen key="loading" onFinished={() => setIsLoading(false)} />}
        </AnimatePresence>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
