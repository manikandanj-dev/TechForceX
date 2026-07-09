import emailjs from '@emailjs/browser'

/**
 * Sends a contact form payload through EmailJS.
 * Configure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and
 * VITE_EMAILJS_PUBLIC_KEY in the environment for live delivery.
 * @param {{ name: string, email: string, subject: string, budget: string, message: string }} payload
 */
export async function sendContactMessage(payload) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'EmailJS is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.'
    )
  }

  const result = await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: payload.name,
      from_email: payload.email,
      subject: payload.subject,
      budget: payload.budget,
      message: payload.message,
    },
    { publicKey }
  )

  return result
}
