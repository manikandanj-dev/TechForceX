import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useThemeMode } from '@hooks/useThemeMode'

/**
 * Button that toggles between light and dark color modes.
 */
export function ThemeToggleButton() {
  const { mode, toggleMode } = useThemeMode()

  return (
    <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <IconButton onClick={toggleMode} color="inherit" aria-label="toggle theme">
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggleButton
