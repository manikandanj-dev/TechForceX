/**
 * SEO Component
 *
 * A drop-in component that injects per-page meta tags into <head>
 * using react-helmet-async. Place it as the FIRST child inside each
 * page component's return statement.
 *
 * Props:
 *  title       (string)  — Page <title>. Appended with site name.
 *  description (string)  — Meta description (max 160 chars).
 *  canonical   (string)  — Relative URL path, e.g. "/projects"
 *  ogTitle     (string)  — Open Graph title (falls back to title)
 *  ogDesc      (string)  — Open Graph description (falls back to description)
 *  ogImage     (string)  — Absolute OG image URL (falls back to site default)
 *  noIndex     (boolean) — When true, adds noindex,nofollow robots tag
 *  schema      (object)  — Optional Schema.org JSON-LD object (e.g. Person).
 *                          Serialised and injected as <script type="application/ld+json">.
 *                          Pass the result of buildPersonSchema() or similar builder.
 *
 * Usage:
 *  import { SEO } from '@components/SEO'
 *  import { buildPersonSchema } from '@/seo/schemas/personSchema'
 *  <SEO title="Home" description="..." canonical="/" schema={buildPersonSchema()} />
 */

import { Helmet } from 'react-helmet-async'
import { SITE } from '@/seo/seoConfig'

export function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDesc,
  ogImage,
  ogImageAlt,
  noIndex = false,
  schema = null,
  lang = 'en',
}) {
  const resolvedTitle = title || SITE.title
  const resolvedDescription = description || SITE.description
  const resolvedOgTitle = ogTitle || resolvedTitle
  const resolvedOgDesc = ogDesc || resolvedDescription
  const resolvedOgImage = ogImage || SITE.ogImage
  const resolvedCanonical = canonical ? `${SITE.url}${canonical}` : SITE.url
  const resolvedOgLocale = lang === 'da' ? 'da_DK' : (SITE.locale || 'en_IN')
  const resolvedOgImageAlt = ogImageAlt || `${SITE.author} — Software Engineer`

  return (
    <Helmet>
      <html lang={lang} />
      {/* ── Primary Meta ── */}
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="author" content={SITE.author} />
      <meta name="theme-color" content={SITE.themeColor} />

      {/* ── Robots ── */}
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
      )}

      {/* ── Canonical URL ── */}
      <link rel="canonical" href={resolvedCanonical} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedOgImageAlt} />
      <meta property="og:locale" content={resolvedOgLocale} />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitterHandle} />
      <meta name="twitter:creator" content={SITE.twitterHandle} />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* ── Structured Data (JSON-LD) ── */}
      {/*
       * react-helmet-async renders <script> children as-is inside <head>.
       * JSON.stringify with no replacer and no space keeps the payload compact.
       * dangerouslySetInnerHTML is required because Helmet does not allow
       * plain text children inside <script> tags.
       */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Helmet>
  )
}

export default SEO
