import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { ThemeToggleButton } from '@components/ThemeToggleButton'
import { NAV_LINKS, SITE_NAME, DRAWER_WIDTH } from '@utils/constants'

/**
 * Top navigation bar with a responsive drawer for mobile/tablet viewports.
 */
export function Navbar() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => setDrawerOpen((prev) => !prev)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700 }}
          >
            {SITE_NAME}
          </Typography>

          {isDesktop ? (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.path}
                  component={NavLink}
                  to={link.path}
                  end={link.path === '/'}
                  sx={{
                    color: 'text.secondary',
                    '&.active': { color: 'primary.main', fontWeight: 700 },
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <ThemeToggleButton />
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <ThemeToggleButton />
              <IconButton
                edge="end"
                color="inherit"
                aria-label="open navigation menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: DRAWER_WIDTH }} role="presentation">
          <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>
            {SITE_NAME}
          </Typography>
          <Divider />
          <List>
            {NAV_LINKS.map((link) => (
              <ListItemButton
                key={link.path}
                component={NavLink}
                to={link.path}
                end={link.path === '/'}
                onClick={closeDrawer}
                sx={{ '&.active': { color: 'primary.main', fontWeight: 700 } }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar
