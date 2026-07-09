/**
 * Static placeholder content used to populate pages until a real API
 * or CMS is wired up via `@services`.
 */

export const STATS = [
  { id: 'stat-experience', label: 'Years Experience', value: 4, suffix: '.7+' },
  { id: 'stat-projects', label: 'Enterprise Projects', value: 5, suffix: '+' },
  { id: 'stat-mobile', label: 'Android & iOS Production Apps', value: 2, suffix: '+' },
  { id: 'stat-specialist', label: 'React.js & React Native Specialist', value: 2, suffix: 'x' },
  { id: 'stat-payments', label: 'Payment Gateway Integrations', value: 3, suffix: '+' },
  { id: 'stat-apis', label: 'REST API Integrations', value: 20, suffix: '+' },
]

export const FEATURES = [
  {
    id: 'feature-frontend',
    title: 'React.js Product Engineering',
    description:
      'Enterprise-grade web interfaces built with reusable components, responsive layouts, and production-ready React architecture.',
    icon: 'AutoAwesome',
  },
  {
    id: 'feature-mobile',
    title: 'Cross-Platform Mobile Apps',
    description:
      'React Native applications delivered for Android and iOS with push notifications, deep linking, and release-ready workflows.',
    icon: 'Architecture',
  },
  {
    id: 'feature-integrations',
    title: 'API and Payment Integrations',
    description:
      'Reliable REST API integration, Axios workflows, Adyen payment gateway flows, and smooth data-driven user experiences.',
    icon: 'DesignServices',
  },
  {
    id: 'feature-performance',
    title: 'Performance-Focused UI',
    description:
      'Modern interfaces optimized for speed, accessibility, clean state management, and consistent usability across devices.',
    icon: 'Speed',
  },
]

export const PROJECT_CATEGORIES = [
  'Payments',
  'Mobile App',
  'Website',
  'Dashboard',
  'Toll Management',
]

/** @type {import('@types').Project[]} */
export const PROJECTS = [
  {
    id: 'parkia-pay',
    title: 'ParkiaPay',
    description:
      'Payment-focused React.js application with Adyen integration, REST API workflows, responsive UI, and performance optimization for enterprise users.',
    category: 'Payments',
    year: 2026,
    tags: ['React.js', 'Adyen', 'REST APIs', 'Material UI'],
    image: 'https://picsum.photos/seed/proj-1/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'epass24',
    title: 'EPASS24',
    description:
      'React.js and React Native platform delivered across web, Android, and iOS with push notifications, deep linking, PDF downloads, Adyen payments, and production deployment.',
    category: 'Mobile App',
    year: 2025,
    tags: ['React Native', 'React.js', 'Push Notifications', 'Adyen'],
    image: 'https://picsum.photos/seed/proj-2/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'logicvalley-website',
    title: 'LogicValley Website',
    description:
      'Responsive React.js website with an admin portal, image optimization, SEO-focused content structure, and interactive animations for a polished brand experience.',
    category: 'Website',
    year: 2025,
    tags: ['React.js', 'SEO', 'Admin Portal', 'Animations'],
    image: 'https://picsum.photos/seed/proj-3/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'kmtoll',
    title: 'KMTOLL',
    description:
      'Toll management dashboard supporting vehicle tracking, REST API integrations, payment gateway flows, and responsive operational views.',
    category: 'Toll Management',
    year: 2024,
    tags: ['React.js', 'REST APIs', 'Payment Gateway', 'Dashboard'],
    image: 'https://picsum.photos/seed/proj-4/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'mnps',
    title: 'MNPS',
    description:
      'Vehicle fine collection solution with responsive UI, REST API integration, and payment gateway workflows for efficient transaction handling.',
    category: 'Dashboard',
    year: 2024,
    tags: ['React.js', 'REST APIs', 'Payment Gateway', 'Responsive UI'],
    image: 'https://picsum.photos/seed/proj-5/640/420',
    repoUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
]

/** @type {import('@types').BlogPost[]} */
export const BLOG_POSTS = [
  {
    id: 'post-1',
    title: 'Building Reusable React Component Architecture',
    excerpt:
      'Practical patterns for creating scalable, maintainable React.js applications with shared UI systems.',
    date: '2026-05-12',
  },
  {
    id: 'post-2',
    title: 'React Native Delivery for Android and iOS',
    excerpt:
      'Lessons from shipping cross-platform apps with push notifications, deep linking, and production deployment.',
    date: '2026-04-02',
  },
  {
    id: 'post-3',
    title: 'Reliable REST API and Payment Gateway Integration',
    excerpt:
      'How clean data flows, Axios services, and payment integration patterns improve enterprise product quality.',
    date: '2026-02-18',
  },
]

/** @type {import('@types').ExperienceItem[]} */
export const EXPERIENCE = [
  {
    id: 'parkia-pay',
    role: 'Software Engineer',
    company: 'ParkiaPay',
    period: 'React.js | Payments',
    description:
      'Delivered React.js development for payment workflows with Adyen payment gateway integration, REST APIs, responsive UI, and performance optimization.',
  },
  {
    id: 'epass24',
    role: 'Software Engineer',
    company: 'EPASS24',
    period: 'React.js | React Native',
    description:
      'Built web, Android, and iOS applications with push notifications, deep linking, PDF download, REST APIs, production deployment, and Adyen payment gateway integration.',
  },
  {
    id: 'logicvalley-website',
    role: 'React.js Developer',
    company: 'LogicValley Website',
    period: 'Website | Admin Portal',
    description:
      'Created a responsive React.js website and admin portal with image optimization, SEO improvements, and interactive animations.',
  },
  {
    id: 'kmtoll',
    role: 'Software Engineer',
    company: 'KMTOLL',
    period: 'Toll Management',
    description:
      'Developed toll management features for vehicle tracking, REST API integration, payment gateway workflows, and responsive dashboard views.',
  },
  {
    id: 'mnps',
    role: 'Software Engineer',
    company: 'MNPS',
    period: 'Vehicle Fine Collection',
    description:
      'Implemented vehicle fine collection flows with REST APIs, payment gateway integration, and responsive UI for streamlined operational use.',
  },
]

export const SKILLS = [
  'Frontend · React.js',
  'Frontend · React Native',
  'Frontend · JavaScript',
  'Frontend · TypeScript',
  'Frontend · HTML5',
  'Frontend · CSS3',
  'Frontend · Material UI',
  'State Management · Zustand',
  'State Management · Redux Toolkit',
  'State Management · Context API',
  'API · REST APIs',
  'API · Axios',
  'API · Postman',
  'Tools · Git',
  'Tools · GitHub',
  'Tools · Azure DevOps',
  'Tools · Jira',
  'Tools · VS Code',
  'Tools · Figma',
  'Tools · GitHub Copilot',
  'Tools · ChatGPT',
]
