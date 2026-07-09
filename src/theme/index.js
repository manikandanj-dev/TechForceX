import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { lightPalette, darkPalette } from './palette'
import { typography } from './typography'

/**
 * Builds a Material UI theme for the given mode.
 * @param {'light' | 'dark'} mode
 */
export function getTheme(mode) {
  const theme = createTheme({
    palette: mode === 'dark' ? darkPalette : lightPalette,
    typography,
    shape: { borderRadius: 12 },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 20 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: { backdropFilter: 'blur(10px)' },
        },
      },
    },
  })

  return responsiveFontSizes(theme)
}

export default getTheme
