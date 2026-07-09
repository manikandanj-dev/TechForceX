import { useEffect, useMemo, useRef, useState } from 'react'
import { ASSISTANT_REPLY, INITIAL_MESSAGES } from '../data'

export function useChatSession() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  const canSend = draft.trim().length > 0 && !isTyping

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  const sendMessage = (content = draft) => {
    const trimmed = content.trim()
    if (!trimmed || isTyping) return

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `u-${Date.now()}`, role: 'user', content: trimmed },
    ])
    setDraft('')
    setIsTyping(true)

    window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: `a-${Date.now()}`, role: 'assistant', content: ASSISTANT_REPLY },
      ])
      setIsTyping(false)
    }, 950)
  }

  const stats = useMemo(
    () => [
      { label: 'Messages', value: messages.length },
      { label: 'Context', value: '12K' },
      { label: 'Mode', value: 'GPT-style' },
    ],
    [messages.length]
  )

  return { bottomRef, canSend, draft, isTyping, messages, sendMessage, setDraft, stats }
}

export default useChatSession
