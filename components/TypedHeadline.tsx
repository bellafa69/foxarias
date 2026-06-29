'use client'

import { useEffect, useState } from 'react'

const FULL_TEXT = 'Isabella Fox Arias is a designer, art director, and editor.'
const SPEED = 63

function BlinkingCursor() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setVisible(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  return <span style={{ opacity: visible ? 1 : 0, display: 'inline-block', transform: 'scaleX(0.9)', transformOrigin: 'center' }}>|</span>
}

export default function TypedHeadline() {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) {
        clearInterval(id)
        setDone(true)
      }
    }, SPEED)
    return () => clearInterval(id)
  }, [])

  return (
    <p style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 500, margin: 0 }}>
      {displayed}{!done && <BlinkingCursor />}
    </p>
  )
}
