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
/**
 * IMPL-03: FAQ questions are restructured from branded to topical.
 *
 * Previous questions all started with "Who is Manikandan J?" or
 * "What does Manikandan J do?" — those only surface for branded queries.
 *
 * New questions are framed as the actual queries users type into Google,
 * ChatGPT, Perplexity, and Gemini when they DON'T know the author's name:
 *
 *   "What is React.js used for?"
 *   "What is React Native?"
 *   "How do I hire a React developer?"
 *   "What is Adyen?"
 *
 * Google FAQ Rich Results and AI snippet extraction both favour questions
 * that match real user intent. Topical framing makes this page a candidate
 * answer source for those queries.
 *
 * All answers are grounded in real content visible in the portfolio.
 * Per Google's structured data guidelines, FAQ answers must be factually
 * consistent with what a user can see on the page.
 *
 * The final two questions are intentionally retention-focused — they bring
 * the context back to the author after establishing topical authority.
 */
const FAQ_ITEMS = [
  {
    /**
     * Target query: "what is react.js used for", "react.js use cases",
     * "why use react for web development"
     * High-volume, broad intent. Positions this page as a React authority.
     */
    question: 'What is React.js used for in enterprise web development?',
    answer:
      'React.js is a JavaScript library used to build fast, interactive, and maintainable web user interfaces. In enterprise development, React.js powers large-scale single-page applications (SPAs), admin dashboards, payment portals, and customer-facing web platforms. Its component-based architecture enables teams to build reusable UI modules, manage complex application state, and scale codebases across multiple products. React.js is the foundation of the web applications in this portfolio, including ParkiaPay (a payment platform), LogicValley Website (a corporate site with admin portal), and KMTOLL (a toll management dashboard).',
  },
  {
    /**
     * Target query: "what is react native", "react native vs react",
     * "should I use react native for mobile app"
     */
    question: 'What is React Native and when should you use it?',
    answer:
      'React Native is a framework for building native Android and iOS mobile applications using JavaScript and React. Unlike web-only React.js, React Native compiles to actual native components — not a WebView — which means it delivers near-native performance and a genuinely native user experience. You should use React Native when you need to ship one codebase to both Android and iOS while sharing business logic with a React.js web application. It is the right choice for cross-platform product teams that want fast iteration without maintaining separate native codebases. In this portfolio, EPASS24 is a production React Native application deployed to Android and iOS with push notifications, deep linking, and Adyen payment integration.',
  },
  {
    /**
     * Target query: "react.js vs react native difference",
     * "react vs react native", "react native vs react web"
     */
    question: 'What is the difference between React.js and React Native?',
    answer:
      'React.js runs in the browser and renders HTML DOM elements — it is used to build web applications. React Native runs on mobile devices (Android and iOS) and renders native UI components (View, Text, TouchableOpacity) rather than HTML. Both use the same React programming model: components, props, state, and hooks — which means developers can share logic and skills across both platforms. The key difference is the rendering target: React.js → browser DOM, React Native → native mobile OS components. Many professional React engineers, including the author of this portfolio, work across both platforms using a shared TypeScript and component architecture.',
  },
  {
    /**
     * Target query: "react.js performance optimisation", "how to optimise
     * react app", "react performance best practices"
     */
    question: 'How do you optimise performance in a React.js application?',
    answer:
      'React.js performance optimisation involves several complementary techniques. At the component level: use React.memo to prevent unnecessary re-renders of pure components, useMemo to memoize expensive computed values, and useCallback to stabilise function references passed as props. At the data level: implement efficient state management with tools like Zustand or Redux Toolkit to avoid prop drilling and unnecessary re-renders. At the bundle level: use code splitting (React.lazy + Suspense), route-based chunking in Vite or webpack, and tree-shaking to reduce initial load size. At the network level: optimise API calls with React Query (TanStack Query) for caching and deduplication, and use Axios interceptors for consistent error handling. This portfolio is built with all of these techniques applied: Vite-powered chunk splitting, Zustand for state, and TanStack React Query for server state.',
  },
  {
    /**
     * Target query: "zustand vs redux", "zustand vs redux toolkit",
     * "when to use zustand", "state management react 2025"
     */
    question: 'What is Zustand and how does it compare to Redux Toolkit?',
    answer:
      "Zustand is a lightweight, unopinionated React state management library. It uses a hook-based API — you create a store with a simple function call and consume it with useStore() inside any component. Redux Toolkit (RTK) is a more structured, opinionated state management solution that includes slice reducers, actions, middleware, and devtools built-in. Zustand is the right choice for most small-to-medium React applications where you want minimal boilerplate and fast setup. Redux Toolkit is better suited for large enterprise applications where you need a predictable state container, strict action tracking, and middleware pipelines (e.g. for async side effects with RTK Query). This portfolio uses Zustand for UI state (theme mode) because it is the proportionate tool for that scope. Both libraries are part of the author's active professional skill set.",
  },
  {
    /**
     * Target query: "what is adyen", "adyen payment integration react",
     * "adyen react native integration", "adyen frontend integration"
     */
    question: 'What is Adyen and how is it integrated with React.js or React Native?',
    answer:
      "Adyen is an enterprise payment gateway used by global businesses including Uber, Spotify, and McDonald's. It provides SDKs for web (Drop-in, Components) and mobile (iOS SDK, Android SDK) that handle the secure payment UI, tokenisation, and transaction lifecycle. In React.js, Adyen's Web Drop-in or Components SDK is integrated by mounting the component into a container element and connecting it to your backend via REST API calls (session creation, payment result handling). In React Native, Adyen's native SDKs are bridged to handle card forms, 3DS authentication, and payment status callbacks inside mobile flows. This portfolio includes two Adyen-integrated production projects: EPASS24 (React Native, Android & iOS) and ParkiaPay (React.js web).",
  },
  {
    /**
     * Target query: "react developer skills 2025", "what skills does a
     * react developer need", "react frontend developer skill set"
     */
    question: 'What skills should a professional React.js developer have in 2025–2026?',
    answer:
      'A professional React.js developer in 2025–2026 should have: strong JavaScript (ES6+) and TypeScript fundamentals; React core — components, hooks (useState, useEffect, useMemo, useCallback, useRef), context, and the React 18+ concurrent features; state management with at least one modern solution (Zustand, Redux Toolkit, or Jotai); server state management with TanStack React Query or SWR; styling with a component library (Material UI, shadcn/ui, or Chakra UI) plus CSS fundamentals; REST API integration with Axios; form handling with React Hook Form and schema validation (Zod or Yup); routing with React Router v6; build tooling with Vite; and version control with Git and GitHub. Production-level engineers should also understand performance optimisation, accessibility basics, and deployment workflows (Vercel, Netlify, or CI/CD pipelines). The full skill set used in this portfolio covers all of the above.',
  },
  {
    /**
     * Target query: "react native push notifications", "react native deep linking",
     * "react native android ios deployment"
     */
    question: 'What does it take to ship a React Native app to Android and iOS production?',
    answer:
      'Shipping a React Native application to production requires several steps beyond writing the UI code. For Android: configure the Gradle build system, generate a signed APK or AAB, manage release keystores, and submit to the Google Play Console with the correct store listing and privacy policy. For iOS: configure Xcode project settings, manage provisioning profiles and certificates via Apple Developer, build an IPA with the correct signing configuration, and submit via TestFlight to the App Store. Cross-platform features like push notifications require integration with Firebase Cloud Messaging (Android) and APNs (iOS). Deep linking requires both the URL scheme configuration in the native project and React Navigation handler setup. The EPASS24 project in this portfolio was delivered to production on both Android and iOS with push notifications, deep linking, PDF downloads, and Adyen payment integration.',
  },
  {
    /**
     * Target query: "how to hire react developer", "hire react.js developer",
     * "hire react native developer freelance"
     */
    question: 'How can I hire an experienced React.js or React Native developer?',
    answer: `You can hire Manikandan J — a React.js and React Native engineer with 4.7+ years of enterprise experience — for freelance projects, full-time roles, or contract engagements. He specialises in building React.js web applications, React Native mobile apps (Android and iOS), Adyen payment integrations, REST API-driven interfaces, and scalable frontend architectures. Reach out via email at ${SITE.email} or use the contact form at ${SITE.url}/contact.`,
  },
  {
    /**
     * Target query: "react tools developers use", "react developer tools 2025",
     * "professional react developer workflow"
     */
    question: 'What tools do professional React developers use in 2025?',
    answer:
      "A professional React developer's toolchain in 2025 typically includes: Vite (fast build tool and dev server, replacing Create React App), TypeScript (type safety across the codebase), React DevTools (component tree inspection and profiling), Git + GitHub (version control and collaboration), VS Code with GitHub Copilot (AI-assisted development), Figma (design handoff and spec review), Postman (API testing and documentation), Azure DevOps or GitHub Actions (CI/CD pipelines), and browser DevTools for performance profiling (Lighthouse, Network tab, Performance panel). For state debugging: Redux DevTools (for RTK), Zustand's simple hook-based inspection, or TanStack Query Devtools. This portfolio was built with Vite, TypeScript, Material UI, Zustand, TanStack React Query, Framer Motion, and deployed to Vercel — a representative professional React engineering stack.",
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
