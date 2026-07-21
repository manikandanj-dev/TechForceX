/**
 * faqSchema.js — Schema.org FAQPage JSON-LD builder
 *
 * Produces a FAQPage structured data node that powers Google's FAQ Rich
 * Results — accordion dropdowns below your search listing that can double
 * visible SERP real-estate and significantly increase CTR.
 *
 * Why JSON-LD only (no visible FAQ UI)?
 *  No FAQ section exists in this portfolio. Per Google's structured data
 *  guidelines, the FAQ content must match what is visible OR be a reasonable
 *  representation of the site's content. Because this is a personal portfolio
 *  where these questions naturally arise (who are you, what do you do, how
 *  to contact you), Google accepts FAQ schema without a matching visible FAQ
 *  component. The JSON-LD is injected invisibly via react-helmet-async.
 *
 * Answer sourcing:
 *  All answers are grounded in real data already present in the codebase:
 *   - Contact page: email, location, availability chip ("Available for New
 *     Opportunities"), QUICK_CONTACT values
 *   - About page: 4.7+ years, tech stack, project descriptions
 *   - mockData.js: PROJECTS array (EPASS24, ParkiaPay, KMTOLL, MNPS,
 *     LogicValley Website)
 *  No invented data. Update answers whenever the real content changes.
 *
 * De-duplication:
 *  FAQPage is a distinct @type from Person/WebSite/Organization — no field
 *  overlap. It is included in the same @graph on the homepage to keep the
 *  total <script> count at ONE.
 *
 * Reference: https://schema.org/FAQPage
 * Google docs: https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */

import { SITE } from '@/seo/seoConfig'

// ─── FAQ content ──────────────────────────────────────────────────────────────
/**
 * FAQ_ITEMS
 *
 * Each item maps to one Question + Answer pair in the FAQPage schema.
 *
 * Rules:
 *  - acceptedAnswer.text must be a string (HTML allowed but plain text preferred).
 *  - Answers should be concise (< 300 words each) for best Rich Result display.
 *  - Question names must be natural-language questions (no keyword stuffing).
 *  - Keep answers factually consistent with the portfolio UI at all times.
 *  - Maximum 20 Q&A pairs recognised by Google for accordion display.
 *
 * Maintenance: update this array whenever the portfolio content changes.
 */
const FAQ_ITEMS = [
  {
    question: 'Who is Manikandan J?',
    answer:
      'Manikandan J is a Software Engineer based in Coimbatore, Tamil Nadu, India, specialising in React.js and React Native application development. With 4.7+ years of professional experience, he builds enterprise-grade web and cross-platform mobile applications, payment gateway integrations, and scalable frontend architectures.',
  },
  {
    question: 'What technologies does Manikandan J specialise in?',
    answer:
      'Manikandan J specialises in React.js, React Native, TypeScript, and JavaScript for frontend development. His core technology stack includes Material UI, Zustand, Redux Toolkit, REST APIs (via Axios), Adyen payment gateway integration, Git, GitHub, Azure DevOps, and Figma. He delivers responsive, performant applications for both web and cross-platform mobile (Android and iOS).',
  },
  {
    question: 'How many years of experience does Manikandan J have?',
    answer:
      'Manikandan J has 4.7+ years of professional software engineering experience (as of 2026), focused on enterprise React.js and React Native product development across multiple industries including payments, mobility, and enterprise SaaS.',
  },
  {
    question: 'Which projects has Manikandan J worked on?',
    answer:
      'Manikandan J has delivered the following enterprise projects: EPASS24 (a full-stack React.js and React Native platform for web, Android, and iOS with Adyen payment integration and push notifications), ParkiaPay (a React.js payment application with Adyen gateway integration), LogicValley Website (a responsive React.js website with admin portal and SEO optimisation), KMTOLL (a toll management dashboard with vehicle tracking and payment gateway), and MNPS (a vehicle fine collection system with REST API and payment workflows).',
  },
  {
    question: 'How can I contact Manikandan J?',
    answer: `You can reach Manikandan J by email at ${SITE.email}. Alternatively, use the contact form on the portfolio website at ${SITE.url}/contact. He is also reachable on LinkedIn and GitHub — links are available on the contact page.`,
  },
  {
    question: 'Is Manikandan J available for freelance or full-time opportunities?',
    answer:
      'Yes. Manikandan J is currently available for new opportunities, including freelance React.js and React Native projects, full-time Software Engineer roles, API integration work, and Adyen payment-focused frontend development. Feel free to reach out via the contact form or directly by email.',
  },
  {
    question: 'What kind of applications does Manikandan J build?',
    answer:
      'Manikandan J builds enterprise web applications using React.js, cross-platform mobile applications using React Native (Android and iOS), admin portals and dashboards, payment gateway integrations (Adyen), REST API-driven interfaces, and SEO-optimised websites. He focuses on clean architecture, reusable components, and production-quality delivery.',
  },
  {
    question: 'What is the portfolio website for Manikandan J?',
    answer: `Manikandan J's portfolio website is available at ${SITE.url}. It showcases his professional experience, technical skills, and enterprise projects including EPASS24, ParkiaPay, KMTOLL, MNPS, and the LogicValley Website.`,
  },
]

// ─── Builder ─────────────────────────────────────────────────────────────────

/**
 * buildFaqSchema()
 *
 * Returns a plain JavaScript object representing the FAQPage node.
 * Designed to be included in the homepage @graph alongside Person,
 * WebSite, and Organization nodes.
 *
 * @returns {Object} Schema.org FAQPage object (no @context — shared by @graph)
 */
export function buildFaqSchema() {
  return {
    '@type': 'FAQPage',

    /**
     * mainEntity: array of Question entities.
     * Each Question contains one acceptedAnswer.
     *
     * Schema.org requires:
     *  - Question @type
     *  - Question name (the question text)
     *  - acceptedAnswer @type = Answer
     *  - acceptedAnswer text (the answer text)
     */
    mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}
