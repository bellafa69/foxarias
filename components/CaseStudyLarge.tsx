'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface LargeImage {
  src: string
  ratio: number // width / height — used only by the non-heroImages render path
  height: number // px normally; ignored for heroImages, which uses a fixed HERO_CARD_HEIGHT_VH instead
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
  // Dead: the hover scale this disabled was removed. Kept on the type/data
  // so existing entries don't need touching, but has no effect anymore.
  noHoverScale?: boolean
  // heroImages only. Disables all hover interaction for this slot — no
  // cursor pill, normal cursor. Use for images with nothing to link to yet,
  // where even a "Coming soon" pill isn't wanted.
  noHover?: boolean
  // heroImages only. Slightly bumps up the cursor-follow pill's size (font +
  // padding) while keeping the exact same mouse-tracking behavior as the
  // default pill.
  largePill?: boolean
  // Dead: every foreground variant now shares one uniform inset
  // (FOREGROUND_INSET_PERCENT), so this no longer changes anything. Kept on
  // the type/data so existing entries don't need touching.
  paddedForeground?: boolean
  // heroImages only. Renders an arbitrary React node as the foreground layer,
  // same uniform inset as every other foreground variant. Use instead of
  // videoSrc/src when the foreground is a self-contained component (e.g.
  // scroll animation).
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
  // heroImages only. When set, the whole image row links to the live case
  // study page — the existing "Coming soon" hover pill becomes clickable.
  href?: string
}

const metaText: React.CSSProperties = {
  fontSize: '12px', lineHeight: '16px', fontWeight: 500,
  textTransform: 'uppercase', whiteSpace: 'nowrap',
}

// Role is the "headline" metadata item — full-opacity and a touch heavier
// than the rest, so the four/five items read as distinct kinds of info
// rather than one undifferentiated row.
const metaRoleText: React.CSSProperties = {
  ...metaText, fontWeight: 600,
}

// Title, scaled well past the 14px title used in the existing case study
// sections so this reads as the dominant element.
const bigTitleText: React.CSSProperties = {
  fontSize: '48px', lineHeight: '56px', fontWeight: 500,
  letterSpacing: '-0.02em', cursor: 'default',
}

// Writing list items — 50% of bigTitleText's scale, since a full-size 48px
// listing read as too heavy for a plain text article list.
const writingItemText: React.CSSProperties = {
  fontSize: '24px', lineHeight: '28px', fontWeight: 500,
  letterSpacing: '-0.02em', cursor: 'default',
}

const INACTIVE_TEXT_COLOR = 'var(--site-fg-muted)'
const ACTIVE_TEXT_COLOR = 'var(--site-fg)'
const ACTIVE_VIEWPORT_RATIO = 0.25

// "01" index — deliberately smaller and permanently muted (never toggles
// with hover/scroll like the title does), so it reads as secondary.
const indexText: React.CSSProperties = {
  fontSize: '14px', lineHeight: '20px', fontWeight: 500,
  color: INACTIVE_TEXT_COLOR,
}

// Always-visible one-sentence project summary — sits between the title and
// the metadata as the hierarchy's middle level.
const explainerText: React.CSSProperties = {
  fontSize: '18px', lineHeight: '26px', fontWeight: 400,
  color: 'var(--site-fg)', maxWidth: '640px',
}

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

// Slightly larger cursor-follow pill — same mouse-tracking behavior as
// cursorPill, just a bit more legible.
const cursorPillLarge: React.CSSProperties = {
  ...cursorPill,
  fontSize: '13px',
  padding: '9px 16px',
}

// Same shape and size as cursorPill, just inverted — used for sections with
// no live case study page yet (Sentri, Solo.ai).
const cursorPillComingSoon: React.CSSProperties = {
  ...cursorPill,
  color: '#000000',
  backgroundColor: '#ffffff',
}

// Structural: every hero card, in every row, is the same height — replaces
// the previous per-image vh value (which varied 74/78/80 by row and
// position within a row, causing uneven card heights at rest).
const HERO_CARD_HEIGHT_VH = 74

// Uniform inset on all four sides for every foreground layer, replacing the
// previous per-variant insets (0/5%, 40px/one-sixth, 80px/one-sixth).
// Compare against 6 — swap this one constant to try the tighter frame.
const FOREGROUND_INSET_PERCENT = 4

// Dark scrim over the background painting only — the foreground screenshot
// layer is unaffected, so it stays at full brightness/contrast.
// Compare against 0.5 for a stronger dim.
const BACKGROUND_OVERLAY_OPACITY = 0.35

export default function CaseStudyLarge({
  number, title, role, year, type, tags, status, images = [], heroImages = false, infoText, comingSoon = false, writingItems, href,
}: CaseStudyLargeProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollActive, setScrollActive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [hoveredImg, setHoveredImg] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
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
      {/* Mobile only (see .cs-mobile-tap-overlay) — no hover/cursor affordances
          on touch, so the whole card is one tap target to the case study
          instead of relying on the per-image hover pill. */}
      {heroImages && href && (
        <Link href={href} className="cs-mobile-tap-overlay" aria-label={title} />
      )}

      {/* Index + title — the numeral sits above the title as a secondary
          label (own line, smaller, fixed muted colour) instead of inline
          before it, so the title's left edge lines up with the metadata
          and image columns below instead of being pushed in. */}
      <div className="cs-card-title-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 'var(--col-gap)' }}>
        <span className="cs-title-number" style={indexText}>
          {String(number).padStart(2, '0')}
        </span>
        <span className="cs-title-text" style={{ ...bigTitleText, color: textColor, transition: 'color 0.4s ease' }}>
          {title}
        </span>
      </div>

      {/* Explainer — the project's one-sentence summary, always visible as
          the hierarchy's middle level between the title and the metadata.
          Previously only shown as a hover-triggered overlay via the (i)
          icon; now permanent, so that overlay/icon has been removed. */}
      {heroImages && infoText && (
        <p style={{ ...explainerText, margin: 0, marginBottom: 'var(--col-gap)' }}>
          {infoText}
        </p>
      )}

      {/* Metadata — role is the "headline" item (full opacity, heavier
          weight); year/type/tags/status stay muted as secondary detail. In
          the hero variant these are permanently muted/fixed rather than
          toggling with the title's active/inactive color. */}
      <div className="cs-metadata-row" style={{ paddingBottom: 'var(--col-gap)' }}>
        <span style={{ ...metaRoleText, color: heroImages ? 'var(--site-fg)' : textColor, transition: 'color 0.4s ease' }}>{role}</span>
        <span style={{ ...metaText, color: heroImages ? INACTIVE_TEXT_COLOR : textColor, transition: 'color 0.4s ease' }}>{year}</span>
        <span style={{ ...metaText, color: heroImages ? INACTIVE_TEXT_COLOR : textColor, transition: 'color 0.4s ease' }}>{type}</span>
        <span style={{ ...metaText, color: heroImages ? INACTIVE_TEXT_COLOR : textColor, transition: 'color 0.4s ease' }}>{tags}</span>
        {status && <span style={{ ...metaText, fontStyle: 'italic', textTransform: 'none', color: heroImages ? INACTIVE_TEXT_COLOR : textColor, transition: 'color 0.4s ease' }}>{status}</span>}
      </div>

      {/* Three images, staggered heights, mixing horizontal/vertical orientation per
          project for visual rhythm. flexShrink keeps them in one row at any width.
          Renders whenever images are provided, even alongside writingItems below —
          acts as a header hero image above the article list in that case. */}
      {images.length > 0 && (
      <div
        className={`cs-image-row ${images.length === 1 ? 'cs-image-row-single' : 'cs-image-row-multi'}`}
        style={{
          alignItems: heroImages ? 'flex-start' : 'flex-end',
          gap: heroImages ? '16px' : '24px',
          position: heroImages ? 'relative' : undefined,
        }}
      >
        {images.slice(0, 3).map(({ src, ratio, height, background, videoSrc, foregroundNode, flex: slotFlex = 1, noHover = false, largePill = false }, i) => {
          const isImgHovered = hoveredImg === i
          const slotCount = Math.min(images.length, 3)
          // Tell Next.js the actual rendered width so it picks the right srcset entry.
          // Single-slot rows fill ~90vw; three-slot rows each take ~33vw.
          const bgSizes = slotCount === 1 ? '(max-width: 768px) 100vw, 90vw' : '(max-width: 768px) 100vw, 33vw'
          const fgSizes = slotCount === 1 ? '(max-width: 768px) 100vw, 75vw' : '(max-width: 768px) 100vw, 28vw'

          if (heroImages) {
            const slot = (
              <div
                className="cs-image-slot"
                onMouseEnter={() => { if (!noHover) setHoveredImg(i) }}
                onMouseLeave={() => { if (!noHover) setHoveredImg(null) }}
                onMouseMove={noHover ? undefined : handleImageMouseMove}
                style={{
                  position: 'relative',
                  flex: slotFlex,
                  minWidth: 0,
                  height: `${HERO_CARD_HEIGHT_VH}vh`,
                  cursor: noHover ? 'default' : 'none',
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

                      {/* Scrim over the painting only — recedes it behind the
                          foreground screenshot, which this never touches. */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: `rgba(0, 0, 0, ${BACKGROUND_OVERLAY_OPACITY})`,
                      }} />

                      {/* Foreground layer — video, custom node, or device
                          screenshot, centered, same inset on every side for
                          every variant. */}
                      {videoSrc ? (
                        <div className="cs-foreground-inset" style={{
                          position: 'absolute',
                          inset: `${FOREGROUND_INSET_PERCENT}%`,
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
                        <div className="cs-foreground-inset" style={{
                          position: 'absolute',
                          inset: `${FOREGROUND_INSET_PERCENT}%`,
                        }}>
                          {foregroundNode}
                        </div>
                      ) : (
                        <div className="cs-foreground-inset" style={{
                          position: 'absolute',
                          inset: `${FOREGROUND_INSET_PERCENT}%`,
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

                {/* Custom cursor — follows the mouse in real time while hovered.
                    Sections with a live href get the opaque "View project"
                    pill instead of the inverted "Coming soon" one. largePill
                    bumps the size while keeping the same cursor-tracking. */}
                {isImgHovered && (
                  <div
                    className="cs-cursor-pill"
                    style={{
                      ...(href ? (largePill ? cursorPillLarge : cursorPill) : cursorPillComingSoon),
                      position: 'absolute',
                      left: `${mousePos.x}%`,
                      top: `${mousePos.y}%`,
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                    }}
                  >
                    {href ? 'View project' : 'Coming soon'}
                  </div>
                )}
              </div>
            )

            return href ? (
              <Link key={i} href={href} style={{ display: 'contents' }}>
                {slot}
              </Link>
            ) : (
              <div key={i} style={{ display: 'contents' }}>{slot}</div>
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

      {/* Writing items — text-only article list, no images. Sits below the
          header hero image above when both are present. */}
      {writingItems && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: images.length > 0 ? '16px' : 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {writingItems.map((item, i) => (
            <li key={i} className="cs-writing-item" style={{ ...writingItemText, color: 'var(--site-fg)' }}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0000EE', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')} onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
                &ldquo;{item.title}&rdquo;
              </a>
              {' — '}{item.publication}
            </li>
          ))}
          {writingItems.some(item => item.plusMore) && (
            <li className="cs-writing-more" style={{ ...writingItemText, color: INACTIVE_TEXT_COLOR, marginTop: '24px' }}>+ More</li>
          )}
        </ul>
      )}

    </section>
  )
}
