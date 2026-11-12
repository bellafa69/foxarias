'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CONCEPT_NOTE, CONCEPT_TITLE, HERO_SLIDES, SHOW_CONCEPT_LABELS } from './data'

const AUTOPLAY_MS = 6000

const labelBase: React.CSSProperties = {
  fontSize: '17px',
  lineHeight: '26px',
  fontWeight: 500,
  letterSpacing: '0.01em',
  whiteSpace: 'nowrap',
}

// Hero slideshow for the logistics page. Same caption strip and counter as the
// homepage slideshow, but screens sit straight on a plain dark stage: no
// background art, contained at their natural ratio, with a hairline edge.
export default function LogisticsSlideshow({ autoplay = true }: { autoplay?: boolean }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const reducedMotion = useRef(false)
  const total = HERO_SLIDES.length

  const go = useCallback((delta: number) => {
    setIndex(i => (i + delta + total) % total)
  }, [total])

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (!autoplay || paused || userPaused) return
    const id = setInterval(() => {
      if (!reducedMotion.current) go(1)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [autoplay, paused, userPaused, index, go])

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
        <span style={{ display: 'flex', gap: '16px', ...labelBase, color: 'var(--site-fg)' }}>
          <span>{CONCEPT_TITLE ?? slide.name}</span>
          {SHOW_CONCEPT_LABELS && <span style={{ color: 'var(--site-fg-muted)' }}>{slide.label}</span>}
          {SHOW_CONCEPT_LABELS && CONCEPT_NOTE && <span style={{ color: 'var(--site-fg-muted)', whiteSpace: 'normal' }}>{CONCEPT_NOTE}</span>}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button type="button" aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={userPaused} onClick={() => setUserPaused(v => !v)} style={{ ...labelBase, color: 'var(--site-fg)', opacity: 0.5 }}>{userPaused ? 'Play' : 'Pause'}</button>
          <button type="button" aria-label="Previous slide" onClick={() => go(-1)} style={{ ...labelBase, color: 'var(--site-fg)', opacity: 0.5 }}>←</button>
          <button type="button" aria-label="Next slide" onClick={() => go(1)} style={{ ...labelBase, color: 'var(--site-fg)', opacity: 0.5 }}>→</button>
          <span style={{ ...labelBase, color: 'var(--site-fg)' }} aria-live="polite">
            {index + 1} — {total}
          </span>
        </span>
      </div>

      <div className="lg-stage">
        <div
          className="lg-screen lg-screen-desktop"
          key={slide.id}
          style={{ aspectRatio: `${slide.width} / ${slide.height}` }}
        >
          {slide.kind === 'video' ? (
            <video
              src={slide.src}
              poster={slide.poster}
              autoPlay
              muted
              loop
              playsInline
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
