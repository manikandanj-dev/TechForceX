import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { SITE_NAME, SOCIAL_LINKS } from '@utils/constants'

const ICONS = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Twitter: TwitterIcon,
}

/**
 * Site-wide footer with social links and copyright.
 */
export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        py: 4,
        mt: 'auto',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 'lg',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </Typography>

        <Stack direction="row" spacing={1}>
          {SOCIAL_LINKS.map((social) => {
            const Icon = ICONS[social.label]
            return (
              <IconButton
                key={social.label}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                size="small"
              >
                {Icon ? <Icon fontSize="small" /> : null}
              </IconButton>
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
