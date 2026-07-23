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
  url: 'https://tech-force-x.vercel.app',
  /**
   * IMPL-08: Site-level fallback title and description use topic-first framing.
   * The SEO component uses these when no per-route value is present (e.g. 404).
   * Topic-first ensures even fallback renders signal topical authority, not just
   * the author name, to Google and AI crawlers.
   */
  title: 'React.js & React Native Developer Portfolio — Manikandan J',
  description:
    'Experienced React.js & React Native engineer with 4.7+ years building enterprise web and mobile apps, payment platforms (Adyen), and scalable frontend architectures. Available for hire.',
  author: 'Manikandan J',
  email: 'manikandanj.dev@gmail.com',
  ogImage: 'https://tech-force-x.vercel.app/og-image.png',
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
/**
 * IMPL-01 + IMPL-02 + IMPL-07:
 * All titles, descriptions, and OG fields are restructured to topic-first.
 *
 * Rationale:
 *  - Google weights the first 50–60 characters of a title tag most heavily.
 *    Starting with the topic ('React.js & React Native Developer Portfolio')
 *    instead of the name ('Manikandan J') increases relevance confidence for
 *    non-branded queries like 'React Native developer portfolio' or
 *    'hire React developer'.
 *
 *  - AI assistants (ChatGPT, Perplexity, Gemini, Claude) use page titles and
 *    meta descriptions to build entity-capability associations. A description
 *    that leads with capability ('Experienced React.js & React Native engineer...')
 *    is a stronger candidate answer to 'who should I hire for React work?' than
 *    one that leads with a name.
 *
 *  - The author name is preserved at the end of every title to continue
 *    satisfying branded searches ('Manikandan J React developer').
 */
export const SEO_ROUTES = {
  '/': {
    /**
     * Home: matches 'React.js developer portfolio', 'React Native developer
     * portfolio', 'frontend developer portfolio' — highest-volume target queries.
     */
    title: 'React.js & React Native Developer Portfolio — Manikandan J',
    description:
      'Experienced React.js & React Native engineer with 4.7+ years building enterprise web and mobile apps, payment platforms (Adyen), and scalable frontend architectures. Available for hire.',
    canonical: '/',
    ogTitle: 'React.js & React Native Developer Portfolio — Manikandan J',
    ogDesc:
      'Enterprise web and mobile engineering with React.js, React Native, TypeScript, and Adyen payment integration. 4.7+ years of production experience.',
  },
  '/about': {
    /**
     * About: matches 'about React Native developer', 'React.js engineer
     * experience', 'frontend developer background'.
     */
    title: 'About a React.js & React Native Engineer — Manikandan J',
    description:
      'React.js and React Native engineer with 4.7+ years delivering enterprise web and cross-platform mobile apps. Specialises in Adyen payment integration, scalable architecture, and TypeScript.',
    canonical: '/about',
    ogTitle: 'About a React.js & React Native Engineer — Manikandan J',
    ogDesc:
      'Meet Manikandan J — 4.7+ years building enterprise React.js and React Native products, payment platforms, and scalable frontend architectures.',
  },
  '/skills': {
    /**
     * Skills: matches 'React.js developer skills', 'React Native skills 2025',
     * 'TypeScript frontend developer skills', 'frontend tech stack'.
     */
    title: 'React.js, React Native & TypeScript Skills — Manikandan J',
    description:
      'Full React.js & React Native technology stack: TypeScript, Material UI, Zustand, Redux Toolkit, Adyen, REST APIs, Git, Azure DevOps, and Figma. Expert-level frontend engineering skills.',
    canonical: '/skills',
    ogTitle: 'React.js, React Native & TypeScript Skills — Manikandan J',
    ogDesc:
      'TypeScript, Material UI, Zustand, Redux Toolkit, Adyen, REST APIs, Git, and more — full frontend engineering skill set.',
  },
  '/projects': {
    /**
     * Projects: matches 'React.js projects portfolio', 'React Native enterprise
     * apps', 'React developer portfolio examples', 'Adyen React integration'.
     */
    title: 'React.js & React Native Projects — Enterprise Portfolio',
    description:
      'Enterprise React.js and React Native portfolio: payment platforms, cross-platform mobile apps, admin portals, and dashboards built with Adyen, REST APIs, and TypeScript.',
    canonical: '/projects',
    ogTitle: 'React.js & React Native Projects — Enterprise Portfolio',
    ogDesc:
      'EPASS24, ParkiaPay, LogicValley Website, KMTOLL, MNPS — React.js and React Native projects with Adyen payments, REST APIs, and TypeScript.',
  },
  '/experience': {
    /**
     * Experience: matches 'React.js developer work experience', 'React Native
     * engineer career', 'hire experienced React developer'.
     */
    title: 'React.js & React Native Work Experience — Manikandan J',
    description:
      '4.7+ years of React.js and React Native software engineering across payments, mobility, and enterprise SaaS products. Adyen, REST APIs, TypeScript, Material UI.',
    canonical: '/experience',
    ogTitle: 'React.js & React Native Work Experience — Manikandan J',
    ogDesc:
      '4.7+ years of enterprise React.js and React Native engineering — payments, mobile apps, dashboards, and admin portals.',
  },
  '/contact': {
    /**
     * Contact: matches 'hire React.js developer', 'hire React Native developer',
     * 'freelance React developer available', 'React developer for hire'.
     */
    title: 'Hire a React.js & React Native Developer — Manikandan J',
    description:
      'Hire an experienced React.js & React Native developer. Available for freelance and full-time roles, API integrations, and Adyen payment-focused frontend engineering.',
    canonical: '/contact',
    ogTitle: 'Hire a React.js & React Native Developer — Manikandan J',
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
