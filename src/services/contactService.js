import { axiosClient } from '@services/axiosClient'

/**
 * Example service call — replace with a real endpoint.
 * Submits the contact form payload to the backend.
 * @param {{ name: string, email: string, message: string }} payload
 */
export async function sendContactMessage(payload) {
  const { data } = await axiosClient.post('/contact', payload)
  return data
}
