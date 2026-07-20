/**
 * seoConfig.js — Central SEO metadata registry
 *
 * Single source of truth for every page's meta tags.
 * Update this file whenever page content or branding changes.
 *
 * Used by: src/components/SEO/index.jsx
 */

export const SITE = {
  name: 'Manikandan J',
  url: 'https://manikandanj.dev',
  title: 'Manikandan J | React.js & React Native Software Engineer',
  description:
    'Software Engineer with 4.7+ years of experience building enterprise-grade React.js and React Native applications, payment platforms, and scalable frontend architectures.',
  author: 'Manikandan J',
  email: 'manikandanj.dev@gmail.com',
  ogImage: 'https://manikandanj.dev/og-image.png',
  twitterHandle: '@manikandanj_dev',
  locale: 'en_IN',
  themeColor: '#6366f1',
}

/**
 * Per-route SEO configuration.
 * Keys match React Router path segments (use '/' for home).
 *
 * Fields:
 *  title       — page <title> tag (max 60 chars)
 *  description — meta description (max 160 chars)
 *  canonical   — canonical URL path (relative, starts with /)
 *  ogTitle     — Open Graph title (can differ from <title>)
 *  ogDesc      — Open Graph description
 *  noIndex     — true = add <meta name="robots" content="noindex">
 */
export const SEO_ROUTES = {
  '/': {
    title: 'Manikandan J | React.js & React Native Software Engineer',
    description:
      'Software Engineer with 4.7+ years building enterprise React.js and React Native apps, payment platforms (Adyen), and scalable mobile/web products.',
    canonical: '/',
    ogTitle: 'Manikandan J | React.js & React Native Software Engineer',
    ogDesc:
      'Software Engineer with 4.7+ years building enterprise React.js and React Native apps, payment platforms, and scalable frontend architectures.',
  },
  '/about': {
    title: 'About Manikandan J | React.js & React Native Engineer',
    description:
      'Passionate Software Engineer specializing in React.js and React Native. 4.7+ years delivering enterprise web and cross-platform mobile apps with Adyen payment integration.',
    canonical: '/about',
    ogTitle: 'About Manikandan J — Software Engineer',
    ogDesc:
      'Learn about Manikandan J, a React.js and React Native engineer with 4.7+ years of enterprise development experience.',
  },
  '/skills': {
    title: 'Technical Skills | React.js, TypeScript, React Native — Manikandan J',
    description:
      'Full technical stack: React.js, React Native, TypeScript, Material UI, Adyen Payments, Zustand, Redux Toolkit, REST APIs, Git, Azure DevOps, and Figma.',
    canonical: '/skills',
    ogTitle: 'Technical Skills — Manikandan J',
    ogDesc:
      'React.js, React Native, TypeScript, Material UI, Adyen, Zustand, Redux, REST APIs, Git, and more.',
  },
  '/projects': {
    title: 'Projects | EPASS24, ParkiaPay, KMTOLL — Manikandan J',
    description:
      'Portfolio of enterprise projects: EPASS24 (React Native + Adyen), ParkiaPay (payments), LogicValley Website (SEO + admin portal), KMTOLL, and MNPS.',
    canonical: '/projects',
    ogTitle: 'Portfolio Projects — Manikandan J',
    ogDesc:
      'Enterprise React.js & React Native projects: EPASS24, ParkiaPay, LogicValley Website, KMTOLL, and MNPS.',
  },
  '/experience': {
    title: 'Work Experience | Software Engineer — Manikandan J',
    description:
      'Career history of Manikandan J: Software Engineer roles at EPASS24, ParkiaPay, LogicValley, KMTOLL and MNPS delivering React.js and React Native applications.',
    canonical: '/experience',
    ogTitle: 'Work Experience — Manikandan J',
    ogDesc:
      '4.7+ years as a Software Engineer building enterprise React.js and React Native products.',
  },
  '/contact': {
    title: 'Contact Manikandan J | Hire React.js & React Native Developer',
    description:
      'Get in touch to hire Manikandan J for React.js, React Native, API integration, or Adyen payment frontend work. Available for freelance and full-time roles.',
    canonical: '/contact',
    ogTitle: 'Contact Manikandan J — Hire a React.js Engineer',
    ogDesc:
      'Available for React.js, React Native, API integration, and payment-focused frontend roles. Reach out today.',
  },
  '/404': {
    title: 'Page Not Found — Manikandan J',
    description: 'The page you are looking for does not exist.',
    canonical: '/',
    noIndex: true,
  },
}
