/**
 * Static placeholder content used to populate pages until a real API
 * or CMS is wired up via `@services`.
 */

export const STATS = [
  { id: 'stat-projects', label: 'Projects Delivered', value: 50, suffix: '+' },
  { id: 'stat-experience', label: 'Years of Experience', value: 6, suffix: '+' },
  { id: 'stat-clients', label: 'Happy Clients', value: 30, suffix: '+' },
  { id: 'stat-satisfaction', label: 'Client Satisfaction', value: 98, suffix: '%' },
]

export const FEATURES = [
  {
    id: 'feature-motion',
    title: 'Animation-First Development',
    description:
      'Every interaction is crafted with Framer Motion and GSAP for a fluid, tactile feel.',
    icon: 'AutoAwesome',
  },
  {
    id: 'feature-architecture',
    title: 'Scalable Architecture',
    description: 'Clean, modular React architecture built to grow from prototype to production.',
    icon: 'Architecture',
  },
  {
    id: 'feature-design',
    title: 'Pixel-Perfect Design',
    description:
      'Interfaces inspired by the best in the industry — precise, refined, and consistent.',
    icon: 'DesignServices',
  },
  {
    id: 'feature-performance',
    title: 'Performance Obsessed',
    description: 'Optimized bundles, lazy loading, and smooth 60fps animations by default.',
    icon: 'Speed',
  },
]

export const PROJECT_CATEGORIES = ['Web App', 'Dashboard', 'E-commerce', 'Mobile', 'Design System']

/** @type {import('@types').Project[]} */
export const PROJECTS = [
  {
    id: 'proj-1',
    title: 'Animated Portfolio',
    description: 'A personal portfolio built with React, Framer Motion, and GSAP scroll effects.',
    category: 'Web App',
    year: 2026,
    tags: ['React', 'Framer Motion', 'GSAP'],
    image: 'https://picsum.photos/seed/proj-1/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'proj-2',
    title: 'Realtime Analytics Dashboard',
    description: 'A data dashboard with live charts, React Query caching, and Zustand state.',
    category: 'Dashboard',
    year: 2025,
    tags: ['React Query', 'Zustand', 'MUI'],
    image: 'https://picsum.photos/seed/proj-2/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'proj-3',
    title: 'E-commerce Storefront',
    description: 'A responsive storefront with cart animations and optimistic UI updates.',
    category: 'E-commerce',
    year: 2025,
    tags: ['React Router', 'Axios', 'MUI'],
    image: 'https://picsum.photos/seed/proj-3/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'proj-4',
    title: 'Fitness Tracker Mobile App',
    description: 'A cross-platform fitness companion with animated progress rings and reminders.',
    category: 'Mobile',
    year: 2024,
    tags: ['React Native', 'Zustand', 'Reanimated'],
    image: 'https://picsum.photos/seed/proj-4/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'proj-5',
    title: 'Component Design System',
    description: 'A themeable component library with light/dark tokens and Storybook docs.',
    category: 'Design System',
    year: 2024,
    tags: ['MUI', 'Storybook', 'TypeScript'],
    image: 'https://picsum.photos/seed/proj-5/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'proj-6',
    title: 'SaaS Billing Dashboard',
    description: 'Subscription management dashboard with usage charts and invoice history.',
    category: 'Dashboard',
    year: 2023,
    tags: ['React Query', 'Recharts', 'Axios'],
    image: 'https://picsum.photos/seed/proj-6/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'proj-7',
    title: 'Marketplace Storefront',
    description: 'Multi-vendor marketplace with animated filters and wishlist interactions.',
    category: 'E-commerce',
    year: 2023,
    tags: ['React', 'Framer Motion', 'MUI'],
    image: 'https://picsum.photos/seed/proj-7/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'proj-8',
    title: 'Recipe Discovery App',
    description: 'A mobile app for discovering recipes with swipe gestures and saved collections.',
    category: 'Mobile',
    year: 2023,
    tags: ['React Native', 'GSAP', 'Axios'],
    image: 'https://picsum.photos/seed/proj-8/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'proj-9',
    title: 'Marketing Landing Kit',
    description: 'A collection of reusable animated landing page sections and layouts.',
    category: 'Web App',
    year: 2022,
    tags: ['React', 'Framer Motion', 'Vite'],
    image: 'https://picsum.photos/seed/proj-9/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
]

/** @type {import('@types').BlogPost[]} */
export const BLOG_POSTS = [
  {
    id: 'post-1',
    title: 'Mastering Framer Motion Variants',
    excerpt: 'A deep dive into building reusable, composable animation variants.',
    date: '2026-05-12',
  },
  {
    id: 'post-2',
    title: 'GSAP + React: Best Practices',
    excerpt: 'How to safely integrate GSAP timelines inside React components.',
    date: '2026-04-02',
  },
  {
    id: 'post-3',
    title: 'Scalable State with Zustand',
    excerpt: 'Patterns for structuring Zustand stores in larger applications.',
    date: '2026-02-18',
  },
]

/** @type {import('@types').ExperienceItem[]} */
export const EXPERIENCE = [
  {
    id: 'exp-1',
    role: 'Senior Frontend Engineer',
    company: 'Nimbus Labs',
    period: '2024 — Present',
    description: 'Leading the design system and animation platform used across products.',
  },
  {
    id: 'exp-2',
    role: 'Frontend Engineer',
    company: 'Bright Studio',
    period: '2021 — 2024',
    description: 'Built and maintained customer-facing React applications at scale.',
  },
  {
    id: 'exp-3',
    role: 'Junior Web Developer',
    company: 'Pixel Forge',
    period: '2019 — 2021',
    description: 'Developed marketing sites and interactive landing pages.',
  },
]

export const SKILLS = [
  'JavaScript',
  'React',
  'Vite',
  'Material UI',
  'Redux / Zustand',
  'React Query',
  'Framer Motion',
  'GSAP',
  'Node.js',
  'REST APIs',
  'Responsive Design',
  'Accessibility',
]
