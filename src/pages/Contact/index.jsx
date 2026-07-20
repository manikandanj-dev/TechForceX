import { useState, memo } from 'react'
import { SEO } from '@components/SEO'
import { SEO_ROUTES } from '@/seo/seoConfig'
import { AnimatePresence, motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { alpha, useTheme } from '@mui/material/styles'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { GlassCard } from '@components/GlassCard'
import { GradientBackground } from '@components/GradientBackground'
import { MagneticButton } from '@components/MagneticButton'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { useToastStore } from '@store/toastStore'
import { SOCIAL_LINKS } from '@utils/constants'

const CONTACT_EMAIL = 'manikandanj.dev@gmail.com'
const MESSAGE_MAX_LENGTH = 500
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const QUICK_CONTACT = [
  { icon: EmailRoundedIcon, label: 'Email', value: CONTACT_EMAIL },
  { icon: LocationOnRoundedIcon, label: 'Location', value: 'Coimbatore, Tamil Nadu, India' },
  { icon: WorkRoundedIcon, label: 'Experience', value: '4.7+ Years' },
  { icon: CodeRoundedIcon, label: 'Role', value: 'React.js & React Native Developer' },
]

function findSocialUrl(label) {
  return SOCIAL_LINKS.find((social) => social.label === label)?.url
}

const SOCIAL_BUTTONS = [
  { label: 'GitHub', icon: GitHubIcon, href: findSocialUrl('GitHub') ?? 'https://github.com' },
  {
    label: 'LinkedIn',
    icon: LinkedInIcon,
    href: findSocialUrl('LinkedIn') ?? 'https://linkedin.com',
  },
  { label: 'Email', icon: EmailRoundedIcon, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'Portfolio', icon: PublicRoundedIcon, href: '/' },
  { label: 'Resume', icon: DownloadRoundedIcon, href: '/resume.pdf' },
]

const INITIAL_VALUES = { name: '', email: '', subject: '', message: '' }

/**
 * Small glassmorphism card showing one piece of quick-contact info. The
 * Email card also gets a copy-to-clipboard button with a toast
 * confirmation.
 */
const QuickContactCard = memo(function QuickContactCard({ item }) {
  const ItemIcon = item.icon
  const prefersReducedMotion = usePrefersReducedMotion()
  const showToast = useToastStore((state) => state.showToast)

  const handleCopy = async (event) => {
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(item.value)
      showToast('Email copied to clipboard!', 'success')
    } catch {
      showToast('Could not copy email. Please copy it manually.', 'error')
    }
  }

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ height: '100%' }}
    >
      <GlassCard hoverLift={false} sx={{ height: '100%', p: { xs: 2.5, md: 3 } }}>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box
            component={motion.div}
            animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            sx={{ display: 'inline-flex', mb: 1 }}
          >
            <ItemIcon sx={{ color: 'primary.main', fontSize: 26 }} />
          </Box>
          {item.label === 'Email' && (
            <Tooltip title="Copy email">
              <IconButton size="small" onClick={handleCopy} aria-label="Copy email address">
                <ContentCopyRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
          {item.label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, wordBreak: 'break-word' }}>
          {item.value}
        </Typography>
      </GlassCard>
    </motion.div>
  )
})

/**
 * Circular gradient-glow social/action icon button with a tooltip, lift,
 * glow, and slight rotation on hover.
 */
const SocialButton = memo(function SocialButton({ social }) {
  const theme = useTheme()
  const SocialIcon = social.icon
  const prefersReducedMotion = usePrefersReducedMotion()
  const isExternal = social.href.startsWith('http') || social.href.startsWith('mailto:')

  return (
    <Tooltip title={social.label} arrow>
      <Box
        component={motion.div}
        whileHover={
          prefersReducedMotion
            ? undefined
            : {
                y: -6,
                rotate: 8,
                boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.35)}`,
              }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        sx={{ borderRadius: '50%' }}
      >
        <IconButton
          component="a"
          href={social.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          download={social.label === 'Resume' || undefined}
          aria-label={social.label}
          sx={{
            width: 52,
            height: 52,
            color: 'primary.main',
            bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.16 : 0.08),
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.3),
            '&:hover': {
              bgcolor: alpha(
                theme.palette.primary.main,
                theme.palette.mode === 'dark' ? 0.24 : 0.14
              ),
            },
          }}
        >
          <SocialIcon fontSize="small" />
        </IconButton>
      </Box>
    </Tooltip>
  )
})

/**
 * Premium Contact section: a left-side professional CTA (intro card, quick
 * contact facts, social links) and a right-side validated contact form
 * with loading/success/error states. No backend is wired up yet — submit
 * is simulated locally so the UI/UX can be reviewed end-to-end.
 */
export function Contact() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const prefersReducedMotion = usePrefersReducedMotion()
  const showToast = useToastStore((state) => state.showToast)
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (field) => (event) => {
    const { value } = event.target
    if (field === 'message' && value.length > MESSAGE_MAX_LENGTH) return
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Full name is required.'
    if (!values.email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!values.subject.trim()) nextErrors.subject = 'Subject is required.'
    if (!values.message.trim()) nextErrors.message = 'Message is required.'
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    // No backend is wired up yet — simulate a network request so the
    // loading/success UI can be reviewed end-to-end.
    setTimeout(() => {
      setStatus('success')
      setValues(INITIAL_VALUES)
      showToast("Message sent! I'll get back to you soon.", 'success')
    }, 1400)
  }

  const seo = SEO_ROUTES['/contact']

  return (
    <PageTransition>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogTitle={seo.ogTitle}
        ogDesc={seo.ogDesc}
      />
      <Box component="section" sx={{ position: 'relative', overflow: 'hidden' }}>
        <GradientBackground />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: isDark ? 0.3 : 0.4,
            backgroundImage:
              'linear-gradient(rgba(127,127,127,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(127,127,127,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, black, transparent 88%)',
          }}
        />

        <SectionContainer sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={fadeInUp}>
              <Typography variant="h2" sx={{ mb: 2, textWrap: 'balance' }}>
                Let&apos;s Build Something Amazing Together
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: 500, lineHeight: 1.7, maxWidth: 780, mb: { xs: 6, md: 8 } }}
              >
                I&apos;m always open to discussing exciting opportunities, frontend engineering
                roles, freelance projects, and innovative product ideas.
              </Typography>
            </motion.div>

            <Grid container spacing={{ xs: 5, md: 6 }} sx={{ alignItems: 'flex-start' }}>
              {/* Left: professional CTA */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div variants={fadeInUp}>
                  <Box
                    sx={{
                      borderRadius: '24px',
                      p: '1.5px',
                      mb: 3,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.55)}, ${alpha(theme.palette.secondary.main, 0.4)})`,
                    }}
                  >
                    <GlassCard hoverLift={false} sx={{ borderRadius: '24px' }}>
                      <Chip
                        label="Available for New Opportunities"
                        icon={
                          <Box
                            component={motion.span}
                            animate={prefersReducedMotion ? undefined : { opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: 'success.main',
                              ml: 1,
                            }}
                          />
                        }
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          flexDirection: 'row-reverse',
                          bgcolor: alpha(theme.palette.success.main, isDark ? 0.18 : 0.1),
                          color: 'success.main',
                          '& .MuiChip-icon': { ml: 0, mr: 1 },
                        }}
                      />
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        Currently working as a React.js &amp; React Native Software Engineer with
                        4.7+ years of experience building enterprise applications, payment
                        platforms, and scalable frontend architectures.
                      </Typography>
                    </GlassCard>
                  </Box>
                </motion.div>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {QUICK_CONTACT.map((item) => (
                    <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
                      <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                        <QuickContactCard item={item} />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>

                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: 0.6,
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                      display: 'block',
                      mb: 1.5,
                    }}
                  >
                    Connect
                  </Typography>
                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
                    {SOCIAL_BUTTONS.map((social) => (
                      <SocialButton key={social.label} social={social} />
                    ))}
                  </Stack>
                </motion.div>
              </Grid>

              {/* Right: contact form */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Box
                    sx={{
                      borderRadius: '24px',
                      p: '1.5px',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.55)}, ${alpha(theme.palette.secondary.main, 0.4)})`,
                    }}
                  >
                    <GlassCard hoverLift={false} sx={{ borderRadius: '24px' }}>
                      <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        aria-label="Contact form"
                      >
                        <Stack spacing={2.5}>
                          <AnimatePresence mode="wait">
                            {status === 'success' && (
                              <motion.div
                                key="success"
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                              >
                                <Alert severity="success">
                                  Message sent! I&apos;ll get back to you soon.
                                </Alert>
                              </motion.div>
                            )}
                            {status === 'error' && (
                              <motion.div
                                key="error"
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                              >
                                <Alert severity="error">
                                  Something went wrong. Please try again.
                                </Alert>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <TextField
                            label="Full Name"
                            value={values.name}
                            onChange={handleChange('name')}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            required
                            fullWidth
                            autoComplete="name"
                          />
                          <TextField
                            label="Email Address"
                            type="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            required
                            fullWidth
                            autoComplete="email"
                          />
                          <TextField
                            label="Subject"
                            value={values.subject}
                            onChange={handleChange('subject')}
                            error={Boolean(errors.subject)}
                            helperText={errors.subject}
                            required
                            fullWidth
                          />
                          <TextField
                            label="Message"
                            value={values.message}
                            onChange={handleChange('message')}
                            error={Boolean(errors.message)}
                            helperText={
                              errors.message ?? `${values.message.length} / ${MESSAGE_MAX_LENGTH}`
                            }
                            required
                            fullWidth
                            multiline
                            minRows={4}
                            slotProps={{ formHelperText: { sx: { textAlign: 'right', mx: 0 } } }}
                          />

                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                            <MagneticButton
                              type="submit"
                              variant="contained"
                              color="primary"
                              size="large"
                              disabled={status === 'submitting'}
                              endIcon={
                                status === 'submitting' ? (
                                  <CircularProgress size={18} color="inherit" />
                                ) : (
                                  <motion.span
                                    style={{ display: 'inline-flex' }}
                                    whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                                  >
                                    <ArrowForwardRoundedIcon fontSize="small" />
                                  </motion.span>
                                )
                              }
                              sx={{ flexGrow: 1 }}
                            >
                              {status === 'submitting' ? 'Sending…' : 'Send Message'}
                            </MagneticButton>
                            <MagneticButton
                              component="a"
                              href="/resume.pdf"
                              download
                              variant="outlined"
                              color="primary"
                              size="large"
                              startIcon={<DownloadRoundedIcon />}
                            >
                              Download Resume
                            </MagneticButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </GlassCard>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </SectionContainer>
      </Box>
    </PageTransition>
  )
}

export default Contact
