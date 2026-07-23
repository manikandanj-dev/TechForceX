/**
 * personSchema.js — Schema.org Person JSON-LD builder
 *
 * Builds a production-ready Person structured data object conforming to
 * https://schema.org/Person. This is injected via react-helmet-async as a
 * <script type="application/ld+json"> tag so search engines can parse it
 * without executing JavaScript.
 *
 * Design decisions:
 *  - Pure function: no side effects, easy to test and extend.
 *  - All values are sourced from SITE (seoConfig.js) to maintain a single
 *    source of truth. No duplication.
 *  - The schema is intentionally narrow (Person, not WebSite) to avoid
 *    conflation; WebSite/WebPage schemas will be added in a later phase.
 *  - Optional fields (sameAs, alumniOf, etc.) are included but filled with
 *    values from SITE so they are immediately usable. Replace placeholder
 *    values with real ones as they become available.
 *
 * Reference: https://schema.org/Person
 */

import { SITE } from '@/seo/seoConfig'
import { SCHEMA_IDS } from '@/seo/schemas/organizationSchema'

/**
 * buildPersonSchema()
 *
 * Returns a plain JavaScript object representing the Person schema.
 * Stringify it with JSON.stringify() before embedding in <script>.
 *
 * @returns {Object} Schema.org Person object
 */
export function buildPersonSchema() {
  return {
    // ── Entity identifier ────────────────────────────────────────────────────
    /**
     * @id: stable IRI for this Person entity.
     * Other nodes (e.g. Organization.founder, WebSite.publisher) reference
     * this entity via { "@id": SCHEMA_IDS.person } instead of repeating
     * all Person fields.
     */
    '@id': SCHEMA_IDS.person,
    '@type': 'Person',

    // ── Identity ─────────────────────────────────────────────────────────────
    /** Full legal / display name of the person. */
    name: SITE.author, // 'Manikandan J'

    /** Canonical URL of the portfolio website — used as the Person's web page. */
    url: SITE.url, // 'https://tech-force-x.vercel.app'

    /** Profile image displayed in Knowledge Panel / rich results. */
    image: SITE.ogImage, // absolute OG image URL

    /** Short professional summary (reuses the site-level description). */
    description: SITE.description,

    // ── Contact ──────────────────────────────────────────────────────────────
    /** Public business email address. */
    email: SITE.email, // 'manikandanj.dev@gmail.com'

    // ── Profession ───────────────────────────────────────────────────────────
    /**
     * jobTitle: the headline a recruiter or search engine sees.
     * Keep it concise and keyword-rich.
     */
    jobTitle: 'Software Engineer — React.js & React Native',

    /**
     * IMPL-04: knowsAbout expanded with topical concepts alongside tool names.
     *
     * Tool names alone (React.js, TypeScript) link to product entities in the
     * Knowledge Graph. Topical concepts ('Frontend Architecture', 'Mobile
     * Application Development') build SUBJECT-MATTER authority — the signal
     * that tells Google and AI assistants "this person is an authority on these
     * topics", not just "this person uses these tools."
     *
     * AI assistants (ChatGPT, Perplexity, Gemini) use knowsAbout when deciding
     * whether to recommend a practitioner for domain questions like:
     *   "Who can I hire for mobile application development?"
     *   "Who knows about payment gateway integration?"
     *
     * Tools are kept to maintain cross-links to product entities in the graph.
     */
    knowsAbout: [
      // ── Core Frameworks ──────────────────────────────────────────────────
      'React.js',
      'React Native',
      // ── Languages ────────────────────────────────────────────────────────
      'TypeScript',
      'JavaScript',
      // ── Topical Concepts — subject-matter authority signals ───────────────
      'Frontend Architecture',
      'Component-Based Architecture',
      'Performance Optimization',
      'Mobile Application Development',
      'Cross-Platform Development',
      'Enterprise Software Development',
      'Payment Gateway Integration',
      'State Management',
      'API Integration',
      'Software Engineering Best Practices',
      // ── Tools & Libraries ─────────────────────────────────────────────────
      'Material UI',
      'Adyen Payment Gateway',
      'REST APIs',
      'Zustand',
      'Redux Toolkit',
      'Azure DevOps',
    ],

    // ── Social / sameAs ───────────────────────────────────────────────────────
    /**
     * sameAs: array of authoritative profile URLs that confirm identity.
     * Google uses these to build the Knowledge Graph entity for this person.
     * Update with real profile URLs; remove any that do not exist.
     */
    sameAs: [
      // LinkedIn — replace with your actual LinkedIn profile URL
      'https://www.linkedin.com/in/manikandanj-dev',
      // GitHub — replace with your actual GitHub profile URL
      'https://github.com/manikandanj-dev',
      // Twitter / X
      `https://twitter.com/${SITE.twitterHandle.replace('@', '')}`,
    ],

    // ── Professional association ──────────────────────────────────────────────
    /**
     * worksFor: references the Organization entity via @id.
     * Google resolves the full Organisation node from the @graph.
     * Establishes the Person–Organisation relationship without data duplication.
     */
    worksFor: {
      '@id': SCHEMA_IDS.organization,
    },
  }
}
