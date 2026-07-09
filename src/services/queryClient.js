import { QueryClient } from '@tanstack/react-query'

/**
 * Shared React Query client with sensible production defaults.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
})

export default queryClient
