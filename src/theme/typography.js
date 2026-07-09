export const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: { fontWeight: 700, fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' },
  h2: { fontWeight: 700, fontSize: 'clamp(1.9rem, 3vw, 2.75rem)' },
  h3: { fontWeight: 600, fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)' },
  h4: { fontWeight: 600, fontSize: 'clamp(1.3rem, 2vw, 1.75rem)' },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  button: { textTransform: 'none', fontWeight: 600 },
}
