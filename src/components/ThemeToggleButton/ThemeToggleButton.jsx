import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { AnimatePresence, motion } from 'framer-motion'
import { useThemeMode } from '@hooks/useThemeMode'

/**
 * Button that toggles between light and dark color modes, with an
 * animated rotate/fade swap between the sun and moon icons.
 */
export function ThemeToggleButton() {
  const { mode, toggleMode } = useThemeMode()

  return (
    <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <IconButton onClick={toggleMode} color="inherit" aria-label="toggle theme">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ display: 'flex' }}
          >
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </motion.span>
        </AnimatePresence>
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggleButton
