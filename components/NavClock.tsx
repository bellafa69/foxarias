'use client'

import { useEffect, useState } from 'react'

export default function NavClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const update = () => {
      const parts = fmt.formatToParts(new Date())
      const h = parts.find(p => p.type === 'hour')?.value ?? '00'
      const m = parts.find(p => p.type === 'minute')?.value ?? '00'
      const s = parts.find(p => p.type === 'second')?.value ?? '00'
      setTime(`${h}:${m}:${s}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span style={{ display: 'inline-flex', gap: '4px' }} suppressHydrationWarning>
      <span style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.04em' }}>{time}</span>
      <span>CEST</span>
    </span>
  )
}
