import axios from 'axios'

/**
 * Preconfigured Axios instance for all API calls in the app.
 * Set VITE_API_BASE_URL in a .env file to point to your backend.
 */
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('[API Error]', error?.response?.data || error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosClient
