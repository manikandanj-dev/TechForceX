/**
 * softwareAppSchema.js — Schema.org SoftwareApplication JSON-LD builder
 *
 * Produces a JSON-LD @graph containing one SoftwareApplication node per
 * portfolio project. Using a @graph (array) inside a single <script> block
 * is the recommended way to avoid duplicate <script type="application/ld+json">
 * tags and keeps the <head> clean.
 *
 * Why SoftwareApplication and not WebApplication?
 *  - SoftwareApplication is the parent type and is accepted by Google's
 *    Rich Results for apps.
 *  - MobileApplication and WebApplication extend it; we set
 *    applicationCategory and operatingSystem per project to give crawlers
 *    the same precision without requiring separate @type values.
 *
 * Design decisions:
 *  - Pure function: no React, no hooks, no side effects.
 *  - All project data is imported from PROJECTS (mockData.js) — the existing
 *    single source of truth. No data duplication.
 *  - The author/creator sub-object references SITE so the Person entity
 *    created in Task 1 can be correlated by crawlers.
 *  - Fields that are unavailable (e.g. real demoUrl) use null and are
 *    filtered out by the removeNulls helper so the emitted JSON stays clean.
 *
 * Reference: https://schema.org/SoftwareApplication
 */

import { SITE } from '@/seo/seoConfig'
import { PROJECTS } from '@utils/mockData'

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Recursively removes keys whose value is null or undefined so the emitted
 * JSON-LD does not contain empty fields that could confuse validators.
 *
 * @param {Object} obj
 * @returns {Object}
 */
function removeNulls(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => [k, typeof v === 'object' && !Array.isArray(v) ? removeNulls(v) : v])
  )
}

// ─── Per-project enrichment ───────────────────────────────────────────────────
/**
 * Static metadata that cannot be derived from the generic PROJECTS array.
 * Keyed by project id. Add, update, or remove entries as your portfolio evolves.
 *
 * Fields:
 *  applicationCategory — https://schema.org/applicationCategory
 *                        Use values from: https://www.wikidata.org/wiki/Q7397
 *  operatingSystem     — Comma-separated list of supported OS values
 *  programmingLanguage — Primary languages/frameworks used
 *  softwareVersion     — Latest known version or release label
 *  featureList         — Top-line capabilities (shown in some rich results)
 *  keywords            — SEO keyword string
 *  url                 — Public URL of the deployed app (null = not public)
 */
const PROJECT_META = {
  epass24: {
    applicationCategory: 'MobileApplication',
    operatingSystem: 'Android, iOS, Web',
    programmingLanguage: ['React Native', 'React.js', 'JavaScript', 'TypeScript'],
    softwareVersion: '1.0',
    featureList: [
      'Push Notifications',
      'Deep Linking',
      'PDF Download',
      'Adyen Payment Gateway',
      'Android & iOS Production Deployment',
      'REST API Integration',
    ],
    keywords:
      'EPASS24, React Native app, React.js, Adyen payments, push notifications, deep linking, Android, iOS, enterprise mobile',
    url: null, // replace with live URL when available
  },

  'parkia-pay': {
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    programmingLanguage: ['React.js', 'JavaScript', 'TypeScript'],
    softwareVersion: '1.0',
    featureList: [
      'Adyen Payment Gateway Integration',
      'REST API Workflows',
      'Responsive UI',
      'Performance Optimization',
      'Enterprise User Management',
    ],
    keywords:
      'ParkiaPay, React.js payment app, Adyen integration, Material UI, REST APIs, enterprise payments',
    url: null,
  },

  'logicvalley-website': {
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    programmingLanguage: ['React.js', 'JavaScript'],
    softwareVersion: '1.0',
    featureList: [
      'Admin Portal',
      'Image Optimization',
      'SEO Content Structure',
      'Interactive Animations',
      'Responsive Design',
    ],
    keywords:
      'LogicValley website, React.js website, admin portal, SEO, animations, responsive design',
    url: null,
  },

  kmtoll: {
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    programmingLanguage: ['React.js', 'JavaScript'],
    softwareVersion: '1.0',
    featureList: [
      'Vehicle Tracking',
      'Toll Payment Gateway',
      'REST API Integration',
      'Responsive Dashboard',
      'Operational Management Views',
    ],
    keywords:
      'KMTOLL, toll management, React.js dashboard, vehicle tracking, payment gateway, REST APIs',
    url: null,
  },

  mnps: {
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    programmingLanguage: ['React.js', 'JavaScript'],
    softwareVersion: '1.0',
    featureList: [
      'Vehicle Fine Collection',
      'Payment Gateway Integration',
      'REST API Integration',
      'Responsive UI',
      'Transaction Management',
    ],
    keywords: 'MNPS, vehicle fine collection, React.js, payment gateway, REST APIs, responsive UI',
    url: null,
  },
}

// ─── Author / Creator reference ───────────────────────────────────────────────
/**
 * A compact Person reference that links each SoftwareApplication back to the
 * Person entity defined by buildPersonSchema() (Task 1). Google uses @id
 * to correlate entities across multiple JSON-LD blocks.
 */
const AUTHOR_REF = {
  '@type': 'Person',
  name: SITE.author,
  url: SITE.url,
  email: SITE.email,
}

// ─── Builder ─────────────────────────────────────────────────────────────────

/**
 * buildSoftwareAppSchema()
 *
 * Maps every entry in PROJECTS to a SoftwareApplication schema node and
 * wraps them in a JSON-LD @graph so a single <script> block handles all apps.
 *
 * @returns {Object} JSON-LD object with @context and @graph
 */
export function buildSoftwareAppSchema() {
  const graph = PROJECTS.map((project) => {
    const meta = PROJECT_META[project.id]

    // Projects not listed in PROJECT_META are skipped gracefully.
    if (!meta) return null

    const node = {
      '@type': 'SoftwareApplication',

      // ── Core identity ────────────────────────────────────────────────────
      name: project.title,
      description: project.description,
      image: project.image || null,

      // ── Classification ───────────────────────────────────────────────────
      applicationCategory: meta.applicationCategory,
      operatingSystem: meta.operatingSystem,

      // ── Authorship ───────────────────────────────────────────────────────
      // Both `author` and `creator` point to the same Person.
      // `author` = intellectual author; `creator` = who built it.
      author: AUTHOR_REF,
      creator: AUTHOR_REF,

      // ── Technical details ────────────────────────────────────────────────
      programmingLanguage: meta.programmingLanguage,
      softwareVersion: meta.softwareVersion,

      // ── Discovery signals ────────────────────────────────────────────────
      featureList: meta.featureList,
      keywords: meta.keywords,

      // ── URL ──────────────────────────────────────────────────────────────
      // Only emit url if a real public URL is available.
      url: meta.url || null,
    }

    return removeNulls(node)
  }).filter(Boolean) // remove any null entries from skipped projects

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
