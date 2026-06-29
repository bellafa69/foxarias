'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  onComplete: () => void
  onBeginExit?: () => void
}

interface TextInstance {
  id: number
  x: number
  y: number
}

// Must match the first entry in Slideshow SLIDES
const FIRST_IMAGE = '/images/home_images/home%20-%2001.png'

const logoStyle: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '28px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: '#ffffff',
  whiteSpace: 'nowrap',
  position: 'absolute',
  left: 0,
  top: 0,
}

export default function LoadingScreen({ onComplete, onBeginExit }: Props) {
  const [instances, setInstances] = useState<TextInstance[]>([])
  const [logosVisible, setLogosVisible] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)
  const runCounterRef = useRef(0)

  useEffect(() => {
    const currentRun = ++runCounterRef.current
    setInstances([])

    // Preload the first image immediately so it's painted before the fade
    const firstImg = new window.Image()
    let firstImageReady = false
    const imageReadyPromise = new Promise<void>((resolve) => {
      firstImg.onload = firstImg.onerror = () => { firstImageReady = true; resolve() }
    })
    firstImg.src = FIRST_IMAGE

    const w = window.innerWidth
    const h = window.innerHeight
    const count = 100

    const positions: TextInstance[] = Array.from({ length: count }, (_, id) => ({
      id,
      x: Math.random() * (w - 100),
      y: Math.random() * (h - 28),
    }))

    let interval: ReturnType<typeof setInterval>

    const startFade = () => {
      const overlay = overlayRef.current
      if (!overlay) return

      onBeginExit?.()

      overlay.addEventListener('transitionend', function handler(e: TransitionEvent) {
        if (e.propertyName === 'opacity') {
          overlay.removeEventListener('transitionend', handler)
          onComplete()
        }
      })

      // Set transition FIRST, force reflow, THEN change opacity.
      // This guarantees the browser animates rather than snapping.
      overlay.style.transition = 'opacity 0.5s ease-in-out'
      overlay.getBoundingClientRect() // critical reflow
      overlay.style.opacity = '0'
    }

    let i = 0
    interval = setInterval(() => {
      const item = positions[i]
      i++
      setInstances(prev => {
        if (runCounterRef.current !== currentRun) return prev
        return [...prev, item]
      })
      if (i >= count) {
        clearInterval(interval)

        setLogosVisible(false)

        // Two rAFs: first ensures logos-cleared render is committed,
        // second ensures the browser has painted it before we fade.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (firstImageReady) {
              startFade()
            } else {
              // Image not yet ready — wait for it then fade
              imageReadyPromise.then(startFade)
            }
          })
        })
      }
    }, 15)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 9999,
        overflow: 'hidden',
        willChange: 'opacity',
      }}
    >
      {logosVisible && instances.filter(Boolean).map(inst => (
        <div
          key={inst.id}
          style={{ ...logoStyle, transform: `translate(${inst.x}px, ${inst.y}px)` }}
        >
          FOX ARIAS
        </div>
      ))}
    </div>
  )
}
