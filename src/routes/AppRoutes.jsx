import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { Loader } from '@components/Loader'
import { routes } from './routes'

/**
 * Renders the route tree defined in `routes.jsx`, wrapped in a Suspense
 * boundary so lazily-loaded pages show a loader while their code splits.
 */
export function AppRoutes() {
  const element = useRoutes(routes)
  return <Suspense fallback={<Loader />}>{element}</Suspense>
}

export default AppRoutes
