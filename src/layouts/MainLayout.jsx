import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ScrollProgressBar } from '@components/ScrollProgressBar'
import { BackToTop } from '@components/BackToTop'
import { CustomCursor } from '@components/CustomCursor'
import { Toast } from '@components/Toast'

/**
 * Application shell: sticky navbar, animated route outlet, and footer.
 * Used as the root layout for every page via React Router. Moves focus to
 * the main content landmark on every route change so screen reader and
 * keyboard users get the same "new page" cue sighted users get visually.
 * Also mounts the site-wide scroll progress bar, back-to-top button,
 * custom cursor (desktop only), and toast notifications.
 */
export function MainLayout() {
  const location = useLocation()
  const mainRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    mainRef.current?.focus()
  }, [location.pathname])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollProgressBar />
      <CustomCursor />
      <Toast />
      <Link
        href="#main-content"
        sx={{
          position: 'absolute',
          left: 8,
          top: -48,
          zIndex: (theme) => theme.zIndex.tooltip + 1,
          bgcolor: 'background.paper',
          px: 2,
          py: 1,
          borderRadius: 1,
          transition: 'top 0.2s ease',
          '&:focus-visible': { top: 8 },
        }}
      >
        Skip to main content
      </Link>

      <Navbar />
      <Box
        id="main-content"
        component="main"
        ref={mainRef}
        tabIndex={-1}
        sx={{ flexGrow: 1, outline: 'none' }}
      >
        <AnimatePresence mode="wait">
          <Box key={location.pathname} data-nav-section={location.pathname}>
            <Outlet />
          </Box>
        </AnimatePresence>
      </Box>
      <Footer />
      <BackToTop />
    </Box>
  )
}

export default MainLayout
