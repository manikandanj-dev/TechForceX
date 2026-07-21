/**
 * webSiteSchema.js — Schema.org WebSite JSON-LD builder
 *
 * Produces a WebSite structured data node that tells Google:
 *  1. The canonical name and URL of this website.
 *  2. Who publishes it (linked back to the Person entity from Task 1).
 *  3. The content language — used for locale-targeted search results.
 *
 * Why no SearchAction?
 *  The portfolio uses client-side React state filtering inside the Projects
 *  page (useState + useMemo). There is no server-side search endpoint and no
 *  URL query parameter (e.g. /search?q=...). Adding SearchAction with a fake
 *  URL violates Google's structured data guidelines and risks a manual action.
 *  It is intentionally omitted until a real server-side search exists.
 *
 * De-duplication strategy:
 *  This schema is designed to be merged with buildPersonSchema() into a single
 *  JSON-LD @graph on the homepage (Home/index.jsx). That way both types share
 *  one <script type="application/ld+json"> tag — zero duplicate blocks.
 *
 *  Fields NOT repeated here (already covered by Person schema):
 *   - author name / email / image / sameAs / knowsAbout / jobTitle
 *   - description (the Person node owns the personal bio)
 *
 * Reference: https://schema.org/WebSite
 */

import { SITE } from '@/seo/seoConfig'
import { SCHEMA_IDS } from '@/seo/schemas/organizationSchema'

/**
 * buildWebSiteSchema()
 *
 * Returns a plain JavaScript object representing the WebSite schema node.
 * It is intended to be combined with buildPersonSchema() inside a @graph
 * array — see buildHomePageGraph() in Home/index.jsx.
 *
 * @returns {Object} Schema.org WebSite object
 */
export function buildWebSiteSchema() {
  return {
    // ── Entity identifier ─────────────────────────────────────────────────
    /**
     * @id: stable IRI for this WebSite entity.
     * Allows other nodes to reference the site without repeating its fields.
     */
    '@id': SCHEMA_IDS.website,
    '@type': 'WebSite',

    // ── Identity ──────────────────────────────────────────────────────────────
    /**
     * name: the primary display name of the website.
     * Google uses this for the Sitelinks name strip.
     */
    name: SITE.name, // 'Manikandan J'

    /**
     * alternateName: a secondary name / tagline Google can use.
     * Keeps it distinct from the Person.name to avoid duplication.
     */
    alternateName: 'Manikandan J — React.js & React Native Portfolio',

    /**
     * url: the canonical root URL.
     * Must exactly match the canonical declared in <link rel="canonical">.
     */
    url: SITE.url, // 'https://tech-force-x.vercel.app'

    /**
     * description: a site-level description focused on what the SITE is,
     * not a personal bio (that belongs to the Person node).
     */
    description:
      'Portfolio website of Manikandan J, showcasing enterprise React.js and React Native projects, technical skills, and professional experience.',

    // ── Locale ───────────────────────────────────────────────────────────────
    /**
     * inLanguage: BCP 47 language tag.
     * Aligns with the og:locale value in seoConfig (en_IN → en-IN in BCP 47).
     */
    inLanguage: 'en-IN',

    // ── Publisher ───────────────────────────────────────────────────
    /**
     * publisher: upgraded from an inline Person object to an @id reference.
     * Google resolves the full Person node from the @graph using this IRI —
     * no Person fields need to be repeated here.
     */
    publisher: {
      '@id': SCHEMA_IDS.person,
    },
  }
}
