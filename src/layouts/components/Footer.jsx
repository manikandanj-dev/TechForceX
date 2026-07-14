import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { alpha } from '@mui/material/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import { GradientBackground } from '@components/GradientBackground'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { SITE_NAME, NAV_LINKS, SOCIAL_LINKS } from '@utils/constants'

const CONTACT_EMAIL = 'manikandanj.dev@gmail.com'

const TECHNOLOGIES = [
  'React.js',
  'React Native',
  'Material UI',
  'TypeScript',
  'REST APIs',
  'Azure DevOps',
]

function findSocialUrl(label) {
  return SOCIAL_LINKS.find((social) => social.label === label)?.url
}

const CONNECT_LINKS = [
  { label: 'GitHub', icon: GitHubIcon, href: findSocialUrl('GitHub') ?? 'https://github.com' },
  {
    label: 'LinkedIn',
    icon: LinkedInIcon,
    href: findSocialUrl('LinkedIn') ?? 'https://linkedin.com',
  },
  { label: 'Email', icon: EmailRoundedIcon, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'Resume', icon: DownloadRoundedIcon, href: '/resume.pdf', download: true },
]

/**
 * A footer nav/text link with an animated underline that grows in on
 * hover.
 */
function FooterLink({ to, label }) {
  return (
    <Typography
      component={NavLink}
      to={to}
      variant="body2"
      sx={{
        position: 'relative',
        width: 'fit-content',
        color: alpha('#fff', 0.68),
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          bottom: -2,
          height: '1px',
          width: 0,
          bgcolor: 'primary.light',
          transition: 'width 0.3s ease',
        },
        '&:hover': { color: '#fff' },
        '&:hover::after': { width: '100%' },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.light',
          outlineOffset: 2,
        },
      }}
    >
      {label}
    </Typography>
  )
}

/**
 * Premium dark footer: 4-column layout (logo/description, quick links,
 * technologies, connect) fading in on scroll, plus a bottom bar with
 * copyright and a "built with" credit. Deliberately stays dark regardless
 * of the site's light/dark theme toggle for a consistent premium finish.
 */
export function Footer() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        mt: 'auto',
        bgcolor: '#0b1120',
        borderTop: '1px solid',
        borderColor: alpha('#fff', 0.08),
      }}
    >
      <GradientBackground />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.25,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at top, black, transparent 75%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 } }}>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <Grid container spacing={{ xs: 5, sm: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div variants={fadeInUp}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', mb: 1.5 }}>
                  {SITE_NAME}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: alpha('#fff', 0.65), lineHeight: 1.8, maxWidth: 280 }}
                >
                  React.js &amp; React Native Software Engineer building scalable web and mobile
                  applications.
                </Typography>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: 0.6,
                    textTransform: 'uppercase',
                    color: alpha('#fff', 0.5),
                    display: 'block',
                    mb: 2,
                  }}
                >
                  Quick Links
                </Typography>
                <Stack spacing={1.25} sx={{ alignItems: 'flex-start' }}>
                  {NAV_LINKS.map((link) => (
                    <FooterLink key={link.path} to={link.path} label={link.label} />
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: 0.6,
                    textTransform: 'uppercase',
                    color: alpha('#fff', 0.5),
                    display: 'block',
                    mb: 2,
                  }}
                >
                  Technologies
                </Typography>
                <Stack spacing={1.25}>
                  {TECHNOLOGIES.map((tech) => (
                    <Typography key={tech} variant="body2" sx={{ color: alpha('#fff', 0.68) }}>
                      {tech}
                    </Typography>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: 0.6,
                    textTransform: 'uppercase',
                    color: alpha('#fff', 0.5),
                    display: 'block',
                    mb: 2,
                  }}
                >
                  Connect
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  {CONNECT_LINKS.map((social) => {
                    const SocialIcon = social.icon
                    const isExternal = social.href.startsWith('http')
                    return (
                      <Tooltip key={social.label} title={social.label} arrow>
                        <Box
                          component={motion.div}
                          whileHover={prefersReducedMotion ? undefined : { y: -5, rotate: 6 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                          sx={{ borderRadius: '50%' }}
                        >
                          <IconButton
                            component="a"
                            href={social.href}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            download={social.download || undefined}
                            aria-label={social.label}
                            sx={{
                              color: '#fff',
                              bgcolor: alpha('#fff', 0.06),
                              border: '1px solid',
                              borderColor: alpha('#fff', 0.12),
                              '&:hover': { bgcolor: alpha('#fff', 0.12) },
                            }}
                          >
                            <SocialIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Tooltip>
                    )
                  })}
                </Stack>
              </motion.div>
            </Grid>
          </Grid>

          <Divider sx={{ my: { xs: 5, md: 6 }, borderColor: alpha('#fff', 0.1) }} />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
          >
            <Typography variant="body2" sx={{ color: alpha('#fff', 0.55) }}>
              © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ color: alpha('#fff', 0.55) }}>
              Built with ❤️ using React.js + Material UI + Framer Motion
            </Typography>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Footer
