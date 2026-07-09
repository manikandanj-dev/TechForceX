export const CHAT_THREADS = [
  {
    id: 'product-launch',
    title: 'Launch analytics plan',
    preview: 'Summarize the launch metrics and risks',
    updatedAt: 'Today',
  },
  {
    id: 'code-review',
    title: 'React component review',
    preview: 'Refactor the message composer interactions',
    updatedAt: 'Yesterday',
  },
  {
    id: 'research-brief',
    title: 'Research brief',
    preview: 'Compare model evaluation approaches',
    updatedAt: 'Mon',
  },
  {
    id: 'release-notes',
    title: 'Release notes',
    preview: 'Draft concise feature bullets',
    updatedAt: 'Fri',
  },
]

export const INITIAL_MESSAGES = [
  {
    id: 'm1',
    role: 'assistant',
    content:
      'Welcome back. I can help draft strategy, explain code, or turn messy notes into something useful. Try asking for a **Markdown summary** or a code example.',
  },
  {
    id: 'm2',
    role: 'user',
    content: 'Show me a tiny React helper with syntax highlighting.',
  },
  {
    id: 'm3',
    role: 'assistant',
    content:
      'Sure. Here is a small hook:\n\n```jsx\nimport { useEffect, useRef } from "react"\n\nexport function useAutoScroll(dependency) {\n  const ref = useRef(null)\n\n  useEffect(() => {\n    ref.current?.scrollIntoView({ behavior: "smooth" })\n  }, [dependency])\n\n  return ref\n}\n```\n\n- It keeps the latest message in view.\n- It avoids direct DOM queries.\n- It works nicely in a chat timeline.',
  },
]

export const SUGGESTED_PROMPTS = [
  'Summarize this thread as action items',
  'Write a TypeScript version of this component',
  'Explain the code block step by step',
]

export const ASSISTANT_REPLY = `Here is a polished answer with **Markdown** and a highlighted code block:\n\n\`\`\`js\nconst response = messages.map((message) => ({\n  ...message,\n  visible: true,\n}))\n\nfunction sendMessage(text) {\n  return { role: 'user', content: text.trim() }\n}\n\`\`\`\n\nThe interface keeps chat history accessible, scrolls to the newest message, and shows a typing state before the answer appears.`
