/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { MainLayout } from '@layouts'

const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Skills = lazy(() => import('@pages/Skills'))
const Projects = lazy(() => import('@pages/Projects'))
const Experience = lazy(() => import('@pages/Experience'))
const MiniGames = lazy(() => import('@pages/MiniGames'))
const Blog = lazy(() => import('@pages/Blog'))
const Contact = lazy(() => import('@pages/Contact'))
const Dashboard = lazy(() => import('@pages/Dashboard'))
const AIChat = lazy(() => import('@pages/AIChat'))
const GitHubPage = lazy(() => import('@pages/GitHub'))
const NotFound = lazy(() => import('@pages/NotFound'))

/**
 * Declarative route configuration consumed by AppRoutes / the router.
 */
export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'skills', element: <Skills /> },
      { path: 'projects', element: <Projects /> },
      { path: 'experience', element: <Experience /> },
      { path: 'mini-games', element: <MiniGames /> },
      { path: 'blog', element: <Blog /> },
      { path: 'contact', element: <Contact /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'ai-chat', element: <AIChat /> },
      { path: 'github', element: <GitHubPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export default routes
