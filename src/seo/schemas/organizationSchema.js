/**
 * organizationSchema.js — Schema.org Organization JSON-LD builder
 *
 * Represents Manikandan J as a self-employed software engineering entity
 * (freelance / independent consultant) using schema.org/Organization.
 * This is valid and recommended by Google for sole-trader / self-employed
 * professionals who operate under their own brand.
 *
 * Why Organization alongside Person?
 *  - The Person schema (Task 1) describes WHO Manikandan J is.
 *  - The Organization schema describes the PROFESSIONAL ENTITY through which
 *    he delivers work — a distinct but related concept in the Knowledge Graph.
 *  - Google uses the relationship between Person.worksFor and
 *    Organization.founder to strengthen entity confidence and authority.
 *
 * @id / cross-entity linking strategy:
 *  Every node declares a stable @id (a URL used as a unique IRI). This lets
 *  other nodes reference this Organisation by @id alone, without repeating
 *  its full data. The pattern used across this @graph:
 *
 *    Person    @id  →  https://tech-force-x.vercel.app/#person
 *    WebSite   @id  →  https://tech-force-x.vercel.app/#website
 *    Organization @id → https://tech-force-x.vercel.app/#organization
 *
 *  These are hash-based IRIs anchored to the canonical domain — the
 *  recommended format from Google's structured data documentation.
 *
 * De-duplication:
 *  Fields already declared on the Person node (@id reference, name, email,
 *  image, jobTitle, knowsAbout, sameAs) are NOT repeated here. The @id
 *  reference in founder points Google to the full Person node.
 *
 * Reference: https://schema.org/Organization
 */

import { SITE } from '@/seo/seoConfig'

// ─── Stable IRIs (used across all schema files) ──────────────────────────────
/**
 * SCHEMA_IDS
 *
 * Centralised IRI constants shared across all schema builders.
 * Export them so personSchema.js and webSiteSchema.js can import the same
 * values — one source of truth, no string drift.
 *
 * Format: <canonical-url>/#<entity-slug>
 * The fragment (#) makes these non-dereferenceable by default, which is
 * intentional — they are identifiers, not navigation URLs.
 */
export const SCHEMA_IDS = {
  person: `${SITE.url}/#person`,
  website: `${SITE.url}/#website`,
  organization: `${SITE.url}/#organization`,
}

/**
 * buildOrganizationSchema()
 *
 * Returns a plain JavaScript object for the Organization node.
 * Designed to be included in the homepage @graph alongside Person and WebSite.
 *
 * @returns {Object} Schema.org Organization object (no @context — shared by @graph)
 */
export function buildOrganizationSchema() {
  return {
    // ── Entity identifier ────────────────────────────────────────────────────
    /**
     * @id: a stable, unique IRI for this Organisation.
     * Other nodes reference this entity via { "@id": SCHEMA_IDS.organization }
     * instead of repeating all Organisation fields.
     */
    '@id': SCHEMA_IDS.organization,
    '@type': 'Organization',

    // ── Identity ─────────────────────────────────────────────────────────────
    /**
     * name: the trading / brand name of the professional entity.
     * Intentionally the same as SITE.name because this is a personal brand.
     */
    name: SITE.name, // 'Manikandan J'

    /**
     * alternateName: a descriptive subtitle distinguishing the Organisation
     * from the Person entity in the Knowledge Graph.
     */
    alternateName: 'Manikandan J — React.js & React Native Software Engineer',

    /**
     * url: the organisation's canonical web presence.
     */
    url: SITE.url,

    // ── Branding ─────────────────────────────────────────────────────────────
    /**
     * logo: Google uses this for branded SERP results and Knowledge Panels.
     * Must be an absolute URL. Points to the OG image until a dedicated
     * square logo is available.
     *
     * For best results replace with a dedicated 112×112 px square logo PNG.
     */
    logo: {
      '@type': 'ImageObject',
      url: SITE.ogImage,
      width: 1200,
      height: 630,
    },

    /**
     * image: the primary visual representation of the organisation.
     * Using the OG image (1200×630) here for social / rich result display.
     */
    image: SITE.ogImage,

    // ── Description ──────────────────────────────────────────────────────────
    /**
     * description: organisation-focused summary.
     * Distinct from Person.description (personal bio) and
     * WebSite.description (what the website shows).
     */
    description:
      'Independent software engineering entity specialising in enterprise React.js and React Native application development, payment gateway integration, and scalable frontend architecture.',

    // ── Contact ──────────────────────────────────────────────────────────────
    /**
     * email: public business contact email.
     */
    email: SITE.email,

    // ── Founding ─────────────────────────────────────────────────────────────
    /**
     * foundingDate: the year professional software engineering work began.
     * Derived from 4.7+ years of experience as of 2026.
     * Adjust to the exact year your independent / freelance practice started.
     */
    foundingDate: '2021',

    // ── Founder ──────────────────────────────────────────────────────────────
    /**
     * founder: references the Person entity via @id.
     * Google resolves the full Person node from the @graph using this IRI.
     * No Person fields are repeated here — the @id reference is sufficient.
     */
    founder: {
      '@id': SCHEMA_IDS.person,
    },

    // ── Social / sameAs ──────────────────────────────────────────────────────
    /**
     * sameAs: authoritative profile URLs for the Organisation.
     * These mirror the Person.sameAs values because the brand and person
     * share the same social presence. Google treats them as corroborating
     * signals on both entities.
     *
     * Update with real profile URLs before deploying.
     */
    sameAs: [
      'https://www.linkedin.com/in/manikandanj-dev',
      'https://github.com/manikandanj-dev',
      `https://twitter.com/${SITE.twitterHandle.replace('@', '')}`,
      SITE.url, // the portfolio itself as a canonical web presence
    ],

    // ── Contact Point ────────────────────────────────────────────────────────
    /**
     * contactPoint: structured contact information.
     * contactType values recognised by Google: "customer support",
     * "technical support", "billing support", "bill payment",
     * "order support", "reservations", "sales", "credit card support".
     * For a freelance engineer, "technical support" is the closest match.
     */
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      email: SITE.email,
      availableLanguage: ['English'],
    },
  }
}
