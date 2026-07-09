import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageIcon from '@mui/icons-material/Language'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import PersonIcon from '@mui/icons-material/Person'
import SendIcon from '@mui/icons-material/Send'
import SubjectIcon from '@mui/icons-material/Subject'
import { alpha, useTheme } from '@mui/material/styles'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { sendContactMessage } from '@services/contactService'

const budgetOptions = ['Discovery call', '$2k - $5k', '$5k - $15k', '$15k+']

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter at least 2 characters'),
  email: z.string().trim().email('Enter a valid email address'),
  subject: z.string().trim().min(4, 'Give the project a short subject'),
  budget: z.string().min(1, 'Select a budget range'),
  message: z.string().trim().min(20, 'Tell me a little more about the project'),
})

const defaultValues = {
  name: '',
  email: '',
  subject: '',
  budget: 'Discovery call',
  message: '',
}

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: <GitHubIcon /> },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: <LinkedInIcon /> },
  { label: 'Email', href: 'mailto:manikandanj.dev@gmail.com', icon: <AlternateEmailIcon /> },
  { label: 'Portfolio', href: '/', icon: <LanguageIcon /> },
]

/**
 * Premium contact page with React Hook Form + Zod validation and EmailJS delivery.
 */
export function Contact() {
  const theme = useTheme()
  const [notification, setNotification] = useState(null)
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(contactSchema),
  })

  const mutation = useMutation({
    mutationFn: sendContactMessage,
  })

  const onSubmit = (values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        reset(defaultValues)
        setNotification({
          severity: 'success',
          message: 'Message sent. I will get back to you soon.',
        })
      },
      onError: (error) => {
        setNotification({
          severity: 'error',
          message: error.message || 'Message failed to send. Please try again.',
        })
      },
    })
  }

  return (
    <PageTransition>
      <SectionContainer
        maxWidth="xl"
        sx={{
          py: { xs: 4, md: 8 },
          background: `radial-gradient(circle at 12% 10%, ${alpha(theme.palette.primary.main, 0.14)}, transparent 28%), radial-gradient(circle at 88% 0%, ${alpha(theme.palette.secondary.main, 0.12)}, transparent 24%)`,
        }}
      >
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Stack spacing={1.5} sx={{ mb: 4, maxWidth: 820 }}>
              <Chip
                icon={<MarkEmailReadIcon />}
                label="Available for React.js and React Native opportunities"
                sx={{ alignSelf: 'flex-start', fontWeight: 800 }}
              />
              <Typography variant="h2">Contact Manikandan J</Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: 400, lineHeight: 1.7 }}
              >
                Software Engineer based in Coimbatore, Tamil Nadu, India. Reach out for React.js,
                React Native, REST API integration, payment gateway integration, and responsive UI
                development.
              </Typography>
            </Stack>
          </motion.div>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Paper
                component={motion.form}
                variants={fadeInUp}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ p: { xs: 2.5, md: 4 }, border: 1, borderColor: 'divider' }}
              >
                <Stack spacing={2.5}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Name"
                        fullWidth
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          },
                        }}
                        {...register('name')}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <AlternateEmailIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          },
                        }}
                        {...register('email')}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 7 }}>
                      <TextField
                        label="Project subject"
                        fullWidth
                        error={Boolean(errors.subject)}
                        helperText={errors.subject?.message}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <SubjectIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          },
                        }}
                        {...register('subject')}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}>
                      <Controller
                        name="budget"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            select
                            label="Budget"
                            fullWidth
                            error={Boolean(errors.budget)}
                            helperText={errors.budget?.message}
                            slotProps={{
                              input: {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <BusinessCenterIcon fontSize="small" />
                                  </InputAdornment>
                                ),
                              },
                            }}
                            {...field}
                          >
                            {budgetOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Project details"
                    multiline
                    minRows={6}
                    fullWidth
                    error={Boolean(errors.message)}
                    helperText={
                      errors.message?.message ||
                      'Share goals, timeline, stack, constraints, or links.'
                    }
                    {...register('message')}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    disabled={mutation.isPending || isSubmitting}
                  >
                    {mutation.isPending ? 'Sending...' : 'Send Message'}
                  </Button>
                </Stack>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <Stack spacing={3}>
                <Card
                  component={motion.div}
                  variants={fadeInUp}
                  sx={{ border: 1, borderColor: 'divider' }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                        <LocationOnIcon color="primary" />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 850 }}>
                            Manikandan J
                          </Typography>
                          <Typography color="text.secondary">
                            Software Engineer · Coimbatore, Tamil Nadu
                          </Typography>
                        </Box>
                      </Stack>
                      <Box
                        component="iframe"
                        title="Google map showing Coimbatore, Tamil Nadu"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps?q=Coimbatore%2C%20Tamil%20Nadu%2C%20India&output=embed"
                        sx={{ width: 1, height: 280, border: 0, borderRadius: 2 }}
                      />
                    </Stack>
                  </CardContent>
                </Card>

                <Card
                  component={motion.div}
                  variants={fadeInUp}
                  sx={{ border: 1, borderColor: 'divider' }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6" sx={{ fontWeight: 850 }}>
                        Connect
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                        {socialLinks.map((link) => (
                          <IconButton
                            key={link.label}
                            component={Link}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel="noreferrer"
                            aria-label={link.label}
                            color="primary"
                          >
                            {link.icon}
                          </IconButton>
                        ))}
                      </Stack>
                      <Typography color="text.secondary">
                        manikandanj.dev@gmail.com · +91 8870682264
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </motion.div>
      </SectionContainer>
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={5000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {notification ? (
          <Alert severity={notification.severity} onClose={() => setNotification(null)}>
            {notification.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </PageTransition>
  )
}

export default Contact
