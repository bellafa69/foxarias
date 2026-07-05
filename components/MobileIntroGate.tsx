'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

const MOBILE_QUERY = '(max-width: 1024px)'
const CYCLE_MS = 760
const STACK_COUNT = 4

// The exact home_images files, in the same order/mapping as Slideshow.tsx's
// SLIDES — the site's one authoritative pairing of these files to case
// studies (FCC, Cadence, Tandem x3, Solo.ai), not a guess. Each file is
// already a single flattened painting + screenshot composite with a
// deliberate margin baked in (confirmed by inspecting the full images) —
// no separate background/foreground layers exist for these, so cropping is
// controlled by the object-position below, not by compositing.
const FRAMES = [
  '/images/home_images/home-01.webp',
  '/images/home_images/home-03.webp',
  '/images/home_images/home-04.webp',
  '/images/home_images/home-04-1.webp',
  '/images/home_images/home-05.webp',
  '/images/home_images/home-06.webp',
  '/images/home_images/home-07.webp',
  '/images/home_images/home-08.webp',
]

const blendText: React.CSSProperties = {
  color: '#ffffff',
  mixBlendMode: 'difference',
}

// Module-scoped (not sessionStorage): survives client-side navigation away
// from and back to the homepage within the same session, but resets to
// false on a hard refresh — so reloading the homepage replays the gate.
let dismissedThisSession = false

export default function MobileIntroGate() {
  const [isMobile, setIsMobile] = useState(false)
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  // Track the 1024px breakpoint in JS (rather than CSS display:none) so the
  // cycle timer never runs — and sessionStorage is never touched — on desktop.
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    if (!dismissedThisSession) setVisible(true)
  }, [isMobile])

  useEffect(() => {
    if (!isMobile || !visible) return
    const id = setInterval(() => {
      setIndex(i => (i + 1) % FRAMES.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [isMobile, visible])

  useEffect(() => {
    if (!isMobile || !visible) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow }
  }, [isMobile, visible])

  const dismiss = useCallback(() => {
    dismissedThisSession = true
    setVisible(false)
  }, [])

  if (!isMobile) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            overflow: 'hidden',
            backgroundColor: '#000000',
          }}
        >
          {/* One case-study frame, repeated top-to-bottom to fill 100vh. Each
              stack slot's aspect ratio (~390x211 at a typical phone width,
              4-way split) is narrower than the source images' native 2:1, so
              object-fit:cover crops the sides only, not the top/bottom — the
              painting margin already baked into these files stays intact. */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: STACK_COUNT }).map((_, i) => (
              <div key={i} style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden' }}>
                <Image
                  src={FRAMES[index]}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={75}
                  priority={index === 0}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          {/* Name + tagline — top-left, same weight/size/style as desktop nav */}
          <div
            style={{
              position: 'absolute',
              top: 'var(--page-padding)',
              left: 'var(--page-padding)',
              right: 'var(--page-padding)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              columnGap: '16px',
              rowGap: '4px',
              zIndex: 2,
            }}
          >
            <span style={{ ...blendText, fontSize: '16px', lineHeight: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              FOX ARIAS
            </span>
            <span style={{ ...blendText, fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}>
              Isabella Fox Arias is a designer and producer.
            </span>
          </div>

          {/* Tap to enter — a solid pill with the letters cut all the way
              through as holes. isolation:isolate + mixBlendMode on the
              button composites its children normally first (an opaque
              white fill with solid black lettering on top), then differences
              that flattened result against the photo as one unit. Black is
              the identity color for "difference" — diff(black, x) = x — so
              wherever the letters sit, the true, un-inverted photo shows
              through untouched, exactly as if that pixel weren't blended at
              all. Everywhere else, the white fill inverts against the photo.
              The result reads as literal cutouts in the pill, not a filled
              label. */}
          <button
            onClick={dismiss}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              isolation: 'isolate',
              mixBlendMode: 'difference',
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: '999px',
              padding: '14px 28px',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#000000',
              }}
            >
              Tap to enter
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
