const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
}

export function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => htmlEntities[character])
}

export function highlightCode(code) {
  const tokenPattern =
    /('[^']*'|"[^"]*"|`[^`]*`)|\b(const|let|var|function|return|import|export|from|if|else|true|false|null)\b|\b(\d+)\b/g
  let cursor = 0
  let highlighted = ''

  for (const match of code.matchAll(tokenPattern)) {
    highlighted += escapeHtml(code.slice(cursor, match.index))
    const token = escapeHtml(match[0])

    if (match[1]) {
      highlighted += `<span class="token-string">${token}</span>`
    } else if (match[2]) {
      highlighted += `<span class="token-keyword">${token}</span>`
    } else {
      highlighted += `<span class="token-number">${token}</span>`
    }

    cursor = match.index + match[0].length
  }

  return highlighted + escapeHtml(code.slice(cursor))
}

function renderInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

function renderTextBlock(block) {
  const lines = block.split('\n')
  const html = []
  let listItems = []

  const flushList = () => {
    if (!listItems.length) return
    html.push(
      `<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`
    )
    listItems = []
  }

  lines.forEach((line) => {
    if (line.startsWith('- ')) {
      listItems.push(line.slice(2))
      return
    }

    flushList()
    if (line.trim()) {
      html.push(`<p>${renderInlineMarkdown(line)}</p>`)
    }
  })

  flushList()
  return html.join('')
}

export function renderMarkdown(markdown) {
  return markdown
    .split(/```([\w-]*)\n([\s\S]*?)```/g)
    .map((part, index, parts) => {
      if (index % 3 === 1) return ''
      if (index % 3 === 2) {
        const language = parts[index - 1] || 'code'
        return `<pre data-language="${escapeHtml(language)}"><code>${highlightCode(part.trim())}</code></pre>`
      }
      return renderTextBlock(part.trim())
    })
    .join('')
}
