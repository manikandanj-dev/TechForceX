import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { sendContactMessage } from '@services/contactService'
import { isValidEmail } from '@utils/helpers'

const initialValues = { name: '', email: '', message: '' }

/**
 * Contact page with a validated form wired to React Query + Axios.
 */
export function Contact() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const mutation = useMutation({
    mutationFn: sendContactMessage,
  })

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Name is required'
    if (!isValidEmail(values.email)) nextErrors.email = 'Enter a valid email'
    if (!values.message.trim()) nextErrors.message = 'Message is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    mutation.mutate(values, {
      onSuccess: () => setValues(initialValues),
    })
  }

  return (
    <PageTransition>
      <SectionContainer maxWidth="sm">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              Contact
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Have a project in mind? Send me a message.
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Stack component="form" spacing={3} onSubmit={handleSubmit} noValidate>
              <TextField
                label="Name"
                value={values.name}
                onChange={handleChange('name')}
                error={Boolean(errors.name)}
                helperText={errors.name}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange('email')}
                error={Boolean(errors.email)}
                helperText={errors.email}
                fullWidth
              />
              <TextField
                label="Message"
                value={values.message}
                onChange={handleChange('message')}
                error={Boolean(errors.message)}
                helperText={errors.message}
                multiline
                minRows={4}
                fullWidth
              />

              {mutation.isSuccess && <Alert severity="success">Message sent successfully!</Alert>}
              {mutation.isError && (
                <Alert severity="error">Something went wrong. Please try again.</Alert>
              )}

              <Button type="submit" variant="contained" size="large" disabled={mutation.isPending}>
                {mutation.isPending ? 'Sending…' : 'Send Message'}
              </Button>
            </Stack>
          </motion.div>
        </motion.div>
      </SectionContainer>
    </PageTransition>
  )
}

export default Contact
