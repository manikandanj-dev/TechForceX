import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import { useToastStore } from '@store/toastStore'

function SlideUpTransition(props) {
  return <Slide {...props} direction="up" />
}

/**
 * Site-wide toast notification, driven by `useToastStore`. Mounted once in
 * `MainLayout` so any page/component can call `showToast()` without prop
 * drilling. Uses MUI's own Snackbar/Alert (no extra dependency).
 */
export function Toast() {
  const toast = useToastStore((state) => state.toast)
  const clearToast = useToastStore((state) => state.clearToast)

  return (
    <Snackbar
      key={toast?.key}
      open={Boolean(toast)}
      autoHideDuration={3500}
      onClose={clearToast}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      slots={{ transition: SlideUpTransition }}
    >
      <Alert
        onClose={clearToast}
        severity={toast?.severity ?? 'success'}
        variant="filled"
        sx={{ fontWeight: 600, borderRadius: '14px', boxShadow: '0 12px 32px rgba(0,0,0,0.24)' }}
      >
        {toast?.message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
