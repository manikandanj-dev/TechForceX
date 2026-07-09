import Box from '@mui/material/Box'
import { renderMarkdown } from '../utils/markdown'

export function MarkdownMessage({ content }) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      sx={{
        '& p': { m: 0, mb: 1.1, lineHeight: 1.72 },
        '& p:last-child': { mb: 0 },
        '& ul': { my: 1, pl: 3 },
        '& li': { mb: 0.5 },
        '& code': {
          px: 0.6,
          py: 0.2,
          borderRadius: 1,
          bgcolor: 'action.hover',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '0.88em',
        },
        '& pre': {
          m: 0,
          mt: 1.5,
          mb: 1.5,
          p: 2,
          overflowX: 'auto',
          borderRadius: 2,
          bgcolor: '#111827',
          color: '#e5e7eb',
          position: 'relative',
        },
        '& pre::before': {
          content: 'attr(data-language)',
          display: 'block',
          color: '#93c5fd',
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: 0,
          mb: 1,
        },
        '& pre code': { p: 0, bgcolor: 'transparent', color: 'inherit' },
        '& .token-keyword': { color: '#93c5fd' },
        '& .token-string': { color: '#86efac' },
        '& .token-number': { color: '#fbbf24' },
      }}
    />
  )
}

export default MarkdownMessage
