const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates and trims contact form input values.
 *
 * @param {Object} values - Form field values ({ name, email, subject, message }).
 * @returns {{ isValid: boolean, errors: Object, trimmedValues: Object }}
 */
export function validateContactForm(values) {
  const errors = {}

  const name = values.name?.trim() || ''
  const email = values.email?.trim() || ''
  const subject = values.subject?.trim() || ''
  const message = values.message?.trim() || ''

  if (!name) {
    errors.name = 'Full name is required.'
  } else if (name.length < 2) {
    errors.name = 'Full name must be at least 2 characters.'
  }

  if (!email) {
    errors.email = 'Email address is required.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!subject) {
    errors.subject = 'Subject is required.'
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.'
  }

  if (!message) {
    errors.message = 'Message is required.'
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    trimmedValues: {
      name,
      email,
      subject,
      message,
    },
  }
}
