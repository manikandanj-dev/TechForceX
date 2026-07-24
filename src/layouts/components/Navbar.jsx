import { memo, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { alpha, useTheme } from '@mui/material/styles'
import { ThemeToggleButton } from '@components/ThemeToggleButton'
import { trackResumeDownload, trackSocialClick } from '@utils/analytics'
import { DRAWER_WIDTH, NAV_LINKS, SITE_NAME } from '@utils/constants'

const ACTIVE_GRADIENT = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'

function NavbarInner() {
  const theme = useTheme()
  const location = useLocation()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [prevPath, setPrevPath] = useState(location.pathname)
  const [activePath, setActivePath] = useState(location.pathname)
  const { scrollY } = useScroll()

  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setActivePath(location.pathname)
  }

  useMotionValueEvent(scrollY, 'change', (latest) => setIsScrolled(latest > 24))

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const root = document.querySelector('main')
    if (!root) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target instanceof HTMLElement) {
          const sectionKey = visibleEntry.target.getAttribute('data-nav-section')
          if (sectionKey) {
            setActivePath(sectionKey)
          }
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.35, 0.6] }
    )

    const targets = Array.from(root.querySelectorAll('[data-nav-section]'))
    if (targets.length === 0) {
      observer.observe(root)
    } else {
      targets.forEach((target) => observer.observe(target))
    }

    return () => observer.disconnect()
  }, [location.pathname])

  const isLinkActive = (link) => {
    if (link.path === '/') {
      return activePath === '/' || activePath === ''
    }

    return activePath.startsWith(link.path)
  }

  const navLinks = useMemo(
    () =>
      NAV_LINKS.map((link, index) => ({
        ...link,
        index,
      })),
    []
  )

  const toggleDrawer = () => setDrawerOpen((prev) => !prev)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.appBar + 2,
        px: { xs: 1.2, sm: 1.6, md: 2 },
        py: { xs: 1, md: 1.4 },
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 1400, position: 'relative' }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: isScrolled ? 70 : 78,
            px: { xs: 2, sm: 2.4, md: 3 },
            py: 1.25,
            borderRadius: 5,
            border: '1px solid',
            borderColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === 'dark' ? 0.24 : 0.14
            ),
            backdropFilter: 'blur(20px)',
            background: alpha(theme.palette.background.default, isScrolled ? 0.9 : 0.78),
            boxShadow: isScrolled
              ? `0 20px 45px ${alpha(theme.palette.common.black, 0.16)}`
              : `0 14px 36px ${alpha(theme.palette.common.black, 0.08)}`,
            transition: 'all 240ms ease',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              padding: '1px',
              background: `linear-gradient(120deg, ${alpha(theme.palette.primary.main, 0.6)}, ${alpha(theme.palette.secondary.main, 0.22)}, ${alpha(theme.palette.primary.main, 0.3)})`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
            style={{ flex: 1, minWidth: 0 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <Typography
                component={NavLink}
                to="/"
                variant="h6"
                sx={{
                  textDecoration: 'none',
                  color: 'text.primary',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                {SITE_NAME}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: 'text.secondary',
                  mt: 0.25,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontSize: '0.68rem',
                }}
              >
                React.js & React Native Developer
              </Typography>
            </Box>
          </motion.div>

          {isDesktop ? (
            <>
              <Stack
                direction="row"
                spacing={0.75}
                sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
              >
                {navLinks.map((link) => {
                  const active = isLinkActive(link)
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.04 * link.index, ease: 'easeOut' }}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        {active && (
                          <Box
                            component={motion.div}
                            layoutId="nav-pill"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              borderRadius: 999,
                              background: ACTIVE_GRADIENT,
                              boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                            }}
                          />
                        )}
                        <Button
                          component={NavLink}
                          to={link.path}
                          end={link.path === '/'}
                          sx={{
                            position: 'relative',
                            zIndex: 1,
                            color: active ? 'common.white' : 'text.secondary',
                            borderRadius: 999,
                            px: 1.25,
                            py: 0.7,
                            minWidth: 'auto',
                            fontWeight: active ? 700 : 500,
                            textTransform: 'none',
                            transition: 'all 220ms ease',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              left: '50%',
                              bottom: 7,
                              width: 0,
                              height: '2px',
                              borderRadius: 999,
                              background: ACTIVE_GRADIENT,
                              transform: 'translateX(-50%)',
                              transition: 'width 220ms ease',
                            },
                            '&:hover': {
                              color: active ? 'common.white' : 'text.primary',
                              transform: 'translateY(-1px)',
                            },
                            '&:hover::after': {
                              width: '60%',
                            },
                          }}
                        >
                          {link.label}
                        </Button>
                      </Box>
                    </motion.div>
                  )
                })}
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ scale: 1.03, y: -1, rotate: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    component="a"
                    href="/resume/Manikandan_J_Resume.pdf"
                    download="Manikandan_J_Resume.pdf"
                    onClick={() => trackResumeDownload('navbar', 'Manikandan_J_Resume.pdf')}
                    startIcon={<DownloadRoundedIcon />}
                    sx={{
                      borderRadius: 999,
                      px: 1.5,
                      py: 0.9,
                      textTransform: 'none',
                      fontWeight: 600,
                      color: 'common.white',
                      background: ACTIVE_GRADIENT,
                      boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.24)}`,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    Download Resume
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.18 }}
                  whileHover={{ scale: 1.06, y: -2, rotate: 6 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <ThemeToggleButton />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.22 }}
                  whileHover={{ scale: 1.06, y: -2, rotate: 6 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <IconButton
                    aria-label="GitHub"
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackSocialClick('github', 'https://github.com', 'navbar')}
                    sx={{
                      color: 'text.primary',
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      border: '1px solid',
                      borderColor: alpha(theme.palette.primary.main, 0.14),
                      backdropFilter: 'blur(14px)',
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) },
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.26 }}
                  whileHover={{ scale: 1.06, y: -2, rotate: 6 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <IconButton
                    aria-label="LinkedIn"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackSocialClick('linkedin', 'https://linkedin.com', 'navbar')}
                    sx={{
                      color: 'text.primary',
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      border: '1px solid',
                      borderColor: alpha(theme.palette.primary.main, 0.14),
                      backdropFilter: 'blur(14px)',
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) },
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </motion.div>
              </Stack>
            </>
          ) : (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', ml: 'auto' }}>
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                whileHover={{ scale: 1.05, y: -2, rotate: 6 }}
              >
                <ThemeToggleButton />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28 }}
                whileTap={{ scale: 0.96 }}
              >
                <IconButton
                  edge="end"
                  aria-label="open navigation menu"
                  onClick={toggleDrawer}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'text.primary',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.16),
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.16) },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </motion.div>
            </Stack>
          )}
        </Box>
      </motion.nav>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            background: alpha(theme.palette.background.default, 0.96),
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.16),
          },
        }}
      >
        <Box
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}
          role="presentation"
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2.5 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {SITE_NAME}
            </Typography>
            <IconButton onClick={closeDrawer} aria-label="close navigation menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List sx={{ px: 1, py: 1.5 }}>
            {navLinks.map((link) => {
              const active = isLinkActive(link)
              return (
                <ListItemButton
                  key={link.path}
                  component={NavLink}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={closeDrawer}
                  sx={{
                    borderRadius: 3,
                    mb: 0.75,
                    color: active ? 'primary.main' : 'text.secondary',
                    bgcolor: active ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
                    '&.active': { color: 'primary.main', fontWeight: 700 },
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              )
            })}
          </List>
          <Box sx={{ mt: 'auto', p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Button
              component="a"
              href="/resume/Manikandan_J_Resume.pdf"
              download="Manikandan_J_Resume.pdf"
              onClick={() => trackResumeDownload('navbar_mobile', 'Manikandan_J_Resume.pdf')}
              startIcon={<DownloadRoundedIcon />}
              fullWidth
              sx={{
                borderRadius: 999,
                py: 1,
                textTransform: 'none',
                fontWeight: 600,
                color: 'common.white',
                background: ACTIVE_GRADIENT,
              }}
            >
              Download Resume
            </Button>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <IconButton
                aria-label="GitHub"
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackSocialClick('github', 'https://github.com', 'navbar_mobile')}
                sx={{
                  color: 'text.primary',
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.16) },
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackSocialClick('linkedin', 'https://linkedin.com', 'navbar_mobile')
                }
                sx={{
                  color: 'text.primary',
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.16) },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export const Navbar = memo(NavbarInner)
export default Navbar
