'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CONCEPT_NOTE, CONCEPT_TITLE, HERO_SLIDES, SHOW_CONCEPT_LABELS } from './data'

// Stills hold for 5s. Clips play through once, then the show advances.
const STILL_MS = 5000

const labelBase: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 400,
  letterSpacing: '0.01em',
  whiteSpace: 'nowrap',
}

// Hero slideshow for the logistics page. Same caption strip and counter as the
// homepage slideshow, but screens sit straight on a plain dark stage: no
// background art, contained at their natural ratio, with a hairline edge.
export default function LogisticsSlideshow({ autoplay = true }: { autoplay?: boolean }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const pausedRef = useRef(false)
  const autoplayRef = useRef(autoplay)
  const total = HERO_SLIDES.length

  const go = useCallback((delta: number) => {
    setIndex(i => (i + delta + total) % total)
  }, [total])

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => { pausedRef.current = paused }, [paused])
  useEffect(() => { autoplayRef.current = autoplay }, [autoplay])

  const current = HERO_SLIDES[index]

  // Timer only runs for stills; clips advance themselves when they end.
  useEffect(() => {
    if (!autoplay || paused || reducedMotion || current.kind === 'video') return
    const id = setTimeout(() => go(1), STILL_MS)
    return () => clearTimeout(id)
  }, [autoplay, paused, reducedMotion, index, current.kind, go])

  const onClipEnded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (reducedMotion) return
    if (autoplayRef.current && !pausedRef.current) {
      go(1)
    } else {
      // Held (hover/focus) or not started yet: replay instead of freezing.
      const v = e.currentTarget
      v.currentTime = 0
      void v.play()
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const slide = HERO_SLIDES[index]
  const next = HERO_SLIDES[(index + 1) % total]

  return (
    <div
      className="lg-slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="lg-slideshow-caption">
        <span style={{ display: 'flex', gap: '16px', ...labelBase, color: 'var(--site-fg-muted)' }}>
          <span>{CONCEPT_TITLE ?? slide.name}</span>
          {SHOW_CONCEPT_LABELS && <span style={{ color: 'var(--site-fg-muted)' }}>{slide.label}</span>}
          {SHOW_CONCEPT_LABELS && CONCEPT_NOTE && <span style={{ color: 'var(--site-fg-muted)', whiteSpace: 'normal' }}>{CONCEPT_NOTE}</span>}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button type="button" className="lg-ctl" aria-label="Previous slide" onClick={() => go(-1)} style={{ ...labelBase, fontSize: '16px', lineHeight: '16px' }}>←</button>
          <button type="button" className="lg-ctl" aria-label="Next slide" onClick={() => go(1)} style={{ ...labelBase, fontSize: '16px', lineHeight: '16px' }}>→</button>
          <span style={{ ...labelBase, color: 'rgba(255, 255, 255, 0.8)' }} aria-live="polite">
            {index + 1} — {total}
          </span>
        </span>
      </div>

      <div className="lg-stage">
        <div
          className="lg-screen lg-screen-desktop"
          key={slide.id}
          style={{ '--r': slide.width / slide.height } as React.CSSProperties}
        >
          {slide.kind === 'video' ? (
            <video
              src={slide.src}
              poster={slide.poster}
              autoPlay={!reducedMotion}
              muted
              playsInline
              onEnded={onClipEnded}
              preload="auto"
              aria-label={slide.alt}
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
            />
          ) : (
            <Image
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              unoptimized
              loading="eager"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          )}
        </div>
      </div>

      {/* Warm the next still so the swap doesn't flash. */}
      {next.kind === 'image' && (
        <Image src={next.src} alt="" width={next.width} height={next.height} unoptimized loading="eager" aria-hidden style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />
      )}
    </div>
  )
}
