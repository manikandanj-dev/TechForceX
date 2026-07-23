/**
 * seoLocales.js — Per-locale SEO metadata registry and helper
 *
 * Provides localized metadata (English & Danish) for each route.
 */

import { SEO_ROUTES } from '@/seo/seoConfig'

export const SEO_LOCALES = {
  da: {
    '/': {
      title: 'React.js & React Native Udvikler Portfolio — Manikandan J',
      description:
        'Erfaren React.js & React Native ingeniør med 4,7+ års erfaring med at bygge enterprise web- og mobilapps, betalingsplatforme (Adyen) og skalerbare frontend-arkitekturer. Tilgængelig til ansættelse.',
      canonical: '/',
      ogTitle: 'React.js & React Native Udvikler Portfolio — Manikandan J',
      ogDesc:
        'Enterprise web- og mobiludvikling med React.js, React Native, TypeScript og Adyen-betalingsintegration. 4,7+ års produktionserfaring.',
    },
    '/about': {
      title: 'Om en React.js & React Native Ingeniør — Manikandan J',
      description:
        'React.js og React Native ingeniør med 4,7+ års erfaring med at levere enterprise web- og cross-platform mobilapps. Specialist i Adyen-betalingsintegration, skalerbar arkitektur og TypeScript.',
      canonical: '/about',
      ogTitle: 'Om en React.js & React Native Ingeniør — Manikandan J',
      ogDesc:
        'Mød Manikandan J — 4,7+ års erfaring med at bygge enterprise React.js og React Native produkter, betalingsplatforme og skalerbare frontend-arkitekturer.',
    },
    '/skills': {
      title: 'React.js, React Native & TypeScript Kompetencer — Manikandan J',
      description:
        "Fuld React.js & React Native teknologistak: TypeScript, Material UI, Zustand, Redux Toolkit, Adyen, REST API'er, Git, Azure DevOps og Figma. Ekspertniveau inden for frontend-engineering.",
      canonical: '/skills',
      ogTitle: 'React.js, React Native & TypeScript Kompetencer — Manikandan J',
      ogDesc:
        "TypeScript, Material UI, Zustand, Redux Toolkit, Adyen, REST API'er, Git og mere — komplet frontend-engineering kompetencesæt.",
    },
    '/projects': {
      title: 'React.js & React Native Projekter — Erhvervs Portfolio',
      description:
        "Enterprise React.js og React Native portfolio: betalingsplatforme, cross-platform mobilapps, adminportaler og dashboards bygget med Adyen, REST API'er og TypeScript.",
      canonical: '/projects',
      ogTitle: 'React.js & React Native Projekter — Erhvervs Portfolio',
      ogDesc:
        "EPASS24, ParkiaPay, LogicValley Website, KMTOLL, MNPS — React.js og React Native projekter med Adyen-betalinger, REST API'er og TypeScript.",
    },
    '/experience': {
      title: 'React.js & React Native Arbejdserfaring — Manikandan J',
      description:
        "4,7+ års React.js og React Native softwareudvikling inden for betalinger, mobilitet og enterprise SaaS-produkter. Adyen, REST API'er, TypeScript, Material UI.",
      canonical: '/experience',
      ogTitle: 'React.js & React Native Arbejdserfaring — Manikandan J',
      ogDesc:
        '4,7+ års enterprise React.js og React Native engineering — betalinger, mobilapps, dashboards og adminportaler.',
    },
    '/contact': {
      title: 'Ansæt en React.js & React Native Udvikler — Manikandan J',
      description:
        'Ansæt en erfaren React.js & React Native udvikler. Tilgængelig til freelance og fuldtidsstillinger, API-integrationer og Adyen-betalingsfokuseret frontend-engineering.',
      canonical: '/contact',
      ogTitle: 'Ansæt en React.js & React Native Udvikler — Manikandan J',
      ogDesc:
        'Tilgængelig til React.js, React Native, API-integration og betalingsfokuserede frontend-roller. Tag kontakt i dag.',
    },
    '/404': {
      title: 'Side ikke fundet — Manikandan J',
      description: 'Den side, du leder efter, eksisterer ikke.',
      canonical: '/',
      noIndex: true,
    },
  },
}

/**
 * getLocaleSeo(locale, routePath)
 *
 * Returns SEO metadata for the specified locale and route.
 * Falls back to English (SEO_ROUTES) if translation is unavailable.
 *
 * @param {'en' | 'da'} locale
 * @param {string} routePath
 * @returns {import('@/seo/seoConfig').SEO_ROUTES[string]}
 */
export function getLocaleSeo(locale, routePath) {
  if (locale === 'da' && SEO_LOCALES.da[routePath]) {
    return SEO_LOCALES.da[routePath]
  }
  return SEO_ROUTES[routePath]
}
