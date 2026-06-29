'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

// Each card is a fixed-width portrait panel — painting fills it, UI image floats on top.
// Replace `painting` values with actual painting image paths when available.
const CARD_W = 440 // px — portrait aspect at 60vh gives roughly old-masters proportions

const CARDS = [
  {
    image:    '/images/fcc-01.png',
    painting: null,   // e.g. '/images/paintings/vermeer-01.jpg'
    bg:       '#1e130a',
  },
  {
    image:    '/images/tandem-01.png',
    painting: null,
    bg:       '#0f1a12',
  },
  {
    image:    '/images/tandem-02.png',
    painting: null,
    bg:       '#0e1020',
  },
  {
    image:    '/images/cadence-01.png',
    painting: null,
    bg:       '#1a1508',
  },
  {
    image:    '/images/tandem-03.png',
    painting: null,
    bg:       '#18102a',
  },
  {
    image:    '/images/fcc-02.png',
    painting: null,
    bg:       '#1a0e16',
  },
  {
    image:    '/images/sentri-01.png',
    painting: null,
    bg:       '#0a1818',
  },
  {
    image:    '/images/tandem-04.png',
    painting: null,
    bg:       '#1c1508',
  },
  {
    image:    '/images/solo.ai-01.png',
    painting: null,
    bg:       '#101a0e',
  },
  {
    image:    '/images/interview-01.png',
    painting: null,
    bg:       '#1a1010',
  },
]

const TOTAL_W = CARDS.length * CARD_W  // total strip width (no gaps)

export default function CardScroll() {
  const stripRef  = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const phaseRef  = useRef<'ambient' | 'scroll'>('ambient')
  const rafRef    = useRef(0)

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    // First card flush at left edge; strip bleeds to both viewport edges as it scrolls
    const INIT_X   = 0
    const MAX_OFF  = INIT_X + TOTAL_W - 40  // release when last card right edge = 40px

    const applyTransform = () => {
      strip.style.transform = `translateX(${INIT_X - offsetRef.current}px)`
    }

    applyTransform()

    // ── Single RAF loop ───────────────────────────────────────────────────────
    const tick = () => {
      if (phaseRef.current === 'ambient') {
        offsetRef.current += 0.3
      }
      applyTransform()
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    // ── Bidirectional wheel handler ───────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current === 'ambient') {
        if (e.deltaY <= 0) return           // upward before activation: pass through
        phaseRef.current = 'scroll'          // first downward scroll locks in scroll mode
      }

      if (e.deltaY > 0) {
        // Scrolling down → cards move left
        if (offsetRef.current >= MAX_OFF) return   // at end: release to normal scroll
        e.preventDefault()
        offsetRef.current = Math.min(offsetRef.current + e.deltaY * 0.4, MAX_OFF)
      } else if (e.deltaY < 0) {
        // Scrolling up → cards move right
        if (offsetRef.current <= 0) return         // at start: release to normal scroll
        e.preventDefault()
        offsetRef.current = Math.max(offsetRef.current + e.deltaY * 0.4, 0)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        height: '60vh',
        overflow: 'hidden',
      }}
    >
      <div
        ref={stripRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          display: 'flex',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {CARDS.map(({ image, painting, bg }, i) => (
          <div
            key={image}
            style={{
              width:      `${CARD_W}px`,
              height:     '100%',
              position:   'relative',
              flexShrink: 0,
              overflow:   'hidden',
            }}
          >
            {/* ── Painting background ── */}
            <div
              style={{
                position:        'absolute',
                inset:           0,
                backgroundColor: bg,
              }}
            >
              {painting && (
                <Image
                  src={painting}
                  alt=""
                  fill
                  sizes={`${CARD_W}px`}
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>

            {/* ── UI / editorial image floating on top ── */}
            <div
              style={{
                position:       'absolute',
                inset:          0,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                zIndex:         1,
                padding:        '8%',
              }}
            >
              <Image
                src={image}
                alt=""
                width={0}
                height={0}
                sizes={`${CARD_W}px`}
                priority={i < 3}
                style={{
                  height:  '80%',
                  width:   'auto',
                  display: 'block',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
