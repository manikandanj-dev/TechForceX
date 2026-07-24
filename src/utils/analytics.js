/**
 * Safely sends custom event tracking to Google Analytics 4 (gtag.js).
 *
 * @param {string} eventName - GA4 event name.
 * @param {Object} eventParams - Custom parameters accompanying the event.
 */
export function trackGAEvent(eventName, eventParams = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams)
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('GA4 Event Tracking error:', error)
    }
  }
}

/**
 * Tracks resume download events in GA4.
 *
 * @param {string} pageName - Name of the page/component where the download was triggered.
 * @param {string} [resumeName='Manikandan_J_Resume.pdf'] - Name of the downloaded resume file.
 */
export function trackResumeDownload(pageName, resumeName = 'Manikandan_J_Resume.pdf') {
  trackGAEvent('resume_download', {
    page_name: pageName,
    resume_name: resumeName,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Tracks social link clicks (LinkedIn, GitHub, Email) in GA4.
 *
 * @param {'linkedin' | 'github' | 'email'} type - Type of social link clicked.
 * @param {string} destination - Target URL or email address.
 * @param {string} pageName - Name of the page/component where the click occurred.
 */
export function trackSocialClick(type, destination, pageName) {
  const eventName = `${type.toLowerCase()}_click`
  trackGAEvent(eventName, {
    destination,
    page_name: pageName,
    timestamp: new Date().toISOString(),
  })
}
