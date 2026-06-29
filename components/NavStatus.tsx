'use client'

import { useEffect, useState } from 'react'

const OFFLINE_STATUSES = ['Painting', 'Reading', 'Cooking', 'Writing', 'Offline']
const ROTATE_INTERVAL = 3 * 60 * 1000

function getBarcelonaHour(): number {
  return parseInt(
    new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/Paris',
      hour: 'numeric',
      hour12: false,
    }),
    10
  )
}

export default function NavStatus() {
  const [online, setOnline] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const checkOnline = () => {
      const h = getBarcelonaHour()
      setOnline(h >= 9 && h < 18)
    }

    checkOnline()
    const clockId = setInterval(checkOnline, 60 * 1000)
    const rotateId = setInterval(
      () => setStatusIndex((i) => (i + 1) % OFFLINE_STATUSES.length),
      ROTATE_INTERVAL
    )

    return () => {
      clearInterval(clockId)
      clearInterval(rotateId)
    }
  }, [])

  return (
    <span
      suppressHydrationWarning
      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: online ? '#00E71F' : '#FF3B30',
          display: 'inline-block',
          flexShrink: 0,
          animation: online ? 'dotPulse 2s ease-in-out infinite' : 'none',
        }}
      />
      {online ? 'Online' : OFFLINE_STATUSES[statusIndex]}
    </span>
  )
}
