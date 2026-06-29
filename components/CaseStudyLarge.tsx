'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export interface LargeImage {
  src: string
  ratio: number // width / height — sizes the foreground screenshot at its own natural proportions
  height: number // staggered render height — px normally, vh when heroImages is set
  // heroImages only. When set, src renders as a foreground layer (its own
  // natural ratio, centered) on top of this background (fill + cover). When
  // omitted, src renders alone as a single fill + cover image instead.
  background?: string
  // heroImages only. When set, renders a looping muted autoplay video instead
  // of an image. src is ignored when this is present.
  videoSrc?: string
  // heroImages only. Controls how much of the row this slot takes relative to
  // siblings. Defaults to 1 (equal share). Use e.g. 0.8/1.2 for a 40/60 split.
  flex?: number
  // heroImages only. Disables the scale(1.20) on hover while keeping the
  // cursor pill — useful when the hover enlarge doesn't suit the slot's content.
  noHoverScale?: boolean
  // heroImages only. Uses the inset-wrapper + objectFit:contain sizing for the
  // foreground layer (80px top/bottom, 1/6 left/right) instead of width:90%
  // centered. Use for single-slot layouts where the image would overflow at 90%.
  paddedForeground?: boolean
  // heroImages only. Renders an arbitrary React node as the foreground layer
  // using the same 80px/1-6th inset as videoSrc. Use instead of videoSrc/src
  // when the foreground is a self-contained component (e.g. scroll animation).
  foregroundNode?: React.ReactNode
}

export interface WritingItem {
  title: string
  publication: string
  url: string
  byline?: string
  plusMore?: boolean
}

export interface CaseStudyLargeProps {
  number: number
  title: string
  role: string
  year: string
  type: string
  tags: string
  status?: string
  images?: LargeImage[]
  // Opt-in, full-bleed treatment for a section's image row: each image fills an
  // equal-width share of the viewport edge-to-edge, sized in vh instead of px.
  heroImages?: boolean
  // heroImages only. Hover-reveal pull-quote text shown via the info icon.
  infoText?: string
  // heroImages only. Swaps the custom cursor pill to "Coming soon" with
  // inverted (white fill, black text) styling, for case studies with no
  // project link to send people to yet.
  comingSoon?: boolean
  // When provided, renders a text-only article list instead of images.
  writingItems?: WritingItem[]
}

const metaText: React.CSSProperties = {
  fontSize: '12px', lineHeight: '16px', fontWeight: 500,
  textTransform: 'uppercase', whiteSpace: 'nowrap',
}

// Number + title together, scaled well past the 14px title used in the
// existing case study sections so this reads as the dominant element.
const bigTitleText: React.CSSProperties = {
  fontSize: '48px', lineHeight: '56px', fontWeight: 500,
  letterSpacing: '-0.02em', cursor: 'default',
}

const INACTIVE_TEXT_COLOR = 'var(--site-fg-muted)'
const ACTIVE_TEXT_COLOR = 'var(--site-fg)'
const ACTIVE_VIEWPORT_RATIO = 0.25

const viewProjectPill: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 500,
  color: '#ffffff',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  borderRadius: '999px',
  padding: '10px 20px',
  whiteSpace: 'nowrap',
  backdropFilter: 'blur(4px)',
}

// Custom-cursor pill for the hero variant — solid and opaque so it stays sharp
// while moving over varied image content, unlike the translucent static pill above.
const cursorPill: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 500,
  color: '#ffffff',
  backgroundColor: '#000000',
  borderRadius: '999px',
  padding: '6px 12px',
  whiteSpace: 'nowrap',
}

// Same shape as cursorPill, inverted — used when comingSoon is set.
const cursorPillComingSoon: React.CSSProperties = {
  ...cursorPill,
  color: '#000000',
  backgroundColor: '#ffffff',
}

export default function CaseStudyLarge({
  number, title, role, year, type, tags, status, images = [], heroImages = false, infoText, comingSoon = false, writingItems,
}: CaseStudyLargeProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollActive, setScrollActive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [hoveredImg, setHoveredImg] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [infoHovered, setInfoHovered] = useState(false)
  const isActive = scrollActive || hovered

  // Percentage of the box's own rendered size, not raw px — the box itself is
  // scaled via CSS transform on hover, and percentages stay correct under that
  // scale while a fixed px offset (measured from the scaled bounding rect but
  // applied against the unscaled containing block) would drift off-target.
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  // Same 25%-down-the-viewport scroll check as the existing case study
  // sections, kept independent per instance.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let rafId: number
    const check = () => {
      const rect = el.getBoundingClientRect()
      const threshold = window.innerHeight * ACTIVE_VIEWPORT_RATIO
      setScrollActive(rect.top <= threshold && rect.bottom >= threshold)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(check)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    check()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const textColor = isActive ? ACTIVE_TEXT_COLOR : INACTIVE_TEXT_COLOR

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ paddingInline: 'var(--page-padding)', position: heroImages ? 'relative' : undefined }}
    >
      {/* Number + title — one larger, more prominent element */}
      <div className="cs-title-row" style={{ marginBottom: heroImages ? '14px' : '12px' }}>
        <span style={{ ...bigTitleText, color: textColor, transition: 'color 0.4s ease', marginRight: '20px' }}>
          {String(number).padStart(2, '0')}
        </span>
        <span style={{ ...bigTitleText, color: textColor, transition: 'color 0.4s ease' }}>
          {title}
        </span>
        {heroImages && infoText && (
          <span
            className="cs-info-icon"
            onMouseEnter={() => setInfoHovered(true)}
            onMouseLeave={() => setInfoHovered(false)}
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              border: `1.5px solid ${INACTIVE_TEXT_COLOR}`,
              color: INACTIVE_TEXT_COLOR,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              fontStyle: 'normal',
              fontWeight: 600,
              cursor: 'help',
              flexShrink: 0,
              alignSelf: 'flex-start',
              marginLeft: '10px',
              marginTop: '12px',
            }}
          >
            i
          </span>
        )}
      </div>

      {/* Metadata — four distinct groups: role, year, type, tags. In the hero
          variant this is permanently muted grey, a fixed secondary register
          rather than toggling with the title's active/inactive color. */}
      <div className="cs-metadata-row" style={{ paddingBottom: '32px' }}>
        <span style={{ ...metaText, color: heroImages ? INACTIVE_TEXT_COLOR : textColor, transition: 'color 0.4s ease' }}>{role}</span>
        <span style={{ ...metaText, color: heroImages ? INACTIVE_TEXT_COLOR : textColor, transition: 'color 0.4s ease' }}>{year}</span>
        <span style={{ ...metaText, color: heroImages ? INACTIVE_TEXT_COLOR : textColor, transition: 'color 0.4s ease' }}>{type}</span>
        <span style={{ ...metaText, color: heroImages ? INACTIVE_TEXT_COLOR : textColor, transition: 'color 0.4s ease' }}>{tags}</span>
        {status && <span style={{ ...metaText, fontStyle: 'italic', textTransform: 'none', color: heroImages ? INACTIVE_TEXT_COLOR : textColor, transition: 'color 0.4s ease' }}>{status}</span>}
      </div>

      {/* Writing items — text-only article list, no images */}
      {writingItems && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {writingItems.map((item, i) => (
            <li key={i} className="cs-writing-item" style={{ ...bigTitleText, color: 'var(--site-fg)' }}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0000EE', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')} onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
                &ldquo;{item.title}&rdquo;
              </a>
              {' — '}{item.publication}
            </li>
          ))}
          {writingItems.some(item => item.plusMore) && (
            <li className="cs-writing-more" style={{ ...bigTitleText, color: INACTIVE_TEXT_COLOR, marginTop: '24px' }}>+ More</li>
          )}
        </ul>
      )}

      {/* Three images, staggered heights, mixing horizontal/vertical orientation per
          project for visual rhythm. flexShrink keeps them in one row at any width. */}
      {!writingItems && (
      <div
        className={`cs-image-row ${images.length === 1 ? 'cs-image-row-single' : 'cs-image-row-multi'}`}
        style={{
          alignItems: heroImages ? 'flex-start' : 'flex-end',
          gap: heroImages ? '16px' : '24px',
          position: heroImages ? 'relative' : undefined,
        }}
      >
        {/* Scrim — only covers the image row's own bounding box, so the info
            overlay text needs no darkening where it's over plain black background */}
        {heroImages && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              opacity: infoHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
        )}
        {images.slice(0, 3).map(({ src, ratio, height, background, videoSrc, foregroundNode, flex: slotFlex = 1, noHoverScale = false, paddedForeground = false }, i) => {
          const isImgHovered = hoveredImg === i
          const slotCount = Math.min(images.length, 3)
          // Tell Next.js the actual rendered width so it picks the right srcset entry.
          // Single-slot rows fill ~90vw; three-slot rows each take ~33vw.
          const bgSizes = slotCount === 1 ? '(max-width: 768px) 100vw, 90vw' : '(max-width: 768px) 100vw, 33vw'
          const fgSizes = slotCount === 1 ? '(max-width: 768px) 100vw, 75vw' : '(max-width: 768px) 100vw, 28vw'

          if (heroImages) {
            return (
              <div
                key={i}
                className="cs-image-slot"
                onMouseEnter={() => setHoveredImg(i)}
                onMouseLeave={() => setHoveredImg(null)}
                onMouseMove={handleImageMouseMove}
                style={{
                  position: 'relative',
                  flex: slotFlex,
                  minWidth: 0,
                  height: `${height}vh`,
                  cursor: 'none',
                  transform: (isImgHovered && !noHoverScale) ? 'scale(1.20)' : 'scale(1)',
                  zIndex: isImgHovered ? 10 : 1,
                  transition: 'transform 0.3s ease',
                }}
              >
                {/* Crop/round wrapper, separate from the outer hover box so the
                    cursor-following pill below isn't clipped at the edges */}
                <div style={{ position: 'absolute', inset: 0, borderRadius: '8px', overflow: 'hidden' }}>
                  {background ? (
                    <>
                      {/* Background layer — covers the frame independently */}
                      <Image
                        src={background}
                        alt=""
                        fill
                        sizes={bgSizes}
                        quality={90}
                        style={{ objectFit: 'cover' }}
                      />

                      {/* Foreground layer — video or device screenshot, centered.
                          Repositionable later via top/left/transform without
                          touching the background above. */}
                      {videoSrc ? (
                        <div style={{
                          position: 'absolute',
                          top: '80px',
                          bottom: '80px',
                          left: 'calc(100% / 6)',
                          right: 'calc(100% / 6)',
                        }}>
                          <video
                            src={videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                          />
                        </div>
                      ) : foregroundNode ? (
                        <div style={{
                          position: 'absolute',
                          top: '80px',
                          bottom: '80px',
                          left: 'calc(100% / 6)',
                          right: 'calc(100% / 6)',
                        }}>
                          {foregroundNode}
                        </div>
                      ) : paddedForeground ? (
                        <div style={{
                          position: 'absolute',
                          top: '40px',
                          bottom: '40px',
                          left: 'calc(100% / 6)',
                          right: 'calc(100% / 6)',
                        }}>
                          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                              src={src}
                              alt=""
                              fill
                              sizes={fgSizes}
                              quality={90}
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div style={{ position: 'absolute', inset: '0 5%' }}>
                          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                              src={src}
                              alt=""
                              fill
                              sizes={fgSizes}
                              quality={90}
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : videoSrc ? (
                    <video
                      src={videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    /* No background layer — single image filling the frame */
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes={bgSizes}
                      quality={90}
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* Custom cursor — follows the mouse in real time while hovered */}
                {isImgHovered && (
                  <div
                    style={{
                      ...cursorPillComingSoon,
                      position: 'absolute',
                      left: `${mousePos.x}%`,
                      top: `${mousePos.y}%`,
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                    }}
                  >
                    Coming soon
                  </div>
                )}
              </div>
            )
          }

          return (
            <div
              key={i}
              className="cs-image-slot"
              onMouseEnter={() => setHoveredImg(i)}
              onMouseLeave={() => setHoveredImg(null)}
              style={{
                position: 'relative',
                flexShrink: 1,
                flexGrow: 0,
                flexBasis: `${Math.round(height * ratio)}px`,
                minWidth: 0,
                height: `${height}px`,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />

              {/* Hover overlay — darken the image and reveal a "View project" pill */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  opacity: isImgHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }}
              >
                <span style={viewProjectPill}>Coming soon</span>
              </div>
            </div>
          )
        })}
      </div>
      )}

      {/* Info-icon overlay — large editorial pull-quote, absolutely positioned so
          it never reflows the underlying title/image layout. Starts near the
          section's top edge so it overlaps the title/metadata and the upper
          part of the image row, rather than sitting centered in empty space.
          The scrim inside the image row handles legibility where it crosses. */}
      {heroImages && infoText && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingInline: 'var(--page-padding)',
            paddingTop: '20px',
            opacity: infoHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
            zIndex: 30,
          }}
        >
          <p style={{
            ...bigTitleText,
            maxWidth: '900px',
            margin: 0,
            color: '#ffffff',
            textAlign: 'left',
          }}>
            {infoText}
          </p>
        </div>
      )}
    </section>
  )
}
