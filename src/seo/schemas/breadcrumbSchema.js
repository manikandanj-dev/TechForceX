/**
 * breadcrumbSchema.js — Schema.org BreadcrumbList JSON-LD builder
 *
 * Produces a BreadcrumbList structured data node that powers Google's
 * breadcrumb rich results — replacing the raw URL in the SERP result with
 * a human-readable navigation trail:
 *
 *   manikandanj.dev › Projects   (instead of https://tech-force-x.vercel.app/projects)
 *
 * Why Breadcrumb Schema IS appropriate for this portfolio:
 *  This portfolio uses React Router v6 with BrowserRouter and REAL, distinct
 *  URL paths for each page (/, /about, /skills, /projects, /experience,
 *  /contact). Each path resolves to a separate crawlable HTML document when
 *  deployed to Vercel. This is NOT a hash-based (#anchor) or pure scroll-based
 *  SPA — each page has a unique canonical URL. BreadcrumbList structured data
 *  is fully appropriate and will be respected by Google.
 *
 * Placement:
 *  Each page injects its own BreadcrumbList via its SEO component's schema prop.
 *  Homepage is intentionally excluded — a single-item breadcrumb [Home] provides
 *  no navigational value and Google will not display it as a rich result.
 *
 * De-duplication:
 *  Pages that already have a schema (Projects → SoftwareApp @graph) merge the
 *  BreadcrumbList into the same @graph via buildPageGraph(). Pages without an
 *  existing schema pass the BreadcrumbList directly as a standalone object.
 *  In both cases exactly ONE <script type="application/ld+json"> is emitted.
 *
 * Reference: https://schema.org/BreadcrumbList
 * Google docs: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */

import { SITE } from '@/seo/seoConfig'

// ─── Route registry ───────────────────────────────────────────────────────────
/**
 * BREADCRUMB_ROUTES
 *
 * The canonical label for each route — the human-readable text Google displays
 * in the breadcrumb trail. Must match the actual <title> / h1 text on the page
 * so Google can confirm the label is accurate.
 *
 * Keys are relative path strings exactly as defined in routes.jsx.
 */
export const BREADCRUMB_ROUTES = {
  '/': 'Home',
  '/about': 'About',
  '/skills': 'Skills',
  '/projects': 'Projects',
  '/experience': 'Experience',
  '/contact': 'Contact',
}

// ─── Builder ─────────────────────────────────────────────────────────────────

/**
 * buildBreadcrumbSchema(routePath)
 *
 * Builds a BreadcrumbList for the given route. The list always starts with
 * Home (position 1) and ends with the current page (position 2).
 *
 * For the homepage ('/') this function returns null — a one-item breadcrumb
 * has no navigational value and Google will not display it as a rich result.
 *
 * @param {string} routePath — Relative route path, e.g. '/about', '/projects'
 * @returns {Object|null} Schema.org BreadcrumbList object, or null for homepage
 *
 * @example
 * buildBreadcrumbSchema('/projects')
 * // → { '@type': 'BreadcrumbList', itemListElement: [ Home, Projects ] }
 */
export function buildBreadcrumbSchema(routePath) {
  // Homepage: single-item breadcrumb — not useful, return null to suppress
  if (routePath === '/') return null

  const pageLabel = BREADCRUMB_ROUTES[routePath]

  // Unrecognised route: return null rather than emit invalid structured data
  if (!pageLabel) return null

  return {
    '@type': 'BreadcrumbList',

    /**
     * itemListElement: ordered array of ListItem nodes.
     *
     * Rules:
     *  - position is 1-indexed and must be sequential.
     *  - item.@id is the absolute URL of the target page.
     *  - name is the human-readable label Google shows in the breadcrumb.
     *  - The last item (current page) should NOT include an `item` property
     *    per schema.org spec — but Google accepts it with the item URL, and
     *    it helps validators confirm the URL is real. We include it for
     *    maximum compatibility.
     */
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: BREADCRUMB_ROUTES['/'],    // 'Home'
        item: SITE.url,                  // 'https://tech-force-x.vercel.app'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageLabel,                              // e.g. 'Projects'
        item: `${SITE.url}${routePath}`,              // absolute URL of current page
      },
    ],
  }
}

/**
 * buildPageGraph(schemaInputs)
 *
 * Merges multiple schema inputs into a single JSON-LD @graph object,
 * producing exactly ONE <script type="application/ld+json"> tag.
 *
 * Handles two input shapes correctly:
 *  1. Plain schema node  e.g. buildBreadcrumbSchema('/projects')
 *     → { '@type': 'BreadcrumbList', ... }
 *  2. Wrapped @graph     e.g. buildSoftwareAppSchema()
 *     → { '@context': '...', '@graph': [node1, node2, ...] }
 *
 * Both shapes are unwrapped and their nodes are flattened into one @graph.
 * This prevents nesting a @graph inside another @graph (invalid JSON-LD).
 *
 * @param {Object[]} schemaInputs — Array of schema objects (either shape)
 * @returns {Object|null} JSON-LD object with @context and @graph, or null if empty
 *
 * @example
 * buildPageGraph([buildSoftwareAppSchema(), buildBreadcrumbSchema('/projects')])
 * // → { '@context': 'https://schema.org', '@graph': [App1, App2, ..., BreadcrumbList] }
 */
export function buildPageGraph(schemaInputs) {
  const flatNodes = []

  for (const input of schemaInputs) {
    if (!input) continue // skip nulls (e.g. buildBreadcrumbSchema('/') returns null)

    if (input['@graph']) {
      // Input is already a @graph wrapper — unwrap and flatten its nodes
      flatNodes.push(...input['@graph'])
    } else {
      // Input is a plain schema node — use it directly
      flatNodes.push(input)
    }
  }

  if (flatNodes.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@graph': flatNodes,
  }
}
