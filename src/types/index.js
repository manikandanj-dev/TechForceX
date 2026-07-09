/**
 * Shared JSDoc typedefs used across the app for lightweight type-checking
 * in a JavaScript (non-TypeScript) codebase.
 */

/**
 * @typedef {Object} NavLink
 * @property {string} label
 * @property {string} path
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} tags
 * @property {string} [category]
 * @property {number} [year]
 * @property {string} [repoUrl]
 * @property {string} [demoUrl]
 * @property {string} [image]
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} title
 * @property {string} excerpt
 * @property {string} date
 * @property {string} [image]
 */

/**
 * @typedef {Object} ExperienceItem
 * @property {string} id
 * @property {string} role
 * @property {string} company
 * @property {string} period
 * @property {string} description
 */

/**
 * @typedef {Object} ContactFormValues
 * @property {string} name
 * @property {string} email
 * @property {string} message
 */

export {}
