'use client'

import { useEffect, useState } from 'react'

// Same reveal speed as Nav's tagline typewriter effect.
const SPEED_MS = 60

export default function TypedText({ text, style, as: As = 'p' }: { text: string; style?: React.CSSProperties; as?: 'p' | 'span' | 'div' }) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, SPEED_MS)
    return () => clearInterval(interval)
  }, [text])

  return <As style={style}>{typed}</As>
}
