import emailjs from '@emailjs/browser'

const REQUEST_TIMEOUT_MS = 15000

/**
 * Utility service to manage EmailJS integration.
 * Keeps EmailJS credential retrieval, timeouts, auto-reply confirmation emails,
 * and API calls decoupled from UI components.
 */
export const EmailService = {
  /**
   * Sends primary notification email to owner and automatic confirmation email to visitor via EmailJS.
   *
   * @param {Object} formData - Object containing trimmed form field values (name, email, subject, message).
   * @returns {Promise<import('@emailjs/browser').EmailJSResponseStatus>}
   */
  async sendContactEmail(formData) {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const confirmationTemplateId =
      import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || templateId
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (publicKey) {
      emailjs.init({ publicKey: publicKey })
    }

    const primaryParams = {
      name: formData.name,
      email: formData.email,
      to_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: new Date().toLocaleString(),
    }

    const confirmationParams = {
      name: formData.name,
      to_name: formData.name,
      email: formData.email,
      to_email: formData.email,
      user_email: formData.email,
      subject: 'Thank you for contacting Manikandan J',
      message: `Hi ${formData.name},

Thank you for contacting me through my portfolio.

I have received your message and will get back to you as soon as possible.

Best Regards,
Manikandan J
React.js & React Native Developer`,
      time: new Date().toLocaleString(),
    }

    const sendEmailsPromise = (async () => {
      // 1. Send primary notification email to site owner
      const response = await emailjs.send(serviceId, templateId, primaryParams, {
        publicKey: publicKey,
      })

      // 2. Send automatic confirmation email to visitor
      try {
        await emailjs.send(serviceId, confirmationTemplateId, confirmationParams, {
          publicKey: publicKey,
        })
      } catch (confirmError) {
        if (import.meta.env.DEV) {
          console.warn('EmailJS visitor confirmation email error:', confirmError)
        }
      }

      return response
    })()

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out. Please try again.'))
      }, REQUEST_TIMEOUT_MS)
    })

    try {
      const response = await Promise.race([sendEmailsPromise, timeoutPromise])
      return response
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('EmailService error:', error)
      }
      throw error
    }
  },
}

export default EmailService
