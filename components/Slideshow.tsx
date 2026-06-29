'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const SLIDES = [
  { image: '/images/home_images/home-01.webp',   name: 'FLEET, COST & CARE' },
  { image: '/images/home_images/home-03.webp',   name: 'CADENCE'             },
  { image: '/images/home_images/home-04.webp',   name: 'TANDEM MAGAZINE'     },
  { image: '/images/home_images/home-04-1.webp', name: 'TANDEM MAGAZINE'     },
  { image: '/images/home_images/home-05.webp',   name: 'FLEET, COST & CARE' },
  { image: '/images/home_images/home-06.webp',   name: 'TANDEM MAGAZINE'     },
  { image: '/images/home_images/home-07.webp',   name: 'SOLO.AI'             },
  { image: '/images/home_images/home-08.webp',   name: 'FLEET, COST & CARE' },
]

const labelBase: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
}

interface Props {
  revealed?: boolean
}

export default function Slideshow({ revealed = true }: Props) {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % SLIDES.length)
    }, 1300)
  }, [])

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startInterval])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setIndex(i => (i + 1) % SLIDES.length)
        startInterval()
      }
      if (e.key === 'ArrowLeft') {
        setIndex(i => (i - 1 + SLIDES.length) % SLIDES.length)
        startInterval()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [startInterval])

  const nextIndex = (index + 1) % SLIDES.length

  return (
    <div style={{
      height: 'calc(100vh - 48px)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Caption strip */}
      {revealed && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 32px 12px',
          backgroundColor: '#000000',
        }}>
          <span style={{ ...labelBase, color: '#ffffff' }}>
            {SLIDES[index].name}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ ...labelBase, color: '#ffffff', opacity: 0.5 }}>← →</span>
            <span style={{ ...labelBase, color: '#ffffff' }}>
              {index + 1} — {SLIDES.length}
            </span>
          </span>
        </div>
      )}

      {/* Image area keeps its own black background */}
      <div style={{
        flex: 1,
        padding: '0 32px',
        backgroundColor: '#000000',
        minHeight: 0,
      }}>
        <div style={{ position: 'relative', height: '100%', overflow: 'hidden', borderRadius: '8px' }}>
          {/* Only the active slide is visible; the next one is mounted just
              ahead of its turn so the swap doesn't show a loading flash —
              the other 6 slides aren't loaded at all until their turn comes. */}
          <Image
            key={SLIDES[index].image}
            src={SLIDES[index].image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 120vw"
            quality={85}
            priority={index === 0}
            style={{ objectFit: 'cover' }}
          />
          <Image
            key={SLIDES[nextIndex].image}
            src={SLIDES[nextIndex].image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 120vw"
            quality={85}
            style={{ objectFit: 'cover', opacity: 0, pointerEvents: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}
